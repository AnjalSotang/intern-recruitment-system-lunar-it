import { Code, UserCheck, Rocket } from "lucide-react"

const features = [
  {
    icon: Code,
    title: "Real-World Projects",
    description: "Work on actual client projects and develop solutions that solve real business challenges.",
  },
  {
    icon: UserCheck,
    title: "Expert Mentorship",
    description: "Learn directly from industry professionals who will guide your growth and development.",
  },
  {
    icon: Rocket,
    title: "Career Advancement",
    description: "Many of our interns go on to secure full-time positions within our company or partner organizations.",
  },
]

const ChooseUs =() => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 font-poppins">Why Choose Lunar IT</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to nurturing the next generation of tech talent through hands-on experience and mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-poppins">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ChooseUs