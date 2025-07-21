import React, { Children } from 'react'
import AdminNavbar from '../components/admin/AdminNavbar'
import AdminSidebar from '../components/admin/AdminSidebar'

const AdminLayout = ({ children }) => {
    return (
        <>
            <AdminNavbar />
            <div className="flex">

                <AdminSidebar />
                <main className="flex-1 p-6 ml-64 ">
                    {children}
                </main>
            </div>
            {/* oiajdsioa
            odjoia
            aj */}
        </>
    )
}

export default AdminLayout
