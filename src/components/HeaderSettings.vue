<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  maxCountExamples: number
}>()

const quantityTrainingDays = ref(1)
const quantityResolvedTasks = ref(0)

if (localStorage.getItem('quantityTrainingDays')) {
  quantityTrainingDays.value = JSON.parse(
    JSON.stringify(localStorage.getItem('quantityTrainingDays')),
  )
}

if (localStorage.getItem('quantityResolvedTasks')) {
  quantityResolvedTasks.value = JSON.parse(
    JSON.stringify(localStorage.getItem('quantityResolvedTasks')),
  )
}
</script>

<template>
  <div class="header-settings-box">
    <h1>Привет!</h1>

    <div class="header-settings-text-box">
      <span>Добро пожаловать на {{ quantityTrainingDays }} тренировачный день,</span>
      <span
        >Ваш последний результат - решено {{ quantityResolvedTasks }} из
        {{ props.maxCountExamples }}</span
      >
      <span>Общая точность {{ (quantityResolvedTasks / maxCountExamples) * 100 }}%</span>
    </div>
  </div>
</template>

<style scoped>
.header-settings-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header-settings-text-box {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 18px;
}
</style>
