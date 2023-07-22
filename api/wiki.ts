import fetch from "node-fetch";

const baseURL = "https://en.wikipedia.org/w/api.php";

/** Uses the Wikipedia API to search for a page from the supplied `title`,
 *  then returns the first result's title. */
export async function findTitleBySearch(title: string): Promise<string | null> {
  const url = `${baseURL}?action=query&list=search&srsearch=${title}&format=json`;
  const response = await fetch(url);
  const body = await response.json();
  const firstResult = body.query.search[0];
  return firstResult ? firstResult.title : null;
}

/** Uses the Wikipedia API to find the "pageimage" URL at a size of 500 from the supplied `title` */
export async function findImageUrlByTitle(title: string): Promise<string | null> {
  const url = `${baseURL}?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=500`;
  const response = await fetch(url);
  const body = await response.json();
  const page = Object.values(body.query.pages)[0] as any;
  return page.thumbnail ? page.thumbnail.source : null;
}

/** Returns the full title of a page, given its `url`. */
export function TitleFromURL(url: string): string {
  const parts = url.split("/");
  return parts[parts.length - 1];
}