import twsc from "tailwind-styled-components";

export function tw(...args: string[]) {
  return args.map(s => s.trim()).join(" ");
}

const linkClassNames = tw(`
  bg-secondary-600
  text-white font-semibold
  py-2 px-4
  rounded-3xl
  text-xl
  hover:bg-secondary-600
  outline
  hover:outline-4 hover:outline-secondary-700
  active:bg-secondary-600
  active:outline-4 active:outline-secondary-700
  hover:shadow-inner
  disabled:opacity-50
  disabled:cursor-not-allowed
  transition-all
`);

const PageTitle = twsc.h2`
  text-3xl font-semibold
  text-center
  text-neutral-800
`

const Paragraph = twsc.p`
  text-lg
  indent-8 tracking-tight leading-tight
  w-3/4 mx-auto text-justify
`

const Button = twsc.button`${linkClassNames}`;

export default {
  Button,
  Paragraph,
  PageTitle,
  linkClassNames
}