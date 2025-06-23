"use client"

import { ArrowLeft, Heart, Share2 } from "lucide-react"
import type { Food } from "@/app/page"

interface FoodDetailProps {
  food: Food
  onBack: () => void
  onToggleFavorite: () => void
}

export function FoodDetail({ food, onBack, onToggleFavorite }: FoodDetailProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: food.name,
          text: `Check out the nutrition info for ${food.name}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-[#131712] flex flex-col" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      {/* Header */}
      <div className="bg-[#131712] border-b border-[#2d372a] sticky top-0 z-40">
        <div className="flex items-center justify-between p-4 lg:px-6">
          <button onClick={onBack} className="text-white p-2 hover:bg-[#2d372a] rounded-lg transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-white text-lg lg:text-xl font-bold flex-1 text-center mx-4 truncate">{food.name}</h2>
          <div className="flex gap-2">
            <button
              onClick={onToggleFavorite}
              className="text-white p-2 hover:bg-[#2d372a] rounded-lg transition-colors"
            >
              <Heart size={20} className={food.isFavorite ? "fill-red-500 text-red-500" : ""} />
            </button>
            <button onClick={handleShare} className="text-white p-2 hover:bg-[#2d372a] rounded-lg transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div>
              <div
                className="w-full h-64 lg:h-80 bg-center bg-no-repeat bg-cover rounded-xl mb-6"
                style={{
                  backgroundImage: `url("${food.image || "/placeholder.svg?height=400&width=600"}")`,
                }}
              />

              <div className="bg-[#2d372a] rounded-xl p-6">
                <h1 className="text-white text-2xl lg:text-3xl font-bold mb-4">{food.name}</h1>
                <p className="text-[#a5b6a0] text-base lg:text-lg mb-6">{food.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {food.tags.map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-[#1a1f17] text-white text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-[#a5b6a0] text-base">
                  <strong className="text-white">Serving Size:</strong> {food.servingSize}
                </div>
              </div>
            </div>

            {/* Right Column - Nutrition Facts */}
            <div>
              <div className="bg-[#2d372a] rounded-xl p-6">
                <h3 className="text-white text-xl lg:text-2xl font-bold mb-6">Nutrition Facts</h3>

                {/* Main Calories Display */}
                <div className="text-center mb-8 p-6 bg-[#1a1f17] rounded-xl">
                  <div className="text-4xl lg:text-5xl font-bold text-orange-400 mb-2">{food.calories}</div>
                  <div className="text-[#a5b6a0] text-lg">Calories</div>
                </div>

                {/* Macronutrients Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-[#1a1f17] rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{food.protein}g</div>
                    <div className="text-[#a5b6a0] text-sm">Protein</div>
                  </div>
                  <div className="text-center p-4 bg-[#1a1f17] rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{food.carbs}g</div>
                    <div className="text-[#a5b6a0] text-sm">Carbs</div>
                  </div>
                  <div className="text-center p-4 bg-[#1a1f17] rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">{food.fats}g</div>
                    <div className="text-[#a5b6a0] text-sm">Fats</div>
                  </div>
                </div>

                {/* Macronutrient Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-white font-medium text-lg">Macronutrient Breakdown</h4>
                  {[
                    { name: "Protein", value: food.protein * 4, color: "bg-blue-500" },
                    { name: "Carbohydrates", value: food.carbs * 4, color: "bg-green-500" },
                    { name: "Fats", value: food.fats * 9, color: "bg-yellow-500" },
                  ].map((macro) => {
                    const percentage = (macro.value / food.calories) * 100
                    return (
                      <div key={macro.name}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[#a5b6a0]">{macro.name}</span>
                          <span className="text-[#a5b6a0]">{percentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-[#1a1f17] rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${macro.color} transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
