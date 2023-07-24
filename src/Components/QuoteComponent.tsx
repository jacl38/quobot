import twsc from "tailwind-styled-components"
import { tw } from "./styled"
import useAuthor from "../Hooks/useAuthor"
import { Author, Quote } from "../types/quote"
import { useEffect, useState } from "react"
import { seededRNG } from "../Utility/mathUtil"
import QuoteAnswer from "./QuoteAnswer"

type QuoteProps = {
  quotes: { _id: string, content: string }[],
  author: Author,
  onSelection: (id: string) => void,
  seed: number
}

const styles = {
  OuterContainer: twsc.div`
    my-4
    border-4 border-black
    rounded-lg
  `,
  AuthorInfoContainer: twsc.div`
    flex flex-col
  `,
  AuthorImage: twsc.img`
    w-full h-full
    animate-fadeIn
    bg-cover bg-top
    group-hover:scale-110 scale-125
    bg-gradient-to-tr from-secondary-200 to-secondary-50
    ease-out transition-all
  `,
  AuthorName: twsc.p`
    text-xl sm:text-2xl font-bold tracking-tighter
    truncate text-ellipsis
    mr-2 my-2
    transition-all ease-out
  `,
  AuthorBio: twsc.p`
    !leading-4 text-sm sm:text-base tracking-tight
    px-4 pb-2 -mt-4
    indent-4 italic text-justify
    text-neutral-600
    transition-all
  `,
  QuoteContainer: twsc.div`
    flex flex-col
    group/quote-container
  `,
  QuoteBox: twsc.button<{ $correct: boolean | undefined }>`
    flex items-center sm:px-8 px-2
    md:text-start md:justify-start text-center justify-center
    py-4
    border-b-2
    relative
    select-none
    cursor-pointer
    hover:bg-secondary-100
    transition-all
    ${p => {
      if(p.$correct) return "bg-green-200 font-semibold";
      if(p.$correct === false) return "bg-red-200 line-through";
      return "bg-initial";
    }}
  `,
  SelectionIndicator: twsc.div<{ $which: "a" | "b", $answer: "a" | "b" | undefined }>`
    absolute right-0
    bg-secondary-100
    border-2 border-secondary-700
    group-hover/quote-container:bg-red-500
    group-hover/quote-container:scale-150
    group-hover/quote-container:my-2
    group-hover/quote-container:font-mono
    group-hover/quote-container:rounded-2xl
    translate-x-3/4
    group-hover/quote-container:after:text-red-200
    group-hover/quote-container:border-red-600
    ${p => {
      if(p.$answer !== undefined) {
        if(p.$answer === p.$which) return tw( // answer is correct
          "!bg-green-500",
          "after:!content-['✔'] after:!text-green-100",
          "!border-green-600",
          "!rounded-lg",
          "!scale-[180%]",
          "!font-mono"
          );
          else return tw( // answer is incorrect
          "!bg-red-500",
          "after:!content-['✖'] after:!text-red-100",
          "!border-red-600",
          "!rounded-2xl",
          "!font-mono"
        );
      }

      // no answer so far
      return p.$which === "a"
        ? tw(
          "group-hover/quote-a:!bg-green-500",
          "group-hover/quote-a:after:!content-['✔'] group-hover/quote-a:after:!text-green-100",
          "group-hover/quote-a:!border-green-600",
          "group-hover/quote-a:!rounded-lg",
          "group-hover/quote-a:scale-[180%]",
          "group-hover/quote-container:after:content-['✖']",
        ): tw(
          "group-hover/quote-b:!bg-green-500",
          "group-hover/quote-b:after:!content-['✔'] group-hover/quote-b:after:!text-green-100",
          "group-hover/quote-b:!border-green-600",
          "group-hover/quote-b:!rounded-lg",
          "group-hover/quote-b:scale-[180%]",
          "group-hover/quote-container:after:content-['✖']",
        )
      }
    }

    rounded-md
    after:content-['?']
    flex items-center justify-center
    after:font-bold after:text-secondary-700
    w-6 h-6
    m-1
    shrink-0
    transition-all duration-150
  `
}

export default function QuoteComponent({ quotes, author, onSelection, seed }: QuoteProps) {
  const [authorImage, setAuthorImage] = useState<string | null>(null);
  const rng = seededRNG(seed)();

  const [selected, setSelected] = useState<"a" | "b" | undefined>(undefined);

  function isCorrect(which: "a" | "b") {
    if(selected === undefined) return undefined;
    return Math.round(rng) === (which === "a" ? 0 : 1);
  }

  useEffect(() => {
    if(authorImage) return;
    (async () => {
      const wikiTitle = author?.link.split("/").pop();
      if(!wikiTitle) return;
      const response = await fetch(`/wiki/w/api.php?action=query&titles=${wikiTitle}&prop=pageimages&format=json&pithumbsize=128`);
      const data = await response.json();
      const page = Object.values(data.query.pages)[0] as any;
      setAuthorImage(page.thumbnail?.source ?? "/src/assets/person.svg");
    })();
  }, [author]);

  return ( <styles.OuterContainer key={quotes.sort()[0]._id + quotes.sort()[1]._id}>

    <styles.AuthorInfoContainer key="author-info">
      <div className="flex" key="author-info-box">
        <a href={author?.link} key="author-info-link">
          <div key="author-image-background" className={tw(
            "w-16 h-16 aspect-square",
            "rounded-full overflow-hidden",
            "-translate-x-1/4 -translate-y-1/4",
            "border-4 border-secondary-700",
            "hover:scale-[113.6%]",
            "transition-all ease-out",
            "bg-gradient-to-tr from-secondary-300 to-secondary-50",
            "group",
            authorImage === null ? "animate-pulse" : "",
          )}>
            {
              authorImage &&
              <styles.AuthorImage key="author-image"
                style={{ backgroundImage: `url(${authorImage})` }} />
            }
          </div>
        </a>
        <styles.AuthorName key="author-name">{author?.name}</styles.AuthorName>
      </div>
      {
        author ? 
        <styles.AuthorBio key="author-bio">
          {author?.bio}
        </styles.AuthorBio>
        : <p className="text-center animate-pulse text-secondary-800">&bull; &bull; &bull;</p>
      }
    </styles.AuthorInfoContainer>

    <styles.QuoteContainer>

      <QuoteAnswer
        which="a"
        onSelect={() => {
          setSelected("a");
          onSelection(quotes[Math.round(rng)]._id)
        }}
        quote={quotes[0].content}
        correct={selected !== "a" && !isCorrect("a") ? undefined : isCorrect("a")}
      />

      <QuoteAnswer
        which="b"
        onSelect={() => {
          setSelected("b");
          onSelection(quotes[1]._id)
        }}
        quote={quotes[1].content}
        correct={selected !== "b" && !isCorrect("b") ? undefined : isCorrect("b")}
      />

    </styles.QuoteContainer>
  </styles.OuterContainer> )
}