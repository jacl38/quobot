import express from "express";
import { findImageUrlByTitle, findTitleBySearch } from "./wiki";
import { findAuthorBySlug, findAuthors, findQuotesByTagSlug, getTags } from "./quote";
import fuzzysort from "fuzzysort";
import getAlternateQuote from "./gpt";
import { Quote } from "./types/quote";

const app = express();
app.use(express.json());

app.get("/api/test", async (req, res) => {
  const query = req.query.q as string;

  const title = await findTitleBySearch(query);
  const imgURL = await findImageUrlByTitle(title ?? "");

  res.send({ url: imgURL });
  res.end();
});

// example usage:
// /api/author/barack-obama => { name: "Barack Obama", slug: "barack-obama", bio: "..." }
app.get("/api/author/:id", async (req, res) => {
  const { id } = req.params as { id: string };
  const author = await findAuthorBySlug(id);
  res.send(author);
});

// example usage:
// /api/search?name=barack => [{ name: "Barack Obama", slug: "barack-obama", bio: "..." }, ...]
app.get("/api/search/author", async (req, res) => {
  const { name } = req.query as { name: string };
  const authors = await findAuthors(name);
  res.send(authors);
});

// example usage:
// /api/search/tag?slug=inspir => [{ name: "Inspiration", slug: "inspiration", quoteCount: 1234 }, ...]
app.get("/api/search/tag", async (req, res) => {
  const slug = req.query.slug as string;
  const tags = await getTags();
  const results = fuzzysort.go(slug, tags, { key: "slug" }).slice(0, 5);
  res.send(results.map((r) => r.obj));
});

// sends all tags with more than 5 quotes
app.get("/api/tags", async (req, res) => {
  const tags = await getTags();
  res.send(tags);
});

// example usage:
// /api/tag/inspiration => { tag: { name: "Inspiration", slug: "inspiration", quoteCount: 1234 }, results: [{ ... }, ...] }
// app.get("/api/tag/:slug", async (req, res) => {
//   const slug = req.params.slug;
//   const results = await findQuotesByTagSlug(slug);

//   res.send(results);
// });

// the supplied req.body is a list of quote IDs that have already been used
// will return a random quote that has not been used yet by checking the IDs
app.post("/api/tag/:slug", async (req, res) => {
  console.log(req.body);
  if(req.body === undefined) {
    res.status(400).send({ error: "No body supplied." });
    res.end();
    return;
  }
  const slug = req.params.slug;
  const usedIDs = req.body.usedIDs as string[] ?? [];

  let randomQuotes = await findQuotesByTagSlug(slug);
  
  if(randomQuotes.quotes.length === usedIDs.length) {
    res.status(204).send({ error: "No more quotes." });
    res.end();
    return;
  }

  let foundQuote: Quote | undefined = undefined;

  for(let i = 0; i < 10; i++) {
    const unusedQuotes = randomQuotes.quotes.filter(q => !usedIDs.includes(q._id));
    if(unusedQuotes.length > 0) {
      const randomQuote = unusedQuotes[0];
      foundQuote = randomQuote;
      break;
    } else {
      randomQuotes = await findQuotesByTagSlug(slug);
    }
  }

  if(!foundQuote) {
    res.status(204).send({ error: "No more quotes." });
    res.end();
    return;
  }

  const newQuote = await getAlternateQuote(foundQuote.content);
  const author = await findAuthorBySlug(foundQuote.authorSlug);

  const newID = foundQuote._id.split("").reverse().join("");

  res.status(200).send({
    author,
    quotes: [
      { _id: foundQuote._id, content: foundQuote.content },
      { _id: newID, content: newQuote }
    ]
  });
  res.end();
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});