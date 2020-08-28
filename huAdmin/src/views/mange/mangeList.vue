<!-- 账号管理 -->
<template lang="html">
  <div class="mangeList">
    <p class="mangeTitle">
      后台用户列表
      <el-button icon="el-icon-plus" type="primary" size="small" @click="addPass=true">添加账户</el-button>
      <el-tooltip class="item" effect="dark" content="刷新数据" placement="bottom">
        <i class="el-icon-refresh" @click="getManList()"></i>
      </el-tooltip>
    </p>
    <div class="" style="padding:10px;">
      <el-row>
        <el-col :span="6"><div class="mangeCTitle">登录名</div></el-col>
        <el-col :span="6"><div class="mangeCTitle">用户状态</div></el-col>
        <el-col :span="6"><div class="mangeCTitle">最后登录</div></el-col>
        <el-col :span="6"><div class="mangeCTitle">操作</div></el-col>
      </el-row>
      <div class="" style="minHeight:600px;" v-loading="manLoading">
        <el-row class="mangeListCon" v-for="(mangeMes,indexMan) in mangeList" :key="indexMan">
          <el-col :span="6"><div class="mangeCCon">{{mangeMes.account}}</div></el-col>
          <el-col :span="6"><div class="mangeCCon">
            <span v-if="mangeMes.is_lock==0" style="color:green;">正常</span>
            <span v-else style="color:red;">已锁定</span>
          </div></el-col>
          <el-col :span="6"><div class="mangeCCon">{{mangeMes.login_time}}</div></el-col>
          <el-col :span="6"><div class="mangeCCon">
            <i class="el-icon-edit" @click="resSetPass(indexMan)"></i>&nbsp;&nbsp;
            <i class="el-icon-delete-solid" @click="delMang(indexMan)"></i>
            <!-- <span>删除</span> -->
          </div></el-col>
        </el-row>
      </div>
    </div>
    <!-- 重置密码 -->
    <div class="">
      <el-dialog
        title="编辑账户"
        :visible.sync="resetPass"
        width="40%">
        <div class="resetPass">
          <ul>
            <li><span style="color:red;">*</span>所属组别&nbsp;:</li>
            <li><span style="color:red;">*</span>登录密码:</li>
            <li><span style="color:red;">*</span>确认密码:</li>
          </ul>
          <ul>
            <li>
              <el-select v-model="groupChoice" placeholder="请选择"  style="width:100%;">
                 <el-option
                   v-for="item in groupChoiceList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.name">
                 </el-option>
              </el-select>
            </li>
            <li>
              <el-input :type="passShow" v-model="resetMes.password" placeholder="请输入密码"></el-input>
              <i class="el-icon-unlock" v-if="passShow=='password'" @click="passShow='primary'"></i>
              <i class="el-icon-lock" v-else @click="passShow='password'"></i>
            </li>
            <li>
              <el-input :type="turnPassShow" v-model="resetMes.turnPass" placeholder="请再次输入密码"></el-input>
              <i class="el-icon-unlock" v-if="turnPassShow=='password'" @click="turnPassShow='primary'"></i>
              <i class="el-icon-lock" v-else @click="turnPassShow='password'"></i>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetPass = false">关&nbsp;闭</el-button>
          <el-button type="primary" @click="subEditPass()"
          v-loading="btnLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          >提&nbsp;交</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 添加账户 -->
    <div class="">
      <el-dialog
        title="重置密码"
        :visible.sync="addPass"
        width="40%">
        <div class="resetPass">
          <ul>
            <li><span style="color:red;">*</span>所属组别&nbsp;:</li>
            <li><span style="color:red;">*</span>登录账号&nbsp;:</li>
            <li><span style="color:red;">*</span>登录密码&nbsp;:</li>
            <li><span style="color:red;">*</span>确认密码&nbsp;:</li>
          </ul>
          <ul>
            <li>
              <el-select v-model="addPassMes.groupChoice" placeholder="请选择"  style="width:100%;">
                 <el-option
                   v-for="item in groupChoiceList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
                 </el-option>
              </el-select>
            </li>
            <li>
              <el-input type="primary" v-model="addPassMes.accNum" placeholder="请输入登录账号"></el-input>
            </li>
            <li>
              <el-input :type="addPassShow" v-model="addPassMes.password" placeholder="请输入密码"></el-input>
              <i class="el-icon-unlock" v-if="addPassShow=='password'" @click="addPassShow='primary'"></i>
              <i class="el-icon-lock" v-else @click="addPassShow='password'"></i>
            </li>
            <li>
              <el-input :type="addTurnPassShow" v-model="addPassMes.turnPass" placeholder="请再次输入密码"></el-input>
              <i class="el-icon-unlock" v-if="addTurnPassShow=='password'" @click="addTurnPassShow='primary'"></i>
              <i class="el-icon-lock" v-else @click="addTurnPassShow='password'"></i>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addPass = false">关&nbsp;闭</el-button>
          <el-button type="primary" @click="subAddAcc()"
          v-loading="btnLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          >提&nbsp;交</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 分页器 -->
    <p class="paperBox">
      <el-pagination
       @current-change="handleCurrentChange"
       :current-page.sync="currentPage3"
       :page-size="100"
       layout="prev, pager, next, jumper"
       :total="manPage">
     </el-pagination>
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      mangeList:[],
      currentPage3:1,//分页器默认页码
      resetPass:false,//重置密码
      resetMes:{
        password:null,
        turnPass:null,
      },
      passShow:'password',//显示密码
      turnPassShow:'password',//显示确认密码
      addPass:false,//添加账户
      addPassMes:{
        accNum:null,
        password:null,
        turnPass:null,
        groupChoice:null,
      },
      addPassShow:'password',
      addTurnPassShow:'password',
      manLoading:false,//列表loading
      manPage:10,//总页数
      btnLoading:false,//按钮加载
      mangeID:null,//账号ID
      groupChoice:null,//所属组别
      groupChoiceList: [],
    }
  },
  watch:{
    resetPass(val,oldVal){
      if(!val){
        this.resetMes={
          password:null,
          turnPass:null,
        }
      }
    },
    addPass(val,oldVal){
      if(!val){
        this.addPassMes={
          accNum:null,
          password:null,
          turnPass:null,
          groupChoice:null,
        }
      }
    }
  },
  created(){
    this.getManList();
    this.getGroup()
  },
  methods:{
    handleCurrentChange(val) {
      this.getManList()
    },
    resSetPass(index){//重置密码
      this.resetPass=true;
      this.mangeID=this.mangeList[index].id;
      this.groupChoiceList.forEach((e)=>{
        if(this.mangeList[index].id==e.id){
          this.groupChoice=e.name
        }
      })
    },
    getManList(){
      this.manLoading=true;
      this.$http.getListAPI('admin?page='+this.currentPage3+'&limit=15').then(res=>{
        if(res.data.state==1){
          this.manLoading=false;
          this.mangeList=res.data.data.list;
          this.manPage=(res.data.data.pagination.total/15)*100;
        }
      }).catch(err=>{
        this.manLoading=false;
      })
    },
    delMang(_html){//删除当前账户
      this.$confirm('此操作将删除当前账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.deleteListAPI('admin',{
            id:this.mangeList[_html].id
          }).then(res=>{
            if(res.data.state==1){
              this.$message.success('删除成功');
              this.getManList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
      });
    },
    subEditPass(){//提交修改密码
      if(this.groupChoice==null||this.groupChoice==''){
        this.$message.error('请选择所属组别')
      }else if(this.resetMes.password==null||this.resetMes.password==''){
        this.$message.error('请输入密码')
      }else if(this.resetMes.turnPass==null||this.resetMes.turnPass==''){
        this.$message.error('请再次输入密码')
      }else if(this.resetMes.password!==this.resetMes.turnPass){
        this.$message.error('两次输入密码不一致')
      }else{
        this.btnLoading=true;
        let groupChoiceID=null;
        this.groupChoiceList.forEach((e)=>{
          if(this.groupChoice==e.name){
            groupChoiceID=e.id
          }
        });
        this.$http.putSomeAPI('admin',{
          id:this.mangeID,
          is_lock:0,
          password:this.resetMes.password,
          re_password:this.resetMes.turnPass,
          group_id:groupChoiceID
        }).then(res=>{
          if(res.data.state==1){
            this.$message.success('重置成功')
            this.resetPass=false;
            this.btnLoading=false;
          }else{
            this.btnLoading=false;
          }
        }).catch(err=>{
          this.btnLoading=false;
        })
      }
    },
    subAddAcc(){//提交新增账户
      if(this.addPassMes.groupChoice==null||this.addPassMes.groupChoice==''){
        this.$message.error('请选择所属组别')
      }else if(this.addPassMes.accNum==null||this.addPassMes.accNum==''){
        this.$message.error('请输入账号')
      }else if(this.addPassMes.password==null||this.addPassMes.password==''){
        this.$message.error('请输入密码')
      }else if(this.addPassMes.turnPass==null||this.addPassMes.turnPass==''){
        this.$message.error('请再次输入密码')
      }else if(this.addPassMes.password!==this.addPassMes.turnPass){
        this.$message.error('两次输入密码不一致')
      }else{
        this.btnLoading=true;
        this.$http.postFormAPI('admin',{
          account:this.addPassMes.accNum,
          password:this.addPassMes.password,
          re_password:this.addPassMes.turnPass,
          group_id:this.addPassMes.groupChoice
        }).then(res=>{
          if(res.data.state==1){
            this.$message.success('添加成功');
            this.btnLoading=false;
            this.addPass=false;
            this.getManList();
          }else{
            this.btnLoading=false;
          }
        }).catch(err=>{
          this.btnLoading=false;
        })
      }
    },
    getGroup(){
      this.$http.getListAPI('authgroup?page=1&limit=').then(res=>{
        if(res.data.state==1){
          this.groupChoiceList=res.data.data.list;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mangeList{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  .mangeTitle{
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
  .mangeCTitle{
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    font-weight: bold;
    background: $tabColor;
    color: white;
  }
  .mangeCCon{
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    i{
      color:$tabColor;
      cursor:pointer;
      font-size: 20px;
    }
  }
  .mangeListCon:nth-of-type(odd){
    background: #eee;
  }
  .el-pagination{
    text-align: right;
    box-sizing: border-box;
    padding-right: 30px;
  }
  .resetPass{
    width: 80%;
    margin:0 auto;
    display: flex;
    justify-content: space-around;
    ul{
      width: 20%;
      li{
        line-height: 50px;
        text-align: right;
        .el-icon-unlock{
          color:$tabColor;
        }
        .el-icon-lock{
          color:red;
        }
      }
    }
    ul:last-child{
      width: 80%;
      li{
        text-align: left;
        box-sizing: border-box;
        padding-left: 10px;
        position: relative;
        i{
          font-size: 18px;
          position: absolute;
          right:10px;
          top:50%;
          margin-top: -8px;
          cursor:pointer;
        }
      }
    }
  }
}
</style>
