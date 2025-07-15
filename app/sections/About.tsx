'use client'

import { useState, useEffect } from 'react';
import { UsersIcon, GlobeAltIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState([
    { value: 0, target: 200, label: "Expert Linguists", suffix: "+" },
    { value: 0, target: 15, label: "Languages Covered", suffix: "+" },
    { value: 0, target: 500, label: "Happy Clients", suffix: "+" },
    { value: 0, target: 98, label: "Success Rate", suffix: "%" }
  ]);

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        animateNumbers();
      }
    },
    { threshold: 0.3 }
  );

  const section = document.getElementById('about');
  if (section) observer.observe(section);

  return () => observer.disconnect();
}, [animateNumbers]);


  const animateNumbers = useCallback(() => {
    stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(timer);
        }
        setStats(prev => prev.map((s, i) =>
          i === index ? { ...s, value: Math.floor(current) } : s
        ));
      }, 40);
    });
  };

  const features = [
    {
      icon: <GlobeAltIcon className="h-6 w-6" />,
      title: "Global Reach",
      desc: "Native speakers across Africa and Asia"
    },
    {
      icon: <HeartIcon className="h-6 w-6" />,
      title: "Cultural Intelligence",
      desc: "Deep understanding of local contexts"
    },
    {
      icon: <StarIcon className="h-6 w-6" />,
      title: "Quality Assured",
      desc: "Rigorous quality control processes"
    }
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-br from-lugha-mist to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-lugha-teal/10 rounded-2xl mb-6">
              <UsersIcon className="h-8 w-8 text-lugha-teal" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-lugha-primary mb-6">
              Who We Are
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Lugha is a culturally intelligent language partner, made up of a global team of native speakers, translators, and cultural experts. We help brands communicate with clarity and empathy across borders.
            </p>
            
            <p className="text-gray-600 mb-10 leading-relaxed">
              Our specialists bring human context to every translation — ensuring accurate, relevant, and respectful communication from East Africa to South Asia. We don&#39;t just translate words; we bridge cultures.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-4 ${isVisible ? `animate-fade-in-up delay-${(index + 1) * 100}` : 'opacity-0'}`}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-lugha-teal/10 rounded-xl flex-shrink-0">
                    <div className="text-lugha-teal">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lugha-primary mb-1">{feature.title}</h4>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Stats */}
          <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-lugha-primary mb-8 text-center">
                Our Impact in Numbers
              </h3>
              
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-lugha-teal mb-2">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mission Statement */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <blockquote className="text-center">
                  <p className="text-lg text-gray-700 italic mb-4">
                    &quot;Language is the bridge between cultures. We build those bridges with precision, care, and cultural intelligence.&quot;
                  </p>
                  <footer className="text-lugha-primary font-semibold">
                    — Lugha Team
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
