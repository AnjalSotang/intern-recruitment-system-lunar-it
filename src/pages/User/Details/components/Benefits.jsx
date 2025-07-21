import React from 'react'
import { benefits } from '../../../../constants'

const Benefits = () => {
    return (
        <section className="mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    What We Offer
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-4">
                                <i className="fas fa-gift text-white text-xs"></i>
                            </div>
                            <span className="text-gray-700 leading-relaxed">
                                {benefit}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Benefits
