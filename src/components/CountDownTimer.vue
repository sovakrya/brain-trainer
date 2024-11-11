<script setup lang="ts">
import { ref, watch } from 'vue'

const emits = defineEmits<{
  timerIsUp: []
}>()

const timer = ref()
const interval = ref<number>()

if (localStorage.getItem('timer')) {
  timer.value = JSON.parse(JSON.stringify(localStorage.getItem('timer')))
} else {
  timer.value = JSON.parse(localStorage.getItem('duration')!) * 60000
}

interval.value = setTimeout(() => {
  timer.value -= 1000
  localStorage.setItem('timer', JSON.stringify(timer.value))
}, 1000)

watch(timer, () => {
  if (timer.value >= 0) {
    interval.value = setTimeout(() => {
      timer.value -= 1000
      localStorage.setItem('timer', JSON.stringify(timer.value))
    }, 1000)
  }

  if (timer.value <= 0) {
    clearInterval(interval.value)
    emits('timerIsUp')
  }
})
</script>

<template>
  <div class="timer-wrapper">
    <div class="timer-box">
      <span class="timer-title"> {{ Math.floor(timer / 1000 / 60) }} : </span>
      <span class="timer-title">{{ (timer / 1000) % 60 }}</span>
    </div>
  </div>
</template>

<style scoped>
.timer-wrapper {
  position: relative;
  background-color: rgb(183, 204, 243);
  border-radius: 4px;
  width: 110px;
  height: 50px;
}

.timer-box {
  position: absolute;
  background-color: rgb(238, 238, 238);
  border-radius: 4px;
  width: 80px;
  left: 2px;
  bottom: 3px;
  height: 45px;
  display: flex;
  gap: 4px;
  justify-content: center;
}

.timer-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: rgb(114, 114, 114);
  font-size: 20px;
}
</style>
