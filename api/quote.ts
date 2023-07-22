import fetch from "node-fetch";
import { Author, Quote } from "./types/quote";

const baseURL = "https://api.quotable.io";

/** Uses the Quotable API to get a list of 5 authors given a search term */
export async function findAuthors(name: string): Promise<Author[]> {
  const url = `${baseURL}/search/authors?limit=5&query=${name}`;
  const response = await fetch(url);
  const body = await response.json();
  return body.results;
}

/** Uses the Quotable API to return the full author object given a slug */
export async function findAuthorBySlug(slug: string): Promise<Author> {
  const url = `${baseURL}/authors?slug=${slug}`;
  const response = await fetch(url);
  const body = await response.json();
  return body;
}


/** Uses the Quotable API to return a list of (at most 50) quotes from the supplied author ID */
export async function findQuotesByAuthorID(id: string): Promise<Quote[]> {
  const url = `${baseURL}/quotes?limit=50&authorId=${id}`;
  const response = await fetch(url);
  const body = await response.json();
  return body.results;
}