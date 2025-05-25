import Link from 'next/link';

export default function VerificationSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Email Verified!</h1>
        <p className="mt-4 text-lg text-gray-600">
          Your email has been successfully verified. You can now sign in to your account.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
