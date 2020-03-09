<template>
    <div id="login_form">
        <div class="login_from">
            <router-link :to="{name:'home'}" tag="p">
            <i class="fa fa-home"></i>
            </router-link>
            <div class="headImg">
                <img src="@/assets/girl.jpg" alt="">
            </div>
            <div class="form">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="60px" size="small" class="demo-ruleForm">
                    <el-form-item label="账号" prop="user">
                        <el-input type="text" v-model="ruleForm2.user" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <el-input type="text" v-model="ruleForm2.code" class="code" @blur="validate"></el-input>
                        <span class="alt_codeT alt_code" v-if="alt_code=='true'">验证码正确</span>
                        <span class="alt_codeF alt_code" v-if="alt_code=='false'">验证码错误</span>
                        <div class="codeNumBox" @click="setCode">
                            <img :src="imgUrl" alt="">
                            <div class="codeNum">{{codeNum}}</div>
                        </div>
                    </el-form-item>
                    <div class="radio">
                        <el-radio v-model="radio" label="1">普通用户</el-radio>
                        <el-radio v-model="radio" label="2">工作人员</el-radio>
                    </div>
                    <div class="btn">
                        <el-button type="primary" size="small" @click="submit">登录</el-button>
                        <el-button class="reset" size="small" @click="reset">重置</el-button>
                    </div>
                </el-form>
            </div>
            <router-link :to="{name:'register'}" class="login_regis" tag="div">注册</router-link>
        </div>
    </div>
</template>

<script>
//引入随机验证码函数
import getCode from "@/model/randomCode";
//引入验证码随机背景图片索引
import getImgUrlIndex from "@/model/getImgUrlIndex";
import { Toast } from 'vant';
import {mapActions} from "vuex";

export default {
    data(){
        /* 
            简单验证账号密码
        */
        var reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})$/;
        var validatePass = (rule, value, callback) => {
            value = value.trim();
            if (value === '') {
                callback(new Error('请输入密码'));
            }
            if(!reg.test(value)){
                callback(new Error('密码需以字母开头数字下划线6~18位组成'));
            }
        };
        var validateUser = (rule, value, callback) => {
            value = value.trim();
            if (value === '') {
                callback(new Error('请输入账号'));
            }
            if(!reg.test(value)){
                callback(new Error('账号需以字母开头数字下划线6~18位组成'));
            }
        };
        return {
            //验证码背景图
            imgUrl:'',
            imgUrls:[
               require("../../assets/login-Verification-1.png"),
               require("../../assets/login-Verification-2.png"),
               require("../../assets/login-Verification-3.png"),
               require("../../assets/login-Verification-4.png")
            ],
            radio:"1",//单选按钮
            codeNum:"",//随机验证码
            alt_code:"",//验证码提示
            ruleForm2: {//账号密码
                user:'',
                pass: '',
                code:''
            },
            /* 
                失去焦点后验证
            */
             rules2: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                user: [
                    { validator: validateUser, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        /* 
            点击验证码变换
        */
        setCode(){
            this.imgUrl = this.imgUrls[getImgUrlIndex(4)];
            this.codeNum = getCode(6);
        },
        //验证验证码是否正确
        validate(){
            let code = this.ruleForm2.code,
                codeNum = this.codeNum;
            if(code.toLowerCase() == codeNum.toLowerCase()){
                this.alt_code = "true";
            }else {
                this.alt_code = "false";
                this.setCode();
            }
        },
        //重置按钮
        reset(){
            this.ruleForm2.code = "";
            this.ruleForm2.user = "";
            this.ruleForm2.pass = "";
            this.radio = "1";
            this.alt_code = "";
            this.setCode();
        },
        //登录按钮
        submit(){
            let user = this.ruleForm2.user,
                pass = this.$md5(this.ruleForm2.pass),
                radio = this.radio,
                that = this;
            if(that.alt_code == "" || that.alt_code == "false"){
                Toast.fail({
                    duration:2000,
                    message:"请输入正确的验证码"
                });
                return
            }
            that.$http.post("/users/login",{user,pass,radio})
            .then(res=>{
                if (res.status == 200) {
                    Toast.success({
                        duration:2000,
                        message:"登录成功"
                    });
                    that.$store.commit("LOGINTOKEN",res.token);
                    that.$store.commit("USERNAME",res.username);
                    that.$store.commit("USER",res.user);
                    localStorage.token = res.token;
                    localStorage.username = res.username;
                    localStorage.user = res.user;
                    setTimeout(function(){
                        let redirect = decodeURIComponent(that.$route.query.redirect || '/');//登录后跳转回之前的路由
                        that.$router.push({
                            path:redirect
                        });
                    },3000)
                }else{
                    return new Promise((resolve,reject)=>{
                        reject(res)
                    });
                }
            }).catch(err=>{
                Toast.fail({
                    duration:2000,
                    message:err.msg
                });
            })
        }
    },
    mounted(){
        //获取验证码
        this.setCode();
    }
}
</script>

<style lang="scss">
    #login_form{
        width: 19rem;
        height: 20rem;
        position: relative;
        overflow: hidden;
        background-color: rgb(245, 245, 245);
        p{
            width: 100%;
            margin: 0.8rem;
            .fa{
                font-size: 1.1rem;
            }
        }
        .headImg{
            width: 3.5rem;
            height: 3.5rem;
            position: absolute;
            left: 40%;
            top:1rem;
            img{
                width: 100%;
                height: 100%;
                border-radius: 3.5rem;
            }
        }
        .form{
            margin:4rem 2rem;
            .code{
                width: 5rem;
                input{
                    letter-spacing: 1px;
                }
            }
            .alt_code{
                position: absolute;
                top: 1.3rem;
                left: 0.6rem;
                font-size: 0.5rem;
            }
            .alt_codeT{
                color: #88ef90;
            }
            .alt_codeF{
                color: #fd8282;
            }
            .radio{
                margin:0 0 0 3rem;
            }
            .btn{
                margin:1rem 0 0 4.2rem;
                .reset{
                    margin-left: 2rem;
                }
            }
            .codeNumBox{
                width: 5rem;
                height: 1.5rem;
                position: absolute;
                right: 1rem;
                top:0rem;
                img{
                    width: 100%;
                    height: 100%;
                }
                .codeNum{
                    position: absolute;
                    top:0;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    font-size: 1.3rem;
                    letter-spacing: 3px;
                    font-family: "FenPinYinTi";
                    font-weight: 800;
                    cursor: pointer;
                }
               
            }
        }
        .login_regis{
            position: absolute;
            bottom: -2.5rem;
            left: 0.5rem;
            font-size: 0.7rem;
            cursor: pointer;
        }
        .login_from{
            width: 100%;
            position: relative;
            animation: login 1s;
        }
        @keyframes login {
            0%{
                transform: translateX(19rem);
            }
            100%{
                transform: translateX(0)
            }
        }
    }
</style>
