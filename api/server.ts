import express from "express";
import { findImageUrlByTitle, findTitleBySearch } from "./wiki";
import { findAuthorBySlug, findAuthors } from "./quote";

const app = express();

app.get("/api/test", async (req, res) => {
  const query = req.query.q as string;

  const title = await findTitleBySearch(query);
  const imgURL = await findImageUrlByTitle(title ?? "");

  res.send({ url: imgURL });
  res.end();
});

app.get("/api/author/:id", async (req, res) => {
  const { id } = req.params as { id: string };
  const author = await findAuthorBySlug(id);
  res.send(author);
});

app.get("/api/search", async (req, res) => {
  const { name } = req.query as { name: string };
  const authors = await findAuthors(name);
  res.send(authors);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});