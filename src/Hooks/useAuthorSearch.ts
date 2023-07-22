import { useEffect, useState } from "react";
import { Author } from "../types/quote";

export default function useAuthorSearch() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Author[]>([]);

  useEffect(() => {
    if (!term) {
      setResults([]);
      return;
    }
    (async () => {
      const url = `/api/search?name=${term}`;
      const response = await fetch(url);
      const body = await response.json();
      setResults(body);
    })();
  }, [term]);

  return { term, results, setTerm };
}