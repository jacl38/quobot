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

export type Tag = {
  _id: string,
  name: string,
  slug: string
  quoteCount: number,
  dateAdded: string,
  dateModified: string
}