<template>
    <div class="updPass">
        <Curmbs :curmbs="curmbs"/>
        <img src="../../assets/loading.gif" v-if="isloading" class="loadingImg" alt="">
        <div class="upForm">
            <div class="input">
                <el-input placeholder="请输入原密码" v-model="pass" show-password  @blur="validate('Y')"></el-input>
                <span v-if="sPass">{{hint}}</span>
            </div>
           <div class="input">
                <el-input placeholder="请输入新密码" v-model="newPass" show-password  @blur="validate('N')"></el-input>
                 <span v-if="sNewPass">{{hint}}</span>
           </div>
           <div class="input">
               <el-input placeholder="请再输入新密码" v-model="reqNewPass" show-password  @blur="validate('R')"></el-input>
                <span v-if="sReqNewPass">{{hint}}</span>
           </div>
            <el-button type="primary" plain @click="submit">确认修改</el-button>
        </div>
    </div>
</template>

<script>
import Curmbs from "./Curmbs"
import {Toast} from "vant"
export default {
    components:{
        Curmbs
    },
    data(){
        return{ 
            curmbs:[
                {id:1,name:"个人中心"},
                {id:2,name:"我的密码"}
            ],
            pass:"",
            newPass:"",
            reqNewPass:"",
            sPass:false,
            sReqNewPass:false,
            sNewPass:false,
            hint:"",
            isloading:false
        }
    },
    methods:{
        validate(type){
            var reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})$/;
            //验证原密码
            if(type==="Y"){
                if(!this.pass){
                    this.hint="原密码不能为空";
                    this.sPass=true;
                    return
                }else if(!reg.test(this.pass)) {
                    this.hint="密码需以字母开头数字下划线6~18位组成";
                    this.sPass=true;
                    return
                }else this.sPass = false;
            }
            //验证新密码
            if(type==="N"){
                if(!this.newPass){
                    this.hint="请输入新密码";
                    this.sNewPass=true;
                    return
                }else if(!reg.test(this.newPass)) {
                    this.hint="密码需以字母开头数字下划线6~18位组成";
                    this.sNewPass=true;
                    return
                }else this.sNewPass = false;
            }
            //验证再次输入密码
            if(type==="R"){
                if(!this.reqNewPass){
                    this.hint="请再次输入新密码";
                    this.sReqNewPass=true;
                    return
                }else if(!reg.test(this.reqNewPass)) {
                    this.hint="密码需以字母开头数字下划线6~18位组成";
                    this.sReqNewPass=true;
                    return
                }else if(this.newPass !== this.reqNewPass){
                    this.hint="密码不一致";
                    this.sReqNewPass=true;
                    return
                }else this.sReqNewPass=false
            }
        },
        submit(){
            let that = this,
                pass = that.pass,
                newPass=that.newPass,
                reqNewPass=that.reqNewPass,
                user = localStorage.user;
            if (!pass || !newPass || !reqNewPass)
            {
                Toast({
                    duration:1000,
                    message:"存在在必填项未填"
                })
                return
            }
            pass=that.$md5(pass);
            newPass=that.$md5(newPass);
            that.isloading=true;
            that.$http.post("/users/UpdataPass",{
                user,pass,newPass
            }).then(res=>{
                that.isloading=false;
                new Promise((resolve,reject)=>{
                    if (res.status == "200")resolve(res)
                    else reject(res)
                }).then(result=>{
                    Toast({
                        duration:1000,
                        message:"修改成功，请重新登录"
                    })
                    that.$store.commit("LOGINTOKEN","");
                    that.$store.commit("USERNAME","");
                    that.$store.commit("USER","");
                    localStorage.token = ""
                    localStorage.username = "";
                    localStorage.user = "";
                    setTimeout(function(){
                        that.$router.push("/logRegmodel/login")
                    },2000)
                }).catch(err=>{
                    let er = err.err;
                    Toast({
                        duration:1000,
                        message:er.status + er.msg
                    })
                })
            }).catch(err=>{
                Toast({
                    duration:1000,
                    message:err.status + err.msg
                })
            })
        }
    }
}
</script>

<style lang="scss">
    .updPass{
        @include useritem;
        position: relative;
        .loadingImg{
            display: block;
            position: absolute;
            top: 50%;
            left:50%;
            z-index: 20;
            transform:translate3d(-50%,-50%,0);
            -webkit-transform: translate3d(-50%,-50%,0);
        }
        .upForm{
            text-align: center;
            width: 40%;
            min-height:10rem;
            margin:3rem auto;
            .input{
                margin: 1rem 0;
                font-size: 0.5rem;
                color: red;
                span{
                    display: block;
                    width: 12rem;
                }
            }
        }
    }
</style>
