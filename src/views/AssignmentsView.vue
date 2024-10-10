<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/composables/useStore'
import AssignmentDialog from '@/components/AssignmentDialog.vue'
import type { Assignment } from '../models/core'

const { getAssignments, addAssignment, updateAssignment, removeAssignment } = useStore()

const selectedAssignment = ref<Assignment | null>(null)
const isAssignmentDialogVisible = ref(false)

const showAddAssignmentDialog = () => {
  selectedAssignment.value = null
  isAssignmentDialogVisible.value = true
}

const editAssignment = (assignment: Assignment) => {
  selectedAssignment.value = assignment
  isAssignmentDialogVisible.value = true
}

const handleAssignmentDialogSubmit = (assignmentData: Assignment) => {
  if (selectedAssignment.value) {
    updateAssignment(assignmentData)
  } else {
    addAssignment(assignmentData)
  }
  isAssignmentDialogVisible.value = false
}

const handleAssignmentDialogCancel = () => {
  isAssignmentDialogVisible.value = false
}
</script>

<template>
  <section>
    <h2 class="section-title">
      Assignments <button class="btn" @click="showAddAssignmentDialog">Add Assignment</button>
    </h2>

    <p>Here you can find all your assignments.</p>

    <div class="assignment-list-container">
      <ul class="assignment-list">
        <li v-for="assignment in getAssignments" :key="assignment.id" class="assignment-item">
          <h3>{{ assignment.title }}</h3>

          <p>{{ assignment.description }}</p>

          <p>Assigned to: {{ assignment.user.name }}</p>

          <div class="assignment-item-actions">
            <button @click="editAssignment(assignment)" class="btn">Edit</button>

            <button class="btn btn-cancel" @click="removeAssignment(assignment.id)">Remove</button>
          </div>
        </li>
      </ul>
    </div>

    <AssignmentDialog
      class="assignment-dialog"
      :assignment="selectedAssignment"
      :visible="isAssignmentDialogVisible"
      @submit="handleAssignmentDialogSubmit"
      @cancel="handleAssignmentDialogCancel"
    />
  </section>
</template>

<style scoped>
.assignment-dialog {
  background-color: #2f5634;
  width: fit-content;
  height: fit-content;
  border-radius: 1rem;
  border-color: #00bd7e;
  margin: auto;
  padding: 0;
  width: 30rem;
}

.assignment-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  filter: blur(1px);
}

.assignment-list {
  list-style: none;
  padding: 0;
}

.assignment-item {
  border: 1px solid #00bd7e;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #2c3e50;
  color: #ecf0f1;
}

.assignment-item-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.assignment-item-actions button {
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

.assignment-item-actions button.btn-cancel {
  background-color: #c0392b;
  color: #fff;
}

.assignment-list-container {
  border: 1px solid #00bd7e;
  border-radius: 5px;
  margin-top: 2rem;
  padding: 0.5rem;
  height: 70vh;
  overflow: auto;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  background-color: #00bd7e;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #00bd7e;
}

.btn-cancel {
  background-color: #c0392b;
}

.btn-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #00bd7e;
}

p {
  font-size: 1rem;
  font-weight: 500;
  color: #00bd7e;
}

section {
  background-color: #34495e;
  padding: 1rem;
}

ul {
  padding: 0;
}
</style>
