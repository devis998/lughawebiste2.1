'use client'

import { useState, useEffect } from 'react'

export default function Clients() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('clients')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const clients = [
    { name: "UNICEF", logo: "/lugha-logo.png" },
    { name: "WHO", logo: "/lugha-logo.png" },
    { name: "Red Cross", logo: "/lugha-logo.png" },
    { name: "Doctors Without Borders", logo: "/lugha-logo.png" },
    { name: "Save the Children", logo: "/lugha-logo.png" },
    { name: "Oxfam", logo: "/lugha-logo.png" },
    { name: "World Vision", logo: "/lugha-logo.png" },
    { name: "Care International", logo: "/lugha-logo.png" },
    { name: "Plan International", logo: "/lugha-logo.png" },
    { name: "ActionAid", logo: "/lugha-logo.png" },
    { name: "Mercy Corps", logo: "/lugha-logo.png" },
    { name: "International Rescue Committee", logo: "/lugha-logo.png" }
  ]

  const clientTypes = [
    {
      title: "NGOs & Non-Profits",
      desc: "Humanitarian organizations reaching communities across Africa and Asia",
      count: "150+"
    },
    {
      title: "Healthcare Institutions",
      desc: "Hospitals and health systems serving diverse populations",
      count: "80+"
    },
    {
      title: "Educational Organizations",
      desc: "Schools and universities expanding their global reach",
      count: "120+"
    },
    {
      title: "Tech Startups",
      desc: "Innovative companies localizing for emerging markets",
      count: "200+"
    }
  ]

  return (
    <section className="py-16 bg-white" id="clients">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-lugha-primary mb-6">
            Trusted by Leading Organizations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From humanitarian giants to innovative startups, organizations worldwide trust Lugha to bridge language barriers and connect cultures.
          </p>
        </div>

        {/* Client Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {clientTypes.map((type, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-2xl bg-gradient-to-br from-lugha-mist to-white border border-gray-100 hover:shadow-lg transition-all duration-300 ${
                isVisible ? `animate-fade-in-up delay-${index * 100}` : 'opacity-0'
              }`}
            >
              <div className="text-3xl font-bold text-lugha-teal mb-2">
                {type.count}
              </div>
              <h3 className="text-lg font-semibold text-lugha-primary mb-3">
                {type.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {type.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Animated Logo Scroll */}
        <div className="relative overflow-hidden bg-gradient-to-r from-lugha-mist via-white to-lugha-mist rounded-2xl py-12">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none"></div>
          
          <div className="flex animate-scroll-right mb-8">
            {[...clients, ...clients].map((client, index) => (
              <div key={`row1-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>

          <div className="flex animate-scroll-left">
            {[...clients.slice().reverse(), ...clients.slice().reverse()].map((client, index) => (
              <div key={`row2-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-lugha-primary rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Growing Network
            </h3>
            <p className="text-lugha-mist mb-8 text-lg max-w-2xl mx-auto">
              Ready to expand your reach across cultures? Let's discuss how Lugha can support your organization's global communication needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-lugha-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-lugha-primary transition-colors duration-300">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
