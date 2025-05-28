import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { type ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"
import Stripe from "stripe"
import { doc, updateDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY")
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("Missing STRIPE_WEBHOOK_SECRET")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil" as const,
  typescript: true,
} as any)

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature") || ""

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    )
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    console.log("Received Stripe webhook event:", event.type)

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.client_reference_id
        console.log("Processing checkout.session.completed", { 
          sessionId: session.id,
          userId,
          metadata: session.metadata,
          clientReferenceId: session.client_reference_id
        })

        if (!userId) {
          console.error("No client_reference_id found in session")
          return NextResponse.json(
            { error: "No client_reference_id found in session" },
            { status: 400 }
          )
        }

        // Get subscription and customer details
        const subscription = session.subscription
          ? await stripe.subscriptions.retrieve(session.subscription as string) as unknown as {
              id: string;
              current_period_end: number;
              current_period_start: number;
              cancel_at_period_end: boolean;
              items: { data: Array<{ price: { id: string; nickname?: string; unit_amount?: number } }> };
            }
          : null;

        if (!subscription) {
          console.error("No subscription found for session", session.id);
          return NextResponse.json(
            { error: "No subscription found" },
            { status: 400 }
          );
        }

        // Get plan details from the subscription
        const plan = subscription.items.data[0].price;
        const planId = plan.id;
        const planName = plan.nickname?.toLowerCase() || 'starter';

        // Calculate next billing date from Unix timestamp
        const nextBillingDate = new Date(subscription.current_period_end * 1000).toISOString();

        // Store payment data in Firestore
        await setDoc(doc(db, "stripe_payments", session.id), {
          id: session.id,
          amount: subscription.items.data[0].price.unit_amount,
          currency: session.currency,
          status: session.status,
          email: session.customer_details?.email,
          created: session.created,
          metadata: {
            plan: planName,
            userId: userId
          }
        });

        // Update user's subscription status in Firestore
        await updateDoc(doc(db, "users", userId), {
          subscriptionStatus: "active",
          paymentStatus: "completed",
          stripeCustomerId: session.customer,
          stripeSubscriptionId: subscription.id,
          membershipPlan: planName,
          stripePriceId: planId,
          nextBillingDate: nextBillingDate,
          currentPeriodStart: new Date(subscription.current_period_start * 1000).toISOString(),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          updatedAt: new Date().toISOString()
        });

        // Send confirmation email
        try {
          const customer = await stripe.customers.retrieve(session.customer as string) as Stripe.Customer;
          
          if (customer.deleted) {
            throw new Error('Customer has been deleted');
          }

          const emailData = {
            to: customer.email || '',
            template: 'subscription-confirmation',
            data: {
              planName: planName,
              amount: (subscription.items.data[0].price.unit_amount || 0) / 100,
              nextBillingDate: new Date(subscription.current_period_end * 1000).toLocaleDateString(),
              customerName: customer.name || customer.email || 'Valued Customer'
            }
          };

          // Send email using your email service
          await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailData)
          });
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
          // Don't throw error, continue with the subscription update
        }

        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata.userId

        if (!userId) {
          console.error("No userId found in subscription metadata")
          return NextResponse.json(
            { error: "No userId found in subscription metadata" },
            { status: 400 }
          )
        }

        // Update user's subscription status
        await updateDoc(doc(db, "users", userId), {
          subscriptionStatus: "cancelled",
          updatedAt: new Date().toISOString()
        })

        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as any
        if (!invoice.subscription || typeof invoice.subscription !== 'string') {
          console.error("No subscription ID found in invoice")
          return NextResponse.json(
            { error: "No subscription ID found in invoice" },
            { status: 400 }
          )
        }
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription)
        const userId = subscription.metadata.userId

        if (!userId) {
          console.error("No userId found in subscription metadata")
          return NextResponse.json(
            { error: "No userId found in subscription metadata" },
            { status: 400 }
          )
        }

        // Update user's subscription status
        await updateDoc(doc(db, "users", userId), {
          subscriptionStatus: "payment_failed",
          updatedAt: new Date().toISOString()
        })

        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error handling webhook:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    )
  }
}
