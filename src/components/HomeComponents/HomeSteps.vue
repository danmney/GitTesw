<template>
    <div class="orderStep">
        <div class="stepTop">
            <i>下单流程</i> / order step
        </div>
        <div class="steps">
            <el-steps>
                <el-step status="finish" description="注册成功后,登录状态"></el-step>
                <el-step status="finish"  description="点击个人中心,完善姓名、 手机号等个人信息以便于工作人员联系您, 然后就可以发布订单啦"></el-step>
                <el-step status="finish"  description="工作人员选择接单, 送到您手上,由您签收,订单完成。"></el-step>
            </el-steps>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    .orderStep{
        width: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
        padding: 2rem 0;
        .stepTop{
            position: relative;
            i{
                display:inline-block;
                margin:10px 0;
                font-size: 1rem;
                color: #63b4d2;
            }
            &::after{
                content: "";
                width: 4rem;
                height: 2px;
                position: absolute;
                bottom:0;
                left: 40%;
                background:-webkit-linear-gradient(left,red,green);
            }
        }
        .steps{
            width: 60%;
            margin:2rem 0;
            .el-step__main{
                width: 100px;
                margin-left: -20px;
                margin-top: 10px;
            }
            .is-horizontal{
                &:last-child{
                    width: 0px;
                }
            } 
            .el-step__icon{
                width: 40px;
                height: 40px;
                margin-top: -7px;
            }          
        }
    }
</style>
