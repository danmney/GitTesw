<template>
    <div class="merits">
        <div class="merits-title">
            <span><i>功能及特色</i>/Merits</span>
            <span>我们在努力，坚持竭尽全力为客户提供优质服务</span>
        </div>
        <i class="merits-i"></i>
        <div class="merits-content">
            <div 
                class="roate" 
                @mouseover="mouseOver(animate.id)"
                @mouseout="mouseOut(animate.id)"
                v-for="animate in animates"
                :key="animate.id"
                >
                <div :class="[animate.class,animate.anmitemouse?'anmitemouse':'']"></div>
                <div class="hidden">{{animate.text}}</div>
                <div class="desc">{{animate.desc}}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            //动画运行类
            animates:[
                {
                    id:1,
                    class:"anmite1",
                    text:"足不出户",
                    desc:"我们竭诚为您服务,让您足不出户就可以拿到自己的快递, 我们竭诚为您服务,让您足不出户就可以拿到自己的快递 我们竭诚为您服务,让您足不出户就可以拿到自己的快递",
                    anmitemouse:false
                },
                {
                    id:2,
                    class:"anmite2",
                    text:"高效快捷",
                     desc:"高效快捷,让您足不出户就可以拿到自己的快递, 我们竭诚为您服务,让足不出户就可以拿到自己的快递 我们竭诚为您服务,让您足不出户就可以拿到自己的快递",
                    anmitemouse:false
                },
                {
                    id:3,
                    class:"anmite3",
                    text:"安全保障 ",
                    desc:"安全保障,让您足不出户就可以拿到自己的快递, 我们竭诚为您服务,您足不出户就可以拿到自己的快递 我们竭诚为您服务,让您足不出户就可以拿到自己的快递",
                    anmitemouse:false
                },
                {
                    id:4,
                    class:"anmite4",
                    text:"贴心服务",
                    desc:"贴心服务,让您足不出户就可以拿到自己的快递, 我们竭诚为您服务,您足不出户就可以拿到自己的快递 我们竭诚为您服务,让您足不出户就可以拿到自己的快递",
                    anmitemouse:false
                },
            ],
            ismouseover:false,//判断鼠标是否移入
        }
    },
    methods:{
        mouseOver(index){
           this.animates[index-1].anmitemouse = true;
        },
        mouseOut(index){
            this.animates[index-1].anmitemouse = false;
        }
    }
}
</script>

<style lang="scss">
    .merits{
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        .merits-title{
            span{
                display: block;
                width: 340px;
                text-align: center;
                color: #999;
                font-size: .7rem;
                i{
                    display: inline-block;
                    margin-left: 10px;
                    font-size: 1rem;
                    color: #63b4d2;
                }
            }
        }
        .merits-i{
            display: block;
            width: 95%;
            height: 6px;
            margin: 1rem auto 0;
            background-color: #57c6e1;
            background-image: linear-gradient(90deg,#eea2a2 0,#bbc1bf 19%,#57c6e1 42%,#b49fda 79%,#7ac5d8);
        }
        .roate{
            width: 150px;
            height: 150px;
            position: relative;
        }
        .merits-content{
            width: 95%;
            height: 20rem;
            display: flex;
            justify-content: space-between;
            padding: 30px 50px 0;
            padding-bottom: 5rem;
            -o-box-shadow: 0 0 .3rem .3rem #ccc;
            box-shadow: 0 0 0.3rem 0.3rem #ccc;
            margin-bottom: 20px;
            .desc{
                padding: 20px 0;
                line-height: 1.2rem;
                font-size: 12px;
                color: #666;
                text-indent: 1rem;
            }
        }
        .hidden{
            @include hidden;
        }
        .anmite1{
            @include animate;
            @include animate1;
        }
        .anmite2{
            @include animate;
            @include animate2;
        }
        .anmite3{
            @include animate;
            @include animate3;
        }
        .anmite4{
            @include animate;
            @include animate4;
        }
        .anmitemouse{
            @include animate;
            @include aimateLine;
        }
    }

   
</style>
