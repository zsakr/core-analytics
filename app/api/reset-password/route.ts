import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Generate a password reset link
    const link = await adminAuth.generatePasswordResetLink(email);

    return NextResponse.json({ 
      success: true,
      message: "Password reset email sent",
      link // Only for testing, remove in production
    });
  } catch (error: any) {
    console.error("Error sending password reset:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
