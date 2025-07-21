import React from 'react'

const AdminSidebar = () => {
  return (
    <aside className="w-64 h-screen fixed top-13 left-0 bg-white border-r border-gray-200">
      <nav className="p-6 overflow-y-auto h-full">
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer">
              <i className="fas fa-tachometer-alt w-5 h-5 mr-3"></i>
              Dashboard
            </a>
          </li>
          <li>
            <a href="/admin/Application" className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-lg cursor-pointer">
              <i className="fas fa-file-alt w-5 h-5 mr-3"></i>
              Applications
            </a>
          </li>
          <li>
            <a href="/admin/Internship" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer">
              <i className="fas fa-briefcase w-5 h-5 mr-3"></i>
              Positions
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer">
              <i className="fas fa-users w-5 h-5 mr-3"></i>
              Users
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer">
              <i className="fas fa-cog w-5 h-5 mr-3"></i>
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default AdminSidebar
