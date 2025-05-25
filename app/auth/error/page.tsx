"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from 'next/link';

const errorMessages: { [key: string]: string } = {
  invalid_request: 'Invalid verification request. Please try again.',
  verification_failed: 'Email verification failed. Please request a new verification link.',
  user_not_found: 'User not found. Please contact support.',
  creation_failed: 'Failed to create user account. Please contact support.',
  server_error: 'Server error occurred. Please try again later.',
  unknown: 'An unknown error occurred. Please try again.',
};

function VerificationErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams?.get('error') || 'unknown';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-3xl font-bold tracking-tight text-red-600">Verification Failed</h1>
        <p className="mt-4 text-lg text-gray-600">
          {errorMessages[error]}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default function VerificationErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationErrorContent />
    </Suspense>
  );
}
