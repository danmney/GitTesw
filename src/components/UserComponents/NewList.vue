<template>
    <div class="newList">
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
                {id:1,name:"我的消息"},
                {id:2,name:"消息"}
            ]
        }
    }
}
</script>

<style>

</style>
