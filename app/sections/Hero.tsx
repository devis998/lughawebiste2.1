'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CalendarIcon, MagnifyingGlassIcon, RocketLaunchIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    languagePair: 'English to Swahili',
    service: 'Document Translation',
    deadline: '2025-02-15'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timeout)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
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
      const response = await fetch('/api/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        alert('Language expert request submitted successfully! We will contact you soon.')
        setFormData({
          languagePair: 'English to Swahili',
          service: 'Document Translation',
          deadline: '2025-02-15'
        })
      } else {
        alert(data.message || 'Failed to submit request. Please try again.')
      }
    } catch (error) {
      alert('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-lugha-primary via-lugha-teal to-lugha-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Connect with
                <span className="block text-lugha-accent">Language Experts</span>
                Worldwide
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Professional translation, interpretation, and localization services 
                in over 100 languages. Get matched with certified experts in minutes.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-white/80 text-sm">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5000+</div>
                <div className="text-white/80 text-sm">Experts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-white/80 text-sm">Support</div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-white/90">
                <ShieldCheckIcon className="h-6 w-6 text-lugha-accent" />
                <span>Certified Professionals</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <RocketLaunchIcon className="h-6 w-6 text-lugha-accent" />
                <span>Fast Turnaround</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <GlobeAltIcon className="h-6 w-6 text-lugha-accent" />
                <span>Global Coverage</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <ShieldCheckIcon className="h-6 w-6 text-lugha-accent" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right Content - Search Form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <button className="flex-1 py-2 px-4 text-sm font-medium bg-white text-lugha-primary rounded-md shadow-sm transition">
                  Find Experts
                </button>
                <button className="flex-1 py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition">
                  Post Project
                </button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Language Pair</label>
                  <select 
                    name="languagePair"
                    value={formData.languagePair}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal bg-white"
                  >
                    <option>English to Swahili</option>
                    <option>English to Hindi</option>
                    <option>English to Gujarati</option>
                    <option>English to French</option>
                    <option>English to Spanish</option>
                    <option>English to German</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Service</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal bg-white"
                  >
                    <option>Document Translation</option>
                    <option>Live Interpretation</option>
                    <option>Voiceover</option>
                    <option>Localization</option>
                    <option>Transcription</option>
                  </select>
                </div>

                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-gray-700">Deadline</label>
                  <CalendarIcon className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                  <input 
                    type="date" 
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lugha-teal"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-lugha-primary hover:bg-lugha-primary/90 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span>{isSubmitting ? 'Submitting...' : 'Find Language Experts'}</span>
              </button>
            </form>

            {/* Trust Indicators */}
            <div className="mt-6 text-center text-white/80 text-sm">
              <p>Trusted by 10,000+ businesses worldwide</p>
              <div className="flex justify-center items-center space-x-4 mt-3">
                <div className="flex -space-x-2">
                  <Image src="/api/placeholder/32/32" alt="User" width={32} height={32} className="rounded-full border-2 border-white" />
                  <Image src="/api/placeholder/32/32" alt="User" width={32} height={32} className="rounded-full border-2 border-white" />
                  <Image src="/api/placeholder/32/32" alt="User" width={32} height={32} className="rounded-full border-2 border-white" />
                  <Image src="/api/placeholder/32/32" alt="User" width={32} height={32} className="rounded-full border-2 border-white" />
                </div>
                <span className="text-lugha-accent font-medium">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}