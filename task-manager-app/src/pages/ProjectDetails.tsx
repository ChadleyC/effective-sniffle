import { useEffect,useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react"
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

const deleteTaskHandler = useCallback((id:number)=>{
deleteTask(id)
},[])

const loadTasks=async()=>{
const data=await getTasks(Number(id))
setTasks(data)
}
const [search,setSearch] = useState("")

const filteredTasks = useMemo(()=>{

return tasks.filter(t =>
t.title.toLowerCase().includes(search.toLowerCase())
)

},[tasks,search])

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

{filteredTasks.map((t: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; status: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; priority: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; dueDate: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined })=>(
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