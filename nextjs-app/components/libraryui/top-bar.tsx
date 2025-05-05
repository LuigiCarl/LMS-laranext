"use client"

import type React from "react"

import { Search, BookOpen, X, Menu } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { UserMenu } from "./user-menu"

interface TopBarProps {
    borrowedCount: number
    onBorrowedClick: () => void
    onSearch: (query: string) => void
    onLoginClick: () => void
    onCategoryChange: (category: string) => void
}

const categories = [
    "All",
    "Fiction",
    "Non-Fiction",
    "Biography",
    "Science Fiction",
    "Fantasy",
    "Psychology",
    "Self-Help",
]

export function TopBar({ borrowedCount, onBorrowedClick, onSearch, onLoginClick, onCategoryChange }: TopBarProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [isScrolled, setIsScrolled] = useState(false)
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
    const searchInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setIsSearchOpen(false)
            searchInputRef.current?.blur()
        }
    }

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category)
        onCategoryChange(category)
        setIsCategoryMenuOpen(false)
    }

    return (
        <div
            className={`sticky top-0 z-40 rounded-lg transition-all duration-200 ${isScrolled ? "bg-white/90 dark:bg-zinc-900/90 shadow-sm" : "bg-white/80 dark:bg-zinc-900/80 rounded-lg"
                } backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800`}
        >
            <div className="flex items-center justify-between px-3 h-12">
                <Link href="/" className="text-sm font-medium shrink-0">
                    Book.Hub
                </Link>

                {/* Desktop Category Navigation */}
                <div className="hidden md:flex flex-1 items-center justify-center gap-6 px-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`whitespace-nowrap transition-colors text-sm ${selectedCategory === category
                                ? "text-zinc-900 dark:text-white font-medium"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                }`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>



                <div className="flex items-center gap-2 shrink-0">
                    <motion.div
                        className="relative overflow-hidden p-1"
                        initial={false}
                        animate={{ width: isSearchOpen ? "auto" : 0 }}
                    >
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search books..."
                            className={`w-48 sm:w-56 bg-zinc-100 dark:bg-zinc-800 rounded-md text-sm px-3 py-1.5 
        focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:focus:ring-zinc-700
        transition-all duration-200 ${isSearchOpen ? "opacity-100" : "opacity-0"}`}
                            onChange={(e) => onSearch(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        {isSearchOpen && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSearchOpen(false)
                                    onSearch("")
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-zinc-200 
          dark:hover:bg-zinc-700 rounded-full"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </motion.div>

                    <button
                        type="button"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className={`p-1.5 rounded-md transition-colors ${isSearchOpen ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            } z-10`}
                    >
                        <Search className="w-4 h-4" />
                    </button>

                    {!isSearchOpen && (
                        <>
                            {/* Mobile Category Menu Toggle */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                                    className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={onBorrowedClick}
                                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md relative"
                            >
                                <BookOpen className="w-4 h-4" />
                                {borrowedCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0.5 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 bg-zinc-900 dark:bg-white 
              text-white dark:text-zinc-900 text-xs font-medium w-4 h-4 
              flex items-center justify-center rounded-full"
                                    >
                                        {borrowedCount}
                                    </motion.span>
                                )}
                            </button>

                            <UserMenu onLoginClick={onLoginClick} />
                        </>
                    )}
                </div>

            </div>

            {/* Mobile Category Menu Dropdown */}
            <AnimatePresence>
                {isCategoryMenuOpen && (
                    <motion.div
                        key="mobile-category-menu"
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-12 left-0 right-0 md:hidden overflow-hidden bg-white dark:bg-zinc-900 px-4 py-2 border-t border-zinc-200 dark:border-zinc-800 z-30"
                    >
                        <div className="flex flex-col gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`text-left text-sm ${selectedCategory === category
                                            ? "text-zinc-900 dark:text-white font-medium"
                                            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    )
}
