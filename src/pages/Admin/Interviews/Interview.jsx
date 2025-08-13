import React from 'react'
import AdminLayout from '../../../layout/AdminLayout'
import Heading from './components/Heading'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Interview = () => {
    return (
            <AdminLayout>
                <ToastContainer position="top-right" autoClose={3000} />
                
                <div className='space-y-6'>
                         <Heading />
                </div>
            </AdminLayout>
    )
}

export default Interview
