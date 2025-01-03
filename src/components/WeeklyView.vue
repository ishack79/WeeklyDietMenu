`<script setup lang="ts">
import { ref } from 'vue'
import { useMealStore } from '../stores/mealStore'
import DayCard from './DayCard.vue'
import DateSelector from './DateSelector.vue'

const store = useMealStore()
</script>

<template>
  <v-container fluid>
    <DateSelector />
    
    <v-row>
      <v-col
        v-for="(day, index) in store.weeklyPlan"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <DayCard :day="day" :index="index" />
      </v-col>
    </v-row>
  </v-container>
</template>`