/**
 * FitPulse Pro - Main Application Controller
 * Handles user profile state, interactive onboarding wizard, workout planner,
 * budget-based protein optimization engine, audio rest timer, and habit tracking.
 */

// Default State
const AppState = {
  profile: {
    name: "Athlete",
    age: 24,
    gender: "male",
    weightKg: 70,
    heightCm: 175,
    activityLevel: "moderate",
    goalId: "gain_muscle",
    equipment: "gym",
    monthlyBudget: 3000,
    dietPreference: "all"
  },
  workout: {
    activeDay: 1,
    completedExercises: {} // key: exerciseId, value: boolean
  },
  budget: {
    selectedBudgetINR: 3000,
    dietPreference: "all",
    sortBy: "efficiency",
    activeDietDay: 1, // 1 to 7 (Monday - Sunday)
    viewMode: "single" // "single" | "weekly"
  },
  water: {
    consumedGlasses: 0,
    targetGlasses: 13
  },
  habits: {
    workout: false,
    protein: false,
    water: false,
    sleep: false
  },
  timer: {
    durationSeconds: 60,
    remainingSeconds: 60,
    intervalId: null,
    isRunning: false
  },
  wizardCurrentStep: 1
};

// Initialize Application on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  loadSavedState();
  initOnboardingWizard();
  initTabNavigation();
  initWorkoutPlanner();
  initBudgetOptimizer();
  initWaterAndHabits();
  initRestTimer();
  initPrintHandler();

  // Initial Full Render
  renderAll();

  // Check if first-time user
  const savedProfile = localStorage.getItem("fitpulse_profile_v1");
  if (!savedProfile) {
    openOnboardingModal();
  }
});

/**
 * Load state from localStorage
 */
function loadSavedState() {
  try {
    const savedProfile = localStorage.getItem("fitpulse_profile_v1");
    if (savedProfile) {
      AppState.profile = Object.assign(AppState.profile, JSON.parse(savedProfile));
      AppState.budget.selectedBudgetINR = AppState.profile.monthlyBudget || 3000;
      AppState.budget.dietPreference = AppState.profile.dietPreference || "all";
    }

    const savedCompleted = localStorage.getItem("fitpulse_completed_exercises");
    if (savedCompleted) {
      AppState.workout.completedExercises = JSON.parse(savedCompleted);
    }

    const savedWater = localStorage.getItem("fitpulse_water_glasses");
    if (savedWater) {
      AppState.water.consumedGlasses = parseInt(savedWater, 10) || 0;
    }

    const savedHabits = localStorage.getItem("fitpulse_habits");
    if (savedHabits) {
      AppState.habits = Object.assign(AppState.habits, JSON.parse(savedHabits));
    }
  } catch (err) {
    console.error("Error loading saved state:", err);
  }
}

/**
 * Save current profile to localStorage
 */
function saveProfileState() {
  try {
    localStorage.setItem("fitpulse_profile_v1", JSON.stringify(AppState.profile));
  } catch (e) {
    console.error("Could not save profile to localStorage", e);
  }
}

/**
 * Master Render Function
 */
function renderAll() {
  renderDashboardHero();
  renderWorkoutPlanner();
  renderBudgetSection();
  renderMacrosSection();
  renderWaterTracker();
  renderHabitsList();
}

/* ==========================================================================
   1. DASHBOARD HERO & METRICS RENDER
   ========================================================================== */
function renderDashboardHero() {
  const plan = FitnessCalculator.calculatePlan(AppState.profile);
  const goal = plan.goal;

  // Header Status
  document.getElementById("displayUserName").textContent = AppState.profile.name || "Athlete";
  document.getElementById("headerGoalText").textContent = goal.name;
  document.getElementById("displayUserGoalDesc").textContent = goal.tagline;

  // Avatar Initials
  const initials = (AppState.profile.name || "FP")
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  document.getElementById("userAvatar").textContent = initials || "IF";

  // Metrics Grid
  document.getElementById("statDailyProtein").textContent = plan.targetProteinGrams;
  document.getElementById("statProteinRatio").textContent = `~${goal.proteinFactor}g per kg bodyweight`;

  document.getElementById("statDailyCalories").textContent = plan.targetCalories.toLocaleString();
  const deficitText = goal.calorieAdjustment < 0 
    ? `${Math.abs(goal.calorieAdjustment)} kcal deficit for shred`
    : goal.calorieAdjustment > 0 
    ? `+${goal.calorieAdjustment} kcal surplus for growth`
    : "Maintenance baseline";
  document.getElementById("statCalorieDeficit").textContent = deficitText;

  document.getElementById("statBmiScore").textContent = plan.bmiInfo.bmi;
  const bmiBadge = document.getElementById("statBmiBadge");
  bmiBadge.textContent = plan.bmiInfo.category;
  bmiBadge.style.color = plan.bmiInfo.color;
  bmiBadge.style.backgroundColor = `${plan.bmiInfo.color}20`;
  document.getElementById("statHealthyRange").textContent = `Healthy: ${plan.bmiInfo.healthyRange}`;

  document.getElementById("statDailyWater").textContent = plan.dailyWaterLiters;
  const targetGlasses = Math.round(plan.dailyWaterLiters / 0.25);
  AppState.water.targetGlasses = targetGlasses;
  document.getElementById("statWaterGlasses").textContent = `~${targetGlasses} glasses (250ml)`;

  // Habit Protein label
  document.getElementById("habitProteinGramsText").textContent = `${plan.targetProteinGrams}g`;
}

/* ==========================================================================
   2. TAB NAVIGATION
   ========================================================================== */
function initTabNavigation() {
  const tabs = document.querySelectorAll(".nav-tab");
  const sections = document.querySelectorAll(".app-section");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-target");

      tabs.forEach(t => t.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active-section"));

      tab.classList.add("active");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add("active-section");
      }
    });
  });

  // Hero Quick jump button to budget section
  document.getElementById("btnJumpToBudget").addEventListener("click", () => {
    document.getElementById("tabNavBudget").click();
    document.getElementById("section-budget").scrollIntoView({ behavior: "smooth" });
  });
}

/* ==========================================================================
   3. DAILY WORKOUT PLANNER
   ========================================================================== */
function initWorkoutPlanner() {
  // Event delegation for exercise completion checkboxes
  const cardsList = document.getElementById("exerciseCardsList");
  cardsList.addEventListener("click", (e) => {
    const card = e.target.closest(".exercise-card");
    if (!card) return;

    if (e.target.closest(".exercise-checkbox-wrap") || e.target.classList.contains("checkbox-custom")) {
      const exerciseId = card.getAttribute("data-id");
      AppState.workout.completedExercises[exerciseId] = !AppState.workout.completedExercises[exerciseId];
      
      try {
        localStorage.setItem("fitpulse_completed_exercises", JSON.stringify(AppState.workout.completedExercises));
      } catch (err) {}

      renderWorkoutExercises();
      updateWorkoutProgressBar();
    }
  });
}

function renderWorkoutPlanner() {
  const goalId = AppState.profile.goalId || "gain_muscle";
  const routine = FITNESS_DATA.workoutRoutines[goalId] || FITNESS_DATA.workoutRoutines.gain_muscle;
  const goal = FITNESS_DATA.goals[goalId] || FITNESS_DATA.goals.gain_muscle;

  document.getElementById("plannerGoalPill").textContent = `${goal.icon} ${goal.name}`;
  document.getElementById("plannerSubtitle").textContent = routine.splitType;

  // Render Day Selector Buttons (1 to 7)
  const strip = document.getElementById("daySelectorStrip");
  strip.innerHTML = "";

  routine.days.forEach(day => {
    const btn = document.createElement("button");
    btn.className = `day-btn ${day.dayNumber === AppState.workout.activeDay ? "active" : ""}`;
    btn.setAttribute("data-day", day.dayNumber);

    btn.innerHTML = `
      <span class="day-btn-num">Day ${day.dayNumber}</span>
      <span class="day-btn-target" title="${day.targetMuscles}">${day.targetMuscles.split(",")[0]}</span>
    `;

    btn.addEventListener("click", () => {
      AppState.workout.activeDay = day.dayNumber;
      document.querySelectorAll(".day-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderWorkoutExercises();
    });

    strip.appendChild(btn);
  });

  renderWorkoutExercises();
}

function renderWorkoutExercises() {
  const goalId = AppState.profile.goalId || "gain_muscle";
  const routine = FITNESS_DATA.workoutRoutines[goalId] || FITNESS_DATA.workoutRoutines.gain_muscle;
  const activeDay = routine.days.find(d => d.dayNumber === AppState.workout.activeDay) || routine.days[0];

  // Update Header & Quick stats
  document.getElementById("activeDayHeading").textContent = activeDay.dayTitle;
  document.getElementById("activeDayMuscles").textContent = `Target Focus: ${activeDay.targetMuscles}`;
  document.getElementById("qsExerciseCount").textContent = `${activeDay.exercises.length} Movements`;
  document.getElementById("qsDuration").textContent = `${activeDay.estimatedMinutes} mins`;
  document.getElementById("qsBurn").textContent = `${activeDay.caloriesBurnedEst} kcal`;

  // Render Exercise Cards
  const container = document.getElementById("exerciseCardsList");
  container.innerHTML = "";

  activeDay.exercises.forEach(ex => {
    const isCompleted = !!AppState.workout.completedExercises[ex.id];
    const card = document.createElement("div");
    card.className = `exercise-card ${isCompleted ? "completed" : ""}`;
    card.setAttribute("data-id", ex.id);

    card.innerHTML = `
      <div class="exercise-checkbox-wrap">
        <div class="checkbox-custom" title="Click to toggle completed">
          ${isCompleted ? "✓" : ""}
        </div>
      </div>
      <div class="exercise-content">
        <div class="exercise-header-line">
          <h4 class="exercise-name">${ex.name}</h4>
          <span class="exercise-tag">${ex.badge || ex.muscle}</span>
        </div>
        <div class="exercise-params-row">
          <div class="param-pill">
            <span>Muscle:</span>
            <strong>${ex.muscle}</strong>
          </div>
          <div class="param-pill">
            <span>Volume:</span>
            <strong>${ex.sets} sets × ${ex.reps}</strong>
          </div>
          <div class="param-pill">
            <span>Rest:</span>
            <strong>${ex.restSeconds}s</strong>
          </div>
        </div>
        <div class="exercise-form-tip">
          💡 <strong>Coach Tip:</strong> ${ex.formTip}
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  updateWorkoutProgressBar();
}

function updateWorkoutProgressBar() {
  const goalId = AppState.profile.goalId || "gain_muscle";
  const routine = FITNESS_DATA.workoutRoutines[goalId] || FITNESS_DATA.workoutRoutines.gain_muscle;
  const activeDay = routine.days.find(d => d.dayNumber === AppState.workout.activeDay) || routine.days[0];

  const total = activeDay.exercises.length;
  let completed = 0;

  activeDay.exercises.forEach(ex => {
    if (AppState.workout.completedExercises[ex.id]) completed++;
  });

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  document.getElementById("completionPercent").textContent = `${percent}%`;
  document.getElementById("workoutProgressBar").style.width = `${percent}%`;

  // Sync to habits
  if (percent === 100) {
    document.getElementById("habitWorkout").checked = true;
    AppState.habits.workout = true;
  }
}

/* ==========================================================================
   4. "YOUR BUDGET" & PROTEIN OPTIMIZATION SECTION
   ========================================================================== */
function initBudgetOptimizer() {
  // Preset buttons: 2000, 3000, 4000, 5000
  const presetButtons = document.querySelectorAll(".budget-btn");
  presetButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const budget = parseInt(btn.getAttribute("data-budget"), 10);
      setBudget(budget);
    });
  });

  // Custom Slider
  const slider = document.getElementById("customBudgetSlider");
  slider.addEventListener("input", (e) => {
    const budget = parseInt(e.target.value, 10);
    setBudget(budget, false);
  });

  // Dietary Preference Chips
  const dietChips = document.querySelectorAll(".chip-btn");
  dietChips.forEach(chip => {
    chip.addEventListener("click", () => {
      dietChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      AppState.budget.dietPreference = chip.getAttribute("data-diet");
      renderBudgetSection();
    });
  });

  // Sources Sort Dropdown
  document.getElementById("sourcesSortSelect").addEventListener("change", (e) => {
    AppState.budget.sortBy = e.target.value;
    renderProteinSourcesGrid();
  });

  // Auto-Scale Protein Button
  document.getElementById("btnAutoScaleProtein")?.addEventListener("click", () => {
    autoScaleBlueprintPortions();
  });

  // Reset Blueprint Portions Button
  document.getElementById("btnResetBlueprint")?.addEventListener("click", () => {
    AppState.activeMealItems = null;
    renderBudgetSection();
  });

  // View Mode Switcher (Single Day vs 7-Day Weekly Matrix)
  const viewModeButtons = document.querySelectorAll(".view-mode-btn");
  viewModeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      viewModeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      AppState.budget.viewMode = btn.getAttribute("data-mode");
      renderBudgetSection();
    });
  });

  // Sync Diet with Active Workout Day
  document.getElementById("btnSyncDietWithWorkout")?.addEventListener("click", () => {
    AppState.budget.activeDietDay = AppState.workout.activeDay;
    AppState.budget.viewMode = "single";
    AppState.activeMealItems = null;

    document.querySelectorAll(".view-mode-btn").forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-mode") === "single");
    });

    renderBudgetSection();

    const syncBtn = document.getElementById("btnSyncDietWithWorkout");
    if (syncBtn) {
      const originalText = syncBtn.innerHTML;
      syncBtn.innerHTML = `✅ Synced to Day ${AppState.workout.activeDay}`;
      setTimeout(() => {
        syncBtn.innerHTML = originalText;
      }, 2200);
    }
  });

  // Print Weekly Diet Plan
  document.getElementById("btnPrintWeeklyDiet")?.addEventListener("click", () => {
    window.print();
  });

  // Portion Adjuster Buttons (+ and - delegation)
  document.getElementById("blueprintScheduleGrid").addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-portion");
    if (!btn) return;
    const foodId = btn.getAttribute("data-id");
    const isPlus = btn.classList.contains("btn-portion-plus");
    adjustMealPortion(foodId, isPlus);
  });
}

function setBudget(amount, updateSlider = true) {
  AppState.budget.selectedBudgetINR = amount;
  AppState.profile.monthlyBudget = amount;
  AppState.activeMealItems = null;
  saveProfileState();

  // Update button active state
  document.querySelectorAll(".budget-btn").forEach(b => {
    const bAmt = parseInt(b.getAttribute("data-budget"), 10);
    b.classList.toggle("active", bAmt === amount);
  });

  // Update slider display
  document.getElementById("customBudgetDisplay").textContent = `₹${amount.toLocaleString("en-IN")} / month`;
  if (updateSlider) {
    document.getElementById("customBudgetSlider").value = amount;
  }

  renderBudgetSection();
}

function renderBudgetSection() {
  const plan = FitnessCalculator.calculatePlan(AppState.profile);
  const targetProtein = plan.targetProteinGrams;
  const currentBudget = AppState.budget.selectedBudgetINR;
  const dailyAllowance = Math.round(currentBudget / 30);
  const diet = AppState.budget.dietPreference;

  // Update Hero text
  document.getElementById("budgetHeroTargetProtein").textContent = `${targetProtein}g protein`;
  document.getElementById("budgetSummaryGoalProtein").textContent = `${targetProtein}g / day`;
  document.getElementById("budgetSummarySelectedTier").textContent = `₹${currentBudget.toLocaleString("en-IN")} / month`;
  document.getElementById("budgetSummaryDailyCost").textContent = `~₹${dailyAllowance} / day`;

  // Find or calculate Blueprint for current budget
  let blueprint = FITNESS_DATA.budgetPlans[currentBudget];
  if (!blueprint) {
    blueprint = generateCustomBudgetBlueprint(currentBudget, targetProtein, diet);
  }

  // Render Day-Wise Selector Strip (Day 1 - Day 7)
  renderDietDayStrip(blueprint);

  // Toggle Single Day vs 7-Day Weekly Matrix View
  const singleView = document.getElementById("singleDayDietView");
  const weeklyView = document.getElementById("weeklyDietMatrixContainer");

  if (AppState.budget.viewMode === "weekly") {
    if (singleView) singleView.style.display = "none";
    if (weeklyView) weeklyView.style.display = "block";
    renderWeeklyDietMatrix(blueprint, targetProtein, currentBudget, diet);
  } else {
    if (singleView) singleView.style.display = "block";
    if (weeklyView) weeklyView.style.display = "none";
    renderBlueprintSchedule(blueprint, targetProtein, currentBudget, diet);
  }

  renderProteinSourcesGrid();
  renderGroceryChecklist(blueprint, diet);
}

/**
 * Generate dynamic custom blueprint if slider is used
 */
function generateCustomBudgetBlueprint(budgetINR, targetProtein, diet) {
  // Nearest baseline
  const baseTiers = [2000, 3000, 4000, 5000];
  let closestTier = 3000;
  let minDiff = Infinity;
  baseTiers.forEach(t => {
    const diff = Math.abs(t - budgetINR);
    if (diff < minDiff) {
      minDiff = diff;
      closestTier = t;
    }
  });

  const basePlan = FITNESS_DATA.budgetPlans[closestTier];
  const ratio = budgetINR / closestTier;

  // Scale base plan slightly
  const dietPlans = {};
  ["all", "veg", "nonveg"].forEach(d => {
    const items = basePlan.dietaryPlans[d] || basePlan.dietaryPlans.all;
    dietPlans[d] = items.map(item => {
      const scaledQty = Math.round(item.quantity * ratio);
      const scaledProtein = Math.round((item.protein * ratio) * 10) / 10;
      const scaledCost = Math.round((item.costINR * ratio) * 10) / 10;
      return {
        ...item,
        quantity: scaledQty,
        protein: scaledProtein,
        costINR: scaledCost
      };
    });
  });

  // Scale weekly schedule
  const weeklySchedule = (basePlan.weeklySchedule || []).map(day => {
    const scaledDietPlans = {};
    ["all", "veg", "nonveg"].forEach(d => {
      const items = day.dietaryPlans[d] || day.dietaryPlans.all || [];
      scaledDietPlans[d] = items.map(item => ({
        ...item,
        quantity: Math.round(item.quantity * ratio),
        protein: Math.round((item.protein * ratio) * 10) / 10,
        costINR: Math.round((item.costINR * ratio) * 10) / 10
      }));
    });
    return {
      ...day,
      dietaryPlans: scaledDietPlans
    };
  });

  return {
    tier: budgetINR,
    title: `Custom Budget Optimization (₹${budgetINR.toLocaleString("en-IN")} / mo)`,
    dailyBudgetINR: Math.round(budgetINR / 30),
    tagline: `Engineered specifically for your ₹${budgetINR.toLocaleString("en-IN")} monthly allocation.`,
    dietaryPlans: dietPlans,
    weeklySchedule: weeklySchedule
  };
}

function renderDietDayStrip(blueprint) {
  const container = document.getElementById("dietDayStrip");
  if (!container) return;
  container.innerHTML = "";

  const defaultDays = [
    { dayNumber: 1, dayName: "Monday", focusTag: "Push Fuel" },
    { dayNumber: 2, dayName: "Tuesday", focusTag: "Pull Power" },
    { dayNumber: 3, dayName: "Wednesday", focusTag: "Leg Refeed" },
    { dayNumber: 4, dayName: "Thursday", focusTag: "Recovery Cleanse" },
    { dayNumber: 5, dayName: "Friday", focusTag: "Upper Hypertrophy" },
    { dayNumber: 6, dayName: "Saturday", focusTag: "Shred & Core" },
    { dayNumber: 7, dayName: "Sunday", focusTag: "System Reset" }
  ];
  const days = (blueprint.weeklySchedule && blueprint.weeklySchedule.length === 7) 
    ? blueprint.weeklySchedule 
    : defaultDays;

  days.forEach(d => {
    const btn = document.createElement("button");
    btn.className = `diet-day-btn ${d.dayNumber === AppState.budget.activeDietDay ? "active" : ""}`;
    btn.setAttribute("data-day", d.dayNumber);

    const shortName = d.dayName.split(" ")[0].slice(0, 3);
    const shortFocus = d.focusTag.split(" ")[0];

    btn.innerHTML = `
      <span class="diet-day-btn-day">${shortName} (D${d.dayNumber})</span>
      <span class="diet-day-btn-focus" title="${d.focusTag}">${shortFocus}</span>
    `;

    btn.addEventListener("click", () => {
      AppState.budget.activeDietDay = d.dayNumber;
      AppState.budget.viewMode = "single";
      AppState.activeMealItems = null;

      document.querySelectorAll(".view-mode-btn").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-mode") === "single");
      });

      renderBudgetSection();
    });

    container.appendChild(btn);
  });
}

function renderBlueprintSchedule(blueprint, targetProtein, budgetINR, diet) {
  const daySchedule = (blueprint.weeklySchedule || []).find(d => d.dayNumber === AppState.budget.activeDietDay) || 
                      (blueprint.weeklySchedule ? blueprint.weeklySchedule[0] : null);

  if (!AppState.activeMealItems) {
    let baseItems = [];
    const targetPlans = (daySchedule && daySchedule.dietaryPlans) ? daySchedule.dietaryPlans : blueprint.dietaryPlans;

    if (diet === "veg" && targetPlans.veg) {
      baseItems = targetPlans.veg;
    } else if (diet === "nonveg" && targetPlans.nonveg) {
      baseItems = targetPlans.nonveg;
    } else if (diet === "egg") {
      baseItems = (targetPlans.nonveg || targetPlans.all).filter(m => m.foodId !== "chicken_breast");
    } else if (diet === "vegan") {
      baseItems = (targetPlans.veg || targetPlans.all).filter(m => !["double_toned_milk", "curd_greek_yogurt", "paneer_lowfat", "whey_protein"].includes(m.foodId));
    } else {
      baseItems = targetPlans.all || targetPlans.veg;
    }

    // Deep clone to allow live adjustments
    AppState.activeMealItems = baseItems.map(item => ({ ...item }));
  }

  const mealItems = AppState.activeMealItems;

  // Calculate totals
  let totalProtein = 0;
  let totalCost = 0;

  mealItems.forEach(item => {
    totalProtein += item.protein;
    totalCost += item.costINR;
  });
  totalProtein = Math.round(totalProtein);
  totalCost = Math.round(totalCost);

  const dailyBudget = Math.round(budgetINR / 30);
  const monthlyProjected = totalCost * 30;

  // Header update with Day Name & Training Tag
  if (daySchedule) {
    document.getElementById("blueprintTierPill").textContent = `${daySchedule.dayName} (Day ${daySchedule.dayNumber}) - ₹${budgetINR.toLocaleString("en-IN")}/mo`;
    document.getElementById("blueprintTitle").textContent = `${daySchedule.dayTitle}`;
    document.getElementById("blueprintTagline").textContent = `${daySchedule.focusTag}: ${daySchedule.tagline}`;
  } else {
    document.getElementById("blueprintTierPill").textContent = `₹${budgetINR.toLocaleString("en-IN")} / mo Blueprint`;
    document.getElementById("blueprintTitle").textContent = blueprint.title;
    document.getElementById("blueprintTagline").textContent = blueprint.tagline;
  }

  // Protein Meter
  document.getElementById("blueprintProteinAchieved").textContent = `${totalProtein}g / ${targetProtein}g`;
  const proteinPercent = Math.min(100, Math.round((totalProtein / targetProtein) * 100));
  document.getElementById("blueprintProteinFill").style.width = `${proteinPercent}%`;
  document.getElementById("blueprintProteinPercentage").textContent = `${proteinPercent}% of daily goal met!`;

  // Cost Meter
  document.getElementById("blueprintCostAchieved").textContent = `₹${totalCost} / ₹${dailyBudget}`;
  const costPercent = Math.min(100, Math.round((totalCost / dailyBudget) * 100));
  document.getElementById("blueprintCostFill").style.width = `${costPercent}%`;
  document.getElementById("blueprintCostMonthly").textContent = `Est. ₹${monthlyProjected.toLocaleString("en-IN")} / mo (${totalCost <= dailyBudget ? "Under Budget!" : "Slightly Over Budget"})`;

  // Render Meal Cards Grid
  const scheduleGrid = document.getElementById("blueprintScheduleGrid");
  scheduleGrid.innerHTML = "";

  mealItems.forEach(item => {
    const food = FITNESS_DATA.proteinSources.find(f => f.id === item.foodId);
    if (!food) return;

    const card = document.createElement("div");
    card.className = "meal-plan-card";
    card.innerHTML = `
      <div>
        <span class="meal-time-badge">⏰ ${item.timing}</span>
        <h4 class="meal-food-name">${food.name}</h4>
        <div class="meal-stats-row">
          <div>Portion: <strong>${item.quantity} ${item.unit}</strong></div>
          <div>Protein: <strong class="highlight-green">${item.protein.toFixed(1)}g</strong></div>
          <div>Cost: <strong class="highlight-cyan">₹${Math.round(item.costINR)}</strong></div>
        </div>
        <div class="meal-portion-adjuster">
          <button class="btn-portion btn-portion-minus" data-id="${item.foodId}" title="Decrease Portion">-</button>
          <span class="portion-display">${item.quantity} ${item.unit}</span>
          <button class="btn-portion btn-portion-plus" data-id="${item.foodId}" title="Increase Portion">+</button>
        </div>
      </div>
      <p class="meal-prep-note">👨‍🍳 <strong>Prep:</strong> ${food.prepTip}</p>
    `;
    scheduleGrid.appendChild(card);
  });
}

function renderWeeklyDietMatrix(blueprint, targetProtein, budgetINR, diet) {
  const matrixGrid = document.getElementById("weeklyMatrixGrid");
  if (!matrixGrid) return;
  matrixGrid.innerHTML = "";

  const titleEl = document.getElementById("weeklyMatrixTitle");
  if (titleEl) {
    titleEl.textContent = `7-Day Weekly Nutrition Matrix (₹${budgetINR.toLocaleString("en-IN")} / mo)`;
  }

  const days = blueprint.weeklySchedule || [];
  const dailyBudget = Math.round(budgetINR / 30);

  days.forEach(day => {
    let dayMeals = [];
    if (diet === "veg" && day.dietaryPlans.veg) {
      dayMeals = day.dietaryPlans.veg;
    } else if (diet === "nonveg" && day.dietaryPlans.nonveg) {
      dayMeals = day.dietaryPlans.nonveg;
    } else if (diet === "egg") {
      dayMeals = (day.dietaryPlans.nonveg || day.dietaryPlans.all).filter(m => m.foodId !== "chicken_breast");
    } else if (diet === "vegan") {
      dayMeals = (day.dietaryPlans.veg || day.dietaryPlans.all).filter(m => !["double_toned_milk", "curd_greek_yogurt", "paneer_lowfat", "whey_protein"].includes(m.foodId));
    } else {
      dayMeals = day.dietaryPlans.all || day.dietaryPlans.veg;
    }

    let dayProtein = 0;
    let dayCost = 0;
    dayMeals.forEach(m => {
      dayProtein += m.protein;
      dayCost += m.costINR;
    });
    dayProtein = Math.round(dayProtein);
    dayCost = Math.round(dayCost);

    const isToday = day.dayNumber === AppState.budget.activeDietDay;
    const card = document.createElement("div");
    card.className = `matrix-day-card ${isToday ? "active-day-highlight" : ""}`;

    const mealsHtml = dayMeals.map(m => {
      const food = FITNESS_DATA.proteinSources.find(f => f.id === m.foodId);
      const foodName = food ? food.name.split("(")[0] : m.foodId;
      return `
        <div class="matrix-meal-item">
          <div class="matrix-meal-left">
            <span class="matrix-meal-time">${m.timing.split(" ")[0]}</span>
            <span class="matrix-meal-name">${foodName} (${m.quantity}${m.unit.includes("egg") ? " eggs" : m.unit.includes("scoop") ? " scp" : "g"})</span>
          </div>
          <div class="matrix-meal-right">
            <span class="matrix-meal-protein">${m.protein.toFixed(0)}g</span>
            <span class="matrix-meal-cost">₹${Math.round(m.costINR)}</span>
          </div>
        </div>
      `;
    }).join("");

    card.innerHTML = `
      <div>
        <div class="matrix-day-header">
          <div>
            <h4 class="matrix-day-title">${day.dayName} (Day ${day.dayNumber})</h4>
            <span class="matrix-day-tag">${day.focusTag}</span>
          </div>
          <button class="btn-profile-edit" style="padding: 0.25rem 0.6rem; font-size: 0.72rem;" data-day="${day.dayNumber}">
            View Day →
          </button>
        </div>
        <div class="matrix-meals-list">
          ${mealsHtml}
        </div>
      </div>
      <div class="matrix-day-footer">
        <div>
          <span>Protein:</span>
          <strong class="matrix-footer-val highlight-green">${dayProtein}g / ${targetProtein}g</strong>
        </div>
        <div style="text-align: right;">
          <span>Daily Cost:</span>
          <strong class="matrix-footer-val highlight-cyan">₹${dayCost} / ₹${dailyBudget}</strong>
        </div>
      </div>
    `;

    card.querySelector("button")?.addEventListener("click", () => {
      AppState.budget.activeDietDay = day.dayNumber;
      AppState.budget.viewMode = "single";
      AppState.activeMealItems = null;
      document.querySelectorAll(".view-mode-btn").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-mode") === "single");
      });
      renderBudgetSection();
    });

    matrixGrid.appendChild(card);
  });
}

function adjustMealPortion(foodId, isPlus) {
  if (!AppState.activeMealItems) return;
  const item = AppState.activeMealItems.find(i => i.foodId === foodId);
  if (!item) return;

  const food = FITNESS_DATA.proteinSources.find(f => f.id === foodId);
  if (!food) return;

  const step = item.unit.includes("egg") ? 50 : item.unit.includes("scoop") ? 16 : 20;
  const minQty = item.unit.includes("scoop") ? 16 : item.unit.includes("egg") ? 50 : 20;

  if (isPlus) {
    item.quantity += step;
  } else {
    if (item.quantity > minQty) {
      item.quantity -= step;
    }
  }

  // Recalculate protein and cost
  item.protein = Math.round(((item.quantity * food.proteinPer100g) / 100) * 10) / 10;
  item.costINR = Math.round(((item.quantity * food.costPer100gINR) / 100) * 10) / 10;

  const plan = FitnessCalculator.calculatePlan(AppState.profile);
  const currentBudget = AppState.budget.selectedBudgetINR;
  const diet = AppState.budget.dietPreference;
  let blueprint = FITNESS_DATA.budgetPlans[currentBudget] || generateCustomBudgetBlueprint(currentBudget, plan.targetProteinGrams, diet);

  renderBlueprintSchedule(blueprint, plan.targetProteinGrams, currentBudget, diet);
  renderGroceryChecklist(blueprint, diet);
}

function autoScaleBlueprintPortions() {
  if (!AppState.activeMealItems || AppState.activeMealItems.length === 0) return;
  const plan = FitnessCalculator.calculatePlan(AppState.profile);
  const targetProtein = plan.targetProteinGrams;

  let currentProtein = 0;
  AppState.activeMealItems.forEach(i => currentProtein += i.protein);
  if (currentProtein <= 0) return;

  const ratio = targetProtein / currentProtein;

  AppState.activeMealItems.forEach(item => {
    const food = FITNESS_DATA.proteinSources.find(f => f.id === item.foodId);
    if (!food) return;

    item.quantity = Math.round(item.quantity * ratio);
    item.protein = Math.round(((item.quantity * food.proteinPer100g) / 100) * 10) / 10;
    item.costINR = Math.round(((item.quantity * food.costPer100gINR) / 100) * 10) / 10;
  });

  const currentBudget = AppState.budget.selectedBudgetINR;
  const diet = AppState.budget.dietPreference;
  let blueprint = FITNESS_DATA.budgetPlans[currentBudget] || generateCustomBudgetBlueprint(currentBudget, targetProtein, diet);

  renderBlueprintSchedule(blueprint, targetProtein, currentBudget, diet);
  renderGroceryChecklist(blueprint, diet);
}

function renderProteinSourcesGrid() {
  const container = document.getElementById("proteinFoodGrid");
  container.innerHTML = "";

  let sources = [...FITNESS_DATA.proteinSources];
  const diet = AppState.budget.dietPreference;

  // Filter by diet
  if (diet === "veg") {
    sources = sources.filter(s => s.category === "veg");
  } else if (diet === "nonveg") {
    sources = sources.filter(s => s.category === "nonveg" || s.category === "egg");
  } else if (diet === "egg") {
    sources = sources.filter(s => s.category === "veg" || s.category === "egg");
  } else if (diet === "vegan") {
    sources = sources.filter(s => s.isVegan);
  }

  // Sort sources
  const sortBy = AppState.budget.sortBy;
  if (sortBy === "efficiency") {
    // Cost per 10g protein (lower is better)
    sources.sort((a, b) => {
      const costA = (a.costPer100gINR / a.proteinPer100g) * 10;
      const costB = (b.costPer100gINR / b.proteinPer100g) * 10;
      return costA - costB;
    });
  } else if (sortBy === "protein") {
    sources.sort((a, b) => b.proteinPer100g - a.proteinPer100g);
  } else if (sortBy === "calories") {
    sources.sort((a, b) => a.caloriesPer100g - b.caloriesPer100g);
  } else if (sortBy === "cost") {
    sources.sort((a, b) => a.costPer100gINR - b.costPer100gINR);
  }

  sources.forEach(food => {
    const costPer10g = ((food.costPer100gINR / food.proteinPer100g) * 10).toFixed(1);
    const card = document.createElement("div");
    card.className = "food-source-card";

    card.innerHTML = `
      <div class="food-card-header">
        <h4 class="food-name">${food.name}</h4>
        <span class="food-badge" style="background: ${food.badgeColor}20; color: ${food.badgeColor}; border: 1px solid ${food.badgeColor}40;">
          ${food.badge}
        </span>
      </div>

      <div class="food-macros-strip">
        <div class="food-macro-item">
          <span class="fm-label">Protein</span>
          <span class="fm-val highlight-green">${food.proteinPer100g}g</span>
        </div>
        <div class="food-macro-item">
          <span class="fm-label">Calories</span>
          <span class="fm-val">${food.caloriesPer100g}</span>
        </div>
        <div class="food-macro-item">
          <span class="fm-label">Typical</span>
          <span class="fm-val">${food.typicalServingGrams}${food.servingUnit.includes("egg") ? " eggs" : "g"}</span>
        </div>
      </div>

      <div class="food-cost-bar">
        <span>Market Price: <strong class="cost-highlight">₹${food.costPer100gINR}/100g</strong></span>
        <span style="font-size: 0.78rem; color: var(--text-secondary);">₹${costPer10g} per 10g protein</span>
      </div>

      <p class="food-prep-tip">
        <strong>Bioavailability:</strong> ${food.bioAvailability} | <strong>Prep:</strong> ${food.prepTip}
      </p>
    `;

    container.appendChild(card);
  });
}

function renderGroceryChecklist(blueprint, diet) {
  const tbody = document.getElementById("groceryTableBody");
  tbody.innerHTML = "";

  const currentPlan = blueprint.dietaryPlans[diet] || blueprint.dietaryPlans.all || blueprint.dietaryPlans.veg;

  currentPlan.forEach(item => {
    const food = FITNESS_DATA.proteinSources.find(f => f.id === item.foodId);
    if (!food) return;

    const monthlyQty = Math.round(item.quantity * 30);
    const monthlyCost = Math.round(item.costINR * 30);
    const monthlyProtein = Math.round(item.protein * 30);

    let displayQty = "";
    if (item.unit.includes("egg")) {
      displayQty = `${Math.round(monthlyQty / 50)} eggs (~${Math.round(monthlyQty / 50 / 30 * 10) / 10} trays)`;
    } else if (monthlyQty >= 1000) {
      displayQty = `${(monthlyQty / 1000).toFixed(1)} kg`;
    } else {
      displayQty = `${monthlyQty} ${item.unit}`;
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${food.name}</strong></td>
      <td><span class="badge-status">${food.category.toUpperCase()}</span></td>
      <td><strong>${displayQty}</strong></td>
      <td><strong class="highlight-green">${monthlyProtein.toLocaleString()}g</strong></td>
      <td><strong class="highlight-cyan">₹${monthlyCost.toLocaleString("en-IN")}</strong></td>
    `;
    tbody.appendChild(tr);
  });
}

/* ==========================================================================
   5. MACRO SPLIT & SCIENCE
   ========================================================================== */
function renderMacrosSection() {
  const plan = FitnessCalculator.calculatePlan(AppState.profile);

  document.getElementById("macroProteinGrams").textContent = plan.targetProteinGrams;
  document.getElementById("macroProteinKcal").textContent = `${plan.targetProteinGrams * 4} kcal`;
  const proteinPercent = Math.round(((plan.targetProteinGrams * 4) / plan.targetCalories) * 100);
  document.getElementById("macroProteinPct").textContent = `${proteinPercent}%`;

  document.getElementById("macroCarbsGrams").textContent = plan.targetCarbGrams;
  document.getElementById("macroCarbsKcal").textContent = `${plan.targetCarbGrams * 4} kcal`;
  const carbsPercent = Math.round(((plan.targetCarbGrams * 4) / plan.targetCalories) * 100);
  document.getElementById("macroCarbsPct").textContent = `${carbsPercent}%`;

  document.getElementById("macroFatsGrams").textContent = plan.targetFatGrams;
  document.getElementById("macroFatsKcal").textContent = `${plan.targetFatGrams * 9} kcal`;
  const fatsPercent = Math.round(((plan.targetFatGrams * 9) / plan.targetCalories) * 100);
  document.getElementById("macroFatsPct").textContent = `${fatsPercent}%`;

  document.getElementById("metaBMR").textContent = `${plan.bmr.toLocaleString()} kcal`;
  document.getElementById("metaTDEE").textContent = `${plan.tdee.toLocaleString()} kcal`;
  document.getElementById("metaGoalCalories").textContent = `${plan.targetCalories.toLocaleString()} kcal`;
  document.getElementById("metaCalorieAdvice").textContent = plan.goal.description;
}

/* ==========================================================================
   6. WATER TRACKER & HABIT CHECKLIST
   ========================================================================== */
function initWaterAndHabits() {
  document.getElementById("btnAddGlass").addEventListener("click", () => {
    if (AppState.water.consumedGlasses < AppState.water.targetGlasses + 5) {
      AppState.water.consumedGlasses++;
      saveWater();
      renderWaterTracker();
    }
  });

  document.getElementById("btnResetWater").addEventListener("click", () => {
    AppState.water.consumedGlasses = 0;
    saveWater();
    renderWaterTracker();
  });

  // Habits checkboxes
  const habitIds = ["habitWorkout", "habitProtein", "habitWater", "habitSleep"];
  habitIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("change", () => {
      const key = id.replace("habit", "").toLowerCase();
      AppState.habits[key] = el.checked;
      try {
        localStorage.setItem("fitpulse_habits", JSON.stringify(AppState.habits));
      } catch (e) {}
      updateDisciplineScore();
    });
  });
}

function saveWater() {
  try {
    localStorage.setItem("fitpulse_water_glasses", AppState.water.consumedGlasses);
  } catch (e) {}
}

function renderWaterTracker() {
  const consumed = AppState.water.consumedGlasses;
  const target = AppState.water.targetGlasses;
  const currentLiters = (consumed * 0.25).toFixed(1);
  const targetLiters = (target * 0.25).toFixed(1);

  document.getElementById("currentWaterLiters").textContent = currentLiters;
  document.getElementById("totalWaterTargetLiters").textContent = targetLiters;
  document.getElementById("glassesLoggedText").textContent = `${consumed} of ${target} glasses consumed`;
  document.getElementById("waterTargetDisplay").textContent = `Daily Goal: ${targetLiters} Liters (~${target} glasses)`;

  // Render glasses grid
  const grid = document.getElementById("glassesInteractiveGrid");
  grid.innerHTML = "";

  const totalSlots = Math.max(target, consumed, 12);
  for (let i = 1; i <= totalSlots; i++) {
    const btn = document.createElement("button");
    btn.className = `glass-btn ${i <= consumed ? "filled" : ""}`;
    btn.innerHTML = "💧";
    btn.title = `Glass ${i} (250ml)`;

    btn.addEventListener("click", () => {
      AppState.water.consumedGlasses = i;
      saveWater();
      renderWaterTracker();
    });

    grid.appendChild(btn);
  }

  // Update habits
  if (consumed >= target) {
    document.getElementById("habitWater").checked = true;
    AppState.habits.water = true;
  }
}

function renderHabitsList() {
  document.getElementById("habitWorkout").checked = !!AppState.habits.workout;
  document.getElementById("habitProtein").checked = !!AppState.habits.protein;
  document.getElementById("habitWater").checked = !!AppState.habits.water;
  document.getElementById("habitSleep").checked = !!AppState.habits.sleep;
  updateDisciplineScore();
}

function updateDisciplineScore() {
  let score = 0;
  if (AppState.habits.workout) score++;
  if (AppState.habits.protein) score++;
  if (AppState.habits.water) score++;
  if (AppState.habits.sleep) score++;

  document.getElementById("disciplineScoreText").textContent = `${score} / 4 Completed`;
}

/* ==========================================================================
   7. WEB AUDIO API SYNTHESIZER FOR REST TIMER
   ========================================================================== */
let audioCtx = null;

function playAudioBeep(frequency = 880, durationMs = 150) {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + durationMs / 1000);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + durationMs / 1000);
  } catch (e) {
    console.log("Audio not allowed yet by user gesture", e);
  }
}

function playCompletionChime() {
  playAudioBeep(523, 120); // C5
  setTimeout(() => playAudioBeep(659, 120), 130); // E5
  setTimeout(() => playAudioBeep(784, 250), 260); // G5
}

function initRestTimer() {
  const toggleBtn = document.getElementById("btnToggleTimer");
  const resetBtn = document.getElementById("btnResetTimer");
  const playText = document.getElementById("timerPlayText");
  const presets = document.querySelectorAll(".btn-preset");

  presets.forEach(btn => {
    btn.addEventListener("click", () => {
      presets.forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const sec = parseInt(btn.getAttribute("data-seconds"), 10);
      AppState.timer.durationSeconds = sec;
      resetTimer();
    });
  });

  toggleBtn.addEventListener("click", () => {
    if (AppState.timer.isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  resetBtn.addEventListener("click", resetTimer);
}

function updateTimerDisplay() {
  const remaining = AppState.timer.remainingSeconds;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const formatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  document.getElementById("timerDigits").textContent = formatted;
}

function startTimer() {
  AppState.timer.isRunning = true;
  document.getElementById("timerPlayText").textContent = "Pause";

  // Web audio activation gesture
  if (!audioCtx) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    } catch (e) {}
  }

  AppState.timer.intervalId = setInterval(() => {
    if (AppState.timer.remainingSeconds > 0) {
      AppState.timer.remainingSeconds--;
      updateTimerDisplay();

      // Countdown warning beeps at 3, 2, 1
      if (AppState.timer.remainingSeconds >= 1 && AppState.timer.remainingSeconds <= 3) {
        playAudioBeep(600, 80);
      }
    } else {
      // Finished!
      pauseTimer();
      playCompletionChime();
      alert("⏱️ Rest Interval Finished! Time for your next set!");
      resetTimer();
    }
  }, 1000);
}

function pauseTimer() {
  AppState.timer.isRunning = false;
  document.getElementById("timerPlayText").textContent = "Start";
  if (AppState.timer.intervalId) {
    clearInterval(AppState.timer.intervalId);
    AppState.timer.intervalId = null;
  }
}

function resetTimer() {
  pauseTimer();
  AppState.timer.remainingSeconds = AppState.timer.durationSeconds;
  updateTimerDisplay();
}

/* ==========================================================================
   8. VISITOR INTAKE ONBOARDING WIZARD MODAL
   ========================================================================== */
function initOnboardingWizard() {
  const modalOverlay = document.getElementById("onboardingModalOverlay");
  const form = document.getElementById("onboardingForm");
  const btnNext = document.getElementById("btnWizardNext");
  const btnBack = document.getElementById("btnWizardBack");
  const btnSubmit = document.getElementById("btnWizardSubmit");
  const btnEditProfile = document.getElementById("btnOpenEditProfile");

  btnEditProfile.addEventListener("click", () => {
    populateWizardFromState();
    openOnboardingModal();
  });

  btnNext.addEventListener("click", () => {
    if (validateCurrentStep()) {
      goToWizardStep(AppState.wizardCurrentStep + 1);
    }
  });

  btnBack.addEventListener("click", () => {
    if (AppState.wizardCurrentStep > 1) {
      goToWizardStep(AppState.wizardCurrentStep - 1);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      saveWizardData();
      closeOnboardingModal();
      renderAll();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

function openOnboardingModal() {
  const overlay = document.getElementById("onboardingModalOverlay");
  overlay.classList.add("active");
  AppState.wizardCurrentStep = 1;
  goToWizardStep(1);
}

function closeOnboardingModal() {
  const overlay = document.getElementById("onboardingModalOverlay");
  overlay.classList.remove("active");
}

function goToWizardStep(stepNumber) {
  AppState.wizardCurrentStep = stepNumber;
  const steps = document.querySelectorAll(".wizard-step");
  steps.forEach(s => {
    const sNum = parseInt(s.getAttribute("data-step"), 10);
    s.classList.toggle("active-step", sNum === stepNumber);
  });

  // Progress Bar & Step Text
  const percent = (stepNumber / 4) * 100;
  document.getElementById("wizardProgressFill").style.width = `${percent}%`;
  document.getElementById("wizardStepIndicator").textContent = `Step ${stepNumber} of 4`;

  // Buttons visibility
  const btnBack = document.getElementById("btnWizardBack");
  const btnNext = document.getElementById("btnWizardNext");
  const btnSubmit = document.getElementById("btnWizardSubmit");

  btnBack.style.display = stepNumber > 1 ? "block" : "none";
  btnNext.style.display = stepNumber < 4 ? "block" : "none";
  btnSubmit.style.display = stepNumber === 4 ? "block" : "none";
}

function validateCurrentStep() {
  const step = AppState.wizardCurrentStep;

  if (step === 1) {
    const name = document.getElementById("inputName").value.trim();
    const age = parseInt(document.getElementById("inputAge").value, 10);

    let valid = true;
    if (!name) {
      document.getElementById("errorName").classList.add("show");
      valid = false;
    } else {
      document.getElementById("errorName").classList.remove("show");
    }

    if (!age || isNaN(age) || age < 14 || age > 85) {
      document.getElementById("errorAge").classList.add("show");
      valid = false;
    } else {
      document.getElementById("errorAge").classList.remove("show");
    }

    return valid;
  }

  if (step === 2) {
    const weight = parseFloat(document.getElementById("inputWeight").value);
    const height = parseFloat(document.getElementById("inputHeight").value);

    let valid = true;
    if (!weight || isNaN(weight) || weight < 30 || weight > 220) {
      document.getElementById("errorWeight").classList.add("show");
      valid = false;
    } else {
      document.getElementById("errorWeight").classList.remove("show");
    }

    if (!height || isNaN(height) || height < 120 || height > 230) {
      document.getElementById("errorHeight").classList.add("show");
      valid = false;
    } else {
      document.getElementById("errorHeight").classList.remove("show");
    }

    return valid;
  }

  return true;
}

function saveWizardData() {
  const name = document.getElementById("inputName").value.trim() || "Athlete";
  const age = parseInt(document.getElementById("inputAge").value, 10) || 24;
  const gender = document.querySelector('input[name="gender"]:checked')?.value || "male";
  const weightKg = parseFloat(document.getElementById("inputWeight").value) || 70;
  const heightCm = parseFloat(document.getElementById("inputHeight").value) || 175;
  const activityLevel = document.getElementById("selectActivity").value || "moderate";

  const goalId = document.querySelector('input[name="fitnessGoal"]:checked')?.value || "gain_muscle";
  const equipment = document.querySelector('input[name="equipment"]:checked')?.value || "gym";
  const initialBudget = parseInt(document.querySelector('input[name="initialBudget"]:checked')?.value || "3000", 10);

  AppState.profile = {
    name,
    age,
    gender,
    weightKg,
    heightCm,
    activityLevel,
    goalId,
    equipment,
    monthlyBudget: initialBudget,
    dietPreference: AppState.budget.dietPreference || "all"
  };

  AppState.budget.selectedBudgetINR = initialBudget;
  AppState.workout.activeDay = 1;

  saveProfileState();
}

function populateWizardFromState() {
  const p = AppState.profile;
  document.getElementById("inputName").value = p.name || "";
  document.getElementById("inputAge").value = p.age || 24;

  const genderRadio = document.querySelector(`input[name="gender"][value="${p.gender}"]`);
  if (genderRadio) genderRadio.checked = true;

  document.getElementById("inputWeight").value = p.weightKg || 70;
  document.getElementById("inputHeight").value = p.heightCm || 175;
  document.getElementById("selectActivity").value = p.activityLevel || "moderate";

  const goalRadio = document.querySelector(`input[name="fitnessGoal"][value="${p.goalId}"]`);
  if (goalRadio) goalRadio.checked = true;

  const equipRadio = document.querySelector(`input[name="equipment"][value="${p.equipment || 'gym'}"]`);
  if (equipRadio) equipRadio.checked = true;

  const budgetRadio = document.querySelector(`input[name="initialBudget"][value="${p.monthlyBudget || 3000}"]`);
  if (budgetRadio) budgetRadio.checked = true;
}

/* ==========================================================================
   9. PRINT PLAN HANDLER
   ========================================================================== */
function initPrintHandler() {
  document.getElementById("btnPrintPlan").addEventListener("click", () => {
    window.print();
  });
}
