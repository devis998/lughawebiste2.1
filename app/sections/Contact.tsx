'use client'

import { useState, useEffect } from 'react'
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('contact')
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    {
      icon: <EnvelopeIcon className="h-6 w-6" />,
      title: "Email Us",
      details: "info@lugha.org",
      action: "mailto:info@lugha.org"
    },
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      title: "Call Us",
      details: "+255 744 381 263",
      action: "tel:+255744381263"
    },
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: "Visit Us",
      details: "Dar es Salaam, Tanzania\nDelhi, India",
      action: null
    }
  ]

  const services = [
    "Document Translation",
    "Interpretation",
    "Voiceover",
    "Subtitling",
    "Transcription",
    "Localization",
    "Language Training",
    "Cultural Consulting"
  ]

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-lugha-mist to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-lugha-teal/10 rounded-2xl mb-6">
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-lugha-teal" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-lugha-primary mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to break language barriers? Let's discuss how Lugha can help your organization communicate effectively across cultures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                    isVisible ? `animate-fade-in-left delay-${index * 100}` : 'opacity-0'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-lugha-teal/10 rounded-xl flex-shrink-0">
                      <div className="text-lugha-teal">{info.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lugha-primary mb-2">{info.title}</h3>
                      {info.action ? (
                        <a
                          href={info.action}
                          className="text-gray-600 hover:text-lugha-teal transition-colors duration-300 whitespace-pre-line"
                        >
                          {info.details}
                        </a>
                      ) : (
                        <p className="text-gray-600 whitespace-pre-line">{info.details}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className={`mt-8 bg-gradient-to-r from-lugha-primary to-lugha-teal rounded-2xl p-6 text-white ${
              isVisible ? 'animate-fade-in-left delay-300' : 'opacity-0'
            }`}>
              <h3 className="font-bold text-lg mb-4">Why Choose Lugha?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">24-hour response time</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">98% client satisfaction rate</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">500+ successful projects</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-100 ${
              isVisible ? 'animate-fade-in-right delay-200' : 'opacity-0'
            }`}>
              <h3 className="text-2xl font-bold text-lugha-primary mb-6">Start Your Project</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lugha-teal"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lugha-teal"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company/Organization</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lugha-teal"
                      placeholder="Your organization"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Needed</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lugha-teal"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Details *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lugha-teal resize-none"
                    placeholder="Tell us about your project, timeline, languages needed, and any specific requirements..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-lugha-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-lugha-teal shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition"
                  >
                    Send Message
                  </button>
                  <button
                    type="button"
                    className="flex-1 border-2 border-lugha-primary text-lugha-primary px-8 py-4 rounded-xl font-semibold hover:bg-lugha-primary hover:text-white transition"
                  >
                    Request Quote
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Prefer to chat directly? We're available on WhatsApp for quick questions and consultations.
          </p>
          <a
            href="https://wa.me/255744381263"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 shadow-lg"
          >
            <img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
