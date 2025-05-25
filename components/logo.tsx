"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Logo({ size = 32 }: { size?: number }) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render the logo client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ width: size, height: size }} />
  }

  return (
    <div
      className="relative flex items-center justify-center bg-primary text-primary-foreground rounded-full"
      style={{ width: size, height: size }}
    >
      <span className="font-bold text-xs">CA</span>
    </div>
  )
}

