"use client"

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using Core Analytics, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
          <p>Core Analytics provides:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Performance analytics tools</li>
            <li>Match analysis features</li>
            <li>Training recommendations</li>
            <li>Team management tools</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <p>Users must:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Maintain accurate account information</li>
            <li>Protect account credentials</li>
            <li>Comply with usage guidelines</li>
            <li>Respect intellectual property rights</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Subscription and Billing</h2>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Subscription terms and renewal</li>
            <li>Payment processing</li>
            <li>Refund policy</li>
            <li>Plan changes and cancellation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p>Core Analytics is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from the use of our services.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Users will be notified of significant changes.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
          <p>For questions about these Terms, contact us at:</p>
          <p className="mt-2">legal@coreanalytics.com</p>
        </section>
      </div>
    </div>
  )
}
