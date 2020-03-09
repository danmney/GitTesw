import {LOGINTOKEN,USERNAME} from "./const";
export default {
    loginToken(ctx,token){//获取token
        ctx.commit(LOGINTOKEN,token);
    },
    useInfor(ctx,username){
        ctx.commit(USERNAME,username);
    }
}