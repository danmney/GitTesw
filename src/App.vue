<template>
  <div id="app">
    <Header/>
    <transition name="fade">
        <keep-alive include="home,user">
          <router-view/>
        </keep-alive>
    </transition>
  </div>
</template>
<script>
import Header from "@/components/HomeComponents/Header"
export default {
    components:{
        Header
    }
}
</script>

<style lang="scss">
    html{
      font-size: 125%;
    }
    #app{
      position: relative;
    }
    .fade-enter-active{
        animation: identifier 0.5s ease-out;
    }
    .fade-enter{
         animation: identifier 0.5s ease-out;
    }
    @keyframes identifier {
        0%{
          transform: translateX(-100%)
        }
        100%{
          transform: translateX(0)
        }
    }
</style>
