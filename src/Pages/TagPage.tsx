import { Link, useParams } from "react-router-dom";
import { Author, Quote, Tag } from "../types/quote";
import Styled, { tw } from "../Components/styled";
import twsc from "tailwind-styled-components";
import QuoteComponent from "../Components/QuoteComponent";
import { useEffect, useState } from "react";
import styled from "../Components/styled";

type QuoteResponse = {
  author: Author,
  quotes: {
    _id: string,
    content: string
  }[]
}

const styles = {
  Scorebox: twsc.div`
    bg-primary-200 text-primary-800
    font-black tracking-tighter text-2xl
    py-1 px-2
    rounded-lg
    basis-full
    text-center
    hover:scale-110
    transition-all ease-out-back
  `
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
  const [noMoreQuotes, setNoMoreQuotes] = useState(false);
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
      setNoMoreQuotes(true);
    }
    if(request.status === 429) {
      setQuoteStatus("error");
      setHitLimit(true);
    }
    if(request.status === 500) {
      setQuoteStatus("error");
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
          if(!noMoreQuotes) getNextQuote();
          else setQuoteStatus("error");
        }}
        author={q.author}
        quotes={q.quotes}
        key={q.quotes[0]._id+q.quotes[1]._id} />
    })}

    {quoteStatus === "error" && hitLimit && <div className="flex flex-col items-center space-y-4">
      <Styled.Paragraph className="text-center animate-fadeSlideIn indent-0">
        The server has made too many OpenAI requests today. Please try again tomorrow.
      </Styled.Paragraph>
    </div>}

    {quoteStatus === "error" && noMoreQuotes && <div className="flex flex-col items-center space-y-4">
      <Styled.Paragraph className="text-center animate-fadeSlideIn indent-0">
        You've reached the end of this tag's quotes!
      </Styled.Paragraph>

      <Link to="/search" className={tw(
        styled.linkClassNames,
        "animate-fadeSlideIn animation-delay-300"
        )}>
        Search for another tag
      </Link>
    </div>}

    {quoteStatus === "loading" && <p className="text-2xl text-neutral-500 text-center animate-pulse">&bull; &bull; &bull;</p>}

    {
      tagStatus === "good" && (
        <div className="mb-24 mt-20 flex items-center justify-center opacity-0 animate-fadeSlideIn animation-delay-500">
          <div className="border-8 border-black py-4 px-4 rounded-tr-xl rounded-bl-xl rounded-tl-3xl rounded-br-3xl">
            <h3 className="text-2xl text-center font-bold tracking-tighter">Scoreboard</h3>
            <div className="grid grid-cols-2 gap-x-4 rounded mt-4">
              <styles.Scorebox>
                <p>Total</p>
                {answers.filter(a => a).length} / {answers.length}
              </styles.Scorebox>
              <styles.Scorebox>
                <p>Accuracy</p>
                {answers.length ? Math.round(answers.filter(a => a).length / answers.length * 100) : 0}%
              </styles.Scorebox>
            </div>
          </div>
        </div>
      )
    }
  </>);
}