"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

function AuthPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/core-insights")
  }, [])

  return null
}

export default AuthPage;
