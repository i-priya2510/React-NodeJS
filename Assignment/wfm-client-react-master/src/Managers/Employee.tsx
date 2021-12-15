import { useState,useEffect,useRef } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Popup from '../popup';
import ReactDOM from "react-dom";



type Employee={
    EmployeeID:number;
    Name:string;
    Skills:string;
    Status:string;
    Experince:number;
    Manager:string;
    WFMManager:string;
    content:string;
    handleClose:string;
    requestmessage:string;
}


const Employee = (props:any)=>{

 const [isOpen, setIsOpen] = useState(false);
 const[id,Setid] = useState(0)
 const[reqmessage,Setreqmessage] = useState('')
 const [peopleData,setPeopleData] =useState([])
 const [accepted,setaccepted]=useState("request_waiting");
 const manager=localStorage.getItem("username")

 function togglePopup(event:any){
   setIsOpen(!isOpen);
   if(isOpen!==true){

    const id=event.target.id;
    Setid(id);
    

   }
  }

  async function peopleRead(){
    try{
        let response =
          await axios.get("http://localhost:8000/employees/emp")
            setPeopleData(response.data)
      }
    catch(e){
        setPeopleData([])
    }
    }

    async function addDetails(){
      try{
        console.log(id,reqmessage,manager)
          const response =
            await axios.put("http://localhost:8000/employees/updateEmployee",{employeeid : id,status:accepted});
            console.log(id,accepted)
            if(response.status == 200){
              const res = await axios.post("http://localhost:8000/employees/insertsoftlock",
              {
                employeeid:id,manager:localStorage.getItem("username"),responsemessage: reqmessage});
            }
            Setreqmessage('');
            peopleRead();
        }
      catch(e){
          console.log("Error");
      }
      }


    useEffect(()=>{
        peopleRead()
    },[])

    return (
  <div className="card" 
  style={{width: "1300px", minHeight: "700px",position: "relative", top:"50px",left:"2%" 
  ,padding: "30px", color:"darkblue"}}>


    <table className="table">
        <thead className="table-primary">
            <tr>

                <th scope="col">Employee ID</th>
                <th scope="col">Name</th>
                <th scope="col">Skills</th>
                <th scope="col">Status</th>
                <th scope="col">Experience</th>
                <th scope="col">Manager</th>
                <th scope="col">WFMManager</th>
                <th scope="col"> Request Lock</th>

            </tr>
        </thead>
        <tbody>
                    {
                        peopleData.map((x:Employee)=>{
                        let empid = (x.EmployeeID).toString();
                        if(manager == x.Manager){
                            return(
                                <tr key={x.EmployeeID}>
                                    
                                    <td>{x.EmployeeID}</td>
                                    <td>{x.Name}</td>
                                    <td>{x.Skills}</td>
                                    <td>{x.Status}</td>
                                    <td>{x.Experince}</td>
                                    <td>{x.Manager}</td>
                                    <td>{x.WFMManager}</td>
                                    <td>
                                    <button type="button" className="btn btn-outline-primary" id={empid}  onClick={togglePopup}>Request Lock</button>
                                    {
                                        isOpen && <Popup
                                        content={<>
                                          <h2 className="highlight">Soft Lock Request Confirmation</h2>
                                          <br/>
                                          <p>Please Confirm the Lock Request is for {id}</p>
                                          <br />
                                          <p>Request Message (Message must be atleast 10 Charecters Long !)</p>
                                          <br/>
                                          <textarea className="form-control" rows={3} placeholder="Enter your request message here..."  value={reqmessage} onChange={(e)=>Setreqmessage(e.target.value)}></textarea>
                                          <br/>
                                          <div>
                                          <button type="button" className="btn btn-danger btn-space" onClick={togglePopup}>Cancel</button>

                                          <button type="button" className="btn btn-primary btn-space" onClick={()=>{addDetails();togglePopup(id);}}>Send Request</button>
                                          </div>
                                        </>}
                                        handleClose={togglePopup}
                                      />


                                    }
                                    

                                    </td>
                                    
    
                                </tr>
                            )
                        }
                        })
                    }
                </tbody>
    </table>
    
 </div>
    )}

export default Employee
