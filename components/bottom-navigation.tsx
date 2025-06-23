"use client"

import { Button } from "@/components/ui/button"
import { Home, Heart, Search, User } from "lucide-react"

interface BottomNavigationProps {
  currentView: "home" | "favorites" | "search" | "profile"
  onViewChange: (view: "home" | "favorites" | "search" | "profile") => void
}

export function BottomNavigation({ currentView, onViewChange }: BottomNavigationProps) {
  const navItems = [
    { id: "home" as const, icon: Home, label: "Home" },
    { id: "favorites" as const, icon: Heart, label: "Favorites" },
    { id: "search" as const, icon: Search, label: "Search" },
    { id: "profile" as const, icon: User, label: "Profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            onClick={() => onViewChange(item.id)}
            className={`flex flex-col items-center gap-1 h-auto py-2 px-4 ${
              currentView === item.id ? "text-blue-400" : "text-gray-400 hover:text-white"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
