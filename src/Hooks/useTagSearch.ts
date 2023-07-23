import { useEffect, useState } from "react";
import { Tag } from "../types/quote";

export default function useTagSearch() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Tag[]>([]);

  useEffect(() => {
    if (!term) {
      setResults([]);
      return;
    }
    (async () => {
      const url = `/api/search/tag?slug=${term}`;
      const response = await fetch(url);
      const body = await response.json();
      setResults(body);
    })();
  }, [term]);

  return { term, results, setTerm };
}