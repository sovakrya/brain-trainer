<script setup lang="ts">
import HeaderGame from '@/components/HeaderGame.vue'
import ModalCheckResult from '@/components/ModalCheckResult.vue'
import ModalHint from '@/components/ModalHint.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const signs = JSON.parse(localStorage.getItem('signs')!)
const complexity = JSON.parse(localStorage.getItem('complexity')!)

const router = useRouter()

const example = ref<Array<number | string>>([])
const resultExample = ref<number>()
const userExample = ref<Array<number | string | undefined>>([])
const isRight = ref(false)
const modal = ref(false)
const hint = ref(false)
const errorInput = ref(false)
const quantityResolvedTasks = ref(0)
const date = ref()
const quantityTrainingDays = ref(0)

if (localStorage.getItem('date')) {
  date.value = JSON.parse(JSON.stringify(localStorage.getItem('date')))

  if (Math.floor(new Date().getTime() - date.value) / (24 * 60 * 60 * 1000) >= 24) {
    quantityTrainingDays.value += 1
    localStorage.setItem('quantityTrainingDays', JSON.stringify(quantityTrainingDays.value))
  }
} else {
  date.value = new Date().getTime()
  quantityTrainingDays.value = 1
  localStorage.setItem('quantityTrainingDays', JSON.stringify(quantityTrainingDays.value))
  localStorage.setItem('date', JSON.stringify(date.value))
}

if (localStorage.getItem('example')) {
  console.log(JSON.parse(localStorage.getItem('userExample')!))
  example.value = JSON.parse(localStorage.getItem('example')!)
  userExample.value = JSON.parse(localStorage.getItem('userExample')!)
  resultExample.value = JSON.parse(localStorage.getItem('result')!)
} else {
  createExample()
}

function createExample() {
  if (example.value.length) {
    example.value = []
    userExample.value = []
  }

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
  localStorage.setItem('example', JSON.stringify(example.value))
  localStorage.setItem('userExample', JSON.stringify(userExample.value))
  resultExample.value = countExample(example.value)
  localStorage.setItem('result', JSON.stringify(resultExample.value))
}

function countExample(example: Array<number | string>) {
  return eval(example.join(''))
}

function checkResult() {
  if (userExample.value.includes(undefined)) {
    errorInput.value = true
    return
  }
  const res = countExample(userExample.value as Array<number | string>)

  if (res === resultExample.value) {
    quantityResolvedTasks.value += 1
    localStorage.setItem('quantityResolvedTasks', JSON.stringify(quantityResolvedTasks.value))
    isRight.value = true
  } else {
    isRight.value = false
  }

  modal.value = true
}

function closeModal() {
  createExample()

  modal.value = false
}
</script>

<template>
  <div class="game-main-box">
    <HeaderGame
      @save-on-cancel="router.push({ name: 'settings' })"
      @reset-on-timer-is-up="resetOnTimerIsUp"
    />
    <div class="example-box">
      <!-- eslint-disable-next-line vue/require-v-for-key -->
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

        <input
          v-else
          type="number"
          v-model.number="userExample[idx]"
          class="example-input"
          :class="{ 'example-input-error': errorInput && userExample[idx] === undefined }"
          @input="errorInput = false"
        />
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
        <div class="keyboard-button keyboard-button-action" @click="hint = true">?</div>
        <div class="keyboard-button keyboard-button-action" @click="checkResult">=</div>
        <ModalCheckResult
          v-model:show="modal"
          :example="example"
          :result="resultExample!"
          :is-right="isRight"
          @close-modal="closeModal"
        />

        <ModalHint v-model:show="hint" :example :result="resultExample!" />
      </div>
    </div>
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

.example-input-error {
  border-bottom: solid 2px rgb(165, 43, 43);
  background-color: rgba(247, 189, 189, 0.466);
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
