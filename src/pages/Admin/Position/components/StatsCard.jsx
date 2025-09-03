import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Briefcase, CheckCircle, Clock, Plus, Users } from 'lucide-react'
import { usePositionStore } from '../../../../store/PositionStore'


const StatsCard = () => {
    const [positionStats, setPositionStats] = useState([
        {
            title: "Total Positions",
            value: "23",
            change: "+3",
            changeType: "positive",
            icon: Briefcase,
             color: "bg-blue-500",
        },
        {
            title: "Active Positions",
            value: "15",
            change: "+2",
            changeType: "positive",
              color: "bg-green-500",
            icon: CheckCircle,
        },
        {
            title: "Total Applications",
            value: "1,234",
            change: "+12%",
            changeType: "positive",
                 color: "bg-orange-500",
            icon: Users,
        },
        {
            title: "Positions Filled",
            value: "8",
            change: "+1",
            changeType: "positive",
              color: "bg-red-500",
            icon: Clock,
        },
    ])


    const card = usePositionStore(state => state.card)



    useEffect(() => {
        if (card) {
            setPositionStats([
                {
                    title: "Total Positions",
                    value: card.position ?? "0",
                    change: "+0", // static or calculated elsewhere
                    changeType: "positive",
                    icon: Briefcase,
                    month: "All Time",
                      color: "bg-blue-500",
                },
                {
                    title: "Active Positions",
                    value: card.closed ?? "0",
                    change: "+0",
                    changeType: "positive",
                    icon: CheckCircle,
                    color: "bg-green-500",
                    month: "Currently Open"
                },
                {
                    title: "Total Applications",
                    value: card.totalApplication ?? "0",
                    change: "+0",
                    changeType: "positive",
                    icon: Users,
                    color: "bg-orange-500",
                    month: "From the last 12 month"
                },
                {
                    title: "Positions Filled",
                    value: card.positionFilled ?? "0",
                    change: "+0",
                    changeType: "positive",
                    icon: Clock,
                    color: "bg-red-500",
                    month: "This month"
                },
            ]);
        }   
    }, [card]);

    return (
        <>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {positionStats.map((kpi, index) => {
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
    <div
      className={`p-2 rounded-lg bg-opacity-10 group-hover:bg-opacity-20 transition-all`}
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
        <p className="text-xs text-muted-foreground mt-1">{kpi.month}</p>
      </div>
    </div>
  </CardContent>
</Card>

        )
      })}
    </div>

             </>
        
    )
}

export default StatsCard
