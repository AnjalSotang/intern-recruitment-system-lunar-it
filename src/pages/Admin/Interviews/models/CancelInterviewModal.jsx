import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "react-toastify"
import { AlertTriangle } from "lucide-react"


const CancelInterviewModal = ({ open, onOpenChange, interview, onCancel }) => {
  const [reason, setReason] = useState("")
  const [notifyCandidate, setNotifyCandidate] = useState(true)

  const handleCancel = () => {
    if (!interview) return

    if (!reason.trim()) {
      toast.error("error")
      return
    }

    onCancel(interview.id, reason, notifyCandidate)
    onOpenChange(false)
    setReason("")
    setNotifyCandidate(true)
  }

  if (!interview) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Cancel Interview
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel the interview with {interview.candidateName}?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Interview Details</h4>
            <div className="text-sm text-red-700 space-y-1">
              <p>
                <strong>Candidate:</strong> {interview.candidateName}
              </p>
              <p>
                <strong>Position:</strong> {interview.position}
              </p>
              <p>
                <strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {interview.time}
              </p>
            </div>
          </div>

          <div>
            <Label htmlFor="reason">Reason for Cancellation *</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a reason for cancelling this interview..."
              rows={4}
              className="mt-1"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="notify"
              checked={notifyCandidate}
              onCheckedChange={(checked) => setNotifyCandidate(checked)}
            />
            <Label htmlFor="notify" className="text-sm">
              Send cancellation notification to candidate
            </Label>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This action cannot be undone. The candidate will be notified if the option above is
              selected.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Keep Interview
          </Button>
          <Button variant="destructive" onClick={handleCancel}>
            Cancel Interview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CancelInterviewModal
