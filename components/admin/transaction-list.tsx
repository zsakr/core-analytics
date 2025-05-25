"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"

interface Transaction {
  id: string
  amount: number
  currency: string
  email: string
  status: string
  createdAt: string
  nextBillingDate?: string
  billingCycle?: string
  planId?: string
  selectedPlan?: string
  paymentStatus?: string
  subscriptionStatus?: string
}

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    let unsubscribe: () => void

    const fetchTransactions = () => {
      try {
        unsubscribe = onSnapshot(collection(db, "users"), (snapshot: QuerySnapshot<DocumentData>) => {
          const transactionsData = snapshot.docs.map(doc => {
            const data = doc.data()
            return {
              id: doc.id,
              amount: data.price || 0,
              currency: "usd",
              email: data.email || "N/A",
              status: data.subscriptionStatus || "N/A",
              createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleString() : "N/A",
              nextBillingDate: data.nextBillingDate || undefined,
              billingCycle: data.billingCycle || "N/A",
              planId: data.planId || "N/A",
              selectedPlan: data.selectedPlan || "N/A",
              paymentStatus: data.paymentStatus || "N/A",
              subscriptionStatus: data.subscriptionStatus || "N/A"
            }
          }) as Transaction[]
          setTransactions(transactionsData)
          // Calculate total revenue from all transactions
          const total = transactionsData.reduce((sum, t) => sum + t.amount, 0)
          setTotalRevenue(total)
          setLoading(false)
        }, (error) => {
          console.error("Error fetching transactions:", error)
          setLoading(false)
        })
      } catch (error) {
        console.error("Error setting up transaction listener:", error)
        setLoading(false)
      }
    }

    fetchTransactions()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  if (loading) {
    return <div>Loading transactions...</div>
  }

  const totalRevenueCalc = transactions
    .filter(t => t.status === "succeeded")
    .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0)

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Transactions ({transactions.length})</h2>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total Revenue</div>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Billing Cycle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Next Billing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.email}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>{transaction.selectedPlan}</TableCell>
                  <TableCell>{transaction.billingCycle}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className={transaction.status === "succeeded" ? "text-green-600" : "text-red-600"}>
                        {transaction.status}
                      </div>
                      {transaction.paymentStatus && (
                        <div className="text-sm text-muted-foreground">
                          {transaction.paymentStatus}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{transaction.createdAt}</TableCell>
                  <TableCell>{transaction.nextBillingDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  )
}
