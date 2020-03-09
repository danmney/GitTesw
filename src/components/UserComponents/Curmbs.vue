<template>
    <div id="curmbs">
        <div id="icon" @click="isShow">
            <i class="el-icon-s-fold" v-if="isshow"></i>
            <i class="el-icon-menu" v-else></i>
        </div>
        <span>我的位置：</span>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
                v-for="cur in curmbs"
                :key="cur.id"
            >{{cur.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
import {mapActions,mapState} from "vuex"

export default {
    props:["curmbs"],
    data(){
        return{
            
        }
    },
    computed:mapState({
        isshow:(state)=>state.User.isshow
    }),
    methods:{
        ...mapActions(["isShow"])
    }
}
</script>

<style lang="scss">
    #curmbs{
        width:100%;
        display: flex;
        align-items: center;
        padding:0.2rem 0 0.2rem 0;
        border-bottom:1px solid #b7b7b7;
        background-color: aliceblue;
        font-size: 0.6rem;
        #icon{
            padding: 0 0.3rem;
            font-size: 1rem;
            cursor: pointer;
        }
        .el-breadcrumb{
            .el-breadcrumb__inner{
                font-size: 0.6rem;
                color:#b7b7b7;
            }
            .el-breadcrumb__item:last-child .el-breadcrumb__inner{
                color:#409eff;
            }
        }
    }
</style>
