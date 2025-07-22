import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const AdminSidebar = () => {
  const location = useLocation()

  // Helper function to check if link is active
  const isActive = (path) => location.pathname === path

  // Common classes
  const baseClass = 'flex items-center px-4 py-2 rounded-lg cursor-pointer'
  const activeClass = 'text-blue-600 bg-blue-50 font-semibold'
  const inactiveClass = 'text-gray-700 hover:bg-gray-100'

  return (
    <aside className="w-64 h-screen fixed top-13 left-0 bg-white border-r border-gray-200">
      <nav className="p-6 overflow-y-auto h-full">
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/dashboard"
              className={`${baseClass} ${isActive('/admin/dashboard') ? activeClass : inactiveClass}`}
            >
              <i className="fas fa-tachometer-alt w-5 h-5 mr-3"></i>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/Application"
              className={`${baseClass} ${isActive('/admin/Application') ? activeClass : inactiveClass}`}
            >
              <i className="fas fa-file-alt w-5 h-5 mr-3"></i>
              Applications
            </Link>
          </li>
          <li>
            <Link
              to="/admin/Internship"
              className={`${baseClass} ${isActive('/admin/Internship') ? activeClass : inactiveClass}`}
            >
              <i className="fas fa-users w-5 h-5 mr-3"></i>
              Positions
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className={`${baseClass} ${isActive('/admin/settings') ? activeClass : inactiveClass}`}
            >
              <i className="fas fa-cog w-5 h-5 mr-3"></i>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default AdminSidebar
