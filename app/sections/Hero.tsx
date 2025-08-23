'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { RocketLaunchIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-12 md:py-16 overflow-hidden">
      
      {/* Background World Map */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <Image
          src="/globe-bg.avif"
          alt="World map background"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        
        {/* LEFT: CONTENT */}
        <div
          className={`space-y-8 transition-all duration-1000 order-1 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-lugha-primary leading-tight">
              Easiest way to find
              <br />
              <span className="text-lugha-teal">your language</span> solution
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-lg leading-relaxed">
              Connect with expert translators and interpreters across Africa and Asia. 
              Professional language services at affordable rates.
            </p>
          </div>

          {/* Removed Search Box */}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-lugha-primary">85+</div>
              <div className="text-sm text-gray-600">Expert Linguists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-lugha-primary">100+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-lugha-primary">20+</div>
              <div className="text-sm text-gray-600">Languages Covered</div>
            </div>
          </div>
        </div>

        {/* RIGHT: IMAGE */}
        <div
          className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-300 order-2 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg">
            <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/Heroimage.jpeg"
                alt="Global communication and translation services"
                fill
                className="object-cover"
              />
            </div>

            {/* 🌍 Badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <div className="w-12 h-12 bg-lugha-teal rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌍</span>
              </div>
            </div>

            {/* 💬 Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-lugha-coral rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">💬</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">Live Translation</div>
                  <div className="text-xs text-gray-500">Available 24/7</div>
                </div>
              </div>
            </div>

            {/* 🚀 Fast Delivery */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-xl p-3 shadow-lg flex items-center space-x-2">
              <RocketLaunchIcon className="h-5 w-5 text-lugha-teal" />
              <span className="text-sm font-medium text-gray-700">Fast Delivery</span>
            </div>

            {/* ✅ Accuracy */}
            <div className="absolute bottom-1 right-1 bg-white rounded-xl p-3 shadow-lg flex items-center space-x-2">
              <ShieldCheckIcon className="h-5 w-5 text-lugha-primary" />
              <span className="text-sm font-medium text-gray-700">High Accuracy</span>
            </div>

            {/* 🌐 Languages */}
            <div className="absolute top-2 left-2 bg-white rounded-xl p-3 shadow-lg flex items-center space-x-2">
              <GlobeAltIcon className="h-5 w-5 text-lugha-coral" />
              <span className="text-sm font-medium text-gray-700">25+ Languages</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
