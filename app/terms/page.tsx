"use client"

import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using Core Analytics, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">2. Services Description</h2>
          <p>Core Analytics provides squash match analysis and performance tracking services through our platform.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">3. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">4. Subscription and Payments</h2>
          <p>Subscription fees are charged based on the selected plan. All payments are processed securely through our payment provider.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">5. Content Usage</h2>
          <p>Users retain ownership of their content while granting Core Analytics license to use it for service provision.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">6. Service Modifications</h2>
          <p>Core Analytics reserves the right to modify or discontinue services with reasonable notice to users.</p>
        </section>

        <div className="mt-8 border-t pt-6">
          <p className="text-sm">Last updated: May 18, 2025</p>
          <Link href="/" className="text-sm text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
