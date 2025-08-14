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
import { usePositionStore } from "../../../../../store/PositionStore"
import { useNavigate } from "react-router-dom"

const  CreatePositionModal = ({ open, onOpenChange }) => {
  const navigate = useNavigate()
  // const {createPositions, fetchPositions, deletePosition, loading, error } = usePositionStore();
    const createPosition = usePositionStore(state => state.createPosition);


  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    description: "",
    requirements: [],
    responsibilities: [],
    qualifications: [],
    optional: [],
    salary: "",
    duration: "",
    startDate: "",
    endDate: "",
    applicationDeadline: "",
    maxApplications: 0,
    tags: [],
    priority: "high",
    experienceLevel: "entry",
  })



  const [newRequirement, setNewRequirement] = useState("")
  const [newResponsibility, setNewResponsibility] = useState("")
  const [newQualification, setNewQualification] = useState("")
  const [newOptional, setNewOptional] = useState("")
  const [newTag, setNewTag] = useState("")
  const [errors, setErrors] = useState({})
  const { toast } = useToast()

  
  const validateForm = () => {
    const newErrors = {}

    if (!formData.title?.trim()) newErrors.title = "Position title is required"
    if (!formData.department?.trim()) newErrors.department = "Department is required"
    if (!formData.location?.trim()) newErrors.location = "Location is required"
    if (!formData.description?.trim()) newErrors.description = "Description is required"
    if (!formData.duration?.trim()) newErrors.duration = "Duration is required"
    if (!formData.startDate?.trim()) newErrors.startDate = "Start date is required"
    if (!formData.endDate?.trim()) newErrors.endDate = "End date is required"
    if (!formData.applicationDeadline?.trim()) newErrors.applicationDeadline = "Application deadline is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {

      // console.log(formData)
      await createPosition(formData)
      // await fetchPositions()           // ✅ Refresh list from backend


      setFormData({
        title: "",
        department: "",
        location: "",
        type: "",
        description: "",
        requirements: [],
        responsibilities: [],
        qualifications: [],
        optional: [],
        salary: "",
        duration: "",
        startDate: "",
        endDate: "",
        applicationDeadline: "",
        maxApplications: 0,
        tags: [],
        priority: "high",
        experienceLevel: "entry",
      })
      setErrors({})
      // onOpenChange(false)
    }
    
  }




  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const addListItem = (
    field,
    value,
    setValue,
  ) => {
    if (value.trim() && !formData[field]?.includes(value.trim())) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field] || []), value.trim()],
      }))
      setValue("")
    }
  }




  const removeListItem = (
    field,
    itemToRemove,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field]?.filter((item) => item !== itemToRemove) || [],
    }))
  }



  const handleKeyPress = (
    e,
    field,
    value,
    setValue,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addListItem(field, value, setValue)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Position</DialogTitle>
          <DialogDescription>Create a new internship position for candidates to apply to.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Position Title *</Label>
                <Input
                  id="title"
                  value={formData.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Frontend Developer Intern"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
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
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="HR">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
                {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location || ""}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="e.g., San Francisco, CA or Remote"
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Position Type</Label>
                <Select
                  value={formData.type || "Full-time"}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority || "high"}
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
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select
                  value={formData.experienceLevel || "entry"}
                  onValueChange={(value) => handleInputChange("experienceLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxApplications">Max Applications</Label>
                <Input
                  id="maxApplications"
                  type="number"
                  value={formData.maxApplications || ""}
                  onChange={(e) =>
                    handleInputChange("maxApplications", e.target.value ? Number.parseInt(e.target.value) : undefined)
                  }
                  placeholder="e.g., 100"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Position Description *</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the internship role and what the intern will be doing..."
              rows={4}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label>Technical Requirements</Label>
            <div className="flex gap-2">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, "requirements", newRequirement, setNewRequirement)}
                placeholder="Add a requirement and press Enter"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={() => addListItem("requirements", newRequirement, setNewRequirement)}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.requirements?.map((req) => (
                <Badge key={req} variant="secondary" className="flex items-center gap-1">
                  {req}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeListItem("requirements", req)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div className="space-y-2">
            <Label>Key Responsibilities</Label>
            <div className="flex gap-2">
              <Input
                value={newResponsibility}
                onChange={(e) => setNewResponsibility(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, "responsibilities", newResponsibility, setNewResponsibility)}
                placeholder="Add a responsibility and press Enter"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={() => addListItem("responsibilities", newResponsibility, setNewResponsibility)}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.responsibilities?.map((resp) => (
                <Badge key={resp} variant="secondary" className="flex items-center gap-1">
                  {resp}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeListItem("responsibilities", resp)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div className="space-y-2">
            <Label>Required Qualifications</Label>
            <div className="flex gap-2">
              <Input
                value={newQualification}
                onChange={(e) => setNewQualification(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, "qualifications", newQualification, setNewQualification)}
                placeholder="Add a qualification and press Enter"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={() => addListItem("qualifications", newQualification, setNewQualification)}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.qualifications?.map((qual) => (
                <Badge key={qual} variant="secondary" className="flex items-center gap-1">
                  {qual}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeListItem("qualifications", qual)} />
                </Badge>
              ))}
            </div>
          </div>



          {/* Optional */}
          <div className="space-y-2">
            <Label>Nice To Have Skills</Label>
            <div className="flex gap-2">
              <Input
                value={newOptional}
                onChange={(e) => setNewOptional(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, "optional", newOptional, setNewOptional)}
                placeholder="Add a Nice to have Skills"
                className="flex-1"
              />
              <Button type="button" onClick={() => addListItem("optional", newOptional, setNewOptional)} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.optional?.map((opt) => (
                <Badge key={opt} variant="secondary" className="flex items-center gap-1">
                  {opt}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeListItem("optional", opt)} />
                </Badge>
              ))}
            </div>
          </div>





          {/* Compensation & Duration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Compensation & Duration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Input
                  id="salary"
                  value={formData.salary || ""}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  placeholder="e.g., $4,000 - $6,000/month"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={formData.duration || ""}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  placeholder="e.g., 3 months, 6 months"
                  className={errors.duration ? "border-red-500" : ""}
                />
                {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate || ""}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  className={errors.startDate ? "border-red-500" : ""}
                />
                {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className={errors.endDate ? "border-red-500" : ""}
                />
                {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicationDeadline">Application Deadline *</Label>
                <Input
                  id="applicationDeadline"
                  type="date"
                  value={formData.applicationDeadline || ""}
                  onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
                  className={errors.applicationDeadline ? "border-red-500" : ""}
                />
                {errors.applicationDeadline && <p className="text-sm text-red-500">{errors.applicationDeadline}</p>}
              </div>
            </div>
          </div>





          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, "tags", newTag, setNewTag)}
                placeholder="Add tags for better searchability"
                className="flex-1"
              />
              <Button type="button" onClick={() => addListItem("tags", newTag, setNewTag)} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeListItem("tags", tag)} />
                </Badge>
              ))}
            </div>
          </div>




          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Position</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePositionModal
