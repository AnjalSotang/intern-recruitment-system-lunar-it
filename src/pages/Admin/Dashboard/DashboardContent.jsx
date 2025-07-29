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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here's what's happening with your internship program.</p>
                </div>
                <Button onClick={() => setShowAddModal(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Internship
                </Button>
            </div>

            <KPICards />

            <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Recent Applications</h2>
        <ApplicationsTable onViewApplication={handleViewApplication} />
      </div>

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
