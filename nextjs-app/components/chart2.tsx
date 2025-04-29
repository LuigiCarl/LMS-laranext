"use client"

import { useTheme } from "next-themes" // 🆕 import
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Chart2() {
  const { theme } = useTheme(); // 🆕 get theme
  
  const chartData = [
    {
      browser: "safari",
      visitors: 200,
      fill: theme === "dark" ? "#ffffff" : "#000000", // 🎯 dynamic color
    },
  ];

  return (
    <Card className="flex flex-col h-full bg-muted/50">
      <CardHeader className="items-center pb-0">
        <CardTitle>Today</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 relative">
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={250}
              innerRadius="65%"
              outerRadius="80%"
            >
              <PolarGrid gridType="circle" radialLines={false} stroke="none" />
              <RadialBar dataKey="visitors" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !("cx" in viewBox && "cy" in viewBox)) return null
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl md:text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-xs md:text-base"
                        >
                          Users
                        </tspan>
                      </text>
                    )
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center text-xs md:text-sm font-medium">
        Online
      </CardFooter>
    </Card>
  )
}
