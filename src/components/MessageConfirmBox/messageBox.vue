<template>
    <div>
        <van-button type="primary" text="显示遮罩层" @click="isshow" v-show="false"/>
        <van-overlay :show="show" @click="show = false">
            <div class="wrapper" @click.stop>
                <div class="messageBox">
                    <div class="hidden" @click="show=false"><i class="el-icon-circle-close"></i></div>
                    <div class="title">{{msg}}</div>
                    <el-input v-model="message" size="small"></el-input>
                    <div class="btn">
                        <el-button type="primary" class="cancell" @click="cancell" size="mini">取消</el-button>
                        <el-button type="primary" @click="open" size="mini">确定</el-button>
                    </div>
                </div>
            </div>
        </van-overlay>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                message:"",
                show:false,
                type:"",
                msg:"请输入内容"
            }
        },
        methods: {
            open() {
                this.show = false;
                this.$emit("fnc",this.message,this.type);
            },
            cancell(){
                this.show = false;
            },
            isshow(input,type){
                if (type === "u")this.msg="请输入昵称"
                else this.msg="请输入地址"
                this.message=input;
                this.type=type;
                this.show = true;
            }
        }
    }
</script>
<style lang="scss">
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        .messageBox{
            width: 20rem;
            height: 6rem;
            position: relative;
            background-color: #fff;
            .hidden{
               position: absolute;
               top:0.1rem;
               right: 0.1rem;
               cursor: pointer;
            }
            .title{
                position: absolute;
                top:0.7rem;
                left: 2rem;
                font-size: 0.7rem;
                color: #666;
            }
            .el-input{
                padding: 0 2rem;
                margin-top: 2rem;
            }
            .btn{
                position: absolute;
                right: 0.5rem;
                bottom: 0.5rem;
            }
        }
    }
</style>
