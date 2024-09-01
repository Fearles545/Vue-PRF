<script setup lang="ts">
import { useStore } from '@/composables/useStore'
import { ref } from 'vue'

const {
  state,
  addUser,
  removeUser,
  addAssignment,
  removeAssignment,
  getUsers,
  getAssignments,
  getAssignmentsByUser
} = useStore()

const userName = ref('')
const email = ref('')
const dialog = ref<HTMLElement | null>(null)

const cancelAddUser = () => {
  userName.value = ''
  email.value = ''
  dialog.value?.hidePopover()
}
</script>

<template>
  <section>
    <h2>Users</h2>

    <p>Here you can find all your users.</p>

    <button class="btn" popovertarget="addUser">Add User</button>

    <dialog popover id="addUser" ref="dialog">
      <form class="add-user-form" @submit.prevent>
        <h3 class="form-title">Add new user</h3>

        <input v-model="userName" type="text" placeholder="Name" />

        <input v-model="email" type="text" placeholder="Email" />

        <div class="buttons-container">
          <button @click="cancelAddUser()">Cancel</button>

          <button @click="addUser({ id: 1, name: userName, email })">Add</button>
        </div>
      </form>
    </dialog>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
#addUser {
  background-color: #34495e;
  width: fit-content;
  height: fit-content;
  margin: auto;
}

#addUser::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  filter: blur(1px);
}

.add-user-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.form-title {
  text-align: center;
  font-size: 1.5rem;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  width: 100%;
}

.btn {
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
