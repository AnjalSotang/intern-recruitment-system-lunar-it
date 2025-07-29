import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Briefcase, UserCheck, Calendar } from "lucide-react"

const kpiData = [
  {
    title: "Total Applications",
    value: "1,234",
    change: "+12%",
    changeType: "positive",
    icon: FileText,
  },
  {
    title: "Open Positions",
    value: "23",
    change: "+3",
    changeType: "positive",
    icon: Briefcase,
  },
  {
    title: "Accepted Candidates",
    value: "89",
    change: "+8%",
    changeType: "positive",
    icon: UserCheck,
  },
  {
    title: "Upcoming Interviews",
    value: "45",
    change: "-2",
    changeType: "negative",
    icon: Calendar,
  },
]

const KPICards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => (
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

export default KPICards;