'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 font-sans w-[95%] max-w-6xl bg-lugha-navy text-white rounded-full shadow-lg px-6 py-2 backdrop-blur-md">
      <div className="flex items-center justify-between h-14">

        {/* LOGO */}
        <a href="/" className="pl-2">
          <Image
            src="/lugha-logo.png"
            alt="Lugha Logo"
            width={100}
            height={32}
            className="rounded bg-white p-1"
          />
        </a>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium tracking-wide">
          {[
            'services', 'about', 'testimonials', 'clients',
            'languages', 'careers', 'blog', 'contact'
          ].map(link => (
            <a
              key={link}
              href={`#${link}`}
              className="relative text-white hover:text-lugha-coral transition duration-200 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-lugha-coral after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
        </div>

        {/* HAMBURGER (MOBILE) */}
        <div className="md:hidden pr-2">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
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
        <div className="md:hidden mt-2 bg-lugha-navy/90 rounded-xl py-4 px-6 text-center text-white font-medium space-y-2">
          {[
            'services', 'about', 'testimonials', 'clients',
            'languages', 'careers', 'blog', 'contact'
          ].map(link => (
            <a
              key={link}
              href={`#${link}`}
              className="block hover:text-lugha-coral transition"
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
