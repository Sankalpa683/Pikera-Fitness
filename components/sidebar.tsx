"use client"

import { Home, PlusSquare, MicroscopeIcon as MagnifyingGlass, Settings, X, LogOut, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface SidebarProps {
  currentView: "home" | "log" | "search" | "settings"
  onViewChange: (view: "home" | "log" | "search" | "settings") => void
  onClose?: () => void
}

export function Sidebar({ currentView, onViewChange, onClose }: SidebarProps) {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      if (onClose) onClose()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const navItems = [
    { id: "home" as const, icon: Home, label: "Home", description: "Dashboard overview" },
    { id: "log" as const, icon: PlusSquare, label: "Food Log", description: "Track your meals" },
    { id: "search" as const, icon: MagnifyingGlass, label: "Search", description: "Find Nepali foods" },
    { id: "settings" as const, icon: Settings, label: "Settings", description: "App preferences" },
  ]

  return (
    <div className="w-64 lg:w-72 bg-[#1f251d] border-r border-[#2d372a] h-screen sticky top-0 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#2d372a]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl lg:text-2xl font-bold">Pikera Fitness Nutrition</h1>
            <p className="text-[#a5b6a0] text-sm mt-1">Food Macro Tracker</p>
          </div>
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-white p-2 hover:bg-[#2d372a] rounded-lg">
              <X size={24} />
            </button>
          )}
        </div>
      </div>

      {/* User Profile Section */}
      {user && (
        <div className="p-4 border-b border-[#2d372a]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#4a5c47] rounded-full flex items-center justify-center">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url || "/placeholder.svg"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.user_metadata?.full_name || user.email}</p>
              <p className="text-[#a5b6a0] text-xs truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 text-[#a5b6a0] hover:text-white hover:bg-[#2d372a] px-3 py-2 rounded-lg transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id)
                onClose?.()
              }}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-colors text-left ${
                currentView === item.id
                  ? "bg-[#4a5c47] text-white"
                  : "text-[#a5b6a0] hover:bg-[#2d372a] hover:text-white"
              }`}
            >
              <item.icon size={24} />
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-sm opacity-75">{item.description}</div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-[#2d372a]">
        <div className="text-center">
          <p className="text-[#a5b6a0] text-sm">Made for Nepali fitness creators</p>
          <p className="text-[#a5b6a0] text-xs mt-1">Track traditional foods easily</p>
        </div>
      </div>
    </div>
  )
}
