<script setup lang="ts">
import { ref } from 'vue'

const durationGame = ref(1)
const complexityGame = ref(1)
</script>

<template>
  <div class="settings-box">
    <div class="duration-box">
      <h2>Настройки</h2>
      <div>
        <input type="range" min="1" max="15" v-model="durationGame" class="duraion-input" />
        <div class="duraion-text">
          <span>Длительность {{ durationGame }} </span>
          <span v-if="durationGame < 2">минута</span>
          <span v-else-if="durationGame < 5 && durationGame > 1">минуты</span>
          <span v-else-if="durationGame >= 5">минут</span>
        </div>
      </div>

      <div class="inputs-box">
        <input type="range" min="1" max="15" v-model="complexityGame" class="duraion-input" />
        <span>Сложность {{ complexityGame }}</span>
      </div>
    </div>

    <div class="settings-signs-wrapper">
      <div class="settings-signs-box">
        <input type="checkbox" class="sign-checkbox" />
        <span>Суммирование</span>
      </div>
      <div class="settings-signs-box">
        <input type="checkbox" class="sign-checkbox" />
        <span>Разность</span>
      </div>
      <div class="settings-signs-box">
        <input type="checkbox" class="sign-checkbox" />
        <span>Умножение</span>
      </div>
      <div class="settings-signs-box">
        <input type="checkbox" class="sign-checkbox" />
        <span>Деление</span>
      </div>
      <div class="settings-signs-box">
        <input type="checkbox" class="sign-checkbox" />
        <span>Возведение в степень</span>
      </div>
    </div>

    <button class="settings-play-btn">Play!</button>
  </div>
</template>

<style scoped>
.settings-box {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.duration-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.duraion-input {
  width: 300px;
}

.inputs-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.duraion-text {
  display: flex;
  gap: 4px;
}

.settings-signs-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.settings-signs-box {
  display: flex;
  gap: 8px;
  font-size: 18px;
  align-items: center;
}

.sign-checkbox {
  width: 18px;
  height: 18px;
}

.settings-play-btn {
  align-self: flex-end;
  border: none;
  background: none;
  box-shadow: 2px 2px 4px rgb(206, 206, 206);
  border-radius: 4px;
  width: 80px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.4s;
}

.settings-play-btn:hover {
  background-color: rgba(236, 236, 236, 0.521);
}
</style>
