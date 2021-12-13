// const Manager=()=>{
//     return (
//         <h1>WFM Home</h1>
//     )
// }

// export default Manager


import { useState } from "react"
import { Redirect } from "react-router";



const Manager= ({token,usertype,performLogin}:any)=>{

  const [employee_id,setUser]=useState("")
  const [skills,setSkills]=useState("")
  const [status,setStatus]=useState("")
  const [experience,setExperience]=useState("")
  const [manager,setManager]=useState("")
  if (localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }
    return (
  <div className="card" 
  style={{width: "400px", minHeight: "300px",position: "relative", top:"100px",left:"35%" 
  ,padding: "20px", color:"darkblue"}}>
    <h3> Work Force Management </h3>
        <form action="/action_page.php">
  <div className="mb-3 mt-3">
 
    <input type="text" className="form-control" 
    value={employee_id}
   
     />
  </div>
  <div className="mb-3">
  
    <input type="password" 
    className="form-control"
     value={skills}/>
  
  </div>
 
  
</form>
</div>
    )
}

export default  Manager