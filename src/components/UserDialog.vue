<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue'

const props = defineProps({
  user: {
    type: Object as () => User | null,
    default: null
  },
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['submit', 'cancel'])

const name = ref(props.user?.name || '')
const email = ref(props.user?.email || '')
const userDialog = ref<HTMLDialogElement | null>(null)

const isEditMode = ref(!!props.user)

watch(
  () => props.user,
  (newUser) => {
    name.value = newUser?.name || ''
    email.value = newUser?.email || ''
    isEditMode.value = !!newUser
  }
)

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      userDialog.value?.showModal()
    } else {
      userDialog.value?.close()
    }
  }
)

const handleSubmit = () => {
  if (name.value === '' || email.value === '') return
  emit('submit', { id: props.user?.id, name: name.value, email: email.value })
  handleCancel()
}

const handleCancel = () => {
  name.value = ''
  email.value = ''
  userDialog.value?.close()
  emit('cancel')
}
</script>

<template>
  <dialog id="userDialog" popover ref="userDialog">
    <form class="user-form" @submit.prevent="handleSubmit">
      <h3 class="form-title">{{ isEditMode ? 'Edit User' : 'Add New User' }}</h3>

      <input v-model="name" type="text" placeholder="Name" />

      <input v-model="email" type="text" placeholder="Email" />

      <div class="buttons-container">
        <button class="btn" type="submit">{{ isEditMode ? 'Save' : 'Add' }}</button>

        <button class="btn btn-cancel" @click="handleCancel">Cancel</button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
.user-form input {
  color: #00bd7e;
  font-size: 1rem;
  font-weight: 900;
  background-color: #34495e;
  border: 1px solid #00bd7e;
  border-radius: 5px;
  padding: 0.5rem;
}

.user-form input:focus {
  outline: 2px solid #00bd7e;
}

.user-form input::placeholder {
  font-weight: 500;
  color: #00bd7e;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.form-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: #00bd7e;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.buttons-container .btn {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1rem;
  color: #2f5634;
  background-color: #00bd7e;
}

.btn {
  background-color: #266b43;
  color: #00bd7e;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #00bd7e;
}

.buttons-container .btn-cancel,
.btn-cancel {
  background-color: #e74c3c;
}
</style>
