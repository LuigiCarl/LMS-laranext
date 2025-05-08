"use client"

import { motion } from "motion/react"
import { X, Calendar, ArrowLeft, LogIn } from "lucide-react"
import { useState } from "react"
import type { BorrowedBook } from "./data"
import { useAuth } from "./auth-context"
import { ConfirmationModal } from "./confirmation-modal"
import Image from "next/image"

interface BorrowingDrawerProps {
  borrowedBooks: BorrowedBook[]
  onClose: () => void
  onReturnBook: (bookId: string) => void
  onLoginClick: () => void
}

export function BorrowingDrawer({ borrowedBooks, onClose, onReturnBook, onLoginClick }: BorrowingDrawerProps) {
  const { isAuthenticated, user } = useAuth()
  const [bookToReturn, setBookToReturn] = useState<string | null>(null)

  const calculateDaysRemaining = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleReturnClick = (bookId: string) => {
    setBookToReturn(bookId)
  }

  const confirmReturn = () => {
    if (bookToReturn) {
      onReturnBook(bookToReturn)
      setBookToReturn(null)
    }
  }

  const getBookTitle = (bookId: string) => {
    const book = borrowedBooks.find((b) => b.id === bookId)
    return book ? book.title : "this book"
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        className="fixed right-0 z-50 top-0 h-full w-full sm:w-[400px] bg-white dark:bg-zinc-900 shadow-xl"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-medium">Borrowed Books</h2>
            <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {!isAuthenticated ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <LogIn className="w-6 h-6 text-zinc-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium">Sign in to view your borrowed books</h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  You need to be signed in to borrow and manage books
                </p>
                <button
                  onClick={onLoginClick}
                  className="mt-6 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                >
                  Sign In
                </button>
              </div>
            ) : borrowedBooks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <ArrowLeft className="w-6 h-6 text-zinc-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No books borrowed</h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  Browse the library and borrow some books
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                  Signed in as <span className="font-medium text-zinc-900 dark:text-zinc-100">{user?.name}</span>
                </div>
                {borrowedBooks.map((book) => {
                  const daysRemaining = calculateDaysRemaining(book.dueDate)
                  return (
                    <div key={book.id} className="flex gap-4 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                      <Image
                      width={300}
                      height={400}
                        src={book.coverImage || "/placeholder.svg"}
                        alt={book.title}
                        className="w-20 h-28 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="text-base font-medium truncate">{book.title}</h3>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{book.author}</p>

                        <div className="flex items-center gap-1 mt-2 text-xs text-zinc-500">
                          <Calendar className="w-3 h-3" />
                          <span>Due: {book.dueDate}</span>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              daysRemaining > 3
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : daysRemaining >= 0
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {daysRemaining > 0
                              ? `${daysRemaining} days left`
                              : daysRemaining === 0
                                ? "Due today"
                                : `${Math.abs(daysRemaining)} days overdue`}
                          </span>
                          <button
                            onClick={() => handleReturnClick(book.id)}
                            className="text-xs px-3 py-1 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-md transition-colors"
                          >
                            Return
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <ConfirmationModal
        isOpen={!!bookToReturn}
        onClose={() => setBookToReturn(null)}
        onConfirm={confirmReturn}
        title="Confirm Return"
        message={`Are you sure you want to return "${getBookTitle(bookToReturn || "")}"?`}
        confirmText="Return Book"
        type="success"
      />
    </>
  )
}
