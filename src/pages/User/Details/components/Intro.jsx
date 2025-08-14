import React from 'react'

const Intro = ({ position }) => {
    // Early return if position is null or undefined
    if (!position) {
        return (
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
        );


    } return (
        <div className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-6 lg:mb-0">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {position.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center text-gray-600">
                                <i className="fas fa-building mr-2 text-blue-600"></i>
                                <span className="font-medium">Department:</span>
                                <span className="ml-1">{position.department}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                                <span className="font-medium">Location:</span>
                                <span className="ml-1">{position.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <i className="fas fa-clock mr-2 text-blue-600"></i>
                                <span className="font-medium">Duration:</span>
                                <span className="ml-1">{position.duration}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <i className="fas fa-user-graduate mr-2 text-blue-600"></i>
                                <span className="font-medium">Type:</span>
                                <span className="ml-1">{position.type}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center lg:text-right">
                        <div
                            className={`px-4 py-2 rounded-full text-sm font-medium mb-3 flex items-center ${position.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                                }`}
                        >
                            <i
                                className={`mr-2 ${position.status === "active" ? "fas fa-check-circle" : "fas fa-times-circle"
                                    }`}
                            ></i>
                            {position.status === "active" ? "Now Hiring" : "Position Closed"}
                        </div>

                        <div className="text-2xl font-bold text-gray-900">
                           {position.salary}
                           {/* $2,000/month */}
                        </div>
                        <div className="text-gray-600 text-sm">Competitive Stipend</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro

// {/* Main Content */}
//   <main className="max-w-6xl mx-auto px-6 py-12">
//     {/* Position Header */}
//     <div className="mb-12">
//       <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//           <div className="mb-6 lg:mb-0">
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">
//               Frontend Developer Intern
//             </h1>
//             <div className="flex flex-wrap gap-4 text-sm">
//               <div className="flex items-center text-gray-600">
//                 <i className="fas fa-building mr-2 text-blue-600"></i>
//                 <span className="font-medium">Department:</span>
//                 <span className="ml-1">Engineering</span>
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
//                 <span className="font-medium">Location:</span>
//                 <span className="ml-1">Remote/Hybrid</span>
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <i className="fas fa-clock mr-2 text-blue-600"></i>
//                 <span className="font-medium">Duration:</span>
//                 <span className="ml-1">3 months</span>
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <i className="fas fa-user-graduate mr-2 text-blue-600"></i>
//                 <span className="font-medium">Type:</span>
//                 <span className="ml-1">Internship</span>
//               </div>
//             </div>
//           </div>
//           <div className="text-center lg:text-right">
//             <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-3">
//               <i className="fas fa-check-circle mr-2"></i>
//               Now Hiring
//             </div>
//             <div className="text-2xl font-bold text-gray-900">
//               $2,000/month
//             </div>
//             <div className="text-gray-600 text-sm">Competitive Stipend</div>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Job Overview */}
//     <section className="mb-12">
//       <div className="bg-white rounded-xl border border-gray-200 p-8">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           Job Overview
//         </h2>
//         <p className="text-gray-700 leading-relaxed text-lg">
//           Join our dynamic engineering team as a Frontend Developer Intern
//           and gain hands-on experience building modern web applications.
//           You'll work alongside experienced developers on real-world
//           projects, contributing to applications used by thousands of users.
//           This internship offers an excellent opportunity to develop your
//           technical skills, learn industry best practices, and potentially
//           transition into a full-time role upon successful completion.
//         </p>
//       </div>
//     </section>

//     {/* Key Responsibilities */}
//     <section className="mb-12">
//       <div className="bg-white rounded-xl border border-gray-200 p-8">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           Key Responsibilities
//         </h2>
//         <ul className="space-y-4">
//           {responsibilities.map((responsibility, index) => (
//             <li key={index} className="flex items-start">
//               <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-4">
//                 <i className="fas fa-check text-xs"></i>
//               </div>
//               <span className="text-gray-700 leading-relaxed">
//                 {responsibility}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>

//     {/* Required Qualifications */}
//     <section className="mb-12">
//       <div className="bg-white rounded-xl border border-gray-200 p-8">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           Required Qualifications
//         </h2>
//         <ul className="space-y-4">
//           {qualifications.map((qualification, index) => (
//             <li key={index} className="flex items-start">
//               <div className="bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-4">
//                 <i className="fas fa-star text-xs"></i>
//               </div>
//               <span className="text-gray-700 leading-relaxed">
//                 {qualification}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>

//     {/* Technical Skills */}
//     <section className="mb-12">
//       <div className="grid lg:grid-cols-2 gap-8">
//         {/* Required Skills */}
//         <div className="bg-white rounded-xl border border-gray-200 p-8">
//           <h3 className="text-xl font-bold text-gray-900 mb-6">
//             Required Technical Skills
//           </h3>
//           <div className="flex flex-wrap gap-3">
//             {requiredSkills.map((skill, index) => (
//               <span
//                 key={index}
//                 className="bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium border border-red-200"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Nice-to-Have Skills */}
//         <div className="bg-white rounded-xl border border-gray-200 p-8">
//           <h3 className="text-xl font-bold text-gray-900 mb-6">
//             Nice-to-Have Skills
//           </h3>
//           <div className="flex flex-wrap gap-3">
//             {niceToHaveSkills.map((skill, index) => (
//               <span
//                 key={index}
//                 className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>

//   </main>