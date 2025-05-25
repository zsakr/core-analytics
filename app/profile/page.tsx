"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User, Package } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload } from 'lucide-react';

interface UserProfile {
  firstName: string;
  lastName: string;
  selectedPlan: string;
  planId: string;
  subscriptionStatus: string;
  paymentStatus: string;
  nextBillingDate: string;
  email: string;
  billingCycle: string;
  price: number;
}

const PLAN_UPLOADS = {
  starter: 6,
  performance: 10,
  pro: 25
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/auth/sign-in');
        return;
      }

      try {
        // Get the ID token
        const idToken = await user.getIdToken();

        // Call our API endpoint
        const response = await fetch('/api/get-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to fetch profile');
        }

        const { profile } = await response.json();
        setUserProfile(profile as UserProfile);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setError('Failed to fetch user profile');
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="container max-w-4xl mx-auto space-y-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            Thank you for being a part of our beginning
          </h1>
          <p className="text-lg text-muted-foreground">
          We’re excited to have you on board for the Beta Program and look forward to growing and shaping Core Analytics with you.          </p>
        </div>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="upload">Core Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="mt-6">
            <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" /> Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Name</Label>
                <p className="text-lg font-medium">
                  {userProfile?.firstName ? capitalizeFirstLetter(userProfile.firstName) : ''} {userProfile?.lastName ? capitalizeFirstLetter(userProfile.lastName) : ''}
                </p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="text-lg font-medium">
                  {userProfile?.email}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" /> Subscription Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Subscription Plan</Label>
                <p className="text-lg font-medium capitalize">
                  {userProfile?.selectedPlan || userProfile?.planId || 'No Plan'}
                  {userProfile?.price && ` ($${userProfile.price}/month)`}
                </p>
              </div>
              <div>
                <Label>Billing Cycle</Label>
                <p className="text-lg font-medium capitalize">
                  {userProfile?.billingCycle || 'Not set'}
                </p>
              </div>
              <div>
                <Label>Payment Status</Label>
                <p className="text-lg font-medium capitalize">
                  {userProfile?.paymentStatus || 'No payment information'}
                </p>
              </div>
              <div>
                <Label>Subscription Status</Label>
                <p className="text-lg font-medium capitalize">
                  {userProfile?.subscriptionStatus || 'No subscription'}
                </p>
              </div>
              {userProfile?.nextBillingDate && (
                <div>
                  <Label>Next Payment Date</Label>
                  <p className="text-lg font-medium">
                    {new Date(userProfile.nextBillingDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
            </div>
          </TabsContent>
          <TabsContent value="upload" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-center">
                  <Upload className="h-8 w-8" />
                  Coming Soon
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Our core upload feature is currently under development. We are releasing an update by June 17th. Stay tuned for updates!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProfilePage;
