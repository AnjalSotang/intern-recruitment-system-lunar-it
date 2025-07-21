import React from 'react'
import { qualifications } from '../../../../constants'

const Qualifications = () => {
    return (
        <section className="mb-12">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Required Qualifications
                </h2>
                <ul className="space-y-4">
                    {qualifications.map((qualification, index) => (
                        <li key={index} className="flex items-start">
                            <div className="bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-4">
                                <i className="fas fa-star text-xs"></i>
                            </div>
                            <span className="text-gray-700 leading-relaxed">
                                {qualification}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Qualifications
