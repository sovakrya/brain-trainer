<script setup lang="ts"></script>

<template>
  <div class="keyboard-main-box">
    <div class="keyboard-numbers-wrapper">
      <div class="keyboard-numbers-box">
        <div class="keyboard-button keyboard-button-numbers">1</div>
        <div class="keyboard-button keyboard-button-numbers">2</div>
        <div class="keyboard-button keyboard-button-numbers">3</div>
      </div>
      <div class="keyboard-numbers-box">
        <div class="keyboard-button keyboard-button-numbers">4</div>
        <div class="keyboard-button keyboard-button-numbers">5</div>
        <div class="keyboard-button keyboard-button-numbers">6</div>
      </div>
      <div class="keyboard-numbers-box">
        <div class="keyboard-button keyboard-button-numbers">7</div>
        <div class="keyboard-button keyboard-button-numbers">8</div>
        <div class="keyboard-button keyboard-button-numbers">9</div>
      </div>
      <div class="keyboard-button keyboard-button-numbers" style="align-self: center">0</div>
    </div>
    <div class="keyboard-actions-box">
      <div class="keyboard-button keyboard-button-action">←</div>
      <div class="keyboard-button keyboard-button-action">→</div>
      <div class="keyboard-button keyboard-button-action">?</div>
      <div class="keyboard-button keyboard-button-action">=</div>
    </div>
  </div>
</template>

<style scoped>
.keyboard-main-box {
  align-self: center;
  display: flex;
  gap: 34px;
}

.keyboard-numbers-wrapper {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.keyboard-numbers-box {
  display: flex;
  gap: 12px;
}

.keyboard-actions-box {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.keyboard-button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  width: 65px;
  height: 65px;
  border-radius: 50px;
  background-color: bisque;
  box-shadow: 2px 8px 6px rgb(122, 122, 122);
  cursor: pointer;
  transition: all 0.3s;
}

.keyboard-button-numbers {
  background-color: rgb(255, 131, 59);
}

.keyboard-button-numbers:hover {
  background-color: rgb(255, 161, 107);
}

.keyboard-button-action {
  background-color: rgb(180, 180, 180);
}

.keyboard-button-action:hover {
  background-color: rgb(202, 202, 202);
}
</style>
