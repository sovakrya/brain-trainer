<script setup lang="ts">
import IconCross from './icons/IconCross.vue'

const emits = defineEmits<{
  saveOnCancel: []
}>()
</script>

<template>
  <div class="header-game-main-box">
    <button class="header-cancellation-btn">
      <IconCross />

      <span @click="emits('saveOnCancel')">отмена</span>
    </button>

    <div class="timer-wrapper">
      <div class="timer-box">
        <span class="timer-title">таймер</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-game-main-box {
  display: flex;
  gap: 18px;
  justify-content: space-between;
}

.header-cancellation-btn {
  display: flex;
  gap: 10px;
  height: 50px;
  padding: 6px;
  width: 110px;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: gray;
  cursor: pointer;
  background: none;
  border-radius: 4px;
  box-shadow: 2px 2px 5px rgb(206, 206, 206);
  transition: all 0.3s;
}
.header-cancellation-btn:hover {
  background-color: rgba(206, 206, 206, 0.596);
}

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
}

.timer-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: rgb(114, 114, 114);
  font-size: 16px;
}
</style>
