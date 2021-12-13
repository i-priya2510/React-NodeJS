import { useState } from "react"
import { Redirect } from "react-router";


const Manager = ({token,usertype,performLogin}:any)=>{

    const [employee_id,setUser]=useState("")
  const [skills,setSkills]=useState("")
  const [status,setStatus]=useState("")
  const [experience,setExperience]=useState("")
  const [manager,setManager]=useState("")
  const [wfm_manager,setwfmManager]=useState("")
    if (localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
    return (
<table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
    )
}

export default  Manager