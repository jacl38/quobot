import express from "express";
import { findImageUrlByTitle, findTitleBySearch } from "./wiki";

const app = express();

app.get("/api/test", async (req, res) => {
  const query = req.query.q as string;

  const title = await findTitleBySearch(query);
  const imgURL = await findImageUrlByTitle(title ?? "");

  res.send(`<img src="${imgURL}" alt="${title}" />`);
  res.end();
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});