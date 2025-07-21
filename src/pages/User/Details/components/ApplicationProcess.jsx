import React from 'react'
import { applicationSteps } from '../../../../constants'

const ApplicationProcess = () => {
    return (
        <section className="mb-12">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Application Process
                </h2>
                <div className="space-y-6">
                    {applicationSteps.map((step, index) => (
                        <div key={index} className="flex items-start">
                            <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-6 font-bold">
                                {step.step}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ApplicationProcess
