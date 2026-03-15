import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { getTasks } from "../services/taskService"
import { Task } from "../types"

const ProjectDetails = () => {


const {id}=useParams()

const [tasks,setTasks]=useState<Task[]>([])
const [filter,setFilter]=useState("All")

useEffect(()=>{
loadTasks()
},[])

const loadTasks=async()=>{
const data=await getTasks(Number(id))
setTasks(data)
}
const [search,setSearch] = useState("")

const filteredTasks = tasks.filter(task =>
task.title.toLowerCase().includes(search.toLowerCase())
)

const filteredTasks=tasks.filter(t=>{
if(filter==="All") return true
return t.status===filter
})



return(

<div>

<h2>Project Tasks</h2>

<select onChange={(e)=>setFilter(e.target.value)}>
<option>All</option>
<option>Todo</option>
<option>InProgress</option>
<option>Done</option>
</select>

{filteredTasks.map(t=>(
<div key={t.id}>

<h4>{t.title}</h4>

<p>Status: {t.status}</p>

<p>Priority: {t.priority}</p>

<p>Due: {t.dueDate}</p>

</div>
))}

</div>

)
}

export default ProjectDetails