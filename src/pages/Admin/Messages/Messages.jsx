import React from 'react'
import AdminLayout from '../../../layout/AdminLayout'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { MessagesPageContent } from './MessagesContent';

const Messages = () => {
    return (
            <AdminLayout>
                <ToastContainer position="top-right" autoClose={3000} />  
 <div className="space-y-8 p-6">                         
    <MessagesPageContent />
                </div>
            </AdminLayout>
    )
}

export default Messages
