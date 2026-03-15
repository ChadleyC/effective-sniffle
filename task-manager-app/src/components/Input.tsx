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

</div>
)
}

export default Input