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
        icon: Users,
          description: "From 5 months",
    color: "bg-blue-500",
      },
      {
        title: "Scheduled Today",
        value: interviewSummary.scheduleToday ?? 0,
        change: "+2",
        changeType: "positive",
        icon: Calendar,
    description: "This day",
    color: "bg-green-500",
    
      },
      {
        title: "Completed This Week",
        value: interviewSummary.completedCount ?? 0,
        change: "+12%",
        changeType: "positive",
        icon: CheckCircle,
           description: "This week",
    color: "bg-orange-500",

      },
      {
        title: "No-Shows",
        value: interviewSummary.nowshowCount ?? 0,
        change: "-1",
        changeType: "negative",
        icon: XCircle,
           description: "This month",
    color: "bg-red-500",
      },

  ]
  

  return (
   <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stat.map((kpi, index) => {
        const Icon = kpi.icon

        return (
          <Card
            key={index}
            className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 hover:scale-[1.02] group"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${kpi.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                <Icon
                  className={`h-4 w-4 text-white`}
                  style={{ color: kpi.color.replace("bg-", "").replace("-500", "") }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold group-hover:text-3xl transition-all duration-300">{kpi.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
                </div>
                {/* <Badge
                  variant={kpi.trend === "up" ? "default" : "destructive"}
                  className="flex items-center gap-1 px-2 py-1"
                >
                  <TrendIcon className="h-3 w-3" />
                  {kpi.change}
                </Badge> */}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default L_Card
