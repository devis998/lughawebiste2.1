import Hero from './sections/Hero'
import Services from './sections/Services'
import About from './sections/About'
import Contact from './sections/Contact'
import Testimonials from './sections/Testimonials'
import Clients from './sections/Clients'
// import Partners from './sections/Partners'
import Languages from './sections/Languages'
import Careers from './sections/Careers'
import Blog from './sections/Blog'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-800">
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <Clients />
      {/* <Partners /> */}
      <Languages />
      <Careers />
      <Blog />
      <Contact />
    </main>
  )
}
