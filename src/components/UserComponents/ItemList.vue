<template>
    <div class="itemList">
        <Curmbs :curmbs="curmbs"/>
        <img class="loadingImg" v-if="!tableData.length" src="@/assets/loading.gif" alt="正在加载">
        <div v-else class="content">
            <div class="contentList">
                <el-table
                :data="tableData"
                style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="ln"
                        width="40s">
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        label="姓名"
                        width="75">
                    </el-table-column>
                    <el-table-column
                        prop="ordersId"
                        label="订单号"
                        width="155">
                    </el-table-column>
                    <el-table-column
                        prop="goodsNum"
                        label="数量"
                        width="50"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="price"
                        label="单价(￥)"
                        width="80">
                    </el-table-column>
                     <el-table-column
                        prop="date"
                        label="创建日期"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址"
                        width="200">
                    </el-table-column>
                     <el-table-column
                        prop="remarks"
                        label="留言"
                        width="260">
                    </el-table-column>
                </el-table>
            </div>
            <div class="paging">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[5, 10, 20, 30]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
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
                {id:1,name:"订单大厅"},
                {id:2,name:"订单列表"}
            ],
            tableData: [],
            total:null,
            pagesize:10,
            pageIndex:1
        }
    },
    methods:{
        getdata(){
            let pageIndex = this.pageIndex;
            let pagesize = this.pagesize;
            this.tableData=[];
            this.$http.get("/users/itemList",{
                pageIndex,pagesize
            })
            .then(res=>{
                //获取总页数
                this.total=res.num[0]["count(*)"]
                //循环列表数据加入表格
                res.msg.forEach(item=>{
                    let obj = {};
                    obj.id=item.id;
                    obj.userName=item.createUser;
                    obj.ordersId=item.orderId;
                    obj.goodsNum=item.goodsNum;
                    obj.price=item.price;
                    obj.date=item.createTime;
                    obj.address=item.addres;
                    obj.remarks=item.remarks;
                    this.tableData.push(obj);
                })
            }).catch(err=>{
                alert(err)
            })
        },
        handleSizeChange(val) {
            //每页条数发生改变
            this.pagesize=val;
            this.getdata();
        },
        handleCurrentChange(val) {
            //当前页发生改变
            this.pageIndex=val;
            this.getdata();
        }
    },
    mounted(){
        this.getdata();
    }
}
</script>

<style lang="scss">
    .itemList{
        .loadingImg{
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
        }
        .content{
            width: 100%;
            padding: 1rem;
        }
    }
</style>
