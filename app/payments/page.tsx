"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { DollarSign, Search, Filter, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

const mockPayments = [
  {
    id: 1,
    clientName: "Priya Sharma",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    plan: "Weight Loss",
    amount: "Rs. 5,000",
    dueDate: "2024-02-15",
    status: "paid",
    paidDate: "2024-01-15",
  },
  {
    id: 2,
    clientName: "Rajesh Thapa",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    plan: "Muscle Gain",
    amount: "Rs. 7,500",
    dueDate: "2024-02-10",
    status: "pending",
    paidDate: null,
  },
  {
    id: 3,
    clientName: "Sita Gurung",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    plan: "General Fitness",
    amount: "Rs. 4,500",
    dueDate: "2024-02-20",
    status: "paid",
    paidDate: "2024-01-20",
  },
  {
    id: 4,
    clientName: "Amit Shrestha",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    plan: "Weight Loss",
    amount: "Rs. 5,000",
    dueDate: "2024-01-25",
    status: "overdue",
    paidDate: null,
  },
]

export default function PaymentsPage() {
  const [payments, setPayments] = useState(mockPayments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.plan.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleMarkAsPaid = (paymentId: number) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId
          ? { ...payment, status: "paid", paidDate: new Date().toISOString().split("T")[0] }
          : payment,
      ),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <XCircle className="h-4 w-4 text-yellow-600" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default"
      case "pending":
        return "secondary"
      case "overdue":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const totalAmount = payments.reduce((sum, payment) => {
    const amount = Number.parseInt(payment.amount.replace(/[^\d]/g, ""))
    return sum + amount
  }, 0)

  const paidAmount = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, payment) => {
      const amount = Number.parseInt(payment.amount.replace(/[^\d]/g, ""))
      return sum + amount
    }, 0)

  const pendingAmount = totalAmount - paidAmount

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row">
        <Navigation />

        <main className="flex-1 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Payment Tracker</h1>
              <p className="text-muted-foreground mt-1">Manage client payments and billing</p>
            </div>
            <ThemeToggle />
          </div>

          {/* Payment Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rs. {totalAmount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paid</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Rs. {paidAmount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Received payments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <XCircle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">Rs. {pendingAmount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Outstanding amount</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {payments.filter((p) => p.status === "overdue").length}
                </div>
                <p className="text-xs text-muted-foreground">Overdue payments</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Payment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Payment List */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Records</CardTitle>
              <p className="text-sm text-muted-foreground">
                Showing {filteredPayments.length} of {payments.length} payments
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={payment.clientAvatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {payment.clientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium">{payment.clientName}</h3>
                        <p className="text-sm text-muted-foreground">{payment.plan}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getStatusColor(payment.status) as any}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(payment.status)}
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </div>
                          </Badge>
                          <span className="text-xs text-muted-foreground">Due: {payment.dueDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">{payment.amount}</p>
                      {payment.paidDate && <p className="text-xs text-muted-foreground">Paid: {payment.paidDate}</p>}
                      <div className="flex gap-2 mt-2">
                        {payment.status !== "paid" && (
                          <Button size="sm" onClick={() => handleMarkAsPaid(payment.id)}>
                            Mark Paid
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Send Reminder
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
