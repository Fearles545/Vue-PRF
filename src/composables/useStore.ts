import { computed, reactive } from 'vue'
import type { User, Assignment } from '../models/core'

const state = reactive({
  users: [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com'
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com'
    },
    {
      id: 4,
      name: 'Diana Prince',
      email: 'diana.prince@example.com'
    },
    {
      id: 5,
      name: 'Ethan Hunt',
      email: 'ethan.hunt@example.com'
    },
    {
      id: 6,
      name: 'Fiona Gallagher',
      email: 'fiona.gallagher@example.com'
    },
    {
      id: 7,
      name: 'George Martin',
      email: 'george.martin@example.com'
    },
    {
      id: 8,
      name: 'Hannah Baker',
      email: 'hannah.baker@example.com'
    },
    {
      id: 9,
      name: 'Ian Curtis',
      email: 'ian.curtis@example.com'
    },
    {
      id: 10,
      name: 'Jane Doe',
      email: 'jane.doe@example.com'
    }
  ] as User[],
  assignments: [
    {
      id: 1,
      userId: 1,
      title: 'Assignment 1',
      description: 'This is the first assignment'
    },
    {
      id: 2,
      userId: 1,
      title: 'Assignment 2',
      description: 'This is the second assignment'
    },
    {
      id: 3,
      userId: 2,
      title: 'Assignment 3',
      description: 'This is the third assignment'
    },
    {
      id: 4,
      userId: 3,
      title: 'Assignment 4',
      description: 'This is the fourth assignment'
    },
    {
      id: 5,
      userId: 4,
      title: 'Assignment 5',
      description: 'This is the fifth assignment'
    },
    {
      id: 6,
      userId: 5,
      title: 'Assignment 6',
      description: 'This is the sixth assignment'
    }
  ] as Assignment[]
})

const addUser = (data: Partial<User>) => {
  data.id = state.users.length + 1
  const user = data as User

  state.users = [...state.users, user]
}

const removeUser = (userId: number) => {
  state.users = state.users.filter((u) => u.id !== userId)
}

const updateUser = (updatedUser: User) => {
  state.users = state.users.map((user) =>
    user.id === updatedUser.id ? { ...user, ...updatedUser } : user
  )
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
    updateUser,
    addAssignment,
    removeAssignment,
    getUsers,
    getAssignments,
    getAssignmentsByUser
  }
}
