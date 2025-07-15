import { useState, useEffect } from 'react'
import { HandshakeIcon, GlobeAltIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

export default function Partners() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('partners')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const partnershipTypes = [
    {
      icon: <GlobeAltIcon className="h-8 w-8" />,
      title: "Translation Agencies",
      desc: "Collaborative partnerships with agencies worldwide for seamless project delivery",
      benefits: ["Extended capacity", "Quality assurance", "Global reach"]
    },
    {
      icon: <RocketLaunchIcon className="h-8 w-8" />,
      title: "Technology Partners",
      desc: "Integration with leading CAT tools and translation management systems",
      benefits: ["Streamlined workflow", "Better efficiency", "Cost optimization"]
    },
    {
      icon: <HandshakeIcon className="h-8 w-8" />,
      title: "Strategic Alliances",
      desc: "Long-term partnerships with organizations serving similar markets",
      benefits: ["Mutual referrals", "Shared expertise", "Market expansion"]
    }
  ]

  const partnerLogos = [
    { name: "Partner 1", logo: "/lugha-logo.png" },
    { name: "Partner 2", logo: "/lugha-logo.png" },
    { name: "Partner 3", logo: "/lugha-logo.png" },
    { name: "Partner 4", logo: "/lugha-logo.png" },
    { name: "Partner 5", logo: "/lugha-logo.png" },
    { name: "Partner 6", logo: "/lugha-logo.png" }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-lugha-mist to-white" id="partners">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-lugha-teal/10 rounded-2xl mb-6">
            <HandshakeIcon className="h-8 w-8 text-lugha-teal" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-lugha-primary mb-6">
            Our Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Language is the hidden thread behind every global collaboration. From bold startups to humanitarian giants, organizations partner with Lugha to make their message heard — clearly, accurately, and in the right language.
          </p>
          <p className="text-lg text-lugha-teal font-medium italic">
            Join the growing network of purpose-driven teams shaping the world — and trust us to help you speak to it.
          </p>
        </div>

        {/* Partnership Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {partnershipTypes.map((type, index) => (
            <div
              key={index}
              className={bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? animate-fade-in-up delay-${index * 100} : 'opacity-0'
              }}
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-lugha-teal/10 rounded-2xl mb-6">
                <div className="text-lugha-teal">
                  {type.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-lugha-primary mb-4">
                {type.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {type.desc}
              </p>

              {/* Benefits */}
              <div className="space-y-2">
                {type.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-lugha-teal rounded-full mr-3"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 mb-16">
          <h3 className="text-2xl font-bold text-lugha-primary text-center mb-8">
            Trusted Partnership Network
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partnerLogos.map((partner, index) => (
              <div
                key={index}
                className={flex justify-center items-center p-4 rounded-xl hover:bg-lugha-mist/50 transition-colors duration-300 ${
                  isVisible ? animate-fade-in delay-${index * 100} : 'opacity-0'
                }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-lugha-primary to-lugha-teal rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Become a Partner
            </h3>
            <p className="text-lugha-mist mb-8 text-lg max-w-2xl mx-auto">
              Ready to expand your capabilities and reach new markets? Let's explore how we can create value together through strategic partnership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-lugha-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg">
                Partnership Inquiry
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-lugha-primary transition-colors duration-300">
                Download Partnership Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}   and here is the page code import Hero from './sections/Hero'
import Services from './sections/Services'
import About from './sections/About'
import Contact from './sections/Contact'
import Testimonials from './sections/Testimonials'
import Clients from './sections/Clients'
import Partners from './sections/Partners'
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
      <Partners />
      <Languages />
      <Careers />
      <Blog />
      <Contact />
    </main>
  )
}