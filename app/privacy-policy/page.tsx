"use client"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Account information (name, email, etc.)</li>
            <li>Profile information</li>
            <li>Match data and analytics</li>
            <li>Communication preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Provide and improve our services</li>
            <li>Personalize your experience</li>
            <li>Analyze performance trends</li>
            <li>Send you updates and communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information, including:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Encryption of sensitive data</li>
            <li>Regular security audits</li>
            <li>Access controls and authentication</li>
            <li>Secure data storage</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Access your personal data</li>
            <li>Request data correction</li>
            <li>Delete your account</li>
            <li>Opt-out of communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mt-2">privacy@coreanalytics.com</p>
        </section>
      </div>
    </div>
  )
}
