import tw from "tailwind-styled-components";

const linkClassNames = `
  bg-secondary-600
  text-white font-semibold
  py-2 px-4
  rounded-2xl
  hover:bg-secondary-600
  focus:outline-none
  hover:ring-4 hover:ring-secondary-700
  active:bg-secondary-600
  active:ring-4 active:ring-secondary-700
  disabled:opacity-50
  disabled:cursor-not-allowed
  transition-all
`

const PageTitle = tw.h2`
  text-3xl font-semibold
  text-center
  text-tertiary-700
`

const Button = tw.button`${linkClassNames}`;

export default {
  Button,
  PageTitle,
  linkClassNames
}