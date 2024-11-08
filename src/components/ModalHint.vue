<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const modalHint = ref()

const props = defineProps<{
  example: Array<number | string>
  result: number
}>()

onMounted(() => {
  if (!modalHint.value) {
    return
  }
})

function closeOnBackDropClick({ currentTarget, target }: MouseEvent) {
  const dialog = currentTarget as HTMLDialogElement
  const isClickedOnBackDrop = target === dialog

  if (isClickedOnBackDrop) {
    dialog.close()

    show.value = false
  }
}

const show = defineModel<boolean>('show', { default: false })
watch(show, (show) => {
  if (show) {
    openDialog()
  } else {
    closeDialog()
  }
})
function openDialog() {
  if (!modalHint.value) {
    return
  }
  modalHint.value.showModal()
  show.value = true
}
function closeDialog() {
  if (!modalHint.value) {
    return
  }
  modalHint.value.close()
  show.value = false
}
</script>

<template>
  <dialog ref="modalHint" class="modal-hint-wrapper" @click="closeOnBackDropClick">
    <div class="modal-hint-box">
      <h2>Подсказка:</h2>
      <div class="modal-hint-content-box">
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <div v-for="component of props.example">
          <span>{{ component }}</span>
        </div>
        <span>=</span>
        <span>{{ props.result }}</span>
      </div>

      <button @click="closeDialog" class="modal-hint-btn">Ок</button>
    </div>
  </dialog>
</template>

<style scoped>
.modal-hint-wrapper {
  margin: auto;
  padding: 0;
  border: none;
  border-radius: 8px;
}
.modal-hint-wrapper::backdrop {
  background-color: rgba(0, 0, 0, 0.438);
}
.modal-hint-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 400px;
  padding: 24px;
  align-items: center;
}

.modal-hint-content-box {
  display: flex;
  gap: 12px;
  font-size: 20px;
}

.modal-hint-btn {
  width: 60px;
  height: 30px;
  font-size: 16px;
  background-color: rgb(207, 206, 206);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.modal-hint-btn:hover {
  background-color: rgba(207, 206, 206, 0.616);
}
</style>
