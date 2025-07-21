import React from 'react'
import HeroSection from './sections/HeroSection'
import Layout from '../../../layout/MainLayout'
import ChooseUs from './sections/ChooseUs'
import FeaturedRoles from './sections/FeaturedRoles'
import ApplicationProcess from './sections/ApplicationProcess'
import Faq from './sections/Faq'
import CTAs from './sections/CTAs'
import Testimonials from './sections/Testimonials'


const HomePage = () => {
  return (
     <Layout>
            <div className="min-h-screen">
              <HeroSection />
               <ChooseUs />
              <FeaturedRoles />
              <ApplicationProcess/>
              <Testimonials/>
              <Faq/>
              <CTAs/>
            </div>
      </Layout>
  )
}

export default HomePage

