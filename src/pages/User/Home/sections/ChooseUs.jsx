import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faUsers, faChartLine, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

const ChooseUs = () => {
    const benefits = [
        {
            icon: faRocket,
            title: "Real-World Projects",
            description:
                "Work on actual client projects that impact thousands of users",
        },
        {
            icon: faUsers,
            title: "Expert Mentorship",
            description:
                "Learn from experienced developers and industry professionals",
        },
        {
            icon: faChartLine,
            title: "Career Growth",
            description:
                "Clear path to full-time opportunities and career advancement",
        },
        {
            icon: faLaptopCode,
            title: "Latest Technologies",
            description: "Work with cutting-edge tools and modern tech stack",
        },
    ];
    return (

        <div>
            <section className="py-16 bg-white">
                <div className=" max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Why Choose 
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We provide more than just work experience - we offer a
                            comprehensive learning journey that prepares you for a
                            successful tech career
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center group border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <FontAwesomeIcon icon={benefit.icon} className="text-white text-lg" />
                                    <i className={`${benefit.icon} text-2xl text-white`}></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ChooseUs
