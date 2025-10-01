"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <div className="relative min-h-screen">
      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-background flex items-center justify-center transition-all duration-500 ${
          isLoading ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-[color:var(--color-electric-blue)]/20 rounded-full"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-[color:var(--color-electric-blue)] rounded-full animate-spin"></div>
          </div>
          <div className="text-sm text-muted-foreground animate-pulse">Loading...</div>
        </div>
      </div>

      {/* Page Content */}
      <div
        className={`transition-all duration-500 ${isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
      >
        {displayChildren}
      </div>
    </div>
  )
}
