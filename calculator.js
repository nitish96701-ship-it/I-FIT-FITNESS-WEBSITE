/**
 * FitPulse Pro - Scientific Fitness & Nutrition Calculator
 */

const FitnessCalculator = {
  /**
   * Calculate Body Mass Index (BMI) and health category
   */
  calculateBMI(weightKg, heightCm) {
    if (!weightKg || !heightCm || heightCm <= 0) return { bmi: 0, category: "N/A", color: "#64748B" };
    const heightM = heightCm / 100;
    const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

    let category = "Normal";
    let color = "#00F59B";
    let advice = "You are in the optimal healthy weight range for athletic longevity.";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "#00E5FF";
      advice = "A structured surplus diet with strength training will help you build healthy lean muscle.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = "Healthy Weight";
      color = "#00F59B";
      advice = "Optimal baseline. Ideal for focusing on recomposition, muscle shaping, or athletic power.";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      category = "Overweight";
      color = "#F59E0B";
      advice = "A moderate caloric deficit paired with resistance training will quickly burn fat.";
    } else {
      category = "Obese Class";
      color = "#FF4757";
      advice = "Prioritize sustainable calorie deficit and joint-friendly low-impact training.";
    }

    const minHealthyWeight = Math.round(18.5 * heightM * heightM);
    const maxHealthyWeight = Math.round(24.9 * heightM * heightM);

    return {
      bmi,
      category,
      color,
      advice,
      healthyRange: `${minHealthyWeight} kg - ${maxHealthyWeight} kg`
    };
  },

  /**
   * Calculate Basal Metabolic Rate using Mifflin-St Jeor equation
   */
  calculateBMR(weightKg, heightCm, age, gender = "male") {
    if (!weightKg || !heightCm || !age) return 1800;
    if (gender === "female") {
      return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);
    }
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);
  },

  /**
   * Calculate Total Daily Energy Expenditure (TDEE)
   */
  calculateTDEE(bmr, activityMultiplier = 1.4) {
    return Math.round(bmr * activityMultiplier);
  },

  /**
   * Calculate personalized target daily calories and macronutrient breakdown
   */
  calculatePlan(userProfile) {
    const { weightKg, heightCm, age, gender, goalId, activityLevel } = userProfile;
    const goal = FITNESS_DATA.goals[goalId] || FITNESS_DATA.goals.gain_muscle;

    // Activity multiplier mapping
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      heavy: 1.725,
      athlete: 1.9
    };
    const multiplier = activityMultipliers[activityLevel] || 1.45;

    const bmr = this.calculateBMR(weightKg, heightCm, age, gender);
    const tdee = this.calculateTDEE(bmr, multiplier);
    const targetCalories = Math.max(1200, tdee + goal.calorieAdjustment);

    // Protein Target: grams per kg of bodyweight
    const targetProteinGrams = Math.round(weightKg * goal.proteinFactor);
    const proteinCalories = targetProteinGrams * 4;

    // Dietary Fats: ~25% of target calories
    const targetFatGrams = Math.round((targetCalories * 0.25) / 9);
    const fatCalories = targetFatGrams * 9;

    // Remaining calories from Carbohydrates
    const remainingCalories = Math.max(300, targetCalories - (proteinCalories + fatCalories));
    const targetCarbGrams = Math.round(remainingCalories / 4);

    // Water intake requirement in Liters (approx 35-40ml per kg + workout hydration)
    const dailyWaterLiters = Math.max(2.5, Math.round((weightKg * 0.038) * 10) / 10);

    const bmiInfo = this.calculateBMI(weightKg, heightCm);

    return {
      bmiInfo,
      bmr,
      tdee,
      targetCalories,
      targetProteinGrams,
      targetCarbGrams,
      targetFatGrams,
      dailyWaterLiters,
      goal
    };
  },

  /**
   * Format currency in Indian Rupees (₹)
   */
  formatINR(amount) {
    return "₹" + Math.round(amount).toLocaleString("en-IN");
  }
};
