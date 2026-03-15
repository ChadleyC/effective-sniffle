import { useEffect,useState } from "react"
import { getComments,addComment } from "../services/commentService"
import { Comment } from "../types"

const Comments = ({taskId}:{taskId:number}) => {

const [comments,setComments]=useState<Comment[]>([])
const [text,setText]=useState("")

useEffect(()=>{
loadComments()
},[])

const loadComments=async()=>{
const data=await getComments(taskId)
setComments(data)
}

const submit=async()=>{
await addComment(taskId,text)
setText("")
loadComments()
}

return(

<div>

<h4>Comments</h4>

{comments.map(c=>(
<p key={c.id}>{c.author}: {c.content}</p>
))}

<input
value={text}
onChange={(e)=>setText(e.target.value)}
/>

<button onClick={submit}>Add</button>

</div>

)
}

export default Comments