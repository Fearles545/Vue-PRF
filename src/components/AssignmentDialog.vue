<template>
  <dialog ref="assignmentDialog">
    <form class="assignment-form" @submit.prevent="handleSubmit">
      <h3 class="form-title">{{ isEditMode ? 'Edit Assignment' : 'Add New Assignment' }}</h3>

      <div class="form-inputs-container">
        <div class="form-group">
          <label for="title">Title</label>

          <input v-model="title" type="text" id="title" placeholder="Title" />
        </div>

        <div class="form-group">
          <label for="description">Description</label>

          <input v-model="description" type="text" id="description" placeholder="Description" />
        </div>

        <div class="form-group">
          <label for="user">User</label>

          <select v-model="user" id="user">
            <option v-for="user in users" :key="user.id" :value="user">{{ user.name }}</option>
          </select>
        </div>
      </div>

      <div class="buttons-container">
        <button class="btn" type="submit">{{ isEditMode ? 'Save' : 'Add' }}</button>

        <button class="btn btn-cancel" @click="handleCancel">Cancel</button>
      </div>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import { useStore } from '@/composables/useStore'

const { getUsers } = useStore()

const props = defineProps({
  assignment: {
    type: Object as () => Assignment | null,
    default: null
  },
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['submit', 'cancel'])

const title = ref(props.assignment?.title || '')
const description = ref(props.assignment?.description || '')
const user = ref(props.assignment?.user || null)
const assignmentDialog = ref<HTMLDialogElement | null>(null)

const isEditMode = ref(!!props.assignment)
const users = getUsers.value

watch(
  () => props.assignment,
  (newAssignment) => {
    title.value = newAssignment?.title || ''
    description.value = newAssignment?.description || ''
    user.value = newAssignment?.user || null
    isEditMode.value = !!newAssignment
  }
)

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      assignmentDialog.value?.showModal()
    } else {
      assignmentDialog.value?.close()
    }
  }
)

const handleSubmit = () => {
  if (title.value === '' || description.value === '' || user.value === null) return
  emit('submit', {
    id: props.assignment?.id,
    title: title.value,
    description: description.value,
    user: user.value
  })
  handleCancel()
}

const handleCancel = () => {
  title.value = ''
  description.value = ''
  user.value = null
  assignmentDialog.value?.close()
  emit('cancel')
}
</script>

<style scoped>
.assignment-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #34495e;
  padding: 2rem;
  border-radius: 5px;
  border: 1px solid #00bd7e;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00bd7e;
  margin-bottom: 1rem;
}

.form-inputs-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  font-weight: 500;
  color: #ecf0f1;
  margin-bottom: 0.5rem;
}

input,
select {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #00bd7e;
  background-color: #2c3e50;
  color: #ecf0f1;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.btn {
  background-color: #00bd7e;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #c0392b;
}
</style>
