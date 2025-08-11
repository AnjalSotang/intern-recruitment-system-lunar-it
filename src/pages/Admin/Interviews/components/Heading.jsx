import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import L_Card from './L_Card'
import InterviewTable from './InterviewTable'
import { InterviewDetailsModal } from './InterviewDetailModal'


const Heading = ({ setShowModal, setSelectedApplication }) => {
    const [showScheduleModal, setShowScheduleModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [selectedInterview, setSelectedInterview] = useState(null)

    const handleViewInterview = (interview) => {
        setSelectedInterview(interview)
        setShowDetailsModal(true)
    }
    
    // const handleDeleteInterview = (id) => {
    //     setInterviews(interviews.filter((interview) => interview.id !== id))
    //     toast({
    //         title: "Interview deleted",
    //         description: "The interview has been successfully deleted.",
    //     })
    // }



    return (
      <>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
                    <p className="text-muted-foreground">Manage and track all candidate interviews</p>
                </div>
                <Button onClick={() => setShowScheduleModal(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Interview
                </Button>
            </div>
            <L_Card />
            
            <InterviewTable handleViewInterview={handleViewInterview} />


            <InterviewDetailsModal open={showDetailsModal} onOpenChange={setShowDetailsModal} interview={selectedInterview} />


        </>
    )
}

export default Heading