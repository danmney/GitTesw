<template>
    <div id="imgLists_box">
        <div id="imgLists_top">
            <span id="title">精彩瞬间</span>
            <span id="circle"></span>
        </div>
        <div id="imgLists">
            <div id="imgListBox"
                v-for="imgList in imgLists"
                :key="imgList.id">
                <div id="img" @mouseenter="enter(imgList.id)" @mouseleave="leave(imgList.id)">
                    <img :class="imgList.img2d?'imgenter':'imgleave'" :src="imgList.imgUrl" alt="">
                    <div id="context" :class="imgList.context2d?'contextenter':'contextleave'">
                        <span>{{imgList.title}}</span>
                        <span>{{imgList.context}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            imgLists:[
                {
                    id:1,
                    imgUrl:require("@/assets/home-news-pic1.jpg"),
                    title:"校园资讯",
                    context:"刺猬在天冷时彼此靠拢取暖，但是保持一定距离，以免互相刺伤。 要去保持亲密的重要方法，乃是要保持适当的距离。测验一个人的智力是否是属于上乘， 只要看脑子里能否是能同时容纳两种相反的思想，而无碍于其处世行事。",
                    img2d:false,
                    context2d:false
                },
                {
                    id:2,
                    imgUrl:require("@/assets/home-news-pic2.jpg"),
                    title:"最新科技",
                    context:"可是不知道何时起，仿佛自己更加喜欢熟悉的味道，可能觉得那更加踏实吧， 熟悉的味道总是让我们少了很多担心，多了一份踏实很多时候， 可能是害怕太多的顾虑，所有干脆放弃，也许在将来的某一刻， 我会后悔我现在的选择，但是我却从来的没有忘记我当初的决心。",
                    img2d:false,
                    context2d:false
                },
                {
                    id:3,
                    imgUrl:require("@/assets/home-news-pic3.jpg"),
                    title:"公司资讯",
                    context:"当我还住在她丢掉的那首歌里，怀抱所有音符；当我仍在她丢掉的那本书里面， 封面封底夹着我所有的白昼与黑夜的时候，阿谷，这个如山间清风， 拂面朗月的彝族姑娘已经给我发了好多信息。或许，伤悲的基调定性。",
                    img2d:false,
                    context2d:false
                },
                {
                    id:4,
                    imgUrl:require("@/assets/home-news-pic2.jpg"),
                    title:"娱乐八卦",
                    context:"当我还住在她丢掉的那首歌里，怀抱所有音符；当我仍在她丢掉的那本书里面， 封面封底夹着我所有的白昼与黑夜的时候，阿谷，这个如山间清风， 拂面朗月的彝族姑娘已经给我发了好多信息。或许，伤悲的基调定性。",
                    img2d:false,
                    context2d:false
                }
            ],
            img:false,
            context:false
        }
    },
    methods:{
        enter(index){
            this.imgLists[index-1].img2d = true;
            this.imgLists[index-1].context2d = true;
        },
        leave(index){
            this.imgLists[index-1].img2d = false;
            this.imgLists[index-1].context2d = false;
        }
    }
}
</script>

<style lang="scss">
   #imgLists_box{
       width: 100%;
       #imgLists_top{
           text-align: center;
           margin:1.5rem 0;
           position: relative;
            #title{
                font-size: 0.7rem;
                color: #666;
                &::before{
                    content:"";
                    width:20rem;
                    height: 0.15rem;
                    position: absolute;
                    bottom:0;
                    left: 16.75%;
                    background-image: -webkit-linear-gradient(right,#97d9e1,#fff);
                }
                    &::after{
                    content:"";
                    width:20rem;
                    height: 0.15rem;
                    position: absolute;
                    bottom:0;
                    right: 17%;
                    background-image: -webkit-linear-gradient(left,#97d9e1,#fff)
                }
            }
            #circle{
                width: 5rem;
                height: 2.5rem;
                display: block;
                position: absolute;
                left: 46.2%;
                top:-1.5rem;
                border-radius: 2.5rem 2.5rem 0 0;
                border: 0.15rem solid #97d9e1;
                border-bottom: none;
            }
       }
        #imgLists{
            width: 95%;
            height: 20rem;
            margin:0 auto;
            padding: 1.5rem 2.5rem 0;
            display: flex;
            justify-content:space-between;
            align-items: center;
            -o-box-shadow: 0 0 .3rem .3rem #ccc;
            box-shadow: 0 0 0.3rem 0.3rem #ccc;
            margin-bottom: 1rem;
            #img{
                width: 10rem;
                height: 15rem;
                position: relative;
                overflow: hidden;
                box-shadow: 5px 7px 2px #666;
                img{
                    width: 100%;
                    height: 100%;
                }
                .imgenter{
                    @include animeteScale;
                }
                .imgleave{
                    @include animeteScalele;
                }
                .contextenter{
                    @include translateenter;
                }
                .contextleave{
                    @include tranlateleave;
                }
                #context{
                    display: block;
                    width: 100%;
                    height: 1rem;
                    position: absolute;
                    left: 0;
                    bottom: 1rem;
                    span{
                        &:first-child{
                            display: block;
                            width: 100%;
                            height: 1rem;
                            font-size: 0.7rem;
                            line-height: 1rem;
                            text-align: center;
                            background-color: #97d9e1;
                        }
                        &:last-child{
                            display: block;
                            width: 100%;
                            height: 10rem;
                            padding: 0 10px;
                            text-indent: 2em;
                            font-size: 0.6rem;
                            background: #ccc;
                            opacity: 0.8;
                            color: #111; 
                        }
                    }
                }
            }
        }
   }
</style>
