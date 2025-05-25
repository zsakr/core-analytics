import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

type PlanType = 'core-beta' | 'performance' | 'pro';

const PLAN_FEATURES: Record<PlanType, { name: string; uploads: number; credits: number }> = {
  'core-beta': {
    name: 'Core Beta',
    uploads: 6,
    credits: 3,
  },
  performance: {
    name: 'Performance',
    uploads: 10,
    credits: 3,
  },
  pro: {
    name: 'Pro',
    uploads: 25,
    credits: 6,
  }
};

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    console.log("[Update-User-Usage] Updating usage fields for:", email);

    // Get user data
    const userDoc = await adminDb.collection("users").doc(email).get();
    const userData = userDoc.data();

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get or set plan
    const plan = (userData.membershipPlan as PlanType) || 'core-beta';
    
    // Update user with usage fields
    await adminDb.collection("users").doc(email).update({
      membershipPlan: plan,
      monthlyUploads: PLAN_FEATURES[plan].uploads,
      monthlyCredits: PLAN_FEATURES[plan].credits,
      usedUploads: userData.usedUploads || 0,
      usedCredits: userData.usedCredits || 0,
      subscriptionStatus: userData.subscriptionStatus || 'active',
      paymentStatus: userData.paymentStatus || 'completed'
    });

    console.log("[Update-User-Usage] Successfully updated usage fields for:", email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Update-User-Usage] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
