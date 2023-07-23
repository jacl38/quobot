import { Link } from "react-router-dom"
import tw from "tailwind-styled-components"

const styles = {
  OuterContainer: tw.header`
    shrink-0
    bg-primary-400
    border-b-4 border-primary-600
    ring-tertiary-700 ring-4
    p-4
    relative
  `,
  Title: tw.h1`
    md:text-4xl sm:text-3xl text-2xl
    font-bold tracking-tighter
    text-secondary-950
    border-8 border-secondary-950
    select-none
    bg-white py-2 px-3
    rounded-tl-3xl rounded-br-3xl
    rounded-tr-lg rounded-bl-lg
    transition-all
    absolute
  `,
  Tagline: tw.p`
    text-xl font-semibold italic font-serif
    text-primary-600
    relative md:left-44 sm:left-40 left-36
    transition-all
  `
}

export default function Header() {
  return (<>
    <styles.OuterContainer>
      <Link to="/"><styles.Title>QuoBot</styles.Title></Link>
      <styles.Tagline>guess again!</styles.Tagline>
    </styles.OuterContainer>
  </>)
}