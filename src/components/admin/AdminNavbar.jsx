import { useEffect, useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, Sun, Moon, User, LogOut, Settings } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDarkMode } from "../../../contexts/DarkModeContext" // Import the hook
import logo from "/logo.ico"
import { useAuthStore } from "../../store/Auth"
import NotificationsDropdown from "./components/NotificationDropDown"

const mockNotifications = [
  {
    id: "1",
    type: "application",
    title: "New Application Received",
    message: "Sarah Wilson applied for Frontend Developer Intern position",
    time: "2 minutes ago",
    read: false,
    avatar: "/placeholder.svg?height=32&width=32",
    actionUrl: "/applications",
  },
  {
    id: "2",
    type: "interview",
    title: "Interview Scheduled",
    message: "Interview with John Doe scheduled for tomorrow at 2:00 PM",
    time: "15 minutes ago",
    read: false,
    avatar: "/placeholder.svg?height=32&width=32",
    actionUrl: "/interviews",
  },
  {
    id: "3",
    type: "message",
    title: "New Message",
    message: "Alice Johnson sent you a message regarding the interview",
    time: "1 hour ago",
    read: false,
    avatar: "/placeholder.svg?height=32&width=32",
    actionUrl: "/messages",
  },
  {
    id: "4",
    type: "team",
    title: "Team Member Added",
    message: "Mike Chen has been added to the HR team",
    time: "2 hours ago",
    read: true,
    avatar: "/placeholder.svg?height=32&width=32",
    actionUrl: "/settings",
  },
  {
    id: "5",
    type: "system",
    title: "System Update",
    message: "Weekly report is ready for review",
    time: "3 hours ago",
    read: true,
    actionUrl: "/reports",
  },
  {
    id: "6",
    type: "application",
    title: "Application Status Updated",
    message: 'David Kim\'s application status changed to "Interview Scheduled"',
    time: "4 hours ago",
    read: true,
    avatar: "/placeholder.svg?height=32&width=32",
    actionUrl: "/applications",
  },
]

const AdminNavbar = () => {
    const user = useAuthStore(state => state.user)
    const fetchAdmin = useAuthStore(state => state.fetchAdmin)
    const logout = useAuthStore(state => state.logout) // Add logout function
    const navigate = useNavigate() // For navigation after logout
    const [notifications] = useState(3)
    const { darkMode, setDarkMode } = useDarkMode() // Use the context

    useEffect(
        () => {
            fetchAdmin()
        }, [])

    // Handle logout functionality
    const handleLogout = () => {
        logout() // Call the logout function from auth store
        navigate('/login') // Redirect to login page (adjust path as needed)
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-between h-16 shrink-0 items-center border-b bg-background border-border px-4">

            <div className="flex items-center space-x-3">
                {/* Sidebar Trigger */}
                <SidebarTrigger className="ml-1 text-foreground hover:bg-accent hover:text-accent-foreground" />

                {/* Vertical Separator */}
                <Separator orientation="vertical" className="h-6" />

                {/* Logo + Title */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded overflow-hidden">
                        <img src={logo} alt="Lunar IT Logo" className="object-contain w-full h-full" />
                    </div>
                    <span className="text-base font-semibold text-foreground whitespace-nowrap">
                        Lunar I.T. Solution
                    </span>
                </Link>

            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="text-foreground hover:bg-accent hover:text-accent-foreground">
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                <NotificationsDropdown/>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.imageUrl} alt="Admin" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default AdminNavbar