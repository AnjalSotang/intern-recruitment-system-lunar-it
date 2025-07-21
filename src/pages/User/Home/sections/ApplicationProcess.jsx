import React from 'react'

const ApplicationProcess = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">How to Apply</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our application process is straightforward and designed to help us
            find the best match for each position.
          </p>
        </div>
        <div className="relative">
          {/* <!-- Process Timeline --> */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"
          ></div>
          <div className="space-y-12 md:space-y-0">
            {/* <!-- Step 1 --> */}
            <div
              className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center"
            >
              <div className="md:text-right md:pr-12">
                <div
                  className="hidden md:block absolute right-0 top-1/2 w-12 h-0.5 bg-gray-200 transform translate-x-6 -translate-y-1/2"
                ></div>
                <div
                  className="hidden md:flex md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 md:translate-x-1/2 md:w-10 md:h-10 md:bg-primary md:rounded-full md:items-center md:justify-center md:text-white md:font-bold md:z-10"
                >
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Browse Opportunities
                </h3>
                <p className="text-gray-600">
                  Explore our available positions and find the one that matches
                  your skills and career goals.
                </p>
              </div>
              <div className="mt-6 md:mt-0 md:pl-12">
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                  <div
                    className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 md:hidden"
                  >
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <img
                    src="https://readdy.ai/api/search-image?query=person%20browsing%20job%20listings%20on%20a%20laptop%2C%20modern%20office%20setting%2C%20purple%20accent%20lighting%2C%20professional%20environment%2C%20clean%20workspace%2C%20high-quality%20corporate%20setting&width=600&height=400&seq=lunar02&orientation=landscape"
                    alt="Browse opportunities"
                    className="w-full h-48 object-cover object-top"
                  />
                </div>
              </div>
            </div>
            {/* <!-- Step 2 --> */}
            <div
              className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center mt-12 md:mt-24"
            >
              <div className="md:order-2 md:text-left md:pl-12">
                <div
                  className="hidden md:block absolute left-0 top-1/2 w-12 h-0.5 bg-gray-200 transform -translate-x-6 -translate-y-1/2"
                ></div>
                <div
                  className="hidden md:flex md:absolute md:left-0 md:top-1/2 md:transform md:-translate-y-1/2 md:-translate-x-1/2 md:w-10 md:h-10 md:bg-primary md:rounded-full md:items-center md:justify-center md:text-white md:font-bold md:z-10"
                >
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Submit Your Application
                </h3>
                <p className="text-gray-600">
                  Complete our online application form and upload your resume
                  and cover letter.
                </p>
              </div>
              <div className="mt-6 md:mt-0 md:order-1 md:pr-12">
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                  <div
                    className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 md:hidden"
                  >
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <img
                    src="https://readdy.ai/api/search-image?query=person%20filling%20out%20online%20application%20form%20on%20computer%2C%20focused%20expression%2C%20modern%20home%20office%2C%20clean%20desk%20setup%2C%20natural%20lighting%2C%20professional%20environment&width=600&height=400&seq=lunar03&orientation=landscape"
                    alt="Submit application"
                    className="w-full h-48 object-cover object-top"
                  />
                </div>
              </div>
            </div>
            {/* <!-- Step 3 --> */}
            <div
              className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center mt-12 md:mt-24"
            >
              <div className="md:text-right md:pr-12">
                <div
                  className="hidden md:block absolute right-0 top-1/2 w-12 h-0.5 bg-gray-200 transform translate-x-6 -translate-y-1/2"
                ></div>
                <div
                  className="hidden md:flex md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 md:translate-x-1/2 md:w-10 md:h-10 md:bg-primary md:rounded-full md:items-center md:justify-center md:text-white md:font-bold md:z-10"
                >
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Interview Process
                </h3>
                <p className="text-gray-600">
                  Selected candidates will be invited for a technical assessment
                  followed by interviews with the team.
                </p>
              </div>
              <div className="mt-6 md:mt-0 md:pl-12">
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                  <div
                    className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 md:hidden"
                  >
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20job%20interview%20in%20modern%20office%2C%20two%20people%20talking%20across%20desk%2C%20purple%20and%20teal%20office%20decor%2C%20bright%20clean%20space%2C%20professional%20attire%2C%20friendly%20atmosphere&width=600&height=400&seq=lunar04&orientation=landscape"
                    alt="Interview process"
                    className="w-full h-48 object-cover object-top"
                  />
                </div>
              </div>
            </div>
            {/* <!-- Step 4 --> */}
            <div
              className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center mt-12 md:mt-24"
            >
              <div className="md:order-2 md:text-left md:pl-12">
                <div
                  className="hidden md:block absolute left-0 top-1/2 w-12 h-0.5 bg-gray-200 transform -translate-x-6 -translate-y-1/2"
                ></div>
                <div
                  className="hidden md:flex md:absolute md:left-0 md:top-1/2 md:transform md:-translate-y-1/2 md:-translate-x-1/2 md:w-10 md:h-10 md:bg-primary md:rounded-full md:items-center md:justify-center md:text-white md:font-bold md:z-10"
                >
                  4
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Onboarding
                </h3>
                <p className="text-gray-600">
                  Successful candidates will receive an offer and begin our
                  comprehensive onboarding program.
                </p>
              </div>
              <div className="mt-6 md:mt-0 md:order-1 md:pr-12">
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                  <div
                    className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4 md:hidden"
                  >
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <img
                    src="https://readdy.ai/api/search-image?query=new%20employee%20onboarding%20session%2C%20team%20meeting%20in%20modern%20office%2C%20people%20at%20conference%20table%20with%20laptops%2C%20bright%20spacious%20room%2C%20professional%20corporate%20environment%2C%20purple%20accent%20lighting&width=600&height=400&seq=lunar05&orientation=landscape"
                    alt="Onboarding"
                    className="w-full h-48 object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApplicationProcess
