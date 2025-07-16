'use client'

import { useState, useEffect } from 'react'
import { ChatBubbleLeftEllipsisIcon, StarIcon } from '@heroicons/react/24/solid'

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      name: "Sarah Mwangi",
      role: "NGO Director",
      company: "Health for All Kenya",
      country: "Kenya",
      quote: "Lugha has been an incredible partner in our Swahili campaigns. Their cultural understanding goes beyond translation—they help us connect authentically with communities.",
      img: "/Sara.jpeg",
      rating: 5
    },
    {
      name: "Rajesh Patel",
      role: "HR Lead",
      company: "TechGlobal Solutions",
      country: "India",
      quote: "Professional and fast turnaround. Their Gujarati translations helped us expand into new markets with confidence. Highly recommended for any business going global.",
      img: "/Rajesh Patel.jpeg",
      rating: 5
    },
    {
      name: "Amina Hassan",
      role: "Project Manager",
      company: "Education First Tanzania",
      country: "Tanzania",
      quote: "Timely and culturally accurate translations that helped our educational mission succeed. The team understands the nuances that make communication effective.",
      img: "/images.jfif",
      rating: 5
    },
    {
      name: "Dr. Rahman Ahmed",
      role: "Program Officer",
      company: "Global Health Initiative",
      country: "Bangladesh",
      quote: "Lugha's interpreters made our multilingual health conferences smooth and inclusive. Their expertise in medical terminology is exceptional.",
      img: "/1827+Marketing+-+Business+Benefits+of+LinkedIn+Profiles+for+Your+Team.jfif",
      rating: 5
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('testimonials')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-lugha-primary to-lugha-teal" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6">
            <ChatBubbleLeftEllipsisIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Clients Say
          </h2>
          <p className="text-xl text-lugha-mist max-w-3xl mx-auto leading-relaxed">
            Trusted by organizations worldwide to bridge language barriers and connect cultures with precision and care.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-3xl p-8 md:p-12 mx-4 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                      
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <img
                          src={testimonial.img}
                          alt={testimonial.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-lugha-teal/20"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        {/* Stars */}
                        <div className="flex justify-center md:justify-start mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>

                        {/* Author Info */}
                        <div>
                          <h4 className="font-bold text-lugha-primary text-lg">
                            {testimonial.name}
                          </h4>
                          <p className="text-lugha-teal font-medium">
                            {testimonial.role}
                          </p>
                          <p className="text-gray-600">
                            {testimonial.company} • {testimonial.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-lugha-mist mb-8 text-lg">
            Trusted by 500+ organizations worldwide
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-white font-semibold">NGOs</div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="text-white font-semibold">Startups</div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="text-white font-semibold">Healthcare</div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="text-white font-semibold">Education</div>
          </div>
        </div>
      </div>
    </section>
  )
}
