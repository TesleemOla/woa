"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "glass-effect border-b border-white/20 shadow-2xl shadow-pink-500/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <div className="font-display font-bold text-2xl transition-all duration-300 group-hover:scale-105 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-pink-400 group-hover:text-cyan-400 transition-colors animate-pulse" />
              <span className="gradient-text group-hover:animate-pulse">W.O.A</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-300  hover:scale-105 ${
                  isActive(item.href) ? "text-pink-400" : "text-muted-foreground"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-400 to-cyan-400 animate-in slide-in-from-left-full duration-300 shadow-lg shadow-pink-400/50" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/0 via-pink-400/10 to-cyan-400/0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link href="/contact">
              <Button className="bg-foreground text-background border-2 border-transparent hover:bg-background hover:text-foreground hover:border-foreground transition-all duration-300 hover:scale-105">
                <Sparkles className="w-4 h-4 mr-2" />
                Get In Touch
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-pink-400 transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              />
              <X
                className={`absolute inset-0 transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`}
              />
            </div>
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 pb-2 space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-pink-400 hover:scale-105 ${
                  isActive(item.href) ? "bg-white/10 text-foreground shadow-lg shadow-pink-400/20" : "text-foreground/90"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMobileMenuOpen ? "slideInFromRight 0.3s ease-out forwards" : "none",
                }}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-foreground text-background border-2 border-transparent hover:bg-background/30 hover:border-foreground">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-background backdrop-blur-sm -z-10"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  )
}
