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
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)

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

  const services = [
    {
      icon: <DocumentTextIcon className="h-7 w-7" />,
      title: "Document Translation",
      desc: "Accurate, timely translations for legal, medical, business and more.",
      delay: "delay-100"
    },
    {
      icon: <ChatBubbleLeftRightIcon className="h-7 w-7" />,
      title: "Interpretation",
      desc: "Real-time interpretation for conferences, interviews, healthcare, and NGOs.",
      delay: "delay-200"
    },
    {
      icon: <SpeakerWaveIcon className="h-7 w-7" />,
      title: "Voiceover",
      desc: "Multilingual voiceover for e-learning, media, and marketing materials.",
      delay: "delay-300"
    },
    {
      icon: <LanguageIcon className="h-7 w-7" />,
      title: "Subtitling",
      desc: "Subtitles for training videos, public campaigns, and regional films.",
      delay: "delay-100"
    },
    {
      icon: <PencilIcon className="h-7 w-7" />,
      title: "Transcription",
      desc: "Clean and time-coded transcripts from interviews, calls, and audio.",
      delay: "delay-200"
    },
    {
      icon: <GlobeAsiaAustraliaIcon className="h-7 w-7" />,
      title: "Localization",
      desc: "Tailoring apps, websites, and content to African and Asian markets.",
      delay: "delay-300"
    },
    {
      icon: <AcademicCapIcon className="h-7 w-7" />,
      title: "Language Training",
      desc: "Learn Swahili, Hindi, Bengali, Gujarati and more through live training.",
      delay: "delay-100"
    },
    {
      icon: <ClipboardDocumentListIcon className="h-7 w-7" />,
      title: "Cultural Consulting",
      desc: "Guiding brands on respectful and relevant cultural communication.",
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
              <p className="text-gray-600 leading-relaxed">
                {service.desc}
              </p>

              {/* Hover Arrow */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center text-lugha-teal font-medium">
                  <span className="text-sm">Learn more</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
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
            <button className="bg-white text-lugha-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Get Free Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
