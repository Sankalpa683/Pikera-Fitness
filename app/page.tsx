"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import { ArrowLeft, Search, Home, PlusSquare, MicroscopeIcon as MagnifyingGlass, Settings, Menu } from "lucide-react"
import { FoodCard } from "@/components/food-card"
import { FoodDetail } from "@/components/food-detail"
import { AddFoodForm } from "@/components/add-food-form"
import { Sidebar } from "@/components/sidebar"

export interface Food {
  id: number
  name: string
  description: string
  servingSize: string
  calories: number
  protein: number
  carbs: number
  fats: number
  tags: string[]
  image: string
  category: string
  isFavorite?: boolean
}

// Food image mapping for relevant images
const foodImages: Record<string, string> = {
  "Dal Bhat (Lentil Rice)": "https://www.cookwithnabeela.com/wp-content/uploads/2024/05/DalChawal.webp",
  "Oats (100 g dry, rolled)": "https://images.immediate.co.uk/production/volatile/sites/30/2023/08/Porridge-oats-d09fae8.jpg?quality=90&resize=440,400",
  "Boiled Egg (large, approx 50 g)": "https://dieteticdirections.com/wp-content/uploads/2021/04/eggs-hard-735x735.jpeg",
  "Omelette (2 large eggs, minimal oil)": "https://www.healthyfood.com/wp-content/uploads/2018/02/Basic-omelette.jpg",
  "Gundruk (Fermented Greens)": "https://healthytraditionalfood.wordpress.com/wp-content/uploads/2020/09/img_5767.jpg",
  "Sel Roti": "https://washburnreview.org/wp-content/uploads/2023/03/sel-roti.jpeg",
  "Roti (Whole Wheat)": "https://sybaritica.me/wp-content/uploads/2020/04/A-Simple-Roti-Recipe-1.jpg",
  "Buff Sukuti (Dried Buffalo)": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop",
  "Khasi Ko Masu (Goat Curry)":
    "https://junifoods.com/wp-content/uploads/2023/03/Goat-Meat-Curry-Khasi-Ko-Masu-%E0%A4%96%E0%A4%B8%E0%A5%80%E0%A4%95%E0%A5%8B-%E0%A4%AE%E0%A4%BE%E0%A4%B8%E0%A5%81.jpg",
  "Kukhura Ko Masu (Chicken Curry)":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdQHf8sBGWRelHkzWcIXVbAUp3nTyD922yzA&s",
  "Machha (Fish Curry)": "https://vismaifood.com/storage/app/uploads/public/daa/96d/7bc/thumb__1200_0_0_0_auto.jpg",
  "Momo (Chicken)": "https://images.unsplash.com/photo-1496116218417-1a781b1c4167?w=400&h=300&fit=crop",
  "Momo (Vegetable)": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop",
  "Momo (Buff)": "https://images.unsplash.com/photo-1496116218417-1a781b1c4167?w=400&h=300&fit=crop",
  "Kothey Momo": "https://img-global.cpcdn.com/recipes/d9ed901923d39a2f/400x400cq90/photo.jpg",
  "Thukpa (Chicken)": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
  "Thukpa (Vegetable)":
    "https://junifoods.com/wp-content/uploads/2024/05/The-Best-Chicken-Thukpa-Tibetan-Noodle-Soup-%E0%A4%95%E0%A5%81%E0%A4%96%E0%A5%81%E0%A4%B0%E0%A4%BE%E0%A4%95%E0%A5%8B-%E0%A4%A5%E0%A5%81%E0%A4%95%E0%A4%AA%E0%A4%BE--500x500.jpg",
  "Saag (Spinach Curry)":
    "https://www.foodandwine.com/thmb/NHhV6IzdPVDXYRRtZDhqe50R_SI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/HD-201306-r-sauteed-spring-greens-with-bacon-and-mustard-seeds-e12c5524a80249d59360e48c29e250b7.jpg",
  "Iskus (Chayote)": "https://t4.ftcdn.net/jpg/01/62/53/13/360_F_162531327_JQ6S1oHh25OfP5lizb6QP6v2o6unvSQ4.jpg",
  "Karela (Bitter Gourd)":
    "https://tarkaribazar.com/_vercel/image?url=https:%2F%2Fapi.tarkaribazar.com%2Fwp-content%2Fuploads%2F2024%2F08%2Fbitter-gourd-6534410_1280.jpg&w=1536&q=100",
  "Pharsi (Pumpkin)": "https://www.healthyfood.com/wp-content/uploads/2017/03/What-to-do-with-pumpkin.jpg",
  "Kalo Dal (Black Lentils)":
    "https://enq69sdfnv7.exactdn.com/wp-content/uploads/2024/03/KALO-DAL-RECIPE.png?strip=all&lossy=1&ssl=1",
  "Rahar Dal (Pigeon Peas)": "https://i.ytimg.com/vi/K1J4OavxIcE/maxresdefault.jpg",
  "Mung Dal (Green Lentils)":
    "https://fis-api.kathmanducookingacademy.com/media/attachments/Moong%20Dal%20(Yellow%20Lentils)%20curry.jpg",
  "Chana (Chickpeas)": "https://sewapoint.com/image-categories/image-1719830052719-kalachana.webp",
  "Basmati Chamal (Rice)": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
  "Bhuteko Bhat (Fried Rice)": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
  "Chiura (Beaten Rice)": "https://sewapoint.com/image-categories/image-1727175481763-chirura.webp",
  "Dahi (Yogurt)": "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&h=300&fit=crop",
  "Lassi (Yogurt Drink)":
    "https://www.indianveggiedelight.com/wp-content/uploads/2023/01/sweet-lassi-recipe-featured.jpg",
  "Chiya (Milk Tea)": "https://sinfullyspicy.com/wp-content/uploads/2024/04/1200-by-1200-images.jpg",
  "Chowmein (Nepali Style)":
    "https://enq69sdfnv7.exactdn.com/wp-content/uploads/2023/11/chowmein-in-nepali-style.png?strip=all&lossy=1&ssl=1",
  "Chatamari (Nepali Pizza)": "https://newarirecipeshut.com/wp-content/uploads/2020/09/chatamari-1536x1024.jpg",
  Samosa: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
  Yomari: "https://www.thegundruk.com/wp-content/uploads/2015/02/yomari-6.jpg",
  "Wo (Lentil Pancake)": "https://togetherwomenrise.org/wp-content/uploads/2016/03/PP-RECIPE.jpg",
  "Bhatmas (Soybeans)": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMKG7xThzUgworu36NVnYFUQmgd5dZJxsSsg&s",
  "Til (Sesame Seeds)": "https://img.drz.lazcdn.com/static/np/p/91fd645a3eaf78942dff13ef188543aa.jpg_720x720q80.jpg",
  "Aam (Mango)": "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop",
  "Kera (Banana)": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
  "Suntala (Orange)": "https://mato.com.np/wp-content/uploads/2022/04/orange-nepali.jpg",
  "Kheer (Rice Pudding)":
    "https://www.endofthefork.com/wp-content/uploads/2017/10/Saffron-Cardamom-kheer-1200x1200-1.jpg",
  "Achar (Mixed Pickle)": "https://acharmart.com/wp-content/uploads/2021/10/mix-pickle-6.webp",
}

// Comprehensive Nepali Food Database with accurate macros
const nepaliNutritionDatabase: Omit<Food, "id" | "image">[] = [
  // Traditional Staples
  {
    name: "Dal Bhat (Lentil Rice)",
    description: "Traditional Nepali meal with lentils and rice, the cornerstone of Nepali cuisine",
    servingSize: "1 plate (300g)",
    calories: 520,
    protein: 18.5,
    carbs: 95.2,
    fats: 4.8,
    tags: ["High Protein", "Veg", "Traditional"],
    category: "Main Meals",
  },
  {
  name: "Oats (100 g dry, rolled)",
  description: "Uncooked rolled oats – whole grain, high fiber",
  servingSize: "100 g",
  calories: 379,
  protein: 13,
  carbs: 68,
  fats: 6.5,
  tags: ["Grain", "Whole‑grain", "Fiber‑rich"],
  category: "Grains",
},
{
  name: "Boiled Egg (large, approx 50 g)",
  description: "Hard‑boiled whole egg",
  servingSize: "1 large (50 g)",
  calories: 78,
  protein: 6.3,
  carbs: 0.6,
  fats: 5.3,
  tags: ["Animal protein", "Low‑carb", "Whole food"],
  category: "Protein",
},
{
  name: "Omelette (2 large eggs, minimal oil)",
  description: "Plain omelette made from 2 large eggs and ~1 tsp olive oil",
  servingSize: "1 omelette (~122 g)",
  calories: 221,
  protein: 12, 
  carbs: 1.2,
  fats: 17,
  tags: ["Animal protein", "Low‑carb", "Cooked"],
  category: "Protein",
},
  {
    name: "Gundruk (Fermented Greens)",
    description: "Fermented leafy vegetables, rich in probiotics and vitamins",
    servingSize: "100g",
    calories: 45,
    protein: 4.2,
    carbs: 6.8,
    fats: 0.8,
    tags: ["Low Carb", "Veg", "Fermented", "High Fiber"],
    category: "Vegetables",
  },
  {
    name: "Sel Roti",
    description: "Traditional ring-shaped sweet bread made from rice flour",
    servingSize: "2 pieces (80g)",
    calories: 285,
    protein: 5.2,
    carbs: 58.4,
    fats: 4.8,
    tags: ["Veg", "Traditional", "Sweet"],
    category: "Snacks",
  },
  {
  name: "Roti (Whole Wheat)",
  description: "Medium whole‑wheat flatbread made from atta flour",
  servingSize: "1 medium (50 g)",
  calories: 132,
  protein: 4.8,
  carbs: 27.9,
  fats: 0.65,
  tags: ["Grain", "Whole‑grain", "Fiber‑rich"],
  category: "Grains",
},

  // Meat and Protein Sources
  {
    name: "Buff Sukuti (Dried Buffalo)",
    description: "Traditional dried buffalo meat, extremely high in protein",
    servingSize: "50g",
    calories: 165,
    protein: 32.5,
    carbs: 1.2,
    fats: 3.8,
    tags: ["High Protein", "Low Carb", "Non-Veg", "Dried"],
    category: "Protein",
  },
  {
    name: "Khasi Ko Masu (Goat Curry)",
    description: "Traditional goat meat curry, lean and protein-rich",
    servingSize: "150g",
    calories: 245,
    protein: 28.5,
    carbs: 3.2,
    fats: 12.8,
    tags: ["High Protein", "Low Carb", "Non-Veg"],
    category: "Main Meals",
  },
  {
    name: "Kukhura Ko Masu (Chicken Curry)",
    description: "Traditional chicken curry with spices",
    servingSize: "150g",
    calories: 220,
    protein: 26.8,
    carbs: 4.5,
    fats: 10.2,
    tags: ["High Protein", "Low Carb", "Non-Veg"],
    category: "Main Meals",
  },
  {
    name: "Machha (Fish Curry)",
    description: "Fresh water fish curry, common in Terai region",
    servingSize: "150g",
    calories: 185,
    protein: 24.2,
    carbs: 2.8,
    fats: 8.5,
    tags: ["High Protein", "Low Carb", "Non-Veg", "Omega-3"],
    category: "Main Meals",
  },

  // Dumplings and Popular Foods
  {
    name: "Momo (Chicken)",
    description: "Steamed chicken dumplings with traditional spices",
    servingSize: "10 pieces (200g)",
    calories: 320,
    protein: 18.5,
    carbs: 35.2,
    fats: 12.8,
    tags: ["High Protein", "Non-Veg", "Popular"],
    category: "Snacks",
  },
  {
    name: "Momo (Vegetable)",
    description: "Steamed vegetable dumplings with cabbage and spices",
    servingSize: "10 pieces (200g)",
    calories: 280,
    protein: 12.2,
    carbs: 42.5,
    fats: 8.5,
    tags: ["Veg", "Popular"],
    category: "Snacks",
  },
  {
    name: "Momo (Buff)",
    description: "Traditional buffalo meat dumplings",
    servingSize: "10 pieces (200g)",
    calories: 340,
    protein: 20.8,
    carbs: 32.5,
    fats: 15.2,
    tags: ["High Protein", "Non-Veg", "Traditional"],
    category: "Snacks",
  },
  {
    name: "Kothey Momo",
    description: "Pan-fried dumplings with crispy bottom",
    servingSize: "8 pieces (180g)",
    calories: 385,
    protein: 16.8,
    carbs: 38.5,
    fats: 18.2,
    tags: ["High Protein", "Non-Veg", "Fried"],
    category: "Snacks",
  },

  // Soups and Broths
  {
    name: "Thukpa (Chicken)",
    description: "Hearty noodle soup with chicken and vegetables",
    servingSize: "1 bowl (350g)",
    calories: 420,
    protein: 22.5,
    carbs: 48.2,
    fats: 15.8,
    tags: ["High Protein", "Non-Veg", "Soup"],
    category: "Main Meals",
  },
  {
    name: "Thukpa (Vegetable)",
    description: "Noodle soup with mixed vegetables and herbs",
    servingSize: "1 bowl (350g)",
    calories: 350,
    protein: 14.2,
    carbs: 58.5,
    fats: 8.5,
    tags: ["Veg", "Soup", "High Fiber"],
    category: "Main Meals",
  },

  // Vegetables and Greens
  {
    name: "Saag (Spinach Curry)",
    description: "Traditional spinach curry with garlic and spices",
    servingSize: "150g",
    calories: 85,
    protein: 5.8,
    carbs: 8.2,
    fats: 3.5,
    tags: ["Low Carb", "Veg", "High Iron", "High Fiber"],
    category: "Vegetables",
  },
  {
    name: "Iskus (Chayote)",
    description: "Chayote squash curry, mild and nutritious",
    servingSize: "150g",
    calories: 65,
    protein: 2.8,
    carbs: 12.5,
    fats: 1.2,
    tags: ["Low Carb", "Veg", "High Fiber"],
    category: "Vegetables",
  },
  {
    name: "Karela (Bitter Gourd)",
    description: "Bitter gourd curry, excellent for blood sugar",
    servingSize: "150g",
    calories: 55,
    protein: 3.5,
    carbs: 8.2,
    fats: 1.8,
    tags: ["Low Carb", "Veg", "Medicinal", "High Fiber"],
    category: "Vegetables",
  },
  {
    name: "Pharsi (Pumpkin)",
    description: "Sweet pumpkin curry with spices",
    servingSize: "150g",
    calories: 75,
    protein: 2.2,
    carbs: 16.8,
    fats: 0.8,
    tags: ["Veg", "Sweet", "High Fiber"],
    category: "Vegetables",
  },

  // Legumes and Pulses
  {
    name: "Kalo Dal (Black Lentils)",
    description: "Black lentils, protein-rich and creamy when cooked",
    servingSize: "1 cup cooked (200g)",
    calories: 230,
    protein: 15.8,
    carbs: 35.2,
    fats: 2.8,
    tags: ["High Protein", "Veg", "High Fiber"],
    category: "Legumes",
  },
  {
    name: "Rahar Dal (Pigeon Peas)",
    description: "Yellow pigeon peas, staple protein source",
    servingSize: "1 cup cooked (200g)",
    calories: 210,
    protein: 14.2,
    carbs: 38.5,
    fats: 1.8,
    tags: ["High Protein", "Veg", "High Fiber"],
    category: "Legumes",
  },
  {
    name: "Mung Dal (Green Lentils)",
    description: "Green mung beans, easy to digest",
    servingSize: "1 cup cooked (200g)",
    calories: 195,
    protein: 13.5,
    carbs: 32.8,
    fats: 1.5,
    tags: ["High Protein", "Veg", "Easy Digest"],
    category: "Legumes",
  },
  {
    name: "Chana (Chickpeas)",
    description: "Chickpea curry, high in protein and fiber",
    servingSize: "1 cup cooked (200g)",
    calories: 245,
    protein: 16.8,
    carbs: 38.2,
    fats: 4.2,
    tags: ["High Protein", "Veg", "High Fiber"],
    category: "Legumes",
  },

  // Rice and Grains
  {
    name: "Basmati Chamal (Rice)",
    description: "Aromatic basmati rice, staple carbohydrate",
    servingSize: "1 cup cooked (200g)",
    calories: 280,
    protein: 6.2,
    carbs: 58.5,
    fats: 1.8,
    tags: ["Veg", "Staple"],
    category: "Grains",
  },
  {
    name: "Bhuteko Bhat (Fried Rice)",
    description: "Fried rice with vegetables and spices",
    servingSize: "1 plate (250g)",
    calories: 385,
    protein: 8.5,
    carbs: 65.2,
    fats: 12.8,
    tags: ["Veg", "Fried"],
    category: "Main Meals",
  },
  {
    name: "Chiura (Beaten Rice)",
    description: "Flattened rice, light and easily digestible",
    servingSize: "1 cup (100g)",
    calories: 325,
    protein: 7.8,
    carbs: 68.5,
    fats: 2.2,
    tags: ["Veg", "Quick", "Traditional"],
    category: "Grains",
  },

  // Dairy and Beverages
  {
    name: "Dahi (Yogurt)",
    description: "Traditional homemade yogurt, probiotic-rich",
    servingSize: "1 cup (200g)",
    calories: 125,
    protein: 8.5,
    carbs: 12.2,
    fats: 4.8,
    tags: ["High Protein", "Veg", "Probiotic"],
    category: "Dairy",
  },
  {
    name: "Lassi (Yogurt Drink)",
    description: "Traditional yogurt-based drink, sweet or salty",
    servingSize: "1 glass (250ml)",
    calories: 165,
    protein: 6.8,
    carbs: 22.5,
    fats: 5.2,
    tags: ["Veg", "Probiotic", "Refreshing"],
    category: "Beverages",
  },
  {
    name: "Chiya (Milk Tea)",
    description: "Traditional spiced milk tea with sugar",
    servingSize: "1 cup (200ml)",
    calories: 85,
    protein: 2.8,
    carbs: 12.5,
    fats: 2.8,
    tags: ["Veg", "Traditional"],
    category: "Beverages",
  },

  // Street Food and Modern
  {
    name: "Chowmein (Nepali Style)",
    description: "Stir-fried noodles with vegetables, Nepali style",
    servingSize: "1 plate (250g)",
    calories: 385,
    protein: 12.8,
    carbs: 58.5,
    fats: 12.2,
    tags: ["Veg", "Street Food"],
    category: "Main Meals",
  },
  {
    name: "Chatamari (Nepali Pizza)",
    description: "Traditional rice crepe with toppings",
    servingSize: "2 pieces (150g)",
    calories: 245,
    protein: 8.5,
    carbs: 38.2,
    fats: 7.8,
    tags: ["Veg", "Traditional", "Street Food"],
    category: "Snacks",
  },
  {
    name: "Samosa",
    description: "Deep-fried pastry with spiced potato filling",
    servingSize: "2 pieces (100g)",
    calories: 285,
    protein: 6.2,
    carbs: 32.5,
    fats: 15.8,
    tags: ["Veg", "Fried", "Street Food"],
    category: "Snacks",
  },

  // Traditional Newari Foods
  {
    name: "Yomari",
    description: "Traditional Newari steamed dumpling with molasses",
    servingSize: "2 pieces (120g)",
    calories: 265,
    protein: 6.8,
    carbs: 52.5,
    fats: 4.2,
    tags: ["Veg", "Traditional", "Sweet", "Newari"],
    category: "Desserts",
  },
  {
    name: "Wo (Lentil Pancake)",
    description: "Traditional Newari lentil pancake",
    servingSize: "2 pieces (100g)",
    calories: 185,
    protein: 12.5,
    carbs: 22.8,
    fats: 5.8,
    tags: ["High Protein", "Veg", "Traditional", "Newari"],
    category: "Snacks",
  },

  // Nuts, Seeds and Healthy Snacks
  {
    name: "Bhatmas (Soybeans)",
    description: "Roasted soybeans, high protein snack",
    servingSize: "50g",
    calories: 185,
    protein: 16.8,
    carbs: 8.5,
    fats: 9.2,
    tags: ["High Protein", "Veg", "Roasted"],
    category: "Nuts & Seeds",
  },
  {
    name: "Til (Sesame Seeds)",
    description: "Sesame seeds, rich in healthy fats",
    servingSize: "2 tbsp (20g)",
    calories: 115,
    protein: 3.8,
    carbs: 4.2,
    fats: 10.2,
    tags: ["High Fat", "Veg", "Healthy Fats"],
    category: "Nuts & Seeds",
  },

  // Common Fruits
  {
    name: "Aam (Mango)",
    description: "Sweet tropical mango, rich in vitamins",
    servingSize: "1 medium (200g)",
    calories: 125,
    protein: 1.8,
    carbs: 31.2,
    fats: 0.8,
    tags: ["Veg", "Sweet", "High Vitamin C"],
    category: "Fruits",
  },
  {
    name: "Kera (Banana)",
    description: "Common banana variety, good source of potassium",
    servingSize: "1 medium (120g)",
    calories: 105,
    protein: 1.2,
    carbs: 27.8,
    fats: 0.4,
    tags: ["Veg", "Sweet", "High Potassium"],
    category: "Fruits",
  },
  {
    name: "Suntala (Orange)",
    description: "Local orange variety, high in vitamin C",
    servingSize: "1 medium (150g)",
    calories: 65,
    protein: 1.2,
    carbs: 16.2,
    fats: 0.2,
    tags: ["Veg", "High Vitamin C", "Low Calorie"],
    category: "Fruits",
  },

  // Additional Traditional Foods
  {
    name: "Kheer (Rice Pudding)",
    description: "Sweet rice pudding with milk and cardamom",
    servingSize: "1 bowl (150g)",
    calories: 285,
    protein: 8.2,
    carbs: 48.5,
    fats: 7.8,
    tags: ["Veg", "Sweet", "Traditional"],
    category: "Desserts",
  },
  {
    name: "Achar (Mixed Pickle)",
    description: "Traditional mixed vegetable pickle with spices",
    servingSize: "2 tbsp (30g)",
    calories: 45,
    protein: 1.2,
    carbs: 6.8,
    fats: 1.8,
    tags: ["Veg", "Fermented", "Spicy"],
    category: "Condiments",
  },
]

// Convert to full Food objects with IDs and relevant images
const initialFoods: Food[] = nepaliNutritionDatabase.map((food, index) => ({
  ...food,
  id: index + 1,
  image: foodImages[food.name] || `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(food.name)}`,
}))

const filterTags = ["High Protein", "Low Carb", "Veg", "Non-Veg", "Traditional", "Street Food"]
const categories = [
  "All",
  "Main Meals",
  "Snacks",
  "Vegetables",
  "Legumes",
  "Grains",
  "Protein",
  "Dairy",
  "Fruits",
  "Desserts",
]

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [foods, setFoods] = useState<Food[]>(initialFoods)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [currentView, setCurrentView] = useState<"home" | "log" | "search" | "settings">("search")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch =
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => food.tags.includes(tag))
      const matchesCategory = selectedCategory === "All" || food.category === selectedCategory
      return matchesSearch && matchesTags && matchesCategory
    })
  }, [foods, searchTerm, selectedTags, selectedCategory])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const toggleFavorite = (foodId: number) => {
    setFoods((prev) => prev.map((food) => (food.id === foodId ? { ...food, isFavorite: !food.isFavorite } : food)))
  }

  const addFood = (newFood: Omit<Food, "id">) => {
    const food: Food = {
      ...newFood,
      id: Math.max(...foods.map((f) => f.id)) + 1,
    }
    setFoods((prev) => [...prev, food])
    setShowAddForm(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#131712] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a5c47] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  if (selectedFood) {
    return (
      <FoodDetail
        food={selectedFood}
        onBack={() => setSelectedFood(null)}
        onToggleFavorite={() => toggleFavorite(selectedFood.id)}
      />
    )
  }

  if (showAddForm) {
    return <AddFoodForm onSubmit={addFood} onCancel={() => setShowAddForm(false)} />
  }

  if (currentView === "home") {
    return <HomeView onViewChange={setCurrentView} totalFoods={foods.length} />
  }

  if (currentView === "log") {
    return <LogView onViewChange={setCurrentView} onShowAddForm={() => setShowAddForm(true)} />
  }

  if (currentView === "settings") {
    return <SettingsView onViewChange={setCurrentView} />
  }

  return (
    <div className="min-h-screen bg-[#131712] flex" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative">
            <Sidebar currentView={currentView} onViewChange={setCurrentView} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-[#131712] border-b border-[#2d372a] sticky top-0 z-40">
          <div className="flex items-center justify-between p-4 lg:px-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white p-2 hover:bg-[#2d372a] rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            {/* Desktop Back Button */}
            <div className="hidden lg:flex text-white items-center">
              <ArrowLeft size={24} />
            </div>

            <div className="flex-1 text-center lg:text-left lg:ml-4">
              <h2 className="text-white text-lg lg:text-xl font-bold">Nepali Foods Database</h2>
              <p className="text-[#a5b6a0] text-sm">
                {filteredFoods.length} of {foods.length} foods
              </p>
            </div>

            {/* Add Food Button - Desktop */}
            <button
              onClick={() => setShowAddForm(true)}
              className="hidden lg:flex items-center gap-2 bg-[#4a5c47] hover:bg-[#5a6c57] text-white px-4 py-2 rounded-lg transition-colors"
            >
              <PlusSquare size={20} />
              Add Food
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-4 lg:px-6 pb-4">
            <div className="flex items-center bg-[#2d372a] rounded-xl h-12 lg:h-14">
              <div className="text-[#a5b6a0] flex items-center justify-center pl-4">
                <Search size={24} />
              </div>
              <input
                placeholder="Search Nepali foods..."
                className="flex-1 bg-transparent text-white placeholder:text-[#a5b6a0] px-4 text-base lg:text-lg font-normal focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="px-4 lg:px-6 pb-2">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-[#4a5c47] text-white"
                      : "bg-[#2d372a] text-[#a5b6a0] hover:bg-[#3d473a] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Tags */}
          <div className="px-4 lg:px-6 pb-4">
            <div className="flex gap-2 lg:gap-3 flex-wrap">
              {filterTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-[#4a5c47] text-white"
                      : "bg-[#2d372a] text-[#a5b6a0] hover:bg-[#3d473a] hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Food List */}
        <div className="flex-1 overflow-y-auto">
          {filteredFoods.length === 0 ? (
            <div className="flex items-center justify-center h-64 lg:h-96">
              <div className="text-center">
                <div className="text-[#a5b6a0] text-lg lg:text-xl mb-2">No foods found</div>
                <div className="text-sm lg:text-base text-[#a5b6a0]">Try adjusting your search or filters</div>
              </div>
            </div>
          ) : (
            <div className="p-4 lg:p-6">
              {/* Mobile: List View */}
              <div className="lg:hidden space-y-4">
                {filteredFoods.map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onClick={() => setSelectedFood(food)}
                    onToggleFavorite={() => toggleFavorite(food.id)}
                    layout="mobile"
                  />
                ))}
              </div>

              {/* Desktop: Grid View */}
              <div className="hidden lg:grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {filteredFoods.map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onClick={() => setSelectedFood(food)}
                    onToggleFavorite={() => toggleFavorite(food.id)}
                    layout="desktop"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden">
          <div className="flex border-t border-[#2d372a] bg-[#1f251d] px-4 py-2">
            <button
              onClick={() => setCurrentView("home")}
              className={`flex flex-1 flex-col items-center gap-1 py-2 ${
                currentView === "home" ? "text-white" : "text-[#a5b6a0]"
              }`}
            >
              <Home size={24} />
              <span className="text-xs font-medium">Home</span>
            </button>

            <button
              onClick={() => setCurrentView("log")}
              className={`flex flex-1 flex-col items-center gap-1 py-2 ${
                currentView === "log" ? "text-white" : "text-[#a5b6a0]"
              }`}
            >
              <PlusSquare size={24} />
              <span className="text-xs font-medium">Log</span>
            </button>

            <button
              onClick={() => setCurrentView("search")}
              className={`flex flex-1 flex-col items-center gap-1 py-2 ${
                currentView === "search" ? "text-white" : "text-[#a5b6a0]"
              }`}
            >
              <MagnifyingGlass size={24} fill={currentView === "search" ? "currentColor" : "none"} />
              <span className="text-xs font-medium">Search</span>
            </button>

            <button
              onClick={() => setCurrentView("settings")}
              className={`flex flex-1 flex-col items-center gap-1 py-2 ${
                currentView === "settings" ? "text-white" : "text-[#a5b6a0]"
              }`}
            >
              <Settings size={24} />
              <span className="text-xs font-medium">Settings</span>
            </button>
          </div>
          <div className="h-safe-area-inset-bottom bg-[#1f251d]"></div>
        </div>
      </div>
    </div>
  )
}

// Updated placeholder components with full navigation and responsive design
function HomeView({
  onViewChange,
  totalFoods,
}: { onViewChange: (view: "home" | "log" | "search" | "settings") => void; totalFoods: number }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#131712] flex" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar currentView="home" onViewChange={onViewChange} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative">
            <Sidebar currentView="home" onViewChange={onViewChange} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-[#131712] border-b border-[#2d372a] sticky top-0 z-40">
          <div className="flex items-center justify-between p-4 lg:px-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white p-2 hover:bg-[#2d372a] rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            <div className="flex-1 text-center lg:text-left lg:ml-4">
              <h2 className="text-white text-lg lg:text-xl font-bold">Dashboard</h2>
              <p className="text-[#a5b6a0] text-sm">Welcome to Pikera Fitness</p>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
              <div className="bg-[#2d372a] rounded-xl p-6">
                <div className="text-3xl lg:text-4xl font-bold text-[#4a5c47] mb-2">{totalFoods}</div>
                <div className="text-[#a5b6a0] text-sm lg:text-base">Total Foods</div>
              </div>
              <div className="bg-[#2d372a] rounded-xl p-6">
                <div className="text-3xl lg:text-4xl font-bold text-[#4a5c47] mb-2">12</div>
                <div className="text-[#a5b6a0] text-sm lg:text-base">Categories</div>
              </div>
              <div className="bg-[#2d372a] rounded-xl p-6">
                <div className="text-3xl lg:text-4xl font-bold text-[#4a5c47] mb-2">0</div>
                <div className="text-[#a5b6a0] text-sm lg:text-base">Foods Logged Today</div>
              </div>
              <div className="bg-[#2d372a] rounded-xl p-6">
                <div className="text-3xl lg:text-4xl font-bold text-[#4a5c47] mb-2">0</div>
                <div className="text-[#a5b6a0] text-sm lg:text-base">Favorites</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
              <button
                onClick={() => onViewChange("search")}
                className="bg-[#4a5c47] hover:bg-[#5a6c57] text-white p-6 rounded-xl text-left transition-colors"
              >
                <MagnifyingGlass className="w-8 h-8 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Search Foods</h3>
                <p className="text-sm opacity-90">Find nutrition info for Nepali foods</p>
              </button>
              <button
                onClick={() => onViewChange("log")}
                className="bg-[#2d372a] hover:bg-[#3d473a] text-white p-6 rounded-xl text-left transition-colors"
              >
                <PlusSquare className="w-8 h-8 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Log Food</h3>
                <p className="text-sm opacity-90">Track your daily nutrition</p>
              </button>
              <button
                onClick={() => onViewChange("settings")}
                className="bg-[#2d372a] hover:bg-[#3d473a] text-white p-6 rounded-xl text-left transition-colors"
              >
                <Settings className="w-8 h-8 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Settings</h3>
                <p className="text-sm opacity-90">Customize your experience</p>
              </button>
            </div>

            {/* Welcome Section */}
            <div className="bg-[#2d372a] rounded-xl p-6 lg:p-8">
              <h2 className="text-white text-xl lg:text-2xl font-bold mb-4">Welcome to Pikera Fitness Nutrition</h2>
              <p className="text-[#a5b6a0] text-base lg:text-lg mb-6">
                Your comprehensive guide to traditional Nepali food nutrition. Track macros, discover new foods, and
                maintain a healthy lifestyle with authentic Nepali cuisine.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1f251d] rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">🥘 Traditional Foods</h3>
                  <p className="text-[#a5b6a0] text-sm">Dal Bhat, Gundruk, Sel Roti and more</p>
                </div>
                <div className="bg-[#1f251d] rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">📊 Accurate Macros</h3>
                  <p className="text-[#a5b6a0] text-sm">Protein, carbs, fats, and calories</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden">
          <div className="flex border-t border-[#2d372a] bg-[#1f251d] px-4 py-2">
            <button
              onClick={() => onViewChange("home")}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-white"
            >
              <Home size={24} />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              onClick={() => onViewChange("log")}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-[#a5b6a0]"
            >
              <PlusSquare size={24} />
              <span className="text-xs font-medium">Log</span>
            </button>
            <button
              onClick={() => onViewChange("search")}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-[#a5b6a0]"
            >
              <MagnifyingGlass size={24} />
              <span className="text-xs font-medium">Search</span>
            </button>
            <button
              onClick={() => onViewChange("settings")}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-[#a5b6a0]"
            >
              <Settings size={24} />
              <span className="text-xs font-medium">Settings</span>
            </button>
          </div>
          <div className="h-safe-area-inset-bottom bg-[#1f251d]"></div>
        </div>
      </div>
    </div>
  )
}

function LogView({
  onViewChange,
  onShowAddForm,
}: { onViewChange: (view: "home" | "log" | "search" | "settings") => void; onShowAddForm: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  return (
    <div className="min-h-screen bg-[#131712] flex" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar currentView="log" onViewChange={onViewChange} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative">
            <Sidebar currentView="log" onViewChange={onViewChange} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-[#131712] border-b border-[#2d372a] sticky top-0 z-40">
          <div className="flex items-center justify-between p-4 lg:px-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white p-2 hover:bg-[#2d372a] rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            <div className="flex-1 text-center lg:text-left lg:ml-4">
              <h2 className="text-white text-lg lg:text-xl font-bold">Food Log</h2>
              <p className="text-[#a5b6a0] text-sm">Track your daily nutrition</p>
            </div>

            {/* Add Food Button - Desktop */}
            <button
              onClick={onShowAddForm}
              className="hidden lg:flex items-center gap-2 bg-[#4a5c47] hover:bg-[#5a6c57] text-white px-4 py-2 rounded-lg transition-colors"
            >
              <PlusSquare size={20} />
              Add Food
            </button>
          </div>

          {/* Date Selector */}
          <div className="px-4 lg:px-6 pb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-[#2d372a] text-white border border-[#3d473a] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a5c47]"
            />
          </div>
        </div>

        {/* Log Content */}
        <div className="flex-1 p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Daily Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#2d372a] rounded-xl p-4 lg:p-6">
                <div className="text-2xl lg:text-3xl font-bold text-[#4a5c47] mb-1">0</div>
                <div className="text-[#a5b6a0] text-sm">Calories</div>
              </div>
              <div className="bg-[#2d372a] rounded-xl p-4 lg:p-6">
                <div className="text-2xl lg:text-3xl font-bold text-[#4a5c47] mb-1">0g</div>
                <div className="text-[#a5b6a0] text-sm">Protein</div>
              </div>
              <div className="bg-[#2d372a] rounded-xl p-4 lg:p-6">
                <div className="text-2xl lg:text-3xl font-bold text-[#4a5c47] mb-1">0g</div>
                <div className="text-[#a5b6a0] text-sm">Carbs</div>
              </div>
              <div className="bg-[#2d372a] rounded-xl p-4 lg:p-6">
                <div className="text-2xl lg:text-3xl font-bold text-[#4a5c47] mb-1">0g</div>
                <div className="text-[#a5b6a0] text-sm">Fats</div>
              </div>
            </div>

            {/* Meals Section */}
            <div className="space-y-6">
              {["Breakfast", "Lunch", "Dinner", "Snacks"].map((meal) => (
                <div key={meal} className="bg-[#2d372a] rounded-xl p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-lg font-semibold">{meal}</h3>
                    <button onClick={onShowAddForm} className="text-[#4a5c47] hover:text-[#5a6c57] transition-colors">
                      <PlusSquare size={20} />
                    </button>
                  </div>
                  <div className="text-center py-8">
                    <div className="text-[#a5b6a0] mb-4">No foods logged for {meal.toLowerCase()}</div>
                    <button
                      onClick={onShowAddForm}
                      className="bg-[#4a5c47] hover:bg-[#5a6c57] text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      Add Food
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden">
          <div className="flex border-t border-[#2d372a] bg-[#1f251d] px-4 py-2">
            <button
              onClick={() => onViewChange("home")}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-[#a5b6a0]"
            >
              <Home size={24} />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              onClick={() => onViewChange("log")}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-white"
            >
              <PlusSquare size={24} />
              <span className="text-xs font-medium">Log</span>
            </button>
            <button
              onClick={() => onViewChange("search")}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-[#a5b6a0]"
            >
              <MagnifyingGlass size={24} />
              <span className="text-xs font-medium">Search</span>
            </button>
            <button
              onClick={() => onViewChange("settings")}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-[#a5b6a0]"
            >
              <Settings size={24} />
              <span className="text-xs font-medium">Settings</span>
            </button>
          </div>
          <div className="h-safe-area-inset-bottom bg-[#1f251d]"></div>
        </div>
      </div>
    </div>
  )
}

function SettingsView({ onViewChange }: { onViewChange: (view: "home" | "log" | "search" | "settings") => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#131712] flex" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar currentView="settings" onViewChange={onViewChange} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative">
            <Sidebar currentView="settings" onViewChange={onViewChange} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-[#131712] border-b border-[#2d372a] sticky top-0 z-40">
          <div className="flex items-center justify-between p-4 lg:px-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white p-2 hover:bg-[#2d372a] rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            <div className="flex-1 text-center lg:text-left lg:ml-4">
              <h2 className="text-white text-lg lg:text-xl font-bold">Settings</h2>
              <p className="text-[#a5b6a0] text-sm">Customize your experience</p>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-4 lg:p-8">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Profile Section */}
            {user && (
              <div className="bg-[#2d372a] rounded-xl p-4 lg:p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Profile</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#4a5c47] rounded-full flex items-center justify-center">
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url || "/placeholder.svg"}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-xl font-bold">
                        {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="text-white font-medium">{user.user_metadata?.full_name || "User"}</div>
                    <div className="text-[#a5b6a0] text-sm">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}

            {/* App Preferences */}
            <div className="bg-[#2d372a] rounded-xl p-4 lg:p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Dark Mode</div>
                    <div className="text-[#a5b6a0] text-sm">Currently enabled</div>
                  </div>
                  <div className="w-12 h-6 bg-[#4a5c47] rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Notifications</div>
                    <div className="text-[#a5b6a0] text-sm">Get reminders to log meals</div>
                  </div>
                  <div className="w-12 h-6 bg-[#1f251d] rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nutrition Goals */}
            <div className="bg-[#2d372a] rounded-xl p-4 lg:p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Nutrition Goals</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#a5b6a0] text-sm">Daily Calories</label>
                  <input
                    type="number"
                    placeholder="2000"
                    className="w-full bg-[#1f251d] text-white border border-[#3d473a] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#4a5c47]"
                  />
                </div>
                <div>
                  <label className="text-[#a5b6a0] text-sm">Protein (g)</label>
                  <input
                    type="number"
                    placeholder="150"
                    className="w-full bg-[#1f251d] text-white border border-[#3d473a] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#4a5c47]"
                  />
                </div>
                <div>
                  <label className="text-[#a5b6a0] text-sm">Carbs (g)</label>
                  <input
                    type="number"
                    placeholder="250"
                    className="w-full bg-[#1f251d] text-white border border-[#3d473a] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#4a5c47]"
                  />
                </div>
                <div>
                  <label className="text-[#a5b6a0] text-sm">Fats (g)</label>
                  <input
                    type="number"
                    placeholder="67"
                    className="w-full bg-[#1f251d] text-white border border-[#3d473a] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#4a5c47]"
                  />
                </div>
              </div>
              <button className="w-full bg-[#4a5c47] hover:bg-[#5a6c57] text-white px-4 py-2 rounded-lg transition-colors mt-4">
                Save Goals
              </button>
            </div>

            {/* About */}
            <div className="bg-[#2d372a] rounded-xl p-4 lg:p-6">
              <h3 className="text-white text-lg font-semibold mb-4">About</h3>
              <div className="text-[#a5b6a0] space-y-2">
                <div>Version 1.0.0</div>
                <div>Made for Nepali fitness creators</div>
                <div>© 2024 Pikera Fitness</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden">
          <div className="flex border-t border-[#2d372a] bg-[#1f251d] px-4 py-2">
            <button
              onClick={() => onViewChange("home")}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-[#a5b6a0]"
            >
              <Home size={24} />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              onClick={() => onViewChange("log")}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-[#a5b6a0]"
            >
              <PlusSquare size={24} />
              <span className="text-xs font-medium">Log</span>
            </button>
            <button
              onClick={() => onViewChange("search")}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-[#a5b6a0]"
            >
              <MagnifyingGlass size={24} />
              <span className="text-xs font-medium">Search</span>
            </button>
            <button
              onClick={() => onViewChange("settings")}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-white"
            >
              <Settings size={24} />
              <span className="text-xs font-medium">Settings</span>
            </button>
          </div>
          <div className="h-safe-area-inset-bottom bg-[#1f251d]"></div>
        </div>
      </div>
    </div>
  )
}
