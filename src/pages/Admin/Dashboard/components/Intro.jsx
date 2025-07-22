import React from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import Kpi_cards from './Kpi_cards'
import ApplicationTable from './ApplicationTable'

const Intro = ({ setShowModal, setSelectedApplication }) => {
  return (
    <div className='min-h-screen bg-gray-50 px-4 py-6 space-y-6'>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your internship program.</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Internship
        </Button>
      </div>

      <Kpi_cards />

      <div className='space-y-4'>
        <h2 className="text-2xl font-semibold tracking-tight">Recent Applications</h2>
        <ApplicationTable applicationDetail={setSelectedApplication} />
      </div>
    </div>
  )
}

export default Intro