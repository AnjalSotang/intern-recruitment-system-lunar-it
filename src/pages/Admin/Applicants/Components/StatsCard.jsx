import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
    FileText,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Download,
    Filter,
    ArrowUpDown,
    Calendar,
    Mail,
    Star,
    Plus,
} from "lucide-react"
import { useApplicationStore } from '../../../../store/AppliactionStore'


const StatsCard = () => {
    const { applicationSummary } = useApplicationStore()
  const stats = [
    {
      title: "Total Applications",
      value: applicationSummary.totalApplication ?? 0,
      icon: FileText,
         description: "From the last tweleve months",
    color: "bg-blue-500",
    },
    {
      title: "Under Review",
      value: applicationSummary.reviewCount ?? 0,
      icon: Clock,
          description: "All time",
    color: "bg-orange-500",
    },
    {
      title: "Accepted",
      value: applicationSummary.acceptedCount ?? 0,
      icon: CheckCircle,
          description: "All time",
    color: "bg-green-500",

    },
    {
      title: "Rejected",
      value: applicationSummary.rejectedCount ?? 0,
      icon: XCircle,
        description: "All time",
    color: "bg-red-500",
    },
  ]

    return (
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((kpi, index) => {
        const Icon = kpi.icon
       

        return (
        <Card
  key={index}
  className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 
             bg-gradient-to-br from-card to-muted hover:scale-[1.02] group"
>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
      {kpi.title}
    </CardTitle>

    {/* Icon wrapper */}
    <div
      className="p-2 rounded-lg transition-all"
      style={{ backgroundColor: `hsl(${kpi.hslColor} / 0.1)` }}
    >
      <Icon
                  className={`h-4 w-4 text-white`}
                  style={{ color: kpi.color.replace("bg-", "").replace("-500", "") }}
                />
    </div>
  </CardHeader>

  <CardContent>
    <div className="flex items-center justify-between">
      <div>
        <div className="text-2xl font-bold group-hover:text-3xl transition-all duration-300">
          {kpi.value}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {kpi.description}
        </p>
      </div>

      {/* Trend badge (optional) */}
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

export default StatsCard
