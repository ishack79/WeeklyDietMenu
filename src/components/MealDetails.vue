`<script setup lang="ts">
defineProps<{
  meal: {
    id: string
    type: string
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
}>()

const emit = defineEmits<{
  (e: 'toggleCompletion'): void
}>()
</script>

<template>
  <div class="meal-details">
    <v-row>
      <v-col cols="12">
        <v-chip
          :color="meal.completed ? 'success' : 'default'"
          @click="emit('toggleCompletion')"
          class="mb-2"
        >
          <v-icon start>
            {{ meal.completed ? 'mdi-check' : 'mdi-clock' }}
          </v-icon>
          {{ meal.completed ? 'Completed' : 'Mark as completed' }}
        </v-chip>
      </v-col>
    </v-row>

    <div class="text-subtitle-2 mb-2">Nutritional Information</div>
    <v-row dense>
      <v-col cols="6">
        <div>Calories: {{ meal.calories }}kcal</div>
        <div>Protein: {{ meal.protein }}g</div>
      </v-col>
      <v-col cols="6">
        <div>Carbs: {{ meal.carbs }}g</div>
        <div>Fats: {{ meal.fats }}g</div>
      </v-col>
    </v-row>

    <div class="text-subtitle-2 mt-4 mb-2">Ingredients</div>
    <v-list density="compact">
      <v-list-item
        v-for="(ingredient, index) in meal.ingredients"
        :key="index"
        :title="ingredient.name"
        :subtitle="ingredient.portion"
      />
    </v-list>

    <div class="text-caption mt-2">
      Preparation time: {{ meal.prepTime }} minutes
    </div>
  </div>
</template>`