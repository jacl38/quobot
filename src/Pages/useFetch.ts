import { useState, useEffect } from "react";

export default function useFetch<T>(url: string, queries: { [key: string]: string } = {}) {
  const [result, setResult] = useState<T | null>(null);

  const [status, setStatus] = useState<"idle" | "loading" | "error">();

  useEffect(() => {
    if(!url) return;

    setStatus("loading");

    (async () => {
      const query = Object.entries(queries).map(([key, value]) => `${key}=${value}`).join("&");
      const response = await fetch(`${url}?${query}`);

      if(!response.ok) {
        setStatus("error");
        return;
      }

      const body = await response.json();
      setResult(body);
      setStatus("idle");
    })();
  }, []);

  return { result, status }
}