import type React from "react"
import { Metadata } from 'next'
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { NavigationWrapper } from "@/components/navigation/navigation-wrapper"
import "./globals.css"

const openSauceOne = localFont({
  src: [
    {
      path: '../public/fonts/OpenSauceOne-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSauceOne-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSauceOne-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSauceOne-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-open-sauce-one',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Core Analytics - Advanced Squash Analytics",
  description: "Professional squash analytics for players and coaches",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSauceOne.variable} font-open-sauce-one antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="bg-background text-foreground">
            <AuthProvider>
              <NavigationWrapper>
                {children}
              </NavigationWrapper>
            </AuthProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}