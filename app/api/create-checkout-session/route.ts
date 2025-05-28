import { NextResponse } from 'next/server'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-04-30.basil' as const,
  typescript: true
} as any)

// TODO: Replace these with your actual Stripe price IDs
const PLAN_PRICES = {
  'core-beta': {
    priceId: 'price_1RCYfqK9Ur9Sau8fCbya6WRG', // $44.99/month
    name: 'Core Beta Plan',
    price: 14.99,
    interval: 'month'
  },
  'performance': {
    priceId: 'price_1RO4HTK9Ur9Sau8fuEYj8xVo', // $64.99/month
    name: 'Performance Plan',
    price: 64.99,
    interval: 'month'
  },
  'pro': {
    priceId: 'price_1RO4HzK9Ur9Sau8fFzEe0yj0', // $99.99/month
    name: 'Pro Plan',
    price: 99.99,
    interval: 'month'
  },
  'team-core-beta': {
    priceId: 'price_1RO4JUK9Ur9Sau8fcNqAj5V6', // $249/month
    name: 'Team Core Beta Plan',
    price: 249,
    interval: 'month'
  },
  'team-performance': {
    priceId: 'price_1RO4KLK9Ur9Sau8fCOp28os4', // $349/month
    name: 'Team Performance Plan',
    price: 349,
    interval: 'month'
  },
  'team-pro': {
    priceId: 'price_1RO4KpK9Ur9Sau8fz0wnTYSb', // $499/month
    name: 'Team Pro Plan',
    price: 499,
    interval: 'month'
  },
} as const

export async function POST(request: Request) {
  console.log('Starting checkout session creation...')
  try {
    const { plan, userId } = await request.json()
    console.log('Received checkout request:', { plan, userId })

    if (!plan || !userId) {
      return NextResponse.json(
        { error: 'Missing plan or userId' },
        { status: 400 }
      )
    }

    const planConfig = PLAN_PRICES[plan as keyof typeof PLAN_PRICES]
    console.log('Plan config:', planConfig)
    if (!planConfig) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      )
    }

    console.log('Creating Stripe session with config:', {
      userId,
      planName: planConfig.name,
      price: planConfig.price,
      priceId: planConfig.priceId
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: planConfig.name,
            description: `${planConfig.name} - ${planConfig.interval}ly subscription`,
          },
          unit_amount: Math.round(planConfig.price * 100),
          recurring: {
            interval: planConfig.interval,
          },
        },
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/memberships?canceled=true`,
      client_reference_id: userId,
      metadata: {
        userId,
        planId: planConfig.priceId,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Detailed error:', {
      errorMessage,
      env: {
        hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
        appUrl: process.env.NEXT_PUBLIC_APP_URL
      }
    })
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
