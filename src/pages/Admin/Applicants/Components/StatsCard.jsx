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
    },
    {
      title: "Under Review",
      value: applicationSummary.reviewCount ?? 0,
      icon: Clock,
    },
    {
      title: "Accepted",
      value: applicationSummary.acceptedCount ?? 0,
      icon: CheckCircle,
    },
    {
      title: "Rejected",
      value: applicationSummary.rejectedCount ?? 0,
      icon: XCircle,
    },
  ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        {/* <p className="text-xs text-muted-foreground">
                            <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                                {stat.change}
                            </span>{" "}
                            from last month
                        </p> */}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default StatsCard
