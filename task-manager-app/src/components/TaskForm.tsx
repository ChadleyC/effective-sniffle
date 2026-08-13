import { useState, type FormEvent } from "react"
import { createTask } from "../services/taskService"

const TaskForm = ({projectId}:{projectId:number}) => {

const [title,setTitle]=useState("")
const [dueDate,setDueDate]=useState("")

const handleSubmit=async(e: FormEvent)=>{
e.preventDefault()

if(!title) return alert("Title required")

await createTask({
title,
dueDate,
projectId
})

}

return(

<form onSubmit={handleSubmit}>

<input
placeholder="Task title"
onChange={(e)=>setTitle(e.target.value)}
/>

<input
type="date"
onChange={(e)=>setDueDate(e.target.value)}
/>

<button>Create Task</button>

</form>

)
}

export default TaskForm