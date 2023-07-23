import { Link } from "react-router-dom"
import tw from "tailwind-styled-components"

const styles = {
  OuterContainer: tw.header`
    shrink-0
    flex flex-row items-center
    md:space-x-8 max-md:justify-between
    bg-primary-400
    border-b-4 border-primary-600
    ring-tertiary-700 ring-4
    p-4
  `,
  Title: tw.h1`
    md:text-4xl sm:text-3xl text-2xl
    font-bold tracking-tighter
    text-secondary-950
    border-8 border-secondary-950
    select-none
    bg-white py-2 px-3 rounded-2xl
    transition-all
  `,
  Tagline: tw.p`
    text-xl font-semibold italic font-serif
    text-primary-600
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