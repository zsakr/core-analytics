"use client"

import * as React from "react"
import Link from "next/link"
import { SignUpForm } from "@/components/auth/sign-up-form"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full">
        <div className="relative mb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl"></div>
          <div className="relative px-8 py-12 text-center max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px w-12 bg-primary/20"></div>
                <span className="text-sm font-medium uppercase tracking-wider text-primary/60">Core Analytics</span>
                <div className="h-px w-12 bg-primary/20"></div>
              </div>
              <h2 className="text-3xl font-semibold text-primary">Know what worked.</h2>
              <h2 className="text-3xl font-semibold text-primary/80">See what didn't.</h2>
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Every match, broken down for real improvement.
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 shadow-sm rounded-lg w-full max-w-[1400px] mx-auto">
          <SignUpForm />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="font-medium hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium hover:text-primary">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
