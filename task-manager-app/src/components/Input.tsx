interface Props{
label:string
value:string
onChange:(v:string)=>void
type?:string
}

const Input = ({label,value,onChange,type="text"}:Props) => {

return(
<div>

<label>{label}</label>

<input
type={type}
value={value}
onChange={(e)=>onChange(e.target.value)}
/>

<input
aria-label="Task Title"
placeholder="Task Title"
/>

<button
aria-label="Create Project"
onClick={createProject}
>
Create
</button>

<button
onKeyDown={(e)=>{
if(e.key==="Enter"){
createProject()
}
}}
>
Create
</button>

</div>
)
}

export default Input