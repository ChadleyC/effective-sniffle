import { Task } from "../types"

interface Props {
tasks: Task[]
}

const TaskStats = ({tasks}:Props) => {

const total = tasks.length
const completed = tasks.filter(t=>t.status==="Done").length

const overdue = tasks.filter(
t => new Date(t.dueDate) < new Date() && t.status !== "Done"
).length

return(

<div className="stats">

<div>Total Tasks: {total}</div>

<div>Completed: {completed}</div>

<div>Overdue: {overdue}</div>

</div>

)

}

export default TaskStats