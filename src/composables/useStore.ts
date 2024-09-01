import { computed, reactive } from 'vue'
import type { User, Assignment } from '../models/core'

const state = reactive({
  users: [] as User[],
  assignments: [] as Assignment[]
})

const addUser = (data: Partial<User>) => {
  data.id = state.users.length + 1
  const user = data as User

  state.users = [...state.users, user]
}

const removeUser = (userId: number) => {
  state.users = state.users.filter((u) => u.id !== userId)
}

const addAssignment = (assignment: Assignment) => {
  state.assignments = [...state.assignments, assignment]
}

const removeAssignment = (assignmentId: number) => {
  state.assignments = state.assignments.filter((a) => a.id !== assignmentId)
}

const getUsers = computed(() => state.users)
const getAssignments = computed(() => state.assignments)
const getAssignmentsByUser = (userId: number) =>
  computed(() => state.assignments.filter((assignment) => assignment.userId === userId))

export function useStore() {
  return {
    state,
    addUser,
    removeUser,
    addAssignment,
    removeAssignment,
    getUsers,
    getAssignments,
    getAssignmentsByUser
  }
}
