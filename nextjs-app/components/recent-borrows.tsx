import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircleIcon, ClockIcon } from "lucide-react"

interface RecentBorrowsProps {
  type: "borrow" | "return"
}

export function RecentBorrows({ type }: RecentBorrowsProps) {
  // Mock data for recent borrows and returns
  const borrowData = [
    {
      id: 1,
      user: { name: "John Doe", avatar: "/placeholder-user.jpg", initials: "JD" },
      book: "To Kill a Mockingbird",
      date: "2024-01-14",
      dueDate: "2024-01-28",
      status: "active",
    },
    {
      id: 2,
      user: { name: "Jane Smith", avatar: "/placeholder-user.jpg", initials: "JS" },
      book: "1984",
      date: "2024-01-13",
      dueDate: "2024-01-27",
      status: "active",
    },
    {
      id: 3,
      user: { name: "Robert Johnson", avatar: "/placeholder-user.jpg", initials: "RJ" },
      book: "The Great Gatsby",
      date: "2024-01-12",
      dueDate: "2024-01-26",
      status: "overdue",
    },
    {
      id: 4,
      user: { name: "Emily Davis", avatar: "/placeholder-user.jpg", initials: "ED" },
      book: "Pride and Prejudice",
      date: "2024-01-11",
      dueDate: "2024-01-25",
      status: "active",
    },
  ]

  const returnData = [
    {
      id: 1,
      user: { name: "Sarah Wilson", avatar: "/placeholder-user.jpg", initials: "SW" },
      book: "The Catcher in the Rye",
      date: "2024-01-14",
      status: "on-time",
    },
    {
      id: 2,
      user: { name: "Michael Brown", avatar: "/placeholder-user.jpg", initials: "MB" },
      book: "Lord of the Flies",
      date: "2024-01-13",
      status: "late",
    },
    {
      id: 3,
      user: { name: "Lisa Taylor", avatar: "/placeholder-user.jpg", initials: "LT" },
      book: "Animal Farm",
      date: "2024-01-12",
      status: "on-time",
    },
    {
      id: 4,
      user: { name: "David Miller", avatar: "/placeholder-user.jpg", initials: "DM" },
      book: "Brave New World",
      date: "2024-01-11",
      status: "on-time",
    },
  ]

  const data: (typeof borrowData[number] | typeof returnData[number])[] = type === "borrow" ? borrowData : returnData

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.id} className="flex items-start gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
            <AvatarFallback>{item.user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{item.user.name}</p>
              {type === "borrow" && item.status === "overdue" && (
                <span className="flex items-center text-xs text-amber-600 dark:text-amber-400">
                  <ClockIcon className="mr-1 h-3 w-3" /> Overdue
                </span>
              )}
              {type === "return" && item.status === "late" && (
                <span className="flex items-center text-xs text-amber-600 dark:text-amber-400">
                  <ClockIcon className="mr-1 h-3 w-3" /> Returned late
                </span>
              )}
              {type === "return" && item.status === "on-time" && (
                <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                  <CheckCircleIcon className="mr-1 h-3 w-3" /> On time
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {type === "borrow" ? "Borrowed" : "Returned"} <span className="font-medium">{item.book}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              {type === "borrow" && (
                <>
                  {" "}
                  · Due:{" "}
                  {type === "borrow" && "dueDate" in item && (
                    new Date(item.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
