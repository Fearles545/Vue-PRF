import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AssignmentsView from '@/views/AssignmentsView.vue'
import type { Assignment } from '@/models/core'
import { ref, computed } from 'vue'

const assignments = ref<Assignment[]>([])
const mockStore = {
  getAssignments: computed(() => assignments.value),
  addAssignment: vi.fn(),
  updateAssignment: vi.fn(),
  removeAssignment: vi.fn()
}

vi.mock('@/composables/useStore', () => ({
  useStore: vi.fn(() => mockStore)
}))

describe('AssignmentsView.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(AssignmentsView, {
      global: {
        stubs: {
          'assignment-dialog': {
            template: '<div><slot /></div>',
            methods: {
              showModal: vi.fn(),
              close: vi.fn()
            }
          }
        }
      }
    })
  })

  it('renders a message when there are no assignments', () => {
    expect(wrapper.text()).toContain('Here you can find all your assignments.')
  })

  it('renders a list of assignments', async () => {
    assignments.value = [
      {
        id: 1,
        name: 'Assignment 1', // Add the name property
        title: 'Assignment 1',
        description: 'Description 1',
        user: { id: 1, name: 'John Doe', email: 'john@example.com' }
      },
      {
        id: 2,
        name: 'Assignment 2', // Add the name property
        title: 'Assignment 2',
        description: 'Description 2',
        user: { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
      }
    ]

    await wrapper.vm.$nextTick()

    const assignmentItems = wrapper.findAll('.assignment-item')
    expect(assignmentItems.length).toBe(assignments.value.length)
    expect(assignmentItems[0].text()).toContain(assignments.value[0].title)
    expect(assignmentItems[1].text()).toContain(assignments.value[1].title)
  })

  it('opens the assignment dialog when "Add Assignment" button is clicked', async () => {
    const addButton = wrapper.find('.btn')
    await addButton.trigger('click')

    expect(wrapper.vm.isAssignmentDialogVisible).toBe(true)
  })

  it('calls addAssignment when a new assignment is submitted', async () => {
    wrapper.vm.showAddAssignmentDialog()
    await wrapper.vm.$nextTick()

    const assignmentData: Assignment = {
      id: 3,
      name: 'New Assignment',
      title: 'New Assignment',
      description: 'New Description',
      user: { id: 3, name: 'New User', email: 'new@example.com' }
    }
    wrapper.vm.handleAssignmentDialogSubmit(assignmentData)

    expect(mockStore.addAssignment).toHaveBeenCalledWith(assignmentData)
    expect(wrapper.vm.isAssignmentDialogVisible).toBe(false)
  })

  it('calls updateAssignment when an existing assignment is submitted', async () => {
    const assignment: Assignment = {
      id: 1,
      name: 'Assignment 1',
      title: 'Assignment 1',
      description: 'Description 1',
      user: { id: 1, name: 'John Doe', email: 'john@example.com' }
    }
    wrapper.vm.editAssignment(assignment)
    await wrapper.vm.$nextTick()

    const updatedAssignment: Assignment = { ...assignment, title: 'Updated Assignment 1' }
    wrapper.vm.handleAssignmentDialogSubmit(updatedAssignment)

    expect(mockStore.updateAssignment).toHaveBeenCalledWith(updatedAssignment)
    expect(wrapper.vm.isAssignmentDialogVisible).toBe(false)
  })

  it('calls removeAssignment when "Remove" button is clicked', async () => {
    assignments.value = [
      {
        id: 1,
        name: 'Assignment 1',
        title: 'Assignment 1',
        description: 'Description 1',
        user: { id: 1, name: 'John Doe', email: 'john@example.com' }
      }
    ]

    await wrapper.vm.$nextTick()

    const removeButton = wrapper.find('.assignment-item-actions .btn-cancel')
    await removeButton.trigger('click')

    expect(mockStore.removeAssignment).toHaveBeenCalledWith(assignments.value[0].id)
  })
})
