import React from "react"

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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, User, Briefcase } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const ScheduleInterviewFromApplicationModal = ({
    open,
    onOpenChange,
    application,
    onScheduled,
}) => {
    const [formData, setFormData] = useState({
        interviewer: "",
        date: undefined,
        time: "",
        type: "",
        location: "",
        meetingLink: "",
        duration: "60",
        notes: "",
        sendNotification: true,
    })
    const [errors, setErrors] = useState({})
    const { toast } = useToast()

    const validateForm = () => {
        const newErrors = {}

        if (!formData.interviewer.trim()) newErrors.interviewer = "Interviewer is required"
        if (!formData.date) newErrors.date = "Date is required"
        if (!formData.time.trim()) newErrors.time = "Time is required"
        if (!formData.type) newErrors.type = "Interview type is required"

        if (formData.type === "in-person" && !formData.location.trim()) {
            newErrors.location = "Location is required for in-person interviews"
        }
        if (formData.type === "video" && !formData.meetingLink.trim()) {
            newErrors.meetingLink = "Meeting link is required for video interviews"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm() && application) {
            const interviewData = {
                id: Date.now().toString(),
                candidateName: application.candidateName,
                candidateEmail: application.email,
                position: application.position,
                department: application.department,
                interviewer: formData.interviewer,
                date: formData.date,
                time: formData.time,
                type: formData.type,
                location: formData.location,
                meetingLink: formData.meetingLink,
                duration: formData.duration,
                notes: formData.notes,
                status: "scheduled",
                applicationId: application.id,
            }

            onScheduled(interviewData)

            toast({
                title: "Interview scheduled",
                description: `Interview scheduled with ${application.candidateName} for ${format(formData.date, "PPP")} at ${formData.time}.`,
            })

            // Reset form and close modal
            setFormData({
                interviewer: "",
                date: undefined,
                time: "",
                type: "",
                location: "",
                meetingLink: "",
                duration: "60",
                notes: "",
                sendNotification: true,
            })
            setErrors({})
            onOpenChange(false)
        }
    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    if (!application) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Schedule Interview
                    </DialogTitle>
                    <DialogDescription>
                        Schedule an interview with {application.candidateName} for the {application.position} position.
                    </DialogDescription>
                </DialogHeader>

                {/* Candidate Info Card */}
                <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                            <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold">{application.candidateName}</h3>
                            <p className="text-sm text-muted-foreground">{application.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                            {application.position} • {application.department}
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="interviewer">Interviewer *</Label>
                        <Select value={formData.interviewer} onValueChange={(value) => handleInputChange("interviewer", value)}>
                            <SelectTrigger className={errors.interviewer ? "border-red-500" : ""}>
                                <SelectValue placeholder="Select interviewer" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="John Smith">John Smith - Senior Engineer</SelectItem>
                                <SelectItem value="Sarah Davis">Sarah Davis - HR Manager</SelectItem>
                                <SelectItem value="Mike Johnson">Mike Johnson - Tech Lead</SelectItem>
                                <SelectItem value="Emily Chen">Emily Chen - Product Manager</SelectItem>
                                <SelectItem value="Tom Anderson">Tom Anderson - Engineering Manager</SelectItem>
                                <SelectItem value="Lisa Wong">Lisa Wong - Design Lead</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.interviewer && <p className="text-sm text-red-500">{errors.interviewer}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Date *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !formData.date && "text-muted-foreground",
                                            errors.date && "border-red-500",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={formData.date}
                                        onSelect={(date) => handleInputChange("date", date)}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="time">Time *</Label>
                            <Input
                                id="time"
                                type="time"
                                value={formData.time}
                                onChange={(e) => handleInputChange("time", e.target.value)}
                                className={errors.time ? "border-red-500" : ""}
                            />
                            {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Interview Type *</Label>
                            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                                <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select interview type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="video">Video Call</SelectItem>
                                    <SelectItem value="phone">Phone Call</SelectItem>
                                    <SelectItem value="in-person">In-Person</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration (minutes)</Label>
                            <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="30">30 minutes</SelectItem>
                                    <SelectItem value="45">45 minutes</SelectItem>
                                    <SelectItem value="60">60 minutes</SelectItem>
                                    <SelectItem value="90">90 minutes</SelectItem>
                                    <SelectItem value="120">120 minutes</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {formData.type === "in-person" && (
                        <div className="space-y-2">
                            <Label htmlFor="location">Location *</Label>
                            <Input
                                id="location"
                                value={formData.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                                placeholder="e.g., Conference Room A, 5th Floor"
                                className={errors.location ? "border-red-500" : ""}
                            />
                            {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                        </div>
                    )}

                    {formData.type === "video" && (
                        <div className="space-y-2">
                            <Label htmlFor="meetingLink">Meeting Link *</Label>
                            <Input
                                id="meetingLink"
                                value={formData.meetingLink}
                                onChange={(e) => handleInputChange("meetingLink", e.target.value)}
                                placeholder="e.g., https://meet.google.com/abc-defg-hij"
                                className={errors.meetingLink ? "border-red-500" : ""}
                            />
                            {errors.meetingLink && <p className="text-sm text-red-500">{errors.meetingLink}</p>}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="notes">Interview Notes</Label>
                        <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => handleInputChange("notes", e.target.value)}
                            placeholder="Add any specific topics to cover or preparation notes..."
                            rows={3}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="sendNotification"
                            checked={formData.sendNotification}
                            onChange={(e) => handleInputChange("sendNotification", e.target.checked)}
                            className="rounded"
                        />
                        <Label htmlFor="sendNotification" className="text-sm">
                            Send email notification to candidate and interviewer
                        </Label>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Schedule Interview</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ScheduleInterviewFromApplicationModal