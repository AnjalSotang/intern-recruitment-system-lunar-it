import React, { useEffect } from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { User, Briefcase, Clock, CheckCircle, XCircle, Calendar, SplinePointerIcon, Loader } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const statusOptions = [
  {
    value: "pending",
    label: "Pending",
    description: "Application is waiting for initial review",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "reviewing",
    label: "Under Review",
    description: "Application is being actively reviewed",
    icon: User,
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "interview-scheduled",
    label: "Interview Scheduled",
    description: "Interview has been scheduled with the candidate",
    icon: Calendar,
    color: "bg-purple-100 text-purple-800",
  },
  {
    value: "accepted",
    label: "Accepted",
    description: "Candidate has been accepted for the position",
    icon: CheckCircle,
    color: "bg-green-100 text-green-800",
  },
  {
    value: "rejected",
    label: "Rejected",
    description: "Application has been declined",
    icon: XCircle,
    color: "bg-red-100 text-red-800",
  },
]
import { useApplicationStore } from '../../../../store/AppliactionStore'
import { Loader2 } from "lucide-react"; // lucide spinner icon


const UpdateStatusModal = ({ open, onOpenChange, application, onStatusUpdate }) => {
  const {loading, status} = useApplicationStore();
  const [selectedStatus, setSelectedStatus] = useState("")
  const [notes, setNotes] = useState("")
  const [sendNotification, setSendNotification] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (status >= 200 && status < 300) {
        // Reset form and close modal
        setSelectedStatus("")
        setNotes("")  
        setSendNotification(true)
        onOpenChange(false);
    }
}, [status]);


  const handleSubmit = (e) => {
    e.preventDefault()


    if (!selectedStatus || !application) {
      toast.error({
        title: "Status required",
        description: "Please select a status to update the application.",
        variant: "destructive",
      })
      return
    }

    onStatusUpdate(application._id, selectedStatus, sendNotification, notes)
  }

  const getCurrentStatusInfo = () => {
    if (!application) return null
    return statusOptions.find((option) => option.value === application.status)
  }

  const getSelectedStatusInfo = () => {
    return statusOptions.find((option) => option.value === selectedStatus)
  }

  if (!application) return null

  const currentStatus = getCurrentStatusInfo()
  const selectedStatusInfo = getSelectedStatusInfo()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {/* Overlay Loading Spinner */}
        {/* {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <span className="ml-3 text-primary font-semibold">Updating status...</span>
          </div>
        )} */}

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Update Application Status
          </DialogTitle>
          <DialogDescription>
            Update the status for {application.firstName}'s application to {application.positionTitle}.
          </DialogDescription>
        </DialogHeader>

        {/* Candidate Info Card */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{application.firstName}</h3>
              <p className="text-sm text-muted-foreground">{application.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {application.positionTitle} • {application.department}
            </span>
          </div>
          {currentStatus && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-medium">Current Status:</span>
              <Badge className={currentStatus.color}>{currentStatus.label}</Badge>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>New Status *</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} disabled={option.value === application.status}>
                    <div className="flex items-center gap-2">
                      <option.icon className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedStatusInfo && (
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <selectedStatusInfo.icon className="h-4 w-4" />
                <span className="font-medium">Status Change Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {currentStatus?.label || "Unknown"} →{" "}
                  <Badge className={selectedStatusInfo.color}>{selectedStatusInfo.label}</Badge>
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{selectedStatusInfo.description}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Status Change Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this status change (optional)..."
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="sendNotification"
              checked={sendNotification}
              onChange={(e) => setSendNotification(e.target.checked)}
              className="rounded"
              disabled={loading}

            />
            <Label htmlFor="sendNotification" className="text-sm">
              Send email notification to candidate about status change
            </Label>
          </div>

          {selectedStatus === "rejected" && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Note:</strong> Rejecting this application will send a notification email to the candidate and
                move the application to the rejected status. This action can be reversed if needed.
              </p>
            </div>
          )}

          {selectedStatus === "accepted" && (
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Congratulations!</strong> Accepting this application will send a congratulatory email to the
                candidate with next steps information.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {/* <Button type="submit" disabled={!selectedStatus || loading}>
              Update Status
            </Button> */}
            <Button type="submit" disabled={loading || !selectedStatus}>
              {loading ? (
                <span className="flex items-center space-x-2">
                  <Loader className="animate-spin h-4 w-4" />
                  <span>Updating...</span>
                </span>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateStatusModal
