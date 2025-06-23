"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Users, Calendar, DollarSign, Bell, Menu, X } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Check-ins", href: "/checkins", icon: Calendar },
  { name: "Payments", href: "/payments", icon: DollarSign },
  { name: "Notifications", href: "/notifications", icon: Bell },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">FitCoach</h1>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <nav
        className={cn(
          "bg-card border-r w-full lg:w-64 lg:flex lg:flex-col",
          mobileMenuOpen ? "block" : "hidden lg:block",
        )}
      >
        <div className="p-6 border-b hidden lg:block">
          <h1 className="text-2xl font-bold text-primary">FitCoach</h1>
          <p className="text-sm text-muted-foreground mt-1">Nepali Fitness Dashboard</p>
        </div>

        <div className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </>
  )
}
