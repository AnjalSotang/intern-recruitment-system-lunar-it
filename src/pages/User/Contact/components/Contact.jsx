import React, {useEffect, useState } from 'react'
import { toast } from "react-toastify"
import { useContactStore } from "../../../../store/MessagesStore";

const Contact = () => {
  const { postMessages, message, loading, error, status } = useContactStore();
  const [handleContact, setHandleContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '' 
  })

  const handleChange = (e) => {
    setHandleContact({...handleContact, [e.target.name]: e.target.value})
    console.log(handleContact)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log(handleContact)
    postMessages(handleContact);
  } 

  useEffect(() => {
    if (status === 201) {
        toast.success(message || "Message sent successfully!");
        setHandleContact({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            subject: '',
            message: '' 
          })
    }
    if (error) {
        toast.error(error || "An error occurred. Please try again.");
    }
}, [message, error, status])

  return (
    <div>
      <section className="grid lg:grid-cols-2 gap-16 mb-16">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            Send us a Message
                        </h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={handleContact.firstName}
                                        onChange={handleChange}
                                        id="firstName"
                                        name="firstName"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        placeholder="Enter your first name"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={handleContact.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        placeholder="Enter your last name"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={handleContact.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    placeholder="Enter your email address"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={handleContact.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Subject *
                                </label>
                                <div className="relative">
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        value={handleContact.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none bg-white cursor-pointer"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="internship">Internship Inquiry</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                        <option value="services">Service Information</option>
                                        <option value="careers">Career Opportunities</option>
                                        <option value="general">General Inquiry</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                        <i className="fas fa-chevron-down text-gray-400 text-sm"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    value={handleContact.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-vertical"
                                    placeholder="Tell us more about your inquiry..."
                                ></textarea>
                            </div>
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium cursor-pointer whitespace-nowrap !rounded-button` + (loading ? ' opacity-50 cursor-not-allowed' : '')}
                                >
                                    <i className="fas fa-paper-plane mr-2"></i>
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">

                        {/* Contact Cards */}
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-map-marker-alt text-blue-600 text-lg"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Our Office
                                        </h3>
                                        <p className="text-gray-700">
                                            123 Innovation Drive
                                            <br />
                                            Suite 500
                                            <br />
                                            San Francisco, CA 94102
                                            <br />
                                            United States
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-phone text-green-600 text-lg"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Phone
                                        </h3>
                                        <p className="text-gray-700">
                                            Main: +1 (555) 123-4567
                                            <br />
                                            Internships: +1 (555) 123-4568
                                            <br />
                                            HR: +1 (555) 123-4569
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-500">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-envelope text-purple-600 text-lg"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Email
                                        </h3>
                                        <p className="text-gray-700">
                                            General: info@lunarit.com
                                            <br />
                                            Careers: careers@lunarit.com
                                            <br />
                                            Support: support@lunarit.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-clock text-orange-600 text-lg"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Office Hours
                                        </h3>
                                        <p className="text-gray-700">
                                            Monday - Friday: 9:00 AM - 6:00 PM
                                            <br />
                                            Saturday: 10:00 AM - 2:00 PM
                                            <br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="pt-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Follow Us
                            </h3>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                                >
                                    <i className="fab fa-linkedin-in text-lg"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                                >
                                    <i className="fab fa-twitter text-lg"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors duration-200 cursor-pointer"
                                >
                                    <i className="fab fa-github text-lg"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-200 cursor-pointer"
                                >
                                    <i className="fab fa-youtube text-lg"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

    </div>
  )
}

export default Contact
