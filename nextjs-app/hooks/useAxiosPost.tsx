// hooks/useAxiosPost.ts
import { useState } from "react";
import apiClient from "@/lib/axios";

export function useAxiosPost<T, U = any>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function post(payload: U) {
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.post<T>(url, payload);
      setData(res.data);
      return res.data;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, post };
}
// Usage example:
// import { useAxiosPost } from "@/hooks/useAxiosPost";

// export default function CreateUser() {
//   const { post, loading, error, data } = useAxiosPost<User>("/users");

//   const handleSubmit = async () => {
//     try {
//       await post({ name: "John Doe", email: "john@example.com" });
//       alert("User created!");
//     } catch {
//       alert("Failed to create user");
//     }
//   };

//   return (
//     <>
//       <button onClick={handleSubmit} disabled={loading}>
//         {loading ? "Creating..." : "Create User"}
//       </button>
//       {error && <p>{error.message}</p>}
//       {data && <p>User created: {data.name}</p>}
//     </>
//   );
// }
