<script setup lang="ts">
import HeaderGame from '@/components/HeaderGame.vue'
import ModalCancelGame from '@/components/ModalCancelGame.vue'
import ModalCheckResult from '@/components/ModalCheckResult.vue'
import ModalHint from '@/components/ModalHint.vue'
import { ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'

const signs = JSON.parse(localStorage.getItem('signs')!)
const complexity = JSON.parse(localStorage.getItem('complexity')!)

const router = useRouter()

const example = ref<Array<number | string>>([])
const resultExample = ref<number>()
const userExample = ref<Array<number | string | undefined | null>>([])
const quantityResolvedTasks = ref(0)
const date = ref()
const quantityTrainingDays = ref(0)

const isRight = ref(false)
const modal = ref(false)
const hint = ref(false)
const cancelGame = ref(false)
const errorInput = ref(false)

const exampleElements = useTemplateRef('example-elements')

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
  console.log(userExample.value)
  if (userExample.value.includes(undefined) || userExample.value.includes(null)) {
    errorInput.value = true
    console.log(errorInput.value)
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

function resetOnTimerIsUp() {
  cancelGame.value = true

  localStorage.removeItem('duration')
  localStorage.removeItem('complexity')
  localStorage.removeItem('example')
  localStorage.removeItem('result')
  localStorage.removeItem('signs')
  localStorage.removeItem('timer')
  localStorage.removeItem('userExample')
}

function closeModalCancelGame() {
  cancelGame.value = false

  router.push({ name: 'settings' })
}

function writeToInput(num: number) {
  const selectedElIdx = Array.from(exampleElements.value!).findIndex(
    (val) => val.children[0] === document.activeElement,
  )
  if (userExample.value[selectedElIdx]) {
    userExample.value[selectedElIdx] = Number(
      String(userExample.value[selectedElIdx]) + String(num),
    )
  } else {
    userExample.value[selectedElIdx] = num
  }
}

function focusForward() {
  const selectedElIdx = Array.from(exampleElements.value!).findIndex(
    (val) => val.children[0] === document.activeElement,
  )

  const arrEl = Array.from(exampleElements.value!) as HTMLDivElement[]
  if (selectedElIdx === arrEl.length - 1 || selectedElIdx === -1) {
    ;(arrEl[2].children[0] as HTMLInputElement).focus()
  } else {
    ;(arrEl[selectedElIdx + 2].children[0] as HTMLInputElement).focus()
  }
}

function focusBack() {
  const selectedElIdx = Array.from(exampleElements.value!).findIndex(
    (val) => val.children[0] === document.activeElement,
  )

  const arrEl = Array.from(exampleElements.value!) as HTMLDivElement[]

  if (selectedElIdx === -1 || selectedElIdx === 2) {
    ;(arrEl[arrEl.length - 1].children[0] as HTMLInputElement).focus()
  } else {
    ;(arrEl[selectedElIdx - 2].children[0] as HTMLInputElement).focus()
  }
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
      <div v-for="(component, idx) of userExample" ref="example-elements">
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
          v-else-if="idx === 2"
          type="number"
          v-model.number="userExample[idx]"
          class="example-input"
          :class="{
            'example-input-error':
              errorInput && (userExample[idx] === undefined || userExample[idx] === null),
          }"
          @input="errorInput = false"
          autofocus
        />

        <input
          v-else
          type="number"
          v-model.number="userExample[idx]"
          class="example-input"
          :class="{
            'example-input-error':
              errorInput && (userExample[idx] === undefined || userExample[idx] === null),
          }"
          @input="errorInput = false"
        />
      </div>
    </div>
    <span class="example-result-text">= {{ resultExample }}</span>

    <div class="keyboard-main-box">
      <div class="keyboard-numbers-wrapper">
        <div class="keyboard-numbers-box">
          <button
            class="keyboard-button keyboard-button-numbers"
            @mousedown="(e) => e.preventDefault()"
            @click="writeToInput(1)"
          >
            1
          </button>
          <button
            class="keyboard-button keyboard-button-numbers"
            @mousedown="(e) => e.preventDefault()"
            @click="writeToInput(2)"
          >
            2
          </button>
          <button
            class="keyboard-button keyboard-button-numbers"
            @mousedown="(e) => e.preventDefault()"
            @click="writeToInput(3)"
          >
            3
          </button>
        </div>
        <div class="keyboard-numbers-box">
          <button
            class="keyboard-button keyboard-button-numbers"
            @mousedown="(e) => e.preventDefault()"
            @click="writeToInput(4)"
          >
            4
          </button>
          <button
            class="keyboard-button keyboard-button-numbers"
            @mousedown="(e) => e.preventDefault()"
            @click="writeToInput(5)"
          >
            5
          </button>
          <button
            class="keyboard-button keyboard-button-numbers"
            @mousedown="(e) => e.preventDefault()"
            @click="writeToInput(6)"
          >
            6
          </button>
        </div>
        <div class="keyboard-numbers-box">
          <button
            class="keyboard-button keyboard-button-numbers"
            @mousedown="(e) => e.preventDefault()"
            @click="writeToInput(7)"
          >
            7
          </button>
          <button
            class="keyboard-button keyboard-button-numbers"
            @mousedown="(e) => e.preventDefault()"
            @click="writeToInput(8)"
          >
            8
          </button>
          <button
            class="keyboard-button keyboard-button-numbers"
            @mousedown="(e) => e.preventDefault()"
            @click="writeToInput(9)"
          >
            9
          </button>
        </div>
        <button
          class="keyboard-button keyboard-button-numbers"
          style="align-self: center"
          @mousedown="(e) => e.preventDefault()"
          @click="writeToInput(0)"
        >
          0
        </button>
      </div>
      <div class="keyboard-actions-box">
        <button
          class="keyboard-button keyboard-button-action"
          @mousedown="(e) => e.preventDefault()"
          @click="focusBack"
        >
          &lt;
        </button>
        <button
          class="keyboard-button keyboard-button-action"
          @click="focusForward"
          @mousedown="(e) => e.preventDefault()"
        >
          &gt;
        </button>
        <button class="keyboard-button keyboard-button-action" @click="hint = true">?</button>
        <button class="keyboard-button keyboard-button-action" @click="checkResult">=</button>
        <ModalCheckResult
          v-model:show="modal"
          :example="example"
          :result="resultExample!"
          :is-right="isRight"
          @close-modal="closeModal"
        />

        <ModalHint v-model:show="hint" :example :result="resultExample!" />
        <ModalCancelGame v-model:show="cancelGame" @close-modal="closeModalCancelGame" />
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
