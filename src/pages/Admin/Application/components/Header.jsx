import React from 'react'
import Button from './Button/Button'

const Header = ({ type, filteredApplications }) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">

                {type === 'Intern' ? <h1 className="text-2xl font-bold text-gray-900">Internship Positions</h1> :
                    <h1 className="text-2xl font-bold text-gray-900">Applications</h1>}


                {
                    type !== 'Intern' && (
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                            {filteredApplications.length} total
                        </span>
                    )
                }

            </div>
            <Button type={type} />
        </div>

    )
}

export default Header
