'use client'

import { useState, useEffect } from 'react'
import { DocumentTextIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false)

  // For subscription backend
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter your email.")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (data.success) {
        alert('Subscription successful!')
        setEmail('')
      } else {
        alert(data.message || 'Subscription failed.')
      }
    } catch (err) {
      alert('Something went wrong, please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('blog')
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const blogPosts = [
    {
      title: "The Importance of Culturally Accurate Translation",
      excerpt: "Learn how translation goes beyond words in cross-cultural settings and why cultural context matters more than ever.",
      category: "Cultural Intelligence",
      readTime: "5 min read",
      date: "Jan 15, 2025",
      image: "/team.jpeg",
      featured: true
    },
    {
      title: "How Lugha Helped a Health NGO Reach Rural Tanzania",
      excerpt: "Case study on translation & voiceover in Swahili for a major health campaign that reached 2M+ people.",
      category: "Case Study",
      readTime: "8 min read",
      date: "Jan 10, 2025",
      image: "/Heroimage.jpeg",
      featured: true
    },
    {
      title: "Breaking Language Barriers in Healthcare",
      excerpt: "Exploring the critical role of medical interpretation in saving lives and improving patient outcomes.",
      category: "Healthcare",
      readTime: "6 min read",
      date: "Jan 5, 2025",
      image: "/blog.jpeg",
      featured: false
    },
    {
      title: "The Future of AI in Translation Services",
      excerpt: "How artificial intelligence is transforming the translation industry while human expertise remains irreplaceable.",
      category: "Technology",
      readTime: "7 min read",
      date: "Dec 28, 2024",
      image: "/blog (1).jpeg",
      featured: false
    }
  ]

  const categories = ["All", "Cultural Intelligence", "Case Study", "Healthcare", "Technology"]
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory)

  return (
    <section className="py-24 bg-white" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-lugha-teal/10 rounded-2xl mb-6">
            <DocumentTextIcon className="h-8 w-8 text-lugha-teal" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-lugha-primary mb-6">
            From the Blog
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore how Lugha supports organizations across continents with impactful language and cultural solutions. Insights, case studies, and industry trends.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-lugha-primary text-white shadow-lg'
                  : 'bg-lugha-mist text-lugha-primary hover:bg-lugha-teal/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredPosts.filter(post => post.featured).map((post, index) => (
            <article
              key={index}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? `animate-fade-in-up delay-${index * 100}` : 'opacity-0'
              }`}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-lugha-teal text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-lugha-primary mb-3 group-hover:text-lugha-teal transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-lugha-teal font-medium group-hover:text-lugha-primary transition-colors duration-300">
                  <span>Read More</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Regular Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredPosts.filter(post => !post.featured).map((post, index) => (
            <article
              key={index}
              className={`group bg-lugha-mist/30 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 ${
                isVisible ? `animate-fade-in-up delay-${(index + 2) * 100}` : 'opacity-0'
              }`}
            >
              <div className="flex items-start gap-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-lugha-teal/10 text-lugha-teal px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-lugha-primary mb-2 group-hover:text-lugha-teal transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{post.date}</span>
                    <div className="flex items-center text-lugha-teal text-sm font-medium group-hover:text-lugha-primary transition-colors duration-300">
                      <span>Read</span>
                      <ArrowRightIcon className="h-3 w-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-lugha-primary to-lugha-teal rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Language Insights
            </h3>
            <p className="text-lugha-mist mb-8 text-lg max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest trends in translation, cultural intelligence, and global communication strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                onClick={handleSubscribe}
                disabled={isSubmitting}
                className="bg-white text-lugha-primary px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
