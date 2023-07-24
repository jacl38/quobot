import { Link, useParams } from "react-router-dom";
import { Author, Quote, Tag } from "../types/quote";
import Styled, { tw } from "../Components/styled";
import useFetch from "./useFetch";
import QuoteComponent from "../Components/QuoteComponent";
import { useEffect, useState } from "react";
import { clamp, seededRNG, shuffle } from "../Utility/mathUtil";
import QuoteAnswerComponent from "../Components/QuoteAnswerComponent";

type QuoteResponse = {
  author: Author,
  quotes: {
    _id: string,
    content: string
  }[]
}

export default function TagPage() {
  const seed = new Date(performance.timing.navigationStart).getTime();

  const { id } = useParams();
  const [usedQuoteIDs, setUsedQuoteIDs] = useState<string[]>([]);
  const [quotes, setQuotes] = useState<QuoteResponse[]>([]);
  const [thisTag, setThisTag] = useState<Tag>();
  const [tagStatus, setTagStatus] = useState<"loading" | "error" | "good">("loading");

  const [answers, setAnswers] = useState<(boolean | undefined)[]>([]);

  const [quoteStatus, setQuoteStatus] = useState<"loading" | "error" | "good">("good");
  const [hitLimit, setHitLimit] = useState(false);

  useEffect(() => {
    setTagStatus("loading");
    if(!id) return;
    (async () => {
      const request = await fetch(`/api/tag/${id}`);
      if(request.status === 404) {
        setTagStatus("error");
        return;
      }
      const data = await request.json() as Tag;
      setThisTag(data);
      setTagStatus("good");
      if(quotes.length === 0) await getNextQuote();
    })();
  }, [id]);

  async function getNextQuote() {
    setQuoteStatus("loading");
    const request = await fetch(`/api/quotes/${id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usedIDs: usedQuoteIDs })
    });
    if(request.status === 204) {
      setQuoteStatus("error");
      setHitLimit(true);
    }
    const data = await request.json() as QuoteResponse;
    setUsedQuoteIDs([...usedQuoteIDs, data.quotes[0]._id]);
    setQuotes([...quotes, data]);
    setQuoteStatus("good");
  }

  return (<>
    {tagStatus !== "error" && (thisTag ? <>
      <section className="animate-fadeSlideIn">
        <Styled.PageTitle>{thisTag.name}</Styled.PageTitle>
        <Styled.Paragraph
          className={tw(
            "text-center indent-0",
            "text-neutral-500",
            "opacity-0 animate-fadeSlideIn animation-delay-300"
          )}>{thisTag.quoteCount} quotes</Styled.Paragraph>
      </section>
    </> : <>
      <p className="text-neutral-400 animate-pulse text-center">&bull; &bull; &bull;</p>
    </>)}

    {quotes.map((q, i) => {
      return <QuoteComponent
        seed={seed + i}
        onSelection={id => {
          // add real quote id to used
          setUsedQuoteIDs(u => [...u, q.quotes[0]._id]);

          // set correct/incorrect answer
          setAnswers(a => [...a, id === q.quotes[0]._id]);

          // request another quote
          if(!hitLimit) getNextQuote();
          else setQuoteStatus("error");
        }}
        author={q.author}
        quotes={q.quotes}
        key={q.quotes[0]._id+q.quotes[1]._id} />
    })}

    {quoteStatus === "error" && hitLimit && <>
      <Styled.Paragraph className="text-center animate-fadeSlideIn">
        You've reached the end of this tag's quotes!
      </Styled.Paragraph>
    </>}

    {quoteStatus === "loading" && <p className="text-2xl text-neutral-500 text-center animate-pulse">&bull; &bull; &bull;</p>}
  </>);
}