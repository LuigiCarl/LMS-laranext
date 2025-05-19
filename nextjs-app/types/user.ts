// types/user.ts

// User type definition for API typing

export interface User {
  id: number
  name: string
  email: string
  phone: string | null
  address: string | null
  role: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}