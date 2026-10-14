/**
 * FitPulse Pro - Fitness Database
 * Contains exercise routines categorized by goal, protein food sources with real market pricing (INR),
 * and curated budget meal plan blueprints.
 */

const FITNESS_DATA = {
  // Goals Configuration
  goals: {
    reduce_fat: {
      id: "reduce_fat",
      name: "Reduce Fat / Weight Loss",
      tagline: "Burn stubborn fat, boost metabolism & preserve lean muscle",
      icon: "🔥",
      accentColor: "#FF4757",
      proteinFactor: 2.0, // 2.0g per kg during deficit to preserve muscle
      calorieAdjustment: -500, // 500 kcal deficit
      carbRatio: 0.35,
      fatRatio: 0.25,
      proteinRatio: 0.40,
      description: "A calorie-controlled fat shredding protocol combining compound strength supersets with metabolic conditioning to burn maximum calories without losing hard-earned muscle."
    },
    gain_muscle: {
      id: "gain_muscle",
      name: "Gain Muscle / Hypertrophy",
      tagline: "Build lean muscle mass, sculpt aesthetics & increase strength",
      icon: "💪",
      accentColor: "#00F59B",
      proteinFactor: 1.8, // 1.8g per kg
      calorieAdjustment: 300, // 300 kcal lean surplus
      carbRatio: 0.45,
      fatRatio: 0.25,
      proteinRatio: 0.30,
      description: "Science-backed hypertrophy routines targeting mechanical tension, metabolic stress, and progressive overload with 8-12 rep ranges."
    },
    gain_fat: {
      id: "gain_fat",
      name: "Gain Weight / Mass Bulking",
      tagline: "Overcome fast metabolism, pack on size & build raw mass",
      icon: "🏋️‍♂️",
      accentColor: "#F59E0B",
      proteinFactor: 1.6, // 1.6g per kg (high carbs/calories)
      calorieAdjustment: 550, // 550 kcal heavy surplus
      carbRatio: 0.50,
      fatRatio: 0.25,
      proteinRatio: 0.25,
      description: "High-calorie mass-building protocol for hardgainers, focusing on heavy multi-joint compound power lifts and caloric density to add solid size."
    },
    make_abs: {
      id: "make_abs",
      name: "Build Six-Pack Abs & Core",
      tagline: "Carve deep abdominal definition, chisel obliques & trim waistline",
      icon: "⚡",
      accentColor: "#00E5FF",
      proteinFactor: 2.2, // High protein to reach low body fat
      calorieAdjustment: -400, // Moderate deficit to reveal abs
      carbRatio: 0.35,
      fatRatio: 0.25,
      proteinRatio: 0.40,
      description: "Comprehensive 4-dimensional core programming targeting the upper rectus, lower abs, internal/external obliques, and transverse abdominis combined with metabolic shredding."
    },
    endurance: {
      id: "endurance",
      name: "Athletic Endurance & Stamina",
      tagline: "Elevate VO2 max, functional stamina & agility",
      icon: "🏃‍♂️",
      accentColor: "#A855F7",
      proteinFactor: 1.5,
      calorieAdjustment: 150,
      carbRatio: 0.55,
      fatRatio: 0.25,
      proteinRatio: 0.20,
      description: "Dynamic athletic conditioning blending high-volume circuits, aerobic intervals, and functional mobility drills for relentless work capacity."
    }
  },

  // Protein Sources Database (Real INR market costs & nutritional values per 100g or unit)
  proteinSources: [
    {
      id: "soya_chunks",
      name: "Soya Chunks (Nutrela)",
      category: "veg",
      isVegan: true,
      proteinPer100g: 52,
      caloriesPer100g: 345,
      carbsPer100g: 33,
      fatsPer100g: 0.5,
      typicalServingGrams: 50,
      servingUnit: "g",
      costPer100gINR: 16, // ~₹80 for 500g
      bioAvailability: "Good (74)",
      badge: "Highest Value",
      badgeColor: "#00F59B",
      prepTip: "Boil with a pinch of salt, squeeze water out 2-3 times to remove raw soy flavor, saute with garlic, onions and spices."
    },
    {
      id: "eggs_whole",
      name: "Whole Farm Eggs",
      category: "egg",
      isVegan: false,
      proteinPer100g: 13, // ~6.5g per egg (approx 50g)
      caloriesPer100g: 143,
      carbsPer100g: 1,
      fatsPer100g: 9.5,
      typicalServingGrams: 150, // 3 eggs
      servingUnit: "eggs (3 pcs)",
      costPer100gINR: 13, // ~₹6.50 per egg (₹13 per 100g)
      bioAvailability: "Gold Standard (100)",
      badge: "Top Bioavailability",
      badgeColor: "#F59E0B",
      prepTip: "Boiled, scrambled with veggies, or sunny-side up. Complete amino acid profile with vital choline & micronutrients."
    },
    {
      id: "egg_whites",
      name: "Egg Whites Only",
      category: "egg",
      isVegan: false,
      proteinPer100g: 11, // ~3.6g per white
      caloriesPer100g: 52,
      carbsPer100g: 0.7,
      fatsPer100g: 0.2,
      typicalServingGrams: 150, // ~4-5 whites
      servingUnit: "whites (5 pcs)",
      costPer100gINR: 16,
      bioAvailability: "Gold Standard (100)",
      badge: "Pure Lean Protein",
      badgeColor: "#00E5FF",
      prepTip: "Zero fat and pure albumin protein. Perfect for evening snacks or omelettes without adding unwanted calories."
    },
    {
      id: "chicken_breast",
      name: "Fresh Chicken Breast (Boneless)",
      category: "nonveg",
      isVegan: false,
      proteinPer100g: 31,
      caloriesPer100g: 165,
      carbsPer100g: 0,
      fatsPer100g: 3.6,
      typicalServingGrams: 150,
      servingUnit: "g",
      costPer100gINR: 28, // ~₹280/kg
      bioAvailability: "Excellent (80)",
      badge: "Muscle Staple",
      badgeColor: "#FF4757",
      prepTip: "Pan grill with olive oil spray, lemon pepper, and curd marinade. Do not overcook to keep juicy."
    },
    {
      id: "paneer_lowfat",
      name: "Low-Fat / Fresh Paneer",
      category: "veg",
      isVegan: false,
      proteinPer100g: 20,
      caloriesPer100g: 210,
      carbsPer100g: 4,
      fatsPer100g: 12,
      typicalServingGrams: 100,
      servingUnit: "g",
      costPer100gINR: 35, // ~₹350/kg
      bioAvailability: "High (90)",
      badge: "Slow Digesting",
      badgeColor: "#A855F7",
      prepTip: "Rich in slow-release casein protein. Ideal before bedtime to prevent overnight muscle breakdown."
    },
    {
      id: "roasted_chana",
      name: "Roasted Chana / Sattu",
      category: "veg",
      isVegan: true,
      proteinPer100g: 21,
      caloriesPer100g: 380,
      carbsPer100g: 58,
      fatsPer100g: 5.5,
      typicalServingGrams: 60,
      servingUnit: "g",
      costPer100gINR: 15, // ~₹150/kg
      bioAvailability: "Moderate (65)",
      badge: "Desi Superfood",
      badgeColor: "#F59E0B",
      prepTip: "Traditional powerhouse! Drink as savory sattu sharbat with roasted cumin and mint, or munch roasted chana as evening desk snack."
    },
    {
      id: "peanuts",
      name: "Roasted Peanuts / Peanut Butter",
      category: "veg",
      isVegan: true,
      proteinPer100g: 26,
      caloriesPer100g: 567,
      carbsPer100g: 16,
      fatsPer100g: 49,
      typicalServingGrams: 35,
      servingUnit: "g",
      costPer100gINR: 18, // ~₹180/kg
      bioAvailability: "Good (68)",
      badge: "Calorie & Protein Dense",
      badgeColor: "#F97316",
      prepTip: "Unsalted roasted peanuts or 100% natural single-ingredient peanut butter. Fantastic for healthy fats and satiety."
    },
    {
      id: "moong_dal_sprouts",
      name: "Moong Dal Sprouts (Raw/Cooked)",
      category: "veg",
      isVegan: true,
      proteinPer100g: 24, // raw dry equivalent: 24g; sprouted: ~10g per 100g wet
      caloriesPer100g: 340,
      carbsPer100g: 60,
      fatsPer100g: 1.2,
      typicalServingGrams: 60,
      servingUnit: "g (dry weight)",
      costPer100gINR: 14, // ~₹140/kg
      bioAvailability: "Good (70)",
      badge: "High Fiber & Enzymes",
      badgeColor: "#10B981",
      prepTip: "Sprouting increases vitamin C and protein bioavailability. Toss with chaat masala, lemon, cucumber, and onion."
    },
    {
      id: "whey_protein",
      name: "Whey Protein Concentrate (80%)",
      category: "veg",
      isVegan: false,
      proteinPer100g: 78, // ~24g per 30g scoop
      caloriesPer100g: 390,
      carbsPer100g: 8,
      fatsPer100g: 5,
      typicalServingGrams: 32, // 1 scoop
      servingUnit: "scoop (32g)",
      costPer100gINR: 200, // ~₹2000 for 1kg tub = ~₹64 per scoop
      bioAvailability: "Peak (104)",
      badge: "Fast Absorbing",
      badgeColor: "#00E5FF",
      prepTip: "Rapid post-workout digestion. Mix with chilled water or blend into oatmeal / fruit smoothie."
    },
    {
      id: "curd_greek_yogurt",
      name: "Greek Yogurt / Hung Curd (Dahi)",
      category: "veg",
      isVegan: false,
      proteinPer100g: 10,
      caloriesPer100g: 65,
      carbsPer100g: 4,
      fatsPer100g: 0.5,
      typicalServingGrams: 150,
      servingUnit: "g",
      costPer100gINR: 20, // ~₹30 for 150g
      bioAvailability: "High (88)",
      badge: "Probiotic Rich",
      badgeColor: "#3B82F6",
      prepTip: "Strain regular homemade curd through muslin cloth to get high-protein hung curd. Great gut-friendly source."
    },
    {
      id: "tofu_soy_paneer",
      name: "Tofu (Soy Paneer)",
      category: "veg",
      isVegan: true,
      proteinPer100g: 15,
      caloriesPer100g: 125,
      carbsPer100g: 2.5,
      fatsPer100g: 7,
      typicalServingGrams: 120,
      servingUnit: "g",
      costPer100gINR: 24, // ~₹50 for 200g pack
      bioAvailability: "High (78)",
      badge: "100% Plant-Based",
      badgeColor: "#84CC16",
      prepTip: "Press excess moisture out, cube, and pan-sear with soy sauce and chili flakes for a crispy crust."
    },
    {
      id: "double_toned_milk",
      name: "Toned / Cow Milk",
      category: "veg",
      isVegan: false,
      proteinPer100g: 3.3, // ~8.2g per 250ml glass
      caloriesPer100g: 58,
      carbsPer100g: 4.8,
      fatsPer100g: 3,
      typicalServingGrams: 250, // 1 glass (250ml)
      servingUnit: "ml (1 glass)",
      costPer100gINR: 6.5, // ~₹32 per 500ml pouch
      bioAvailability: "High (91)",
      badge: "Daily Essential",
      badgeColor: "#EC4899",
      prepTip: "Blend with oats and banana or drink warm with turmeric before bed for recovery."
    }
  ],

  // Pre-configured Budget Meal Plan Blueprints (Monthly Budget: ₹2000, ₹3000, ₹4000, ₹5000)
  budgetPlans: {
    2000: {
      tier: 2000,
      weeklySchedule: [
      {
            "dayNumber": 1,
            "dayName": "Monday",
            "dayTitle": "Monday (Push Day High-Protein Fuel)",
            "focusTag": "Chest, Delts & Triceps Fuel",
            "tagline": "Energy dense complex fuel to support heavy pressing and rapid upper body glycogen refill.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "soya_chunks",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 31.2,
                              "costINR": 9.6,
                              "timing": "Lunch Sabzi / Pulao"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast Omelette"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Evening Sattu Drink"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 35,
                              "unit": "g",
                              "protein": 9.1,
                              "costINR": 6.3,
                              "timing": "Pre-workout Snack"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 14.4,
                              "costINR": 8.4,
                              "timing": "Dinner Dal Bowl"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 250,
                              "unit": "ml",
                              "protein": 8.2,
                              "costINR": 16,
                              "timing": "Bedtime Drink"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "soya_chunks",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 41.6,
                              "costINR": 12.8,
                              "timing": "Lunch Soya Curry"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 70,
                              "unit": "g",
                              "protein": 14.7,
                              "costINR": 10.5,
                              "timing": "Morning Sattu Shake"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 19.2,
                              "costINR": 11.2,
                              "timing": "Evening Sprouts Chaat"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 10.4,
                              "costINR": 7.2,
                              "timing": "Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 250,
                              "unit": "ml",
                              "protein": 8.2,
                              "costINR": 16,
                              "timing": "Bedtime Recovery"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Dinner Side"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "eggs_whole",
                              "quantity": 200,
                              "unit": "eggs (4 pcs)",
                              "protein": 26,
                              "costINR": 26,
                              "timing": "Breakfast 4 Eggs"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 26,
                              "costINR": 8,
                              "timing": "Lunch Soya Bowl"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Evening Sattu Drink"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 30,
                              "unit": "g",
                              "protein": 7.8,
                              "costINR": 5.4,
                              "timing": "Pre-workout Snack"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 7,
                              "timing": "Dinner Dal"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Night Drink"
                        }
                  ]
            }
      },
      {
            "dayNumber": 2,
            "dayName": "Tuesday",
            "dayTitle": "Tuesday (Pull & Posture Power Fuel)",
            "focusTag": "Lats, Upper Back & Biceps",
            "tagline": "Rich amino acid spectrum for deep lat hypertrophy and joint-protective nutrition.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "eggs_whole",
                              "quantity": 200,
                              "unit": "eggs (4 pcs)",
                              "protein": 26,
                              "costINR": 26,
                              "timing": "Breakfast 4 Boiled Eggs"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 26,
                              "costINR": 8,
                              "timing": "Lunch Soya Bhurji"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 70,
                              "unit": "g",
                              "protein": 16.8,
                              "costINR": 9.8,
                              "timing": "Evening Sprouts Chaat"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 8.4,
                              "costINR": 6,
                              "timing": "Desk Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 250,
                              "unit": "ml",
                              "protein": 8.2,
                              "costINR": 16,
                              "timing": "Bedtime Milk"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "soya_chunks",
                              "quantity": 75,
                              "unit": "g",
                              "protein": 39,
                              "costINR": 12,
                              "timing": "Lunch Soya Pulao"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 90,
                              "unit": "g",
                              "protein": 21.6,
                              "costINR": 12.6,
                              "timing": "Sprouts Salad"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 70,
                              "unit": "g",
                              "protein": 14.7,
                              "costINR": 10.5,
                              "timing": "Sattu Drink"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 35,
                              "unit": "g",
                              "protein": 9.1,
                              "costINR": 6.3,
                              "timing": "Evening Crunch"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 250,
                              "unit": "ml",
                              "protein": 8.2,
                              "costINR": 16,
                              "timing": "Bedtime Drink"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "eggs_whole",
                              "quantity": 250,
                              "unit": "eggs (5 pcs)",
                              "protein": 32.5,
                              "costINR": 32.5,
                              "timing": "Breakfast 5 Eggs"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 45,
                              "unit": "g",
                              "protein": 23.4,
                              "costINR": 7.2,
                              "timing": "Lunch Soya Curry"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Evening Sattu"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 7,
                              "timing": "Dinner Dal"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Bedtime Milk"
                        }
                  ]
            }
      },
      {
            "dayNumber": 3,
            "dayName": "Wednesday",
            "dayTitle": "Wednesday (Heavy Leg Day Refeed)",
            "focusTag": "Quads & Glutes Maximum Output",
            "tagline": "Maximum caloric & protein allocation to support whole-body metabolic leg demands.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "eggs_whole",
                              "quantity": 200,
                              "unit": "eggs (4 pcs)",
                              "protein": 26,
                              "costINR": 26,
                              "timing": "Breakfast Scramble"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 31.2,
                              "costINR": 9.6,
                              "timing": "Lunch Soya & Potato"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 10.4,
                              "costINR": 7.2,
                              "timing": "Pre-Leg Snack"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Post-Leg Sattu Drink"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 250,
                              "unit": "ml",
                              "protein": 8.2,
                              "costINR": 16,
                              "timing": "Bedtime Turmeric Milk"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "soya_chunks",
                              "quantity": 90,
                              "unit": "g",
                              "protein": 46.8,
                              "costINR": 14.4,
                              "timing": "Lunch Soya Biryani"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 13,
                              "costINR": 9,
                              "timing": "Pre-Workout Energy"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 12.6,
                              "costINR": 9,
                              "timing": "Post-Workout Sattu"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 14.4,
                              "costINR": 8.4,
                              "timing": "Dinner Moong Dal"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 250,
                              "unit": "ml",
                              "protein": 8.2,
                              "costINR": 16,
                              "timing": "Bedtime Recovery"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "eggs_whole",
                              "quantity": 250,
                              "unit": "eggs (5 pcs)",
                              "protein": 32.5,
                              "costINR": 32.5,
                              "timing": "Breakfast 5 Eggs"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 26,
                              "costINR": 8,
                              "timing": "Lunch Soya Meal"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 35,
                              "unit": "g",
                              "protein": 9.1,
                              "costINR": 6.3,
                              "timing": "Leg Day Fuel"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 8.4,
                              "costINR": 6,
                              "timing": "Evening Sattu"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Milk"
                        }
                  ]
            }
      },
      {
            "dayNumber": 4,
            "dayName": "Thursday",
            "dayTitle": "Thursday (Active Recovery & Cleanse)",
            "focusTag": "Gut Health & Anti-Inflammation",
            "tagline": "High fiber, fermented probiotics, and lean bioavailable amino acids for cellular repair.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "soya_chunks",
                              "quantity": 70,
                              "unit": "g",
                              "protein": 36.4,
                              "costINR": 11.2,
                              "timing": "Lunch Soya Stew"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 19.2,
                              "costINR": 11.2,
                              "timing": "Mid-day Sprouts Salad"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 12.6,
                              "costINR": 9,
                              "timing": "Recovery Sattu"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 100,
                              "unit": "eggs (2 pcs)",
                              "protein": 13,
                              "costINR": 13,
                              "timing": "Evening Boiled Eggs"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 250,
                              "unit": "ml",
                              "protein": 8.2,
                              "costINR": 16,
                              "timing": "Bedtime Milk"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "soya_chunks",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 41.6,
                              "costINR": 12.8,
                              "timing": "Lunch Soya Curry"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 90,
                              "unit": "g",
                              "protein": 21.6,
                              "costINR": 12.6,
                              "timing": "Sprouts Chaat"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Gut Health Curd"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Sattu Sharbat"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Night Milk"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "eggs_whole",
                              "quantity": 200,
                              "unit": "eggs (4 pcs)",
                              "protein": 26,
                              "costINR": 26,
                              "timing": "Breakfast 4 Eggs"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 55,
                              "unit": "g",
                              "protein": 28.6,
                              "costINR": 8.8,
                              "timing": "Lunch Soya Bowl"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 70,
                              "unit": "g",
                              "protein": 16.8,
                              "costINR": 9.8,
                              "timing": "Sprouts Dinner"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 8.4,
                              "costINR": 6,
                              "timing": "Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Milk"
                        }
                  ]
            }
      },
      {
            "dayNumber": 5,
            "dayName": "Friday",
            "dayTitle": "Friday (Upper Body Hypertrophy)",
            "focusTag": "Chest, Shoulders & Arms Pump",
            "tagline": "Balanced pre-workout fuel and targeted recovery for peak volume endurance.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "soya_chunks",
                              "quantity": 65,
                              "unit": "g",
                              "protein": 33.8,
                              "costINR": 10.4,
                              "timing": "Lunch Soya Pulao"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast Omelette"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 35,
                              "unit": "g",
                              "protein": 9.1,
                              "costINR": 6.3,
                              "timing": "Pre-workout Munch"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Post-workout Sattu"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 7,
                              "timing": "Dinner Dal"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Milk"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "soya_chunks",
                              "quantity": 85,
                              "unit": "g",
                              "protein": 44.2,
                              "costINR": 13.6,
                              "timing": "Lunch Soya Curry"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 19.2,
                              "costINR": 11.2,
                              "timing": "Sprouts Salad"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 12.6,
                              "costINR": 9,
                              "timing": "Sattu Shake"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 10.4,
                              "costINR": 7.2,
                              "timing": "Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 250,
                              "unit": "ml",
                              "protein": 8.2,
                              "costINR": 16,
                              "timing": "Bedtime Drink"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "eggs_whole",
                              "quantity": 200,
                              "unit": "eggs (4 pcs)",
                              "protein": 26,
                              "costINR": 26,
                              "timing": "Breakfast 4 Eggs"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 31.2,
                              "costINR": 9.6,
                              "timing": "Lunch Soya Dish"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Evening Sattu"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 30,
                              "unit": "g",
                              "protein": 7.8,
                              "costINR": 5.4,
                              "timing": "Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Milk"
                        }
                  ]
            }
      },
      {
            "dayNumber": 6,
            "dayName": "Saturday",
            "dayTitle": "Saturday (Metabolic Shred & Core Finish)",
            "focusTag": "Visceral Fat Burn & Core Cut",
            "tagline": "Leanest protein density with clean hydration to sculpt sharp abdominal lines.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "eggs_whole",
                              "quantity": 200,
                              "unit": "eggs (4 pcs)",
                              "protein": 26,
                              "costINR": 26,
                              "timing": "Breakfast 4 Boiled Eggs"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 31.2,
                              "costINR": 9.6,
                              "timing": "Lunch Soya Cutlets"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 12.6,
                              "costINR": 9,
                              "timing": "Shred Sattu Drink"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 30,
                              "unit": "g",
                              "protein": 7.8,
                              "costINR": 5.4,
                              "timing": "Energy Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 250,
                              "unit": "ml",
                              "protein": 8.2,
                              "costINR": 16,
                              "timing": "Night Drink"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "soya_chunks",
                              "quantity": 85,
                              "unit": "g",
                              "protein": 44.2,
                              "costINR": 13.6,
                              "timing": "Lunch High Soya"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 70,
                              "unit": "g",
                              "protein": 14.7,
                              "costINR": 10.5,
                              "timing": "Morning Sattu"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 70,
                              "unit": "g",
                              "protein": 16.8,
                              "costINR": 9.8,
                              "timing": "Sprouts Dinner"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 10.4,
                              "costINR": 7.2,
                              "timing": "Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 250,
                              "unit": "ml",
                              "protein": 8.2,
                              "costINR": 16,
                              "timing": "Night Recovery"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "eggs_whole",
                              "quantity": 250,
                              "unit": "eggs (5 pcs)",
                              "protein": 32.5,
                              "costINR": 32.5,
                              "timing": "Breakfast 5 Eggs"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 26,
                              "costINR": 8,
                              "timing": "Lunch Soya Bowl"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 45,
                              "unit": "g",
                              "protein": 9.5,
                              "costINR": 6.8,
                              "timing": "Evening Sattu"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 30,
                              "unit": "g",
                              "protein": 7.8,
                              "costINR": 5.4,
                              "timing": "Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Milk"
                        }
                  ]
            }
      },
      {
            "dayNumber": 7,
            "dayName": "Sunday",
            "dayTitle": "Sunday (Systemic Rebuild & Reset)",
            "focusTag": "CNS Restoration & Feast",
            "tagline": "Wholesome Sunday nourishment to restore nervous system balance and prep for the week ahead.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Sunday Brunch Eggs"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 31.2,
                              "costINR": 9.6,
                              "timing": "Lunch Soya Curry"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 70,
                              "unit": "g",
                              "protein": 16.8,
                              "costINR": 9.8,
                              "timing": "Evening Chaat"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Sattu Relaxer"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 250,
                              "unit": "ml",
                              "protein": 8.2,
                              "costINR": 16,
                              "timing": "Bedtime Warm Milk"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "soya_chunks",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 41.6,
                              "costINR": 12.8,
                              "timing": "Sunday Special Soya"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Dahi Bowl"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 12.6,
                              "costINR": 9,
                              "timing": "Sattu Drink"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 70,
                              "unit": "g",
                              "protein": 16.8,
                              "costINR": 9.8,
                              "timing": "Sprouts Salad"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Drink"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "eggs_whole",
                              "quantity": 200,
                              "unit": "eggs (4 pcs)",
                              "protein": 26,
                              "costINR": 26,
                              "timing": "Sunday 4 Eggs"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 26,
                              "costINR": 8,
                              "timing": "Lunch Soya Curry"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 14.4,
                              "costINR": 8.4,
                              "timing": "Evening Sprouts"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Sattu Drink"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Milk"
                        }
                  ]
            }
      }
],
      title: "Ultra Budget Beast (Under ₹2,000 / mo)",
      dailyBudgetINR: 67,
      tagline: "Unbeatable cost-per-gram protein efficiency for students and budget warriors",
      summary: "Hit 115g - 135g protein every single day on just ₹60 to ₹65/day using high-yield nutritional powerhouses like Soya Chunks, Eggs, and Roasted Chana.",
      dietaryPlans: {
        all: [
          { foodId: "soya_chunks", quantity: 60, unit: "g", protein: 31.2, costINR: 9.6, timing: "Lunch Sabzi / Pulao" },
          { foodId: "eggs_whole", quantity: 150, unit: "eggs (3 pcs)", protein: 19.5, costINR: 19.5, timing: "Breakfast Omelette / Boiled" },
          { foodId: "roasted_chana", quantity: 50, unit: "g", protein: 10.5, costINR: 7.5, timing: "Evening Snack / Sattu Drink" },
          { foodId: "peanuts", quantity: 35, unit: "g", protein: 9.1, costINR: 6.3, timing: "Pre-workout Snack" },
          { foodId: "moong_dal_sprouts", quantity: 60, unit: "g", protein: 14.4, costINR: 8.4, timing: "Dinner Dal Bowl" },
          { foodId: "double_toned_milk", quantity: 250, unit: "ml", protein: 8.2, costINR: 16.0, timing: "Night Bedtime Drink" }
        ],
        veg: [
          { foodId: "soya_chunks", quantity: 80, unit: "g", protein: 41.6, costINR: 12.8, timing: "Lunch Soya Curry" },
          { foodId: "roasted_chana", quantity: 70, unit: "g", protein: 14.7, costINR: 10.5, timing: "Morning Sattu Shake" },
          { foodId: "moong_dal_sprouts", quantity: 80, unit: "g", protein: 19.2, costINR: 11.2, timing: "Evening Sprouts Chaat" },
          { foodId: "peanuts", quantity: 40, unit: "g", protein: 10.4, costINR: 7.2, timing: "Snack" },
          { foodId: "double_toned_milk", quantity: 250, unit: "ml", protein: 8.2, costINR: 16.0, timing: "Bedtime Recovery" },
          { foodId: "curd_greek_yogurt", quantity: 100, unit: "g", protein: 10.0, costINR: 20.0, timing: "Dinner Side" }
        ],
        nonveg: [
          { foodId: "eggs_whole", quantity: 200, unit: "eggs (4 pcs)", protein: 26.0, costINR: 26.0, timing: "Breakfast 4 Eggs" },
          { foodId: "soya_chunks", quantity: 50, unit: "g", protein: 26.0, costINR: 8.0, timing: "Lunch Soya Bowl" },
          { foodId: "roasted_chana", quantity: 50, unit: "g", protein: 10.5, costINR: 7.5, timing: "Evening Sattu Drink" },
          { foodId: "peanuts", quantity: 30, unit: "g", protein: 7.8, costINR: 5.4, timing: "Pre-workout Snack" },
          { foodId: "moong_dal_sprouts", quantity: 50, unit: "g", protein: 12.0, costINR: 7.0, timing: "Dinner Dal" },
          { foodId: "double_toned_milk", quantity: 150, unit: "ml", protein: 5.0, costINR: 9.8, timing: "Night Drink" }
        ]
      }
    },
    3000: {
      tier: 3000,
      weeklySchedule: [
      {
            "dayNumber": 1,
            "dayName": "Monday",
            "dayTitle": "Monday (Push Day High-Protein Fuel)",
            "focusTag": "Chest, Delts & Triceps Fuel",
            "tagline": "Energy dense complex fuel to support heavy pressing and rapid upper body glycogen refill.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 31,
                              "costINR": 28,
                              "timing": "Lunch Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast Scramble"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 20.8,
                              "costINR": 6.4,
                              "timing": "Dinner Sabzi"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Post-workout Dahi Bowl"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Evening Sattu"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Turmeric Milk"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 20,
                              "costINR": 35,
                              "timing": "Dinner Grilled Paneer"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 31.2,
                              "costINR": 9.6,
                              "timing": "Lunch Soya Curry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Post-workout Greek Curd"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 12.6,
                              "costINR": 9,
                              "timing": "Mid-morning Sattu"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 14.4,
                              "costINR": 8.4,
                              "timing": "Sprouts Salad"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 30,
                              "unit": "g",
                              "protein": 7.8,
                              "costINR": 5.4,
                              "timing": "Evening Munch"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch / Dinner Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 200,
                              "unit": "eggs (4 pcs)",
                              "protein": 26,
                              "costINR": 26,
                              "timing": "Breakfast 4 Eggs"
                        },
                        {
                              "foodId": "egg_whites",
                              "quantity": 90,
                              "unit": "whites (3 pcs)",
                              "protein": 10,
                              "costINR": 14,
                              "timing": "Evening Boiled Whites"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 8.4,
                              "costINR": 6,
                              "timing": "Pre-workout Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Bedtime Milk"
                        }
                  ]
            }
      },
      {
            "dayNumber": 2,
            "dayName": "Tuesday",
            "dayTitle": "Tuesday (Pull & Posture Power Fuel)",
            "focusTag": "Lats, Upper Back & Biceps",
            "tagline": "Rich amino acid spectrum for deep lat hypertrophy and joint-protective nutrition.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Chicken Steak"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Afternoon Dahi"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Sattu Fuel"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Bedtime Drink"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 24,
                              "costINR": 42,
                              "timing": "Lunch Paneer Bhurji"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 26,
                              "costINR": 8,
                              "timing": "Dinner Soya Curry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Evening Sattu"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Milk"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 160,
                              "unit": "g",
                              "protein": 49.6,
                              "costINR": 44.8,
                              "timing": "Lunch Chicken Tikka"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Post-workout Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Bedtime Milk"
                        }
                  ]
            }
      },
      {
            "dayNumber": 3,
            "dayName": "Wednesday",
            "dayTitle": "Wednesday (Heavy Leg Day Refeed)",
            "focusTag": "Quads & Glutes Maximum Output",
            "tagline": "Maximum caloric & protein allocation to support whole-body metabolic leg demands.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 37.2,
                              "costINR": 33.6,
                              "timing": "Lunch Chicken Rice Bowl"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 200,
                              "unit": "eggs (4 pcs)",
                              "protein": 26,
                              "costINR": 26,
                              "timing": "Breakfast 4 Eggs"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 30,
                              "unit": "g",
                              "protein": 15.6,
                              "costINR": 4.8,
                              "timing": "Dinner Soya Toss"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Leg Day Dahi"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Night Recovery Milk"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 110,
                              "unit": "g",
                              "protein": 22,
                              "costINR": 38.5,
                              "timing": "Lunch Paneer Curry"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 31.2,
                              "costINR": 9.6,
                              "timing": "Dinner Soya Pulao"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Greek Yogurt Bowl"
                        },
                        {
                              "foodId": "peanuts",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 10.4,
                              "costINR": 7.2,
                              "timing": "Pre-workout Fuel"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 250,
                              "unit": "ml",
                              "protein": 8.2,
                              "costINR": 16,
                              "timing": "Bedtime Milk"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 140,
                              "unit": "g",
                              "protein": 43.4,
                              "costINR": 39.2,
                              "timing": "Lunch Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 200,
                              "unit": "eggs (4 pcs)",
                              "protein": 26,
                              "costINR": 26,
                              "timing": "Breakfast 4 Eggs"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Turmeric Milk"
                        }
                  ]
            }
      },
      {
            "dayNumber": 4,
            "dayName": "Thursday",
            "dayTitle": "Thursday (Active Recovery & Cleanse)",
            "focusTag": "Gut Health & Anti-Inflammation",
            "tagline": "High fiber, fermented probiotics, and lean bioavailable amino acids for cellular repair.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 20,
                              "costINR": 35,
                              "timing": "Dinner Paneer Salad"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 26,
                              "costINR": 8,
                              "timing": "Lunch Soya Curry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Gut Health Curd"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 100,
                              "unit": "eggs (2 pcs)",
                              "protein": 13,
                              "costINR": 13,
                              "timing": "Breakfast 2 Eggs"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Milk"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 18,
                              "costINR": 28.8,
                              "timing": "Lunch Tofu Stir-fry"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Grilled Paneer"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Greek Yogurt Bowl"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 14.4,
                              "costINR": 8.4,
                              "timing": "Sprouts Chaat"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Night Milk"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 37.2,
                              "costINR": 33.6,
                              "timing": "Lunch Light Chicken Soup"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Afternoon Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Turmeric Milk"
                        }
                  ]
            }
      },
      {
            "dayNumber": 5,
            "dayName": "Friday",
            "dayTitle": "Friday (Upper Body Hypertrophy)",
            "focusTag": "Chest, Shoulders & Arms Pump",
            "tagline": "Balanced pre-workout fuel and targeted recovery for peak volume endurance.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 37.2,
                              "costINR": 33.6,
                              "timing": "Lunch Chicken Breast"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast Scramble"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 20.8,
                              "costINR": 6.4,
                              "timing": "Dinner Soya Dish"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-day Curd"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Evening Sattu"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Milk"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 20,
                              "costINR": 35,
                              "timing": "Lunch Paneer Tikka"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 31.2,
                              "costINR": 9.6,
                              "timing": "Dinner Soya Curry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 14.4,
                              "costINR": 8.4,
                              "timing": "Sprouts Salad"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 250,
                              "unit": "ml",
                              "protein": 8.2,
                              "costINR": 16,
                              "timing": "Bedtime Drink"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Chicken Steak"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 200,
                              "unit": "eggs (4 pcs)",
                              "protein": 26,
                              "costINR": 26,
                              "timing": "Breakfast 4 Eggs"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Curd Bowl"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Bedtime Milk"
                        }
                  ]
            }
      },
      {
            "dayNumber": 6,
            "dayName": "Saturday",
            "dayTitle": "Saturday (Metabolic Shred & Core Finish)",
            "focusTag": "Visceral Fat Burn & Core Cut",
            "tagline": "Leanest protein density with clean hydration to sculpt sharp abdominal lines.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 140,
                              "unit": "g",
                              "protein": 43.4,
                              "costINR": 39.2,
                              "timing": "Lunch Chicken Breast"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 30,
                              "unit": "g",
                              "protein": 15.6,
                              "costINR": 4.8,
                              "timing": "Dinner Soya Bowl"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Curd Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Milk"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 110,
                              "unit": "g",
                              "protein": 22,
                              "costINR": 38.5,
                              "timing": "Lunch Paneer Dish"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 31.2,
                              "costINR": 9.6,
                              "timing": "Dinner Soya Curry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Sattu Drink"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Night Milk"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 160,
                              "unit": "g",
                              "protein": 49.6,
                              "costINR": 44.8,
                              "timing": "Lunch Chicken Stir-fry"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Curd Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Bedtime Milk"
                        }
                  ]
            }
      },
      {
            "dayNumber": 7,
            "dayName": "Sunday",
            "dayTitle": "Sunday (Systemic Rebuild & Reset)",
            "focusTag": "CNS Restoration & Feast",
            "tagline": "Wholesome Sunday nourishment to restore nervous system balance and prep for the week ahead.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 37.2,
                              "costINR": 33.6,
                              "timing": "Sunday Special Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast Omelette"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 60,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 21,
                              "timing": "Dinner Paneer Dish"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Afternoon Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "Bedtime Milk"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 24,
                              "costINR": 42,
                              "timing": "Sunday Paneer Feast"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 26,
                              "costINR": 8,
                              "timing": "Dinner Soya Curry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Greek Dahi Bowl"
                        },
                        {
                              "foodId": "moong_dal_sprouts",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 7,
                              "timing": "Sprouts Salad"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Milk"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Sunday Roast Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 200,
                              "unit": "eggs (4 pcs)",
                              "protein": 26,
                              "costINR": 26,
                              "timing": "Sunday 4 Eggs"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Dahi Bowl"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Bedtime Milk"
                        }
                  ]
            }
      }
],
      title: "Smart Muscle Builder (Under ₹3,000 / mo)",
      dailyBudgetINR: 100,
      tagline: "The golden balance of complete animal & plant proteins with supreme variety",
      summary: "Hit 130g - 150g protein every day on ~₹90 to ₹98/day. Incorporates fresh chicken breast / paneer alongside eggs, soya, and dairy.",
      dietaryPlans: {
        all: [
          { foodId: "chicken_breast", quantity: 100, unit: "g", protein: 31.0, costINR: 28.0, timing: "Lunch Grilled Chicken" },
          { foodId: "eggs_whole", quantity: 150, unit: "eggs (3 pcs)", protein: 19.5, costINR: 19.5, timing: "Breakfast Scramble" },
          { foodId: "soya_chunks", quantity: 40, unit: "g", protein: 20.8, costINR: 6.4, timing: "Dinner Sabzi" },
          { foodId: "curd_greek_yogurt", quantity: 120, unit: "g", protein: 12.0, costINR: 24.0, timing: "Post-workout Dahi Bowl" },
          { foodId: "roasted_chana", quantity: 50, unit: "g", protein: 10.5, costINR: 7.5, timing: "Evening Sattu" },
          { foodId: "double_toned_milk", quantity: 200, unit: "ml", protein: 6.6, costINR: 13.0, timing: "Bedtime Turmeric Milk" }
        ],
        veg: [
          { foodId: "paneer_lowfat", quantity: 100, unit: "g", protein: 20.0, costINR: 35.0, timing: "Dinner Grilled Paneer" },
          { foodId: "soya_chunks", quantity: 60, unit: "g", protein: 31.2, costINR: 9.6, timing: "Lunch Soya Curry" },
          { foodId: "curd_greek_yogurt", quantity: 150, unit: "g", protein: 15.0, costINR: 30.0, timing: "Post-workout Greek Curd" },
          { foodId: "roasted_chana", quantity: 60, unit: "g", protein: 12.6, costINR: 9.0, timing: "Mid-morning Sattu" },
          { foodId: "moong_dal_sprouts", quantity: 60, unit: "g", protein: 14.4, costINR: 8.4, timing: "Sprouts Salad" },
          { foodId: "peanuts", quantity: 30, unit: "g", protein: 7.8, costINR: 5.4, timing: "Evening Munch" }
        ],
        nonveg: [
          { foodId: "chicken_breast", quantity: 150, unit: "g", protein: 46.5, costINR: 42.0, timing: "Lunch / Dinner Chicken" },
          { foodId: "eggs_whole", quantity: 200, unit: "eggs (4 pcs)", protein: 26.0, costINR: 26.0, timing: "Breakfast 4 Eggs" },
          { foodId: "egg_whites", quantity: 90, unit: "whites (3 pcs)", protein: 10.0, costINR: 14.0, timing: "Evening Boiled Whites" },
          { foodId: "roasted_chana", quantity: 40, unit: "g", protein: 8.4, costINR: 6.0, timing: "Pre-workout Snack" },
          { foodId: "double_toned_milk", quantity: 150, unit: "ml", protein: 5.0, costINR: 9.8, timing: "Bedtime Milk" }
        ]
      }
    },
    4000: {
      tier: 4000,
      weeklySchedule: [
      {
            "dayNumber": 1,
            "dayName": "Monday",
            "dayTitle": "Monday (Push Day High-Protein Fuel)",
            "focusTag": "Chest, Delts & Triceps Fuel",
            "tagline": "Energy dense complex fuel to support heavy pressing and rapid upper body glycogen refill.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Paneer Salad"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Mid-day Curd Bowl"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 30,
                              "unit": "g",
                              "protein": 15.6,
                              "costINR": 4.8,
                              "timing": "Snack / Pulao"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Bedtime Drink"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 30,
                              "costINR": 52.5,
                              "timing": "Lunch Paneer Tikka"
                        },
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 24,
                              "timing": "Dinner Tofu Stir-fry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 20.8,
                              "costINR": 6.4,
                              "timing": "Evening Soya Snack"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Sattu Drink"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Night Recovery"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 200,
                              "unit": "g",
                              "protein": 62,
                              "costINR": 56,
                              "timing": "Lunch + Dinner Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "egg_whites",
                              "quantity": 120,
                              "unit": "whites (4 pcs)",
                              "protein": 13.2,
                              "costINR": 19,
                              "timing": "Evening 4 Egg Whites"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Drink"
                        }
                  ]
            }
      },
      {
            "dayNumber": 2,
            "dayName": "Tuesday",
            "dayTitle": "Tuesday (Pull & Posture Power Fuel)",
            "focusTag": "Lats, Upper Back & Biceps",
            "tagline": "Rich amino acid spectrum for deep lat hypertrophy and joint-protective nutrition.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Paneer Salad"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Mid-day Curd Bowl"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 30,
                              "unit": "g",
                              "protein": 15.6,
                              "costINR": 4.8,
                              "timing": "Snack / Pulao"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Bedtime Drink"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 30,
                              "costINR": 52.5,
                              "timing": "Lunch Paneer Tikka"
                        },
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 24,
                              "timing": "Dinner Tofu Stir-fry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 20.8,
                              "costINR": 6.4,
                              "timing": "Evening Soya Snack"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Sattu Drink"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Night Recovery"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 200,
                              "unit": "g",
                              "protein": 62,
                              "costINR": 56,
                              "timing": "Lunch + Dinner Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "egg_whites",
                              "quantity": 120,
                              "unit": "whites (4 pcs)",
                              "protein": 13.2,
                              "costINR": 19,
                              "timing": "Evening 4 Egg Whites"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Drink"
                        }
                  ]
            }
      },
      {
            "dayNumber": 3,
            "dayName": "Wednesday",
            "dayTitle": "Wednesday (Heavy Leg Day Refeed)",
            "focusTag": "Quads & Glutes Maximum Output",
            "tagline": "Maximum caloric & protein allocation to support whole-body metabolic leg demands.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Paneer Salad"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Mid-day Curd Bowl"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 30,
                              "unit": "g",
                              "protein": 15.6,
                              "costINR": 4.8,
                              "timing": "Snack / Pulao"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Bedtime Drink"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 30,
                              "costINR": 52.5,
                              "timing": "Lunch Paneer Tikka"
                        },
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 24,
                              "timing": "Dinner Tofu Stir-fry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 20.8,
                              "costINR": 6.4,
                              "timing": "Evening Soya Snack"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Sattu Drink"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Night Recovery"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 200,
                              "unit": "g",
                              "protein": 62,
                              "costINR": 56,
                              "timing": "Lunch + Dinner Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "egg_whites",
                              "quantity": 120,
                              "unit": "whites (4 pcs)",
                              "protein": 13.2,
                              "costINR": 19,
                              "timing": "Evening 4 Egg Whites"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Drink"
                        }
                  ]
            }
      },
      {
            "dayNumber": 4,
            "dayName": "Thursday",
            "dayTitle": "Thursday (Active Recovery & Cleanse)",
            "focusTag": "Gut Health & Anti-Inflammation",
            "tagline": "High fiber, fermented probiotics, and lean bioavailable amino acids for cellular repair.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Paneer Salad"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Mid-day Curd Bowl"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 30,
                              "unit": "g",
                              "protein": 15.6,
                              "costINR": 4.8,
                              "timing": "Snack / Pulao"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Bedtime Drink"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 30,
                              "costINR": 52.5,
                              "timing": "Lunch Paneer Tikka"
                        },
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 24,
                              "timing": "Dinner Tofu Stir-fry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 20.8,
                              "costINR": 6.4,
                              "timing": "Evening Soya Snack"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Sattu Drink"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Night Recovery"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 200,
                              "unit": "g",
                              "protein": 62,
                              "costINR": 56,
                              "timing": "Lunch + Dinner Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "egg_whites",
                              "quantity": 120,
                              "unit": "whites (4 pcs)",
                              "protein": 13.2,
                              "costINR": 19,
                              "timing": "Evening 4 Egg Whites"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Drink"
                        }
                  ]
            }
      },
      {
            "dayNumber": 5,
            "dayName": "Friday",
            "dayTitle": "Friday (Upper Body Hypertrophy)",
            "focusTag": "Chest, Shoulders & Arms Pump",
            "tagline": "Balanced pre-workout fuel and targeted recovery for peak volume endurance.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Paneer Salad"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Mid-day Curd Bowl"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 30,
                              "unit": "g",
                              "protein": 15.6,
                              "costINR": 4.8,
                              "timing": "Snack / Pulao"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Bedtime Drink"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 30,
                              "costINR": 52.5,
                              "timing": "Lunch Paneer Tikka"
                        },
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 24,
                              "timing": "Dinner Tofu Stir-fry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 20.8,
                              "costINR": 6.4,
                              "timing": "Evening Soya Snack"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Sattu Drink"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Night Recovery"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 200,
                              "unit": "g",
                              "protein": 62,
                              "costINR": 56,
                              "timing": "Lunch + Dinner Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "egg_whites",
                              "quantity": 120,
                              "unit": "whites (4 pcs)",
                              "protein": 13.2,
                              "costINR": 19,
                              "timing": "Evening 4 Egg Whites"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Drink"
                        }
                  ]
            }
      },
      {
            "dayNumber": 6,
            "dayName": "Saturday",
            "dayTitle": "Saturday (Metabolic Shred & Core Finish)",
            "focusTag": "Visceral Fat Burn & Core Cut",
            "tagline": "Leanest protein density with clean hydration to sculpt sharp abdominal lines.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Paneer Salad"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Mid-day Curd Bowl"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 30,
                              "unit": "g",
                              "protein": 15.6,
                              "costINR": 4.8,
                              "timing": "Snack / Pulao"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Bedtime Drink"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 30,
                              "costINR": 52.5,
                              "timing": "Lunch Paneer Tikka"
                        },
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 24,
                              "timing": "Dinner Tofu Stir-fry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 20.8,
                              "costINR": 6.4,
                              "timing": "Evening Soya Snack"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Sattu Drink"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Night Recovery"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 200,
                              "unit": "g",
                              "protein": 62,
                              "costINR": 56,
                              "timing": "Lunch + Dinner Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "egg_whites",
                              "quantity": 120,
                              "unit": "whites (4 pcs)",
                              "protein": 13.2,
                              "costINR": 19,
                              "timing": "Evening 4 Egg Whites"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Drink"
                        }
                  ]
            }
      },
      {
            "dayNumber": 7,
            "dayName": "Sunday",
            "dayTitle": "Sunday (Systemic Rebuild & Reset)",
            "focusTag": "CNS Restoration & Feast",
            "tagline": "Wholesome Sunday nourishment to restore nervous system balance and prep for the week ahead.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Paneer Salad"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Mid-day Curd Bowl"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 30,
                              "unit": "g",
                              "protein": 15.6,
                              "costINR": 4.8,
                              "timing": "Snack / Pulao"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 150,
                              "unit": "ml",
                              "protein": 5,
                              "costINR": 9.8,
                              "timing": "Bedtime Drink"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 30,
                              "costINR": 52.5,
                              "timing": "Lunch Paneer Tikka"
                        },
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 24,
                              "timing": "Dinner Tofu Stir-fry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 30,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "soya_chunks",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 20.8,
                              "costINR": 6.4,
                              "timing": "Evening Soya Snack"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 50,
                              "unit": "g",
                              "protein": 10.5,
                              "costINR": 7.5,
                              "timing": "Sattu Drink"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Night Recovery"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "chicken_breast",
                              "quantity": 200,
                              "unit": "g",
                              "protein": 62,
                              "costINR": 56,
                              "timing": "Lunch + Dinner Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "egg_whites",
                              "quantity": 120,
                              "unit": "whites (4 pcs)",
                              "protein": 13.2,
                              "costINR": 19,
                              "timing": "Evening 4 Egg Whites"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Post-workout Dahi"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Bedtime Drink"
                        }
                  ]
            }
      }
],
      title: "Optimal Performance (Under ₹4,000 / mo)",
      dailyBudgetINR: 133,
      tagline: "High bioavailability, lean cuts, and minimal prep friction for serious lifters",
      summary: "Hit 145g - 165g pure bioavailable protein daily on ~₹125 to ₹130/day. High focus on lean chicken breast, high quality paneer/tofu, and fresh dairy.",
      dietaryPlans: {
        all: [
          { foodId: "chicken_breast", quantity: 150, unit: "g", protein: 46.5, costINR: 42.0, timing: "Lunch Grilled Chicken" },
          { foodId: "eggs_whole", quantity: 150, unit: "eggs (3 pcs)", protein: 19.5, costINR: 19.5, timing: "Breakfast 3 Eggs" },
          { foodId: "paneer_lowfat", quantity: 80, unit: "g", protein: 16.0, costINR: 28.0, timing: "Dinner Paneer Salad" },
          { foodId: "curd_greek_yogurt", quantity: 150, unit: "g", protein: 15.0, costINR: 30.0, timing: "Mid-day Curd Bowl" },
          { foodId: "soya_chunks", quantity: 30, unit: "g", protein: 15.6, costINR: 4.8, timing: "Snack / Pulao" },
          { foodId: "double_toned_milk", quantity: 150, unit: "ml", protein: 5.0, costINR: 9.8, timing: "Bedtime Drink" }
        ],
        veg: [
          { foodId: "paneer_lowfat", quantity: 150, unit: "g", protein: 30.0, costINR: 52.5, timing: "Lunch Paneer Tikka" },
          { foodId: "tofu_soy_paneer", quantity: 100, unit: "g", protein: 15.0, costINR: 24.0, timing: "Dinner Tofu Stir-fry" },
          { foodId: "curd_greek_yogurt", quantity: 150, unit: "g", protein: 15.0, costINR: 30.0, timing: "Post-workout Dahi" },
          { foodId: "soya_chunks", quantity: 40, unit: "g", protein: 20.8, costINR: 6.4, timing: "Evening Soya Snack" },
          { foodId: "roasted_chana", quantity: 50, unit: "g", protein: 10.5, costINR: 7.5, timing: "Sattu Drink" },
          { foodId: "double_toned_milk", quantity: 200, unit: "ml", protein: 6.6, costINR: 13.0, timing: "Night Recovery" }
        ],
        nonveg: [
          { foodId: "chicken_breast", quantity: 200, unit: "g", protein: 62.0, costINR: 56.0, timing: "Lunch + Dinner Chicken" },
          { foodId: "eggs_whole", quantity: 150, unit: "eggs (3 pcs)", protein: 19.5, costINR: 19.5, timing: "Breakfast 3 Eggs" },
          { foodId: "egg_whites", quantity: 120, unit: "whites (4 pcs)", protein: 13.2, costINR: 19.0, timing: "Evening 4 Egg Whites" },
          { foodId: "curd_greek_yogurt", quantity: 120, unit: "g", protein: 12.0, costINR: 24.0, timing: "Post-workout Dahi" },
          { foodId: "double_toned_milk", quantity: 200, unit: "ml", protein: 6.6, costINR: 13.0, timing: "Bedtime Drink" }
        ]
      }
    },
    5000: {
      tier: 5000,
      weeklySchedule: [
      {
            "dayNumber": 1,
            "dayName": "Monday",
            "dayTitle": "Monday (Push Day High-Protein Fuel)",
            "focusTag": "Chest, Delts & Triceps Fuel",
            "tagline": "Energy dense complex fuel to support heavy pressing and rapid upper body glycogen refill.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Immediate Post-Workout"
                        },
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Chicken Steak"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Paneer Cubes"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-morning Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "With Oats / Bedtime"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Post-Workout Whey Shake"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 24,
                              "costINR": 42,
                              "timing": "Lunch Grilled Paneer"
                        },
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 24,
                              "timing": "Dinner Tofu Curry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Mid-day Greek Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Whey / Bedtime Milk"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 8.4,
                              "costINR": 6,
                              "timing": "Evening Sattu Drink"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Post-Workout Whey Shake"
                        },
                        {
                              "foodId": "chicken_breast",
                              "quantity": 200,
                              "unit": "g",
                              "protein": 62,
                              "costINR": 56,
                              "timing": "Lunch & Dinner Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-day Protein Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "Coffee / Bedtime"
                        }
                  ]
            }
      },
      {
            "dayNumber": 2,
            "dayName": "Tuesday",
            "dayTitle": "Tuesday (Pull & Posture Power Fuel)",
            "focusTag": "Lats, Upper Back & Biceps",
            "tagline": "Rich amino acid spectrum for deep lat hypertrophy and joint-protective nutrition.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Immediate Post-Workout"
                        },
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Chicken Steak"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Paneer Cubes"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-morning Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "With Oats / Bedtime"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Post-Workout Whey Shake"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 24,
                              "costINR": 42,
                              "timing": "Lunch Grilled Paneer"
                        },
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 24,
                              "timing": "Dinner Tofu Curry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Mid-day Greek Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Whey / Bedtime Milk"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 8.4,
                              "costINR": 6,
                              "timing": "Evening Sattu Drink"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Post-Workout Whey Shake"
                        },
                        {
                              "foodId": "chicken_breast",
                              "quantity": 200,
                              "unit": "g",
                              "protein": 62,
                              "costINR": 56,
                              "timing": "Lunch & Dinner Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-day Protein Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "Coffee / Bedtime"
                        }
                  ]
            }
      },
      {
            "dayNumber": 3,
            "dayName": "Wednesday",
            "dayTitle": "Wednesday (Heavy Leg Day Refeed)",
            "focusTag": "Quads & Glutes Maximum Output",
            "tagline": "Maximum caloric & protein allocation to support whole-body metabolic leg demands.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Immediate Post-Workout"
                        },
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Chicken Steak"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Paneer Cubes"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-morning Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "With Oats / Bedtime"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Post-Workout Whey Shake"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 24,
                              "costINR": 42,
                              "timing": "Lunch Grilled Paneer"
                        },
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 24,
                              "timing": "Dinner Tofu Curry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Mid-day Greek Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Whey / Bedtime Milk"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 8.4,
                              "costINR": 6,
                              "timing": "Evening Sattu Drink"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Post-Workout Whey Shake"
                        },
                        {
                              "foodId": "chicken_breast",
                              "quantity": 200,
                              "unit": "g",
                              "protein": 62,
                              "costINR": 56,
                              "timing": "Lunch & Dinner Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-day Protein Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "Coffee / Bedtime"
                        }
                  ]
            }
      },
      {
            "dayNumber": 4,
            "dayName": "Thursday",
            "dayTitle": "Thursday (Active Recovery & Cleanse)",
            "focusTag": "Gut Health & Anti-Inflammation",
            "tagline": "High fiber, fermented probiotics, and lean bioavailable amino acids for cellular repair.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Immediate Post-Workout"
                        },
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Chicken Steak"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Paneer Cubes"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-morning Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "With Oats / Bedtime"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Post-Workout Whey Shake"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 24,
                              "costINR": 42,
                              "timing": "Lunch Grilled Paneer"
                        },
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 24,
                              "timing": "Dinner Tofu Curry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Mid-day Greek Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Whey / Bedtime Milk"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 8.4,
                              "costINR": 6,
                              "timing": "Evening Sattu Drink"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Post-Workout Whey Shake"
                        },
                        {
                              "foodId": "chicken_breast",
                              "quantity": 200,
                              "unit": "g",
                              "protein": 62,
                              "costINR": 56,
                              "timing": "Lunch & Dinner Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-day Protein Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "Coffee / Bedtime"
                        }
                  ]
            }
      },
      {
            "dayNumber": 5,
            "dayName": "Friday",
            "dayTitle": "Friday (Upper Body Hypertrophy)",
            "focusTag": "Chest, Shoulders & Arms Pump",
            "tagline": "Balanced pre-workout fuel and targeted recovery for peak volume endurance.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Immediate Post-Workout"
                        },
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Chicken Steak"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Paneer Cubes"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-morning Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "With Oats / Bedtime"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Post-Workout Whey Shake"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 24,
                              "costINR": 42,
                              "timing": "Lunch Grilled Paneer"
                        },
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 24,
                              "timing": "Dinner Tofu Curry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Mid-day Greek Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Whey / Bedtime Milk"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 8.4,
                              "costINR": 6,
                              "timing": "Evening Sattu Drink"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Post-Workout Whey Shake"
                        },
                        {
                              "foodId": "chicken_breast",
                              "quantity": 200,
                              "unit": "g",
                              "protein": 62,
                              "costINR": 56,
                              "timing": "Lunch & Dinner Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-day Protein Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "Coffee / Bedtime"
                        }
                  ]
            }
      },
      {
            "dayNumber": 6,
            "dayName": "Saturday",
            "dayTitle": "Saturday (Metabolic Shred & Core Finish)",
            "focusTag": "Visceral Fat Burn & Core Cut",
            "tagline": "Leanest protein density with clean hydration to sculpt sharp abdominal lines.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Immediate Post-Workout"
                        },
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Chicken Steak"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Paneer Cubes"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-morning Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "With Oats / Bedtime"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Post-Workout Whey Shake"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 24,
                              "costINR": 42,
                              "timing": "Lunch Grilled Paneer"
                        },
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 24,
                              "timing": "Dinner Tofu Curry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Mid-day Greek Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Whey / Bedtime Milk"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 8.4,
                              "costINR": 6,
                              "timing": "Evening Sattu Drink"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Post-Workout Whey Shake"
                        },
                        {
                              "foodId": "chicken_breast",
                              "quantity": 200,
                              "unit": "g",
                              "protein": 62,
                              "costINR": 56,
                              "timing": "Lunch & Dinner Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-day Protein Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "Coffee / Bedtime"
                        }
                  ]
            }
      },
      {
            "dayNumber": 7,
            "dayName": "Sunday",
            "dayTitle": "Sunday (Systemic Rebuild & Reset)",
            "focusTag": "CNS Restoration & Feast",
            "tagline": "Wholesome Sunday nourishment to restore nervous system balance and prep for the week ahead.",
            "dietaryPlans": {
                  "all": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Immediate Post-Workout"
                        },
                        {
                              "foodId": "chicken_breast",
                              "quantity": 150,
                              "unit": "g",
                              "protein": 46.5,
                              "costINR": 42,
                              "timing": "Lunch Chicken Steak"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 80,
                              "unit": "g",
                              "protein": 16,
                              "costINR": 28,
                              "timing": "Dinner Paneer Cubes"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-morning Snack"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "With Oats / Bedtime"
                        }
                  ],
                  "veg": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Post-Workout Whey Shake"
                        },
                        {
                              "foodId": "paneer_lowfat",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 24,
                              "costINR": 42,
                              "timing": "Lunch Grilled Paneer"
                        },
                        {
                              "foodId": "tofu_soy_paneer",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 15,
                              "costINR": 24,
                              "timing": "Dinner Tofu Curry"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 120,
                              "unit": "g",
                              "protein": 12,
                              "costINR": 24,
                              "timing": "Mid-day Greek Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 200,
                              "unit": "ml",
                              "protein": 6.6,
                              "costINR": 13,
                              "timing": "Whey / Bedtime Milk"
                        },
                        {
                              "foodId": "roasted_chana",
                              "quantity": 40,
                              "unit": "g",
                              "protein": 8.4,
                              "costINR": 6,
                              "timing": "Evening Sattu Drink"
                        }
                  ],
                  "nonveg": [
                        {
                              "foodId": "whey_protein",
                              "quantity": 32,
                              "unit": "scoop (32g)",
                              "protein": 25,
                              "costINR": 64,
                              "timing": "Post-Workout Whey Shake"
                        },
                        {
                              "foodId": "chicken_breast",
                              "quantity": 200,
                              "unit": "g",
                              "protein": 62,
                              "costINR": 56,
                              "timing": "Lunch & Dinner Grilled Chicken"
                        },
                        {
                              "foodId": "eggs_whole",
                              "quantity": 150,
                              "unit": "eggs (3 pcs)",
                              "protein": 19.5,
                              "costINR": 19.5,
                              "timing": "Breakfast 3 Eggs"
                        },
                        {
                              "foodId": "curd_greek_yogurt",
                              "quantity": 100,
                              "unit": "g",
                              "protein": 10,
                              "costINR": 20,
                              "timing": "Mid-day Protein Curd"
                        },
                        {
                              "foodId": "double_toned_milk",
                              "quantity": 100,
                              "unit": "ml",
                              "protein": 3.3,
                              "costINR": 6.5,
                              "timing": "Coffee / Bedtime"
                        }
                  ]
            }
      }
],
      title: "Elite Pro Athlete (Under ₹5,000 / mo)",
      dailyBudgetINR: 167,
      tagline: "The ultimate physique stack with certified 100% Whey Protein and top-tier whole foods",
      summary: "Hit 150g - 175g+ elite protein daily on ~₹155 to ₹165/day. Includes 1 full daily scoop of fast-absorbing Whey Protein (24g) alongside premium chicken, eggs, paneer, and Greek yogurt.",
      dietaryPlans: {
        all: [
          { foodId: "whey_protein", quantity: 32, unit: "scoop (32g)", protein: 25.0, costINR: 64.0, timing: "Immediate Post-Workout" },
          { foodId: "chicken_breast", quantity: 150, unit: "g", protein: 46.5, costINR: 42.0, timing: "Lunch Chicken Steak" },
          { foodId: "eggs_whole", quantity: 150, unit: "eggs (3 pcs)", protein: 19.5, costINR: 19.5, timing: "Breakfast 3 Eggs" },
          { foodId: "paneer_lowfat", quantity: 80, unit: "g", protein: 16.0, costINR: 28.0, timing: "Dinner Paneer Cubes" },
          { foodId: "curd_greek_yogurt", quantity: 100, unit: "g", protein: 10.0, costINR: 20.0, timing: "Mid-morning Snack" },
          { foodId: "double_toned_milk", quantity: 100, unit: "ml", protein: 3.3, costINR: 6.5, timing: "With Oats / Bedtime" }
        ],
        veg: [
          { foodId: "whey_protein", quantity: 32, unit: "scoop (32g)", protein: 25.0, costINR: 64.0, timing: "Post-Workout Whey Shake" },
          { foodId: "paneer_lowfat", quantity: 120, unit: "g", protein: 24.0, costINR: 42.0, timing: "Lunch Grilled Paneer" },
          { foodId: "tofu_soy_paneer", quantity: 100, unit: "g", protein: 15.0, costINR: 24.0, timing: "Dinner Tofu Curry" },
          { foodId: "curd_greek_yogurt", quantity: 120, unit: "g", protein: 12.0, costINR: 24.0, timing: "Mid-day Greek Curd" },
          { foodId: "double_toned_milk", quantity: 200, unit: "ml", protein: 6.6, costINR: 13.0, timing: "Whey / Bedtime Milk" },
          { foodId: "roasted_chana", quantity: 40, unit: "g", protein: 8.4, costINR: 6.0, timing: "Evening Sattu Drink" }
        ],
        nonveg: [
          { foodId: "whey_protein", quantity: 32, unit: "scoop (32g)", protein: 25.0, costINR: 64.0, timing: "Post-Workout Whey Shake" },
          { foodId: "chicken_breast", quantity: 200, unit: "g", protein: 62.0, costINR: 56.0, timing: "Lunch & Dinner Grilled Chicken" },
          { foodId: "eggs_whole", quantity: 150, unit: "eggs (3 pcs)", protein: 19.5, costINR: 19.5, timing: "Breakfast 3 Eggs" },
          { foodId: "curd_greek_yogurt", quantity: 100, unit: "g", protein: 10.0, costINR: 20.0, timing: "Mid-day Protein Curd" },
          { foodId: "double_toned_milk", quantity: 100, unit: "ml", protein: 3.3, costINR: 6.5, timing: "Coffee / Bedtime" }
        ]
      }
    }
  },

  // Daily Exercise Routines by Goal
  workoutRoutines: {
    // 1. REDUCE FAT
    reduce_fat: {
      routineName: "Metabolic Calorie Torch & Lean Retention",
      splitType: "High-Density Fat Burn Split (6 Days + 1 Rest)",
      days: [
        {
          dayNumber: 1,
          dayTitle: "Day 1: Full-Body Compound Blast",
          targetMuscles: "Chest, Quads, Lats, Core",
          estimatedMinutes: 45,
          caloriesBurnedEst: 380,
          exercises: [
            {
              id: "rf_1",
              name: "Barbell / Goblet Squats",
              muscle: "Quads & Glutes",
              sets: 4,
              reps: "12 - 15 reps",
              restSeconds: 60,
              badge: "Compound Engine",
              formTip: "Keep chest proud, break parallel with thighs, explode up through mid-foot to maximize calorie expenditure."
            },
            {
              id: "rf_2",
              name: "Dumbbell Push-Up to Renegade Row",
              muscle: "Chest, Back, Core",
              sets: 3,
              reps: "10 reps per side",
              restSeconds: 45,
              badge: "Metabolic Superset",
              formTip: "Perform a strict push-up, then row dumbbell to hip without letting hips rotate. Engages entire core."
            },
            {
              id: "rf_3",
              name: "Walking Dumbbell Lunges",
              muscle: "Glutes, Hamstrings",
              sets: 3,
              reps: "12 steps each leg",
              restSeconds: 45,
              badge: "Fat Torcher",
              formTip: "Take long strides, gently kiss back knee to floor, push through front heel to engage posterior chain."
            },
            {
              id: "rf_4",
              name: "Kettlebell / Dumbbell Swings",
              muscle: "Hamstrings & Heart Rate",
              sets: 4,
              reps: "20 reps",
              restSeconds: 45,
              badge: "Metabolic Booster",
              formTip: "Hinge violently at hips. Do not squat the weight; thrust hips forward to float bell to chest height."
            },
            {
              id: "rf_5",
              name: "Hanging Leg Raises / Knee Tucks",
              muscle: "Lower Abdominals",
              sets: 3,
              reps: "15 reps",
              restSeconds: 30,
              badge: "Core Shred",
              formTip: "Roll pelvis upward toward ribs rather than merely swinging legs to fully fire the rectus abdominis."
            }
          ]
        },
        {
          dayNumber: 2,
          dayTitle: "Day 2: HIIT Cardio & Upper Sculpt",
          targetMuscles: "Shoulders, Back, Arms & Cardio",
          estimatedMinutes: 40,
          caloriesBurnedEst: 420,
          exercises: [
            {
              id: "rf_6",
              name: "Incline Dumbbell Chest Press",
              muscle: "Upper Chest & Triceps",
              sets: 4,
              reps: "12 reps",
              restSeconds: 60,
              badge: "Upper Sculpt",
              formTip: "Set bench at 30 degrees. Squeeze chest at peak contraction, lower under 3-second control."
            },
            {
              id: "rf_7",
              name: "Lat Pulldowns / Assisted Pull-Ups",
              muscle: "Lats & Upper Back",
              sets: 4,
              reps: "12 reps",
              restSeconds: 60,
              badge: "V-Taper",
              formTip: "Pull elbows down into pockets. Avoid swinging your lower back."
            },
            {
              id: "rf_8",
              name: "Dumbbell Thrusters (Squat to Press)",
              muscle: "Full Body & Cardio",
              sets: 4,
              reps: "15 reps",
              restSeconds: 45,
              badge: "Peak Heart Rate",
              formTip: "Sink into deep squat and use explosive leg drive to pop dumbbells overhead in one fluid motion."
            },
            {
              id: "rf_9",
              name: "Battle Ropes / Mountain Climbers",
              muscle: "Cardiovascular & Shoulders",
              sets: 4,
              reps: "40s ON / 20s REST",
              restSeconds: 30,
              badge: "HIIT Burner",
              formTip: "Keep hips low and drive knees aggressively towards chest with rhythmic breathing."
            }
          ]
        },
        {
          dayNumber: 3,
          dayTitle: "Day 3: Lower Body Shred & Posterior Chain",
          targetMuscles: "Hamstrings, Glutes, Calves, Core",
          estimatedMinutes: 45,
          caloriesBurnedEst: 390,
          exercises: [
            {
              id: "rf_10",
              name: "Romanian Deadlifts (RDL)",
              muscle: "Hamstrings & Glutes",
              sets: 4,
              reps: "12 reps",
              restSeconds: 60,
              badge: "Posterior Anchor",
              formTip: "Push hips back as if closing a car door. Feel deep hamstring stretch before snapping glutes forward."
            },
            {
              id: "rf_11",
              name: "Bulgarian Split Squats",
              muscle: "Quads & Glute Medius",
              sets: 3,
              reps: "10 reps / leg",
              restSeconds: 60,
              badge: "Leg Burner",
              formTip: "Elevate rear foot on bench. Descend straight down, keeping forward torso lean for glute focus."
            },
            {
              id: "rf_12",
              name: "Leg Press (High & Wide Foot Placement)",
              muscle: "Hamstrings, Glutes",
              sets: 3,
              reps: "15 reps",
              restSeconds: 45,
              badge: "Volume Pump",
              formTip: "Do not lock knees at top of movement to preserve joint health and maintain continuous tension."
            },
            {
              id: "rf_13",
              name: "Plank to Push-Up & Hollow Body Hold",
              muscle: "Transverse Core",
              sets: 3,
              reps: "45 seconds hold",
              restSeconds: 30,
              badge: "Core Stamina",
              formTip: "Tuck tailbone, press belly button into spine, and breathe through teeth."
            }
          ]
        },
        {
          dayNumber: 4,
          dayTitle: "Day 4: Active Recovery & Fat Flush",
          targetMuscles: "Full Body Mobility & Aerobic Base",
          estimatedMinutes: 35,
          caloriesBurnedEst: 250,
          exercises: [
            {
              id: "rf_14",
              name: "Incline Treadmill Walk (12-3-30 Style)",
              muscle: "Cardiovascular System",
              sets: 1,
              reps: "25 - 30 mins",
              restSeconds: 0,
              badge: "Zone 2 Cardio",
              formTip: "Set 10-12% incline at 4-5 km/h. Keep conversational pace to burn pure free fatty acids."
            },
            {
              id: "rf_15",
              name: "Thoracic Spine & Hip 90/90 Stretches",
              muscle: "Mobility & Joints",
              sets: 3,
              reps: "60s per stretch",
              restSeconds: 30,
              badge: "Joint Rehab",
              formTip: "Breathe deeply into diaphragm to release tight hip flexors and restore lower back comfort."
            }
          ]
        },
        {
          dayNumber: 5,
          dayTitle: "Day 5: Push-Pull Density Circuit",
          targetMuscles: "Chest, Back, Triceps, Biceps",
          estimatedMinutes: 45,
          caloriesBurnedEst: 370,
          exercises: [
            {
              id: "rf_16",
              name: "Flat Dumbbell Bench Press",
              muscle: "Chest & Triceps",
              sets: 4,
              reps: "12 reps",
              restSeconds: 45,
              badge: "Compound Press",
              formTip: "Plant feet firmly into ground. Arch slightly and press smoothly with locked wrist position."
            },
            {
              id: "rf_17",
              name: "Seated Cable Rows / Bent Over Rows",
              muscle: "Mid-Back & Rhomboids",
              sets: 4,
              reps: "12 reps",
              restSeconds: 45,
              badge: "Posture Sculpt",
              formTip: "Pull handle to lower belly, pinch shoulder blades together for 1 full second."
            },
            {
              id: "rf_18",
              name: "Dumbbell Lateral Raises",
              muscle: "Side Delts",
              sets: 4,
              reps: "15 reps",
              restSeconds: 30,
              badge: "Shoulder Cap",
              formTip: "Lead with elbows like pouring water from two jugs. Control descent."
            },
            {
              id: "rf_19",
              name: "Tricep Rope Pushdowns + Hammer Curls",
              muscle: "Arms Superset",
              sets: 3,
              reps: "15 reps each",
              restSeconds: 45,
              badge: "Arm Burnout",
              formTip: "Keep elbows glued to ribs, do not sway torso."
            }
          ]
        },
        {
          dayNumber: 6,
          dayTitle: "Day 6: Total Body Tabata & Core Shred",
          targetMuscles: "Core, Calves, Full Body Burn",
          estimatedMinutes: 40,
          caloriesBurnedEst: 430,
          exercises: [
            {
              id: "rf_20",
              name: "Burpees to Box Jump / Tuck Jump",
              muscle: "Explosive Full Body",
              sets: 4,
              reps: "12 reps",
              restSeconds: 45,
              badge: "Maximum Output",
              formTip: "Drop chest to deck smoothly, spring feet in and jump softly onto heels."
            },
            {
              id: "rf_21",
              name: "Bicycle Crunches (Tempo Controlled)",
              muscle: "Obliques & Upper Abs",
              sets: 4,
              reps: "20 alternating reps",
              restSeconds: 30,
              badge: "Oblique Shred",
              formTip: "Turn armpit to opposite knee, pausing 1 second on each twist. Don't pull on neck."
            },
            {
              id: "rf_22",
              name: "Jump Rope / High Knees Intervals",
              muscle: "Calves & Cardio",
              sets: 5,
              reps: "45s work / 15s rest",
              restSeconds: 30,
              badge: "Conditioning",
              formTip: "Stay on balls of feet, spin rope purely from wrists."
            }
          ]
        },
        {
          dayNumber: 7,
          dayTitle: "Day 7: Full Rest & Nutrition Reload",
          targetMuscles: "Central Nervous System & Recovery",
          estimatedMinutes: 20,
          caloriesBurnedEst: 100,
          exercises: [
            {
              id: "rf_23",
              name: "Gentle 30-Minute Outdoor Nature Walk",
              muscle: "Active Relaxation",
              sets: 1,
              reps: "30 mins",
              restSeconds: 0,
              badge: "Cortisol Reduction",
              formTip: "Unplug from devices, walk at a leisurely pace, and prioritize sleep & hydration."
            }
          ]
        }
      ]
    },

    // 2. GAIN MUSCLE / HYPERTROPHY
    gain_muscle: {
      routineName: "Push-Pull-Legs Hypertrophy Mastery",
      splitType: "PPL Aesthetic Hypertrophy (6 Days + 1 Rest)",
      days: [
        {
          dayNumber: 1,
          dayTitle: "Day 1: Push (Chest, Shoulders & Triceps)",
          targetMuscles: "Chest, Front/Side Delts, Triceps",
          estimatedMinutes: 50,
          caloriesBurnedEst: 320,
          exercises: [
            {
              id: "gm_1",
              name: "Barbell / Heavy Dumbbell Bench Press",
              muscle: "Mid & Lower Chest",
              sets: 4,
              reps: "8 - 10 reps",
              restSeconds: 90,
              badge: "Primary Compound",
              formTip: "Plant feet, pin scapula back and down, lower bar to sternum with controlled 3-second negative."
            },
            {
              id: "gm_2",
              name: "Incline Dumbbell Press (30° Angle)",
              muscle: "Upper Clavicular Chest",
              sets: 3,
              reps: "10 - 12 reps",
              restSeconds: 75,
              badge: "Upper Shelf",
              formTip: "Touch dumbbells lightly at top without clanking, flare elbows at 45° to protect shoulders."
            },
            {
              id: "gm_3",
              name: "Standing Dumbbell Overhead Press",
              muscle: "Anterior Deltoids",
              sets: 3,
              reps: "8 - 10 reps",
              restSeconds: 75,
              badge: "Shoulder Boulder",
              formTip: "Brace glutes and core to prevent arching lower back as you press overhead."
            },
            {
              id: "gm_4",
              name: "Cable Lateral Raises",
              muscle: "Lateral Deltoids",
              sets: 4,
              reps: "12 - 15 reps",
              restSeconds: 60,
              badge: "Width Sculptor",
              formTip: "Set pulley at wrist height for peak tension at the bottom of the movement."
            },
            {
              id: "gm_5",
              name: "Overhead Rope Tricep Extension",
              muscle: "Triceps Long Head",
              sets: 3,
              reps: "12 - 15 reps",
              restSeconds: 60,
              badge: "Arm Mass",
              formTip: "Flare rope outward at full extension to peak contract the triceps."
            }
          ]
        },
        {
          dayNumber: 2,
          dayTitle: "Day 2: Pull (Back, Rear Delts & Biceps)",
          targetMuscles: "Lats, Rhomboids, Traps, Biceps",
          estimatedMinutes: 50,
          caloriesBurnedEst: 340,
          exercises: [
            {
              id: "gm_6",
              name: "Barbell / Chest-Supported Rows",
              muscle: "Mid-Back & Thickness",
              sets: 4,
              reps: "8 - 10 reps",
              restSeconds: 90,
              badge: "Thickness Builder",
              formTip: "Pull bar towards belly button, driving elbows past back for full muscular contraction."
            },
            {
              id: "gm_7",
              name: "Wide-Grip Lat Pulldowns / Pull-Ups",
              muscle: "Latissimus Dorsi",
              sets: 4,
              reps: "10 - 12 reps",
              restSeconds: 75,
              badge: "V-Taper King",
              formTip: "Initiate pull by depressing shoulder blades first, then driving elbows straight down."
            },
            {
              id: "gm_8",
              name: "Face Pulls with External Rotation",
              muscle: "Rear Delts & Rotator Cuff",
              sets: 3,
              reps: "15 reps",
              restSeconds: 60,
              badge: "Posture Armor",
              formTip: "Pull rope to forehead and rotate knuckles backwards. Crucial for shoulder health."
            },
            {
              id: "gm_9",
              name: "Incline Dumbbell Bicep Curls",
              muscle: "Biceps Long Head",
              sets: 3,
              reps: "10 - 12 reps",
              restSeconds: 60,
              badge: "Peak Builder",
              formTip: "Keep shoulders pinned back on the incline bench to isolate the bicep stretch."
            },
            {
              id: "gm_10",
              name: "Cross-Body Hammer Curls",
              muscle: "Brachialis & Forearms",
              sets: 3,
              reps: "12 reps / arm",
              restSeconds: 60,
              badge: "Arm Thickness",
              formTip: "Curl dumbbell diagonally across chest towards opposite shoulder."
            }
          ]
        },
        {
          dayNumber: 3,
          dayTitle: "Day 3: Legs (Quads, Hamstrings & Calves)",
          targetMuscles: "Quads, Hamstrings, Glutes, Calves",
          estimatedMinutes: 55,
          caloriesBurnedEst: 390,
          exercises: [
            {
              id: "gm_11",
              name: "Barbell Back Squats",
              muscle: "Quads & Glutes",
              sets: 4,
              reps: "8 - 10 reps",
              restSeconds: 120,
              badge: "King of Lifts",
              formTip: "Create intra-abdominal pressure with deep breath into belly, keep knees tracking toes."
            },
            {
              id: "gm_12",
              name: "Romanian Deadlifts (Dumbbell or Barbell)",
              muscle: "Hamstrings & Lower Back",
              sets: 3,
              reps: "10 - 12 reps",
              restSeconds: 90,
              badge: "Posterior Core",
              formTip: "Maintain slight knee bend and hinge back at hips until hamstrings are fully stretched."
            },
            {
              id: "gm_13",
              name: "Leg Extensions (Drop-set on last set)",
              muscle: "Quad Isolation",
              sets: 3,
              reps: "12 - 15 reps",
              restSeconds: 60,
              badge: "Quad Teardrop",
              formTip: "Hold peak contraction for 1 second at top. Control lowering for maximum muscle tear."
            },
            {
              id: "gm_14",
              name: "Lying / Seated Hamstring Leg Curls",
              muscle: "Hamstring Peak",
              sets: 3,
              reps: "12 - 15 reps",
              restSeconds: 60,
              badge: "Hamstring Curl",
              formTip: "Do not allow hips to lift off the bench during the curling phase."
            },
            {
              id: "gm_15",
              name: "Standing Calf Raises (3-sec Stretch)",
              muscle: "Gastrocnemius & Soleus",
              sets: 4,
              reps: "15 - 20 reps",
              restSeconds: 45,
              badge: "Calf Sculptor",
              formTip: "Pause 2 full seconds in deep stretch before pushing onto big toes."
            }
          ]
        },
        {
          dayNumber: 4,
          dayTitle: "Day 4: Push II (Focus: Upper Chest & Shoulders)",
          targetMuscles: "Upper Chest, Delts, Triceps",
          estimatedMinutes: 50,
          caloriesBurnedEst: 310,
          exercises: [
            {
              id: "gm_16",
              name: "Incline Barbell Bench Press",
              muscle: "Upper Chest",
              sets: 4,
              reps: "8 - 10 reps",
              restSeconds: 90,
              badge: "Chest Mass",
              formTip: "Lower to collarbone height, maintain solid arch without lifting glutes off bench."
            },
            {
              id: "gm_17",
              name: "Dumbbell Arnold Press",
              muscle: "Full Deltoid Rotation",
              sets: 3,
              reps: "10 - 12 reps",
              restSeconds: 75,
              badge: "3D Delts",
              formTip: "Rotate palms from facing you at bottom to facing away at lockout overhead."
            },
            {
              id: "gm_18",
              name: "High-to-Low Cable Flyes",
              muscle: "Lower & Inner Chest",
              sets: 3,
              reps: "12 - 15 reps",
              restSeconds: 60,
              badge: "Chest Squeeze",
              formTip: "Cross hands slightly at bottom for maximum pecs contraction."
            },
            {
              id: "gm_19",
              name: "Skull Crushers (EZ-Bar)",
              muscle: "Triceps Medial & Long Head",
              sets: 3,
              reps: "10 - 12 reps",
              restSeconds: 60,
              badge: "Tricep Horseshoe",
              formTip: "Angle upper arms slightly back past vertical to keep constant tension on triceps."
            }
          ]
        },
        {
          dayNumber: 5,
          dayTitle: "Day 5: Pull II (Focus: Upper Back & Bicep Peak)",
          targetMuscles: "Upper Back, Lats, Biceps, Traps",
          estimatedMinutes: 50,
          caloriesBurnedEst: 330,
          exercises: [
            {
              id: "gm_20",
              name: "Neutral-Grip Pull-Ups or Lat Pulldowns",
              muscle: "Lats & Brachialis",
              sets: 4,
              reps: "8 - 12 reps",
              restSeconds: 75,
              badge: "Lat Extension",
              formTip: "Neutral grip is easiest on shoulders and allows deepest lower lat engagement."
            },
            {
              id: "gm_21",
              name: "Single-Arm Dumbbell Row",
              muscle: "Lats & Mid Back",
              sets: 3,
              reps: "10 reps / side",
              restSeconds: 60,
              badge: "Unilateral Power",
              formTip: "Pull dumbbell in an arc toward hip pocket rather than straight vertical."
            },
            {
              id: "gm_22",
              name: "Barbell Shrugs (2-sec Hold)",
              muscle: "Upper Trapezius",
              sets: 3,
              reps: "12 reps",
              restSeconds: 60,
              badge: "Trap Tower",
              formTip: "Shrug straight up to ears, do NOT roll shoulders to prevent rotator cuff wear."
            },
            {
              id: "gm_23",
              name: "Preacher Curls / Spider Curls",
              muscle: "Biceps Short Head",
              sets: 3,
              reps: "10 - 12 reps",
              restSeconds: 60,
              badge: "Bicep Isolation",
              formTip: "Eliminates all momentum. Keep elbows stationary on the pad."
            }
          ]
        },
        {
          dayNumber: 6,
          dayTitle: "Day 6: Legs II (Focus: Quads & Glute Power)",
          targetMuscles: "Quads, Glutes, Hamstrings, Abs",
          estimatedMinutes: 50,
          caloriesBurnedEst: 370,
          exercises: [
            {
              id: "gm_24",
              name: "Hack Squat / Front Squat",
              muscle: "Quad Hypertrophy",
              sets: 4,
              reps: "10 - 12 reps",
              restSeconds: 90,
              badge: "Quad Focus",
              formTip: "Place feet slightly lower on platform for maximal knee flexion and quad stretch."
            },
            {
              id: "gm_25",
              name: "Barbell Hip Thrusts",
              muscle: "Gluteus Maximus",
              sets: 4,
              reps: "10 - 12 reps",
              restSeconds: 90,
              badge: "Glute Power",
              formTip: "Drive through heels, pause at top with hips fully open, chin tucked into chest."
            },
            {
              id: "gm_26",
              name: "Cable Woodchoppers & Planks",
              muscle: "Core & Obliques",
              sets: 3,
              reps: "15 reps / side",
              restSeconds: 45,
              badge: "Core Stability",
              formTip: "Pivot rear foot and initiate rotation from the abdominal wall, not shoulders."
            }
          ]
        },
        {
          dayNumber: 7,
          dayTitle: "Day 7: Rebuilding & Growth Sleep",
          targetMuscles: "Complete Rest & Recovery",
          estimatedMinutes: 15,
          caloriesBurnedEst: 80,
          exercises: [
            {
              id: "gm_27",
              name: "Foam Rolling & Full Body Static Stretching",
              muscle: "Fascia & Flexibility",
              sets: 1,
              reps: "20 mins",
              restSeconds: 0,
              badge: "Recovery Protocol",
              formTip: "Hit quads, IT band, lats, and chest. Hydrate with electrolytes and hit protein goal."
            }
          ]
        }
      ]
    },

    // 3. GAIN WEIGHT / BULKING (MASS FOCUS)
    gain_fat: {
      routineName: "Heavy Compound Mass Builder",
      splitType: "Power-Hypertrophy Mass Split (5 Days + 2 Rest)",
      days: [
        {
          dayNumber: 1,
          dayTitle: "Day 1: Heavy Bench & Upper Press Power",
          targetMuscles: "Chest, Triceps, Shoulders",
          estimatedMinutes: 55,
          caloriesBurnedEst: 330,
          exercises: [
            {
              id: "gb_1",
              name: "Barbell Flat Bench Press (Strength Focus)",
              muscle: "Pectorals",
              sets: 5,
              reps: "5 - 6 heavy reps",
              restSeconds: 150,
              badge: "Mass Builder",
              formTip: "Heavy weight requires locked-in form: retracted scapula, leg drive, tight grip."
            },
            {
              id: "gb_2",
              name: "Heavy Incline Dumbbell Press",
              muscle: "Upper Chest",
              sets: 4,
              reps: "8 reps",
              restSeconds: 90,
              badge: "Thick Pecs",
              formTip: "Control the weight on the way down; explode upward on the press."
            },
            {
              id: "gb_3",
              name: "Weighted / Bodyweight Chest Dips",
              muscle: "Lower Chest & Triceps",
              sets: 3,
              reps: "8 - 10 reps",
              restSeconds: 90,
              badge: "Upper Mass",
              formTip: "Lean forward 30 degrees to engage the chest rather than just the triceps."
            },
            {
              id: "gb_4",
              name: "Close-Grip Barbell Bench Press",
              muscle: "Triceps & Inner Chest",
              sets: 3,
              reps: "8 reps",
              restSeconds: 75,
              badge: "Arm Anchor",
              formTip: "Grip shoulder-width apart. Do not go too narrow to spare your wrists."
            }
          ]
        },
        {
          dayNumber: 2,
          dayTitle: "Day 2: Heavy Squats & Lower Body Base",
          targetMuscles: "Quads, Glutes, Adductors",
          estimatedMinutes: 55,
          caloriesBurnedEst: 380,
          exercises: [
            {
              id: "gb_5",
              name: "Barbell Back Squats (5x5)",
              muscle: "Full Lower Body",
              sets: 5,
              reps: "5 reps",
              restSeconds: 150,
              badge: "Strength Foundation",
              formTip: "Drive your hips back, sink down below parallel, and power up through your entire foot."
            },
            {
              id: "gb_6",
              name: "Heavy Leg Press",
              muscle: "Quads & Glutes",
              sets: 4,
              reps: "8 - 10 reps",
              restSeconds: 90,
              badge: "Mass Loader",
              formTip: "Do not round lower back off the pad at bottom of movement."
            },
            {
              id: "gb_7",
              name: "Walking Barbell Lunges",
              muscle: "Quads & Glutes",
              sets: 3,
              reps: "10 steps / leg",
              restSeconds: 90,
              badge: "Leg Density",
              formTip: "Step deep and upright to build massive quad sweep."
            }
          ]
        },
        {
          dayNumber: 3,
          dayTitle: "Day 3: Rest & Calorie Fueling",
          targetMuscles: "Growth & Glycogen Replenishment",
          estimatedMinutes: 10,
          caloriesBurnedEst: 50,
          exercises: [
            {
              id: "gb_8",
              name: "Light 15-Minute Digestive Walk",
              muscle: "Gut Health & Digestion",
              sets: 1,
              reps: "15 mins",
              restSeconds: 0,
              badge: "Appetite Booster",
              formTip: "Bulking requires processing large calories. Gentle walking aids nutrient assimilation."
            }
          ]
        },
        {
          dayNumber: 4,
          dayTitle: "Day 4: Heavy Deadlifts & Back Thickness",
          targetMuscles: "Back, Lats, Traps, Forearms",
          estimatedMinutes: 55,
          caloriesBurnedEst: 390,
          exercises: [
            {
              id: "gb_9",
              name: "Conventional Barbell Deadlifts",
              muscle: "Entire Posterior Chain",
              sets: 4,
              reps: "5 reps",
              restSeconds: 180,
              badge: "Whole Body Mass",
              formTip: "Pull slack out of bar before lifting. Drive the floor away with your legs."
            },
            {
              id: "gb_10",
              name: "Heavy T-Bar / Barbell Bent-Over Row",
              muscle: "Mid-Back & Lats",
              sets: 4,
              reps: "8 reps",
              restSeconds: 90,
              badge: "Back Thickness",
              formTip: "Keep back locked at a 45° angle. Squeeze shoulder blades at top."
            },
            {
              id: "gb_11",
              name: "Weighted Pull-Ups or Heavy Pulldowns",
              muscle: "Lats & Biceps",
              sets: 3,
              reps: "6 - 8 reps",
              restSeconds: 90,
              badge: "Upper Width",
              formTip: "Full dead-hang at bottom, pull chin over bar at peak."
            }
          ]
        },
        {
          dayNumber: 5,
          dayTitle: "Day 5: Shoulder Power & Arm Hypertrophy",
          targetMuscles: "Shoulders, Biceps, Triceps",
          estimatedMinutes: 50,
          caloriesBurnedEst: 320,
          exercises: [
            {
              id: "gb_12",
              name: "Standing Barbell Military Press",
              muscle: "Deltoids & Triceps",
              sets: 4,
              reps: "6 - 8 reps",
              restSeconds: 120,
              badge: "Shoulder Power",
              formTip: "Tight core and glutes. Clear your chin and lock out overhead with head pushed slightly through."
            },
            {
              id: "gb_13",
              name: "Heavy Barbell Bicep Curls",
              muscle: "Biceps",
              sets: 4,
              reps: "8 reps",
              restSeconds: 75,
              badge: "Gun Mass",
              formTip: "Keep elbows at sides. Avoid excessive swinging."
            },
            {
              id: "gb_14",
              name: "Heavy Overhead Dumbbell Tricep Extension",
              muscle: "Triceps Long Head",
              sets: 4,
              reps: "8 - 10 reps",
              restSeconds: 75,
              badge: "Tricep Bulk",
              formTip: "Hold single heavy dumbbell with both hands, lower behind head for maximum stretch."
            }
          ]
        },
        {
          dayNumber: 6,
          dayTitle: "Day 6: Hamstrings, Calves & Core",
          targetMuscles: "Hamstrings, Calves, Core",
          estimatedMinutes: 45,
          caloriesBurnedEst: 290,
          exercises: [
            {
              id: "gb_15",
              name: "Barbell Romanian Deadlifts",
              muscle: "Hamstrings",
              sets: 4,
              reps: "8 - 10 reps",
              restSeconds: 90,
              badge: "Posterior Anchor",
              formTip: "Keep bar kissing your shins all the way down."
            },
            {
              id: "gb_16",
              name: "Standing Heavy Calf Raises",
              muscle: "Calves",
              sets: 4,
              reps: "12 reps (heavy)",
              restSeconds: 60,
              badge: "Calf Power",
              formTip: "Pause 3 seconds at bottom of stretch."
            }
          ]
        },
        {
          dayNumber: 7,
          dayTitle: "Day 7: Rest & Feast Recovery",
          targetMuscles: "Systemic Rebuild",
          estimatedMinutes: 10,
          caloriesBurnedEst: 50,
          exercises: [
            {
              id: "gb_17",
              name: "Complete Rest Day",
              muscle: "Rest & Sleep",
              sets: 1,
              reps: "Full day rest",
              restSeconds: 0,
              badge: "Anabolic State",
              formTip: "Eat in surplus, get 8-9 hours of sleep, let muscles synthesize proteins."
            }
          ]
        }
      ]
    },

    // 4. BUILD SIX-PACK ABS
    make_abs: {
      routineName: "360-Degree Core Architecture & Definition",
      splitType: "Chiseled Abs & Athletic Definition (6 Days)",
      days: [
        {
          dayNumber: 1,
          dayTitle: "Day 1: Upper Rectus & Serratus Chiseler",
          targetMuscles: "Upper Abs, Serratus, Chest",
          estimatedMinutes: 45,
          caloriesBurnedEst: 350,
          exercises: [
            {
              id: "ab_1",
              name: "Kneeling Cable Crunches",
              muscle: "Upper & Mid Rectus Abdominis",
              sets: 4,
              reps: "15 reps",
              restSeconds: 45,
              badge: "Weighted Core",
              formTip: "Keep hips static. Roll your ribcage down into your pelvis as if curling into a ball."
            },
            {
              id: "ab_2",
              name: "Dumbbell Pullovers on Bench",
              muscle: "Serratus Anterior & Lats",
              sets: 3,
              reps: "12 reps",
              restSeconds: 60,
              badge: "Serratus Wings",
              formTip: "Deep breath at the bottom stretches the ribcage and serratus, carving lines beside your abs."
            },
            {
              id: "ab_3",
              name: "Decline Bench Weighted Sit-Ups",
              muscle: "Upper Abdominal Wall",
              sets: 3,
              reps: "12 - 15 reps",
              restSeconds: 45,
              badge: "Peak Flexion",
              formTip: "Hold weight plate against upper chest. Never pull behind neck."
            },
            {
              id: "ab_4",
              name: "Incline Push-Up to Mountain Climber Intervals",
              muscle: "Core & Cardiovascular",
              sets: 4,
              reps: "40s work / 20s rest",
              restSeconds: 30,
              badge: "Fat Burn",
              formTip: "Keep hips locked level with shoulders. Drive knees straight to nose."
            }
          ]
        },
        {
          dayNumber: 2,
          dayTitle: "Day 2: Lower Abdominal Shred & Leg Drive",
          targetMuscles: "Lower Abs, Hip Flexors, Quads",
          estimatedMinutes: 45,
          caloriesBurnedEst: 360,
          exercises: [
            {
              id: "ab_5",
              name: "Hanging Leg Raises to Bar",
              muscle: "Lower Rectus Abdominis",
              sets: 4,
              reps: "12 - 15 reps",
              restSeconds: 60,
              badge: "Lower Ab King",
              formTip: "Curl your pelvis up toward your chin. Don't just swing your legs using momentum."
            },
            {
              id: "ab_6",
              name: "Captains Chair Knee Tucks with Twist",
              muscle: "Lower Abs & Lower Obliques",
              sets: 3,
              reps: "15 reps each side",
              restSeconds: 45,
              badge: "V-Taper Cut",
              formTip: "Twist your knees to 45° at peak of lift to target the lower V-cut inguinal lines."
            },
            {
              id: "ab_7",
              name: "Reverse Crunches on Incline Bench",
              muscle: "Lower Abdominal Isolation",
              sets: 3,
              reps: "15 reps",
              restSeconds: 45,
              badge: "Deep Lower",
              formTip: "Lift hips 2 inches off the bench at the top and pause for 1 second."
            },
            {
              id: "ab_8",
              name: "Jump Squats / Burpees",
              muscle: "Full Body Fat Shred",
              sets: 3,
              reps: "15 reps",
              restSeconds: 45,
              badge: "Metabolic Spike",
              formTip: "Explode straight up, landing softly in ball-to-heel motion."
            }
          ]
        },
        {
          dayNumber: 3,
          dayTitle: "Day 3: Obliques & Rotational Armor",
          targetMuscles: "Internal & External Obliques",
          estimatedMinutes: 40,
          caloriesBurnedEst: 330,
          exercises: [
            {
              id: "ab_9",
              name: "Cable Woodchoppers (High-to-Low)",
              muscle: "External Obliques",
              sets: 3,
              reps: "12 reps / side",
              restSeconds: 45,
              badge: "Rotational Cut",
              formTip: "Pivot rear foot and initiate movement from rotational core torque, keeping arms straight."
            },
            {
              id: "ab_10",
              name: "Russian Twists with Medicine Ball / Dumbbell",
              muscle: "Obliques & Transverse Core",
              sets: 4,
              reps: "20 total reps",
              restSeconds: 45,
              badge: "Waistline Chisel",
              formTip: "Keep heels elevated 2 inches off ground. Rotate shoulders fully from side to side."
            },
            {
              id: "ab_11",
              name: "Side Plank Hip Dips",
              muscle: "Lateral Core & Quadratus Lumborum",
              sets: 3,
              reps: "12 reps / side",
              restSeconds: 30,
              badge: "Oblique Pillar",
              formTip: "Lower hip until it taps floor, then squeeze top oblique to drive hips high."
            }
          ]
        },
        {
          dayNumber: 4,
          dayTitle: "Day 4: Transverse Abdominis & Vacuum Control",
          targetMuscles: "Deep Core, Stomach Vacuum, Posture",
          estimatedMinutes: 35,
          caloriesBurnedEst: 220,
          exercises: [
            {
              id: "ab_12",
              name: "Stomach Vacuum Holds (Four-Point / Standing)",
              muscle: "Transverse Abdominis (TVA)",
              sets: 4,
              reps: "20 - 30 seconds hold",
              restSeconds: 45,
              badge: "Tiny Waist Secret",
              formTip: "Exhale all air completely. Pull your navel back towards your spine and hold without breathing air in."
            },
            {
              id: "ab_13",
              name: "Ab Wheel Rollouts",
              muscle: "Total Ab Wall & Anti-Extension",
              sets: 3,
              reps: "10 reps",
              restSeconds: 60,
              badge: "Advanced Core",
              formTip: "Keep hips tucked in poster pelvic tilt. Do not let lower back sag as you extend forward."
            },
            {
              id: "ab_14",
              name: "Dead Bug Exercise (Tempo 3-0-3)",
              muscle: "Deep Core Stability",
              sets: 3,
              reps: "12 reps / side",
              restSeconds: 30,
              badge: "Anti-Rotation",
              formTip: "Ensure your lower back is glued flat against the floor at all times."
            }
          ]
        },
        {
          dayNumber: 5,
          dayTitle: "Day 5: 360-Degree Core Circuit & HIIT",
          targetMuscles: "Full Core & Metabolic conditioning",
          estimatedMinutes: 45,
          caloriesBurnedEst: 400,
          exercises: [
            {
              id: "ab_15",
              name: "Plank to Dolphin Pose",
              muscle: "Core & Shoulders",
              sets: 3,
              reps: "15 reps",
              restSeconds: 30,
              badge: "Core Dynamic",
              formTip: "Push through elbows to pike hips high while pressing belly into spine."
            },
            {
              id: "ab_16",
              name: "Hanging Windshield Wipers",
              muscle: "Obliques & Lower Abs",
              sets: 3,
              reps: "10 reps total",
              restSeconds: 60,
              badge: "Gymnast Abs",
              formTip: "Advanced exercise: rotate toes from side to side like a windshield wiper under full control."
            },
            {
              id: "ab_17",
              name: "Sprints / Assault Bike Intervals",
              muscle: "Full Body Fat Stripper",
              sets: 6,
              reps: "20s sprint / 40s walk",
              restSeconds: 40,
              badge: "Shred Finisher",
              formTip: "Maximum effort in the 20-second sprint to melt the visceral fat layer covering the abs."
            }
          ]
        },
        {
          dayNumber: 6,
          dayTitle: "Day 6: Functional Core & Full Body Compound",
          targetMuscles: "Core, Lower Back, Glutes",
          estimatedMinutes: 40,
          caloriesBurnedEst: 310,
          exercises: [
            {
              id: "ab_18",
              name: "Suitcase Dumbbell Carries",
              muscle: "Anti-Lateral Flexion Core",
              sets: 4,
              reps: "40 meters / side",
              restSeconds: 45,
              badge: "Functional Armor",
              formTip: "Hold heavy dumbbell in one hand only. Walk perfectly upright without leaning towards the weight."
            },
            {
              id: "ab_19",
              name: "Bird-Dog with 3-sec Squeeze",
              muscle: "Posterior Core & Glutes",
              sets: 3,
              reps: "12 reps / side",
              restSeconds: 30,
              badge: "Spinal Balance",
              formTip: "Reach opposite arm and leg as far as possible, keeping hips parallel to the floor."
            }
          ]
        },
        {
          dayNumber: 7,
          dayTitle: "Day 7: Full Core Decompression & Rest",
          targetMuscles: "Spine, Abdominals, Nervous System",
          estimatedMinutes: 15,
          caloriesBurnedEst: 70,
          exercises: [
            {
              id: "ab_20",
              name: "Cobra Stretch & Child's Pose Flow",
              muscle: "Abdominal & Spine Relaxation",
              sets: 1,
              reps: "15 mins",
              restSeconds: 0,
              badge: "Core Lengthening",
              formTip: "Gently stretch the rectus abdominis and decompress the lumbar spine with slow deep breaths."
            }
          ]
        }
      ]
    },

    // 5. ATHLETIC ENDURANCE & STAMINA
    endurance: {
      routineName: "Hybrid Athlete & High-Output Conditioning",
      splitType: "Cardiovascular & Stamina Split (5 Days + 2 Rest)",
      days: [
        {
          dayNumber: 1,
          dayTitle: "Day 1: Functional Full-Body Intervals",
          targetMuscles: "Quads, Heart Rate, Shoulders, Core",
          estimatedMinutes: 45,
          caloriesBurnedEst: 440,
          exercises: [
            {
              id: "en_1",
              name: "Dumbbell Clean and Jerk",
              muscle: "Full Body Explosive",
              sets: 4,
              reps: "12 reps",
              restSeconds: 45,
              badge: "Athletic Power",
              formTip: "Pop hips, catch dumbbells at shoulders, dip knees and drive overhead."
            },
            {
              id: "en_2",
              name: "Rowing Machine 500m Repeats",
              muscle: "Full Body Cardio",
              sets: 4,
              reps: "500m / set",
              restSeconds: 60,
              badge: "Engine Builder",
              formTip: "Legs drive first, then lean back, then pull handle into sternum."
            },
            {
              id: "en_3",
              name: "Box Jumps / Step-Overs",
              muscle: "Plyometrics & Calves",
              sets: 3,
              reps: "15 reps",
              restSeconds: 45,
              badge: "Vertical Spring",
              formTip: "Land like a ninja: soft knees and quiet foot contact."
            }
          ]
        },
        {
          dayNumber: 2,
          dayTitle: "Day 2: Lactate Threshold & Upper Endurance",
          targetMuscles: "Back, Chest, Triceps & Lungs",
          estimatedMinutes: 45,
          caloriesBurnedEst: 410,
          exercises: [
            {
              id: "en_4",
              name: "Kettlebell Snatch / Clean",
              muscle: "Hips, Back, Shoulders",
              sets: 4,
              reps: "15 reps / arm",
              restSeconds: 45,
              badge: "Relentless Stamina",
              formTip: "Punch your hand through the bell at the top to prevent it from slapping your forearm."
            },
            {
              id: "en_5",
              name: "Push-Up to Downward Dog Flow",
              muscle: "Chest & Shoulder Mobility",
              sets: 3,
              reps: "15 reps",
              restSeconds: 30,
              badge: "Active Stamina",
              formTip: "Transition smoothly from deep push-up into tall hamstring and shoulder stretch."
            }
          ]
        },
        {
          dayNumber: 3,
          dayTitle: "Day 3: Lower Body Work Capacity",
          targetMuscles: "Quads, Hamstrings, Calves",
          estimatedMinutes: 45,
          caloriesBurnedEst: 420,
          exercises: [
            {
              id: "en_6",
              name: "Barbell Front Squats (Tempo 3-1-1)",
              muscle: "Quads & Core Stamina",
              sets: 4,
              reps: "10 reps",
              restSeconds: 60,
              badge: "Posture Endurance",
              formTip: "Keep elbows pointed high to maintain thoracic extension under fatigue."
            },
            {
              id: "en_7",
              name: "Sled Push / Walking Lunge Marathon",
              muscle: "Legs & Lungs",
              sets: 4,
              reps: "50 meters",
              restSeconds: 60,
              badge: "Grit Builder",
              formTip: "Drive knees through and never let your cadence drop."
            }
          ]
        },
        {
          dayNumber: 4,
          dayTitle: "Day 4: Aerobic Base Flush",
          targetMuscles: "Aerobic System & Fat Oxidation",
          estimatedMinutes: 40,
          caloriesBurnedEst: 350,
          exercises: [
            {
              id: "en_8",
              name: "Zone 2 Steady State Jog / Cycle",
              muscle: "Cardiovascular System",
              sets: 1,
              reps: "35 mins continuous",
              restSeconds: 0,
              badge: "Mitochondrial Density",
              formTip: "Stay at 65-75% of your max heart rate. You should be able to speak in full sentences."
            }
          ]
        },
        {
          dayNumber: 5,
          dayTitle: "Day 5: Agility, Speed & Core Conditioning",
          targetMuscles: "Fast Twitch Fibers & Core",
          estimatedMinutes: 45,
          caloriesBurnedEst: 430,
          exercises: [
            {
              id: "en_9",
              name: "Shuttle Runs / Suicide Drills",
              muscle: "Deceleration & Agility",
              sets: 5,
              reps: "5-10-15 meter shuttle",
              restSeconds: 60,
              badge: "Speed Agility",
              formTip: "Drop your hips low before changing direction to prevent knee shearing."
            },
            {
              id: "en_10",
              name: "Plank Jacks & Hollow Body Rocks",
              muscle: "Anti-Extension Core",
              sets: 3,
              reps: "45s work / 15s rest",
              restSeconds: 30,
              badge: "Core Dynamic",
              formTip: "Breathe continuously without letting hips bounce."
            }
          ]
        },
        {
          dayNumber: 6,
          dayTitle: "Day 6: Recovery Yoga & Myofascial Release",
          targetMuscles: "Flexibility & Joint Health",
          estimatedMinutes: 30,
          caloriesBurnedEst: 150,
          exercises: [
            {
              id: "en_11",
              name: "Vinyasa Yoga Flow & Hip Openers",
              muscle: "Full Body Mobility",
              sets: 1,
              reps: "30 mins",
              restSeconds: 0,
              badge: "Restoration",
              formTip: "Lengthen breathing cycles to lower sympathetic nervous system stress."
            }
          ]
        },
        {
          dayNumber: 7,
          dayTitle: "Day 7: Full System Reset",
          targetMuscles: "Recovery",
          estimatedMinutes: 10,
          caloriesBurnedEst: 50,
          exercises: [
            {
              id: "en_12",
              name: "Rest, Hydration & Cold/Warm Shower Therapy",
              muscle: "Vascular Recovery",
              sets: 1,
              reps: "Rest Day",
              restSeconds: 0,
              badge: "Full Reset",
              formTip: "Recharge glycogen stores, drink 3-4 liters of water."
            }
          ]
        }
      ]
    }
  }
};
