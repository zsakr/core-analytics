"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Documentation() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Documentation</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Learn the basics of Core Analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              <li>Platform Overview</li>
              <li>Setting Up Your Account</li>
              <li>First Match Analysis</li>
              <li>Understanding Your Dashboard</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Features</CardTitle>
            <CardDescription>Dive deep into analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              <li>Performance Metrics</li>
              <li>AI-Powered Insights</li>
              <li>Custom Reports</li>
              <li>Team Management</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Reference</CardTitle>
            <CardDescription>Integrate with our platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              <li>Authentication</li>
              <li>Endpoints</li>
              <li>Rate Limits</li>
              <li>Example Code</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Practices</CardTitle>
            <CardDescription>Get the most out of Core Analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              <li>Match Recording Tips</li>
              <li>Data Analysis Guide</li>
              <li>Performance Optimization</li>
              <li>Training Recommendations</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
