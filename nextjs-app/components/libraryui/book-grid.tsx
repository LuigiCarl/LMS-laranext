"use client"

import { motion } from "motion/react"
import type { Book } from "./data"
import Image from "next/image"

interface BookGridProps {
  books: Book[]
  onBookSelect: (book: Book) => void
}

export function BookGrid({ books, onBookSelect }: BookGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {books.map((book) => (
        <motion.div
          key={book.id}
          layoutId={`book-${book.id}`}
          onClick={() => onBookSelect(book)}
          className="group cursor-pointer"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="aspect-[2/3] bg-white dark:bg-zinc-900 rounded-md overflow-hidden shadow-sm">
            <Image
              width={300}
              height={400}
              src={book.coverImage || "/placeholder.svg"}
              alt={book.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="mt-2 space-y-1">
            <h3 className="text-sm font-medium line-clamp-1">{book.title}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">{book.author}</p>
            <div className="flex justify-between items-center">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  book.available
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {book.available ? "Available" : "Borrowed"}
              </span>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{book.category}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
