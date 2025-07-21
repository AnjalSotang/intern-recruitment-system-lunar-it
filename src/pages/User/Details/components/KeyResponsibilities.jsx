import React from 'react'
import { responsibilities } from '../../../../constants'

const KeyResponsibilities = () => {
    return (
        <section className="mb-12">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Key Responsibilities
                </h2>
                <ul className="space-y-4">
                    {responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start">
                            <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-4">
                                <i className="fas fa-check text-xs"></i>
                            </div>
                            <span className="text-gray-700 leading-relaxed">
                                {responsibility}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default KeyResponsibilities
