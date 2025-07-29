import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, FileText, Download } from "lucide-react"

const ApplicationDetailsModal = ({ open, onOpenChange, application }) =>
     {
  if (!application) return null

  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      reviewing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      accepted: "bg-green-100 text-green-800 hover:bg-green-100",
      rejected: "bg-red-100 text-red-800 hover:bg-red-100",
    }

    return <Badge className={colors[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  // Mock additional data that would come from your API
  const mockDetails = {
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    education: "Computer Science, Stanford University",
    gpa: "3.8/4.0",
    skills: ["React", "TypeScript", "Node.js", "Python", "SQL"],
    coverLetter:
      "I am excited to apply for the Frontend Developer Intern position. With my strong background in React and TypeScript, I believe I can contribute effectively to your team while gaining valuable industry experience.",
    resume: "resume_alice_johnson.pdf",
    portfolio: "https://alicejohnson.dev",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {application.candidateName}
          </DialogTitle>
          <DialogDescription>Application for {application.position}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{application.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockDetails.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockDetails.location}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Application Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Status:</span>
                  {getStatusBadge(application.status)}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Experience: {application.experience}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <FileText className="mr-2 h-4 w-4" />
                  {mockDetails.resume}
                  <Download className="ml-auto h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <FileText className="mr-2 h-4 w-4" />
                  Portfolio Link
                  <Download className="ml-auto h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education & Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Education</h4>
                  <p className="text-sm text-muted-foreground">{mockDetails.education}</p>
                  <p className="text-sm text-muted-foreground">GPA: {mockDetails.gpa}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockDetails.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cover Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{mockDetails.coverLetter}</p>
              </CardContent>
            </Card>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1">Schedule Interview</Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Send Message
              </Button>
              <Button variant="outline">Update Status</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


export default ApplicationDetailsModal;