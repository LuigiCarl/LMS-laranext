import apiClient from "../axios"
import { User } from "@/types/user"

export const getUsers = () => apiClient.get<User[]>("/users")
export const getUser = (id: number) => apiClient.get<User>(`/users/${id}`)
export const createUser = (user: Partial<User>) => apiClient.post("/users", user)
export const updateUser = (id: number, user: Partial<User>) => apiClient.put(`/users/${id}`, user)
export const deleteUser = (id: number) => apiClient.delete(`/users/${id}`)