import React from 'react'

const AdminNavbar = () => {
    return (
        <nav className="bg-white sticky top-0 z-50 border-b border-gray-200 px-10 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <i className="fas fa-bell text-gray-400"></i>
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
            </div>
        </nav>
    )
}

export default AdminNavbar
