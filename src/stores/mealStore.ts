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
        {
          id: `lunch-${i}`,
          type: 'lunch',
          name: 'Grilled Chicken Salad',
          time: '12:00',
          calories: 450,
          protein: 35,
          carbs: 30,
          fats: 15,
          ingredients: [
            { name: 'Chicken Breast', portion: '200g' },
            { name: 'Lettuce', portion: '1 cup' },
            { name: 'Tomatoes', portion: '1 medium' },
            { name: 'Olive Oil', portion: '1 tbsp' }
          ],
          prepTime: 20,
          completed: false
        },
        {
          id: `dinner-${i}`,
          type: 'dinner',
          name: 'Baked Salmon with Veggies',
          time: '19:00',
          calories: 500,
          protein: 40,
          carbs: 20,
          fats: 25,
          ingredients: [
            { name: 'Salmon', portion: '200g' },
            { name: 'Broccoli', portion: '1 cup' },
            { name: 'Carrots', portion: '1 medium' },
            { name: 'Olive Oil', portion: '1 tbsp' }
          ],
          prepTime: 30,
          completed: false
        },
        {
          id: `snack-${i}`,
          type: 'snack',
          name: 'Greek Yogurt with Honey',
          time: '16:00',
          calories: 200,
          protein: 10,
          carbs: 25,
          fats: 5,
          ingredients: [
            { name: 'Greek Yogurt', portion: '1 cup' },
            { name: 'Honey', portion: '1 tbsp' }
          ],
          prepTime: 5,
          completed: false
        }
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