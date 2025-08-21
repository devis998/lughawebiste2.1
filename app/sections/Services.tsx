'use client'

import { useState, useEffect } from 'react'
import {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  SpeakerWaveIcon,
  LanguageIcon,
  PencilIcon,
  GlobeAsiaAustraliaIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    projectDetails: '',
    budget: ''
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

    const element = document.getElementById('services')
    if (element) {
      observer.observe(element)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        alert('Quote request submitted successfully! We will contact you soon.')
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          projectDetails: '',
          budget: ''
        })
        setShowQuoteModal(false)
      } else {
        alert(data.message || 'Failed to submit quote request. Please try again.')
      }
    } catch (error) {
      alert('Failed to submit quote request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    {
      icon: DocumentTextIcon,
      title: "Document Translation",
      description: "Professional translation of legal, medical, technical, and business documents with certified accuracy.",
      features: ["Certified translations", "Technical documents", "Legal papers", "Medical records"]
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Interpretation",
      description: "Real-time interpretation services for meetings, conferences, and events in multiple languages.",
      features: ["Simultaneous interpretation", "Consecutive interpretation", "Remote interpretation", "Conference support"]
    },
    {
      icon: SpeakerWaveIcon,
      title: "Voiceover",
      description: "Native speaker voiceover services for commercials, documentaries, e-learning, and multimedia content.",
      features: ["Native speakers", "Multiple accents", "Studio quality", "Fast turnaround"]
    },
    {
      icon: LanguageIcon,
      title: "Subtitling",
      description: "Accurate subtitling and closed captioning services for videos, films, and online content.",
      features: ["Time-coded subtitles", "Multiple formats", "Quality assurance", "Cultural adaptation"]
    },
    {
      icon: PencilIcon,
      title: "Transcription",
      description: "Precise transcription services for audio and video content in multiple languages and formats.",
      features: ["Audio transcription", "Video transcription", "Time stamps", "Speaker identification"]
    },
    {
      icon: GlobeAsiaAustraliaIcon,
      title: "Localization",
      description: "Complete localization services for websites, software, and marketing materials for global markets.",
      features: ["Website localization", "Software localization", "Cultural adaptation", "Market research"]
    },
    {
      icon: AcademicCapIcon,
      title: "Language Training",
      description: "Customized language training programs for individuals and corporate teams with native instructors.",
      features: ["Corporate training", "Individual lessons", "Online classes", "Cultural training"]
    },
    {
      icon: ClipboardDocumentListIcon,
      title: "Cultural Consulting",
      description: "Expert guidance on cultural nuances, business etiquette, and market entry strategies.",
      features: ["Cultural assessment", "Business etiquette", "Market analysis", "Communication strategies"]
    }
  ]

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-lugha-mist to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-lugha-primary mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive language solutions tailored to your needs. From translation to cultural consulting, 
            we bridge communication gaps with precision and cultural sensitivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-lugha-teal to-lugha-primary p-4 rounded-xl w-fit mb-6">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-lugha-primary mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-lugha-teal rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-lugha-primary to-lugha-teal rounded-3xl p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Break Language Barriers?
            </h3>
            <p className="text-lugha-mist mb-8 text-lg max-w-2xl mx-auto">
              Get a free quote for your project and discover how we can help you communicate effectively across cultures.
            </p>
            <button 
              onClick={() => setShowQuoteModal(true)}
              className="bg-white text-lugha-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Free Quote
            </button>
          </div>
        </div>

        {/* Quote Modal */}
        {showQuoteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-lugha-primary">Get Free Quote</h3>
                  <button 
                    onClick={() => setShowQuoteModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                    >
                      <option value="">Select a service</option>
                      <option value="Document Translation">Document Translation</option>
                      <option value="Interpretation">Interpretation</option>
                      <option value="Voiceover">Voiceover</option>
                      <option value="Subtitling">Subtitling</option>
                      <option value="Transcription">Transcription</option>
                      <option value="Localization">Localization</option>
                      <option value="Language Training">Language Training</option>
                      <option value="Cultural Consulting">Cultural Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Details</label>
                    <textarea
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under $500">Under $500</option>
                      <option value="$500 - $1,000">$500 - $1,000</option>
                      <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="Over $10,000">Over $10,000</option>
                    </select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowQuoteModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-3 bg-lugha-primary text-white rounded-lg font-medium hover:bg-lugha-primary/90 disabled:bg-gray-400 transition-colors"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}