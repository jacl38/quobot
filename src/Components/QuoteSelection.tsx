import twsc from "tailwind-styled-components"
import { tw } from "./styled"

type QuoteSelectionProps = {
  correct?: boolean
}

const styles = {
  OuterContainer: twsc.div<{ $selectionHighlight: "question" | "green" | "red" }>`
    absolute right-0 translate-x-1/2
    w-6 h-6 aspect-square shrink-0 scale-100
    flex items-center justify-center
    after:font-bold after:text-xl
    border-2
    ${p => {
      if(p.$selectionHighlight === "question") return tw(
        "bg-secondary-100 border-secondary-700",
        "after:content-['?'] after:text-secondary-700",
        "rounded-md",
      );
      if(p.$selectionHighlight === "green") return tw(
        "bg-green-500 border-green-600",
        "after:content-['✔'] after:text-green-100",
        "rounded-lg",
        "after:font-mono"
      );
      if(p.$selectionHighlight === "red") return tw(
        "bg-red-500 border-red-600",
        "after:content-['✖'] after:text-red-100",
        "rounded-2xl",
        "after:font-mono"
      );
    }}
    transition-all duration-150
  `
}

export default function QuoteSelection({ correct }: QuoteSelectionProps) {
  const highlight = correct === undefined ? "question" : correct ? "green" : "red";
  return <styles.OuterContainer $selectionHighlight={highlight} />
}