"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Calendar, TrendingUp, Camera, Smile, Meh, Frown, Battery, Weight } from "lucide-react"

const mockCheckIns = [
  {
    id: 1,
    clientName: "Priya Sharma",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    date: "2024-01-22",
    weight: "64.5kg",
    mood: "good",
    energy: "high",
    notes: "Feeling great! Completed all workouts this week.",
    hasPhoto: true,
  },
  {
    id: 2,
    clientName: "Rajesh Thapa",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    date: "2024-01-21",
    weight: "71kg",
    mood: "okay",
    energy: "medium",
    notes: "Had some challenges with diet this week.",
    hasPhoto: false,
  },
  {
    id: 3,
    clientName: "Sita Gurung",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    date: "2024-01-20",
    weight: "56kg",
    mood: "excellent",
    energy: "high",
    notes: "Amazing week! Hit all my targets.",
    hasPhoto: true,
  },
]

const moodIcons = {
  excellent: { icon: Smile, color: "text-green-600", label: "Excellent" },
  good: { icon: Smile, color: "text-blue-600", label: "Good" },
  okay: { icon: Meh, color: "text-yellow-600", label: "Okay" },
  poor: { icon: Frown, color: "text-red-600", label: "Poor" },
}

const energyLevels = {
  high: { label: "High Energy", color: "text-green-600" },
  medium: { label: "Medium Energy", color: "text-yellow-600" },
  low: { label: "Low Energy", color: "text-red-600" },
}

export default function CheckInsPage() {
  const [checkIns] = useState(mockCheckIns)
  const [showClientForm, setShowClientForm] = useState(false)
  const [formData, setFormData] = useState({
    weight: "",
    mood: "good",
    energy: "medium",
    notes: "",
  })

  const handleSubmitCheckIn = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Check-in submitted:", formData)
    setShowClientForm(false)
    setFormData({ weight: "", mood: "good", energy: "medium", notes: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row">
        <Navigation />

        <main className="flex-1 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Weekly Check-ins</h1>
              <p className="text-muted-foreground mt-1">Track client progress and weekly updates</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowClientForm(!showClientForm)}>
                {showClientForm ? "View Check-ins" : "Client Check-in Form"}
              </Button>
              <ThemeToggle />
            </div>
          </div>

          {showClientForm ? (
            /* Client Check-in Form */
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Weekly Check-in Form
                </CardTitle>
                <p className="text-muted-foreground">Fill out your weekly progress update</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitCheckIn} className="space-y-6">
                  <div>
                    <Label htmlFor="weight" className="flex items-center gap-2">
                      <Weight className="h-4 w-4" />
                      Current Weight
                    </Label>
                    <Input
                      id="weight"
                      placeholder="e.g., 65kg"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-3">
                      <Smile className="h-4 w-4" />
                      How are you feeling this week?
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(moodIcons).map(([mood, config]) => (
                        <button
                          key={mood}
                          type="button"
                          onClick={() => setFormData({ ...formData, mood })}
                          className={`p-3 border rounded-lg text-center transition-colors ${
                            formData.mood === mood ? "border-primary bg-primary/10" : "border-border hover:bg-muted"
                          }`}
                        >
                          <config.icon className={`h-6 w-6 mx-auto mb-2 ${config.color}`} />
                          <span className="text-sm font-medium">{config.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-3">
                      <Battery className="h-4 w-4" />
                      Energy Level
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(energyLevels).map(([energy, config]) => (
                        <button
                          key={energy}
                          type="button"
                          onClick={() => setFormData({ ...formData, energy })}
                          className={`p-3 border rounded-lg text-center transition-colors ${
                            formData.energy === energy ? "border-primary bg-primary/10" : "border-border hover:bg-muted"
                          }`}
                        >
                          <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Weekly Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="How was your week? Any challenges or victories to share?"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="mt-2"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Camera className="h-4 w-4" />
                      Progress Photo (Optional)
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload a progress photo</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1">
                      Submit Check-in
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowClientForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            /* Check-ins History */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">This Week</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">Check-ins received</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending</CardTitle>
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <p className="text-xs text-muted-foreground">Clients haven't checked in</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Mood</CardTitle>
                    <Smile className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">Good</div>
                    <p className="text-xs text-muted-foreground">Overall client mood</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Check-ins</CardTitle>
                  <p className="text-sm text-muted-foreground">Latest updates from your clients</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {checkIns.map((checkIn) => {
                      const MoodIcon = moodIcons[checkIn.mood as keyof typeof moodIcons].icon
                      const moodColor = moodIcons[checkIn.mood as keyof typeof moodIcons].color
                      const energyConfig = energyLevels[checkIn.energy as keyof typeof energyLevels]

                      return (
                        <div key={checkIn.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={checkIn.clientAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {checkIn.clientName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium">{checkIn.clientName}</h3>
                                <span className="text-sm text-muted-foreground">{checkIn.date}</span>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                <div>
                                  <Label className="text-xs text-muted-foreground">Weight</Label>
                                  <p className="font-medium">{checkIn.weight}</p>
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">Mood</Label>
                                  <div className="flex items-center gap-1">
                                    <MoodIcon className={`h-4 w-4 ${moodColor}`} />
                                    <span className="text-sm capitalize">{checkIn.mood}</span>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">Energy</Label>
                                  <p className={`text-sm ${energyConfig.color}`}>{energyConfig.label}</p>
                                </div>
                                <div>
                                  <Label className="text-xs text-muted-foreground">Photo</Label>
                                  <div className="flex items-center gap-1">
                                    <Camera className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{checkIn.hasPhoto ? "Yes" : "No"}</span>
                                  </div>
                                </div>
                              </div>

                              {checkIn.notes && (
                                <div>
                                  <Label className="text-xs text-muted-foreground">Notes</Label>
                                  <p className="text-sm mt-1">{checkIn.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
