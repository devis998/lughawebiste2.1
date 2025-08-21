'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Clients() {
  const [isVisible, setIsVisible] = useState(false)
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
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('clients')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent, action: string) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          action
        })
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

  const clients = [
    {
      name: "UNICEF",
      logo: "/logos/unicef.png",
      description: "Global health campaigns and educational content translation"
    },
    {
      name: "WHO",
      logo: "/logos/who.png", 
      description: "Medical interpretation and health information localization"
    },
    {
      name: "Doctors Without Borders",
      logo: "/logos/msf.png",
      description: "Emergency medical interpretation in crisis zones"
    },
    {
      name: "Save the Children",
      logo: "/logos/save-children.png",
      description: "Child protection materials and community outreach"
    },
    {
      name: "Oxfam",
      logo: "/logos/oxfam.png",
      description: "Development program documentation and training materials"
    },
    {
      name: "Red Cross",
      logo: "/logos/red-cross.png",
      description: "Disaster response communication and volunteer training"
    }
  ]

  return (
    <section id="clients" className="py-20 bg-gradient-to-br from-lugha-primary via-lugha-primary to-lugha-teal">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Leading Organizations
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            We've helped NGOs, healthcare institutions, and tech startups break language barriers 
            and reach communities worldwide with culturally-adapted content.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            {clients.map((client, index) => (
              <div 
                key={client.name}
                className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="h-16 flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{client.name}</h3>
                <p className="text-white/80 text-xs leading-relaxed">{client.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Join Our Network?
            </h3>
            <p className="text-white/90 mb-6">
              Whether you're an NGO looking to reach new communities, a healthcare organization needing medical interpretation, 
              or a tech startup expanding globally, we're here to help you communicate effectively across cultures.
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

        {/* Get Started Modal */}
        {showGetStartedModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-lugha-primary">Join Our Network</h3>
                  <button 
                    onClick={() => setShowGetStartedModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={(e) => handleSubmit(e, 'get_started')} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization Type</label>
                    <select
                      name="organizationType"
                      value={formData.organizationType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                    >
                      <option value="">Select type</option>
                      <option value="NGO/Non-Profit">NGO/Non-Profit</option>
                      <option value="Healthcare Institution">Healthcare Institution</option>
                      <option value="Educational Organization">Educational Organization</option>
                      <option value="Tech Startup">Tech Startup</option>
                      <option value="Government Agency">Government Agency</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your needs</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                      placeholder="What languages do you need? What type of projects?"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowGetStartedModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-3 bg-lugha-primary text-white rounded-lg font-medium hover:bg-lugha-primary/90 disabled:bg-gray-400 transition-colors"
                    >
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
                  <button 
                    onClick={() => setShowCaseStudiesModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
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
                  <button
                    onClick={() => {
                      setShowCaseStudiesModal(false)
                      setShowGetStartedModal(true)
                    }}
                    className="bg-lugha-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-lugha-primary/90 transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}