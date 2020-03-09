<template>
  <div class="home">
      <el-backtop>
        <div 
          style="{
          height: 2rem;
          width: 2rem;
          background-color: #d6d6d6;
          box-shadow: 0 0 6px rgba(0,0,0, .12);
          text-align: center;
          line-height: 2rem;
          color: #1989fa;
          fontSize:0.8rem;
          border-radius:2rem;
        }">
          top
        </div>
      </el-backtop>
  
      <Banner/>
      <Steps/>
      <Merits/>
      <ImgLists/>
      <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src

import Banner from "@/components/HomeComponents/Homebanners"
import Steps from "@/components/HomeComponents/HomeSteps"
import Merits from "@/components/HomeComponents/HomeMerits"
import ImgLists from "@/components/HomeComponents/HomeImgLists"
export default {
  name: 'home',
  components: {
    
    Banner,
    Steps,
    Merits,
    ImgLists
  }
}
</script>
