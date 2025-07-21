import React from 'react'

const TermsAndSection = ({formData, handleInputChange, errors, isSubmitting}) => {
  return (
     <div className="bg-white rounded-xl p-8 shadow-lg">
                        <div className="space-y-6">
                            <div>
                                <label className="flex items-start cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="termsAccepted"
                                        checked={formData.termsAccepted}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1 cursor-pointer"
                                    />
                                    <span className="ml-3 text-sm text-gray-700">
                                        I agree to the <a href="#" className="text-blue-600 hover:underline cursor-pointer">Terms and Conditions</a> and
                                        <a href="#" className="text-blue-600 hover:underline cursor-pointer ml-1">Privacy Policy</a>.
                                        I understand that my application will be reviewed and I may be contacted for further steps in the selection process.
                                    </span>
                                </label>
                                {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="!rounded-button whitespace-nowrap cursor-pointer w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Submitting Application...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <i className="fas fa-paper-plane mr-2"></i>
                                        Submit Application
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
  )
}

export default TermsAndSection
