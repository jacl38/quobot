import twsc from "tailwind-styled-components"
import { tw } from "./styled"
import useAuthor from "../Hooks/useAuthor"
import { Author, Quote } from "../types/quote"
import { useEffect, useState } from "react"

type QuoteProps = {
  quote: Quote
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
    w-16 h-16 aspect-square rounded-full
    object-cover object-top
    border-4 border-secondary-700
    hover:scale-110
    bg-gradient-to-tr from-tertiary-50 to-tertiary-200
    ease-out transition-all
    -translate-x-1/4 -translate-y-1/4
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
  QuoteBox: twsc.button`
    flex justify-between items-center px-2
    py-4
    border-b-2
    relative
    select-none
    cursor-pointer
    hover:bg-secondary-100
  `,
  SelectionIndicator: twsc.div<{ $which: "a" | "b" }>`
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
    ${p => p.$which === "a"
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

export default function QuoteComponent({ quote }: QuoteProps) {
  const author = useAuthor(quote.authorSlug);
  const [authorImage, setAuthorImage] = useState<string | null>(null);

  useEffect(() => {
    if(authorImage) return;
    (async () => {
      const wikiTitle = author?.link.split("/").pop();
      if(!wikiTitle) return;
      const response = await fetch(`/wiki/w/api.php?action=query&titles=${wikiTitle}&prop=pageimages&format=json&pithumbsize=128`);
      const data = await response.json();
      const page = Object.values(data.query.pages)[0] as any;
      setAuthorImage(page.thumbnail?.source ?? null);
    })();
  });

  return ( <styles.OuterContainer key={quote._id}>

    <styles.AuthorInfoContainer>
      <div className="flex">
        <styles.AuthorImage src={authorImage ?? "/src/assets/person.svg"} />
        <styles.AuthorName>{author?.name}</styles.AuthorName>
      </div>
      <styles.AuthorBio>
        {author?.bio}
      </styles.AuthorBio>
    </styles.AuthorInfoContainer>

    <styles.QuoteContainer>
      <styles.QuoteBox className="group/quote-a">
        "{quote.content}"
        <styles.SelectionIndicator $which="a" />
      </styles.QuoteBox>
      <styles.QuoteBox className="group/quote-b">
        "{quote.content}"
        <styles.SelectionIndicator $which="b" />
      </styles.QuoteBox>
    </styles.QuoteContainer>

  </styles.OuterContainer> )
}