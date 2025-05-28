"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const PLANS = {
  'core-beta': {
    name: 'Core Beta',
    price: 44.99,
    description: 'Perfect for beginners looking to improve their game',
    uploads: 6,
    credits: 3,
    features: [
      'Basic match analysis',
      'Core Connect',
      'One Time 3 credits included',
    ]
  },
  performance: {
    name: 'Performance',
    price: 64.99,
    description: 'For serious players wanting to elevate their performance',
    uploads: 10,
    credits: 3,
    features: [
      'All Core Beta features',
      'Core Academy access',
      'AI Squash Coach Chat',
      '3 monthly credits ($15 value)',
    ]
  },
  pro: {
    name: 'Pro',
    price: 99.99,
    description: 'For professionals and elite players',
    uploads: 25,
    credits: 6,
    features: [
      'All Performance features',
      'Priority support',
      'Advanced analytics',
      '6 monthly credits ($30 value)',
    ]
  }
};

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async (planId: string) => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        router.push('/auth/sign-in?redirect=/pricing');
        return;
      }

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: planId,
          userId: user.uid,
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black p-4">
      <div className="container max-w-6xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the perfect plan to enhance your squash game with Core Analytics
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {Object.entries(PLANS).map(([id, plan]) => (
            <Card key={id} className="relative overflow-hidden border-2 hover:border-primary/50 transition-all">
              {id === 'performance' && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm rounded-bl-lg">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{plan.uploads} uploads per month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{plan.credits} credits per month</span>
                  </div>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handleSubscribe(id)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Subscribe Now'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300">
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}
