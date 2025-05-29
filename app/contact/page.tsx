"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react';
import { Mail } from "lucide-react"

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>Fill out the form below and we&apos;ll get back to you</CardDescription>
          </CardHeader>
          <CardContent>
            <form 
              className="space-y-4" 
              action="https://formspree.io/f/xjkgppbe" 
              method="POST"
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setFormStatus('idle');
                
                try {
                  const form = e.currentTarget;
                  const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                      'Accept': 'application/json'
                    }
                  });
                  
                  if (response.ok) {
                    setFormStatus('success');
                    form.reset();
                  } else {
                    setFormStatus('error');
                  }
                } catch (error) {
                  setFormStatus('error');
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input name="name" placeholder="Your name" required />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input name="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input name="subject" placeholder="How can we help?" required />
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea name="message" placeholder="Type your message here" className="h-32" required />
              </div>
              {formStatus === 'success' && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Thank you for your message! We'll get back to you soon.
                </p>
              )}
              {formStatus === 'error' && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  Something went wrong. Please try again later.
                </p>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ContactPage;
