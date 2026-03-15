import { useState } from "react"
import Button from "../components/Button"

const Profile = () => {

const [name,setName]=useState("")
const [email,setEmail]=useState("")

const saveProfile=()=>{
alert("Profile updated")
}

return(

<div>

<h2>User Profile</h2>

<input
value={name}
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
value={email}
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<Route 
path="/profile" element={<Profile />} />

<Button text="Save" onClick={saveProfile}/>

</div>

)
}

export default Profile