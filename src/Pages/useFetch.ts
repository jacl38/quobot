import { useState, useEffect } from "react";

export default function useFetch<T>({ url, queries, body }: { url: string, queries?: { [key: string]: string }, body?: any }) {
  const [result, setResult] = useState<T | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">();

  useEffect(() => {
    if(!url) return;

    setStatus("loading");

    (async () => {
      const query = Object.entries(queries ?? {}).map(([key, value]) => `${key}=${value}`).join("&");
      const response = await fetch(`${url}?${query}`, {
        method: body ? "POST" : "GET",
        headers: [
          ["Content-Type", "application/json"]
        ],
        body: JSON.stringify(body)
      });

      if(!response.ok) {
        setStatus("error");
        return;
      }

      const resultBody = await response.json();
      setResult(resultBody);
      setStatus("idle");
    })();
  }, []);

  return { result, status }
}