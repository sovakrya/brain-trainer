<script setup lang="ts"></script>

<template>
  <div class="header-settings-box">
    <h1>Привет!</h1>

    <div class="header-settings-text-box">
      <span>Добро пожаловать на {{}} тренировачный день,</span>
      <span>Ваш последний результат - решено {{}} из {{}}</span>
      <span>Общая точность {{}}</span>
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
