import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Users, Mail, Calendar, Trash2, CheckCircle, XCircle } from "lucide-react"


const BulkActionsModal = ({ open, onOpenChange, selectedCount, onAction }) => {
  const [selectedAction, setSelectedAction] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    if (selectedAction) {
      onAction(selectedAction)
      setSelectedAction("")
      setNotes("")
    }
  }

  const actions = [
    { value: "accept", label: "Accept Applications", icon: CheckCircle, color: "text-green-600" },
    { value: "reject", label: "Reject Applications", icon: XCircle, color: "text-red-600" },
    { value: "schedule-interview", label: "Schedule Interviews", icon: Calendar, color: "text-blue-600" },
    { value: "send-email", label: "Send Email", icon: Mail, color: "text-purple-600" },
    { value: "delete", label: "Delete Applications", icon: Trash2, color: "text-red-600" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Bulk Actions
          </DialogTitle>
          <DialogDescription>
            Apply actions to {selectedCount} selected application{selectedCount !== 1 ? "s" : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Action</Label>
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an action" />
              </SelectTrigger>
              <SelectContent>
                {actions.map((action) => (
                  <SelectItem key={action.value} value={action.value}>
                    <div className="flex items-center gap-2">
                      <action.icon className={`h-4 w-4 ${action.color}`} />
                      {action.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedAction && (
            <div className="space-y-2">
              <Label>Notes (Optional)</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes or comments..."
                rows={3}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedAction}>
            Apply Action
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BulkActionsModal
