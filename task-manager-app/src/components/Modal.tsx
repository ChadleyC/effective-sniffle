interface Props{
open:boolean
children:React.ReactNode
onClose:()=>void
}

const Modal = ({open,children,onClose}:Props) => {

if(!open) return null

return(
<div className="modal">

<div className="modal-content">

<button onClick={onClose}>X</button>

{children}

</div>

</div>
)
}

export default Modal