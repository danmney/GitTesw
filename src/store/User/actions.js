import {IS_SHOW} from "./const"
import state from "./state"
export default {
    isShow(ctx){
        let isShow = state.isshow
        ctx.commit(IS_SHOW,!isShow);
    }
}