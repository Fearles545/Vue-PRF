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
      name: 'Assignment 1',
      title: 'Math Homework',
      description: 'Complete the algebra problems.',
      user: {
        id: 9,
        name: 'Ian Curtis',
        email: 'ian.curtis@example.com'
      }
    },
    {
      id: 2,
      name: 'Assignment 2',
      title: 'Science Project',
      description: 'Build a model of the solar system.',
      user: {
        id: 6,
        name: 'Fiona Gallagher',
        email: 'fiona.gallagher@example.com'
      }
    },
    {
      id: 3,
      name: 'Assignment 3',
      title: 'History Essay',
      description: 'Write an essay on World War II.',
      user: {
        id: 3,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com'
      }
    },
    {
      id: 4,
      name: 'Assignment 4',
      title: 'Art Assignment',
      description: 'Create a painting of a landscape.',
      user: {
        id: 4,
        name: 'Diana Prince',
        email: 'diana.prince@example.com'
      }
    },
    {
      id: 5,
      name: 'Assignment 5',
      title: 'Literature Review',
      description: 'Read and review "To Kill a Mockingbird".',
      user: {
        id: 6,
        name: 'Fiona Gallagher',
        email: 'fiona.gallagher@example.com'
      }
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

const addAssignment = (data: Partial<Assignment>) => {
  data.id = state.assignments.length + 1
  const assignment = data as Assignment
  state.assignments = [...state.assignments, assignment]
}

const updateAssignment = (updatedAssignment: Assignment) => {
  state.assignments = state.assignments.map((assignment) =>
    assignment.id === updatedAssignment.id ? { ...assignment, ...updatedAssignment } : assignment
  )
}

const removeAssignment = (assignmentId: number) => {
  state.assignments = state.assignments.filter((a) => a.id !== assignmentId)
}

const getUsers = computed(() => state.users)

const getAssignments = computed(() => state.assignments)

export function useStore() {
  return {
    state,
    addUser,
    removeUser,
    updateUser,
    addAssignment,
    updateAssignment,
    removeAssignment,
    getUsers,
    getAssignments
  }
}
