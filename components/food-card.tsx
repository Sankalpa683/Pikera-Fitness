"use client"

import { Heart } from "lucide-react"
import type { Food } from "@/app/page"

interface FoodCardProps {
  food: Food
  onClick: () => void
  onToggleFavorite: () => void
  layout: "mobile" | "desktop"
}

export function FoodCard({ food, onClick, onToggleFavorite, layout }: FoodCardProps) {
  if (layout === "mobile") {
    return (
      <div
        onClick={onClick}
        className="bg-[#2d372a] rounded-xl p-4 cursor-pointer hover:bg-[#3d473a] transition-colors"
      >
        <div className="flex items-stretch gap-4">
          <div className="flex flex-col gap-1 flex-[2_2_0px]">
            <p className="text-[#a5b6a0] text-sm font-normal">{food.calories} cal</p>
            <p className="text-white text-base font-bold">{food.name}</p>
            <p className="text-[#a5b6a0] text-sm font-normal line-clamp-2">{food.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {food.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-2 py-1 bg-[#1a1f17] text-[#a5b6a0] text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative flex-1">
            <div
              className="w-full h-20 bg-center bg-no-repeat bg-cover rounded-xl"
              style={{
                backgroundImage: `url("${food.image || "/placeholder.svg?height=200&width=300"}")`,
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite()
              }}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <Heart size={16} className={food.isFavorite ? "fill-red-500 text-red-500" : "text-white"} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className="bg-[#2d372a] rounded-xl overflow-hidden cursor-pointer hover:bg-[#3d473a] transition-colors group"
    >
      <div className="relative">
        <div
          className="w-full h-48 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url("${food.image || "/placeholder.svg?height=400&width=600"}")`,
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite()
          }}
          className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
        >
          <Heart size={20} className={food.isFavorite ? "fill-red-500 text-red-500" : "text-white"} />
        </button>
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {food.calories} cal
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-white text-xl font-bold mb-2">{food.name}</h3>
        <p className="text-[#a5b6a0] text-sm mb-4 line-clamp-2">{food.description}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-[#a5b6a0] text-sm">Serving: {food.servingSize}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-blue-400 font-bold">{food.protein}g</div>
            <div className="text-[#a5b6a0] text-xs">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 font-bold">{food.carbs}g</div>
            <div className="text-[#a5b6a0] text-xs">Carbs</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 font-bold">{food.fats}g</div>
            <div className="text-[#a5b6a0] text-xs">Fats</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {food.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-[#1a1f17] text-[#a5b6a0] text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
