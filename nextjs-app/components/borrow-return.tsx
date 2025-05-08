"use client"

import { useState } from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookIcon,
  BookOpenIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for borrows
const initialBorrows = [
  {
    id: 1,
    bookId: 1,
    bookTitle: "To Kill a Mockingbird",
    userId: 1,
    userName: "John Doe",
    userAvatar: "/placeholder-user.jpg",
    userInitials: "JD",
    borrowDate: "2024-01-10",
    dueDate: "2024-01-24",
    returnDate: null,
    status: "active",
  },
  {
    id: 2,
    bookId: 2,
    bookTitle: "1984",
    userId: 2,
    userName: "Jane Smith",
    userAvatar: "/placeholder-user.jpg",
    userInitials: "JS",
    borrowDate: "2024-01-05",
    dueDate: "2024-01-19",
    returnDate: null,
    status: "overdue",
  },
  {
    id: 3,
    bookId: 3,
    bookTitle: "The Great Gatsby",
    userId: 3,
    userName: "Robert Johnson",
    userAvatar: "/placeholder-user.jpg",
    userInitials: "RJ",
    borrowDate: "2024-01-12",
    dueDate: "2024-01-26",
    returnDate: null,
    status: "active",
  },
  {
    id: 4,
    bookId: 4,
    bookTitle: "Pride and Prejudice",
    userId: 4,
    userName: "Emily Davis",
    userAvatar: "/placeholder-user.jpg",
    userInitials: "ED",
    borrowDate: "2024-01-08",
    dueDate: "2024-01-22",
    returnDate: "2024-01-15",
    status: "returned",
  },
  {
    id: 5,
    bookId: 5,
    bookTitle: "The Catcher in the Rye",
    userId: 5,
    userName: "Sarah Wilson",
    userAvatar: "/placeholder-user.jpg",
    userInitials: "SW",
    borrowDate: "2024-01-03",
    dueDate: "2024-01-17",
    returnDate: "2024-01-20",
    status: "returned-late",
  },
]

// Mock data for available books
const availableBooks = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", copies: 3, availableCopies: 2 },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", copies: 4, availableCopies: 3 },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", copies: 2, availableCopies: 1 },
  { id: 6, title: "Moby Dick", author: "Herman Melville", copies: 2, availableCopies: 2 },
  { id: 7, title: "War and Peace", author: "Leo Tolstoy", copies: 1, availableCopies: 1 },
]

// Mock data for users
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", avatar: "/placeholder-user.jpg", initials: "JD" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", avatar: "/placeholder-user.jpg", initials: "JS" },
  { id: 3, name: "Robert Johnson", email: "robert@example.com", avatar: "/placeholder-user.jpg", initials: "RJ" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", avatar: "/placeholder-user.jpg", initials: "ED" },
  { id: 5, name: "Sarah Wilson", email: "sarah@example.com", avatar: "/placeholder-user.jpg", initials: "SW" },
]

export function BorrowReturn() {
  const [borrows, setBorrows] = useState(initialBorrows)
  const [searchQuery, setSearchQuery] = useState("")
  const [isBorrowDialogOpen, setIsBorrowDialogOpen] = useState(false)
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false)
  const [selectedBorrow, setSelectedBorrow] = useState<any>(null)
  const [newBorrow, setNewBorrow] = useState({
    bookId: "",
    userId: "",
    dueDate: "",
  })

  const activeBorrows = borrows.filter((borrow) => borrow.status === "active" || borrow.status === "overdue")

  const returnedBorrows = borrows.filter((borrow) => borrow.status === "returned" || borrow.status === "returned-late")

  const filteredBorrows = searchQuery
    ? borrows.filter(
        (borrow) =>
          borrow.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          borrow.userName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : borrows

  const handleNewBorrow = () => {
    const today = new Date()
    const dueDate = new Date(newBorrow.dueDate || today.setDate(today.getDate() + 14))

    const selectedBook = availableBooks.find((book) => book.id === Number.parseInt(newBorrow.bookId))
    const selectedUser = users.find((user) => user.id === Number.parseInt(newBorrow.userId))

    if (!selectedBook || !selectedUser) return

    const newBorrowRecord = {
      id: borrows.length + 1,
      bookId: selectedBook.id,
      bookTitle: selectedBook.title,
      userId: selectedUser.id,
      userName: selectedUser.name,
      userAvatar: selectedUser.avatar,
      userInitials: selectedUser.initials,
      borrowDate: new Date().toISOString().split("T")[0],
      dueDate: dueDate.toISOString().split("T")[0],
      returnDate: null,
      status: "active",
    }

    setBorrows([...borrows, newBorrowRecord])
    setNewBorrow({
      bookId: "",
      userId: "",
      dueDate: "",
    })
    setIsBorrowDialogOpen(false)
  }

  const handleReturn = () => {
    if (!selectedBorrow) return

    const today = new Date()
    const dueDate = new Date(selectedBorrow.dueDate)
    const isLate = today > dueDate

    const updatedBorrows = borrows.map((borrow) =>
      borrow.id === selectedBorrow.id
        ? {
            ...borrow,
            returnDate: today.toISOString().split("T")[0],
            status: isLate ? "returned-late" : "returned",
          }
        : borrow,
    )

    setBorrows(updatedBorrows)
    setIsReturnDialogOpen(false)
    setSelectedBorrow(null)
  }

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <BookOpenIcon className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Borrow & Return</h2>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search borrows..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={isBorrowDialogOpen} onOpenChange={setIsBorrowDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <ArrowRightIcon className="mr-2 h-4 w-4" />
                New Borrow
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Issue Book</DialogTitle>
                <DialogDescription>Select a book and user to create a new borrow record.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="book" className="text-right">
                    Book
                  </Label>
                  <Select
                    value={newBorrow.bookId}
                    onValueChange={(value) => setNewBorrow({ ...newBorrow, bookId: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select book" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBooks.map((book) => (
                        <SelectItem key={book.id} value={book.id.toString()}>
                          {book.title} ({book.availableCopies} available)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="user" className="text-right">
                    User
                  </Label>
                  <Select
                    value={newBorrow.userId}
                    onValueChange={(value) => setNewBorrow({ ...newBorrow, userId: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="due-date" className="text-right">
                    Due Date
                  </Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={newBorrow.dueDate}
                    onChange={(e) => setNewBorrow({ ...newBorrow, dueDate: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBorrowDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNewBorrow}>Issue Book</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">
            Active Borrows <Badge className="ml-2">{activeBorrows.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="history">
            Return History <Badge className="ml-2">{returnedBorrows.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Borrow Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeBorrows.length > 0 ? (
                  activeBorrows.map((borrow) => (
                    <TableRow key={borrow.id}>
                      <TableCell className="font-medium">{borrow.bookTitle}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={borrow.userAvatar || "/placeholder.svg"} alt={borrow.userName} />
                            <AvatarFallback>{borrow.userInitials}</AvatarFallback>
                          </Avatar>
                          <span>{borrow.userName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(borrow.borrowDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(borrow.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {borrow.status === "overdue" ? (
                          <Badge
                            variant="outline"
                            className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          >
                            <ClockIcon className="mr-1 h-3 w-3" /> Overdue
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          >
                            <CheckCircleIcon className="mr-1 h-3 w-3" /> Active
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedBorrow(borrow)
                            setIsReturnDialogOpen(true)
                          }}
                        >
                          <ArrowLeftIcon className="mr-2 h-4 w-4" />
                          Return
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No active borrows found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Borrow Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {returnedBorrows.length > 0 ? (
                  returnedBorrows.map((borrow) => (
                    <TableRow key={borrow.id}>
                      <TableCell className="font-medium">{borrow.bookTitle}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={borrow.userAvatar || "/placeholder.svg"} alt={borrow.userName} />
                            <AvatarFallback>{borrow.userInitials}</AvatarFallback>
                          </Avatar>
                          <span>{borrow.userName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(borrow.borrowDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(borrow.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{borrow.returnDate && new Date(borrow.returnDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {borrow.status === "returned-late" ? (
                          <Badge
                            variant="outline"
                            className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          >
                            <ClockIcon className="mr-1 h-3 w-3" /> Returned Late
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          >
                            <CheckCircleIcon className="mr-1 h-3 w-3" /> Returned
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No return history found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Return Book Dialog */}
      <Dialog open={isReturnDialogOpen} onOpenChange={setIsReturnDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Return Book</DialogTitle>
            <DialogDescription>Confirm the return of this book to the library.</DialogDescription>
          </DialogHeader>
          {selectedBorrow && (
            <div className="py-4">
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2">
                  <BookIcon className="h-5 w-5 text-muted-foreground" />
                  <p className="font-semibold">{selectedBorrow.bookTitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                  <p>Borrowed by: {selectedBorrow.userName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  <p>Due date: {new Date(selectedBorrow.dueDate).toLocaleDateString()}</p>
                </div>
                {new Date() > new Date(selectedBorrow.dueDate) && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <ClockIcon className="h-5 w-5" />
                    <p>This book is overdue!</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReturnDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReturn}>Confirm Return</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
