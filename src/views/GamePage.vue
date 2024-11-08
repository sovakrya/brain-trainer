<script setup lang="ts">
import HeaderGame from '@/components/HeaderGame.vue'
import ModalCheckResult from '@/components/ModalCheckResult.vue'
import { ref } from 'vue'

const signs = JSON.parse(localStorage.getItem('signs')!)
const complexity = JSON.parse(localStorage.getItem('complexity')!)

const example = ref<Array<number | string>>([])
const resultExample = ref<number>()
const userExample = ref<Array<number | string | undefined>>([])
const isRight = ref(false)
const modal = ref(false)
createExample()

function createExample() {
  for (let i = 0; i < Number(complexity) * 2 + 1; i++) {
    if (i === 0) {
      const num = Math.round(Math.random() * 50)
      example.value.push(num)
      userExample.value.push(num)
      continue
    }

    if (i % 2 === 0) {
      const num = Math.round(Math.random() * 50)
      example.value.push(num)
      userExample.value.push(undefined)
      continue
    } else {
      const signIdx = Math.round(Math.random() * (signs!.length - 1))
      example.value.push(signs![signIdx])
      userExample.value.push(signs[signIdx])
      continue
    }
  }
  resultExample.value = countExample(example.value)
  localStorage.setItem('result', JSON.stringify(resultExample.value))
  localStorage.setItem('example', JSON.stringify(example.value))
}

function countExample(example: Array<number | string>) {
  return eval(example.join(''))
}

function checkResult() {
  const res = countExample(userExample.value as Array<number | string>)

  if (res === resultExample.value) {
    console.log(res)
    console.log(resultExample.value)
    isRight.value = true
  } else {
    isRight.value = false
  }

  modal.value = true
}
</script>

<template>
  <div class="game-main-box">
    <HeaderGame />
    <div class="example-box">
      <div v-for="(component, idx) of userExample">
        <span v-if="idx === 0">
          {{ component }}
        </span>

        <span
          v-else-if="typeof component === 'string' && component !== ''"
          class="example-sign-text"
        >
          {{ component }}
        </span>

        <input v-else type="number" v-model.number="userExample[idx]" class="example-input" />
      </div>
    </div>
    <span class="example-result-text">= {{ resultExample }}</span>

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
        <div class="keyboard-button keyboard-button-action">&lt;</div>
        <div class="keyboard-button keyboard-button-action">&gt;</div>
        <div class="keyboard-button keyboard-button-action">?</div>
        <div class="keyboard-button keyboard-button-action" @click="checkResult">=</div>
        <ModalCheckResult
          v-model:show="modal"
          :example="example"
          :result="resultExample!"
          :is-right="isRight"
        />
      </div>
    </div>
    />
  </div>
</template>

<style scoped>
.game-main-box {
  display: flex;
  gap: 40px;
  flex-direction: column;
  padding: 24px;
}

.example-box {
  display: flex;
  gap: 12px;
  align-self: center;
  align-items: center;
  font-size: 28px;
}

.example-result-text {
  align-self: center;
  font-size: 28px;
  color: grey;
}

.example-sign-text {
  color: grey;
}

.example-input {
  border-bottom: solid 2px grey;
  width: 60px;
  height: 30px;
  font-size: 28px;
  color: gray;
}

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
