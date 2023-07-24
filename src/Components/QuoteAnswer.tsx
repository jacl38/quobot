import twsc from "tailwind-styled-components";
import QuoteSelection from "./QuoteSelection";

type QuoteAnswerComponentProps = {
  quote: string,
  which: "a" | "b",
  correct?: boolean,
  onSelect?: () => void,
  selected?: boolean
}

const styles = {
  OuterContainer: twsc.button<{ $highlight: "regular" | "none" | "red" | "green" }>`
    flex items-center
    sm:px-8 px-2 py-2
    md:text-start md:justify-start text-center justify-center
    border-b-2
    relative
    select-none cursor-default
    transition-all
    ${p => {
      if(p.$highlight === "none") return "bg-white";
      if(p.$highlight === "red") return "bg-red-200 line-through";
      if(p.$highlight === "green") return "bg-green-200 font-semibold";
      return "hover:bg-secondary-100 cursor-pointer";
    }}
  `
}

export default function QuoteAnswer({ quote, correct, which, onSelect }: QuoteAnswerComponentProps) {
  const highlight = correct === undefined ? "regular" : correct ? "green" : "red";

  return (
    <styles.OuterContainer
      onClick={onSelect}
      className={which === "a" ? "group/a" : "group/b"}
      $highlight={highlight}>
      <p>{quote}</p>
      {correct === false && <QuoteSelection correct={false} />}
    </styles.OuterContainer>
  );
}