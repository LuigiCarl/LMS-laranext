"use client"

import type React from "react"

import { useState } from "react"
import { BookIcon, EditIcon, MoreHorizontalIcon, PlusIcon, SearchIcon, Trash2Icon, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for books with cover images
const initialBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780061120084",
    category: "Fiction",
    status: "Available",
    publishedYear: 1960,
    copies: 3,
    availableCopies: 2,
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description:
      "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    category: "Science Fiction",
    status: "Borrowed",
    publishedYear: 1949,
    copies: 5,
    availableCopies: 3,
    coverImage:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description:
      "A dystopian novel set in Airstrip One, a province of the superstate Oceania in a world of perpetual war.",
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    category: "Fiction",
    status: "Available",
    publishedYear: 1925,
    copies: 4,
    availableCopies: 4,
    coverImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description:
      "A novel about the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "9780141439518",
    category: "Romance",
    status: "Available",
    publishedYear: 1813,
    copies: 2,
    availableCopies: 1,
    coverImage: "",
    description: "A romantic novel of manners that follows the character development of Elizabeth Bennet.",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "9780316769488",
    category: "Fiction",
    status: "Borrowed",
    publishedYear: 1951,
    copies: 3,
    availableCopies: 0,
    coverImage: "",
    description: "A novel about a teenager named Holden Caulfield and his experiences in New York City.",
  },
]

export function BooksManagement() {
  const [books, setBooks] = useState(initialBooks)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddBookOpen, setIsAddBookOpen] = useState(false)
  const [isEditBookOpen, setIsEditBookOpen] = useState(false)
  const [isDeleteBookOpen, setIsDeleteBookOpen] = useState(false)
  const [isUploadCoverOpen, setIsUploadCoverOpen] = useState(false)
  const [currentBook, setCurrentBook] = useState<any>(null)
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publishedYear: "",
    copies: "1",
    description: "",
    coverImage: "",
  })
  const [coverPreview, setCoverPreview] = useState("")
  const [coverUrl, setCoverUrl] = useState("")
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery),
  )

  const handleAddBook = () => {
    const bookToAdd = {
      id: books.length + 1,
      title: newBook.title,
      author: newBook.author,
      isbn: newBook.isbn,
      category: newBook.category,
      status: "Available",
      publishedYear: Number.parseInt(newBook.publishedYear),
      copies: Number.parseInt(newBook.copies),
      availableCopies: Number.parseInt(newBook.copies),
      coverImage: newBook.coverImage,
      description: newBook.description,
    }

    setBooks([...books, bookToAdd])
    setNewBook({
      title: "",
      author: "",
      isbn: "",
      category: "",
      publishedYear: "",
      copies: "1",
      description: "",
      coverImage: "",
    })
    setIsAddBookOpen(false)
  }

  const handleEditBook = () => {
    if (!currentBook) return

    const updatedBooks = books.map((book) => (book.id === currentBook.id ? currentBook : book))

    setBooks(updatedBooks)
    setIsEditBookOpen(false)
    setCurrentBook(null)
  }

  const handleDeleteBook = () => {
    if (!currentBook) return

    const updatedBooks = books.filter((book) => book.id !== currentBook.id)
    setBooks(updatedBooks)
    setIsDeleteBookOpen(false)
    setCurrentBook(null)
  }

  const handleUploadCover = () => {
    if (!currentBook) return

    const updatedBook = { ...currentBook, coverImage: coverUrl }
    const updatedBooks = books.map((book) => (book.id === currentBook.id ? updatedBook : book))

    setBooks(updatedBooks)
    setIsUploadCoverOpen(false)
    setCoverUrl("")
    setCoverPreview("")
    setCurrentBook(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll create a local URL
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setCoverPreview(result)
        setCoverUrl(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoverUrl(e.target.value)
    setCoverPreview(e.target.value)
  }

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <BookIcon className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Books Collection</h2>
          <Badge variant="outline" className="ml-2">
            {books.length} Books
          </Badge>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "table" | "grid")}>
              <TabsList className="grid w-[120px] grid-cols-2">
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="grid">Grid</TabsTrigger>
              </TabsList>
            </Tabs>
            <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Book
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Book</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new book to add to the library collection.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={newBook.title}
                      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="author" className="text-right">
                      Author
                    </Label>
                    <Input
                      id="author"
                      value={newBook.author}
                      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="isbn" className="text-right">
                      ISBN
                    </Label>
                    <Input
                      id="isbn"
                      value={newBook.isbn}
                      onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select
                      value={newBook.category}
                      onValueChange={(value) => setNewBook({ ...newBook, category: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fiction">Fiction</SelectItem>
                        <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                        <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                        <SelectItem value="Fantasy">Fantasy</SelectItem>
                        <SelectItem value="Romance">Romance</SelectItem>
                        <SelectItem value="Mystery">Mystery</SelectItem>
                        <SelectItem value="Biography">Biography</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                        <SelectItem value="Self-Help">Self-Help</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="year" className="text-right">
                      Published Year
                    </Label>
                    <Input
                      id="year"
                      type="number"
                      value={newBook.publishedYear}
                      onChange={(e) => setNewBook({ ...newBook, publishedYear: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="copies" className="text-right">
                      Copies
                    </Label>
                    <Input
                      id="copies"
                      type="number"
                      value={newBook.copies}
                      onChange={(e) => setNewBook({ ...newBook, copies: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">
                      Description
                    </Label>
                    <textarea
                      id="description"
                      value={newBook.description}
                      onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                      className="col-span-3 min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="cover-url" className="text-right pt-2">
                      Cover Image URL
                    </Label>
                    <Input
                      id="cover-url"
                      value={newBook.coverImage}
                      onChange={(e) => setNewBook({ ...newBook, coverImage: e.target.value })}
                      placeholder="https://example.com/book-cover.jpg"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddBookOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddBook}>Add Book</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cover</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Copies</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>
                      <div className="h-16 w-12 overflow-hidden rounded-md border">
                        {book.coverImage ? (
                          <Image
                            src={book.coverImage || "/placeholder.svg"}
                            alt={`Cover for ${book.title}`}
                            width={300} // Adjust as needed
                            height={400} // Adjust as needed
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          book.status === "Available"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                        }`}
                      >
                        {book.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {book.availableCopies} / {book.copies}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentBook(book)
                              setIsUploadCoverOpen(true)
                              setCoverUrl(book.coverImage)
                              setCoverPreview(book.coverImage)
                            }}
                          >
                            <ImageIcon className="mr-2 h-4 w-4" />
                            {book.coverImage ? "Update Cover" : "Add Cover"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentBook(book)
                              setIsEditBookOpen(true)
                            }}
                          >
                            <EditIcon className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentBook(book)
                              setIsDeleteBookOpen(true)
                            }}
                            className="text-red-600 dark:text-red-400"
                          >
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No books found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="rounded-lg border overflow-hidden">
                <div className="aspect-[2/3] relative">
                  {book.coverImage ? (

                    <Image
                      src={book.coverImage || "/placeholder.svg"}
                      alt={`Cover for ${book.title}`}
                      width={300} // Adjust as needed
                      height={400} // Adjust as needed
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentBook(book)
                            setIsUploadCoverOpen(true)
                            setCoverUrl(book.coverImage)
                            setCoverPreview(book.coverImage)
                          }}
                        >
                          <ImageIcon className="mr-2 h-4 w-4" />
                          {book.coverImage ? "Update Cover" : "Add Cover"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentBook(book)
                            setIsEditBookOpen(true)
                          }}
                        >
                          <EditIcon className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentBook(book)
                            setIsDeleteBookOpen(true)
                          }}
                          className="text-red-600 dark:text-red-400"
                        >
                          <Trash2Icon className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium truncate">{book.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">by {book.author}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge
                      variant="outline"
                      className={`${
                        book.status === "Available"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                      }`}
                    >
                      {book.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {book.availableCopies}/{book.copies} copies
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full h-24 flex items-center justify-center text-muted-foreground">
              No books found.
            </div>
          )}
        </div>
      )}

      {/* Edit Book Dialog */}
      <Dialog open={isEditBookOpen} onOpenChange={setIsEditBookOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>Update the details of the selected book.</DialogDescription>
          </DialogHeader>
          {currentBook && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={currentBook.title}
                  onChange={(e) => setCurrentBook({ ...currentBook, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-author" className="text-right">
                  Author
                </Label>
                <Input
                  id="edit-author"
                  value={currentBook.author}
                  onChange={(e) => setCurrentBook({ ...currentBook, author: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-isbn" className="text-right">
                  ISBN
                </Label>
                <Input
                  id="edit-isbn"
                  value={currentBook.isbn}
                  onChange={(e) => setCurrentBook({ ...currentBook, isbn: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Category
                </Label>
                <Select
                  value={currentBook.category}
                  onValueChange={(value) => setCurrentBook({ ...currentBook, category: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fiction">Fiction</SelectItem>
                    <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                    <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                    <SelectItem value="Fantasy">Fantasy</SelectItem>
                    <SelectItem value="Romance">Romance</SelectItem>
                    <SelectItem value="Mystery">Mystery</SelectItem>
                    <SelectItem value="Biography">Biography</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Self-Help">Self-Help</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-year" className="text-right">
                  Published Year
                </Label>
                <Input
                  id="edit-year"
                  type="number"
                  value={currentBook.publishedYear}
                  onChange={(e) => setCurrentBook({ ...currentBook, publishedYear: Number.parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-copies" className="text-right">
                  Total Copies
                </Label>
                <Input
                  id="edit-copies"
                  type="number"
                  value={currentBook.copies}
                  onChange={(e) => setCurrentBook({ ...currentBook, copies: Number.parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-description" className="text-right pt-2">
                  Description
                </Label>
                <textarea
                  id="edit-description"
                  value={currentBook.description || ""}
                  onChange={(e) => setCurrentBook({ ...currentBook, description: e.target.value })}
                  className="col-span-3 min-h-[80px] rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditBookOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditBook}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Book Dialog */}
      <Dialog open={isDeleteBookOpen} onOpenChange={setIsDeleteBookOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this book from the library collection?
            </DialogDescription>
          </DialogHeader>
          {currentBook && (
            <div className="py-4">
              <p className="mb-2">You are about to delete:</p>
              <p className="font-semibold">{currentBook.title}</p>
              <p className="text-sm text-muted-foreground">by {currentBook.author}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteBookOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBook}>
              Delete Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Cover Dialog */}
      <Dialog open={isUploadCoverOpen} onOpenChange={setIsUploadCoverOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Book Cover</DialogTitle>
            <DialogDescription>
              Upload a cover image for "{currentBook?.title}" or provide an image URL.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="cover-url-input" className="text-right pt-2">
                Image URL
              </Label>
              <div className="col-span-3">
                <Input
                  id="cover-url-input"
                  value={coverUrl}
                  onChange={handleCoverUrlChange}
                  placeholder="https://example.com/book-cover.jpg"
                />
                <p className="text-xs text-muted-foreground mt-1">Enter a URL for the book cover image</p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="cover-file-input" className="text-right pt-2">
                Upload File
              </Label>
              <div className="col-span-3">
                <Input
                  id="cover-file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">Supported formats: JPG, PNG, WebP. Max size: 2MB.</p>
              </div>
            </div>
            {coverPreview && (
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Preview</Label>
                <div className="col-span-3">
                  <div className="h-48 w-32 overflow-hidden rounded-md border mx-auto">
                    <img
                      src={coverPreview || "/placeholder.svg"}
                      alt="Cover preview"
                      className="h-full w-full object-cover"
                      onError={() => setCoverPreview("")}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsUploadCoverOpen(false)
                setCoverUrl("")
                setCoverPreview("")
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleUploadCover} disabled={!coverUrl}>
              Save Cover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
