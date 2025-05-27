import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import Stripe from "stripe";
import { getFirebaseApp } from '@/lib/firebase-app';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil" as const,
});

export async function POST(request: Request) {
  try {
    // Initialize Firebase
    getFirebaseApp();
    const body = await request.json();
    const { planId, billingCycle, price, planName, email } = body;

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(price) * 100), // Convert to cents
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        planId,
        billingCycle,
        planName,
        email,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
