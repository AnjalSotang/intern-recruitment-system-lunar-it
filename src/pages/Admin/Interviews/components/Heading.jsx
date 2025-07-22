import React from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import L_Card from './L_Card'


const Heading = ({ setShowModal, setSelectedApplication }) => {
    return (
        <div className='min-h-screen bg-gray-50 px-4 py-6 space-y-6'>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
                    <p className="text-muted-foreground">Manage and track all candidate interviews</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Interview
                </Button>
            </div>
            
            <L_Card/>


        </div>
    )
}

export default Heading