// display a given quote
// display author info
// display author image

import useAuthor from "../Hooks/useAuthor"
import { Author, Quote } from "../types/quote"

type QuoteProps = {
  quote: Quote
}

export default function QuoteComponent({ quote }: QuoteProps) {
  const author = useAuthor(quote.authorSlug);

  return ( <div className="my-4" key={quote._id}>
    <p>{quote.content}</p>
    <p>{author?.name}</p>
    <p>{author?.link}</p>
  </div> )
}