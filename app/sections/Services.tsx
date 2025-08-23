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

    const section = document.getElementById('services')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
        headers: { 'Content-Type': 'application/json' },
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

  // Services list with features (list style from second file)
  const services = [
    {
      icon: <DocumentTextIcon className="h-7 w-7" />,
      title: "Document Translation",
      desc: "Accurate translations for legal, medical, and business use.",
      features: ["Certified translations", "Technical documents", "Legal papers", "Medical records"],
      delay: "delay-100"
    },
    {
      icon: <ChatBubbleLeftRightIcon className="h-7 w-7" />,
      title: "Interpretation",
      desc: "Real-time interpretation for conferences, interviews, and healthcare.",
      features: ["Simultaneous", "Consecutive", "Remote interpretation", "Conference support"],
      delay: "delay-200"
    },
    {
      icon: <SpeakerWaveIcon className="h-7 w-7" />,
      title: "Voiceover",
      desc: "Native speaker voiceover for e-learning, media, and marketing.",
      features: ["Native speakers", "Multiple accents", "Studio quality", "Fast turnaround"],
      delay: "delay-300"
    },
    {
      icon: <LanguageIcon className="h-7 w-7" />,
      title: "Subtitling",
      desc: "Subtitles for training videos, campaigns, and films.",
      features: ["Time-coded", "Multiple formats", "Cultural adaptation", "Quality assurance"],
      delay: "delay-100"
    },
    {
      icon: <PencilIcon className="h-7 w-7" />,
      title: "Transcription",
      desc: "Clean and time-coded transcripts from interviews, calls, and audio.",
      features: ["Audio transcription", "Video transcription", "Time stamps", "Speaker identification"],
      delay: "delay-200"
    },
    {
      icon: <GlobeAsiaAustraliaIcon className="h-7 w-7" />,
      title: "Localization",
      desc: "Tailoring apps, websites, and content to African and Asian markets.",
      features: ["Website localization", "Software localization", "Cultural adaptation", "Market research"],
      delay: "delay-300"
    },
    {
      icon: <AcademicCapIcon className="h-7 w-7" />,
      title: "Language Training",
      desc: "Learn Swahili, Hindi, Bengali, Gujarati and more with live training.",
      features: ["Corporate training", "Individual lessons", "Online classes", "Cultural training"],
      delay: "delay-100"
    },
    {
      icon: <ClipboardDocumentListIcon className="h-7 w-7" />,
      title: "Cultural Consulting",
      desc: "Guiding brands on respectful and relevant cultural communication.",
      features: ["Cultural assessment", "Business etiquette", "Market analysis", "Communication strategies"],
      delay: "delay-200"
    }
  ]

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-lugha-teal/10 rounded-2xl mb-6">
            <GlobeAsiaAustraliaIcon className="h-8 w-8 text-lugha-teal" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-lugha-primary mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We specialize in African and Asian languages, offering expert solutions across sectors with cultural intelligence and linguistic precision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-8 border border-gray-100 hover:border-lugha-teal/30 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? `animate-fade-in-up ${service.delay}` : 'opacity-0'
              }`}
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 bg-lugha-teal/10 rounded-xl mb-6 group-hover:bg-lugha-teal/20 transition-colors duration-300">
                <div className="text-lugha-teal group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-lugha-primary mb-4 group-hover:text-lugha-teal transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">{service.desc}</p>
              <ul className="space-y-2 text-sm text-gray-500">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-2 h-2 bg-lugha-teal rounded-full mr-2"></div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-lugha-primary to-lugha-teal rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to break language barriers?
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
                      {services.map((s, i) => (
                        <option key={i} value={s.title}>{s.title}</option>
                      ))}
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
