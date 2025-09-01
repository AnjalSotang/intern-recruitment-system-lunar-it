import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, Mail, Phone, MapPin, FileText, Download } from "lucide-react"

export function ApplicationDetailsModal({ open, onOpenChange, application }) {
  if (!application) return null

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewing":
        return "bg-blue-100 text-blue-800"
      case "interview":
        return "bg-purple-100 text-purple-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Application Details</DialogTitle>
          <DialogDescription>Complete information about the candidate's application.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Candidate Info */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={application.avatar || "/placeholder.svg"} alt={application.firstName} />
              <AvatarFallback className="text-lg">
                {application.firstName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{application.firstName}</h3>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Mail className="h-4 w-4" />
                {application.email}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Phone className="h-4 w-4" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </div>
            </div>
            <Badge className={getStatusColor(application.status)}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </Badge>
          </div>

          <Separator />

          {/* Position Info */}
          <div>
            <h4 className="font-semibold mb-2">Position Applied For</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-medium">{application.positionTitle}</div>
              <div className="text-sm text-muted-foreground mt-1">{application.department} Department</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <Calendar className="h-4 w-4" />
                Applied on {new Date(application.appliedDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h4 className="font-semibold mb-2">Documents</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">Resume.pdf</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">Cover_Letter.pdf</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h4 className="font-semibold mb-2">Application Notes</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Strong technical background with experience in React and Node.js. Previous internship at a tech startup.
                Excellent communication skills demonstrated in the initial screening call.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button>Schedule Interview</Button>
            <Button variant="outline">Send Message</Button>
            <Button variant="outline">Update Status</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
