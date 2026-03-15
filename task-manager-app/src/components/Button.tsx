interface Props {
  text:string
  onClick?:()=>void
  type?:"button"|"submit"
}

const Button = ({text,onClick,type="button"}:Props) => {

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding:"10px 20px",
        background:"#2563eb",
        color:"white",
        borderRadius:"6px"
      }}
    >
      {text}
    </button>
  )
}

export default Button