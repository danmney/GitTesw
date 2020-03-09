import Vue from 'vue'
import VueRouter from 'vue-router'
import {Toast} from "vant"
Vue.use(VueRouter)
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes:[
    { path:"/",
      redirect:"/home"
    },
    {
      path: '/home',
      name: 'home',
      component:()=>import("@/views/Home")
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component:()=>import("@/views/AboutUs"),
      meta:{
        requireAuth:true//表示进这个路由需要登录验证
      }
    },
    {
      path: '/custVer',
      name: 'custVer',
      component:()=>import("@/views/CustVer"),
      meta:{
        requireAuth:true//表示进这个路由需要登录验证
      }
    },
    {
      path: '/complain',
      name: 'complain',
      component:()=>import("@/views/Complain"),
      meta:{
          requireAuth:true//表示进这个路由需要登录验证
      }
    },
    {
      path: '/user',
      name: 'user',
      component:()=>import("@/views/User"),
      redirect:"/user/mynews",//重定向到第一个子路由
      children:[
          {
              path:"mynews",
              name:"mynews",
              component:()=>import("@/components/UserComponents/MyNews"),
              meta:{
                requireAuth:true//表示进这个路由需要登录验证
              }
          },
          {
              path:"updataPass",
              name:"updataPass",
              component:()=>import("@/components/UserComponents/UpdataPass"),
              meta:{
                requireAuth:true//表示进这个路由需要登录验证
              }
          },
          {
              path:"myMonney",
              name:"myMonney",
              component:()=>import("@/components/UserComponents/Mymonney"),
              meta:{
                requireAuth:true//表示进这个路由需要登录验证
              }
          },
          {
              path:"aleradyItem",
              name:"aleradyItem",
              component:()=>import("@/components/UserComponents/AleradyItem"),
              meta:{
                requireAuth:true//表示进这个路由需要登录验证
              }
          },
          {
              path:"passItems",
              name:"passItems",
              component:()=>import("@/components/UserComponents/PassItems"),
              meta:{
                requireAuth:true//表示进这个路由需要登录验证
              }
          },
          {
              path:"searchItems",
              name:"searchItems",
              component:()=>import("@/components/UserComponents/SearchItems"),
              meta:{
                requireAuth:true//表示进这个路由需要登录验证
              }
          },
          {
              path:"itemList",
              name:"itemList",
              component:()=>import("@/components/UserComponents/ItemList"),
              meta:{
                requireAuth:true//表示进这个路由需要登录验证
              }
          },
          {
              path:"newList",
              name:"newList",
              component:()=>import("@/components/UserComponents/NewList"),
              meta:{
                requireAuth:true//表示进这个路由需要登录验证
              }
          },

      ]
    },
    {
        path:"/logRegmodel",
        name:"logRegmodel",
        component:()=>import("@/views/LoginRegister"),
        redirect:"/logRegmodel/login",
        children:[
            {
                path:"login",
                name:"login",
                component:()=>import("@/components/LoginComponents/Form")
            },
            {
                path:"register",
                name:"register",
                component:()=>import("@/components/RegisterComponents/Form")
            }
        ]
    }
  ]
})
router.beforeEach((to,from,next)=>{
  
  if (to.meta.requireAuth) { //判断该路由是否需要登录验证
      let token = localStorage.token;
      if (token) {
         next();
      }else{
        Toast({
          duration:1000,
          message:"您还未登录，请先登录"
        })
        setTimeout(function(){
            next({
              path:"/logRegmodel/login",
              query: {redirect: to.fullPath}//将跳转后的路由当做参数，当登录成功后跳回该路由
          })
        },1500)
      }
  }else{
      next();
  }
})
export default router