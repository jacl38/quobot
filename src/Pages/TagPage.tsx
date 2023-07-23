import { Link, useParams } from "react-router-dom";
import { Quote, Tag } from "../types/quote";
import Styled from "../Components/styled";
import useFetch from "./useFetch";
import QuoteComponent from "../Components/QuoteComponent";
import { useState } from "react";
import { clamp } from "../Utility/mathUtil";

export default function TagPage() {
  const { id } = useParams()
  const tag = useFetch<{ tag: Tag, quotes: Quote[] }>(`/api/tag/${id}`);
  const [limit, setLimit] = useState(0);

  return (
    <>
    
      {tag.status === "loading" && <p className="opacity-50 text-center">Loading...</p>}

      {tag.status === "idle" && (tag.result?.quotes.length ? <>
        <section className="animate-fadeIn">
          <Styled.PageTitle>{tag.result?.tag.name}</Styled.PageTitle>
          <Styled.Paragraph className="text-center indent-0">{tag.result?.tag.quoteCount} quotes</Styled.Paragraph>

          {tag.result?.quotes?.map((quote, i) => {
            if(i < limit) return <QuoteComponent key={quote._id} quote={quote} />
            return null;
          })}
          <button onClick={() => setLimit(lim => clamp(lim + 1, 0, tag.result?.tag!.quoteCount))}>+1</button>
        </section>
      </> : <>
          <Styled.PageTitle>Tag not found</Styled.PageTitle>
          <Link to="/search" className={Styled.linkClassNames}>Back to search</Link>
      </>)}

      {tag.status === "error" && <p>Error</p>}
    </>
  )
}