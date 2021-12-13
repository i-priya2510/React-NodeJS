import {takeEvery} from 'redux-saga/effects'
import { loginHandler,ManagerHandler } from './handlers'


export function* rootSaga(){
    yield takeEvery("LOGIN_ACTION",loginHandler)
}

export function* ManagerRoot(){
    yield takeEvery("MANAGER_ACTION",ManagerHandler)
}