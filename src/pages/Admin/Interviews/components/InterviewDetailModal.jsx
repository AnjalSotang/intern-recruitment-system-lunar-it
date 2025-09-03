import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Video, MapPin, User, FileText, ExternalLink, Edit, Trash2 } from "lucide-react"
import { useEffect } from "react"

export function InterviewDetailsModal({ open, onOpenChange, interview, modalTriggers, fetchInterviews }) {
  useEffect(()=> {fetchInterviews()},[])

  if (!interview) return null

  const getStatusBadge = (status) => {
    const colors = {
      scheduled: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      completed: "bg-green-100 text-green-800 hover:bg-green-100",
      cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
      "no-show": "bg-orange-100 text-orange-800 hover:bg-orange-100",
    }

    return (
      <Badge className={colors[status]}>
        {status === "no-show" ? "No Show" : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "phone":
        return <Clock className="h-4 w-4" />
      case "in-person":
        return <MapPin className="h-4 w-4" />
      default:
        return null
    }
  }



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Interview Details
          </DialogTitle>
          <DialogDescription>
            Interview with {interview.candidateName} for {interview.position}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Interview Info */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interview Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  {getStatusBadge(interview.status)}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Candidate</p>
                      <p className="text-sm text-muted-foreground">{interview.candidateName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Position</p>
                      <p className="text-sm text-muted-foreground">{interview.position}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Interviewer</p>
                      <p className="text-sm text-muted-foreground">{interview.interviewer}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Schedule Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">{new Date(interview.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">{interview.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getTypeIcon(interview.type)}
                  <div>
                    <p className="text-sm font-medium">Type</p>
                    <p className="text-sm text-muted-foreground capitalize">{interview.type}</p>
                  </div>
                </div>

                {interview.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{interview.location}</p>
                    </div>
                  </div>
                )}

                {interview.meetingLink && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Meeting Link</p>
                      <Button variant="link" className="h-auto p-0 text-sm text-blue-600" asChild>
                        <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                          Join Meeting
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Notes and Actions */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                {interview.notes ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">{interview.notes}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No notes added</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={modalTriggers?.openEditModal}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Type and Status
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={modalTriggers?.openRescheduleModal}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Reschedule
                </Button>
                   <Button
                  className="w-full justify-start bg-red-600 text-white hover:bg-red-700 hover:text-white focus:bg-red-700 focus:text-white"
                  variant="outline"
                  onClick={modalTriggers?.openCancelModal}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Cancel Interview
                </Button>
                {/* <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={modalTriggers?.openCandidateProfile}
                  >
                    <User className="mr-2 h-4 w-4" />
                    View Candidate Profile
                  </Button> */}
                {/* <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  disabled={interview.status !== "scheduled"}
                  onClick={modalTriggers?.openStartModal}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Start Interview
                </Button> */}
                <Separator />
         
              </CardContent>
            </Card>

            {interview.status === "scheduled" && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-blue-800">
                    <Clock className="h-4 w-4" />
                    <p className="text-sm font-medium">Upcoming Interview</p>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Don't forget to prepare your questions and review the candidate's application.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}