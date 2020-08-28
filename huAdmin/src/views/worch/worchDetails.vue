<template lang="html">
  <div class="worchDetails">
    <p class="detailsTitle">净值列表
      <el-tooltip class="item" effect="dark" content="刷新数据" placement="bottom">
        <i class="el-icon-refresh" @click="getWorchList()"></i>
      </el-tooltip>
    </p>
    <div class="detailsCon">
      <el-row>
        <el-col :span="4"><div class="conTitle">券商账号</div></el-col>
        <el-col :span="4"><div class="conTitle">策略名称</div></el-col>
        <el-col :span="4"><div class="conTitle">总资产</div></el-col>
        <el-col :span="4"><div class="conTitle">当日收益</div></el-col>
        <el-col :span="4"><div class="conTitle">日期</div></el-col>
        <el-col :span="4"><div class="conTitle">创建时间</div></el-col>
      </el-row>
      <div class="" v-loading="worLoading" style="minHeight:600px;">
        <el-row class="deList" v-for="(deCon,indexDe) in deList" :key="indexDe">
          <el-col :span="4"><div class="conCon">{{deCon.account}}</div></el-col>
          <el-col :span="4"><div class="conCon">{{deCon.strategy}}</div></el-col>
          <el-col :span="4"><div class="conCon">{{deCon.assets}}</div></el-col>
          <el-col :span="4"><div class="conCon">{{deCon.profit}}</div></el-col>
          <el-col :span="4"><div class="conCon">{{deCon.date}}</div></el-col>
          <el-col :span="4"><div class="conCon">{{deCon.create_time}}</div></el-col>
        </el-row>
      </div>
      <p class="paperBox">
        <el-pagination
         @current-change="handleCurrentChange"
         :current-page.sync="currentPage3"
         :page-size="100"
         layout="prev, pager, next, jumper"
         :total="worPage">
       </el-pagination>
      </p>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  data(){
    return{
      deList:[],
      worLoading:false,
      currentPage3: 1,//分页器默认页码
      worPage:10,
    }
  },
  created(){
    this.getWorchList()
  },
  methods:{
    handleCurrentChange(val) {
      this.getWorchList()
    },
    getWorchList(){
      this.worLoading=true;
      this.$http.getListAPI('profit?page='+this.currentPage3+'&limit=15').then((res)=>{
        if(res.data.state==1){
          this.worLoading=false;
          this.worPage=(res.data.data.pagination.total/15)*100;
          this.deList=res.data.data.list;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.worchDetails{
  width: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  .detailsTitle{
    width: 100%;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    position: relative;
    i{
      color:#545c64;
      font-size: 40px;
      position: absolute;
      right:20px;
      top:50%;
      margin-top: -20px;
      cursor: pointer;
    }
  }
  .detailsCon{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    .conTitle{
      line-height: 40px;
      color:white;
      background: $tabColor;
      font-size: 15px;
      font-weight: bold;
      text-align: center;
    }
    .conCon{
      text-align: center;
      line-height: 40px;
      font-size: 14px;
    }
    .deList:nth-of-type(odd){
      background: #eee;
    }
  }
  .el-pagination{
    text-align: right;
    box-sizing: border-box;
    padding-right: 30px;
  }
}
</style>
