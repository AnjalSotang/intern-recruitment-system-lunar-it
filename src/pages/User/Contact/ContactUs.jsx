// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
import Layout from "../../../layout/MainLayout";
import Header from "./components/Header";
import Contact from "./components/Contact";
import Map from "./components/Map";

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-white">
        <Layout>
            {/* Main Content */}
         
                {/* Header Section */}
              <Header/>
                 <div className="max-w-7xl my-16 mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* Contact Section */}
                <Contact/>
                {/* Map Section */}
                <Map/>
                
            </div>

            {/* Footer */}
         </Layout>
        </div>
    );
};

export default ContactUs;
