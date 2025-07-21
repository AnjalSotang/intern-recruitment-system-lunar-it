import React, { useState } from 'react'

const Testimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    
    const testimonials = [
        {
            name: "Emily Richardson",
            role: "Former Frontend Intern, now Junior Developer",
            image: "https://readdy.ai/api/search-image?query=professional%20young%20asian%20woman%20software%20developer%20smiling%20confidently%20in%20modern%20tech%20office%20environment%20with%20clean%20white%20background%20and%20soft%20lighting&width=80&height=80&seq=testimonial1&orientation=squarish",
            quote: "My internship at Lunar IT was transformative. I gained hands-on experience with cutting-edge technologies and received mentorship that shaped my career path. The team treated me like a full-time employee, giving me real responsibilities.",
            rating: 5,
            avatarColor: "bg-indigo-600"
        },
        {
            name: "Michael Chen",
            role: "Backend Engineering Intern",
            image: "https://readdy.ai/api/search-image?query=professional%20young%20african%20american%20male%20programmer%20working%20on%20laptop%20in%20modern%20tech%20workspace%20with%20clean%20white%20background%20and%20professional%20lighting&width=80&height=80&seq=testimonial2&orientation=squarish",
            quote: "The backend engineering internship exceeded my expectations. I worked on production-level code from day one and had the opportunity to contribute to a major project. The senior engineers were always available to answer questions.",
            rating: 4.5,
            avatarColor: "bg-teal-600"
        },
        {
            name: "Sophia Williams",
            role: "Data Science Intern to Junior Analyst",
            image: "https://readdy.ai/api/search-image?query=professional%20young%20hispanic%20woman%20designer%20working%20on%20creative%20projects%20in%20modern%20design%20studio%20with%20clean%20white%20background%20and%20natural%20lighting&width=80&height=80&seq=testimonial3&orientation=squarish",
            quote: "As a data science intern, I was able to work with real client data and build models that actually went into production. The collaborative environment and learning opportunities were incredible, and I'm now continuing as a full-time employee.",
            rating: 5,
            avatarColor: "bg-indigo-600"
        },
    ];

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <div key={i} className="w-4 h-4 flex items-center justify-center">
                    <i className="fas fa-star"></i>
                </div>
            );
        }

        // Half star
        if (hasHalfStar) {
            stars.push(
                <div key="half" className="w-4 h-4 flex items-center justify-center">
                    <i className="fas fa-star-half-alt"></i>
                </div>
            );
        }

        // Empty stars
        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(
                <div key={`empty-${i}`} className="w-4 h-4 flex items-center justify-center">
                    <i className="far fa-star"></i>
                </div>
            );
        }

        return stars;
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">What Our Interns Say</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Hear from past participants about their experience in our internship program.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
                        >
                            {/* Avatar */}
                            <div className={`absolute -top-5 left-8 w-10 h-10 ${testimonial.avatarColor} rounded-full overflow-hidden border-4 border-white`}>
                                <div className="w-full h-full flex items-center justify-center text-white">
                                    <i className="fas fa-user"></i>
                                </div>
                            </div>
                            
                            {/* Quote icon */}
                            <div className="text-gray-400 mb-4">
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <i className="fas fa-quote-left text-xl"></i>
                                </div>
                            </div>
                            
                            {/* Quote */}
                            <p className="text-gray-600 mb-6 italic">
                                "{testimonial.quote}"
                            </p>
                            
                            {/* Author and Rating */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                                <div className="flex text-yellow-400">
                                    {renderStars(testimonial.rating)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;