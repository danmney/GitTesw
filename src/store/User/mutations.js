import {IS_SHOW} from "./const"
export default {
    [IS_SHOW](state,newState){
        state.isshow = newState;
    }
}