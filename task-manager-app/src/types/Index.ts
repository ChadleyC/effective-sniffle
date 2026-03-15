export interface Project {
  id: number
  name: string
  description: string
  createdAt: string
}

export interface Task {
  id: number
  title: string
  description: string
  status: "Todo" | "InProgress" | "Done"
  priority: "Low" | "Medium" | "High"
  dueDate: string
  projectId: number
  assignedUser?: string
}

export interface Comment {
  id: number
  taskId: number
  content: string
  createdAt: string
  author: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
}