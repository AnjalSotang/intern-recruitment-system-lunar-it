import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, FileText, Download, ExternalLink, Loader2 } from "lucide-react"

const ApplicationDetailsModal = ({ open, onOpenChange, application, modalTriggers }) => {

  const [downloading, setDownloading] = useState({});

  if (!application) return null


  // Function to handle file downloads
  const handleDownload = async (type, applicationId, fileName) => {
    try {
      setDownloading(prev => ({ ...prev, [type]: true }));

      console.log(applicationId)

      const response = await fetch(`https://server-intern-recruitment-system-lunar-it.onrender.com/api/application/${applicationId}/resume`, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf'
        }
      });

      if (!response.ok) throw new Error(`Download failed: ${response.statusText}`);

      const text = await response.clone().text();
      console.log('Response text preview:', text.slice(0, 200));

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName
        ? safeFileName(fileName)
        : `${application.firstName}_${application.lastName}_${type}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      // console.error('Download error:', error);
      alert("Failed to download the resume!");
    } finally {
      setDownloading(prev => ({ ...prev, [type]: false }));
    }
  };

  const safeFileName = (fileName) =>
    fileName.replace(/[^\w.-]/g, '_');

  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      reviewing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      accepted: "bg-green-100 text-green-800 hover:bg-green-100",
      rejected: "bg-red-100 text-red-800 hover:bg-red-100",
      "interview-scheduled": "bg-purple-100 text-purple-800 hover:bg-purple-100",
    }

    const labels = {
      pending: "Pending",
      reviewing: "Reviewing",
      accepted: "Accepted",
      rejected: "Rejected",
      "interview-scheduled": "Interview Scheduled",
    }

    return <Badge className={colors[status]}>{labels[status] || status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  // Helper function to get clean file name for display
  const getDisplayFileName = (filePath, type) => {
    if (!filePath) return `${type}.pdf`;
    const fileName = filePath.split('\\').pop().split('/').pop();
    return `${application.firstName} ${type}.pdf`;
  };

  // Handler functions for modal triggers
  const handleScheduleInterview = () => {
    if (modalTriggers?.openScheduleInterviewModal) {
      modalTriggers.openScheduleInterviewModal();
    }
  };

  const handleSendMessage = () => {
    if (modalTriggers?.openSendMessageModal) {
      modalTriggers.openSendMessageModal();
    }
  };

  const handleUpdateStatus = () => {
    if (modalTriggers?.openUpdateStatusModal) {
      modalTriggers.openUpdateStatusModal();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {application.fullName || `${application.firstName} ${application.lastName || ''}`}
          </DialogTitle>
          <DialogDescription>Application for {application.positionTitle}</DialogDescription>
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
                  <span className="text-sm">{application.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{application.department}</span>
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
                  <span className="text-sm">Priority: {application.priority}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Resume Download Button */}
                {application.resume && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleDownload('resume', application._id, `${application.firstName}_${application.lastName}_Resume.pdf`)}
                    disabled={downloading.resume}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span className="flex-1 text-left truncate">
                      {getDisplayFileName(application.resume, 'Resume')}
                    </span>
                    {downloading.resume ? (
                      <Loader2 className="ml-auto h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="ml-auto h-4 w-4" />
                    )}
                  </Button>
                )}

                {/* Quick Links Section */}
                {(application.linkedinUrl || application.githubUrl) && (
                  <>
                    <Separator className="my-3" />
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Quick Links</h4>
                      {application.linkedinUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => window.open(application.linkedinUrl, '_blank')}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          LinkedIn Profile
                        </Button>
                      )}
                      {application.githubUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => window.open(application.githubUrl, '_blank')}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          GitHub Profile
                        </Button>
                      )}

                      {/* Portfolio Access Button */}
                      {(application.portfolioUrl) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => window.open(application.portfolioUrl, '_blank')}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Portfolio Link
                        </Button>
                      )}
                    </div>
                  </>
                )}
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
                  <p className="text-sm text-muted-foreground">{`${application.major}, ${application.university}`}</p>
                  <p className="text-sm text-muted-foreground">GPA: {application.gpa}</p>
                  <p className="text-sm text-muted-foreground">Graduation Year: {application.graduationYear}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {application.skills?.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    )) || <span className="text-sm text-muted-foreground">No skills listed</span>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cover Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {application.coverLetter || "No cover letter provided."}
                </p>
              </CardContent>
            </Card>

            {/* Additional Information Card */}
            {application.additionalInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Additional Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {application.additionalInfo}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Action buttons with modal triggers */}
            <div className="flex gap-2 pt-4">
              <Button 
                className="flex-1"
                onClick={handleScheduleInterview}
              >
                Schedule Interview
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 bg-transparent"
                onClick={handleSendMessage}
              >
                Send Message
              </Button>
              <Button 
                variant="outline"
                onClick={handleUpdateStatus}
              >
                Update Status
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ApplicationDetailsModal;