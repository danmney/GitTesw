<template>
    <div class="user-left">
        <el-collapse v-model="activeNames">
            <el-collapse-item name="1">
                <template slot="title">
                    <i class="el-icon-location"></i><i>个人中心</i>
                </template>
                <router-link :to="{name:personItem.pathname}" v-for="personItem in personItems" :key="personItem.id" tag="div">{{personItem.text}}</router-link>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <i class="el-icon-document"></i><i>我的订单</i>
                </template>
                <router-link :to="{name:orderItem.pathname}" v-for="orderItem in orderItems" :key="orderItem.id" tag="div">{{orderItem.text}}</router-link>
            </el-collapse-item>
            <el-collapse-item name="3">
                <template slot="title">
                    <i class="el-icon-circle-plus-outline"></i><i>接单大厅</i>
                </template>
                <router-link :to="{name:acceptItem.pathname}" v-for="acceptItem in acceptItems" :key="acceptItem.id" tag="div">{{acceptItem.text}}</router-link>
            </el-collapse-item>
            <el-collapse-item name="4">
                 <template slot="title">
                    <i class="el-icon-message"></i><i>我的消息</i>
                </template>
                <router-link :to="{name:newItem.pathname}" v-for="newItem in newItems" :key="newItem.id" tag="div">{{newItem.text}}</router-link>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import {mapState} from "vuex"
import { Switch } from 'vant';
export default {
    data() {
      return {
        activeNames: ['1'],
        personItems:[//个人中心节点
            {id:1,text:"我的信息",pathname:"mynews"},
            {id:2,text:"我的密码",pathname:"updataPass"},
            {id:3,text:"我的钱包",pathname:"myMonney"}
        ],
        orderItems:[//我的订单
            {id:1,text:"已接订单",pathname:"aleradyItem"},
            {id:2,text:"历史订单",pathname:"passItems"},
            {id:3,text:"查找订单",pathname:"searchItems"}
        ],
        acceptItems:[//订单大厅
            {id:1,text:"订单列表",pathname:"itemList"}
        ],
        newItems:[
            {id:1,text:"信息",pathname:"newList"}
        ]
      };
    },
    computed:{
        ...mapState({
            isshow:state=>state.User.isshow
        })
    },
    // watch:{
    //     $route(to,from){
    //         console.log(to.path);
    //     }
    // },
    mounted(){
        //根据路由的变化，展开相应的导航节点
        switch (this.$route.name) {
            case "mynews"||"updataPass"||"myMonney":
                this.activeNames=['1'];
                break;
            case "aleradyItem"||"passItems"||"searchItems":
                this.activeNames=['2'];
                break;
            case "itemList":
                this.activeNames=['3'];
                break;
            case "newList":
                this.activeNames=['4'];
                break;
            default:
                break;
        }
    }
  }
</script>

<style lang="scss">
    .user-left{
        min-height: 25rem;
        width:6rem;
        background-color: #fff;
        .el-icon-document,.el-icon-location,.el-icon-circle-plus-outline,.el-icon-message{
            padding: 0 0.3rem 0 0.8rem;
            font-size: 0.7rem;
        }
        .el-collapse-item__header{
            overflow: hidden;
        }
    }
    .el-collapse-item__content {
        padding-bottom: 0;
        font-size: 0.6rem;
        color: #303133;
        text-align: center;

        div{
            padding: 0.3rem 0;
            background-color: #f7f7f7;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            &:hover{
                background-color: #ecfbffe7;
            }
        }
    }
</style>
