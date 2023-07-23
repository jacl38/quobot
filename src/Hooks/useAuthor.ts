import { useEffect, useState } from "react";
import { Author } from "../types/quote";

export default function useAuthor(id: string) {
  const [result, setResult] = useState<Author | null>(null);

  useEffect(() => {
    (async () => {
      const url = `/api/author/${id}`;
      const response = await fetch(url);
      const body = await response.json();
      setResult(body.results[0]);
    })();
  }, [id]);

  return result;
}