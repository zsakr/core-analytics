import { Metadata } from "next"
import Link from "next/link"
import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In - Core Analytics",
  description: "Sign in to your Core Analytics account",
}

export default function SignInPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 lg:flex dark:border-r">
        <div className="absolute inset-0 bg-electric-gradient dark:opacity-90" />
        <div className="relative z-20 text-lg font-medium leading-relaxed text-black dark:text-white">
          From squash footage to feedback in minutes — Core AI shows you what happened, why it happened, and what others miss: patterns, pressure, and performance
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-black dark:text-white">
              "Core Analytics has transformed how I analyze and optimize my squash performance."
            </p>
            <footer className="text-sm text-black dark:text-white">Tarek Moamen, Former World Number 1</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>
          <SignInForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/auth/sign-up" className="hover:text-brand underline underline-offset-4">
              Don&apos;t have an account? Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
