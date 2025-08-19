import Image from 'next/image'
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2C3E70] text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 grid     grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-20">
        {/* Column 1: Logo + Description + Socials */}
        <div>
          <Image
            src="/Lugha Logo File white-02.png"
            alt="Lugha Logo"
            width={120}
            height={40}
            className="mb-4"
          />
          <p className="text-sm text-gray-300 mb-4">
            Lugha is a language solutions agency empowering communication across cultures.
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 text-gray-300">
            <a href="https://linkedin.com/company/get-lugha" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 hover:text-[#A1B6DA] transition" />
            </a>
            <a href="https://twitter.com/lugha" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5 hover:text-[#A1B6DA] transition" />
            </a>
            <a href="https://instagram.com/lugha" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5 hover:text-[#A1B6DA] transition" />
            </a>
            <a href="https://facebook.com/lugha" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-5 w-5 hover:text-[#A1B6DA] transition" />
            </a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Explore</h4>
            <a href="#services" className="hover:text-lugha-accent block">Services</a>
            <a href="#about" className="hover:text-lugha-accent block">About</a>
            <a href="#testimonials" className="hover:text-lugha-accent block">Testimonials</a>
            <a href="#clients" className="hover:text-lugha-accent block">Clients</a>
            <a href="#partners" className="hover:text-lugha-accent block">Partners</a>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Connect</h4>
            <a href="#languages" className="hover:text-lugha-accent block">Languages</a>
            <a href="#careers" className="hover:text-lugha-accent block">Careers</a>
            <a href="#blog" className="hover:text-lugha-accent block">Blog</a>
            <a href="#contact" className="hover:text-lugha-accent block">Contact</a>
            <a href="mailto:getlugha@gmail.com" className="hover:text-lugha-accent block">Email Us</a>
          </div>
        </div>

        {/* Column 3: Contact Info */}
        <div className="space-y-3 text-sm">
          <h4 className="font-semibold text-white">Head Office</h4>
          <p className="text-gray-300">Dar es Salaam, Tanzania</p>
          <p className="text-gray-300">Delhi, India</p>
          <p className="text-gray-300">Email: getlugha@gmail.com</p>
          <p className="text-gray-300">Phone: +91 8469388794/+255 744381263</p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 border-t border-blue-900 pt-6 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} Lugha. All rights reserved.
      </div>
    </footer>
  );
}
