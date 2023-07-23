import express from "express";
import { findImageUrlByTitle, findTitleBySearch } from "./wiki";
import { findAuthorBySlug, findAuthors, findQuotesByTagSlug, getTags } from "./quote";
import fuzzysort from "fuzzysort";

const app = express();

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
app.get("/api/tag/:slug", async (req, res) => {
  const slug = req.params.slug;
  const results = await findQuotesByTagSlug(slug);
  res.send(results);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});