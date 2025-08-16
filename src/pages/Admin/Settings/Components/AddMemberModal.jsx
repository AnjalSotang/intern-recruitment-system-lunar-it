import { useEffect, useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-toastify"

import { UserPlus, Loader2 } from "lucide-react"
import { useMemberStore } from "../../../../store/MemberStore"

export default function AddMemberModal({ open, onOpenChange, onMemberAdded }) {
    const loading = useMemberStore(state => state.loading)
    const status = useMemberStore(state => state.status)
    const message = useMemberStore(state => state.message)
    const error = useMemberStore(state => state.error)

    const createMember = useMemberStore(state => state.createMember)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        phone: "",
        department: "",
        bio: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        createMember(formData)
        // Reset form
        setFormData({
            name: "",
            email: "",
            role: "",
            phone: "",
            department: "",
            bio: "",
        })
        onOpenChange(false)
    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    useEffect(() => {
        if (status && message) {
            if (status >= 200 && status < 300) {
                toast.success(message);
            }
            else {
                toast.error(message);
            }
        }
    }, [status, message]);

    // Also handle error state separately
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5" />
                        Add Team Member
                    </DialogTitle>
                    <DialogDescription>
                        Add a new team member to your organization. They will receive an invitation email.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                placeholder="Enter full name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder="Enter email address"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="role">Role *</Label>
                            <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="System Administrator">System Administrator</SelectItem>
                                    <SelectItem value="HR Manager">HR Manager</SelectItem>
                                    <SelectItem value="Recruiter">Recruiter</SelectItem>
                                    <SelectItem value="Technical Interviewer">Technical Interviewer</SelectItem>
                                    <SelectItem value="HR Assistant">HR Assistant</SelectItem>
                                    <SelectItem value="Department Head">Department Head</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                                    <SelectItem value="Engineering">Engineering</SelectItem>
                                    <SelectItem value="Product">Product</SelectItem>
                                    <SelectItem value="Design">Design</SelectItem>
                                    <SelectItem value="Marketing">Marketing</SelectItem>
                                    <SelectItem value="Sales">Sales</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => handleInputChange("bio", e.target.value)}
                            placeholder="Brief description about the team member"
                            rows={3}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading || !formData.name || !formData.email || !formData.role}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Add Member
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
