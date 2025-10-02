"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Code, Database, Server, Code2Icon, FileJson } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const techStack = [
    { icon: Code, name: "React.js", delay: "0ms" },
    {icon: FileJson , name: "Next.js", delay: "200ms"},
    { icon: Server, name: "Node.js", delay: "200ms" },
    { icon: Database, name: "MongoDB", delay: "400ms" },
  ]

  return (
    <section className="min-h-screen pt-40 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-background/95">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, var(--color-electric-blue) 0%, transparent 50%)`,
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.05'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[color:var(--color-electric-blue)]/20 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <div className="space-y-8">
          {/* Main Heading with Staggered Animation */}
          <div className="space-y-4">
            <h1 className="font-display text-5xl md:text-7xl font-bold">
              <span
                className={`inline-block text-foreground transition-all duration-1000 ease-out ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Hi, I'm W.O.Abdul
              </span>
            </h1>
            <h2
              className={`font-display text-2xl md:text-3xl text-muted-foreground transition-all duration-1000 ease-out ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              A FullStack{" "}
              <span className="text-[color:var(--color-warm-orange)] font-semibold relative">
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[color:var(--color-warm-orange)] animate-pulse" />
              </span>{" "}
              Developer
            </h2>
          </div>

          {/* Description */}
          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            Crafting scalable web applications with{" "}
            <span className="text-[color:var(--color-electric-blue)] font-semibold">
              4+ years
            </span>{" "}
            of experience in React.js and Node.js. Passionate about clean code,
            user experience, and modern technologies.
          </p>

          {/* Tech Stack Icons */}
          <div
            className={`flex items-center justify-center gap-8 py-4 transition-all duration-1000 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "1000ms" }}
          >
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent/50 transition-all duration-300 hover:scale-110"
                style={{ animationDelay: tech.delay }}
              >
                <tech.icon
                  size={32}
                  className="text-[color:var(--color-electric-blue)] group-hover:text-[color:var(--color-warm-orange)] transition-colors duration-300"
                />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex items-center justify-center gap-4 flex-wrap transition-all duration-1000 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "1200ms" }}
          >
            <Link href="/projects">
              <Button
                size="lg"
                className="bg-foreground text-background border-2 border-transparent hover:bg-background hover:text-foreground hover:border-foreground cursor-pointer duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  View My Work
                </span>
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-[color:var(--color-electric-blue)] text-[color:var(--color-electric-blue)]  hover:scale-105 bg-transparent"
              >
                Let's Talk
              </Button>
            </Link>
          </div>

          {/* Social Links */}
          {/* <div
            className={`flex items-center justify-center gap-6 pt-8 my-5 transition-all duration-1000 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "1400ms" }}
          >
            {[
              {
                icon: Github,
                href: "https://github.com/TesleemOla",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/tesleemoladepo/",
                label: "LinkedIn",
              },
              { icon: Mail, href: "mailto:oladepotesleem5@gmail.com", label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className={`group p-3 rounded-full ${social.label === "GitHub"? "text-white bg-black": social.label === "LinkedIn" ? "text-white bg-blue-800 rounded-none": "bg-red-600 text-white"} hover:text-[color:var(--color-electric-blue)] hover:bg-[color:var(--color-electric-blue)]/10 transition-all duration-300 hover:scale-110`}
                aria-label={social.label}
              >
                <social.icon
                  size={24}
                  className="group-hover:scale-125 transition-transform duration-300"
                />
              </a>
            ))}
          </div>*/}
        </div>

        {/* Scroll Indicator */}
        <Link href="/about">
          <button
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full text-muted-foreground hover:text-[color:var(--color-electric-blue)] transition-all duration-300 hover:scale-110 ${
              isLoaded ? "animate-bounce" : ""
            }`}
            style={{ animationDelay: "1600ms" }}
          >
            <ArrowDown size={24} />
          </button>
        </Link>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[color:var(--color-electric-blue)]/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[color:var(--color-warm-orange)]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </section>
  );
}
