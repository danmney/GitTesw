<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div 
                class="swiper-slide"
                v-for="banner in banners"
                :key="banner.id"
            >
                <img :src="banner.imgUrl" alt="">
            </div>
        </div>
          <!-- 分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from "swiper"
export default {
    data(){
        return {
            banners:[
                {
                    id:1,
                    imgUrl:require("@/assets/banner1.jpg")
                },
                {
                    id:2,
                    imgUrl:require("@/assets/banner2.jpg")
                },
                {
                    id:3,
                    imgUrl:require("@/assets/banner3.jpg")
                },
                {
                    id:4,
                    imgUrl:require("@/assets/banner4.jpg")
                },
                {
                    id:5,
                    imgUrl:require("@/assets/banner5.jpg")
                }
            ]
        }
    },
    mounted(){
         this.$nextTick(()=>{
            new Swiper(".swiper-container",{
                loop:true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable:true
                },
                autoplay:{
                    disableOnInteraction:false
                },
                 // 前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            });
        })
    }
}
</script>

<style lang="scss">
.swiper-container{
    width: 100%;
    .swiper-wrapper{
        width: 100%;
        .swiper-slide{
            width: 100%;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
