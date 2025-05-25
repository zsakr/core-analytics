"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageCircle, Phone, FileQuestion } from "lucide-react"

export default function Support() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Support Center</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Live Chat
            </CardTitle>
            <CardDescription>Chat with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Available Monday to Friday, 9 AM - 5 PM GMT</p>
            <Button>Start Chat</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Support
            </CardTitle>
            <CardDescription>Send us an email</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">support@coreanalytics.com</p>
            <Button variant="outline">Send Email</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileQuestion className="h-5 w-5" />
              FAQs
            </CardTitle>
            <CardDescription>Common questions and answers</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              <li>Account Setup</li>
              <li>Billing Questions</li>
              <li>Technical Issues</li>
              <li>Feature Requests</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Phone Support
            </CardTitle>
            <CardDescription>Call our support line</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">+44 (0) 20 1234 5678</p>
            <Button variant="outline">Schedule Call</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
