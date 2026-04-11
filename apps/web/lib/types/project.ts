export interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'completed' | 'upcoming'
  tags: string[]
  dueDate?: string
}

export interface ProjectInput {
  name: string
  description: string
  status?: 'active' | 'completed' | 'upcoming'
  tags?: string[]
  dueDate?: string
}

export type ProjectStatus = 'active' | 'completed' | 'upcoming'
