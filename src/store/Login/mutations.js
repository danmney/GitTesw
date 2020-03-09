import {LOGINTOKEN,USERNAME,USER} from "./const";
export default {
    [LOGINTOKEN](state,newstate){
        state.token = newstate;
    },
    [USERNAME](state,username){
        state.username = username;
    },
    [USER](state,user){
        state.user = user;
    }
}