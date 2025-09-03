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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Briefcase, FileText, Clock, Calendar, Loader } from "lucide-react"
import { useApplicationStore } from '../../../../store/AppliactionStore'

const emailTemplates = [
    {
        id: "custom",
        name: "Custom Message",
        subject: "",
        body: "",
    },
    {
        id: "acknowledgment",
        name: "Application Acknowledgment",
        subject: "Thank you for your application - {{position}}",
        body: `Dear {{candidateName}},

Thank you for your interest in the {{position}} position at our company. We have received your application and are currently reviewing it.

We will be in touch within the next few days regarding the next steps in our hiring process.

Best regards,
The Hiring Team`,
    },
    {
        id: "interview-request",
        name: "Interview Request",
        subject: "Interview Invitation - {{position}}",
        body: `Dear {{candidateName}},

We are pleased to inform you that we would like to schedule an interview for the {{position}} position.

Please let us know your availability for the coming week, and we will coordinate a suitable time.

We look forward to speaking with you soon.

Best regards,
The Hiring Team`,
    },
    {
        id: "status-update",
        name: "Status Update",
        subject: "Update on your application - {{position}}",
        body: `Dear {{candidateName}},

We wanted to provide you with an update on your application for the {{position}} position.

Your application is currently under review, and we will contact you with next steps soon.

Thank you for your patience.

Best regards,
The Hiring Team`,
    },
    {
        id: "additional-info",
        name: "Request Additional Information",
        subject: "Additional Information Required - {{position}}",
        body: `Dear {{candidateName}},

Thank you for your application for the {{position}} position. To proceed with your application, we need some additional information from you.

Please provide the following at your earliest convenience:
- [Specify what information is needed]

You can reply directly to this email with the requested information.

Best regards,
The Hiring Team`,
    },
]

const SendMessageModal = ({ open, onOpenChange, application, onMessageSent }) => {
    const [selectedTemplate, setSelectedTemplate] = useState("custom")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [priority, setPriority] = useState("normal")
    const [copyToTeam, setCopyToTeam] = useState(false)
    const [scheduleEmail, setScheduleEmail] = useState(false)
    const [scheduledDate, setScheduledDate] = useState("")
    const [scheduledTime, setScheduledTime] = useState("")
    const {loading, status} = useApplicationStore();

    useEffect(() => {
        if (status >= 200 && status < 300) {
            // Reset form and close modal
        setSelectedTemplate("custom")
        setSubject("")
        setMessage("")
        setPriority("normal")
        setCopyToTeam(false)
        setScheduleEmail(false)
        setScheduledDate("")
        setScheduledTime("")
            onOpenChange(false);
        }
    }, [status]);

    const handleTemplateChange = (templateId) => {
        setSelectedTemplate(templateId)
        const template = emailTemplates.find((t) => t.id === templateId)
        if (template && application) {
            const processedSubject = template.subject
                .replace("{{candidateName}}", application.candidateName)
                .replace("{{position}}", application.position)
            const processedBody = template.body
                .replace(/{{candidateName}}/g, application.candidateName)
                .replace(/{{position}}/g, application.position)

            setSubject(processedSubject)
            setMessage(processedBody)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const messageData = {
            applicationId: application._id,
            candidateName: application.firstName,
            candidateEmail: application.email,
            subject,
            message,
            priority,
            copyToTeam,
            scheduleEmail,
            scheduledDate: scheduleEmail ? scheduledDate : null,
            scheduledTime: scheduleEmail ? scheduledTime : null,
            sentAt: scheduleEmail ? null : new Date().toISOString(),
            status: scheduleEmail ? "scheduled" : "sent",
            template: selectedTemplate,
        }

        onMessageSent(messageData)


       

    }

    if (!application) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Send Message
                    </DialogTitle>
                    <DialogDescription>Send an email message to {application.firstName}.</DialogDescription>
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
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Email Template</Label>
                        <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {emailTemplates.map((template) => (
                                    <SelectItem key={template.id} value={template.id}>
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            {template.name}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter email subject"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message"
                            rows={8}
                            className="resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Priority</Label>
                            <Select value={priority} onValueChange={setPriority}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                            Low Priority
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="normal">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                            Normal Priority
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="high">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                            High Priority
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
{/* 
                        <div className="space-y-2">
                            <Label>Options</Label>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="copyToTeam"
                                        checked={copyToTeam}
                                        onChange={(e) => setCopyToTeam(e.target.checked)}
                                        className="rounded"
                                    />
                                    <Label htmlFor="copyToTeam" className="text-sm">
                                        Copy hiring team
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="scheduleEmail"
                                        checked={scheduleEmail}
                                        onChange={(e) => setScheduleEmail(e.target.checked)}
                                        className="rounded"
                                    />
                                    <Label htmlFor="scheduleEmail" className="text-sm">
                                        Schedule for later
                                    </Label>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    {scheduleEmail && (
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg space-y-4">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-600" />
                                <span className="font-medium text-blue-800">Schedule Email</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="scheduledDate">Date</Label>
                                    <Input
                                        id="scheduledDate"
                                        type="date"
                                        value={scheduledDate}
                                        onChange={(e) => setScheduledDate(e.target.value)}
                                        min={new Date().toISOString().split("T")[0]}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="scheduledTime">Time</Label>
                                    <Input
                                        id="scheduledTime"
                                        type="time"
                                        value={scheduledTime}
                                        onChange={(e) => setScheduledTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-muted/30 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Email Preview</h4>
                        <div className="space-y-1 text-sm">
                            <div>
                                <strong>To:</strong> {application.email}
                            </div>
                            <div>
                                <strong>Subject:</strong> {subject || "No subject"}
                            </div>
                            <div className="flex items-center gap-2">
                                <strong>Priority:</strong>
                                <Badge
                                    variant="outline"
                                    className={
                                        priority === "high"
                                            ? "border-red-200 text-red-700"
                                            : priority === "low"
                                                ? "border-gray-200 text-gray-700"
                                                : "border-blue-200 text-blue-700"
                                    }
                                >
                                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                </Badge>
                            </div>
                            {scheduleEmail && scheduledDate && scheduledTime && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <strong>Scheduled for:</strong> {scheduledDate} at {scheduledTime}
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center space-x-2">
                                    <Loader className="animate-spin h-4 w-4" />
                                    <span>{scheduleEmail ? "Scheduling Email...." : "Scheduling Message......"}</span>
                                </span>
                            ) : (
                                scheduleEmail ? "Schedule Email" : "Send Message"
                            )}
                        </Button>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default SendMessageModal;