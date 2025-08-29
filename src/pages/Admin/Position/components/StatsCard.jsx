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
        },
        {
            title: "Active Positions",
            value: "15",
            change: "+2",
            changeType: "positive",
            icon: CheckCircle,
        },
        {
            title: "Total Applications",
            value: "1,234",
            change: "+12%",
            changeType: "positive",
            icon: Users,
        },
        {
            title: "Positions Filled",
            value: "8",
            change: "+1",
            changeType: "positive",
            icon: Clock,
        },
    ])


    const card = usePositionStore(state => state.card)
    const fetchPositionSummary = usePositionStore(state => state.fetchPositionSummary)

    useEffect(() => {
        fetchPositionSummary(); // Call the function to fetch sumposition
    }, [])



    useEffect(() => {
        if (card) {
            setPositionStats([
                {
                    title: "Total Positions",
                    value: card.position ?? "0",
                    change: "+0", // static or calculated elsewhere
                    changeType: "positive",
                    icon: Briefcase,
                },
                {
                    title: "Active Positions",
                    value: card.closed ?? "0",
                    change: "+0",
                    changeType: "positive",
                    icon: CheckCircle,
                },
                {
                    title: "Total Applications",
                    value: card.positionFilled ?? "0",
                    change: "+0",
                    changeType: "positive",
                    icon: Users,
                },
                {
                    title: "Positions Filled",
                    value: card.totalApplication ?? "0",
                    change: "+0",
                    changeType: "positive",
                    icon: Clock,
                },
            ]);
        }   
    }, [card]);

    return (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {positionStats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                            <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                                {stat.change}
                            </span>{" "}
                            from last month
                        </p>
                    </CardContent>
                </Card>
            ))}
        </section>
    )
}

export default StatsCard
