import apiClient from "../axios"
import { Book } from "@/types/book" // if you have type definitions

export const getBooks = () => apiClient.get<Book[]>("/books")
export const getBook = (id: number) => apiClient.get<Book>(`/books/${id}`)
export const createBook = (book: Partial<Book>) => apiClient.post("/books", book)
export const updateBook = (id: number, book: Partial<Book>) => apiClient.put(`/books/${id}`, book)
export const deleteBook = (id: number) => apiClient.delete(`/books/${id}`)
