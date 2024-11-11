<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const modalCancelGame = ref()

onMounted(() => {
  if (!modalCancelGame.value) {
    return
  }
})

const emits = defineEmits<{
  closeModal: []
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
  if (!modalCancelGame.value) {
    return
  }
  modalCancelGame.value.showModal()
  show.value = true
}
function closeDialog() {
  if (!modalCancelGame.value) {
    return
  }
  modalCancelGame.value.close()
  show.value = false
}
</script>

<template>
  <dialog ref="modalCancelGame" class="modal-cancel-wrapper">
    <div class="modal-cancel-box">
      <h1 style="font-size: 24px">Время истекло. Игра закончена!</h1>
      <button @click="emits('closeModal')" class="modal-cancel-btn">Ок</button>
    </div>
  </dialog>
</template>

<style scoped>
.modal-cancel-wrapper {
  margin: auto;
  padding: 0;
  border: none;
  border-radius: 8px;
}
.modal-cancel-wrapper::backdrop {
  background-color: rgba(0, 0, 0, 0.438);
}
.modal-cancel-box {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  padding: 24px;
  align-items: center;
}

.modal-cancel-btn {
  width: 60px;
  height: 30px;
  font-size: 16px;
  background-color: rgb(207, 206, 206);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.modal-cancel-btn:hover {
  background-color: rgba(207, 206, 206, 0.616);
}
</style>
