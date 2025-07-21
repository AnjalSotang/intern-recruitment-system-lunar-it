// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
import { Link } from "react-router-dom";
// import {
//     requiredSkills, niceToHaveSkills, responsibilities,
//     qualifications, benefits, applicationSteps
// } from "../../../constants";
import Layout from "../../../layout/MainLayout";
import Header from "./components/Header";
import Intro from "./components/Intro";
import JobOverview from "./components/JobOverview";
import KeyResponsibilities from "./components/KeyResponsibilities";
import Qualifications from "./components/Qualifications";
import TechnicalSkills from "./components/TechnicalSkills";
import Benefits from "./components/Benefits";
import ApplicationProcess from "./components/ApplicationProcess";
import ApplicationForm from "./components/ApplicationForm";
import AdditionalInfo from "./components/AdditionalInfo";
import Footer from "../../../components/common/Footer";





const ViewDetails = () => {
  

    return (
        <div
            className="min-h-screen bg-white"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            {/* Header */}
           <Header/>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* Position Header */}
               <Intro/>

                {/* Job Overview */}
               <JobOverview/>

                {/* Key Responsibilities */}
                <KeyResponsibilities/>

                {/* Required Qualifications */}
                <Qualifications/>

                {/* Technical Skills */}
               <TechnicalSkills/>

                {/* Benefits */}
               <Benefits/>

                {/* Application Process */}
               <ApplicationProcess/>

                {/* Application Form */}
               <ApplicationForm/>

                {/* Additional Information */}
               <AdditionalInfo/>
            </main>

            {/* Footer */}
            <Footer/>


        </div>
    );
};

export default ViewDetails;
