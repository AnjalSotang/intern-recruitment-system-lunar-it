import React, { Children, useState } from 'react'
import AdminNavbar from '../components/admin/AdminNavbar'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AdminSidebar from '../components/admin/AdminSidebar'

const AdminLayout = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <div className={darkMode ? "dark" : ""}>
            <SidebarProvider>
                <AdminSidebar/>
                <SidebarInset>
                    <AdminNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
                    <main className="flex-1 px-6 pb-6 pt-16 mt-6">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>


    )
}

export default AdminLayout
