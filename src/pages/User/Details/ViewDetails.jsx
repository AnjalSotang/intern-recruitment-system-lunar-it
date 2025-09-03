// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useEffect} from "react";
import { Link, useParams } from "react-router-dom";
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
import { usePositionStore } from "../../../store/PositionStore"




const ViewDetails = () => {


    const { id } = useParams()
    // console.log(id)
    const fetchPosition = usePositionStore(state => state.fetchPosition);
    const position = usePositionStore(state => state.position);
    const loading = usePositionStore(state => state.loading);
    const error = usePositionStore(state => state.error);

    useEffect(() => {
        if (id) {
            fetchPosition(id); // call your store function with the id
        }
    }, [id, fetchPosition]);

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center" style={{ fontFamily: "Inter, sans-serif" }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading position details...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center" style={{ fontFamily: "Inter, sans-serif" }}>
                <div className="text-center">
                    <div className="w-16 h-16 mb-4 mx-auto flex items-center justify-center bg-red-100 rounded-full text-red-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>                    
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Position</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => fetchPosition(id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Show not found state
    if (!loading && !error && !position) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center" style={{ fontFamily: "Inter, sans-serif" }}>
                <div className="text-center">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Position Not Found</h2>
                    <p className="text-gray-600 mb-4">The position you're looking for doesn't exist or has been removed.</p>
                    <Link
                        to="/positions"
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-600 transition-colors inline-block"
                    >
                        Back to Positions
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <div
            className="min-h-screen bg-white"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* Position Header */}
                <Intro position={position} />

                {/* Job Overview */}
                <JobOverview position={position} />

                {/* Key Responsibilities */}
                <KeyResponsibilities responsibilities={position.responsibilities} />

                {/* Required Qualifications */}
                <Qualifications qualifications={position.qualifications} />

                {/* Technical Skills */}
                <TechnicalSkills requirements={position.requirements} optional={position.optional} />

                {/* Benefits */}
                <Benefits />

                {/* Application Process */}
                <ApplicationProcess />

                {/* Application Form */}
                <ApplicationForm id={id} position={position}/>

                {/* Additional Information */}
                <AdditionalInfo deadline={position.applicationDeadline} />
            </main>

            {/* Footer */}
            <Footer />


        </div>
    );
};

export default ViewDetails;
