import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  FileText,
  Download,
  ExternalLink,
  Star,
} from "lucide-react"


const CandidateProfileModal = ({ open, onOpenChange, candidateName }) => {
  // Mock candidate data - in real app, this would be fetched based on candidateName
  const candidate = {
    id: "1",
    name: candidateName,
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    appliedDate: "2024-01-15",
    status: "interview",
    position: "Frontend Developer Intern",
    experience: "2 years",
    education: "Computer Science, UC Berkeley",
    skills: ["React", "JavaScript", "TypeScript", "CSS", "Node.js", "Git"],
    summary:
      "Passionate frontend developer with experience in React and modern web technologies. Strong problem-solving skills and eager to learn new technologies.",
    resume: "/resume.pdf",
    portfolio: "https://alicejohnson.dev",
    rating: 4.5,
    notes: "Strong technical skills, good communication, shows enthusiasm for learning.",
  }

  const getStatusBadge = (status) => {
    const colors = {
      applied: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      screening: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      interview: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      offer: "bg-green-100 text-green-800 hover:bg-green-100",
      hired: "bg-green-100 text-green-800 hover:bg-green-100",
      rejected: "bg-red-100 text-red-800 hover:bg-red-100",
    }

    return <Badge className={colors[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Candidate Profile
          </DialogTitle>
          <DialogDescription>Detailed profile for {candidate.name}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="text-lg font-semibold">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">{candidate.position}</p>
                  </div>

                  {getStatusBadge(candidate.status)}

                  {candidate.rating && (
                    <div className="flex items-center gap-1">
                      {renderStars(candidate.rating)}
                      <span className="text-sm text-muted-foreground ml-1">{candidate.rating}/5</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{candidate.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Applied: {new Date(candidate.appliedDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {candidate.resume && (
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href={candidate.resume} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-4 w-4" />
                      View Resume
                      <Download className="ml-auto h-4 w-4" />
                    </a>
                  </Button>
                )}
                {candidate.portfolio && (
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href={candidate.portfolio} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Portfolio
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{candidate.summary}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{candidate.experience}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{candidate.education}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {candidate.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Interview Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{candidate.notes}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    Send Email
                  </Button>
                  <Button variant="outline" size="sm">
                    Schedule Call
                  </Button>
                  <Button variant="outline" size="sm">
                    Add Note
                  </Button>
                  <Button variant="outline" size="sm">
                    Update Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CandidateProfileModal;
