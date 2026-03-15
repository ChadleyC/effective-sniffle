import API from "./api"
import { Comment } from "../types"

export const getComments = async(taskId:number):Promise<Comment[]> =>{
  const res = await API.get(`/comments/task/${taskId}`)
  return res.data
}

export const addComment = async(taskId:number,content:string)=>{
  const res = await API.post("/comments",{taskId,content})
  return res.data
}