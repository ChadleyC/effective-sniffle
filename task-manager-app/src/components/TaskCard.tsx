import { Task } from "../types"

interface Props{
task:Task
onStatusChange:(id:number,status:string)=>void
}

const TaskCard = ({task,onStatusChange}:Props) => {

return(

<div className="task-card">

<h4>{task.title}</h4>

<p>{task.description}</p>

<select
value={task.status}
onChange={(e)=>onStatusChange(task.id,e.target.value)}
>

<option value="Todo">Todo</option>
<option value="InProgress">In Progress</option>
<option value="Done">Done</option>

</select>

</div>

)
}

export default TaskCard