// hooks/useAxiosPut.ts
import { useState } from "react";
import apiClient from "@/lib/axios";

export function useAxiosPut<T, U = any>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function put(payload: U) {
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.put<T>(url, payload);
      setData(res.data);
      return res.data;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, put };
}
// Usage example 
// import { useState } from "react";
// import { useAxiosPut } from "@/hooks/useAxiosPut";

// type Book = {
//   id: number;
//   title: string;
//   author: string;
// };

// export default function UpdateBook({ book }: { book: Book }) {
//   const { put, loading, error, data } = useAxiosPut<Book>(`/books/${book.id}`);
//   const [title, setTitle] = useState(book.title);
//   const [author, setAuthor] = useState(book.author);

//   const handleUpdate = async () => {
//     try {
//       await put({ title, author });
//       alert("Book updated!");
//     } catch {
//       alert("Failed to update book");
//     }
//   };

//   return (
//     <div>
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//       />
//       <input
//         value={author}
//         onChange={(e) => setAuthor(e.target.value)}
//         placeholder="Author"
//       />
//       <button onClick={handleUpdate} disabled={loading}>
//         {loading ? "Updating..." : "Update Book"}
//       </button>
//       {error && <p style={{ color: "red" }}>{error.message}</p>}
//       {data && <p>Updated book: {data.title}</p>}
//     </div>
//   );
// }
