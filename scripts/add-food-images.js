// Script to add relevant food images to the Nepali nutrition database
// This provides image URLs and fallback strategies for each food item

const foodImageDatabase = {
  // Traditional Staples
  "Dal Bhat (Lentil Rice)": {
    primaryImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop", // Dal Bhat plate
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Dal+Bhat",
    searchTerms: ["dal bhat nepal", "nepali lentil rice", "traditional nepali meal"],
    description: "Traditional plate with dal (lentils) and bhat (rice)",
  },

  "Dhido (Buckwheat Porridge)": {
    primaryImage: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop", // Porridge/grain bowl
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Dhido",
    searchTerms: ["dhido nepal", "buckwheat porridge", "nepali traditional food"],
    description: "Traditional buckwheat porridge",
  },

  "Gundruk (Fermented Greens)": {
    primaryImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop", // Leafy greens
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Gundruk",
    searchTerms: ["gundruk nepal", "fermented greens", "nepali pickled vegetables"],
    description: "Fermented leafy green vegetables",
  },

  "Sel Roti": {
    primaryImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", // Ring-shaped bread
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Sel+Roti",
    searchTerms: ["sel roti nepal", "nepali ring bread", "traditional nepali sweet"],
    description: "Traditional ring-shaped sweet bread",
  },

  // Meat and Protein Sources
  "Buff Sukuti (Dried Buffalo)": {
    primaryImage: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop", // Dried meat
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Buff+Sukuti",
    searchTerms: ["sukuti nepal", "dried buffalo meat", "nepali jerky"],
    description: "Traditional dried buffalo meat",
  },

  "Khasi Ko Masu (Goat Curry)": {
    primaryImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", // Curry dish
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Khasi+Ko+Masu",
    searchTerms: ["goat curry nepal", "khasi ko masu", "nepali meat curry"],
    description: "Traditional goat meat curry",
  },

  "Kukhura Ko Masu (Chicken Curry)": {
    primaryImage: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop", // Chicken curry
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Kukhura+Ko+Masu",
    searchTerms: ["chicken curry nepal", "kukhura ko masu", "nepali chicken"],
    description: "Traditional chicken curry",
  },

  "Machha (Fish Curry)": {
    primaryImage: "https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=400&h=300&fit=crop", // Fish curry
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Machha",
    searchTerms: ["fish curry nepal", "machha nepal", "nepali fish dish"],
    description: "Fresh water fish curry",
  },

  // Dumplings and Popular Foods
  "Momo (Chicken)": {
    primaryImage: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop", // Dumplings
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Chicken+Momo",
    searchTerms: ["chicken momo nepal", "nepali dumplings", "steamed momo"],
    description: "Steamed chicken dumplings",
  },

  "Momo (Vegetable)": {
    primaryImage: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop", // Vegetable dumplings
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Vegetable+Momo",
    searchTerms: ["vegetable momo nepal", "veg momo", "nepali vegetarian dumplings"],
    description: "Steamed vegetable dumplings",
  },

  "Momo (Buff)": {
    primaryImage: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop", // Buffalo momo
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Buff+Momo",
    searchTerms: ["buff momo nepal", "buffalo momo", "traditional nepali momo"],
    description: "Traditional buffalo meat dumplings",
  },

  "Kothey Momo": {
    primaryImage: "https://images.unsplash.com/photo-1563379091339-03246963d96a?w=400&h=300&fit=crop", // Pan-fried dumplings
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Kothey+Momo",
    searchTerms: ["kothey momo nepal", "pan fried momo", "crispy momo"],
    description: "Pan-fried dumplings with crispy bottom",
  },

  // Soups and Broths
  "Thukpa (Chicken)": {
    primaryImage: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop", // Noodle soup
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Chicken+Thukpa",
    searchTerms: ["thukpa nepal", "nepali noodle soup", "chicken thukpa"],
    description: "Hearty noodle soup with chicken",
  },

  "Thukpa (Vegetable)": {
    primaryImage: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop", // Vegetable noodle soup
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Vegetable+Thukpa",
    searchTerms: ["vegetable thukpa nepal", "veg thukpa", "nepali vegetable soup"],
    description: "Noodle soup with mixed vegetables",
  },

  // Vegetables and Greens
  "Saag (Spinach Curry)": {
    primaryImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", // Spinach curry
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Saag",
    searchTerms: ["saag nepal", "spinach curry", "nepali greens"],
    description: "Traditional spinach curry",
  },

  "Tama (Bamboo Shoots)": {
    primaryImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", // Bamboo shoots
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Tama",
    searchTerms: ["tama nepal", "bamboo shoots", "fermented bamboo"],
    description: "Fermented bamboo shoots",
  },

  // Legumes and Pulses
  "Masyang Dal (Black Lentils)": {
    primaryImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop", // Black lentils
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Masyang+Dal",
    searchTerms: ["black lentils nepal", "masyang dal", "nepali dal"],
    description: "Black lentils curry",
  },

  "Rahar Dal (Pigeon Peas)": {
    primaryImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop", // Yellow dal
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Rahar+Dal",
    searchTerms: ["pigeon peas nepal", "rahar dal", "yellow dal"],
    description: "Yellow pigeon peas curry",
  },

  // Rice and Grains
  "Basmati Chamal (Rice)": {
    primaryImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop", // Basmati rice
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Basmati+Rice",
    searchTerms: ["basmati rice", "nepali rice", "steamed rice"],
    description: "Aromatic basmati rice",
  },

  "Chiura (Beaten Rice)": {
    primaryImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop", // Beaten rice
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Chiura",
    searchTerms: ["chiura nepal", "beaten rice", "flattened rice"],
    description: "Traditional flattened rice",
  },

  // Dairy and Beverages
  "Dahi (Yogurt)": {
    primaryImage: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&h=300&fit=crop", // Yogurt
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Dahi",
    searchTerms: ["dahi nepal", "nepali yogurt", "homemade yogurt"],
    description: "Traditional homemade yogurt",
  },

  "Lassi (Yogurt Drink)": {
    primaryImage: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&h=300&fit=crop", // Lassi
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Lassi",
    searchTerms: ["lassi nepal", "yogurt drink", "nepali lassi"],
    description: "Traditional yogurt drink",
  },

  "Chiya (Milk Tea)": {
    primaryImage: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop", // Milk tea
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Chiya",
    searchTerms: ["chiya nepal", "nepali tea", "milk tea"],
    description: "Traditional spiced milk tea",
  },

  // Street Food
  "Chowmein (Nepali Style)": {
    primaryImage: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop", // Noodles
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Chowmein",
    searchTerms: ["chowmein nepal", "nepali noodles", "stir fried noodles"],
    description: "Nepali style stir-fried noodles",
  },

  "Chatamari (Nepali Pizza)": {
    primaryImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", // Rice crepe
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Chatamari",
    searchTerms: ["chatamari nepal", "nepali pizza", "rice crepe"],
    description: "Traditional rice crepe with toppings",
  },

  Samosa: {
    primaryImage: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop", // Samosa
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Samosa",
    searchTerms: ["samosa nepal", "nepali samosa", "fried pastry"],
    description: "Deep-fried pastry with filling",
  },

  // Fruits
  "Aam (Mango)": {
    primaryImage: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop", // Mango
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Aam",
    searchTerms: ["mango nepal", "aam", "tropical mango"],
    description: "Sweet tropical mango",
  },

  "Kera (Banana)": {
    primaryImage: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop", // Banana
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Kera",
    searchTerms: ["banana nepal", "kera", "nepali banana"],
    description: "Common banana variety",
  },

  "Suntala (Orange)": {
    primaryImage: "https://mato.com.np/wp-content/uploads/2022/04/orange-nepali.jpg", // Orange
    fallbackImage: "/placeholder.svg?height=300&width=400&text=Suntala",
    searchTerms: ["orange nepal", "suntala", "nepali orange"],
    description: "Local orange variety",
  },
}

// Function to get image for a food item
function getFoodImage(foodName) {
  const imageData = foodImageDatabase[foodName]
  if (imageData) {
    return {
      primary: imageData.primaryImage,
      fallback: imageData.fallbackImage,
      searchTerms: imageData.searchTerms,
      description: imageData.description,
    }
  }

  // Default fallback for foods not in database
  return {
    primary: `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(foodName)}`,
    fallback: `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(foodName)}`,
    searchTerms: [foodName.toLowerCase()],
    description: foodName,
  }
}

// Log available images
console.log("=== FOOD IMAGE DATABASE ===")
console.log(`Total foods with images: ${Object.keys(foodImageDatabase).length}`)

Object.entries(foodImageDatabase).forEach(([food, data]) => {
  console.log(`${food}: ${data.primaryImage}`)
})

console.log("\n=== SEARCH TERMS FOR MANUAL IMAGE FINDING ===")
Object.entries(foodImageDatabase).forEach(([food, data]) => {
  console.log(`${food}: ${data.searchTerms.join(", ")}`)
})

// Export the database
foodImageDatabase
