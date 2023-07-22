import { useParams } from "react-router-dom"
import { Quote, Author } from "../types/quote"
import useAuthorSearch from "../Hooks/useAuthorSearch"
import { useEffect } from "react";

export default function AuthorPage() {
  const { id } = useParams()
  
  const authorSearch = useAuthorSearch();

  useEffect(() => {
    authorSearch.setTerm(id ?? "");
  });

  return (
    <>
      <ul>
        {authorSearch.results.map((author: Author) => (<>
          <li key={author._id} className="bg-red-500">{author.name}</li>
        </>))}
      </ul>
    </>
  )
}