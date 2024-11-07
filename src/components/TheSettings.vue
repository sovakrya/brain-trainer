<script setup lang="ts">
import { ref, watch } from 'vue'

const durationGame = ref(1)
const complexityGame = ref(1)

const operations = ref({
  addition: false,
  subtraction: false,
  multiplication: false,
  division: false,
  exponentiation: false,
})

const signs = ref<Array<'+' | '-' | '*' | '/' | '^'>>([])

watch(
  operations.value,
  (newOp) => {
    if (newOp.addition) {
      signs.value.push('+')
      console.log(signs.value)
      return
    } else {
      const idx = signs.value.findIndex((operation) => operation === '+')
      signs.value.splice(idx, 1)
      console.log(signs.value)
    }

    if (newOp.division) {
      signs.value.push('/')
      console.log(signs.value)
      return
    } else {
      const idx = signs.value.findIndex((operation) => operation === '/')
      signs.value.splice(idx, 1)
      console.log(signs.value)
    }

    if (newOp.subtraction) {
      signs.value.push('-')
      console.log(signs.value)
      return
    } else {
      const idx = signs.value.findIndex((operation) => operation === '-')
      signs.value.splice(idx, 1)
      console.log(signs.value)
    }
    if (newOp.multiplication) {
      signs.value.push('*')
      console.log(signs.value)
      return
    } else {
      const idx = signs.value.findIndex((operation) => operation === '*')
      signs.value.splice(idx, 1)
      console.log(signs.value)
    }
    if (newOp.exponentiation) {
      signs.value.push('^')
      console.log(signs.value)
      return
    } else {
      const idx = signs.value.findIndex((operation) => operation === '^')
      signs.value.splice(idx, 1)
      console.log(signs.value)
    }
  },
  { deep: true },
)
</script>

<template>
  <div class="settings-box">
    <div class="duration-box">
      <h2>Настройки</h2>
      <div>
        <div class="duraion-input-title-box">
          <span>1</span>
          <span>15</span>
        </div>
        <input type="range" min="1" max="15" v-model="durationGame" class="duraion-input" />
        <div class="duraion-text">
          <span style="width: 122px">Длительность {{ durationGame }} </span>
          <span v-if="durationGame < 2">минута</span>
          <span v-else-if="durationGame < 5 && durationGame > 1">минуты</span>
          <span v-else-if="durationGame >= 5">минут</span>
        </div>
      </div>

      <div class="inputs-box">
        <div class="duraion-input-title-box">
          <span>1</span>
          <span>15</span>
        </div>
        <input type="range" min="1" max="15" v-model="complexityGame" class="duraion-input" />
        <span>Сложность {{ complexityGame }}</span>
      </div>
    </div>

    <div class="settings-signs-wrapper">
      <div class="settings-signs-box">
        <input type="checkbox" class="sign-checkbox" v-model="operations.addition" />
        <span>Суммирование</span>
      </div>
      <div class="settings-signs-box">
        <input type="checkbox" class="sign-checkbox" v-model="operations.subtraction" />
        <span>Разность</span>
      </div>
      <div class="settings-signs-box">
        <input type="checkbox" class="sign-checkbox" v-model="operations.multiplication" />
        <span>Умножение</span>
      </div>
      <div class="settings-signs-box">
        <input type="checkbox" class="sign-checkbox" v-model="operations.division" />
        <span>Деление</span>
      </div>
      <div class="settings-signs-box">
        <input type="checkbox" class="sign-checkbox" v-model="operations.exponentiation" />
        <span>Возведение в степень</span>
      </div>
    </div>

    <button class="settings-play-btn" @click="$router.push({ name: 'game' })">Play!</button>
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

.duraion-input-title-box {
  display: flex;
  justify-content: space-between;
  width: 300px;
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
