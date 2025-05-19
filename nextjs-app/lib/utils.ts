import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const API_BASE = process.env.NEXT_PUBLIC_API_URL

// Tailwind class merging helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API Fetch Helpers
export async function fetchBooks() {
  const res = await fetch(`${API_BASE}/books`)
  if (!res.ok) throw new Error("Failed to fetch books")
  return res.json()
}

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/users`)
  if (!res.ok) throw new Error("Failed to fetch users")
  return res.json()
}
