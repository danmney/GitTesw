<template>
    <div class="searchItems">
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
                {id:1,name:"我的订单"},
                {id:2,name:"查找订单"}
            ]
        }
    }
}
</script>

<style>

</style>
