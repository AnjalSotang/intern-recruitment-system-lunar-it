import React from 'react'

const DeleteModal = ({showDeleteModal, setShowDeleteModal, setPositionToDelete, positionToDelete}) => {
    if (!showDeleteModal) return null
    return (


        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="p-6">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                            <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
                        Delete Position
                    </h3>
                    <p className="text-gray-500 text-center mb-6">
                        Are you sure you want to delete this position? This action cannot be undone.
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                        <button
                            onClick={() => {
                                setShowDeleteModal(false);
                                setPositionToDelete(null);
                            }}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                if (positionToDelete) {
                                    // setPositions(positions.filter(p => p.id !== positionToDelete.id));
                                    alert(`Position with ID ${positionToDelete.id} deleted`);
                                    setShowDeleteModal(false);
                                    setPositionToDelete(null);
                                }
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
