import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Manager from '../../Manager';

export default connect(
    (state:any)=>{
        return {
            token: state.loginData.token,
            usertype: state.loginData.usertype
        }
    },
    (dispatch)=>{
        return bindActionCreators({
            performLogin:(user:any)=>{
                return {type: "MANAGER_ACTION",data:user}
            }
        },dispatch)
    }
)(Manager)




