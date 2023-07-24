import twsc from "tailwind-styled-components";

const styles = {
  OuterContainer: twsc.button<{ highlight: "none" | "red" | "green" }>`
    flex items-center
    sm:px-8 px-2 py-2
    md:text-start md:justify-start text-center justify-center
    border-b-2
    relative
    select-none cursor-pointer
    hover:bg-secondary-100
    transition-all
    ${p => {
      if(p.highlight === "red") return "bg-red-200 line-through";
      if(p.highlight === "green") return "bg-green-200 font-semibold";
      return "bg-initial";
    }}
  `
}

export default function QuoteAnswerComponent() {
  return (
    <styles.OuterContainer highlight="none">

    </styles.OuterContainer>
  );
}