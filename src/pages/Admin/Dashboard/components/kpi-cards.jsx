import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Calendar, CheckCircle, TrendingUp, TrendingDown } from "lucide-react"



export function KPICards({summary}) {
console.log("hjk " + JSON.stringify(summary));

const kpiData = [
  {
    title: "Total Applications",
    value: summary.totalApplication ?? "0",
    change: "+12.5%",
    trend: "up",
    icon: FileText,
    description: "This month",
    color: "bg-blue-500",
  },
  {
    title: "Active Positions",
    value: summary.position ?? "0",
    change: "+3",
    trend: "up",
    icon: Users,
    description: "Currently open",
    color: "bg-green-500",
  },
  {
    title: "Interviews Scheduled",
     value: summary.interviewScheduled ?? "0",
    change: "-5.2%",
    trend: "down",
    icon: Calendar,
      description: "Currently open",
    color: "bg-green-500",
  },
  {
    title: "Accepted Applicants",
    value: summary.applicationAccepted ?? "0",
    change: "+8.1%",
    trend: "up",
    icon: CheckCircle,
    description: "This quarter",
    color: "bg-purple-500",
  },
]
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon
        const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown

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
