// hooks/useAxiosFetch.ts
import { useState, useEffect } from "react";
import apiClient from "@/lib/axios";

export function useAxiosFetch<T>(url: string, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true; // Prevent state update if unmounted
    setLoading(true);
    setError(null);

    apiClient
      .get<T>(url)
      .then((res) => {
        if (isMounted) setData(res.data);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, deps.length ? deps : [url]); // dependencies can be customized or fallback to url

  return { data, loading, error };
}
// Usage example:
// import { useAxiosFetch } from "@/hooks/useAxiosFetch";

// export default function BooksPage() {
//   const { data: books, loading, error } = useAxiosFetch<Book[]>("/books");

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading books: {error.message}</p>;

//   return (
//     <ul>
//       {books?.map((book) => (
//         <li key={book.id}>{book.title}</li>
//       ))}
//     </ul>
//   );
// }
