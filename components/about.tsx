"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Code, Database, Globe, Zap, Award, Users, Coffee, Heart } from "lucide-react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [visibleStats, setVisibleStats] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setIsVisible(true)
          }
          if (entry.target === cardsRef.current && entry.isIntersecting) {
            highlights.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index])
              }, index * 200)
            })
          }
          if (entry.target === statsRef.current && entry.isIntersecting) {
            stats.forEach((_, index) => {
              setTimeout(() => {
                setVisibleStats((prev) => [...prev, index])
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (cardsRef.current) observer.observe(cardsRef.current)
    if (statsRef.current) observer.observe(statsRef.current)

    return () => observer.disconnect()
  }, [])

  const highlights = [
    {
      icon: Code,
      title: "Frontend Optimisation",
      description:
        "Expert in React.js, Next.js, and modern JavaScript frameworks with a focus on performance and user experience.",
      color: "var(--color-electric-blue)",
    },
    {
      icon: Database,
      title: "Backend Scalability",
      description: "Proficient in Node.js, Express, and database design with MongoDB, PostgreSQL",
      color: "var(--color-warm-orange)",
    },
    {
      icon: Globe,
      title: "Database Management",
      description:
        "End-to-end application development and database integration.",
      color: "var(--color-navy)",
    },
    {
      icon: Zap,
      title: "Performance Focused",
      description: "Optimizing applications for speed, scalability, and maintainability using industry best practices.",
      color: "var(--color-electric-blue)",
    },
  ]

  const stats = [
    { icon: Award, value: "3+", label: "Years Experience", color: "var(--color-electric-blue)" },
    { icon: Users, value: "30+", label: "Projects Completed", color: "var(--color-warm-orange)" },
    { icon: Coffee, value: "10+", label: "Technologies", color: "var(--color-navy)" },
    { icon: Heart, value: "100%", label: "Satisfied Clients", color: "var(--color-electric-blue)" },
  ]

  const milestones = [
    {
      year: "Dec 2024",
      title: "Full Stack Developer (Remote)",
      description: "CareerOnTrack.ai",
    },
    {
      year: "Oct 2022",
      title: "Frontend Developer (Remote)",
      description: "iKooK UK",
    },
    {
      year: "June 2021",
      title: "First Role (intern)",
      description: "Sidehustle",
    },
    {
      year: "June 2019",
      title: "Bachelors' Degree",
      description: "Completed Bachelors' Degree",
    },
    {
      year: "Feb 2019",
      title: "Started Journey",
      description: "Started learning web development",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-background to-background relative overflow-hidden"
    >
      {/* Background Elements
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[color:var(--color-electric-blue)]/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-[color:var(--color-warm-orange)]/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div> */}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-display text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            About <span className="text-[color:var(--color-navy)]">Me</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            I'm a passionate, dedicated, and detail-oriented FullStack developer with over
             3 years of experience building robust, scalable and responsive web
            applications. I love turning complex problems into simple, beautiful, and intuitive solutions.
          </p>
        </div>

        {/* Highlights Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, index) => (
            <Card
              key={index}
              className={`p-6 text-center hover:shadow-xl transition-all duration-500 hover:scale-105 group cursor-pointer border-0 bg-card/50 backdrop-blur-sm ${
                visibleCards.includes(index) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 group-hover:scale-110 transition-all duration-300"
                style={{ backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)` }}
              >
                <item.icon
                  className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
                  style={{ color: item.color }}
                />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-[color:var(--color-navy)] transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Journey Section */}
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <h3 className="font-display text-2xl font-bold mb-6 text-[color:var(--color-navy)]">My Journey</h3>
              <div className="space-y-4 text-muted-foreground mb-8">
                <p>
                  Started my development journey 4+ years ago with a passion for creating digital experiences that
                  matter. I've worked with startups and established companies, building everything from e-commerce
                  platforms to SaaS applications.
                </p>
                <p>
                  My expertise spans the entire MERN stack, with additional experience in TypeScript, Next.js, MongoDB,
                  RestFul APIs, Node.js, Express.js
                  Vercel, netlify, AWS, etc. I believe in writing clean, maintainable code and following industry best
                  practices.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open source projects,
                  or sharing knowledge with the developer community.
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h4 className="font-display font-semibold mb-4 text-[color:var(--color-electric-blue)]">Timeline</h4>
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-3 rounded-lg hover:bg-accent/20 transition-all duration-300 ${
                      isVisible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[color:var(--color-navy)]/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-[color:var(--color-navy)]">{milestone.year}</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm">{milestone.description}</h5>
                      <p className="text-xs text-muted-foreground">{milestone.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <h4 className="font-display font-semibold mb-6 text-[color:var(--color-electric-blue)]">Quick Stats</h4>
              <div ref={statsRef} className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center p-6 bg-gradient-to-br from-card/50 to-muted/30 rounded-xl hover:scale-105 transition-all duration-300 group cursor-pointer border border-border/30 ${
                      visibleStats.includes(index) ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-center mb-2">
                      <stat.icon
                        size={20}
                        className="group-hover:scale-110 transition-transform duration-300"
                        style={{ color: stat.color }}
                      />
                    </div>
                    <div
                      className="font-display text-2xl font-bold group-hover:scale-110 transition-transform duration-300"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Skills Progress */}
              <div className="mt-8">
                <h4 className="font-display font-semibold mb-4 text-[color:var(--color-warm-orange)]">Core Skills</h4>
                <div className="space-y-3">
                  {[
                    "React.js" ,
                    "Next.js" ,
                    "Supabase",
                    "Prisma",
                    "Node.js" ,
                    "MongoDB" ,
                   "TypeScript" ,
                    "JavaScript" ,
                    "HTML5" ,
                   "CSS3",
                  ].map((skill, index) => (
                    <div
                      key={skill}
                      className={`transition-all duration-1000 ease-out ${
                        isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                      }`}
                      style={{ transitionDelay: `${1000 + index * 100}ms` }}
                    >
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{skill}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
