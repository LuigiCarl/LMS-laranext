"use client"

import { useState, useEffect } from "react"
import { SearchIcon, XIcon } from "lucide-react"
import { SidebarInput } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"

// Mock data for search suggestions
const searchSuggestions = [
  "Harry Potter",
  "To Kill a Mockingbird",
  "1984",
  "The Great Gatsby",
  "Pride and Prejudice",
  "The Catcher in the Rye",
]

export function LibrarySearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<{
    books: any[]
    users: any[]
  }>({
    books: [],
    users: [],
  })
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [availableOnly, setAvailableOnly] = useState(false)
  const [sortBy, setSortBy] = useState<string>("relevance")
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = searchSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }, [searchQuery])

  const handleSearch = (query: string) => {
    // Add to search history if not already present
    if (query.length > 2 && !searchHistory.includes(query)) {
      setSearchHistory((prev) => [query, ...prev].slice(0, 5))
    }

    // Mock search functionality with enhanced filtering
    if (query.length > 2) {
      // Mock books data with more details
      const allBooks = [
        {
          id: 1,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          status: "Available",
          category: "Fiction",
          publishedYear: 1960,
          coverImage:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        {
          id: 2,
          title: "1984",
          author: "George Orwell",
          status: "Borrowed",
          category: "Science Fiction",
          publishedYear: 1949,
          coverImage:
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        {
          id: 3,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          status: "Available",
          category: "Fiction",
          publishedYear: 1925,
          coverImage:
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        {
          id: 4,
          title: "Pride and Prejudice",
          author: "Jane Austen",
          status: "Available",
          category: "Romance",
          publishedYear: 1813,
          coverImage:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        {
          id: 5,
          title: "The Catcher in the Rye",
          author: "J.D. Salinger",
          status: "Borrowed",
          category: "Fiction",
          publishedYear: 1951,
          coverImage:
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
      ]

      // Filter books based on search query
      let filteredBooks = allBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()),
      )

      // Apply category filter if not "all"
      if (selectedCategory !== "all") {
        filteredBooks = filteredBooks.filter((book) => book.category === selectedCategory)
      }

      // Apply availability filter
      if (availableOnly) {
        filteredBooks = filteredBooks.filter((book) => book.status === "Available")
      }

      // Apply sorting
      if (sortBy === "title") {
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title))
      } else if (sortBy === "author") {
        filteredBooks.sort((a, b) => a.author.localeCompare(b.author))
      } else if (sortBy === "year") {
        filteredBooks.sort((a, b) => a.publishedYear - b.publishedYear)
      }
      // "relevance" sorting is the default order

      // Mock users data
      const filteredUsers = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
        { id: 3, name: "Robert Johnson", email: "robert@example.com" },
      ].filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()),
      )

      setSearchResults({
        books: filteredBooks,
        users: filteredUsers,
      })
    } else {
      setSearchResults({ books: [], users: [] })
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    handleSearch(suggestion)
    setShowSuggestions(false)
  }

  const handleHistoryClick = (historyItem: string) => {
    setSearchQuery(historyItem)
    handleSearch(historyItem)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults({ books: [], users: [] })
  }

  return (
    <div className="px-2 pt-2">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <SidebarInput
              placeholder="Search books, users..."
              className="pl-8 pr-8"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                handleSearch(e.target.value)
              }}
            />
            {searchQuery && (
              <button
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation()
                  clearSearch()
                }}
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
            {showSuggestions && (
              <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-md">
                <ul className="py-1">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Search Results</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-col gap-4 mb-4 sm:flex-row">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search books, users..."
                  className="pl-8 pr-8"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    handleSearch(e.target.value)
                  }}
                />
                {searchQuery && (
                  <button
                    className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                    onClick={clearSearch}
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value)
                    handleSearch(searchQuery)
                  }}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Fiction">Fiction</SelectItem>
                    <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                    <SelectItem value="Romance">Romance</SelectItem>
                    <SelectItem value="Mystery">Mystery</SelectItem>
                    <SelectItem value="Biography">Biography</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={sortBy}
                  onValueChange={(value) => {
                    setSortBy(value)
                    handleSearch(searchQuery)
                  }}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="year">Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="available-only"
                checked={availableOnly}
                onCheckedChange={(checked) => {
                  setAvailableOnly(checked as boolean)
                  handleSearch(searchQuery)
                }}
              />
              <Label htmlFor="available-only">Show available books only</Label>
            </div>

            {searchHistory.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Recent searches:</p>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((item, index) => (
                    <Button key={index} variant="outline" size="sm" onClick={() => handleHistoryClick(item)}>
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Tabs defaultValue="books">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="books">Books ({searchResults.books.length})</TabsTrigger>
                <TabsTrigger value="users">Users ({searchResults.users.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="books" className="mt-4">
                {searchResults.books.length > 0 ? (
                  <div className="space-y-3">
                    {searchResults.books.map((book) => (
                      <div key={book.id} className="flex items-center gap-4 rounded-lg border p-3">
                        <div className="h-16 w-12 overflow-hidden rounded-md border flex-shrink-0">
                          {book.coverImage ? (
                            <Image
                            width={300}
                            height={400}
                              src={book.coverImage || "/placeholder.svg"}
                              alt={`Cover for ${book.title}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                              <span className="text-xs text-muted-foreground">No cover</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{book.title}</h4>
                          <p className="text-sm text-muted-foreground">by {book.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {book.category} • {book.publishedYear}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              book.status === "Available"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                            }`}
                          >
                            {book.status}
                          </span>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No books found</p>
                )}
              </TabsContent>
              <TabsContent value="users" className="mt-4">
                {searchResults.users.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No users found</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
