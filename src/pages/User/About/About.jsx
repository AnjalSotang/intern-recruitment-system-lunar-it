import { Card, CardContent } from "@/components/ui/card"
import { Heart, Lightbulb, Rocket } from "lucide-react"
import CTAs from "../Home/sections/CTAs"
import Layout from "../../../layout/MainLayout"
import diverseTechCollaboration from '../../../assets/diverse-tech-collaboration.png';
import professionalWomanBusiness from '../../../assets/professional-woman-business.png';
import asianManCasualBusiness from '../../../assets/asian-man-casual-business.png';
import professionalLatinaWomanSmiling from '../../../assets/professional-latina-woman-smiling.png';
import company from '../../../assets/company-growth-timeline.png';



export const metadata = {
  title: "About Us - Lunar IT Internship Program",
  description:
    "Learn about Lunar IT's mission to nurture the next generation of tech talent through innovative internship programs.",
}

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Passion for Excellence",
      description:
        "We believe in doing everything with passion and striving for excellence in every project we undertake.",
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We encourage creative thinking and innovative solutions to solve complex technological challenges.",
    },
    {
      icon: Rocket,
      title: "Growth Mindset",
      description: "We foster continuous learning and personal growth, helping our interns reach their full potential.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "Head of Internship Program",
      img: professionalWomanBusiness,
      bio: "With 15+ years in tech leadership, Sarah has mentored over 200 interns who now work at top tech companies.",
    },
    {
      name: "Michael Chen",
      role: "Senior Technical Mentor",
      img: asianManCasualBusiness,
      bio: "Former Google engineer with expertise in full-stack development and machine learning, passionate about teaching.",
    },
    {
      name: "Emily Rodriguez",
      role: "Career Development Specialist",
      img: professionalLatinaWomanSmiling,
      bio: "HR expert specializing in tech talent development and career coaching for emerging professionals.",
    },
  ]

  const stats = [
    { number: "500+", label: "Interns Mentored" },
    { number: "95%", label: "Job Placement Rate" },
    { number: "50+", label: "Partner Companies" },
    { number: "8", label: "Years of Excellence" },
  ]

  return (
    <>
      <Layout>
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-indigo-50 to-purple-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="py-32 md:py-28 lg:py-32 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  About <span className="text-primary font-pacifico">LunarIT</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                  We're on a mission to bridge the gap between academic learning and industry experience, creating the
                  next generation of tech innovators.
                </p>
              </div>
            </div>
          </section>
          {/* Mission Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    At Lunar IT, we believe that the future of technology lies in the hands of passionate, well-trained
                    professionals. Our internship program is designed to provide real-world experience that goes beyond
                    traditional classroom learning.
                  </p>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    We partner with leading companies to offer internships that matter – positions where interns work on
                    actual projects, contribute to meaningful solutions, and gain the skills needed to excel in their
                    careers.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  {/* <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-1"> */}

                  <div className="bg-white rounded-3xl p-2">
                    <img
                      src={diverseTechCollaboration}
                      alt="Our mission in action"
                      width="500"
                      height="400"
                      className="rounded-2xl w-full h-auto"
                    />

                  </div>
                </div>


              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  These principles guide everything we do and shape the experience we provide to our interns.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <Card
                    key={index}
                    className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                  >
                    <CardContent className="p-0">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our experienced team of mentors and industry professionals are dedicated to your success.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {team.map((member, index) => (
                  <Card
                    key={index}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={member.img || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* History Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <img
                    src={company}
                    alt="Our journey"
                    width={500}
                    height={400}
                    className="rounded-2xl w-full h-auto shadow-lg"
                  />

                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-4 h-4 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">2017 - Founded</h3>
                        <p className="text-gray-600">
                          Started with a vision to transform tech education through practical experience.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-4 h-4 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">2019 - First 100 Interns</h3>
                        <p className="text-gray-600">
                          Reached our first major milestone with 100 successful intern placements.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-4 h-4 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">2022 - Global Expansion</h3>
                        <p className="text-gray-600">
                          Expanded our program internationally with remote internship opportunities.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-4 h-4 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">2025 - 500+ Success Stories</h3>
                        <p className="text-gray-600">
                          Celebrating over 500 interns who have launched successful tech careers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <CTAs />
        </main>
      </Layout>


    </>
  )
}
