export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export interface TaskInput {
  title: string
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed'
