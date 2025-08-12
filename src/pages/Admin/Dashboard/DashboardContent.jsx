import { useState } from "react"
// import { KPICards } from "@/components/kpi-cards"
// import { ApplicationsTable } from "@/components/applications-table"
// import { AddInternshipModal } from "@/components/add-internship-modal"
// import { ApplicationDetailsModal } from "@/components/application-details-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import KPICards from "./components/KPICards"
import { ApplicationsTable } from "./components/ApplicationsTable"
import AddInternshipModal from "./components/Dialog/AddInternshipModal"
import ApplicationDetailsModal from "./components/Dialog/ApplicationDetailsModal"

const DashboardContent = () => {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [selectedApplication, setSelectedApplication] = useState(null)

    const handleViewApplication = (application) => {
        setSelectedApplication(application)
        setShowDetailsModal(true)
    }

    return (
      <div className="space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-6 lg:p-8">
    {/* Header Section - Responsive flex layout */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 md:space-y-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Dashboard
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base lg:text-lg">
                Welcome back! Here's what's happening with your internship program.
            </p>
        </div>
        
        {/* Button - Responsive sizing and full width on mobile */}
        <Button 
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto"
            size="default"
        >
            <Plus className="mr-2 h-4 w-4" />
            <span className="sm:inline">Add Internship</span>
        </Button>
    </div>

    {/* KPI Cards - Responsive grid */}
    <div className="w-full">
        <KPICards />
    </div>

    {/* Recent Applications Section */}
    <div className="space-y-3 md:space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
                Recent Applications
            </h2>
            
            {/* Optional: Add filter/search on larger screens */}
            <div className="hidden sm:flex gap-2">
                {/* Search or filter components could go here */}
            </div>
        </div>
        
        {/* Table wrapper for horizontal scroll on mobile */}
        <div className="w-full overflow-x-auto">
            <ApplicationsTable onViewApplication={handleViewApplication} />
        </div>
    </div>

    {/* Modals remain the same */}
    <AddInternshipModal open={showAddModal} onOpenChange={setShowAddModal} />

    <ApplicationDetailsModal
        open={showDetailsModal}
        onOpenChange={setShowDetailsModal}
        application={selectedApplication}
    />
</div>
    )
}

export default DashboardContent;
