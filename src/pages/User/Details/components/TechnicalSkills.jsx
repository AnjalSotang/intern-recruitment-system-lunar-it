import React from 'react'
import { requiredSkills, niceToHaveSkills } from '../../../../constants'

const TechnicalSkills = () => {
    return (
        <section className="mb-12">
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Required Skills */}
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Required Technical Skills
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {requiredSkills.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium border border-red-200"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Nice-to-Have Skills */}
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Nice-to-Have Skills
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {niceToHaveSkills.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TechnicalSkills
