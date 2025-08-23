'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Clients() {
  const [isVisible, setIsVisible] = useState(false)

  // Backend additions
  const [showGetStartedModal, setShowGetStartedModal] = useState(false)
  const [showCaseStudiesModal, setShowCaseStudiesModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    organizationType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  // Backend functions
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent, action: string) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, action })
      })

      const data = await response.json()

      if (data.success) {
        alert(data.message)
        setFormData({
          name: '',
          email: '',
          company: '',
          organizationType: '',
          message: ''
        })
        setShowGetStartedModal(false)
        setShowCaseStudiesModal(false)
      } else {
        alert(data.message || 'Failed to submit request. Please try again.')
      }
    } catch (error) {
      alert('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Frontend data (preserved)
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
    { title: "NGOs & Non-Profits", desc: "Humanitarian organizations reaching communities across Africa and Asia", count: "10+" },
    { title: "Healthcare Institutions", desc: "Hospitals and health systems serving diverse populations", count: "10+" },
    { title: "Educational Organizations", desc: "Schools and universities expanding their global reach", count: "40+" },
    { title: "Tech Startups", desc: "Innovative companies localizing for emerging markets", count: "20+" }
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

        {/* Client Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {clientTypes.map((type, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-2xl bg-gradient-to-br from-lugha-mist to-white border border-gray-100 hover:shadow-lg transition-all duration-300 ${
                isVisible ? `animate-fade-in-up delay-${index * 100}` : 'opacity-0'
              }`}
            >
              <div className="text-3xl font-bold text-lugha-teal mb-2">{type.count}</div>
              <h3 className="text-lg font-semibold text-lugha-primary mb-3">{type.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{type.desc}</p>
            </div>
          ))}
        </div>

        {/* Scrolling Logos */}
        <div className="relative overflow-hidden bg-gradient-to-r from-lugha-mist via-white to-lugha-mist rounded-2xl py-12">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none"></div>
          <div className="flex animate-scroll-right mb-8">
            {[...clients, ...clients].map((client, index) => (
              <div key={`row1-${index}`} className="flex-shrink-0 mx-12 flex items-center justify-center">
                <img src={client.logo} alt={client.name} className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0" />
              </div>
            ))}
          </div>
          <div className="flex animate-scroll-left">
            {[...clients.slice().reverse(), ...clients.slice().reverse()].map((client, index) => (
              <div key={`row2-${index}`} className="flex-shrink-0 mx-12 flex items-center justify-center">
                <img src={client.logo} alt={client.name} className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-lugha-primary rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Growing Network</h3>
            <p className="text-lugha-mist mb-8 text-lg max-w-2xl mx-auto">
              Ready to expand your reach across cultures? Let’s discuss how Lugha can support your organization’s global communication needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowGetStartedModal(true)}
                className="bg-white text-lugha-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg"
              >
                Get Started
              </button>
              <button
                onClick={() => setShowCaseStudiesModal(true)}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-lugha-primary transition-colors duration-300"
              >
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Get Started Modal */}
      {showGetStartedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-lugha-primary">Join Our Network</h3>
                <button onClick={() => setShowGetStartedModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={(e) => handleSubmit(e, 'get_started')} className="space-y-4">
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Your name" className="w-full p-3 border border-gray-200 rounded-lg" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Your email" className="w-full p-3 border border-gray-200 rounded-lg" />
                <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Organization" className="w-full p-3 border border-gray-200 rounded-lg" />
                <select name="organizationType" value={formData.organizationType} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-lg">
                  <option value="">Select type</option>
                  <option value="NGO/Non-Profit">NGO/Non-Profit</option>
                  <option value="Healthcare Institution">Healthcare Institution</option>
                  <option value="Educational Organization">Educational Organization</option>
                  <option value="Tech Startup">Tech Startup</option>
                  <option value="Government Agency">Government Agency</option>
                  <option value="Other">Other</option>
                </select>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} placeholder="Tell us about your needs" className="w-full p-3 border border-gray-200 rounded-lg" />

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowGetStartedModal(false)} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-3 bg-lugha-primary text-white rounded-lg">
                    {isSubmitting ? 'Submitting...' : 'Join Network'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Case Studies Modal */}
      {showCaseStudiesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-lugha-primary">Case Studies</h3>
                <button onClick={() => setShowCaseStudiesModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

               <div className="space-y-6">
                  {/* Case Study 1 */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-lugha-primary mb-3">UNICEF Tanzania Health Campaign</h4>
                    <p className="text-gray-600 mb-4">
                      Translated and provided voiceover for a major health awareness campaign reaching 2M+ people across rural Tanzania. 
                      Services included Swahili translation, cultural adaptation, and professional voiceover recording.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-lugha-teal/10 text-lugha-teal px-3 py-1 rounded-full text-sm">Swahili Translation</span>
                      <span className="bg-lugha-teal/10 text-lugha-teal px-3 py-1 rounded-full text-sm">Voiceover</span>
                      <span className="bg-lugha-teal/10 text-lugha-teal px-3 py-1 rounded-full text-sm">Cultural Adaptation</span>
                    </div>
                  </div>

                  {/* Case Study 2 */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-lugha-primary mb-3">WHO COVID-19 Information Campaign</h4>
                    <p className="text-gray-600 mb-4">
                      Provided interpretation services for WHO's COVID-19 information sessions across 5 African countries. 
                      Real-time interpretation in Swahili, Amharic, and French for healthcare workers and community leaders.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-lugha-teal/10 text-lugha-teal px-3 py-1 rounded-full text-sm">Live Interpretation</span>
                      <span className="bg-lugha-teal/10 text-lugha-teal px-3 py-1 rounded-full text-sm">Multiple Languages</span>
                      <span className="bg-lugha-teal/10 text-lugha-teal px-3 py-1 rounded-full text-sm">Healthcare</span>
                    </div>
                  </div>

                  {/* Case Study 3 */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-lugha-primary mb-3">EdTech Startup Localization</h4>
                    <p className="text-gray-600 mb-4">
                      Helped a Silicon Valley EdTech startup localize their learning platform for Indian markets. 
                      Complete app translation in Hindi and Gujarati, including cultural adaptation of educational content.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-lugha-teal/10 text-lugha-teal px-3 py-1 rounded-full text-sm">App Localization</span>
                      <span className="bg-lugha-teal/10 text-lugha-teal px-3 py-1 rounded-full text-sm">Hindi & Gujarati</span>
                      <span className="bg-lugha-teal/10 text-lugha-teal px-3 py-1 rounded-full text-sm">Education</span>
                    </div>
                  </div>
                </div>

              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">Interested in working with us?</p>
                <button onClick={() => { setShowCaseStudiesModal(false); setShowGetStartedModal(true) }} className="bg-lugha-primary text-white px-6 py-3 rounded-lg">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
