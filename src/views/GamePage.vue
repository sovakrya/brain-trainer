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
  resultExample = eval(example.join(''))

  localStorage.setItem('example', JSON.stringify(example))
  console.log(example, resultExample, userExample)
}
</script>

<template>
  <div class="game-main-box">
    <HeaderGame />
    <div>
      <div v-for="(component, idx) of userExample">
        <span v-if="idx === 0">
          {{ component }}
        </span>

        <span v-else-if="typeof component === 'string'">
          {{ component }}
        </span>

        <input type="number" v-else v-model="userExample" />
      </div>
      <span>= {{ resultExample }}</span>
    </div>
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
</style>
