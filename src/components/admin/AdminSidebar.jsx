import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Briefcase, FileText, Calendar, Users, Settings, Building2, Bell, Mail, MessageSquare } from "lucide-react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"


const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboards",
    icon: LayoutDashboard,
  },
  {
    title: "Internship Positions",
    url: "/admin/positions",
    icon: Briefcase,
  },
  {
    title: "Applications",
    url: "/admin/applications",
    icon: FileText,
  },
  {
    title: "Interviews",
    url: "/admin/interviews",
    icon: Calendar,
  },
   {
    title: "Messages",
    url: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
  // {
  //   title: "Users",
  //   url: "/users",
  //   icon: Users,
  // },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]


  


const AdminSidebar = () => {
  const { pathname } = useLocation()

  return (
    <Sidebar className="mt-16 flex flex-col h-[calc(100vh-4rem)] bg-indigo-50">
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-indigo-700 font-semibold">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`flex items-center space-x-2 rounded-lg transition-colors duration-200 ${isActive
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                        }`}
                    >
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-indigo-200">
        <div className="p-4 text-xs text-gray-500">
          © 2024 InternRecruit System
        </div>
      </SidebarFooter>
    </Sidebar>

  )
}

export default AdminSidebar;
