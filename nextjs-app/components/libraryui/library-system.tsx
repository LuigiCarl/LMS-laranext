"use client"

import { AnimatePresence } from "motion/react"
import { useState } from "react"
import { BookGrid } from "./book-grid"
import { BorrowingDrawer } from "./borrowing-drawer"
import { BookModal } from "./book-modal"
import { TopBar } from "./top-bar"
import { LoginModal } from "./login-modal"
import { type Book, type BorrowedBook, books as initialBooks } from "./data"
import { useAuth } from "./auth-context"

export default function LibrarySystem() {
  const { user } = useAuth()
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isBorrowingOpen, setIsBorrowingOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const borrowBook = (book: Book, dueDate: string) => {
    if (!user) return

    // Update the book to be unavailable
    setBooks(books.map((b) => (b.id === book.id ? { ...b, available: false } : b)))

    // Add to borrowed books
    const borrowDate = new Date().toISOString().split("T")[0]
    setBorrowedBooks([
      ...borrowedBooks,
      {
        ...book,
        available: false,
        borrowDate,
        dueDate,
      },
    ])
  }

  const returnBook = (bookId: string) => {
    if (!user) return

    // Remove from borrowed books
    setBorrowedBooks(borrowedBooks.filter((book) => book.id !== bookId))

    // Update the book to be available again
    setBooks(books.map((book) => (book.id === bookId ? { ...book, available: true } : book)))
  }

  // Filter books by search query and category
  const filteredBooks = books.filter((book) => {
    // First filter by search query
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())

    // Then filter by category
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory

    // Return true only if both conditions are met
    return matchesSearch && matchesCategory
  })

  return (
    <div className="h-screen ">
      <TopBar
        borrowedCount={borrowedBooks.length}
        onBorrowedClick={() => setIsBorrowingOpen(true)}
        onSearch={setSearchQuery}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onCategoryChange={setSelectedCategory}
      />

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {selectedCategory === "All" ? "Library Catalog" : `${selectedCategory} Books`}
          </h1>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"} found
          </div>
        </div>
        <BookGrid books={filteredBooks} onBookSelect={setSelectedBook} />
      </div>

      <AnimatePresence>
        {selectedBook && (
          <BookModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            onBorrow={(book, dueDate) => {
              borrowBook(book, dueDate)
              setSelectedBook(null)
              setIsBorrowingOpen(true)
            }}
            onLoginClick={() => {
              setIsLoginModalOpen(true)
              // Keep the book modal open
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBorrowingOpen && (
          <BorrowingDrawer
            borrowedBooks={borrowedBooks}
            onClose={() => setIsBorrowingOpen(false)}
            onReturnBook={returnBook}
            onLoginClick={() => {
              setIsLoginModalOpen(true)
              // Keep the borrowing drawer open
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoginModalOpen && (
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onSuccess={() => {
              // After successful login, we can keep the current UI state
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
