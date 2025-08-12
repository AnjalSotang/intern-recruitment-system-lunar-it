import React from 'react'
import AdminLayout from '../../../layout/AdminLayout'
import SettingsContent from './Components/SettingsContent'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminLayout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
        <SettingsContent />
      </AdminLayout>
    </div>
  )
}

export default Settings
