"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
  ageCategory: string
  city: string
  country: string
  subscriptionStatus: string
  paymentStatus: string
  selectedPlan: string
  billingCycle: string
  emailVerified: boolean
  status: string
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users")
        const snapshot = await getDocs(usersRef)
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toLocaleString() || "N/A"
        })) as User[]
        setUsers(usersData)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <div>Loading users...</div>
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Users ({users.length})</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Age Category</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Billing</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.city}, {user.country}</TableCell>
                <TableCell>{user.ageCategory}</TableCell>
                <TableCell>{user.selectedPlan}</TableCell>
                <TableCell>{user.billingCycle}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className={user.subscriptionStatus === "active" ? "text-green-600" : "text-red-600"}>
                      {user.subscriptionStatus}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {user.paymentStatus}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
