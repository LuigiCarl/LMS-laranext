"use client"

import { motion } from "motion/react"
import { X, Calendar, LogIn } from "lucide-react"
import { useState } from "react"
import type { Book } from "./data"
import { useAuth } from "./auth-context"
import { ConfirmationModal } from "./confirmation-modal"
import Image from "next/image"

interface BookModalProps {
    book: Book
    onClose: () => void
    onBorrow: (book: Book, dueDate: string) => void
    onLoginClick: () => void
}

export function BookModal({ book, onClose, onBorrow, onLoginClick }: BookModalProps) {
    const { isAuthenticated, user } = useAuth()
    const [borrowDuration, setBorrowDuration] = useState(14) // Default 14 days
    const [showConfirmation, setShowConfirmation] = useState(false)

    const calculateDueDate = (days: number) => {
        const date = new Date()
        date.setDate(date.getDate() + days)
        return date.toISOString().split("T")[0]
    }

    const handleBorrow = () => {
        if (!isAuthenticated) {
            onLoginClick()
            return
        }

        setShowConfirmation(true)
    }

    const confirmBorrow = () => {
        const dueDate = calculateDueDate(borrowDuration)
        onBorrow(book, dueDate)
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
                layoutId={`book-${book.id}`}
                className="fixed inset-x-4 bottom-0 md:inset-[25%] z-50 bg-white dark:bg-zinc-900 rounded-t-xl md:rounded-xl overflow-y-auto max-h-[80vh] md:max-h-[500px]"
            >
                <div className="h-full md:flex">
                    <div className="relative md:w-2/5">
                        <Image
                            width={300}
                            height={400}
                            src={book.coverImage || "/placeholder.svg"}
                            alt={book.title}
                            className="w-full h-[300px] md:h-full object-cover"
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="p-4 md:w-3/5 flex flex-col">
                        <div className="flex-1 overflow-y-auto">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h2 className="text-lg font-medium">{book.title}</h2>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">by {book.author}</p>
                                </div>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${book.available
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                        }`}
                                >
                                    {book.available ? "Available" : "Borrowed"}
                                </span>
                            </div>
                            <div className="space-y-3 mt-4">
                                <p className="text-sm text-zinc-600 dark:text-zinc-300">{book.description}</p>
                                <div className="text-xs space-y-1">
                                    <p className="text-zinc-500">ISBN: {book.isbn}</p>
                                    <p className="text-zinc-500">Category: {book.category}</p>
                                </div>
                            </div>

                            {book.available && (
                                <div className="mt-4 space-y-2">
                                    <p className="text-sm font-medium">Borrow Duration</p>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="range"
                                            min="1"
                                            max="30"
                                            value={borrowDuration}
                                            onChange={(e) => setBorrowDuration(Number.parseInt(e.target.value))}
                                            className="flex-1"
                                        />
                                        <span className="text-sm">{borrowDuration} days</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                                        <Calendar className="w-4 h-4" />
                                        <span>Due date: {calculateDueDate(borrowDuration)}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {book.available ? (
                            <button
                                onClick={handleBorrow}
                                className="w-full mt-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
                            >
                                {!isAuthenticated && <LogIn className="w-4 h-4" />}
                                {isAuthenticated ? "Borrow Book" : "Sign in to Borrow"}
                            </button>
                        ) : (
                            <div className="w-full mt-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm font-medium rounded-md text-center">
                                Currently Unavailable
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            <ConfirmationModal
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={confirmBorrow}
                title="Confirm Borrowing"
                message={`Are you sure you want to borrow "${book.title}" for ${borrowDuration} days? It will be due on ${calculateDueDate(
                    borrowDuration,
                )}.`}
                confirmText="Borrow"
                type="info"
            />
        </>
    )
}
