import { NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/lib/firebase-admin";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    try {
      // Check if user exists in Firebase Auth
      const userRecord = await adminAuth.getUserByEmail(email);
      if (userRecord) {
        return NextResponse.json(
          { exists: true, message: "Email address is already registered" },
          { status: 200 }
        );
      }
    } catch (error: any) {
      // If error code is auth/user-not-found, the email is available
      if (error.code === 'auth/user-not-found') {
        // Check if user exists in Firestore
        const userDoc = await adminDb.collection("users").doc(email).get();
        if (userDoc.exists) {
          return NextResponse.json(
            { exists: true, message: "Email address is already registered" },
            { status: 200 }
          );
        }

        // Check if user exists in tempUsers (signup in progress)
        const tempUserDoc = await adminDb.collection("tempUsers").doc(email).get();
        if (tempUserDoc.exists) {
          return NextResponse.json(
            { exists: true, message: "Email address is already in use" },
            { status: 200 }
          );
        }

        // Email is available
        return NextResponse.json(
          { exists: false, message: "Email address is available" },
          { status: 200 }
        );
      }

      // For other errors, return server error
      console.error("Error checking email:", error);
      return NextResponse.json(
        { error: "Failed to check email" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Error in check-email route:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
