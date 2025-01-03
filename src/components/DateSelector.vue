`<script setup lang="ts">
import { useMealStore } from '../stores/mealStore'

const store = useMealStore()
</script>

<template>
  <v-row class="mb-6" justify="center">
    <v-col cols="12" sm="6" md="4">
      <v-date-picker
        v-model="store.currentWeek"
        @update:model-value="store.setCurrentWeek"
        class="mx-auto"
        width="100%"
      />
    </v-col>
  </v-row>
</template>`