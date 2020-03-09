/* 
    封装api
    请求拦截，响应拦截，错误处理
*/
import axios from "axios";
import qs from "qs";
import {Toast} from "vant";
import store from "@/store";
import router from "../router"
// 环境的切换
/* if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = 'http://api.123dailu.com/';
} */
//请求事件超时
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//请求拦截器
axios.interceptors.request.use(
    config=>{
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        let token = store.state.Login.token;
        if (!config.headers.hasOwnProperty('Authorization') && token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error=>{
        return Promise.reject(error);
    }
)
//响应拦截器
axios.interceptors.response.use(
    response=>{
        if (response.status == "200") {
            return Promise.resolve(response.data);
        }else{
            return Promise.reject(response.data);
        }
    },
    // 服务器状态码不是200的情况 
    error=>{
        console.log('err')
        if (error.response) {
            switch(error.response){
                // 401: 未登录                
                // 未登录则跳转登录页面，并携带当前页面的路径                
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    router.replace({
                        path:"/login",
                        query:{redirect:router.currenRoute.fullPath}
                    });
                break;
                // 403 token过期                
                // 登录过期对用户进行提示                
                // 清除本地token和清空vuex中token对象                
                // 跳转登录页面
                case 403:
                    Toast({
                        duration:1000,
                        message:"登录过期，请重新登录",
                        forbidClick:true
                    });
                    //清除token
                    localStorage.removeItem("token");
                    store.commit("LOGINTOKEN",null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(function(){
                        router.replace({
                            path:"/login",
                            query:{redirect:router.currenRoute.fullPath}
                        })
                    },1000)
                break;
                // 404请求不存在 
                case 404:
                    Toast({
                        message:"网络请求不存在",
                        duration:1500,
                        forbidClick:true
                    })
                break;
                default :
                    Toast({
                        message:error.response.data.message,
                        duration:1500,
                        forbidClick:true
                    })
            }
            return Promise.reject(error.response);
        }
    }
);
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
const get = (url,...params)=>{
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
 const post = (url,...params)=>{
    return new Promise((resolve,reject)=>{
        axios.post(url,qs.stringify(...params))
        .then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        })
    })
}
export default {
    get,post
}