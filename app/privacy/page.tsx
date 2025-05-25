"use client"

import Link from "next/link"

function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">1. Information Collection</h2>
          <p>We collect information you provide directly to us, including but not limited to your name, email, location, and squash-related data.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">2. Use of Information</h2>
          <p>We use your information to provide, maintain, and improve our services, and to communicate with you about your account and updates.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">3. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">4. Data Sharing</h2>
          <p>We do not sell your personal information. We may share data with service providers who assist in our operations.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">6. Cookie Policy</h2>
          <p>We use cookies to enhance your experience and analyze our traffic. You can control cookie settings in your browser.</p>
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

export default PrivacyPage;
