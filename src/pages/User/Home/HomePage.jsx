import React from 'react'
import HeroSection from './sections/HeroSection'
import Layout from '../../../layout/MainLayout'
import ChooseUs from './sections/ChooseUs'
import FeaturedRoles from './sections/FeaturedRoles'
import ApplicationProcess from './sections/ApplicationProcess'
import Faq from './sections/Faq'
import CTAs from './sections/CTAs'
import Testimonials from './sections/Testimonials'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Target, Award, MapPin, Clock, DollarSign } from "lucide-react"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { Card, CardContent } from "@/components/ui/card"
import { Suspense } from 'react'
import ApplicationFormSection from './sections/ApplicationFormSection'


const HomePage = () => {
  const stats = [
    { icon: Users, label: "Interns Placed", value: "500+" },
    { icon: Target, label: "Success Rate", value: "95%" },
    { icon: Award, label: "Partner Companies", value: "50+" },
  ]

  const benefits = [
    {
      icon: MapPin,
      title: "Flexible Location",
      description: "Work remotely or from our modern offices",
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Part-time and full-time opportunities available",
    },
    {
      icon: DollarSign,
      title: "Competitive Stipend",
      description: "Paid internships with performance bonuses",
    },
  ]


  return (
    <Layout>
      <div className="min-h-screen">
        <HeroSection />
        <ChooseUs />
        <Suspense fallback={<LoadingSpinner />}>
          <section className="py-24 px-4">
            <div className="container mx-auto text-center">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                  Launch Your Tech Career with Lunar IT
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                  Join our innovative internship program and work on cutting-edge projects with industry experts.
                  Transform your passion for technology into real-world experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/internships">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      Explore Opportunities
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-4 text-lg rounded-2xl hover:scale-105 transition-all duration-300 border-2 border-gray-300 hover:border-blue-500 bg-transparent"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </Suspense>
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center p-8 hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50"
                >
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  At Lunar IT, we believe in nurturing the next generation of tech innovators. Our internship program is
                  designed to bridge the gap between academic learning and industry experience, providing hands-on
                  training in the latest technologies.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We're committed to creating an inclusive environment where interns can learn, grow, and contribute to
                  meaningful projects that impact millions of users worldwide.
                </p>
                <Link href="/internships">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-1">
                  <div className="bg-white rounded-3xl p-8">
                    <img
                      src="/placeholder.svg"
                      alt="Team collaboration"
                      width={500}
                      height={400}
                      className="rounded-2xl w-full h-auto"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose Lunar IT?</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                We offer more than just an internship - we provide a launchpad for your career
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                    <p className="text-blue-100">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* <FeaturedRoles /> */}
         <Suspense fallback={<LoadingSpinner />}>
          <ApplicationProcess />
        </Suspense>

        <Testimonials />
        {/* <Suspense fallback={<LoadingSpinner />}>
          <ApplicationFormSection />
        </Suspense> */}
        <Faq />
        <CTAs />
        
      </div>
    </Layout>
  )
}

export default HomePage

