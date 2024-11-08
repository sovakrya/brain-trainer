<script setup lang="ts">
import HeaderGame from '@/components/HeaderGame.vue'
import OnscreenKeyboard from '@/components/OnscreenKeyboard.vue'
import { onMounted, ref } from 'vue'

const signs = JSON.parse(localStorage.getItem('signs')!)
const complexity = JSON.parse(localStorage.getItem('complexity')!)

const example: Array<number | string> = []
let resultExample: number
const userExample = ref<Array<number | string | undefined>>([])

onMounted(() => {
  createExample()
})

function createExample() {
  for (let i = 0; i < Number(complexity) * 2 - 1; i++) {
    if (i === 0) {
      const num = Math.round(Math.random() * 50)
      example.push(num)
      userExample.value.push(num)
      continue
    }

    if (i % 2 === 0) {
      const num = Math.round(Math.random() * 50)
      example.push(num)
      userExample.value.push(undefined)
      continue
    } else {
      const signIdx = Math.round(Math.random() * (signs!.length - 1))
      example.push(signs![signIdx])
      userExample.value.push(signs[signIdx])
      continue
    }
  }
  resultExample = countExample(example)

  localStorage.setItem('example', JSON.stringify(example))
  console.log(example, resultExample, userExample)
}

function countExample(example: Array<number | string>) {
  return eval(example.join(''))
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
    <OnscreenKeyboard />
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
</style>
