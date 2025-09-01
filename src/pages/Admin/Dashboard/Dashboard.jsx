import React from 'react'
import AdminLayout from '../../../layout/AdminLayout'
import {DashboardContent} from './DashboardContent'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
  return (
    <AdminLayout>
<ToastContainer position="top-right" autoClose={3000} />
       <DashboardContent/> 
    </AdminLayout>
  )
}

export default Dashboard
