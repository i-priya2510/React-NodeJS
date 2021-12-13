export const loginReducer=(state={username:"NA",token:"NA",usertype:"NA",message:""},action)=>{
    switch(action.type){
        case "LOGIN_SUCCESS":
            console.log(action.data)
            return {...action.data,message:""};
        case "LOGIN_FAILURE":
            console.log(action)
            return {...state,message:"Login Credentials incorrect"}
        default:
            return state
    }
}

export const managerReducer=(state={employee_id:"NA",name:"NA",skills:"NA",status:"NA",experience:"NA",manager:"NA"},action)=>{
    switch(action.type){
        case "MANAGER_SUCCESS":
            console.log(action.data)
            return {...action.data,message:""};
        case "MANAGER_FAILURE":
            console.log(action)
            return {...state,message:"details incorrect"}
        default:
            return state
    }
}