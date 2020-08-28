<!-- 分组列表 -->
<template>
  <div class="group">
    <p class="groTitle">
      分组管理
      <el-button icon="el-icon-plus" type="primary" size="small">添加</el-button>
      <el-tooltip class="item" effect="dark" content="刷新数据" placement="bottom">
        <i class="el-icon-refresh"></i>
      </el-tooltip>
    </p>
    <!-- <div class="" style="padding:10px;">
      <el-row>
        <el-col :span="2"><div class="groupTitle">ID</div></el-col>
        <el-col :span="4"><div class="groupTitle">用户名</div></el-col>
        <el-col :span="2"><div class="groupTitle">昵称</div></el-col>
        <el-col :span="5"><div class="groupTitle">所属组别</div></el-col>
        <el-col :span="3"><div class="groupTitle">Email</div></el-col>
        <el-col :span="2"><div class="groupTitle">状态</div></el-col>
        <el-col :span="4"><div class="groupTitle">最后登录</div></el-col>
        <el-col :span="2"><div class="groupTitle">操作</div></el-col>
      </el-row>
      <div class="" style="minHeight:600px;">
        <el-row class="ordList">
          <el-col :span="2"><div class="groupCon">ID</div></el-col>
          <el-col :span="4"><div class="groupCon">用户名</div></el-col>
          <el-col :span="2"><div class="groupCon">昵称</div></el-col>
          <el-col :span="5"><div class="groupCon">所属组别</div></el-col>
          <el-col :span="3"><div class="groupCon">Email</div></el-col>
          <el-col :span="2"><div class="groupCon">状态</div></el-col>
          <el-col :span="4"><div class="groupCon">最后登录</div></el-col>
          <el-col :span="2"><div class="groupCon">操作</div></el-col>
        </el-row>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "Group",
  data: () => ({
    groList:[]
  }),
  created(){
    this.getGro()
  },
  methods:{
    getGro(){
      this.$http.getListAPI('authgroup?page=1&limit=15').then(res=>{
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.group{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  .groTitle{
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
    button{
      position: absolute;
      right:80px;
      top:50%;
      margin-top: -15px;
    }
  }
  .groupTitle{
    background: $tabColor;
    line-height: 40px;
    font-size: 15px;
    text-align: center;
    color:white;
  }
  .groupCon{
    line-height: 40px;
    text-align: center;
  }
  .ordList:nth-of-type(odd){
    background: #eee;
  }
}
</style>
