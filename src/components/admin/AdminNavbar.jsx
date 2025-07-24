import { useState } from "react"
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
import { Link } from "react-router-dom"
import { useDarkMode } from "../../../contexts/DarkModeContext" // Import the hook
import logo from "/logo.ico"

const AdminNavbar = () => {
    const [notifications] = useState(3)
    const { darkMode, setDarkMode } = useDarkMode() // Use the context

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

                <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-accent hover:text-accent-foreground">
                    <Bell className="h-4 w-4" />
                    {notifications > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                            {notifications}
                        </Badge>
                    )}
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">Admin User</p>
                                <p className="text-xs leading-none text-muted-foreground">admin@company.com</p>
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
                        <DropdownMenuItem>
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