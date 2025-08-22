import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Video, Phone, MapPin, Clock, User, FileText, CheckCircle, ExternalLink, Camera } from "lucide-react"
import { useToast } from "@/hooks/use-toast"


const StartInterviewModal = ({ open, onOpenChange, interview, onStart }) => {

  const { toast } = useToast()
  const [isStarting, setIsStarting] = useState(false)

  const handleStart = async () => {
    if (!interview) return

    setIsStarting(true)

    // Simulate starting the interview
    setTimeout(() => {
      onStart(interview.id)
      toast({
        title: "Interview Started",
        description: `Interview with ${interview.candidateName} has begun.`,
      })

      // If it's a video interview, open the meeting link
      if (interview.type === "video" && interview.meetingLink) {
        window.open(interview.meetingLink, "_blank")
      }

      setIsStarting(false)
      onOpenChange(false)
    }, 1500)
  }

  if (!interview) return null

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5" />
      case "phone":
        return <Phone className="h-5 w-5" />
      case "in-person":
        return <MapPin className="h-5 w-5" />
      default:
        return null
    }
  }

  const getTypeInstructions = (type) => {
    switch (type) {
      case "video":
        return {
          title: "Video Interview Setup",
          instructions: [
            "Ensure your camera and microphone are working",
            "Test your internet connection",
            "Find a quiet, well-lit location",
            "Have the candidate's resume ready",
          ],
          action: "Join Video Call",
        }
      case "phone":
        return {
          title: "Phone Interview Setup",
          instructions: [
            "Ensure you have good phone reception",
            "Find a quiet location",
            "Have the candidate's resume ready",
            "Prepare your interview questions",
          ],
          action: "Start Phone Call",
        }
      case "in-person":
        return {
          title: "In-Person Interview Setup",
          instructions: [
            "Confirm the meeting room is available",
            "Prepare interview materials",
            "Have the candidate's resume ready",
            "Ensure the reception knows to expect the candidate",
          ],
          action: "Begin Interview",
        }
      default:
        return {
          title: "Interview Setup",
          instructions: [],
          action: "Start Interview",
        }
    }
  }

  const typeInfo = getTypeInstructions(interview.type)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getTypeIcon(interview.type)}
            Start Interview
          </DialogTitle>
          <DialogDescription>Ready to begin the interview with {interview.candidateName}?</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Interview Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Interview Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
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
                        {interview.meetingLink}
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pre-Interview Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{typeInfo.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {typeInfo.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{instruction}</span>
                  </div>
                ))}
              </div>

              {interview.type === "video" && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800 mb-2">
                    <Camera className="h-4 w-4" />
                    <span className="text-sm font-medium">Video Call Ready</span>
                  </div>
                  <p className="text-xs text-blue-600">
                    The meeting link will open automatically when you start the interview.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {interview.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interview Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{interview.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <Separator />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Not Ready
          </Button>
          <Button onClick={handleStart} disabled={isStarting}>
            {isStarting ? "Starting..." : typeInfo.action}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default StartInterviewModal;
