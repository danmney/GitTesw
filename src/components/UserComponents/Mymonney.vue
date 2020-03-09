<template>
    <div class="mymoney">
        <Curmbs :curmbs="curmbs"/>
    </div>
</template>

<script>
import Curmbs from "./Curmbs"
export default {
    components:{
        Curmbs
    },
    data(){
        return{ 
            curmbs:[
                {id:1,name:"个人中心"},
                {id:2,name:"我的钱包"}
            ]
        }
    }
}
</script>

<style>

</style>
