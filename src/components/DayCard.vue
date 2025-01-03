`<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'
import { useMealStore } from '../stores/mealStore'
import MealDetails from './MealDetails.vue'

const props = defineProps<{
  day: {
    date: Date
    meals: any[]
  }
  index: number
}>()

const store = useMealStore()

const formattedDate = computed(() => format(props.day.date, 'EEEE, MMM d'))

const dailyTotals = computed(() => ({
  calories: props.day.meals.reduce((sum, meal) => sum + meal.calories, 0),
  protein: props.day.meals.reduce((sum, meal) => sum + meal.protein, 0),
  carbs: props.day.meals.reduce((sum, meal) => sum + meal.carbs, 0),
  fats: props.day.meals.reduce((sum, meal) => sum + meal.fats, 0)
}))
</script>

<template>
  <v-card class="mb-4" elevation="2">
    <v-card-title class="text-h6 pa-4">
      {{ formattedDate }}
    </v-card-title>

    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12">
          <v-progress-linear
            :model-value="(dailyTotals.calories / store.dailyNutritionGoals.calories) * 100"
            color="primary"
            height="8"
            rounded
            class="mb-2"
          />
        </v-col>
      </v-row>

      <div class="text-caption mb-4">
        <div>Calories: {{ dailyTotals.calories }} / {{ store.dailyNutritionGoals.calories }}</div>
        <div>Protein: {{ dailyTotals.protein }}g / {{ store.dailyNutritionGoals.protein }}g</div>
        <div>Carbs: {{ dailyTotals.carbs }}g / {{ store.dailyNutritionGoals.carbs }}g</div>
        <div>Fats: {{ dailyTotals.fats }}g / {{ store.dailyNutritionGoals.fats }}g</div>
      </div>

      <v-expansion-panels class="meal-panels">
        <v-expansion-panel
          v-for="meal in day.meals"
          :key="meal.id"
        >
          <v-expansion-panel-title>
            <v-row no-gutters>
              <v-col cols="8">
                {{ meal.type }} - {{ meal.name }}
              </v-col>
              <v-col cols="4" class="text-right">
                {{ meal.time }}
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          
          <v-expansion-panel-text>
            <MealDetails :meal="meal" @toggle-completion="store.toggleMealCompletion(index, meal.id)" />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.meal-panels :deep(.v-expansion-panel) {
  background-color: #f8f9fa;
}

.meal-panels :deep(.v-expansion-panel-title) {
  background-color: #f8f9fa;
}

.meal-panels :deep(.v-expansion-panel-text) {
  background-color: #ffffff;
}
</style>`