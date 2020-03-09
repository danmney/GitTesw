<template>
    <div id="reg_form">
        <div class="reg_from">
            <router-link :to="{name:'home'}" tag="p">
            <i class="fa fa-home"></i>
            </router-link>
            <div class="title">注册</div>
            <div class="form">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" size="mini" class="demo-ruleForm">
                        <el-form-item label="*昵称" prop="username">
                            <el-input type="text" v-model="ruleForm2.username"></el-input>
                        </el-form-item>
                        <el-form-item label="*账号" prop="user">
                            <el-input type="text" v-model="ruleForm2.user"></el-input>
                        </el-form-item>
                        <el-form-item label="*密码" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="*确认密码" prop="reqpass" label-width="80px">
                            <el-input type="password" v-model="ruleForm2.reqpass" show-password @blur="validate"></el-input>
                            <span class="alt_reqT alt_req" v-if="alt_req=='true'">密码一致</span>
                            <span class="alt_reqF alt_req" v-if="alt_req=='false'">{{alt_req_text}}</span>
                        </el-form-item>
                        <el-form-item label="*密保" prop="region">
                            <el-select v-model="ruleForm2.region" placeholder="请选择密保问题">
                                <el-option label="最喜欢的人" value="lover"></el-option>
                                <el-option label="你的高中班主任" value="techer"></el-option>
                                <el-option label="你父亲的生日" value="father"></el-option>
                                <el-option label="你母亲的生日" value="mather"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="*密保答案" prop="answer" label-width="80px">
                            <el-input type="text" v-model="ruleForm2.answer"></el-input>
                        </el-form-item>
                        <div class="radio">
                            <el-radio v-model="radio" label="1">普通用户</el-radio>
                            <el-radio v-model="radio" label="2">工作人员</el-radio>
                        </div>
                        <div class="btn">
                            <el-button type="primary" size="small" @click="submit">注册</el-button>
                            <el-button class="reset" size="small" @click="reset">重置</el-button>
                        </div>
                </el-form>
            </div>
            <router-link :to="{name:'login'}" class="login_regis" tag="div">登录</router-link>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data(){
        var reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})$/;
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }  
            if(!reg.test(value)){
                callback(new Error('密码需以字母开头数字下划线6~18位组成'));
            }
        };
        var validateUser = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'));
            } 
            if(!reg.test(value)){
                callback(new Error('账号需以字母开头数字下划线6~18位组成'));
            }
        };
        var validateAnswer = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密保答案'));
            }
        };
        var validateRegion = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选择密保问题'));
            }
        };
      return {
        ruleForm2: {
            username:"",
            user:'',
            pass: '',
            reqpass:'',//确认密码
            region: '',//密保问题
            answer: '',//答案
        },
        radio:"1",
        alt_req:"",//验证确认密码
        alt_req_text:"",
        rules2: {
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            user: [
                { validator: validateUser, trigger: 'blur' }
            ],
            region: [
                { validator: validateRegion, trigger: 'blur' }
            ],
            answer: [
                { validator: validateAnswer, trigger: 'blur' }
            ],
        }
      };
    },
    methods:{
        submit(){
            let reqpass = this.ruleForm2.reqpass,
                username = this.ruleForm2.username,
                pass = this.ruleForm2.pass,
                user = this.ruleForm2.user,
                region = this.ruleForm2.region,
                answer = this.ruleForm2.answer,
                radio  = this.radio,
                that = this;
            if(!reqpass || !pass || !user || !region || !answer || !username){
                Toast.fail({
                    message:"还有必填项未填",
                    duration:2000
                })
                return
            }  
            pass = this.$md5(pass);//加密
            answer = this.$md5(answer);
            //请求后端
             that.$http.post("/users/register",{user,pass,radio,region,answer,username})
            .then(res=>{
                if (res.status == 200) {
                    Toast.success({
                        duration:2000,
                        message:"注册成功"
                    });
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
        },
        //重置表单
        reset(){
            this.ruleForm2.region = "";
            this.ruleForm2.user = "";
            this.ruleForm2.pass = "";
            this.ruleForm2.reqpass = "";
            this.ruleForm2.answer = "";
            this.radio="1";
        },
        validate(){
            let reqpass = this.ruleForm2.reqpass,
                pass = this.ruleForm2.pass;
            //判断确认密码是否为空
            if(!reqpass) {
               this.alt_req="false",
               this.alt_req_text = "请再次输入密码" 
            }
            //判断密码是否和确认密码相等
            if (reqpass==pass) this.alt_req="true"
            else{
                this.alt_req="false"
                this.alt_req_text="密码不一致"
            }
        }
    },
    mounted(){
        let that = this;
        //按回车键提交表单
        window.onkeydown=function(e){
            let key = e.keyCode
            if(key===13) that.submit();
        }
    }
}
</script>

<style lang="scss">
    #reg_form{
        width: 19rem;
        height: 20rem;
        position: relative;
        overflow: hidden;
        background-color: rgb(245, 245, 245);
        .title{
            width: 5rem;
            position: absolute;
            top:0.3rem;
            left: 40%;
            font-size: 1.5rem;
            font-family: "SiYu";
        }
        p{
            width: 100%;
            margin: 0.4rem 0 0 0.4rem;
            .fa{
                font-size: 1.1rem;
            }
        }
        .form{
            margin:1rem 2rem;
             .alt_req{
                position: absolute;
                top: 1.3rem;
                left: 0.6rem;
                font-size: 0.5rem;
            }
            .alt_reqT{
                color: #88ef90;
            }
            .alt_reqF{
                color: #fd8282;
            }
        }
        .login_regis{
            position: absolute;
            bottom: -0.5rem;
            left: 0.5rem;
            font-size: 0.7rem;
            cursor: pointer;
        }
        .radio{
                margin:0 0 0 3rem;
            }
        .btn{
            margin:0.3rem 0 0 4.2rem;
            .reset{
                margin-left: 2rem;
            }
        }
    }
    .el-form-item__label{
        font-size: 0.6rem;
    }
    .reg_from{
        width: 100%;
        position: relative;
        animation: register 1s;
    }
    @keyframes register {
        0%{
            transform: translateX(19rem);
        }
        100%{
            transform: translateX(0)
        }
    }
</style>
