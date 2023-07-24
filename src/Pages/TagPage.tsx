import { Link, useParams } from "react-router-dom";
import { Author, Quote, Tag } from "../types/quote";
import Styled from "../Components/styled";
import useFetch from "./useFetch";
import QuoteComponent from "../Components/QuoteComponent";
import { useEffect, useState } from "react";
import { clamp } from "../Utility/mathUtil";

type QuoteResponse = {
  author: Author,
  quotes: {
    _id: string,
    content: string
  }[]
}

export default function TagPage() {
  const { id } = useParams();
  const [usedQuoteIDs, setUsedQuoteIDs] = useState<string[]>([]);
  const [quotes, setQuotes] = useState<QuoteResponse[]>([]);

  const [hitLimit, setHitLimit] = useState(false);

  async function getNextQuote() {
    const request = await fetch(`/api/tag/${id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usedIDs: usedQuoteIDs })
    });
    if(request.status === 204) {
      console.log("hit limit");
      setHitLimit(true);
    }
    const data = await request.json() as QuoteResponse;
    setUsedQuoteIDs([...usedQuoteIDs, data.quotes[0]._id]);
    setQuotes([...quotes, data]);
  }

  return ( <>
    <button onClick={getNextQuote}>Get next</button>

    {quotes.map(({ author, quotes }) => <div>
      <h1>{author.name}</h1>
      {quotes.map(quote => <p>{quote.content}</p>)}
    </div>)}
  </>)

  // return (
  //   <>
  //     {tag.status === "loading" && <p className="opacity-50 text-center">Loading...</p>}

  //     {tag.status === "idle" && (tag.result?.quotes.length ? <>
  //       <section className="animate-fadeSlideIn">
  //         <Styled.PageTitle>{tag.result?.tag.name}</Styled.PageTitle>
  //         <Styled.Paragraph className="text-center indent-0">{tag.result?.tag.quoteCount} quotes</Styled.Paragraph>

  //         {tag.result?.quotes?.map((quote, i) => {
  //           if(i < limit) return <QuoteComponent key={quote._id} quote={quote} />
  //           return null;
  //         })}
  //         <button onClick={() => setLimit(lim => clamp(lim + 1, 0, tag.result?.tag!.quoteCount))}>+1</button>
  //       </section>
  //     </> : <>
  //         <Styled.PageTitle>Tag not found</Styled.PageTitle>
  //         <Link to="/search" className={Styled.linkClassNames}>Back to search</Link>
  //     </>)}

  //     {tag.status === "error" && <p>Error</p>}
  //   </>
  // )
}