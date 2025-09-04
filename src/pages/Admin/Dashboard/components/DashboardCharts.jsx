
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { Users, Calendar, Target, MessageSquare } from "lucide-react"




export function   DashboardCharts({statusSummary, messagesChart, departmentChart}) {

  
const departmentData = [
  { department: "Frontend", applications: departmentChart?.frontendCount ?? 0 },
  { department: "Backend", applications: departmentChart?.backendCount ?? 0 },
  { department: "Fullstack", applications: departmentChart?.fullstackCount ?? 0 },
  { department: "Data", applications: departmentChart?.dataCount ?? 0 },
  { department: "Design", applications: departmentChart?.designCount ?? 0 },
  { department: "Product", applications: departmentChart?.productCount ?? 0 },
  { department: "DevOps", applications: departmentChart?.devopsCount ?? 0 },
];


  const statusData = [
  { status: "Under Review", count: statusSummary?.reviewing??0, fill: "hsl(var(--chart-1))" },
  { status: "Interview Scheduled", count: statusSummary?.interviewScheduled?? 0, fill: "hsl(var(--chart-2))" },
  { status: "Interviewed", count: statusSummary?.interviewed??0, fill: "hsl(var(--chart-3))" },
  { status: "Accepted", count: statusSummary?.accepted ?? 0, fill: "hsl(var(--chart-4))" },
  { status: "Rejected", count: statusSummary?.rejected ?? 0, fill: "hsl(var(--chart-5))" },
]

const messageData = [
  { subject: "Internship", count: messagesChart?.intershipCount??0, color: "#3b82f6" },
  { subject: "Partnership", count: messagesChart?.partnershipCount??0, color: "#10b981" },
  { subject: "General", count: messagesChart?.generalCount??0, color: "#f59e0b" },
  { subject: "Services", count: messagesChart?.servicesCount??0, color: "#8b5cf6" },
  { subject: "Careers",count: messagesChart?.careersCount??0, color: "#ef4444" },
]


  return (
    <div className="space-y-4 sm:space-y-6">
 
      {/* Two Column Layout - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Applications by Department */}
 <Card

  className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 
             bg-gradient-to-br from-card to-muted hover:scale-[1.02] group"
>          <CardHeader className="pb-4 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg w-fit">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base sm:text-lg">Applications by Department</CardTitle>
                <CardDescription className="text-sm">Distribution across departments</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ChartContainer
              config={{
                applications: {
                  label: "Applications",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[250px] sm:h-[280px] lg:h-[300px]"
            >
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="department"
                  fontSize={12}
                  angle={window.innerWidth < 640 ? -45 : 0}
                  textAnchor={window.innerWidth < 640 ? "end" : "middle"}
                  height={window.innerWidth < 640 ? 80 : 60}
                />
                <YAxis fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="applications" fill="var(--color-applications)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
              
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Application Status Distribution */}
 <Card
  className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 
             bg-gradient-to-br from-card to-muted hover:scale-[1.02] group"
>          <CardHeader className="pb-4 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg w-fit">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base sm:text-lg">Application Status</CardTitle>
                <CardDescription className="text-sm">Current status distribution</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ChartContainer
              config={{
                count: {
                  label: "Applications",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[250px] sm:h-[280px] lg:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={statusData}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    label={({ status, percent }) => {
                      const shortStatus = status.length > 10 ? status.substring(0, 8) + "..." : status
                      return `${shortStatus}: ${(percent * 100).toFixed(0)}%`
                    }}
                    labelLine={false}
                    fontSize={10}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

  
 <Card

  className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 
             bg-gradient-to-br from-card to-muted hover:scale-[1.02] group"
>          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-500 rounded-lg">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg">Messages by Subject</CardTitle>
                <CardDescription className="text-sm">Contact form submissions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                messages: {
                  label: "Messages",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[250px] sm:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={messageData} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="subject" fontSize={10} angle={window.innerWidth < 640 ? -45 : 0}
                  textAnchor={window.innerWidth < 640 ? "end" : "middle"}
                  height={window.innerWidth < 640 ? 80 : 60} />
                  <YAxis fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
    </div>
  )
}
