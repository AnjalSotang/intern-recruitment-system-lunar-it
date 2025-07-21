import React from 'react'

const ResumeUpload = ({dragActive, errors, handleDrag, handleDrop, handleFileSelect, uploadedFile}) => {
    return (
        <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <i className="fas fa-file-upload mr-3 text-blue-600"></i>
                Resume Upload
            </h2>

            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${dragActive ? 'border-blue-500 bg-blue-50' : errors.resume ? 'border-red-500' : 'border-gray-300'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('resume-upload')?.click()}
            >
                <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                />

                {uploadedFile ? (
                    <div className="flex items-center justify-center">
                        <i className="fas fa-file-alt text-3xl text-green-600 mr-4"></i>
                        <div>
                            <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                            <p className="text-sm text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                        <p className="text-lg font-medium text-gray-700 mb-2">
                            Drag and drop your resume here, or click to browse
                        </p>
                        <p className="text-sm text-gray-500">
                            Supported formats: PDF, DOC, DOCX (Max size: 10MB)
                        </p>
                    </div>
                )}
            </div>
            {errors.resume && <p className="text-red-500 text-sm mt-2">{errors.resume}</p>}
        </div>
    )
}

export default ResumeUpload
