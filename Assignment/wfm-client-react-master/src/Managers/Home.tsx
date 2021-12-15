import Employee from "./Employee";
import Login from "../Login";

const ManagerHome=()=>{
    const username =  localStorage.getItem("username")
    return (
      <div>
      <div>
        <nav className="navbar navbar-dark bg-dark justify-content-between">
            <a className="navbar-brand" > Manger Home</a>
            <form className="form-inline my-2 my-lg-0">
                <a className="navbar-brand" >{username}</a>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={()=>
                {if(username)

                    return  [localStorage.clear(),Login]}}>Logout</button>  
            </form>
        </nav>
      </div>
      <div>
        <Employee></Employee>
      </div>
      </div>
    )

}



export default ManagerHome