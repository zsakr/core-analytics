"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isProfilePage = pathname?.startsWith('/profile')

  return (
    <div className="min-h-screen flex flex-col">
      {!isProfilePage && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isProfilePage && <Footer />}
    </div>
  )
}
