import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

type PlanType = 'starter' | 'performance' | 'pro';

const PLAN_FEATURES: Record<PlanType, { name: string; uploads: number; credits: number }> = {
  starter: {
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
    const { email, action, newPassword } = await request.json();
    console.log("[Debug-Fix-Auth] Received request:", { email, action });

    // Handle password update
    if (action === "update-password" && newPassword) {
      try {
        // Get Firebase Auth user
        const authUser = await adminAuth.getUserByEmail(email);

        // Force update password in Auth
        await adminAuth.updateUser(authUser.uid, {
          password: newPassword,
          emailVerified: true // Ensure email is verified
        });

        // Update password in Firestore
        await adminDb.collection("users").doc(email).update({
          password: newPassword,
          isEmailVerified: true
        });

        // Generate a custom token for immediate sign in
        const customToken = await adminAuth.createCustomToken(authUser.uid);

        return NextResponse.json({
          success: true,
          message: "Password updated successfully",
          customToken
        });
      } catch (error: any) {
        console.error("Error updating password:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    // Handle email verification
    if (action === "verify-email") {
      console.log("[Debug-Fix-Auth] Verifying email for:", email);
      const { force } = await request.json();
      
      // 1. Get user data from Firestore
      const userDoc = await adminDb.collection("users").doc(email).get();
      const userData = userDoc.data();

      if (!userData) {
        console.error("[Debug-Fix-Auth] User not found in Firestore:", email);
        return NextResponse.json({ error: "User not found in Firestore" }, { status: 404 });
      }

      // 2. Get or create Firebase Auth user
      let authUser;
      try {
        authUser = await adminAuth.getUserByEmail(email);
      } catch (error) {
        if (!force) {
          console.error("[Debug-Fix-Auth] User not found in Auth:", email);
          return NextResponse.json({ error: "User not found in Auth" }, { status: 404 });
        }
        
        // If force is true, create the user in Auth
        console.log("[Debug-Fix-Auth] Force creating user in Auth:", email);
        authUser = await adminAuth.createUser({
          email,
          emailVerified: true
        });
      }

      // 3. Update Auth user to mark email as verified
      await adminAuth.updateUser(authUser.uid, {
        emailVerified: true
      });
      console.log("[Debug-Fix-Auth] Updated Auth emailVerified status for:", email);

      // 4. Update Firestore user
      try {
        const userDoc = await adminDb.collection("users").doc(email).get();
        const userData = userDoc.data();
        const plan = (userData?.membershipPlan as PlanType) || 'starter';
        
        await adminDb.collection("users").doc(email).update({
          isEmailVerified: true,
          membershipPlan: plan,
          monthlyUploads: PLAN_FEATURES[plan].uploads,
          monthlyCredits: PLAN_FEATURES[plan].credits,
          usedUploads: userData?.usedUploads || 0,
          usedCredits: userData?.usedCredits || 0,
          subscriptionStatus: userData?.subscriptionStatus || 'active',
          paymentStatus: userData?.paymentStatus || 'completed'
        });
        console.log("[Debug-Fix-Auth] Updated Firestore user data for:", email);
      } catch (error) {
        if (force) {
          // If force is true and user doesn't exist in Firestore, create them
          console.log("[Debug-Fix-Auth] Force creating user in Firestore:", email);
          const plan = 'starter';
          await adminDb.collection("users").doc(email).set({
            email,
            isEmailVerified: true,
            uid: authUser.uid,
            createdAt: new Date().toISOString(),
            membershipPlan: plan,
            monthlyUploads: PLAN_FEATURES[plan].uploads,
            monthlyCredits: PLAN_FEATURES[plan].credits,
            usedUploads: 0,
            usedCredits: 0,
            subscriptionStatus: 'active',
            paymentStatus: 'completed'
          });
        } else {
          throw error;
        }
      }

      // 5. Generate a custom token for immediate sign in
      const customToken = await adminAuth.createCustomToken(authUser.uid);
      console.log("[Debug-Fix-Auth] Generated custom token for:", email);

      return NextResponse.json({
        success: true,
        message: "Email verified successfully",
        customToken
      });
    }

    // Handle other actions...
    // 1. Get user data from Firestore
    const userDoc = await adminDb.collection("users").doc(email).get();
    const userData = userDoc.data();

    if (!userData) {
      return NextResponse.json({ error: "User not found in Firestore" }, { status: 404 });
    }

    // 2. Get or create Firebase Auth user
    let authUser;
    try {
      authUser = await adminAuth.getUserByEmail(email);
    } catch (error) {
      // User doesn't exist in Auth, create them
      authUser = await adminAuth.createUser({
        email,
        password: userData.password,
        displayName: `${userData.firstName} ${userData.lastName}`,
        emailVerified: true // Force email verification since they clicked the link
      });
    }

    // 3. Update Auth user to mark email as verified
    await adminAuth.updateUser(authUser.uid, {
      emailVerified: true,
      displayName: `${userData.firstName} ${userData.lastName}`
    });

    // 4. Update Firestore user
    await adminDb.collection("users").doc(email).update({
      isEmailVerified: true,
      uid: authUser.uid
    });

    // 5. Generate a custom token for immediate sign in
    const customToken = await adminAuth.createCustomToken(authUser.uid);

    return NextResponse.json({
      success: true,
      message: "Auth fixed successfully",
      customToken,
      authUser: {
        uid: authUser.uid,
        email: authUser.email,
        emailVerified: authUser.emailVerified
      }
    });
  } catch (error: any) {
    console.error("Debug fix auth error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
