import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { startOfWeek, addDays } from 'date-fns'

interface Meal {
  id: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  name: string
  time: string
  calories: number
  protein: number
  carbs: number
  fats: number
  ingredients: Array<{ name: string, portion: string }>
  prepTime: number
  completed: boolean
}

interface DayPlan {
  date: Date
  meals: Meal[]
}

export const useMealStore = defineStore('meals', () => {
  const currentWeek = ref(new Date())
  const weeklyPlan = ref<DayPlan[]>([])

  // Sample data generator
  const generateSampleWeek = () => {
    const startDate = startOfWeek(currentWeek.value)
    return Array.from({ length: 7 }, (_, i) => ({
      date: addDays(startDate, i),
      meals: [
        {
          id: `breakfast-${i}`,
          type: 'breakfast',
          name: 'Oatmeal with Fruits',
          time: '08:00',
          calories: 350,
          protein: 12,
          carbs: 45,
          fats: 8,
          ingredients: [
            { name: 'Oats', portion: '1 cup' },
            { name: 'Banana', portion: '1 medium' },
            { name: 'Almonds', portion: '10g' }
          ],
          prepTime: 15,
          completed: false
        },
        // Add more meals...
      ]
    }))
  }

  // Initialize with sample data
  weeklyPlan.value = generateSampleWeek()

  const setCurrentWeek = (date: Date) => {
    currentWeek.value = date
    weeklyPlan.value = generateSampleWeek()
  }

  const toggleMealCompletion = (dayIndex: number, mealId: string) => {
    const meal = weeklyPlan.value[dayIndex].meals.find(m => m.id === mealId)
    if (meal) {
      meal.completed = !meal.completed
    }
  }

  const dailyNutritionGoals = computed(() => ({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 70
  }))

  return {
    currentWeek,
    weeklyPlan,
    setCurrentWeek,
    toggleMealCompletion,
    dailyNutritionGoals
  }
})