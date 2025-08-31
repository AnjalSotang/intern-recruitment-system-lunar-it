import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Briefcase, UserCheck, Calendar, Users, CheckCircle, XCircle } from "lucide-react"
import { useInterviewStore } from '../../../../store/InterviewStore'


const L_Card = () => {
  const { interviewSummary } = useInterviewStore()

  const stat = [
         {
        title: "Total Interviews",
        value: interviewSummary.totalInterview ?? 0,
        change: "+5",
        changeType: "positive",
        icon: Users
      },
      {
        title: "Scheduled Today",
        value: interviewSummary.scheduleToday ?? 0,
        change: "+2",
        changeType: "positive",
        icon: Calendar,
      },
      {
        title: "Completed This Week",
        value: interviewSummary.completedCount ?? 0,
        change: "+12%",
        changeType: "positive",
        icon: CheckCircle,

      },
      {
        title: "No-Shows",
        value: interviewSummary.nowshowCount ?? 0,
        change: "-1",
        changeType: "negative",
        icon: XCircle,
      },

  ]
  

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stat.map((kpi) => (
        <Card className=''
          key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            {/* <p className="text-xs text-muted-foreground">
              <span className={kpi.changeType === "positive" ? "text-green-600" : "text-red-600"}>{kpi.change}</span>{" "}
              from last month
            </p> */}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default L_Card
