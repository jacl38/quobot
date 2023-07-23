import SearchBar from "../Components/SearchBar";
import Styled from "../Components/styled";
import useTagSearch from "../Hooks/useTagSearch";

export default function SearchPage() {
  const tagSearch = useTagSearch();

  return ( <>
  
    <Styled.PageTitle>Search for a quote tag</Styled.PageTitle>

    <Styled.Paragraph>Try searching for </Styled.Paragraph>

    <section className="flex flex-col items-center">
      <SearchBar
        resultPrefix="tag"
        search={tagSearch.term}
        setSearch={tagSearch.setTerm}
        searchResults={tagSearch.results}
      />
    </section>
  
  </> )
}