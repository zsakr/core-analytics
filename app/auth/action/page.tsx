"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function ActionPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Email Verification
        </h1>
        <div className="text-center space-y-4">
          <p className="text-lg mb-4">
            Almost done! Click the button below to complete your email verification.
          </p>
          <form action="/api/verify-email" method="POST">
            <input type="hidden" name="token" value={token || ''} />
            <Button 
              type="submit"
              size="lg"
              className="w-full py-6 text-lg font-semibold"
            >
              Click to Complete Verification
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ActionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ActionPageContent />
    </Suspense>
  );
}
