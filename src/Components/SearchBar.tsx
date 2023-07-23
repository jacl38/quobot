import tw from "tailwind-styled-components"
import { Author } from "../types/quote";

type SearchBarProps = {
  search: string,
  searchResults: any[],
  setSearch: (search: string) => void,
}

const styles = {
  OuterContainer: tw.div`
    relative flex flex-col
    border-4 border-primary-300
    rounded-2xl
    max-w-[24rem] w-full
    m-2
    ring-primary-600
    focus-within:ring-4
    transition-all
  `,
  InputBox: tw.input`
    w-full h-full
    py-2 px-4
    font-semibold
    bg-transparent
    outline-none
    text-secondary-800
  `,
  ResultsContainer: tw.div`
    flex flex-col
  `,
  Result: tw.a`
    px-4 pb-2
    focus:outline-none
    focus:bg-primary-300
    text-tertiary-800
    font-semibold
    animate-fadeIn
    truncate overflow-ellipsis
    flex justify-between
  `
}

export default function SearchBar({ search, searchResults, setSearch }: SearchBarProps) {
  return (
    <>
      <styles.OuterContainer>

        <styles.InputBox
          type="text"
          placeholder="Search..."
          value={search}
          onKeyDown={e => {
            console.log(e.key);
            if(e.key === "ArrowDown") {

            }
          }}
          onChange={e => setSearch(e.target.value)} />

        <styles.ResultsContainer>
          {searchResults.map((result: Author) => (<>
            <styles.Result href={`/author/${result.slug}`}>
              <span>{result.name}</span>
              <span>{result.quoteCount}</span>
            </styles.Result>
          </>))}
        </styles.ResultsContainer>

      </styles.OuterContainer>
    </>
  )
}