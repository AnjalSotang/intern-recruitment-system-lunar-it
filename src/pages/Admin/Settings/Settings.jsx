import React from 'react'
import AdminLayout from '../../../layout/AdminLayout'
import SettingsContent from './Components/SettingsContent'

const Settings = () => {
  return (
       <div className="min-h-screen bg-gray-50">
            <AdminLayout>
                    <SettingsContent/>
            </AdminLayout>
        </div>
  )
}

export default Settings
