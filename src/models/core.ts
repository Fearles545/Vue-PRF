export interface User {
  id: number
  name: string
  email: string
}

export interface Assignment {
  id: number
  name: string
  title: string
  description: string
  user: User
}
