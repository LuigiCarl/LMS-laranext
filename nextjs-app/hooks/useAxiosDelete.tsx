// hooks/useAxiosDelete.ts
import { useState } from "react";
import apiClient from "@/lib/axios";

export function useAxiosDelete<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function del() {
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.delete<T>(url);
      setData(res.data);
      return res.data;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, del };
}
// Usage example

// import { useAxiosDelete } from "@/hooks/useAxiosDelete";

// type Book = {
//   id: number;
//   title: string;
// };

// export default function DeleteBook({ bookId }: { bookId: number }) {
//   const { del, loading, error, data } = useAxiosDelete<{ message: string }>(`/books/${bookId}`);

//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this book?")) return;
//     try {
//       await del();
//       alert("Book deleted!");
//     } catch {
//       alert("Failed to delete book");
//     }
//   };

//   return (
//     <button onClick={handleDelete} disabled={loading}>
//       {loading ? "Deleting..." : "Delete Book"}
//     </button>
//   );
// }
