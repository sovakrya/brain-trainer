<script setup lang="ts">
import HeaderGame from '@/components/HeaderGame.vue'
import OnscreenKeyboard from '@/components/OnscreenKeyboard.vue'
</script>

<template>
  <div class="game-main-box">
    <HeaderGame />
    <div>тут будет пример</div>
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
