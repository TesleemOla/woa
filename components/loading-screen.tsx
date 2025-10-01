"use client"

import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[color:var(--color-electric-blue)]/20 rounded-full"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[color:var(--color-electric-blue)] rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-[color:var(--color-navy)] mb-2">Tesleem Oladepo</h2>
          <p className="text-sm text-muted-foreground animate-pulse">Loading Portfolio...</p>
        </div>
      </div>
    </div>
  )
}
