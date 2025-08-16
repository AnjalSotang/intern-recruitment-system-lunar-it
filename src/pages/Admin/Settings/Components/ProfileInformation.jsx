import React, { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Save, Upload } from "lucide-react"
import { useAuthStore } from "../../../../store/Auth"
import { toast } from "react-toastify"

const ProfileInformation = () => {
    const loading = useAuthStore(state => state.loading)
    const status = useAuthStore(state => state.status)
    const error = useAuthStore(state => state.error)
    const user = useAuthStore(state => state.user)
    const updateAdmin = useAuthStore(state => state.updateAdmin)
    const message = useAuthStore(state => state.message)
    // Get the clear functions from the store
    const clearMessage = useAuthStore(state => state.clearMessage)
    const clearError = useAuthStore(state => state.clearError)

    const [preview, setPreview] = useState(null)
    const [file, setFile] = useState(null)
    const [editableUser, setEditableUser] = useState(user || {})

    useEffect(() => {
        setEditableUser(user || {})
        if (user?.imageUrl) {
            setPreview(user.imageUrl)
        } else {
            setPreview(null)
        }
    }, [user])

    // Handle success message and clear it after showing
    useEffect(() => {
        if (message) {
            toast.success(message)
            clearMessage() // Clear the message to prevent showing again
        }
    }, [message, clearMessage])

    // Handle error message and clear it after showing
    useEffect(() => {
        if (error) {
            toast.error(error)
            clearError() // Clear the error to prevent showing again
        }
    }, [error, clearError])

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (!selectedFile) return

        if (selectedFile.size > 2 * 1024 * 1024) {
            alert("File size exceeds 2MB.")
            return
        }

        setFile(selectedFile)
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result)
        }
        reader.readAsDataURL(selectedFile)
    }

    const handleSaveProfile = async () => {
        const formData = new FormData()
        formData.append("name", editableUser.name)
        formData.append("email", editableUser.email)
        formData.append("phone", editableUser.phone || "")
        formData.append("role", editableUser.role)
        formData.append("bio", editableUser.bio || "")
        if (file) {
            formData.append("image", file) // ✅ must match backend multer field
        }

        updateAdmin(formData, user._id)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={ preview || "/placeholder.svg"} alt="Profile" />
                        <AvatarFallback>
                            {editableUser?.name?.[0]?.toUpperCase() || "AU"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="space-y-2">
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/gif"
                            id="profile-upload"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label htmlFor="profile-upload">
                            <Button asChild variant="outline" size="sm">
                                <span>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Photo
                                </span>
                            </Button>
                        </label>
                        <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                </div>

                <Separator />

                {/* Name + Email */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={editableUser.name || ""}
                            onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={editableUser.email || ""}
                            onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
                        />
                    </div>
                </div>

                {/* Phone + Role */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            value={editableUser.phone || ""}
                            onChange={(e) => setEditableUser({ ...editableUser, phone: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                            id="role"
                            value={editableUser.role || ""}
                            readOnly // ✅ role should not be editable directly
                        />
                    </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                        id="bio"
                        value={editableUser.bio || ""}
                        onChange={(e) => setEditableUser({ ...editableUser, bio: e.target.value })}
                        rows={3}
                    />
                </div>

                {/* Save Button */}
                <Button onClick={handleSaveProfile} disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? "Saving..." : "Save Changes"}
                </Button>

                {error && (
                    <p className="text-sm text-red-500 mt-2">{error}</p>
                )}
            </CardContent>
        </Card>
    )
}

export default ProfileInformation