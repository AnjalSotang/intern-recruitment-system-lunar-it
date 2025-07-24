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
import { LayoutDashboard, Briefcase, FileText, Calendar, Users, Settings, Building2 } from "lucide-react"
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
    <Sidebar className="mt-16">
      {/* <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">InternRecruit</span>
        </div>
      </SidebarHeader> */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-4 text-xs text-muted-foreground">© 2024 InternRecruit System</div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AdminSidebar;
