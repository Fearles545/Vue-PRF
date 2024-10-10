import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import UsersView from '@/views/UsersView.vue'
import type { User } from '@/models/core'
import { ref, computed } from 'vue'

const users = ref<User[]>([])
const mockStore = {
  getUsers: computed(() => users.value),
  addUser: vi.fn(),
  updateUser: vi.fn(),
  removeUser: vi.fn()
}

vi.mock('@/composables/useStore', () => ({
  useStore: vi.fn(() => mockStore)
}))

describe('UsersView.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(UsersView, {
      global: {
        stubs: {
          'user-dialog': {
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

  it('renders a message when there are no users', () => {
    expect(wrapper.text()).toContain("There's no users yet.")
  })

  it('renders a list of users', async () => {
    users.value = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
    ]

    await wrapper.vm.$nextTick()

    const userItems = wrapper.findAll('.user-item')
    expect(userItems.length).toBe(users.value.length)
    expect(userItems[0].text()).toContain(users.value[0].name)
    expect(userItems[1].text()).toContain(users.value[1].name)
  })

  it('opens the user dialog when "Add User" button is clicked', async () => {
    const addButton = wrapper.find('.btn-container .btn')
    await addButton.trigger('click')

    expect(wrapper.vm.isUserDialogVisible).toBe(true)
  })

  it('calls addUser when a new user is submitted', async () => {
    wrapper.vm.showAddUserDialog()
    await wrapper.vm.$nextTick()

    const userData: User = { id: 3, name: 'New User', email: 'new@example.com' }
    wrapper.vm.handleUserDialogSubmit(userData)

    expect(mockStore.addUser).toHaveBeenCalledWith(userData)
    expect(wrapper.vm.isUserDialogVisible).toBe(false)
  })

  it('calls updateUser when an existing user is submitted', async () => {
    const user: User = { id: 1, name: 'John Doe', email: 'john@example.com' }
    wrapper.vm.editUser(user)
    await wrapper.vm.$nextTick()

    const updatedUser: User = { ...user, name: 'Updated John Doe' }
    wrapper.vm.handleUserDialogSubmit(updatedUser)

    expect(mockStore.updateUser).toHaveBeenCalledWith(updatedUser)
    expect(wrapper.vm.isUserDialogVisible).toBe(false)
  })

  it('calls removeUser when "Remove" button is clicked', async () => {
    users.value = [{ id: 1, name: 'John Doe', email: 'john@example.com' }]

    await wrapper.vm.$nextTick()

    const removeButton = wrapper.find('.user-item-actions .btn-cancel')
    await removeButton.trigger('click')

    expect(mockStore.removeUser).toHaveBeenCalledWith(users.value[0].id)
  })
})
