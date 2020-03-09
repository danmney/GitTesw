<template>
    <div id="login">
        <div class="login_left">
            <div class="login_left_title">
                <h3>校园闪电侠</h3>
                <p class="login_text">Campus Courier</p>
            </div>
            <p class="login_bom">一一一 拿快递这种小事就交给我们办 !</p>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
    #login{
        width: 100%;
        height: 100%;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: linear-gradient(-225deg,#69eacb,#eaccf8 48%,#6654f1);
        .login_left{
            width: 20rem;
            height: 20rem;
            position: relative;
            background:rgba(225,225,225,0.2);
            .login_left_title{
                width: 100%;
                text-align: center;
                margin: 7rem 0;
                h3{
                    font-size: 1.5rem;
                    font-family: "SiYu";
                    color: #666;
                }
                .login_text{
                    font-size: 0.5rem;
                    color: #666;
                }
            }
            .login_bom{
                position: absolute;
                bottom:1rem;
                right: 2rem;
                font-size: 0.6rem;
                color: #666;
            }
        }
    }
</style>
