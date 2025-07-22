// components/modals/InternshipModal.jsx
import React from 'react';

const InternshipModal = ({ show, onClose, type, handleInputChange, handleArrayChange
, addArrayItem, removeArrayItem, addSkill, removeSkill, formData,
  newSkill, setNewSkill, newNiceToHaveSkill, setNewNiceToHaveSkill, handleSubmit
 }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {type ? 'Edit Internship Position' : 'Add New Internship Position'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>


        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Info Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position Title</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="e.g., Frontend Developer Intern"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="e.g., Engineering"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="e.g., San Francisco, CA or Remote"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="e.g., 3 months"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="e.g., $4,000/month"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Overview</label>
                <textarea
                  value={formData.jobOverview}
                  onChange={(e) => handleInputChange('jobOverview', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Provide a brief overview of the internship role..."
                  required
                />
              </div>
            </div>
          </div>



          {/* Key Responsibilities Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Key Responsibilities</h3>
            <div className="space-y-3">
              {formData.keyResponsibilities.map((responsibility, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={responsibility}
                      onChange={(e) => handleArrayChange('keyResponsibilities', index, e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="e.g., Develop and maintain responsive web applications using React and TypeScript"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('keyResponsibilities', index)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    disabled={formData.keyResponsibilities.length === 1}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('keyResponsibilities')}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-2 cursor-pointer"
              >
                <i className="fas fa-plus"></i>
                <span>Add Responsibility</span>
              </button>
            </div>
          </div>



          {/* Required Qualifications Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Required Qualifications</h3>
            <div className="space-y-3">
              {formData.requiredQualifications.map((qualification, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={qualification}
                      onChange={(e) => handleArrayChange('requiredQualifications', index, e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="e.g., Strong foundation in HTML, CSS, JavaScript"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('requiredQualifications', index)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    disabled={formData.requiredQualifications.length === 1}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('requiredQualifications')}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-2 cursor-pointer"
              >
                <i className="fas fa-plus"></i>
                <span>Add Qualification</span>
              </button>
            </div>
          </div>



          {/* Technical Skills Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Required Skills */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Required Technical Skills</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="e.g., React"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('requiredSkills'))}
                  />
                  <button
                    type="button"
                    onClick={() => addSkill('requiredSkills')}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill('requiredSkills', skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <i className="fas fa-times text-xs"></i>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>



            {/* Nice-to-Have Skills */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nice-to-Have Skills</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newNiceToHaveSkill}
                    onChange={(e) => setNewNiceToHaveSkill(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="e.g., Node.js"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('niceToHaveSkills'))}
                  />
                  <button
                    type="button"
                    onClick={() => addSkill('niceToHaveSkills')}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.niceToHaveSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill('niceToHaveSkills', skill)}
                        className="ml-2 text-green-600 hover:text-green-800 cursor-pointer"
                      >
                        <i className="fas fa-times text-xs"></i>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>


          



          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>



            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer"
            >
              {type ? 'Update Position' : 'Save Position'}
            </button>



          </div>
        </form>
      </div>
    </div>
  );
};

// const Input = ({ label, value, onChange, full = false }) => (
//   <div className={full ? 'md:col-span-2' : ''}>
//     <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <input
//       type="text"
//       value={value}
//       onChange={onChange}
//       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//     />
//   </div>
// );

// const TextArea = ({ label, value, onChange, rows = 4 }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <textarea
//       value={value}
//       onChange={onChange}
//       rows={rows}
//       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//     />
//   </div>
// );

export default InternshipModal;
