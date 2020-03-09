<template>
    <div id="mynews">
        <Curmbs :curmbs="curmbs"/>
        <div class="pernews">
            <div class="perTitle">我的信息</div>
            <div class="context">
                <div class="context_top">
                    <div class="titleImg" title="更换头像" @click="changeTileImg">
                        <img :src="titleImg.imgUrl" alt="">
                        <span>形象代言</span>
                        <input type="file" accept="images/*" ref="imgFiles" @change="uploadImg" v-show="false"/>
                    </div>
                    <div class="detail">
                        <span><i class="el-icon-s-check"></i><i>用户账户:dan1973006182</i></span>
                        <span><i class="el-icon-news"></i><i>用户昵称:{{userInfor}}</i><i class="el-icon-edit" @click="changeName(userInfor)"></i></span>
                        <span><i class="el-icon-star-on"></i><i>用户等级:工作人员</i></span>
                    </div>
                    <div class="money">
                        <span>账户余额</span>
                        <span>￥0.00</span>
                    </div>
                </div>
                <div class="addres"><span>地址:{{addres}}</span><i class="el-icon-edit" @click="changeAddres(addres)"></i></div>
                <MessageBox @fnc="getData" ref="messages"/>
            </div>
        </div>
    </div>
</template>

<script>
import Curmbs from "./Curmbs"
import {Dialog} from "vant"
import MessageBox from "@/components/MessageConfirmBox/messageBox"
export default {
    components:{
        Curmbs,
        MessageBox
    },
    data(){
        return{ 
            curmbs:[
                {id:1,name:"个人中心"},
                {id:2,name:"我的信息"}
            ],
            titleImg:{
                imgUrl:require("@/assets/girl.jpg")
            },
            userInfor:"dan",
            addres:"深圳沙田"
        }
    },
    methods: {
        changeTileImg(){
            Dialog.confirm({
                title: '修改头像',
                message: '确定要修改头像吗?'
            }).then(() => {
                let ref = this.$refs.imgFiles.click();
                Dialog.close();//关闭弹窗
            }).catch(() => {});
        },
        //图片上传
        uploadImg(e){
            let  file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = (data) => {
                let res = data.target || data.srcElement
                this.titleImg.imgUrl = res.result
            }
            if (!file) return;
            reader.readAsDataURL(file);
        },
        //修改用户名
        changeName(input){
            this.msg="请输入昵称"
            this.$refs.messages.isshow(input,"u");
        },
        //修改地址
        changeAddres(input){
            this.msg="请输入地址"
            this.$refs.messages.isshow(input,"d");
        },
        //获取子组件的值
        getData(data,type){//type判断修改的是地址还昵称
            if(type==="u") return this.userInfor = data;
            return this.addres=data;
        }
    }
}
</script>

<style lang="scss">
    #mynews{
        @include useritem;
        .pernews{
            width: 30rem;
            height: 10rem;
            margin:4rem 0 0 2rem;
            .perTitle{
                font-size: 0.7rem;
                color: #666;
            }
            .context{
                width: 100%;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                background-color: #fff;
                .context_top{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    .titleImg{
                        width:3rem;
                        height: 3rem;
                        border-radius: 3rem;
                        cursor: pointer;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 3rem;
                        }
                        span{
                            font-size: 0.6rem;
                            padding: 0 0 0 0.2rem;
                            color: #409eff;
                        }
                    }
                    .detail{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        span{
                            font-size: 0.6rem;
                            i{
                                padding:0.3rem 0.2rem;
                            }
                        }
                    }
                    .money{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        span{
                            padding: 0.3rem 0;
                        }
                    }
                }
                .addres{
                    width: 9rem;
                    height: 1rem;
                    margin: 1rem 2rem;
                    text-align: center;
                    span{
                        display: inline-block;
                        width: 7rem;
                        font-size: 0.7rem;
                        border-radius: 1rem;
                        text-align: center;
                        color: #fff;
                        background-color: #409eff;
                    }
                    i{
                        display: inline-block;
                        padding: 0 0.3rem;
                    }
                }
            }
        }
        .el-icon-edit{
            color: skyblue;
            cursor: pointer;
        }
    }
</style>
