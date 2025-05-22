"use client"

import { useEffect, useState } from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookIcon,
  BookOpenIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
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
import apiClient from "@/lib/axios"
import type { Borrow } from "@/types/borrow"
import type { Book } from "@/types/book"
import type { User } from "@/types/user"

export function BorrowReturn() {
  const [borrows, setBorrows] = useState<Borrow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isBorrowDialogOpen, setIsBorrowDialogOpen] = useState(false)
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false)
  const [selectedBorrow, setSelectedBorrow] = useState<Borrow | null>(null)
  const [newBorrow, setNewBorrow] = useState({
    bookId: "",
    userId: "",
    dueDate: "",
  })
  const [books, setBooks] = useState<Book[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([
      apiClient.get<Borrow[]>("/borrows"),
      apiClient.get<Book[]>("/books"),
      apiClient.get<User[]>("/users"),
    ])
      .then(([borrowsRes, booksRes, usersRes]) => {
        setBorrows(Array.isArray(borrowsRes.data) ? borrowsRes.data : [])
        setBooks(Array.isArray(booksRes.data) ? booksRes.data : [])
        setUsers(Array.isArray(usersRes.data) ? usersRes.data : [])
      })
      .catch(() => {
        setBorrows([]) // Show empty table if error
        setBooks([])
        setUsers([])
        // Do not set error, so table renders with "No borrows found"
      })
      .finally(() => setLoading(false))
  }, [])

  // Helper for available books (books with available_copies > 0)
  const availableBooks = books.filter((b) => (b.availableCopies ?? 0) > 0)

  // Filtering and mapping for display
  const activeBorrows = borrows.filter(
    (borrow) => borrow.status === "active"
  )
  const returnedBorrows = borrows.filter(
    (borrow) => borrow.status === "returned"
  )
  const filteredBorrows = searchQuery
    ? borrows.filter(
      (borrow) =>
        (borrow.book?.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (borrow.borrower?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    )
    : borrows

  const handleNewBorrow = () => {
    const today = new Date()
    const dueDate = new Date(newBorrow.dueDate || today.setDate(today.getDate() + 14))

    const selectedBook = availableBooks.find((book) => book.id === Number.parseInt(newBorrow.bookId))
    const selectedUser = users.find((user) => user.id === Number.parseInt(newBorrow.userId))

    if (!selectedBook || !selectedUser) return

    const now = new Date().toISOString();
    const newBorrowRecord: Borrow = {
      id: borrows.length + 1,
      book_id: selectedBook.id,
      borrower_id: selectedUser.id,
      borrow_date: new Date().toISOString().split("T")[0],
      due_date: dueDate.toISOString().split("T")[0],
      return_date: null,
      status: "active",
      book: selectedBook,
      borrower: selectedUser,
      created_at: now,
      updated_at: now,
    }

    setBorrows([...borrows, newBorrowRecord])
    setNewBorrow({
      bookId: "",
      userId: "",
      dueDate: "",
    })
    setIsBorrowDialogOpen(false)
  }

  const handleReturn = async () => {
    if (!selectedBorrow) return

    const now = new Date()
    const todayStr = now.toISOString().slice(0, 19).replace("T", " ")
    const dueDate = new Date(selectedBorrow.due_date)
    // Backend only allows status: "returned"
    try {
      await apiClient.put(`/borrows/${selectedBorrow.id}`, {
        status: "returned",
        return_date: todayStr,
      });

      setLoading(true);
      await apiClient.get<Borrow[]>("/borrows")
        .then(res => setBorrows(Array.isArray(res.data) ? res.data : []))
        .catch(() => setError("Failed to load borrow data"))
        .finally(() => setLoading(false));
    } catch (err: any) {
      setError(
        err?.response?.data?.message
          ? `Failed to update borrow status: ${err.response.data.message}`
          : "Failed to update borrow status"
      );
    }

    setIsReturnDialogOpen(false)
    setSelectedBorrow(null)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
        <span className="text-muted-foreground">Loading borrows...</span>
      </div>
    )
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
              {/* <Button>
                <ArrowRightIcon className="mr-2 h-4 w-4" />
                New Borrow
              </Button> */}
            </DialogTrigger>
            <DialogContent>
              {/* <DialogHeader>
                <DialogTitle>Issue Book</DialogTitle>
                <DialogDescription>Select a book and user to create a new borrow record.</DialogDescription>
              </DialogHeader> */}
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
                      <TableCell className="font-medium">{borrow.book?.title || borrow.book_id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={"/placeholder.svg"}
                              alt={borrow.borrower?.name || ""}
                            />
                            <AvatarFallback>
                              {borrow.borrower?.name
                                ? borrow.borrower.name.split(" ").map((n) => n[0]).join("")
                                : ""}
                            </AvatarFallback>
                          </Avatar>
                          <span>{borrow.borrower?.name || borrow.borrower_id}</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(borrow.borrow_date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(borrow.due_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            borrow.status === "returned"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : new Date(borrow.due_date) < new Date() && borrow.status === "active"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          }
                        >
                          {borrow.status === "returned"
                            ? "Returned"
                            : new Date(borrow.due_date) < new Date()
                              ? "Overdue"
                              : "Active"}

                          {borrow.status === "returned" || (borrow.status === "active" && new Date(borrow.due_date) >= new Date()) ? (
                            <CheckCircleIcon className="ml-2 mr-1 h-3 w-3" />
                          ) : (
                            <XCircleIcon className="ml-2 mr-1 h-3 w-3" />
                          )}
                        </Badge>


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
                      No borrows found.
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
                  returnedBorrows.map((borrow) => {
                    const isLate =
                      borrow.return_date &&
                      new Date(borrow.return_date) > new Date(borrow.due_date)
                    return (
                      <TableRow key={borrow.id}>
                        <TableCell className="font-medium">{borrow.book?.title || borrow.book_id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={"/placeholder.svg"}
                                alt={borrow.borrower?.name || ""}
                              />
                              <AvatarFallback>
                                {borrow.borrower?.name
                                  ? borrow.borrower.name.split(" ").map((n) => n[0]).join("")
                                  : ""}
                              </AvatarFallback>
                            </Avatar>
                            <span>{borrow.borrower?.name || borrow.borrower_id}</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(borrow.borrow_date).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(borrow.due_date).toLocaleDateString()}</TableCell>
                        <TableCell>{borrow.return_date && new Date(borrow.return_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {isLate ? (
                            <Badge
                              variant="outline"
                              className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                            >
                              <XCircleIcon className="mr-1 h-3 w-3" /> Returned Late
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
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No borrows found.
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
                  <p className="font-semibold">{selectedBorrow.book?.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                  <p>Borrowed by: {selectedBorrow.borrower?.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  <p>Due date: {new Date(selectedBorrow.due_date).toLocaleDateString()}</p>
                </div>
                {new Date() > new Date(selectedBorrow.due_date) && (
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
