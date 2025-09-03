import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Loader2, User, Video, Phone, MapPin, Briefcase, Clock, CheckCircle, XCircle, Calendar } from "lucide-react"

const interviewTypeOptions = [
  {
    value: "video",
    label: "Video Call",
    description: "Online video interview",
    icon: Video,
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "phone",
    label: "Phone Call",
    description: "Phone interview",
    icon: Phone,
    color: "bg-green-100 text-green-800",
  },
  {
    value: "in-person",
    label: "In Person",
    description: "Face-to-face interview",
    icon: MapPin,
    color: "bg-purple-100 text-purple-800",
  },
]

const statusOptions = [
  {
    value: "scheduled",
    label: "Scheduled",
    description: "Interview is scheduled",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "completed",
    label: "Completed",
    description: "Interview has been completed",
    icon: CheckCircle,
    color: "bg-green-100 text-green-800",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    description: "Interview has been cancelled",
    icon: XCircle,
    color: "bg-red-100 text-red-800",
  },
  {
    value: "no_show",
    label: "No Show",
    description: "Candidate did not attend",
    icon: XCircle,
    color: "bg-gray-100 text-gray-800",
  },
]

export function EditInterviewModal({ open, onOpenChange, interview, onSave, loading, status }) {
  // console.log(interview)
  useEffect(() => {
    if(status>= 200 && status < 300){
      onOpenChange(false)
    }
  }, [status])

  
  const [formData, setFormData] = useState({
    id: interview?.id || "0",
    time: interview?.time || "",
    type: interview?.type || "video",
    status: interview?.status || "scheduled",
    location: interview?.location || "",
    meetingLink: interview?.meetingLink || "",
    notes: interview?.notes || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!interview) return

    const updatedInterview = {
      ...interview,
      ...formData,
    }
    
    console.log(updatedInterview)
    onSave(updatedInterview)
    // onOpenChange(false)
  }

  const getCurrentTypeInfo = () => {
    if (!interview) return null
    return interviewTypeOptions.find((option) => option.value === interview.type)
  }

  const getCurrentStatusInfo = () => {
    if (!interview) return null
    return statusOptions.find((option) => option.value === interview.status)
  }

  const getSelectedTypeInfo = () => {
    return interviewTypeOptions.find((option) => option.value === formData.type)
  }

  const getSelectedStatusInfo = () => {
    return statusOptions.find((option) => option.value === formData.status)
  }

  if (!interview) return null

  const currentType = getCurrentTypeInfo()
  const currentStatus = getCurrentStatusInfo()
  const selectedTypeInfo = getSelectedTypeInfo()
  const selectedStatusInfo = getSelectedStatusInfo()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Update Interview Details
          </DialogTitle>
          <DialogDescription>
            Update the interview details for {interview.candidateName}.
          </DialogDescription>
        </DialogHeader>

        {/* Interview Info Card */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{interview.candidateName}</h3>
              <p className="text-sm text-muted-foreground">{interview.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            {currentType && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Current Type:</span>
                <Badge className={currentType.color}>{currentType.label}</Badge>
              </div>
            )}
            {currentStatus && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Current Status:</span>
                <Badge className={currentStatus.color}>{currentStatus.label}</Badge>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Interview Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select interview type" />
                </SelectTrigger>
                <SelectContent>
                  {interviewTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
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

            <div className="space-y-2">
              <Label>Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
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
          </div>

          {/* Change Preview */}
          {(selectedTypeInfo || selectedStatusInfo) && (
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Interview Update Preview</span>
              </div>
              <div className="space-y-2">
                {selectedTypeInfo && formData.type !== interview.type && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      Type: {currentType?.label || "Unknown"} →{" "}
                      <Badge className={selectedTypeInfo.color}>{selectedTypeInfo.label}</Badge>
                    </span>
                  </div>
                )}
                {selectedStatusInfo && formData.status !== interview.status && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      Status: {currentStatus?.label || "Unknown"} →{" "}
                      <Badge className={selectedStatusInfo.color}>{selectedStatusInfo.label}</Badge>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {formData.type === "in-person" && (
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter meeting location"
                disabled={loading}
              />
            </div>
          )}

{/*           
          {formData.type === "phone" && (
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
            </div>
          )} */}
 

          {formData.type === "video" && (
            <div className="space-y-2">
              <Label htmlFor="meetingLink">Meeting Link</Label>
              <Input
                id="meetingLink"
                value={formData.meetingLink}
                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                placeholder="Enter video meeting link"
                disabled={loading}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Interview Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any additional notes about the interview (optional)..."
              rows={3}
              disabled={loading}
            />
          </div>

          {formData.status === "cancelled" && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Note:</strong> Cancelling this interview will update the status and may notify relevant parties. 
                This action can be reversed if needed.
              </p>
            </div>
          )}

          {formData.status === "completed" && (
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Great!</strong> Marking this interview as completed will update the candidate's progress in the hiring process.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="animate-spin h-4 w-4" />
                  <span>Updating Interview...</span>
                </span>
              ) : (
                "Update Interview"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}