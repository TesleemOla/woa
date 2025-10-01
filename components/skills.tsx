"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Code, Database, Settings, TrendingUp, Award, Brain, Rocket,  } from "lucide-react"

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCategories, setVisibleCategories] = useState<number[]>([])
  const [visibleSkills, setVisibleSkills] = useState<string[]>([])
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)

  const skillCategories = [
    {
      title: "Frontend",
      icon: Code,
      color: "var(--color-electric-blue)",
      bgColor: "color-mix(in srgb, var(--color-electric-blue) 10%, transparent)",
      skills: [
        { name: "React.js" },
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "JavaScript (ES6+)" },
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "Tailwind CSS" },
        { name: "Styled Components"},
        { name: "React-Redux" },
        { name: "Context API" },
        { name: "React Query" },
        { name: "Framer Motion" },
      ],
    },
    {
      title: "Backend",
      icon: Database,
      color: "var(--color-warm-orange)",
      bgColor: "color-mix(in srgb, var(--color-warm-orange) 10%, transparent)",
      skills: [
        { name: "Node.js"},
        { name: "Express.js" },
        { name: "MongoDB" },
        { name: "PostgreSQL" },
        { name: "MySQL" },
        { name: "Redis" },
        { name: "GraphQL" },
        { name: "REST APIs" },
        { name: "JWT Authentication" },
        { name: "Passport.js" },
        { name: "Socket.io"},
        { name: "Microservices" },
      ],
    },
    {
      title: "Tools & DevOps",
      icon: Settings,
      color: "var(--color-navy)",
      bgColor: "color-mix(in srgb, var(--color-navy) 10%, transparent)",
      skills: [
        { name: "Git" },
        { name: "AWS" },
        { name: "Vercel" },
        { name: "Netlify" },
        { name: "Vite" },
        { name: "ESLint" },
        { name: "Prettier" },
        { name: "Postman" },
        { name: "Figma to UI" },
      ],
    },
  ]

  const learningSkills = [
     {name: "GraphQL", icon: TrendingUp },
    { name: "AI Dev", icon: Brain },
    { name: "Web3", icon: Rocket },
    { name: "Blockchain", icon: Award }
   
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setIsVisible(true)
          }
          if (entry.target === categoriesRef.current && entry.isIntersecting) {
            skillCategories.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCategories((prev) => [...prev, index])
                // Animate skills within each category
                setTimeout(() => {
                  skillCategories[index].skills.forEach((skill, skillIndex) => {
                    setTimeout(() => {
                      setVisibleSkills((prev) => [...prev, `${index}-${skillIndex}`])
                    }, skillIndex * 50)
                  })
                }, 300)
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (categoriesRef.current) observer.observe(categoriesRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[color:var(--color-electric-blue)]/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-[color:var(--color-warm-orange)]/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-display text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Technical <span className="text-[color:var(--color-navy)]">Skills</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            My comprehensive toolkit for building modern, scalable web applications
          </p>
        </div>

        {/* Skills Categories */}
        <div ref={categoriesRef} className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className={`p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 group cursor-pointer bg-card/50 backdrop-blur-sm border-border/50 ${
                visibleCategories.includes(index) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-2 rounded-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: category.bgColor }}
                  >
                    <category.icon
                      className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
                      style={{ color: category.color }}
                    />
                  </div>
                  <h3 className="font-display text-xl font-bold group-hover:text-[color:var(--color-navy)] transition-colors">
                    {category.title}
                  </h3>
                </div>
                <div
                  className="w-12 h-1 rounded-full transition-all duration-500 group-hover:w-20"
                  style={{ backgroundColor: category.color }}
                />
              </div>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className={`transition-all duration-500 ${
                      visibleSkills.includes(`${index}-${skillIndex}`)
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${skillIndex * 50}ms` }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>

                    </div>
                    
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Learning Section */}
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <Card className="p-8 bg-gradient-to-r from-card/50 to-muted/20 backdrop-blur-sm border-border/50">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Brain className="w-8 h-8 text-[color:var(--color-electric-blue)]" />
                <h3 className="font-display text-2xl font-bold">Always Learning</h3>
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Technology evolves rapidly, and so do I. Currently exploring cutting-edge technologies to stay at the
                forefront of development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`p-4 rounded-lg bg-card/30 hover:bg-card/90 transition-all duration-300 hover:scale-105 group ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${1000 + index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <skill.icon className="w-5 h-5 text-[color:var(--color-warm-orange)] group-hover:rotate-12 transition-transform" />
                    <span className="font-medium">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
