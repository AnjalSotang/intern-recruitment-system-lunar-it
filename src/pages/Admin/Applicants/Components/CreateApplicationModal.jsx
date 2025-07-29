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
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CreateApplicationModal({ open, onOpenChange, onSubmit }) {
  const [formData, setFormData] = useState({
    candidateName: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    priority: "medium",
    experience: "",
    education: "",
    location: "",
    resumeUrl: "",
    coverLetterUrl: "",
    portfolioUrl: "",
    skills: [],
    rating: undefined,
    notes: "",
    source: "website",
  })
  const [newSkill, setNewSkill] = useState("")
  const [errors, setErrors] = useState({})
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.candidateName?.trim()) newErrors.candidateName = "Candidate name is required"
    if (!formData.email?.trim()) newErrors.email = "Email is required"
    if (!formData.position?.trim()) newErrors.position = "Position is required"
    if (!formData.department?.trim()) newErrors.department = "Department is required"
    if (!formData.experience?.trim()) newErrors.experience = "Experience is required"
    if (!formData.education?.trim()) newErrors.education = "Education is required"
    if (!formData.location?.trim()) newErrors.location = "Location is required"

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)

      // Reset form
      setFormData({
        candidateName: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        priority: "medium",
        experience: "",
        education: "",
        location: "",
        resumeUrl: "",
        coverLetterUrl: "",
        portfolioUrl: "",
        skills: [],
        rating: undefined,
        notes: "",
        source: "website",
      })
      setErrors({})
      onOpenChange(false)
    }
  }

  const handleInputChange = (field) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills?.filter((skill) => skill !== skillToRemove) || [],
    }))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Application</DialogTitle>
          <DialogDescription>Add a new candidate application to the system.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="candidateName">Full Name *</Label>
                <Input
                  id="candidateName"
                  value={formData.candidateName || ""}
                  onChange={(e) => handleInputChange("candidateName", e.target.value)}
                  placeholder="Enter candidate's full name"
                  className={errors.candidateName ? "border-red-500" : ""}
                />
                {errors.candidateName && <p className="text-sm text-red-500">{errors.candidateName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="candidate@email.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location || ""}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="City, State"
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
              </div>
            </div>
          </div>

          {/* Position Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Position Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Select value={formData.position || ""} onValueChange={(value) => handleInputChange("position", value)}>
                  <SelectTrigger className={errors.position ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Frontend Developer Intern">Frontend Developer Intern</SelectItem>
                    <SelectItem value="Backend Developer Intern">Backend Developer Intern</SelectItem>
                    <SelectItem value="UI/UX Designer Intern">UI/UX Designer Intern</SelectItem>
                    <SelectItem value="Data Science Intern">Data Science Intern</SelectItem>
                    <SelectItem value="DevOps Intern">DevOps Intern</SelectItem>
                    <SelectItem value="Marketing Intern">Marketing Intern</SelectItem>
                    <SelectItem value="Product Manager Intern">Product Manager Intern</SelectItem>
                  </SelectContent>
                </Select>
                {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department || ""}
                  onValueChange={(value) => handleInputChange("department", value)}
                >
                  <SelectTrigger className={errors.department ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                  </SelectContent>
                </Select>
                {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority || "medium"}
                  onValueChange={(value) => handleInputChange("priority", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">Application Source</Label>
                <Select
                  value={formData.source || "website"}
                  onValueChange={(value) => handleInputChange("source", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Company Website</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="referral">Employee Referral</SelectItem>
                    <SelectItem value="job-board">Job Board</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Background Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Background Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Experience *</Label>
                <Input
                  id="experience"
                  value={formData.experience || ""}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  placeholder="e.g., 2 years"
                  className={errors.experience ? "border-red-500" : ""}
                />
                {errors.experience && <p className="text-sm text-red-500">{errors.experience}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Select
                  value={formData.rating?.toString() || ""}
                  onValueChange={(value) => handleInputChange("rating", value ? Number.parseInt(value) : undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Star</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education *</Label>
              <Input
                id="education"
                value={formData.education || ""}
                onChange={(e) => handleInputChange("education", e.target.value)}
                placeholder="e.g., Computer Science, Stanford University"
                className={errors.education ? "border-red-500" : ""}
              />
              {errors.education && <p className="text-sm text-red-500">{errors.education}</p>}
            </div>

            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a skill and press Enter"
                  className="flex-1"
                />
                <Button type="button" onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills?.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Documents & Links</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resumeUrl">Resume URL</Label>
                <Input
                  id="resumeUrl"
                  value={formData.resumeUrl || ""}
                  onChange={(e) => handleInputChange("resumeUrl", e.target.value)}
                  placeholder="Link to resume file"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="coverLetterUrl">Cover Letter URL</Label>
                  <Input
                    id="coverLetterUrl"
                    value={formData.coverLetterUrl || ""}
                    onChange={(e) => handleInputChange("coverLetterUrl", e.target.value)}
                    placeholder="Link to cover letter"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                  <Input
                    id="portfolioUrl"
                    value={formData.portfolioUrl || ""}
                    onChange={(e) => handleInputChange("portfolioUrl", e.target.value)}
                    placeholder="Link to portfolio"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ""}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Add any additional notes about the candidate..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateApplicationModal;
