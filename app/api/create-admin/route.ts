import { NextResponse } from "next/server"
import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Only allow creation of specific admin account
    if (email !== "ziad.sakr40@gmail.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Create admin user document in Firestore
    await setDoc(doc(db, "admins", user.uid), {
      email: user.email,
      role: "admin",
      createdAt: new Date(),
      status: "active"
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error creating admin:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create admin" },
      { status: 500 }
    )
  }
}
