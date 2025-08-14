import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Building2, Bell, Shield, Users, Save, Upload, Trash2, Plus, Edit } from "lucide-react"

import AddMemberModal from "./Components/AddMemberModal"
import EditMemberModal from "./Components/EditMemberModal"
import DeleteMemberModal from "./Components/DeleteMemberModal"
import { useMemberStore } from "../../../store/MemberStore"
import { toast, ToastContainer } from "react-toastify"
import ProfileInformation from "./Components/ProfileInformation"


export default function SettingsContent() {
  const loading = useMemberStore(state => state.loading)
  const status = useMemberStore(state => state.status)
  const error = useMemberStore(state => state.error)
  const members = useMemberStore(state => state.members)
  const fetchMembers = useMemberStore(state => state.fetchMembers)
  const message = useMemberStore(state => state.message)

  // console.log(loading)
  // console.log(members)
  // To this:
  useEffect(() => {
    fetchMembers()
  }, [])

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


  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@company.com",
    phone: "+1 (555) 123-4567",
    role: "System Administrator",
    bio: "Experienced HR professional managing internship programs at TechCorp.",
  })

  const [companyData, setCompanyData] = useState({
    name: "TechCorp Inc.",
    website: "https://techcorp.com",
    address: "123 Tech Street, San Francisco, CA 94105",
    description: "Leading technology company focused on innovation and talent development.",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    applicationAlerts: true,
    interviewReminders: true,
    weeklyReports: false,
  })

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@company.com",
      role: "HR Manager",
      status: "active",
      phone: "+1 (555) 123-4567",
      department: "Human Resources",
    },
    {
      id: 2,
      name: "Sarah Davis",
      email: "sarah@company.com",
      role: "Recruiter",
      status: "active",
      phone: "+1 (555) 234-5678",
      department: "Human Resources",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@company.com",
      role: "Technical Interviewer",
      status: "inactive",
      phone: "+1 (555) 345-6789",
      department: "Engineering",
    },
  ])

  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showEditMemberModal, setShowEditMemberModal] = useState(false)
  const [showDeleteMemberModal, setShowDeleteMemberModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)



  const handleSaveCompany = () => {
    toast({
      title: "Company settings updated",
      description: "Company information has been successfully updated.",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    })
  }


  const handleEditMember = (member) => {
    setSelectedMember(member)
    setShowEditMemberModal(true)
  }


  const handleDeleteMember = (member) => {
    setSelectedMember(member)
    setShowDeleteMemberModal(true)
  }

  const handleRemoveMember = (memberId) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== memberId))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and system preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Company
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileInformation profileData={profileData}/>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Manage your company details and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyData.name}
                    onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={companyData.website}
                    onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={companyData.address}
                  onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  value={companyData.description}
                  onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <Button onClick={handleSaveCompany}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about system events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Application Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new applications are submitted</p>
                  </div>
                  <Switch
                    checked={notifications.applicationAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, applicationAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Interview Reminders</Label>
                    <p className="text-sm text-muted-foreground">Receive reminders before scheduled interviews</p>
                  </div>
                  <Switch
                    checked={notifications.interviewReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, interviewReminders: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                  />
                </div>
              </div>

              <Button onClick={handleSaveNotifications}>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage team members and their access levels</CardDescription>
              </div>
              <Button onClick={() => setShowAddMemberModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading === true && (
                  <>
                    {/* Skeleton for multiple team members */}
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                          <div>
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="h-3 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                              <div className="h-5 w-14 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {loading === false && members?.map((member) => (
                  <div key={member._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{member.role}</Badge>
                          <Badge variant={member.status === "active" ? "default" : "secondary"}>
                            {member.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditMember(member)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteMember(member)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Change Password</Label>
                  <p className="text-sm text-muted-foreground mb-4">Update your password to keep your account secure</p>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-base font-medium">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-sm text-muted-foreground">Use an authenticator app to secure your account</p>
                    </div>
                    <Button variant="outline">Setup 2FA</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-base font-medium">Session Management</Label>
                  <p className="text-sm text-muted-foreground mb-4">Manage your active sessions</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on macOS • San Francisco, CA</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      Sign Out All Other Sessions
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddMemberModal open={showAddMemberModal} onOpenChange={setShowAddMemberModal} />

      <EditMemberModal
        open={showEditMemberModal}
        onOpenChange={setShowEditMemberModal}
        member={selectedMember}

      />

      <DeleteMemberModal
        open={showDeleteMemberModal}
        onOpenChange={setShowDeleteMemberModal}
        member={selectedMember}
      />
    </div>
  )
}
