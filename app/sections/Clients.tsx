'use client'

import { useState } from 'react'
import { BuildingOffice2Icon, UsersIcon } from '@heroicons/react/24/outline'

export default function Clients() {
  // From backend (clients.tsx)
  const [showGetStartedModal, setShowGetStartedModal] = useState(false)
  const [showCaseStudiesModal, setShowCaseStudiesModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    organizationType: '',
    message: ''
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (
    e: React.FormEvent,
    action: 'get_started' | 'case_studies'
  ) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...formData }),
      })

      const data = await res.json()

      if (res.ok && data?.success) {
        alert(
          action === 'get_started'
            ? 'Thanks! We will contact you to get started.'
            : 'Thanks! We will send case studies to your email.'
        )
        setFormData({
          name: '',
          email: '',
          company: '',
          organizationType: '',
          message: ''
        })
        action === 'get_started'
          ? setShowGetStartedModal(false)
          : setShowCaseStudiesModal(false)
      } else {
        alert(data?.message || 'Submission failed. Please try again.')
      }
    } catch (err) {
      alert('Submission failed. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="clients" className="py-16 bg-gradient-to-br from-lugha-primary via-lugha-secondary to-lugha-teal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-4 rounded-2xl">
              <BuildingOffice2Icon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Leading Organizations
          </h2>
          <p className="text-xl text-lugha-mist max-w-3xl mx-auto">
            From startups to global enterprises, NGOs to government agencies, Lugha is the partner 
            of choice for organizations that need reliable, culturally-accurate translation and localization.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">500+</div>
            <div className="text-lugha-mist">Organizations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">120+</div>
            <div className="text-lugha-mist">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">98%</div>
            <div className="text-lugha-mist">Client Retention</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">1M+</div>
            <div className="text-lugha-mist">Projects Delivered</div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="text-center">
          <p className="text-lg text-lugha-mist mb-6">
            Join hundreds of organizations already growing with Lugha.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-lugha-primary">Get Started</h3>
                <button
                  onClick={() => setShowGetStartedModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={(e) => handleSubmit(e, 'get_started')} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                />
                <select
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                >
                  <option value="">Organization Type</option>
                  <option value="NGO">NGO</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Tech">Tech</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  rows={4}
                />
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowGetStartedModal(false)}
                    className="flex-1 border border-gray-300 px-6 py-3 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-lugha-primary text-white px-6 py-3 rounded-xl"
                  >
                    {isSubmitting ? 'Submitting…' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Case Studies Modal */}
      {showCaseStudiesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-lugha-primary">Request Case Studies</h3>
                <button
                  onClick={() => setShowCaseStudiesModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={(e) => handleSubmit(e, 'case_studies')} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                />
                <select
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                >
                  <option value="">Organization Type</option>
                  <option value="NGO">NGO</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Tech">Tech</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  rows={4}
                />
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCaseStudiesModal(false)}
                    className="flex-1 border border-gray-300 px-6 py-3 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-lugha-primary text-white px-6 py-3 rounded-xl"
                  >
                    {isSubmitting ? 'Submitting…' : 'Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
