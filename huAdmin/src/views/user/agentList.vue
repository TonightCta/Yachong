<!-- 代理列表 -->
<template lang="html">
  <div class="agentList">
    <p class="ageTitle">代理列表
      <el-tooltip class="item" effect="dark" content="刷新数据" placement="bottom">
        <i class="el-icon-refresh" @click="refeUser()"></i>
      </el-tooltip>
    </p>
    <div class="search">
      <ul>
        <li>
          微信昵称&nbsp;:
          <el-input type="primary" placeholder="请输入微信昵称" v-model="searchMes.nickname" style="width:70%;"></el-input>
        </li>
        <li>
          手机号&nbsp;:
          <el-input type="primary" placeholder="请输入用户手机号" v-model="searchMes.mobile" style="width:70%;"></el-input>
        </li>
        <li>
          &nbsp;&nbsp;用户ID&nbsp;:
          <el-input type="primary" placeholder="请输入用户ID" v-model="searchMes.id" style="width:70%;"></el-input>
        </li>
        <li>
          <el-button icon="el-icon-search" type='primary' @click="searchUser()"></el-button>
          <el-button icon="el-icon-circle-close" type='primary' @click="getAgeList()"></el-button>
        </li>
      </ul>
    </div>
    <div class="" style="padding:10px;">
      <el-row>
        <el-col :span="3"><div class="agCTitle">微信昵称</div></el-col>
        <el-col :span="2"><div class="agCTitle">真实姓名</div></el-col>
        <el-col :span="2"><div class="agCTitle">性别</div></el-col>
        <el-col :span="2"><div class="agCTitle">代理星级</div></el-col>
        <el-col :span="2"><div class="agCTitle">余额</div></el-col>
        <el-col :span="2"><div class="agCTitle">代理费</div></el-col>
        <el-col :span="2"><div class="agCTitle">手机</div></el-col>
        <el-col :span="2"><div class="agCTitle">下级用户</div></el-col>
        <el-col :span="2"><div class="agCTitle">分享码</div></el-col>
        <el-col :span="3"><div class="agCTitle">到期时间</div></el-col>
        <el-col :span="2"><div class="agCTitle">操作</div></el-col>
      </el-row>
      <noData ref="noData"/>
      <div class="" style="minHeight:600px;" v-loading="ageLoading">
        <el-row class="ageList" v-for="(ageMes,indexAge) in ageList" :key="indexAge">
          <el-col :span="3"><div class="agCCon">{{ageMes.nickname}}</div></el-col>
          <el-col :span="2"><div class="agCCon">
            <span v-if="ageMes.realname!=''&&ageMes.realname!=null">{{ageMes.realname}}</span>
            <span v-else>未填写</span>
          </div></el-col>
          <el-col :span="2"><div class="agCCon">
            <span v-if="ageMes.sex!=''&&ageMes.sex!=null">{{ageMes.sex}}</span>
            <span v-else>未填写</span>
          </div></el-col>
          <el-col :span="2"><div class="agCCon">{{ageMes.identity}}级</div></el-col>
          <el-col :span="2"><div class="agCCon">{{ageMes.balance}}</div></el-col>
          <el-col :span="2"><div class="agCCon">
            <span v-if="ageMes.identity==0">-</span>
            <span v-if="ageMes.identity==1">3000.00</span>
            <span v-if="ageMes.identity==2">6000.00</span>
            <span v-if="ageMes.identity==3">10000.00</span>
            <span v-if="ageMes.identity==4">30000.00</span>
            <span v-if="ageMes.identity==5">50000.00</span>
          </div></el-col>
          <el-col :span="2"><div class="agCCon">
            <span v-if="ageMes.mobile!=''&&ageMes.mobile!=null">{{ageMes.mobile}}</span>
            <span v-else>未填写</span>
          </div></el-col>
          <el-col :span="2"><div class="agCCon">{{ageMes.child}}&nbsp;个</div></el-col>
          <el-col :span="2"><div class="agCCon">{{ageMes.share_code}}</div></el-col>
          <el-col :span="3"><div class="agCCon">{{ageMes.expired_date}}</div></el-col>
          <el-col :span="2"><div class="agCCon">
            <i class="el-icon-user" @click="lookUser(indexAge)"></i>&nbsp;｜&nbsp;
            <i class="el-icon-edit" @click="editUser(indexAge)"></i>
          </div></el-col>
        </el-row>
      </div>
    </div>
    <!-- 用户详情 -->
    <div class="">
      <el-dialog
        title="用户详情"
        :visible.sync="userDetails"
        width="30%">
        <div class="editUersBox">
          <ul class="userMesBox">
            <li>真实姓名:</li>
            <li>性别:</li>
            <li>地区:</li>
            <li>手机号:</li>
            <li>代理等级:</li>
            <li>余额:</li>
            <li>保证金:</li>
            <li>代理费:</li>
            <li v-if="userBack.pid!=0">上级ID:</li>
          </ul>
          <ul>
            <li>
              <span v-if="userBack.realname!=null&&userBack.realname!=''">{{userBack.realname}}</span>
              <span v-else>未填写</span>
            </li>
            <li>
              <span v-if="userBack.sex==0">未填写</span>
              <span v-if="userBack.sex==1">男</span>
              <span v-if="userBack.sex==2">女</span>
            </li>
            <li>
              <span v-if="userBack.city!=null&&userBack.city!=''">{{userBack.province}}-{{userBack.city}}</span>
              <span v-else>未填写</span>
            </li>
            <li>
              <span v-if="userBack.mobile!=null&&userBack.mobile!=''">{{userBack.mobile}}</span>
              <span v-else>未填写</span>
            </li>
            <li>
              <span v-if="userBack.agent.identity==1">一星代理</span>
              <span v-if="userBack.agent.identity==2">二星代理</span>
              <span v-if="userBack.agent.identity==3">三星代理</span>
              <span v-if="userBack.agent.identity==4">四星代理</span>
              <span v-if="userBack.agent.identity==5">五星代理</span>
              <span v-if="!userBack.agent.identity">未成为代理</span>
            </li>
            <li>{{userBack.balance}}元</li>
            <li>{{userBack.strategy_balance}}元</li>
            <li>
              <span v-if="userBack.agent.identity==1">3000.00元</span>
              <span v-if="userBack.agent.identity==2">6000.00元</span>
              <span v-if="userBack.agent.identity==3">10000.00元</span>
              <span v-if="userBack.agent.identity==4">30000.00元</span>
              <span v-if="userBack.agent.identity==5">50000.00元</span>
              <span v-if="!userBack.agent.identity">未成为代理</span>
            </li>
            <li v-if="userBack.pid!=0">{{userBack.pid}}</li>
          </ul>
           <!-- Atom Material Ui -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="userDetails = false">关&nbsp;闭</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 编辑用户 -->
    <div class="">
      <el-dialog
        title="编辑用户"
        :visible.sync="editUersBox"
        width="45%">
        <div class="editUersBox">
          <ul>
            <li>真实姓名:</li>
            <li>地区:</li>
            <li>手机号:</li>
            <li>代理等级:</li>
            <!-- <li>VIP:</li> -->
          </ul>
          <ul>
            <li>
              <el-input type="primary" placeholder="请输入真实姓名" v-model="editMes.realname"></el-input>
            </li>
            <li>
              <el-select v-model="provText" placeholder="省级" @change="turnProv">
                 <el-option
                   v-for="(item,index) in provList"
                   :key="index"
                   :label="item.name"
                   :value="item.name">
                 </el-option>
               </el-select>
               <el-select v-model="cityText" placeholder="市级">
                 <el-option
                   v-for="(item,cityIndex) in cityList"
                   :key="cityIndex"
                   :label="item.name"
                   :value="item.name">
                 </el-option>
               </el-select>
            </li>
            <li>
              <el-input type="number" placeholder="请输入手机号" v-model="editMes.mobile"></el-input>
            </li>
            <li>
              <el-select v-model="agentIde" placeholder="代理星级">
                <el-option
                  v-for="item in agentList"
                  :key="item.text"
                  :label="item.text"
                  :value="item.code">
                </el-option>
              </el-select>
            </li>
            <!-- <li>
              <el-radio v-model="editMes.vip" :label="0">否</el-radio>
              <el-radio v-model="editMes.vip" :label="1">是</el-radio>
            </li> -->
          </ul>
           <!-- Atom Material Ui -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editUersBox = false">关&nbsp;闭</el-button>
          <el-button type="primary" @click="subEditor()"
          v-loading="btnLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :disable="btnLoading"
          >提&nbsp;交</el-button>
        </span>
      </el-dialog>
    </div>
    <p class="paperBox">
      <el-pagination
       @current-change="handleCurrentChange"
       :current-page.sync="currentPage3"
       :page-size="100"
       layout="prev, pager, next, jumper"
       :total="agePage">
     </el-pagination>
    </p>
  </div>
</template>

<script>
import Axios from 'axios'
import noData from '@/components/noData'
export default {
  components:{noData},
  data(){
    return{
      ageList:[],
      currentPage3:1,//分页器默认页码
      agePage:10,
      ageLoading:false,
      searchMes:{//用户搜索
        nickname:'',
        mobile:'',
        id:''
      },
      userDetails:false,//代理详情
      userBack:{
        realname:null,
        sex:null,
        province:null,
        city:null,
        mobile:null,
        agent:{
          identity:null
        },
        pid:null,
        balance:null,
        strategy_balance:null,
      },
      btnLoading:false,//按钮加载
      editMes:{//编辑代理
        realname:null,
        address:null,
        mobile:null,
        agent:null,
        vip:null,
      },
      provList:[],//省列表
      cityList:[],//市列表
      provText:null,//选中省
      cityText:null,//选中市
      placeMes:{},
      agentIde:null,//地址数据
      editUersBox:false,
      agentList:[
        {
          code:1,
          text:'一星代理'
        },
        {
          code:2,
          text:'二星代理'
        },
        {
          code:3,
          text:'三星代理'
        },
        {
          code:4,
          text:'四星代理'
        },
        {
          code:5,
          text:'五星代理'
        },
      ],
    }
  },
  created(){
    this.getPlace()
  },
  mounted(){
    this.getAgeList();
  },
  methods:{
    handleCurrentChange(val) {
      this.getAgeList()
    },
    getAgeList(){
      this.searchMes={
        nickname:'',
        mobile:'',
        id:''
      }
      this.ageLoading=true;
      this.$http.getListAPI('agent?page'+this.currentPage3+'&limit=15').then(res=>{
        if(res.data.state==1){
          this.ageList=res.data.data.list;
          this.agePage=(res.data.data.pagination.total/15)*100;;
          this.ageLoading=false;
          this.$refs.noData.isHasData(this.ageList)
        }
      }).catch(err=>{
        this.ageLoading=false;
      })
    },
    searchUser(){//搜索用户
      let mes=this.searchMes;
      let name=mes.nickname;
      let mobile=mes.mobile;
      let id=mes.id;
      if(name!=''&&name!=null||mobile!=''&&mobile!=null||id!=''&&id!=null){
        this.ageLoading=true;
        this.$http.getListAPI('agent?nickname='+name+'&user_id='+id+'&mobile='+mobile).then(res=>{
          if(res.data.state==1){
            this.ageLoading=false;
            this.ageList=res.data.data.list;
            this.agePage=(res.data.data.pagination.total/15)*100;;
            this.$refs.noData.isHasData(this.ageList)
          }else{
            this.ageLoading=false;
          }
        }).catch(err=>{
          this.ageLoading=false;
        })
      }else{
        this.getAllUser()
      }
    },
    turnProv(prov){//选中省
      this.cityList=[];
      this.provList.forEach((e)=>{
        if(prov===e.name){
          prov=e.code
        }
      })
      this.cityText=null;
      for(let i in this.placeMes.city_list){
        if(prov.substring(0,2)===i.substring(0,2)){
          let city={
            code:i,
            name:this.placeMes.city_list[i]
          };
          this.cityList.push(city)
        }
      }
    },
    refeUser(){//刷新数据
      let mes=this.searchMes;
      let name=mes.nickname;
      let mobile=mes.mobile;
      let id=mes.id;
      if(name!=''&&name!=null||mobile!=''&&mobile!=null||id!=''&&id!=null){
        this.searchUser()
      }else{
        this.getAllUser()
      }
    },
    lookUser(index){//查看用户详情
      this.$http.getListAPI('user/'+this.ageList[index].user_id).then(res=>{
        if(res.data.state==1){
          this.userBack=res.data.data;
          this.userDetails=true;
        }
      })
    },
    editUser(index){//编辑代理
      this.editMes=this.ageList[index];
      this.agentIde=this.ageList[index].identity
      this.editUersBox=true;
      this.provText=this.editMes.province
      this.cityText=this.editMes.city;
      if(this.cityText!=null&&this.cityText!=''){
        let code=null;
        this.provList.forEach((e)=>{
          if(this.provText===e.name){
            code=e.code
          }
        });
        this.cityList=[]
        for(let i in this.placeMes.city_list){
          if(code.substring(0,2)===i.substring(0,2)){
            let city={
              code:i,
              name:this.placeMes.city_list[i]
            };
            this.cityList.push(city)
          }
        }
      }
    },
    getPlace(){
      Axios.get('../../../static/place.json').then(res=>{
        for(let i in res.data.province_list){
          let prov={
            code:i,
            name:res.data.province_list[i]
          };
          this.provList.push(prov)
        };
        this.placeMes=res.data;
      })
    },
    subEditor(){//提交编辑
      if(this.editMes.realname==''||this.editMes.realname==null){
        this.$message.error('请输入真实姓名')
      }else if(this.cityText==''||this.cityText==null){
        this.$message.error('请选择地区')
      }else if(this.editMes.mobile==''||this.editMes.mobile==null){
        this.$message.error('请输入手机号')
      }else{
        this.btnLoading=true;
        this.$http.putSomeAPI('user',{
          id:this.editMes.user_id,
          realname:this.editMes.realname,
          mobile:this.editMes.mobile,
          is_agent:this.agentIde==null?'':this.agentIde,
          // vip:this.editMes.vip,
          province:this.provText,
          city:this.cityText
        }).then(res=>{
          this.btnLoading=false;
          if(res.data.state==1){
            this.$message.success('编辑成功')
            this.getAgeList();
            this.editUersBox=false;
          }
        }).catch(err=>{
          this.btnLoading=false;
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.agentList{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  .ageTitle{
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
  .search{
    width: 100%;
    padding: 20px 60px;
    box-sizing: border-box;
    ul{
      width: 100%;
      display: flex;
      justify-content: space-between;
      li{
        width: 25%;
        margin-bottom: 20px;
        text-align: center;
      }
      li:last-child{
        width: 15%;
      }
    }
    p{
      margin-top: 30px;
      text-align: right;
    }
  }
  .agCTitle{
    line-height: 40px;
    text-align: center;
    background: $tabColor;
    color:white;
    font-size: 15px;
    font-weight: bold;
  }
  .agCCon{
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    i{
      font-size: 20px;
      color:$tabColor;
      cursor: pointer;
    }
  }
  .ageList:nth-of-type(odd){
    background: #eee;
  }
  .editUersBox{
    width: 100%;
    display: flex;
    .userMesBox{
      width: 30%!important;
      box-sizing: border-box;
      padding-right: 10px;
    }
    ul:first-child{
      width: 20%;
      line-height: 60px;
      text-align: right;
    }
    ul:last-child{
      line-height: 60px;
      box-sizing: border-box;
      padding-left: 15px;
    }
  }
  .el-pagination{
    text-align: right;
    box-sizing: border-box;
    padding-right: 30px;
  }
}
</style>
