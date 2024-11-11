<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const modalCheckResult = ref()

onMounted(() => {
  if (!modalCheckResult.value) {
    return
  }
})

const emits = defineEmits<{
  closeModal: []
}>()

const props = defineProps<{
  example: Array<number | string>
  result: number
  isRight: boolean
}>()

const show = defineModel<boolean>('show', { default: false })
watch(show, (show) => {
  if (show) {
    openDialog()
  } else {
    closeDialog()
  }
})
function openDialog() {
  if (!modalCheckResult.value) {
    return
  }
  modalCheckResult.value.showModal()
  show.value = true
}
function closeDialog() {
  if (!modalCheckResult.value) {
    return
  }
  modalCheckResult.value.close()
  show.value = false
}
</script>

<template>
  <dialog ref="modalCheckResult" class="modal-wrapper">
    <div class="modal-box">
      <div class="modal-content-box">
        <h1 v-if="props.isRight">Правильно!</h1>
        <h1 v-else>Неправильно!</h1>
        <span style="text-align: center">Можно было решить так:</span>
        <div class="modal-example-box">
          <!-- eslint-disable-next-line vue/require-v-for-key -->
          <div v-for="component of props.example">
            <span>{{ component }}</span>
          </div>
          <span>=</span>
          <span>{{ props.result }}</span>
        </div>
      </div>

      <button @click="emits('closeModal')" class="modal-btn">Ок</button>
    </div>
  </dialog>
</template>

<style scoped>
.modal-wrapper {
  margin: auto;
  padding: 0;
  border: none;
  border-radius: 8px;
}
.modal-wrapper::backdrop {
  background-color: rgba(0, 0, 0, 0.438);
}
.modal-box {
  display: flex;
  flex-direction: column;
  gap: 26px;
  width: 500px;
  padding: 24px;
  align-items: center;
}

.modal-content-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 16px;
  text-align: center;
}

.modal-example-box {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.modal-btn {
  width: 60px;
  height: 30px;
  font-size: 16px;
  background-color: rgb(207, 206, 206);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.modal-btn:hover {
  background-color: rgba(207, 206, 206, 0.616);
}
</style>
