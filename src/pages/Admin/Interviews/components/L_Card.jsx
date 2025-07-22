import React, { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Briefcase, UserCheck, Calendar, Users, CheckCircle, XCircle } from "lucide-react"
const interviewStats = [
  {
    title: "Total Interviews",
    value: "45",
    change: "+5",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Scheduled Today",
    value: "8",
    change: "+2",
    changeType: "positive",
    icon: Calendar,
  },
  {
    title: "Completed This Week",
    value: "23",
    change: "+12%",
    changeType: "positive",
    icon: CheckCircle,
  },
  {
    title: "No-Shows",
    value: "3",
    change: "-1",
    changeType: "negative",
    icon: XCircle,
  },
]

const L_Card= () => {
  const [stats, setStats] = useState(interviewStats)
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {interviewStats.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={kpi.changeType === "positive" ? "text-green-600" : "text-red-600"}>{kpi.change}</span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default L_Card
