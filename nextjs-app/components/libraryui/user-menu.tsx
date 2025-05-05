"use client"

import { LogOut, User } from "lucide-react"
import { useAuth } from "./auth-context"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserMenuProps {
  onLoginClick: () => void
}

export function UserMenu({ onLoginClick }: UserMenuProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const [open, setOpen] = useState(false)

  if (!isAuthenticated) {
    return (
      <button
        onClick={onLoginClick}
        className="flex items-center gap-2 text-sm py-1.5 px-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      >
        <User className="w-4 h-4" />
        <span>Sign In</span>
      </button>
    )
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-sm py-1 px-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <Avatar className="h-6 w-6">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline">{user?.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <span className="mr-2">📚</span>
          <span>My Borrowings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
