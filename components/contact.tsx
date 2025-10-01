"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send, Clock, MessageCircle, CheckCircle, Github, Linkedin, Twitter } from "lucide-react"
import emailjs from "@emailjs/browser";

export function Contact() {


  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleElements, setVisibleElements] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setIsVisible(true)
          }
          if (entry.target === formRef.current && entry.isIntersecting) {
            ;[0, 1, 2, 3, 4].forEach((index) => {
              setTimeout(() => {
                setVisibleElements((prev) => [...prev, index])
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (formRef.current) observer.observe(formRef.current)

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

   
     emailjs
       .sendForm(
         process.env.NEXT_PUBLIC_SERVICE_ID!,
         process.env.NEXT_PUBLIC_TEMPLATE_ID!,
         formRef.current!,
         { publicKey: process.env.NEXT_PUBLIC_EMAILJS_KEY!}
       )
       .then(
         (result) => {
          console.log(result, "sent")
           setIsSubmitting(false);
           formRef.current = null
            setIsSubmitted(true);
         },
         (error) => {
           setIsSubmitting(false);
           console.log(error.text);
         }
       );
  }


  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "oladepotesleem5@gmail.com",
      href: "mailto:oladepotesleem5@gmail.com",
      color: "var(--color-electric-blue)",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+234 703 865 5608",
      href: "tel:+2347038655608",
      color: "var(--color-warm-orange)",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Nigeria",
      href: "#",
      color: "var(--color-navy)",
    },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[color:var(--color-electric-blue)]/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-[color:var(--color-warm-orange)]/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
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
            Let's <span className="text-[color:var(--color-navy)]">Connect</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`space-y-8 transition-all duration-1000 ease-out ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div>
              <h3 className="font-display text-2xl font-bold mb-6 text-[color:var(--color-electric-blue)]">
                Get In Touch
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects. Whether you're a startup looking to
                build your MVP or an established company needing to scale your application, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg hover:bg-accent/20 transition-all duration-300 hover:scale-105 group cursor-pointer ${
                    isVisible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                  onClick={() => info.href !== "#" && window.open(info.href, "_blank")}
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `color-mix(in srgb, ${info.color} 15%, transparent)` }}
                  >
                    <info.icon
                      className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                      style={{ color: info.color }}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-[color:var(--color-navy)] transition-colors">
                      {info.title}
                    </h4>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: "900ms" }}
            >
              <h4 className="font-semibold mb-4 text-[color:var(--color-warm-orange)]">Connect on Social</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-accent/20 text-muted-foreground hover:text-[color:var(--color-electric-blue)] hover:bg-[color:var(--color-electric-blue)]/10 transition-all duration-300 hover:scale-110 group"
                    aria-label={social.label}
                  >
                    <social.icon size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Response Card */}
            <Card
              className={`p-6 bg-gradient-to-r from-card/50 to-muted/20 backdrop-blur-sm border-border/50 transition-all duration-1000 ease-out ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[color:var(--color-electric-blue)] mt-1" />
                <div>
                  <h4 className="font-display font-semibold mb-2">Quick Response</h4>
                  <p className="text-muted-foreground text-sm">
                    I typically respond to messages within 24 hours. For urgent inquiries, feel free to call or connect
                    with me on LinkedIn.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
       
            <Card
              className={`p-8 bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-1000 ease-out ${
                visibleElements.includes(0) ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
                  <div className="flex items-center gap-3 mb-6">
                    <MessageCircle className="w-6 h-6 text-[color:var(--color-electric-blue)]" />
                    <h3 className="font-display text-xl font-bold">Send a Message</h3>
                  </div>

                  <div
                    className={`grid md:grid-cols-2 gap-4 transition-all duration-500 ${
                      visibleElements.includes(1) ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Your full name"
                        className="bg-background/50 placeholder:text-foreground/40 border-border/50 focus:border-[color:var(--color-electric-blue)] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        className="bg-background/50 placeholder:text-foreground/40 border-border/50 focus:border-[color:var(--color-electric-blue)] transition-colors"
                      />
                    </div>
                  </div>

                  <div
                    className={`transition-all duration-500 ${
                      visibleElements.includes(2) ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  >
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      placeholder="What's this about?"
                      className="bg-background/50 placeholder:text-foreground/40 border-border/50 focus:border-[color:var(--color-electric-blue)] transition-colors"
                    />
                  </div>

                  <div
                    className={`transition-all duration-500 ${
                      visibleElements.includes(3) ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  >
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell me about your project, timeline, and any specific requirements..."
                      className="bg-background/50 placeholder:text-foreground/40 border-border/50 focus:border-[color:var(--color-electric-blue)] transition-colors resize-none"
                    />
                  </div>

                  <div
                    className={`transition-all duration-500 ${
                      visibleElements.includes(4) ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-foreground text-background border-2 border-transparent cursor-pointer hover:bg-background hover:text-foreground hover:border-foreground transition-all duration-300 hover:scale-105 group"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`mt-20 pt-8 border-t text-center transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <p className="text-muted-foreground">
            © 2025 Tesleem Oladepo. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
    </section>
  )
}
