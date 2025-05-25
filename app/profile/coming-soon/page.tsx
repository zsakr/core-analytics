"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import CountdownTimer from '@/components/countdown-timer';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { CreditCard } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';

function ComingSoon() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState<any>(null);
  const router = useRouter();

  // Set target date to 40 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 40);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/auth/sign-in");
        return;
      }

      try {
        // Get user profile
        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);
        const profile = userSnap.data();
        setUserProfile(profile);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user profile");
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleCompletePayment = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: auth.currentUser?.uid,
          plan: userProfile?.membershipPlan 
        }),
      });
      const { url, error } = await response.json();
      if (error) {
        setError(error);
        return;
      }
      window.location.href = url;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to start checkout');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setIsLoading(true);
      await updateDoc(doc(db, "users", auth.currentUser?.uid || ''), {
        subscriptionStatus: "cancelled",
        cancelledAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      router.push("/memberships");
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to cancel subscription');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Icons.spinner className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-purple-900 to-black p-4">
      <div className="container max-w-4xl mx-auto space-y-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in">
            Thank you for being an early adopter of Core!
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We&apos;re working hard to bring you something amazing. Stay tuned for taking your game to the next level!
          </p>
        </div>
        
        <CountdownTimer targetDate={targetDate} />

        {userProfile?.subscriptionStatus === "pending" && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-white">Complete Your Subscription</h2>
              <p className="text-gray-300">
                Complete your subscription to get early access when we launch!
              </p>
            </div>

            <div className="border border-white/20 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center text-white">
                <div>
                  <h3 className="font-medium">Selected Plan</h3>
                  <p className="text-sm text-gray-300">{userProfile.membershipPlan}</p>
                </div>
                <Button
                  onClick={() => router.push('/memberships')}
                  variant="outline"
                  size="sm"
                >
                  Change Plan
                </Button>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleCompletePayment}
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CreditCard className="mr-2 h-4 w-4" />
                  )}
                  Complete Payment
                </Button>

                <Button
                  onClick={handleCancelSubscription}
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  Cancel Subscription
                </Button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-900/50 p-3 rounded">{error}</p>
            )}
          </div>
        )}
        
        <div className="mt-12 text-gray-400 text-sm text-center">
          Thank you for your patience!
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
