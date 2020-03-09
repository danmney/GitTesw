<template>
    <div id="user">
        <div class="userContext">
            <transition name="fade">
                <UserTree v-if="isshow"/>
            </transition>
            <router-view/>
        </div>
    </div>
</template>

<script>
import UserTree from "@/components/UserComponents/Usertree"
import {mapState} from "vuex"
export default {
  name: 'user',
  components: {
      UserTree
  },
  computed:{
      ...mapState({
          isshow:state=>state.User.isshow
      })
  }
}
</script>

<style lang="scss" scoped>
    #user{
      width: 100%;
      height: 100%;
      background-color: #f7f7f7;
      .userContext{
          width:90%;
          min-height: 20rem;
          margin: 0 auto;
          display: flex;
          background-color: aliceblue;
      }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
