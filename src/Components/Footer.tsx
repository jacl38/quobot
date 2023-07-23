import tw from "tailwind-styled-components"

const styles = {
  OuterContainer: tw.footer`
    shrink-0
    flex items-center
    md:flex-row flex-col
    md:justify-between
    bg-secondary-800
    text-secondary-50
    px-4 py-2
    border-t-4 border-secondary-900
    ring-secondary-950 ring-4
    has-link
  `
}

export default function Footer() {
  return (<>
    <styles.OuterContainer>
      <span>Designed and developed by <a href="https://jclark.space/">Jack Clark</a></span>
      <a href="https://github.com/jacl38/quobot">Source</a>
    </styles.OuterContainer>
  </>)
}