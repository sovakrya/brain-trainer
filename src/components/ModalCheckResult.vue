<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const modalCheckResult = ref()

onMounted(() => {
  if (!modalCheckResult.value) {
    return
  }
  modalCheckResult.value?.addEventListener('click', closeOnBackDropClick)
})

const emits = defineEmits<{
  closeModal: []
}>()

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

const isRight = ref(false)
const example: Array<string | number> = JSON.parse(localStorage.getItem('example')!)
const result: number = JSON.parse(localStorage.getItem('result')!)
</script>

<template>
  <dialog ref="modalCheckResult">
    <div>
      <div>
        <h1 v-if="isRight">Правильно!</h1>
        <h1 v-else>Неправильно!</h1>
        <span>Можно было решить так: {{ example }} = {{ result }}</span>
      </div>

      <button @click="emits('closeModal')">Ok</button>
    </div>
  </dialog>
</template>
