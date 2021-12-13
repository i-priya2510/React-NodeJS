import axios from 'axios'
import {call,put} from 'redux-saga/effects'


export function* loginHandler(action){
    try{
 let  result = yield call(axios.post,"http://localhost:8000/users/signin",action.data)
 console.log(result.data)

 localStorage.setItem("username",result.data.username)
 localStorage.setItem("usertype",result.data.usertype)
 localStorage.setItem("token",result.data.token)

 yield put({type:"LOGIN_SUCCESS",data: 
  {
     username:result.data.username,
     usertype:result.data.usertype,
     token: result.data.token
  }})
    } 
  catch(e){
      yield put({type:"LOGIN_FAILURE"})
  }
 
}


export function* ManagerHandler(action){
  try{
let  result = yield call(axios.get,"http://localhost:8000/home/emplist",action.data)
console.log(result.data)


localStorage.setItem("employee_id",result.data.employee_id)
localStorage.setItem("name",result.data.name)
localStorage.setItem("skills",result.data.skills)
localStorage.setItem("status",result.data.status)
localStorage.setItem("experience",result.data.experience)
localStorage.setItem("manager",result.data.manager)


yield put({type:"MANAGER_SUCCESS",data: 
{
  employee_id:result.data.employee_id,
  name:result.data.name,
  skills:result.data.skills,
  status:result.data.skills,
  experience:result.data.experience,
  manager:result.data.manager
}})
  } 
catch(e){
    yield put({type:"MANAGER_FAILURE"})
}

}