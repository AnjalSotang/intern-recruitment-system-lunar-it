import React from 'react'
import AdminLayout from '../../../layout/AdminLayout'
import ApplicationContents from './ApplicationContents'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Applicants = () => {
  return (
    <AdminLayout>
<ToastContainer position="top-right" autoClose={3000} />
       <ApplicationContents/> 
    </AdminLayout>
  )
}

export default Applicants
