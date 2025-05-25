"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithCustomToken, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DebugPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleFix = async () => {
    try {
      // Call the debug-fix-auth endpoint
      const response = await fetch("/api/debug-fix-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }

      // Sign in with the custom token
      if (data.customToken) {
        await signInWithCustomToken(auth, data.customToken);
      }

      setResult(data);
      setError("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      // First sign in with current password
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      
      // Then update password in both Auth and Firestore
      const response = await fetch("/api/debug-fix-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          newPassword,
          action: "update-password"
        })
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }

      setResult({ message: "Password updated successfully" });
      setError("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Auth</h1>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Fix Auth Status</h2>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email to fix"
          />
          <Button onClick={handleFix}>Fix Auth</Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Update Password</h2>
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <Button onClick={handleUpdatePassword}>Update Password</Button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded">
            {error}
          </div>
        )}

        {result && (
          <div className="p-4 bg-green-50 text-green-600 rounded">
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
