<template>
    <div id="header">
        <div class="logo">
            <img src="@/assets/logo.png" alt=""/>
            <span>校园闪电侠</span>
        </div>
        <div class="header-right">
            <div class="navs">
                <router-link 
                    :to='{name:menu.pathName}'
                    active-link="active"
                    v-for="menu in menus"
                    :key="menu.id"
                    tag="span"
                    class="menu"
                    >
                    <span>{{menu.name}}</span>
                </router-link>
            </div>
            <div class="admin">
                <span>
                    <i class="fa fa-user"></i>
                    <i v-if="!username">未登录</i>
                    <i v-else>{{username}}</i>
                </span>
                <router-link :to="{name:'login'}" v-if="!token">登录</router-link>
                <a class="log_off" v-else @click="log_off">注销</a>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex"
import {Dialog} from "vant"
export default {
    data(){
        return {
            menus:[
                {
                    id:1,
                    pathName:"home",
                    name:"主 页"
                },
                 {
                    id:2,
                    pathName:"user",
                    name:"个人中心"
                },
                 {
                    id:3,
                    pathName:"aboutUs",
                    name:"关于我们"
                },
                 {
                    id:4,
                    pathName:"custVer",
                    name:"我的客服"
                },
                 {
                    id:5,
                    pathName:"complain",
                    name:"投诉建议"
                }
            ],
        }
    },
    computed:{
        ...mapState({
            token:(state)=>state.Login.token,
            username:(state)=>state.Login.username
        }),
        
    },
    methods:{
        log_off(){
            Dialog.confirm({
                title: '注销',
                message: '确定要注销吗?'
            }).then(() => {
                this.$store.commit("LOGINTOKEN","");
                localStorage.token = "";
                this.$store.commit("USERNAME","");
                localStorage.username = "";
                this.$store.commit("USER","");
                localStorage.user = "";
                this.$router.push("/logRegmodel/login")
            }).catch(() => {
            });
           
        }
    }
}
</script>

<style lang="scss">
    .router-link-active{
        background-color: #eff3f5;
        color: #3498db;
    }
    #header{
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        border-bottom: 1px solid #ccc;
        .header-right{
            height: 100%;
            display: flex;
            align-items: center;

        }
        .admin{
            padding: 0 0.1rem;
            font-size: 12px;
            span{
                padding:0 0.2rem;
                cursor: pointer;
                .fa{
                    font-size: 16px;
                }
                i{
                    padding:0 2px;
                }
            }
            .log_off{
                cursor: pointer;
            }
        }
        .logo{
            height: 100%;
            display: flex;
            align-items: center;
            img{
                width: 1.75rem;
            }
            span{
                font-size: 1.2rem;
                font-family: "XinYeYing";
            }
        }
        .navs{
            height: 100%;
            margin-right: 10px;
            display: flex;
            .menu{
                display: inline-block;
                height: 100%;
                line-height: 2rem;
                font-size: 12px;
                padding: 0 0.5rem;
                cursor: pointer;
                :first-child{
                    padding: 0 12px;
                }
            }
        }
    }
</style>
