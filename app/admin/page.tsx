"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserList } from "@/components/admin/user-list"
import { TransactionList } from "@/components/admin/transaction-list"

export default function AdminPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser
      if (!user) {
        router.push("/")
        return
      }
      
      // Check if user exists in admins collection
      const adminDoc = await getDoc(doc(db, "admins", user.uid))
      if (!adminDoc.exists()) {
        router.push("/")
        return
      }
      setIsAdmin(true)
      setLoading(false)
    }

    checkAdmin()
  }, [router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserList />
        </TabsContent>
        <TabsContent value="transactions">
          <TransactionList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
