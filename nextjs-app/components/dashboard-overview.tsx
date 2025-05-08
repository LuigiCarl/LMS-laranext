"use client"

import { BookIcon, BookOpenIcon, ClockIcon, UsersIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentBorrows } from "./recent-borrows"

const statsData = [
  {
    title: "Total Books",
    value: "2,845",
    description: "Books in collection",
    icon: BookIcon,
    trend: "+12 this month",
    trendUp: true,
  },
  {
    title: "Active Borrows",
    value: "186",
    description: "Books currently borrowed",
    icon: BookOpenIcon,
    trend: "+8 this week",
    trendUp: true,
  },
  {
    title: "Overdue Returns",
    value: "24",
    description: "Books past due date",
    icon: ClockIcon,
    trend: "-3 from last week",
    trendUp: false,
  },
  {
    title: "Registered Users",
    value: "1,253",
    description: "Active library members",
    icon: UsersIcon,
    trend: "+15 this month",
    trendUp: true,
  },
]

const activityData = [
  { date: "2024-01-01", borrows: 12, returns: 8 },
  { date: "2024-01-02", borrows: 15, returns: 10 },
  { date: "2024-01-03", borrows: 18, returns: 14 },
  { date: "2024-01-04", borrows: 22, returns: 16 },
  { date: "2024-01-05", borrows: 25, returns: 20 },
  { date: "2024-01-06", borrows: 20, returns: 18 },
  { date: "2024-01-07", borrows: 18, returns: 15 },
  { date: "2024-01-08", borrows: 24, returns: 19 },
  { date: "2024-01-09", borrows: 28, returns: 22 },
  { date: "2024-01-10", borrows: 30, returns: 25 },
  { date: "2024-01-11", borrows: 26, returns: 24 },
  { date: "2024-01-12", borrows: 22, returns: 20 },
  { date: "2024-01-13", borrows: 18, returns: 16 },
  { date: "2024-01-14", borrows: 15, returns: 14 },
]

const chartConfig = {
  borrows: {
    label: "Borrows",
    color: "hsl(var(--chart-1))",
  },
  returns: {
    label: "Returns",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function DashboardOverview() {
  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="@container/card">
            <CardHeader className="relative">
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">{stat.value}</CardTitle>
              <div className="absolute right-4 top-4">
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                <span
                  className={stat.trendUp ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}
                >
                  {stat.trend}
                </span>
              </div>
              <div className="text-muted-foreground">{stat.description}</div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Library Activity</CardTitle>
            <CardDescription>Borrow and return activity over the last 14 days</CardDescription>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="fillBorrows" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-borrows)" stopOpacity={1.0} />
                    <stop offset="95%" stopColor="var(--color-borrows)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillReturns" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-returns)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-returns)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area dataKey="returns" type="natural" fill="url(#fillReturns)" stroke="var(--color-returns)" />
                <Area dataKey="borrows" type="natural" fill="url(#fillBorrows)" stroke="var(--color-borrows)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest borrow and return transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="borrows">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="borrows">Borrows</TabsTrigger>
                <TabsTrigger value="returns">Returns</TabsTrigger>
              </TabsList>
              <TabsContent value="borrows" className="mt-4 space-y-4">
                <RecentBorrows type="borrow" />
              </TabsContent>
              <TabsContent value="returns" className="mt-4 space-y-4">
                <RecentBorrows type="return" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
