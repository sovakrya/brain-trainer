<script setup lang="ts">
import HeaderSettings from '@/components/HeaderSettings.vue'
import TheSettings from '@/components/TheSettings.vue'
</script>

<template>
  <div class="settings-main-box">
    <HeaderSettings />
    <TheSettings />
  </div>
</template>

<style scoped>
.settings-main-box {
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 60px;
}
</style>
