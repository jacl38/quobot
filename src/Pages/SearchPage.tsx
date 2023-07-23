import SearchBar from "../Components/SearchBar";
import Styled from "../Components/styled";
import useAuthorSearch from "../Hooks/useAuthorSearch";

export default function SearchPage() {
  const authorSearch = useAuthorSearch();

  return ( <>
  
    <Styled.PageTitle>Search for an author</Styled.PageTitle>

    <section className="flex flex-col items-center">
      <SearchBar
        search={authorSearch.term}
        setSearch={authorSearch.setTerm}
        searchResults={authorSearch.results}
      />
    </section>
  
  </> )
}