import Login from "../Login";
import Empreq from "./Empreq";

const WFMHome=()=>{

    const username =  localStorage.getItem("username")
    return (
      <div>
      <div>
        <nav className="navbar navbar-dark bg-dark justify-content-between">
            <a className="navbar-brand" >Work Force Manger Home</a>
            <form className="form-inline my-2 my-lg-0">
                <a className="navbar-brand" >{username}</a>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={()=>
                {if(username)
                    return  [localStorage.clear(),Login]}}>Logout</button>  
            </form>
        </nav>
      </div>
      <div>
      <Empreq></Empreq>
    </div>
    </div>
    )
}



export default WFMHome