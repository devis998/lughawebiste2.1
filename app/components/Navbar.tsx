'use client'

import Image from 'next/image'
import { useState } from 'react'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-30 font-sans border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <a href="/" className="flex items-center space-x-2">
          <Image
            src="/lugha-logo.png"
            alt="Lugha Logo"
            width={100}
            height={32}
            className="rounded"
          />
        </a>

        {/* NAV LINKS (DESKTOP) */}
        <div className="hidden lg:flex items-center space-x-8 text-gray-700 font-medium text-sm">
          {[
            { name: 'Services', href: '#services' },
            { name: 'About', href: '#about' },
            { name: 'Testimonials', href: '#testimonials' },
            { name: 'Clients', href: '#clients' },
            
            { name: 'Languages', href: '#languages' },
            { name: 'Careers', href: '#careers' },
            { name: 'Blog', href: '#blog' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-lugha-primary transition-colors duration-200 relative group"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-lugha-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* RIGHT SIDE - Language Selector + Contact Button */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Language Selector */}
          <div className="flex items-center space-x-1 text-gray-600 hover:text-lugha-primary cursor-pointer transition-colors">
            <GlobeAltIcon className="h-4 w-4" />
            <span className="text-sm font-medium">En</span>
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Contact Button */}
          <a
            href="#contact"
            className="bg-lugha-primary text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-lugha-primary/90 transition-colors duration-200 shadow-sm"
          >
            Contact Us
          </a>
        </div>

        {/* HAMBURGER ICON (MOBILE) */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            {[
              { name: 'Services', href: '#services' },
              { name: 'About', href: '#about' },
              { name: 'Testimonials', href: '#testimonials' },
              { name: 'Clients', href: '#clients' },
            
              { name: 'Languages', href: '#languages' },
              { name: 'Careers', href: '#careers' },
              { name: 'Blog', href: '#blog' },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-lugha-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
            {/* Mobile Contact Button */}
            <a
              href="#contact"
              className="bg-lugha-primary text-white px-5 py-2.5 rounded-lg font-medium text-center hover:bg-lugha-primary/90 transition-colors duration-200 mt-4"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}