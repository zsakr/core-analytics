'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function ProfileNavbar() {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user?.email) {
        const userDoc = await getDoc(doc(db, 'users', user.email));
        const userData = userDoc.data();
        if (userData?.firstName) {
          setFirstName(userData.firstName);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="text-2xl font-semibold tracking-tight">
              <span>Core</span>
              <span className="ml-1">Analytics.</span>
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link 
            href="/profile" 
            className="flex items-center gap-1 text-sm font-normal tracking-wide transition-colors text-primary/80 hover:text-primary"
          >
            <User className="h-4 w-4" />
            <span>Hi, {firstName ? capitalizeFirstLetter(firstName) : 'there'}</span>
          </Link>
          <ThemeToggle />
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="border-2 hover:bg-foreground hover:text-background transition-colors"
          >
            Sign Out
          </Button>
        </nav>
      </div>
    </header>
  );
}
