import CompanyTimeline from './TimeLine'
import ContactCTA from './ContactCTA'
import OurMission from './OurMission'
import AboutHero from './HeroAbout'
import OurValues from './OurValues'
import { Suspense } from 'react'
import OurTeam from './OurTeam'

const AboutUsSection = () => {
  return (
    <>
      <AboutHero />
      <Suspense fallback={<div>Loading...</div>}>
        <OurMission />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <OurValues />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <OurTeam />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CompanyTimeline />
      </Suspense>
      <ContactCTA />
    </>
  )
}

export default AboutUsSection;