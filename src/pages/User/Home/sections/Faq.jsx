import React, { useState } from 'react'

const Faq = () => {
  const [openItems, setOpenItems] = useState({});

  const faqData = [
    {
      id: 1,
      question: "Are internships paid or unpaid?",
      answer: "All internships at Lunar IT are paid positions. We believe in fairly compensating our interns for their contributions. The exact compensation depends on the specific role, your experience level, and the duration of the internship."
    },
    {
      id: 2,
      question: "What is the typical duration of an internship?",
      answer: "Our internships typically range from 3 to 6 months, depending on the position and project requirements. We also offer flexibility to accommodate academic schedules for students who are currently enrolled in degree programs."
    },
    {
      id: 3,
      question: "Do you offer remote internships?",
      answer: "Yes, we offer remote, hybrid, and on-site internships depending on the role. Each job posting will specify the work arrangement. Our remote interns receive the same level of mentorship and are fully integrated into their teams through our digital collaboration tools."
    },
    {
      id: 4,
      question: "What qualifications do you look for in interns?",
      answer: "While specific technical skills vary by position, we generally look for candidates who demonstrate a passion for technology, strong problem-solving abilities, excellent communication skills, and a willingness to learn. Most technical positions require some relevant coursework or project experience."
    },
    {
      id: 5,
      question: "Can internships lead to full-time employment?",
      answer: "Absolutely! Many of our current full-time employees started as interns. We view our internship program as a pipeline for identifying and developing talent. Interns who perform well and align with our company culture are often considered for permanent positions upon completion of their internship."
    }
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our internship program.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqData.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={openItems[item.id] || false}
                >
                  <span className="text-lg font-medium text-gray-900">
                    {item.question}
                  </span>
                  <div className="w-6 h-6 flex items-center justify-center text-black transform transition-transform duration-500">
                    <i className={`fas ${openItems[item.id] ? 'fa-chevron-up' : 'fa-chevron-down'} text-lg`}></i>
                  </div>
                </button>
                <div className={`px-6 pb-4 transition-all duration-300 ease-in-out ${openItems[item.id] ? 'block' : 'hidden'}`}>
                  <p className="text-gray-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-gray-600">
              Still have questions? Feel free to{' '}
              <a href="#" className="text-blue-600 hover:underline">contact us</a>
              {' '}for more information.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq