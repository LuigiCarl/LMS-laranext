import apiClient from "../axios";

export const getBorrowedBooks = () => apiClient.get("/borrowed-books");
export const getBorrowedBook = (id: number) => apiClient.get(`/borrowed-books/${id}`);