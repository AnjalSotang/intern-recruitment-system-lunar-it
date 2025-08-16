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
import { useAuthStore } from "../../../store/Auth"
import ChangePassword from "./Components/ChangePassword"


export default function SettingsContent() {
  const loading = useMemberStore(state => state.loading)
  const members = useMemberStore(state => state.members)
  const fetchMembers = useMemberStore(state => state.fetchMembers)
  const fetchAdmin = useAuthStore(state => state.fetchAdmin)
  const error = useMemberStore(state => state.error)

  
  // console.log(loading)
  // console.log(members)
  // To this:
  useEffect(() => {
    fetchMembers(),
    fetchAdmin()
  }, [])

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
          <ProfileInformation/>
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
         <ChangePassword/>
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
