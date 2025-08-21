'use client'

import { useState, useEffect } from 'react'
import { GlobeAltIcon, XMarkIcon } from '@heroicons/react/24/outline'

const languages = [
  {
    name: "Swahili",
    translators: 30,
    words: "1,465,790",
    flag: "/flags/swahil.jpeg",
    region: "East Africa",
    speakers: "16M+"
  },
  {
    name: "Gujarati",
    translators: 15,
    words: "838,421",
    flag: "/flags/hindi.jpeg",
    region: "India",
    speakers: "57M+"
  },
  {
    name: "Hindi",
    translators: 10,
    words: "914,218",
    flag: "/flags/hindi.jpeg",
    region: "India",
    speakers: "600M+"
  },
  {
    name: "Tamil",
    translators: 6,
    words: "734,314",
    flag: "/flags/tamil.png",
    region: "South Asia",
    speakers: "78M+"
  },
  {
    name: "Luganda",
    translators: 10,
    words: "886,942",
    flag: "/flags/Flag-Uganda.webp",
    region: "East Africa",
    speakers: "6M+"
  },
  {
    name: "Amharic",
    translators: 6,
    words: "218,587",
    flag: "/flags/amharic.png",
    region: "Ethiopia",
    speakers: "32M+"
  },
  {
    name: "Arabic",
    translators: 2,
    words: "504,354",
    flag: "/flags/arabic.png",
    region: "MENA",
    speakers: "272M+"
  },
  {
    name: "French",
    translators: 6,
    words: "843,978",
    flag: "/flags/french.png",
    region: "Global",
    speakers: "120M+"
  }
]

export default function Languages() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(
    languages.map(lang => ({ ...lang, animatedTranslators: 0, animatedWords: "0" }))
  )

  // Modal + Form state
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

    const section = document.getElementById('languages')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const animateStats = () => {
    languages.forEach((lang, langIndex) => {
      let currentTranslators = 0
      const translatorsIncrement = lang.translators / 30
      const translatorsTimer = setInterval(() => {
        currentTranslators += translatorsIncrement
        if (currentTranslators >= lang.translators) {
          currentTranslators = lang.translators
          clearInterval(translatorsTimer)
        }
        setAnimatedStats(prev => prev.map((item, index) =>
          index === langIndex ? { ...item, animatedTranslators: Math.floor(currentTranslators) } : item
        ))
      }, 50)

      const wordsTarget = parseInt(lang.words.replace(/,/g, ''))
      let currentWords = 0
      const wordsIncrement = wordsTarget / 30
      const wordsTimer = setInterval(() => {
        currentWords += wordsIncrement
        if (currentWords >= wordsTarget) {
          currentWords = wordsTarget
          clearInterval(wordsTimer)
        }
        setAnimatedStats(prev => prev.map((item, index) =>
          index === langIndex ? {
            ...item,
            animatedWords: Math.floor(currentWords).toLocaleString()
          } : item
        ))
      }, 50)
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (data.success) {
        alert('Language request submitted successfully!')
        setFormData({ language: '', region: '', urgency: '', contactName: '', contactEmail: '', useCase: '' })
        setShowLanguageModal(false)
      } else {
        alert(data.message || 'Failed to submit request.')
      }
    } catch (error) {
      alert('Failed to submit request.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-24 bg-white" id="languages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* --- Existing Header and Grid stay exactly the same --- */}

        {/* Summary Stats with Button */}
        <div className="bg-gradient-to-r from-lugha-primary to-lugha-teal rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-lugha-mist">Languages Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">85+</div>
              <div className="text-lugha-mist">Expert Linguists</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5M+</div>
              <div className="text-lugha-mist">Words Translated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-lugha-mist">Countries Served</div>
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
      </div>

      {/* Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-lugha-primary">Request New Language</h3>
                <button onClick={() => setShowLanguageModal(false)}>
                  <XMarkIcon className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="language" required placeholder="Language" value={formData.language} onChange={handleInputChange} className="w-full p-3 border rounded-lg" />
                <input type="text" name="region" placeholder="Region/Country" value={formData.region} onChange={handleInputChange} className="w-full p-3 border rounded-lg" />
                <select name="urgency" value={formData.urgency} onChange={handleInputChange} className="w-full p-3 border rounded-lg">
                  <option value="">Select urgency</option>
                  <option value="Low - Planning ahead">Low - Planning ahead</option>
                  <option value="Medium - Within 1 month">Medium - Within 1 month</option>
                  <option value="High - Within 1 week">High - Within 1 week</option>
                  <option value="Urgent - ASAP">Urgent - ASAP</option>
                </select>
                <input type="text" name="contactName" required placeholder="Your Name" value={formData.contactName} onChange={handleInputChange} className="w-full p-3 border rounded-lg" />
                <input type="email" name="contactEmail" required placeholder="Email" value={formData.contactEmail} onChange={handleInputChange} className="w-full p-3 border rounded-lg" />
                <textarea name="useCase" placeholder="What do you need this language for?" value={formData.useCase} onChange={handleInputChange} className="w-full p-3 border rounded-lg" />
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowLanguageModal(false)} className="flex-1 px-4 py-3 border rounded-lg">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-3 bg-lugha-primary text-white rounded-lg">{isSubmitting ? 'Submitting...' : 'Submit Request'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
