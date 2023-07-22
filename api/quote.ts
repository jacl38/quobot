import fetch from "node-fetch";

const baseURL = "https://api.quotable.io";

/** Uses the Quotable API to get a list of 5 author IDs given a search term */
export async function findAuthors(name: string): Promise<Author[]> {
  const url = `${baseURL}/authors?limit=5&search=${name}`;
  const response = await fetch(url);
  const body = await response.json();
  return body.results.map((author: any) => author._id);
}

/** Uses the Quotable API to return the full author object given an ID */
export async function findAuthorByID(id: string): Promise<Author> {
  const url = `${baseURL}/authors/${id}`;
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

export type Quote = {
  _id: string,
  content: string,
  author: string,
  tags: string[],
  authorSlug: string,
  length: number,
  dateAdded: string,
  dateModified: string
}

export type Author = {
  _id: string,
  name: string,
  bio: string,
  description: string,
  link: string,
  quoteCount: number,
  slug: string,
  dateAdded: string,
  dateModified: string
}