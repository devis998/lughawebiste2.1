'use client'

import { useState, useEffect } from 'react'
import { BriefcaseIcon, MapPinIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

export default function Careers() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    coverLetter: ''
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    const section = document.getElementById('careers')
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleJobApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          position: selectedRole
        })
      })
      const result = await response.json()
      if (response.ok && result.success) {
        alert('Application submitted successfully!')
        setFormData({ name: '', email: '', coverLetter: '' })
        setIsModalOpen(false)
      } else {
        alert('Failed to apply: ' + (result.message || result.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('An error occurred. Please try again later.')
    }
  }

  const roles = [
    {
      title: "Freelance Translator (Gujarati)",
      type: "Freelance",
      location: "Remote",
      schedule: "Flexible",
      pay: "Per project",
      description: "Join our network of expert Gujarati translators for business and healthcare projects.",
      requirements: ["Native Gujarati speaker", "5+ years experience", "CAT tools proficiency"],
      icon: <BriefcaseIcon className="h-6 w-6" />
    },
    {
      title: "Swahili Interpreter",
      type: "Contract",
      location: "Nairobi or Dar es Salaam",
      schedule: "Full-time",
      pay: "Competitive",
      description: "Provide interpretation services for NGOs and international organizations.",
      requirements: ["Native Swahili speaker", "Interpretation certification", "Healthcare experience preferred"],
      icon: <BriefcaseIcon className="h-6 w-6" />
    },
    {
      title: "Project Manager – Localization",
      type: "Full-time",
      location: "Remote",
      schedule: "Full-time",
      pay: "Competitive compensation",
      description: "Lead localization projects for tech companies expanding into African markets.",
      requirements: ["Project management experience", "Localization background", "Multilingual preferred"],
      icon: <BriefcaseIcon className="h-6 w-6" />
    },
    {
      title: "Amharic Linguist",
      type: "Freelance",
      location: "Remote",
      schedule: "By assignment",
      pay: "Per project",
      description: "Work on translation and cultural consulting projects for Ethiopian market entry.",
      requirements: ["Native Amharic speaker", "Cultural expertise", "Business translation experience"],
      icon: <BriefcaseIcon className="h-6 w-6" />
    }
  ]

  const benefits = [
    {
      title: "Flexible Work",
      desc: "Work from anywhere with flexible schedules that fit your lifestyle",
      icon: <ClockIcon className="h-6 w-6" />
    },
    {
      title: "Competitive Pay",
      desc: "Fair compensation with timely payments and performance bonuses",
      icon: <CurrencyDollarIcon className="h-6 w-6" />
    },
    {
      title: "Global Impact",
      desc: "Contribute to meaningful projects that bridge cultures and save lives",
      icon: <MapPinIcon className="h-6 w-6" />
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-lugha-mist to-white" id="careers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-lugha-teal/10 rounded-2xl mb-6">
            <BriefcaseIcon className="h-8 w-8 text-lugha-teal" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-lugha-primary mb-6">
            Join Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Lugha, we are building a collective of passionate linguists, cultural connectors, and project leaders shaping global conversations. If you believe in the power of language, we want to hear from you.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                isVisible ? `animate-fade-in-up delay-${index * 100}` : 'opacity-0'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-lugha-teal/10 rounded-xl mx-auto mb-4">
                <div className="text-lugha-teal">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-lugha-primary mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Job Openings */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-lugha-primary text-center mb-8">
            Current Openings
          </h3>
          <div className="space-y-6">
            {roles.map((role, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
                  isVisible ? `animate-fade-in-up delay-${(index + 3) * 100}` : 'opacity-0'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Left Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-lugha-teal/10 rounded-xl flex-shrink-0">
                        <div className="text-lugha-teal">
                          {role.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-lugha-primary mb-2">
                          {role.title}
                        </h4>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-lugha-teal rounded-full"></div>
                            {role.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-lugha-coral rounded-full"></div>
                            {role.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-lugha-gold rounded-full"></div>
                            {role.schedule}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">
                          {role.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {role.requirements.map((req, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-lugha-mist text-lugha-primary text-sm rounded-full"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right CTA */}
                  <div className="lg:ml-8 mt-4 lg:mt-0 text-right">
                    <div className="mb-2">
                      <span className="text-lg font-semibold text-lugha-teal">
                        {role.pay}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedRole(role.title)
                        setIsModalOpen(true)
                      }}
                      className="bg-lugha-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-lugha-teal transition-colors duration-300 shadow-lg"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl">
              <h3 className="text-2xl font-bold text-lugha-primary mb-6">
                Apply for {selectedRole}
              </h3>
              <form onSubmit={handleJobApplication} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lugha-teal"
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
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lugha-teal resize-none"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-lugha-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-lugha-teal shadow-lg"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 border-2 border-lugha-primary text-lugha-primary px-6 py-3 rounded-xl font-semibold hover:bg-lugha-primary hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
