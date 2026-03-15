import API from "./api"
import { Task } from "../types"

export const getTasks = async (projectId:number):Promise<Task[]> => {
  const res = await API.get(`/tasks/project/${projectId}`)
  return res.data
}

export const createTask = async (task: Partial<Task>) => {
  const res = await API.post("/tasks", task)
  return res.data
}

export const updateTaskStatus = async (id:number,status:string) => {
  const res = await API.patch(`/tasks/${id}/status`,{status})
  return res.data
}

export const deleteTask = async (id:number) => {
  await API.delete(`/tasks/${id}`)
}