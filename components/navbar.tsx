"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { href: "/core-insights", label: "Core Insights" },
    { href: "/core-hub", label: "Core Hub" },
    { href: "/core-connect", label: "Core Connect" },
    { href: "/memberships", label: "Memberships" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="text-2xl font-semibold tracking-tight">
              <span>Core</span>
              <span className="ml-1">Analytics.</span>
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-normal uppercase tracking-wide transition-colors ${
                pathname === route.href ? "text-primary font-medium" : "text-primary/80 hover:text-primary"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button asChild variant="outline" className="border-2 hover:bg-foreground hover:text-background transition-colors">
            <Link href="/auth/sign-in" target="_blank">Sign In</Link>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden py-4">
          <nav className="flex flex-col gap-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-normal uppercase tracking-wide transition-colors hover:text-primary ${
                  pathname === route.href ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <div className="mt-2">
              <ThemeToggle />
            </div>
            <Button asChild variant="outline" className="mt-2 border-2 hover:bg-foreground hover:text-background transition-colors">
              <Link href="/auth/sign-in" target="_blank" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

