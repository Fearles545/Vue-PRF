<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/composables/useStore'
import UserDialog from '@/components/UserDialog.vue'
import type { User } from '../models/core'

const { getUsers, addUser, updateUser, removeUser } = useStore()

const selectedUser = ref<User | null>(null)
const isUserDialogVisible = ref(false)

const showAddUserDialog = () => {
  selectedUser.value = null
  isUserDialogVisible.value = true
}

const editUser = (user: User) => {
  selectedUser.value = user
  isUserDialogVisible.value = true
}

const handleUserDialogSubmit = (userData: User) => {
  if (selectedUser.value) {
    updateUser(userData)
  } else {
    addUser(userData)
  }
  isUserDialogVisible.value = false
}

const handleUserDialogCancel = () => {
  isUserDialogVisible.value = false
}
</script>

<template>
  <section>
    <div v-if="getUsers.length === 0">
      <p>There's no users yet.</p>
    </div>

    <section v-else>
      <h2 class="user-list-title">List of Users</h2>

      <div class="user-list-container">
        <ul class="user-list">
          <li v-for="user in getUsers" :key="user.id" class="user-item">
            <h3>{{ user.name }}</h3>

            <p>{{ user.email }}</p>

            <div class="user-item-actions">
              <button @click="editUser(user)" class="btn">Edit</button>

              <button class="btn btn-cancel" @click="removeUser(user.id)">Remove</button>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <div class="btn-container">
      <button class="btn" @click="showAddUserDialog">Add User</button>
    </div>

    <UserDialog
      class="user-dialog"
      :user="selectedUser"
      :visible="isUserDialogVisible"
      @submit="handleUserDialogSubmit"
      @cancel="handleUserDialogCancel"
    />
  </section>
</template>

<style scoped>
.user-dialog {
  background-color: #2f5634;
  width: fit-content;
  height: fit-content;
  border-radius: 1rem;
  border-color: #00bd7e;
  margin: auto;
  padding: 2rem;
}

.user-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  filter: blur(1px);
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

.btn-cancel {
  background-color: #e74c3c;
}

.user-list-container {
  background-color: #2f5634;
  border: 1px solid #00bd7e;
  border-radius: 5px;
  padding: 0.5rem;
  height: 70vh;
  overflow: auto;
}

.user-list-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #00bd7e;
  margin-bottom: 1rem;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2f5634;
  border: 1px solid #00bd7e;
  border-radius: 5px;
  padding: 1rem;
}

.user-item-actions {
  display: flex;
  gap: 1rem;
}

.btn-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.btn-container .btn {
  font-size: 1.5rem;
  font-weight: 700;
  width: 100%;
  height: 3rem;
}
</style>
