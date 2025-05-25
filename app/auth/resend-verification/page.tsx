'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ResendVerificationPage() {
  const searchParams = useSearchParams();
  const email = searchParams?.get('email');
  const [status, setStatus] = useState('idle');

  const resendVerification = async () => {
    if (!email) return;

    try {
      setStatus('loading');
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to resend verification email');
      }

      setStatus('success');
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Email Verification
        </h2>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                {status === 'success'
                  ? 'Verification email has been sent!'
                  : `Click below to resend verification email to ${email}`}
              </p>
              {status === 'error' && (
                <p className="text-red-600 mb-4">
                  Failed to send verification email. Please try again.
                </p>
              )}
              <button
                onClick={resendVerification}
                disabled={status === 'loading' || status === 'success'}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  status === 'loading' || status === 'success'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
              >
                {status === 'loading'
                  ? 'Sending...'
                  : status === 'success'
                  ? 'Email Sent!'
                  : 'Resend Verification Email'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
