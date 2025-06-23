"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload, Plus } from "lucide-react"
import type { Food } from "@/app/page"

interface AddFoodFormProps {
  onSubmit: (food: Omit<Food, "id">) => void
  onCancel: () => void
}

const availableTags = ["High Protein", "Low Carb", "Veg", "Non-Veg", "Gluten-Free", "Dairy-Free"]

export function AddFoodForm({ onSubmit, onCancel }: AddFoodFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    servingSize: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    tags: [] as string[],
    image: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Food name is required"
    if (!formData.servingSize.trim()) newErrors.servingSize = "Serving size is required"
    if (!formData.calories || isNaN(Number(formData.calories))) newErrors.calories = "Valid calories required"
    if (!formData.protein || isNaN(Number(formData.protein))) newErrors.protein = "Valid protein amount required"
    if (!formData.carbs || isNaN(Number(formData.carbs))) newErrors.carbs = "Valid carbs amount required"
    if (!formData.fats || isNaN(Number(formData.fats))) newErrors.fats = "Valid fats amount required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      servingSize: formData.servingSize.trim(),
      calories: Number(formData.calories),
      protein: Number(formData.protein),
      carbs: Number(formData.carbs),
      fats: Number(formData.fats),
      tags: formData.tags,
      image: formData.image || "/placeholder.svg?height=200&width=300",
    })
  }

  const toggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-[#131712] flex flex-col" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      {/* Header */}
      <div className="bg-[#131712] border-b border-[#2d372a] sticky top-0 z-40">
        <div className="flex items-center justify-between p-4 lg:px-6">
          <button onClick={onCancel} className="text-white p-2 hover:bg-[#2d372a] rounded-lg transition-colors">
            <X size={24} />
          </button>
          <h2 className="text-white text-lg lg:text-xl font-bold flex-1 text-center mx-4">Add New Food</h2>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                <div className="bg-[#2d372a] rounded-xl p-6">
                  <h3 className="text-white text-xl font-bold mb-6">Basic Information</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Food Name *</label>
                      <input
                        type="text"
                        placeholder="Enter food name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full h-12 px-4 bg-[#1a1f17] border-none rounded-xl text-white placeholder:text-[#a5b6a0] focus:outline-none focus:ring-2 focus:ring-[#4a5c47]"
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Description (optional)</label>
                      <textarea
                        placeholder="Describe the food"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="w-full h-24 px-4 py-3 bg-[#1a1f17] border-none rounded-xl text-white placeholder:text-[#a5b6a0] focus:outline-none focus:ring-2 focus:ring-[#4a5c47] resize-none"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Serving Size *</label>
                      <input
                        type="text"
                        placeholder="e.g., 1 plate, 100g"
                        value={formData.servingSize}
                        onChange={(e) => handleInputChange("servingSize", e.target.value)}
                        className="w-full h-12 px-4 bg-[#1a1f17] border-none rounded-xl text-white placeholder:text-[#a5b6a0] focus:outline-none focus:ring-2 focus:ring-[#4a5c47]"
                      />
                      {errors.servingSize && <p className="text-red-400 text-sm mt-1">{errors.servingSize}</p>}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-[#2d372a] rounded-xl p-6">
                  <h3 className="text-white text-xl font-bold mb-6">Tags</h3>
                  <div className="flex flex-wrap gap-3">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          formData.tags.includes(tag)
                            ? "bg-[#4a5c47] text-white"
                            : "bg-[#1a1f17] text-[#a5b6a0] hover:bg-[#2d372a] hover:text-white"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Nutrition & Image */}
              <div className="space-y-6">
                <div className="bg-[#2d372a] rounded-xl p-6">
                  <h3 className="text-white text-xl font-bold mb-6">Nutrition Information</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Calories *</label>
                      <input
                        type="number"
                        placeholder="Enter calories"
                        value={formData.calories}
                        onChange={(e) => handleInputChange("calories", e.target.value)}
                        className="w-full h-12 px-4 bg-[#1a1f17] border-none rounded-xl text-white placeholder:text-[#a5b6a0] focus:outline-none focus:ring-2 focus:ring-[#4a5c47]"
                      />
                      {errors.calories && <p className="text-red-400 text-sm mt-1">{errors.calories}</p>}
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Protein (g) *</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Enter protein"
                        value={formData.protein}
                        onChange={(e) => handleInputChange("protein", e.target.value)}
                        className="w-full h-12 px-4 bg-[#1a1f17] border-none rounded-xl text-white placeholder:text-[#a5b6a0] focus:outline-none focus:ring-2 focus:ring-[#4a5c47]"
                      />
                      {errors.protein && <p className="text-red-400 text-sm mt-1">{errors.protein}</p>}
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Carbs (g) *</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Enter carbs"
                        value={formData.carbs}
                        onChange={(e) => handleInputChange("carbs", e.target.value)}
                        className="w-full h-12 px-4 bg-[#1a1f17] border-none rounded-xl text-white placeholder:text-[#a5b6a0] focus:outline-none focus:ring-2 focus:ring-[#4a5c47]"
                      />
                      {errors.carbs && <p className="text-red-400 text-sm mt-1">{errors.carbs}</p>}
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Fats (g) *</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Enter fats"
                        value={formData.fats}
                        onChange={(e) => handleInputChange("fats", e.target.value)}
                        className="w-full h-12 px-4 bg-[#1a1f17] border-none rounded-xl text-white placeholder:text-[#a5b6a0] focus:outline-none focus:ring-2 focus:ring-[#4a5c47]"
                      />
                      {errors.fats && <p className="text-red-400 text-sm mt-1">{errors.fats}</p>}
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="bg-[#2d372a] rounded-xl p-6">
                  <h3 className="text-white text-xl font-bold mb-6">Food Image</h3>
                  <div className="border-2 border-dashed border-[#4a5c47] rounded-xl p-8 text-center hover:border-[#5a6c57] transition-colors">
                    <Upload className="h-12 w-12 text-[#a5b6a0] mx-auto mb-4" />
                    <p className="text-[#a5b6a0] mb-2">Click to upload a food image</p>
                    <p className="text-xs text-[#a5b6a0]">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full lg:w-auto px-8 py-4 bg-[#4a5c47] hover:bg-[#5a6c57] text-white font-medium text-lg rounded-xl transition-colors flex items-center justify-center gap-3"
              >
                <Plus size={24} />
                Add Food to Database
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
