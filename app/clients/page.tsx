"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search, Phone, MessageCircle, Calendar, DollarSign, Camera, Weight, Plus, Users } from "lucide-react"

const mockClients = [
  {
    id: 1,
    name: "Priya Sharma",
    age: 28,
    contact: "+977-9841234567",
    plan: "Weight Loss",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    paymentStatus: "paid",
    lastCheckIn: "2024-01-20",
    avatar: "/placeholder.svg?height=40&width=40",
    currentWeight: "65kg",
    targetWeight: "58kg",
    progressPhotos: 3,
  },
  {
    id: 2,
    name: "Rajesh Thapa",
    age: 32,
    contact: "+977-9851234567",
    plan: "Muscle Gain",
    startDate: "2024-01-10",
    endDate: "2024-02-10",
    paymentStatus: "pending",
    lastCheckIn: "2024-01-18",
    avatar: "/placeholder.svg?height=40&width=40",
    currentWeight: "70kg",
    targetWeight: "75kg",
    progressPhotos: 2,
  },
  {
    id: 3,
    name: "Sita Gurung",
    age: 25,
    contact: "+977-9861234567",
    plan: "General Fitness",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    paymentStatus: "paid",
    lastCheckIn: "2024-01-22",
    avatar: "/placeholder.svg?height=40&width=40",
    currentWeight: "55kg",
    targetWeight: "60kg",
    progressPhotos: 5,
  },
]

export default function ClientsPage() {
  const [clients] = useState(mockClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState<(typeof mockClients)[0] | null>(null)

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.plan.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row">
        <Navigation />

        <main className="flex-1 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Clients</h1>
              <p className="text-muted-foreground mt-1">Manage your coaching clients</p>
            </div>
            <ThemeToggle />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Client List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    All Clients
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Client
                    </Button>
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search clients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredClients.map((client) => (
                      <div
                        key={client.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                          selectedClient?.id === client.id ? "bg-muted border-primary" : ""
                        }`}
                        onClick={() => setSelectedClient(client)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={client.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {client.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-medium">{client.name}</h3>
                            <p className="text-sm text-muted-foreground">{client.plan}</p>
                            <Badge
                              variant={client.paymentStatus === "paid" ? "default" : "destructive"}
                              className="mt-1"
                            >
                              {client.paymentStatus === "paid" ? "Paid" : "Pending"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Client Profile */}
            <div className="lg:col-span-2">
              {selectedClient ? (
                <div className="space-y-6">
                  {/* Profile Header */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={selectedClient.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-lg">
                            {selectedClient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold">{selectedClient.name}</h2>
                          <p className="text-muted-foreground">
                            Age: {selectedClient.age} • {selectedClient.plan}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={selectedClient.paymentStatus === "paid" ? "default" : "destructive"}>
                              {selectedClient.paymentStatus === "paid" ? "Paid" : "Payment Pending"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            WhatsApp
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Plan Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Plan Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Plan Type</label>
                          <p className="font-medium">{selectedClient.plan}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Duration</label>
                          <p className="font-medium">
                            {selectedClient.startDate} to {selectedClient.endDate}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Contact</label>
                          <p className="font-medium">{selectedClient.contact}</p>
                        </div>
                        <Button className="w-full">Send Follow-up Reminder</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Weight className="h-5 w-5" />
                          Progress Tracking
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Current Weight</label>
                          <p className="font-medium text-lg">{selectedClient.currentWeight}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Target Weight</label>
                          <p className="font-medium text-lg">{selectedClient.targetWeight}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Progress Photos</label>
                          <p className="font-medium">{selectedClient.progressPhotos} photos uploaded</p>
                        </div>
                        <Button variant="outline" className="w-full">
                          <Camera className="h-4 w-4 mr-2" />
                          View Progress Photos
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Payment Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Payment Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Current Plan Payment</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedClient.startDate} - {selectedClient.endDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={selectedClient.paymentStatus === "paid" ? "default" : "destructive"}>
                            {selectedClient.paymentStatus === "paid" ? "Paid" : "Pending"}
                          </Badge>
                          {selectedClient.paymentStatus === "pending" && (
                            <Button size="sm" className="ml-3">
                              Mark as Paid
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Select a Client</h3>
                    <p className="text-muted-foreground">Choose a client from the list to view their profile</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
