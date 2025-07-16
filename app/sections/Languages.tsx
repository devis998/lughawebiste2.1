'use client'

import { useState, useEffect } from 'react'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

const languages = [
  {
    name: "Swahili",
    translators: 30,
    words: "1M+",
    flag: "/flags/swahil.jpeg",
    region: "East Africa",
    speakers: "16M+"
  },
  {
    name: "Gujarati",
    translators: 15,
    words: "8k+",
    flag: "/flags/hindi.jpeg",
    region: "India",
    speakers: "57M+"
  },
  {
    name: "Hindi",
    translators: 10,
    words: "9k+",
    flag: "/flags/hindi.jpeg",
    region: "India",
    speakers: "600M+"
  },
  {
    name: "Tamil",
    translators: 6,
    words: "7k",
    flag: "/flags/tamil.png",
    region: "South Asia",
    speakers: "78M+"
  },
  {
    name: "Luganda",
    translators: 10,
    words: "8k",
    flag: "/flags/Flag-Uganda.webp",
    region: "East Africa",
    speakers: "6M+"
  },
  {
    name: "Amharic",
    translators: 6,
    words: "2k",
    flag: "/flags/amharic.png",
    region: "Ethiopia",
    speakers: "32M+"
  },
  {
    name: "Arabic",
    translators: 2,
    words: "5k",
    flag: "/flags/arabic.png",
    region: "MENA",
    speakers: "272M+"
  },
  {
    name: "French",
    translators: 6,
    words: "8k",
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
      // Animate translators count
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

      // Animate words count
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

  return (
    <section className="py-24 bg-white" id="languages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-lugha-teal/10 rounded-2xl mb-6">
            <GlobeAltIcon className="h-8 w-8 text-lugha-teal" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-lugha-primary mb-6">
            Languages We Cover
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From African heartlands to South Asian cities, Lugha bridges language gaps with culturally fluent experts helping organizations connect, educate, and serve with clarity.
          </p>
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {animatedStats.map((lang, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br from-white to-lugha-mist/30 rounded-2xl p-6 border border-gray-100 hover:border-lugha-teal/30 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? `animate-fade-in-up delay-${index * 100}` : 'opacity-0'
              }`}
            >
              {/* Flag and Language Name */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={lang.flag}
                    alt={`${lang.name} flag`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-lugha-teal/20 group-hover:border-lugha-teal/50 transition-colors duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-lugha-teal rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-lugha-primary group-hover:text-lugha-teal transition-colors duration-300">
                    {lang.name}
                  </h3>
                  <p className="text-sm text-gray-500">{lang.region}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Translators</span>
                  <span className="font-bold text-lugha-teal text-lg">
                    {lang.animatedTranslators}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Words Translated</span>
                  <span className="font-bold text-lugha-primary text-lg">
                    {lang.animatedWords}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Native Speakers</span>
                  <span className="font-bold text-gray-700">
                    {lang.speakers}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-lugha-teal to-lugha-primary h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `${Math.min((lang.translators / 80) * 100, 100)}%` : '0%'
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Translator Network Strength
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
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
            <button className="bg-white text-lugha-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg">
              Request New Language
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
