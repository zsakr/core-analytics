import { redirect } from "next/navigation"

export default function UploadPage() {
  // Redirect to dashboard since we're removing the 11AI page
  redirect("/dashboard")
}

