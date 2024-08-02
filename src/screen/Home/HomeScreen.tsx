import Feature from '@/components/Feature/Feature'
import Hero from '@/components/Hero/Hero'
import Pricing from '@/components/Pricing/Pricing'
import React from 'react'

type HomeScreenProps = {
  users: any
}


const HomeScreen: React.FC<HomeScreenProps> = ({ users }) => {
  return (
    <div
      className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto"
      id="about"
    >
      <Hero />
      <Feature />
      <Pricing />
    </div>
  )
}

export default HomeScreen