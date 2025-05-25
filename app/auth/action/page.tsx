"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export default function ActionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"initial" | "verifying" | "success" | "error">("initial");
  const [error, setError] = useState<string>("");

  const handleContinue = async () => {
    try {
      setStatus("verifying");
      
      // Get email from auth
      const email = auth.currentUser?.email;
      if (!email) {
        setStatus("error");
        setError("Could not determine user email");
        return;
      }
      
      console.log("[Email Verification] Starting verification for:", email);

      // Call our debug-fix-auth endpoint to force update both Auth and Firestore
      const response = await fetch("/api/debug-fix-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          action: "verify-email",
          force: true
        })
      });
      
      console.log("[Email Verification] Debug-fix-auth response received");

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Sign in with the custom token if provided
      if (data.customToken) {
        await signInWithCustomToken(auth, data.customToken);
      }

      setStatus("success");
    } catch (err: any) {
      console.error("Error verifying email:", err);
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Email Verification
        </h1>

        {status === "initial" && (
          <div className="text-center space-y-4">
            <p className="text-lg mb-4">
              Almost done! Click the button below to complete your email verification.
            </p>
            <Button 
              onClick={handleContinue}
              size="lg"
              className="w-full py-6 text-lg font-semibold"
            >
              Click to Complete Verification
            </Button>
          </div>
        )}

        {status === "verifying" && (
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Verifying your email...</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center space-y-4">
            <div className="text-green-500 text-xl mb-4">
              ✓ Email verified successfully!
            </div>
            <p className="text-muted-foreground mb-4">
              You can now sign in to your account.
            </p>
            <Button 
              onClick={() => router.push("/auth/sign-in")}
              size="lg"
              className="w-full py-6 text-lg font-semibold"
            >
              Go to Sign In
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="text-center space-y-4">
            <div className="text-red-500 mb-4">
              Error: {error}
            </div>
            <Button 
              onClick={() => router.push("/auth/sign-in")}
              size="lg"
              className="w-full py-6 text-lg font-semibold"
            >
              Go to Sign In
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
