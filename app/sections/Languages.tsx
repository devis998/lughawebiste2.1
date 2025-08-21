'use client'

import { useState, useEffect } from 'react'
import { GlobeAltIcon, XMarkIcon } from '@heroicons/react/24/outline'

const languages = [
  { name: "English", flag: "🇺🇸", translators: 2847, words: "2.3M" },
  { name: "Spanish", flag: "🇪🇸", translators: 1923, words: "1.8M" },
  { name: "French", flag: "🇫🇷", translators: 1456, words: "1.2M" },
  { name: "German", flag: "🇩🇪", translators: 1234, words: "980K" },
  { name: "Italian", flag: "🇮🇹", translators: 987, words: "750K" },
  { name: "Portuguese", flag: "🇵🇹", translators: 876, words: "650K" },
  { name: "Russian", flag: "🇷🇺", translators: 765, words: "580K" },
  { name: "Chinese", flag: "🇨🇳", translators: 654, words: "520K" },
  { name: "Japanese", flag: "🇯🇵", translators: 543, words: "420K" },
  { name: "Korean", flag: "🇰🇷", translators: 432, words: "350K" },
  { name: "Arabic", flag: "🇸🇦", translators: 398, words: "320K" },
  { name: "Hindi", flag: "🇮🇳", translators: 287, words: "280K" }
]

export default function Languages() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(
    languages.map(lang => ({ ...lang, animatedTranslators: 0, animatedWords: "0" }))
  )
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [formData, setFormData] = useState({
    language: '',
    region: '',
    urgency: '',
    contactName: '',
    contactEmail: '',
    useCase: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          animateStats()
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('languages-section')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        alert('Language request submitted successfully! We will contact you soon.')
        setFormData({
          language: '',
          region: '',
          urgency: '',
          contactName: '',
          contactEmail: '',
          useCase: ''
        })
        setShowLanguageModal(false)
      } else {
        alert(data.message || 'Failed to submit language request. Please try again.')
      }
    } catch (error) {
      alert('Failed to submit language request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const animateStats = () => {
    languages.forEach((lang, index) => {
      setTimeout(() => {
        let currentTranslators = 0
        const targetTranslators = lang.translators
        const increment = Math.ceil(targetTranslators / 50)
        
        const timer = setInterval(() => {
          currentTranslators += increment
          if (currentTranslators >= targetTranslators) {
            currentTranslators = targetTranslators
            clearInterval(timer)
          }
          
          setAnimatedStats(prev => 
            prev.map((item, i) => 
              i === index 
                ? { ...item, animatedTranslators: currentTranslators, animatedWords: lang.words }
                : item
            )
          )
        }, 30)
      }, index * 100)
    })
  }

  return (
    <section id="languages-section" className="py-20 bg-gradient-to-br from-lugha-primary via-lugha-secondary to-lugha-teal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-4 rounded-2xl">
              <GlobeAltIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Languages We Support
          </h2>
          <p className="text-xl text-lugha-mist max-w-3xl mx-auto">
            Connect with expert translators across dozens of languages. Our global network ensures 
            accurate, culturally-aware translations for every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {animatedStats.map((lang, index) => (
            <div
              key={lang.name}
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{lang.flag}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{lang.name}</h3>
                <div className="space-y-1">
                  <p className="text-lugha-mist">
                    <span className="font-bold text-white">{lang.animatedTranslators.toLocaleString()}</span> translators
                  </p>
                  <p className="text-lugha-mist">
                    <span className="font-bold text-white">{lang.animatedWords}</span> words translated
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need a specific language pair?
            </h3>
            <p className="text-lugha-mist mb-6">
              Our network includes specialists in rare languages, regional dialects, and technical terminology.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">150+</div>
                <div className="text-lugha-mist">Languages</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-lugha-mist">Language Pairs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-lugha-mist">Availability</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">99.8%</div>
                <div className="text-lugha-mist">Accuracy Rate</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg text-lugha-mist mb-6">
              Can not see your language? We are constantly expanding our network.
            </p>
            <button 
              onClick={() => setShowLanguageModal(true)}
              className="bg-white text-lugha-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg"
            >
              Request New Language
            </button>
          </div>
        </div>

        {/* Language Request Modal */}
        {showLanguageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-lugha-primary">Request New Language</h3>
                  <button 
                    onClick={() => setShowLanguageModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language *</label>
                    <input
                      type="text"
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Yoruba, Hausa, Bengali"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Region/Country</label>
                    <input
                      type="text"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      placeholder="e.g., Nigeria, Bangladesh"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                    >
                      <option value="">Select urgency</option>
                      <option value="Low - Planning ahead">Low - Planning ahead</option>
                      <option value="Medium - Within 1 month">Medium - Within 1 month</option>
                      <option value="High - Within 1 week">High - Within 1 week</option>
                      <option value="Urgent - ASAP">Urgent - ASAP</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Use Case</label>
                    <textarea
                      name="useCase"
                      value={formData.useCase}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                      placeholder="What do you need this language for? (e.g., medical documents, educational content, business communication)"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowLanguageModal(false)}
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