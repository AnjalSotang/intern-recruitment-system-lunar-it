import React from 'react'

const AdditionalInfo = ({ deadline }) => {
    return (
        <section className="mb-12">
            <div className="bg-gray-50 rounded-xl p-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="bg-red-100 text-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-calendar-alt text-lg"></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                            Application Deadline
                        </h3>
                        <p className="text-gray-600">
                            {deadline ? new Date(deadline).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }) : 'No deadline'}
                        </p>
                    </div>
                    <div>
                        <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-envelope text-lg"></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Questions?</h3>
                        <p className="text-gray-600">internships@techintern.com</p>
                    </div>
                    <div>
                        <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-balance-scale text-lg"></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                            Equal Opportunity
                        </h3>
                        <p className="text-gray-600">
                            We welcome all qualified candidates
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdditionalInfo
