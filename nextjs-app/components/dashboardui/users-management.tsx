"use client"

import { useEffect, useState } from "react"
import {
  BookOpenIcon,
  EditIcon,
  MailIcon,
  MoreHorizontalIcon,
  PhoneIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
  UserIcon,
  ShieldIcon,
  ShieldOffIcon,
  AlertTriangleIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { User } from "@/types/user"
import apiClient from "@/lib/axios"

export function UsersManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false)
  const [isViewUserOpen, setIsViewUserOpen] = useState(false)
  const [isBlockUserOpen, setIsBlockUserOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  })
  const [showBlocked, setShowBlocked] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)
  const [blockLoading, setBlockLoading] = useState(false)
  const [blockError, setBlockError] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [addUserError, setAddUserError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    apiClient.get<User[]>("/users")
      .then(res => {
        // Defensive: always set to array
        if (Array.isArray(res.data)) {
          setUsers(res.data)
        } else if (res.data && typeof res.data === "object" && Array.isArray((res.data as any).data)) {
          setUsers((res.data as any).data)
        } else {
          setUsers([])
        }
      })
      .catch(() => {
        setUsers([]) // Show empty table if error
        // Do not set error, so table renders with "No users found"
      })
      .finally(() => setLoading(false))
  }, [])

  // Defensive: always use an array for mapping
  const mappedUsers = Array.isArray(users)
    ? users.map(u => ({
        ...u,
        registeredDate: u.created_at,
        initials: u.name ? u.name.split(" ").map(n => n[0]).join("") : "",
        //avatar: "/placeholder-user.svg",
        activeBorrows: 1,
        isBlocked: u.status === "blocked",
      }))
    : []

  const filteredUsers = mappedUsers.filter(
    (user) =>
      (showBlocked || !user.isBlocked) &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.phone ?? "").includes(searchQuery)),
  )

  const handleAddUser = async () => {
    setAddUserError(null)
    try {
      // POST to backend endpoint /users
      await apiClient.post("/users", {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        password: newUser.password,
        role: "user",
        status: "active",
      })
      // Refresh users from backend after add
      setLoading(true)
      apiClient.get<User[]>("/users")
        .then(res => {
          if (Array.isArray(res.data)) {
            setUsers(res.data)
          } else if (res.data && typeof res.data === "object" && Array.isArray((res.data as any).data)) {
            setUsers((res.data as any).data)
          } else {
            setUsers([])
          }
        })
        .catch(() => {
          setUsers([])
        })
        .finally(() => setLoading(false))
      setNewUser({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
      })
      setIsAddUserOpen(false)
    } catch (err: any) {
      // Show backend validation error for password
      if (err?.response?.data?.errors?.password?.length) {
        setAddUserError(err.response.data.errors.password.join(" "))
      } else if (err?.message) {
        setAddUserError(err.message)
      } else {
        setAddUserError("Failed to add user")
      }
    }
  }

  // Edit User (PUT to backend)
  const handleEditUser = async () => {
    if (!currentUser) return
    setEditLoading(true)
    setEditError(null)
    try {
      // Only send editable fields
      const payload = {
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.address,
      }
      // Use the custom hook or apiClient directly
      await apiClient.put(`/users/${currentUser.id}`, payload)
      // Refresh users from backend after update
      setLoading(true)
      apiClient.get<User[]>("/users")
        .then(res => {
          if (Array.isArray(res.data)) {
            setUsers(res.data)
          } else if (res.data && typeof res.data === "object" && Array.isArray((res.data as any).data)) {
            setUsers((res.data as any).data)
          } else {
            setUsers([])
          }
        })
        .catch(() => setError("Failed to load users"))
        .finally(() => setLoading(false))
      setIsEditUserOpen(false)
      setCurrentUser(null)
    } catch (err: any) {
      setEditError(err?.message || "Failed to update user")
    } finally {
      setEditLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!currentUser) return
    setDeleteLoading(true)
    setDeleteError(null)
    try {
      await apiClient.delete(`/users/${currentUser.id}`)
      // Refresh users from backend after delete
      setLoading(true)
      apiClient.get<User[]>("/users")
        .then(res => {
          if (Array.isArray(res.data)) {
            setUsers(res.data)
          } else if (res.data && typeof res.data === "object" && Array.isArray((res.data as any).data)) {
            setUsers((res.data as any).data)
          } else {
            setUsers([])
          }
        })
        .catch(() => setError("Failed to load users"))
        .finally(() => setLoading(false))
      setIsDeleteUserOpen(false)
      setShowDeleteConfirm(false)
      setCurrentUser(null)
    } catch (err: any) {
      setDeleteError(err?.message || "Failed to delete user")
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleBlockUser = async () => {
    if (!currentUser) return
    setBlockLoading(true)
    setBlockError(null)
    try {
      // Toggle status between "active" and "blocked" as required by backend validation
      const newStatus = currentUser.status === "blocked" ? "active" : "blocked"
      await apiClient.put(`/users/${currentUser.id}`, { status: newStatus })
      // Refresh users from backend after update
      setLoading(true)
      apiClient.get<User[]>("/users")
        .then(res => {
          if (Array.isArray(res.data)) {
            setUsers(res.data)
          } else if (res.data && typeof res.data === "object" && Array.isArray((res.data as any).data)) {
            setUsers((res.data as any).data)
          } else {
            setUsers([])
          }
        })
        .catch(() => setError("Failed to load users"))
        .finally(() => setLoading(false))
      setIsBlockUserOpen(false)
      setCurrentUser(null)
    } catch (err: any) {
      setBlockError(err?.message || "Failed to update user status")
    } finally {
      setBlockLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
        <span className="text-muted-foreground">Loading users...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Users Management</h2>
          <Badge variant="outline" className="ml-2">
            {users.length} Users
          </Badge>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="show-blocked" checked={showBlocked} onCheckedChange={setShowBlocked} />
            <Label htmlFor="show-blocked">Show blocked users</Label>
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Enter the details of the new user to register in the library system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={newUser.address}
                    onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                {addUserError && (
                  <div className="col-span-4 text-red-600">{addUserError}</div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Registered Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active Borrows</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className={user.isBlocked ? "bg-red-50 dark:bg-red-950/20" : ""}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        {/* <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} /> */}
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{new Date(user.registeredDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {user.isBlocked ? (
                      <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                        <ShieldOffIcon className="mr-1 h-3 w-3" /> Blocked
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        <ShieldIcon className="mr-1 h-3 w-3" /> Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.activeBorrows > 0 ? (
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        <BookOpenIcon className="mr-1 h-3 w-3" /> {user.activeBorrows}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
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
                            setCurrentUser(user)
                            setIsViewUserOpen(true)
                          }}
                        >
                          <UserIcon className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentUser(user)
                            setIsEditUserOpen(true)
                          }}
                        >
                          <EditIcon className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentUser(user)
                            setIsBlockUserOpen(true)
                          }}
                        >
                          {user.isBlocked ? (
                            <>
                              <ShieldIcon className="mr-2 h-4 w-4 text-green-600" />
                              <span className="text-green-600">Unblock User</span>
                            </>
                          ) : (
                            <>
                              <ShieldOffIcon className="mr-2 h-4 w-4 text-red-600" />
                              <span className="text-red-600">Block User</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentUser(user)
                            setIsDeleteUserOpen(true)
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
                <TableCell colSpan={7} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* View User Dialog */}
      <Dialog open={isViewUserOpen} onOpenChange={setIsViewUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {currentUser && (
            <div className="py-4">
              <div className="flex flex-col items-center gap-4 mb-6">
                <Avatar className="h-20 w-20">
                  {/* <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} /> */}
                  <AvatarFallback className="text-xl">{currentUser.initials}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{currentUser.name}</h3>
                  {currentUser.isBlocked && (
                    <Badge variant="outline" className="mt-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                      <ShieldOffIcon className="mr-1 h-3 w-3" /> Blocked User
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MailIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{currentUser.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <UserIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{currentUser.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpenIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Active Borrows</p>
                    <p className="text-sm text-muted-foreground">
                      {currentUser.activeBorrows > 0
                        ? `${currentUser.activeBorrows} books currently borrowed`
                        : "No active borrows"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewUserOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update the details of the selected user.</DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="edit-phone"
                  value={currentUser.phone}
                  onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right">
                  Address
                </Label>
                <Input
                  id="edit-address"
                  value={currentUser.address}
                  onChange={(e) => setCurrentUser({ ...currentUser, address: e.target.value })}
                  className="col-span-3"
                />
              </div>
              {editError && <div className="text-red-600 col-span-4">{editError}</div>}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser} disabled={editLoading}>
              {editLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user from the library system?
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="py-4">
              <p className="mb-2">You are about to delete:</p>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  {/* <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} /> */}
                  <AvatarFallback>{currentUser.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{currentUser.name}</p>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                </div>
              </div>
              {currentUser.activeBorrows > 0 && (
                <div className="mt-4 p-3 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-md">
                  <p className="text-sm font-medium">
                    Warning: This user has {currentUser.activeBorrows} active borrows.
                  </p>
                  <p className="text-sm">Deleting this user will not remove their borrow records.</p>
                </div>
              )}
              {deleteError && <div className="text-red-600 mt-2">{deleteError}</div>}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteUserOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleteLoading}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you absolutely sure you want to permanently delete this user?
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="py-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  {/* <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} /> */}
                  <AvatarFallback>{currentUser.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{currentUser.name}</p>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                </div>
              </div>
              {currentUser.activeBorrows > 0 && (
                <div className="mt-4 p-3 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-md">
                  <p className="text-sm font-medium">
                    Warning: This user has {currentUser.activeBorrows} active borrows.
                  </p>
                  <p className="text-sm">Deleting this user will not remove their borrow records.</p>
                </div>
              )}
              {deleteError && <div className="text-red-600 mt-2">{deleteError}</div>}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteUser}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Confirm Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block/Unblock User Dialog */}
      <Dialog open={isBlockUserOpen} onOpenChange={setIsBlockUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentUser?.status === "blocked" ? "Unblock User" : "Block User"}
            </DialogTitle>
            <DialogDescription>
              {currentUser?.status === "blocked"
                ? "This will allow the user to borrow books and access the client portal again."
                : "This will prevent the user from borrowing books or accessing the client portal."}
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="py-4">
              <div className="flex items-center gap-2 mb-4">
                <Avatar className="h-8 w-8">
                  {/* <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} /> */}
                  <AvatarFallback>{currentUser.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{currentUser.name}</p>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                </div>
              </div>

              {!currentUser.isBlocked && currentUser.activeBorrows > 0 && (
                <div className="mt-4 p-3 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-md flex items-start gap-2">
                  <AlertTriangleIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">This user has {currentUser.activeBorrows} active borrows.</p>
                    <p className="text-sm">
                      Blocking this user will prevent them from borrowing more books, but they will still be responsible
                      for returning currently borrowed items.
                    </p>
                  </div>
                </div>
              )}
              {blockError && <div className="text-red-600 mt-2">{blockError}</div>}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBlockUserOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={currentUser?.status === "blocked" ? "default" : "destructive"}
              onClick={handleBlockUser}
              disabled={blockLoading}
            >
              {blockLoading
                ? (currentUser?.status === "blocked" ? "Unblocking..." : "Blocking...")
                : (currentUser?.status === "blocked" ? "Unblock User" : "Block User")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
