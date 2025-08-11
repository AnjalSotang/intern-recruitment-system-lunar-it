import React from 'react'
// import { responsibilities } from '../../../../constants'

const KeyResponsibilities = ({responsibilities }) => {
console.log("Responsibilities inside component:", responsibilities);
    return (
        <section className="mb-12">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Key Responsibilities
                </h2>
                <ul className="space-y-4">
                    {responsibilities.length === 0 ? (
                        <p className="text-gray-500 italic">No responsibilities listed for this position.</p>
                    ) : (
                        responsibilities.map((responsibility, index) => (
                            <li key={index} className="flex items-start">
                                {responsibility}
                            </li>
                        ))
                    )}

                </ul>
            </div>
        </section>
    )
}

export default KeyResponsibilities
