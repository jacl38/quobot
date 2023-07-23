import { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import Styled from "../Components/styled";
import useTagSearch from "../Hooks/useTagSearch";
import { shuffle } from "../Utility/mathUtil";
import { Tag } from "../types/quote";
import useFetch from "./useFetch";

export default function SearchPage() {

  const tags = useFetch<Tag[]>("/api/tags");
  const tagSearch = useTagSearch();
  
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if(tags.result?.length) setSuggestions(shuffle(tags.result).slice(0, 3).map(tag => tag.name));
  }, [tags.result]);

  return ( <>
  
    <Styled.PageTitle>Search for a quote tag</Styled.PageTitle>

    {tags.status === "idle" && tags.result?.length && <>
      <Styled.Paragraph className="indent-0 text-center animate-fadeIn my-4">
        Try searching for {suggestions.map((tag, i) => {
          if(i === 2) return `or ${tag}`;
          return `${tag}, `;
        }).join("")}
      </Styled.Paragraph>
      
      <section className="flex flex-col items-center opacity-0 animation-delay-300 animate-fadeIn">
        <SearchBar
          resultPrefix="tag"
          search={tagSearch.term}
          setSearch={tagSearch.setTerm}
          searchResults={tagSearch.results}
        />
      </section>
    </>}
  </> )
}