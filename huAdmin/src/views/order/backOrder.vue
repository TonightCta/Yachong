<!-- 订单管理 -->
<template lang="html">
  <div class="orderTion">
    <p class="ordTitle">
      <span>订单筛选:

      </span>

    </p>
    <!-- 订单搜索 -->
    <div class="tiSearch">
      <ul>
        <li>
          用户ID:
          <el-input type="primary" v-model="searchID" placeholder="请输入用户ID" style="width:50%;" size="medium"></el-input>
        </li>
        <li>
          <el-button type="primary" icon="el-icon-search" size="medium" @click="filGetOrder()"></el-button>
          <el-button type="primary" icon="el-icon-circle-close" size="medium" @click="clearSearch()"></el-button>
        </li>
        <li>
          订单筛选:
          <el-select v-model="orderState" placeholder="订单状态" @change="filOrder" style="width:50%;" size="medium">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-tooltip class="item" effect="dark" content="刷新数据" placement="bottom">
            <i class="el-icon-refresh" @click="refreshOrder()"></i>
          </el-tooltip>
        </li>
      </ul>
    </div>
    <div class="" style="padding:10px;">
      <el-row>
        <el-col :span="2"><div class="ordCTitle">名称</div></el-col>
        <el-col :span="2"><div class="ordCTitle">退款方式</div></el-col>
        <el-col :span="4"><div class="ordCTitle">退款卡号</div></el-col>
        <el-col :span="4"><div class="ordCTitle">开户行地址</div></el-col>
        <el-col :span="2"><div class="ordCTitle">真实姓名</div></el-col>
        <el-col :span="2"><div class="ordCTitle">退款金额</div></el-col>
        <el-col :span="2"><div class="ordCTitle">退款状态</div></el-col>
        <el-col :span="2"><div class="ordCTitle">退款时间</div></el-col>
        <el-col :span="2"><div class="ordCTitle">退款单号</div></el-col>
        <el-col :span="2"><div class="ordCTitle">操作</div></el-col>
      </el-row>
      <p style="textAlign:center;lineHeight:50px;color:#aaa;fontSize:18px;marginTop:30px;" v-if="isHasOrd">暂无更多数据</p>
      <div class="" style="minHeight:600px;" v-loading="orderLoading">
        <el-row class="ordList" v-for="(ordMes,indexOrd) in ordList" :key="indexOrd">
          <el-tooltip class="item" effect="dark" content="点击查看用户信息" placement="bottom">
            <el-col :span="2"><div class="ordCCon" style="cursor:pointer;" @click="checkDe(indexOrd)">{{ordMes.nickname}}</div></el-col>
          </el-tooltip>
          <el-col :span="2"><div class="ordCCon">
            <span v-if="ordMes.type==1">银行卡</span>
            <span v-else>支付宝</span>
          </div></el-col>
          <el-col :span="4"><div class="ordCCon">
            <span v-if="ordMes.cardno!=null&&ordMes.cardno!=''">{{ordMes.cardno}}</span>
            <span v-else>-</span>
          </div></el-col>
          <el-col :span="4"><div class="ordCCon">
            <span v-if="ordMes.bank_kaihu!=null&&ordMes.bank_kaihu!=''">{{ordMes.bank_kaihu}}</span>
            <span v-else>-</span>
          </div></el-col>
          <el-col :span="2"><div class="ordCCon">
            <span v-if="ordMes.realname!=null&&ordMes.realname!=''">{{ordMes.realname}}</span>
            <span v-else>未填写</span>
          </div></el-col>
          <el-col :span="2"><div class="ordCCon">
            <span v-if="ordMes.money!=null&&ordMes.money!=''">{{ordMes.money}}</span>
            <span v-else>-</span>
          </div></el-col>
          <el-col :span="2"><div class="ordCCon">
            <span v-if="ordMes.status==0" style="color:green;">申请退款</span>
            <span v-if="ordMes.status==1" style="color:blue;">审核通过</span>
            <span v-if="ordMes.status==2" style="color:orange;">退款成功</span>
            <span v-if="ordMes.status==3" style="color:red;">退款失败</span>
            <span v-if="ordMes.status==4">审核不通过</span>
          </div></el-col>
          <el-tooltip class="item" effect="dark" :content="ordMes.create_time" placement="bottom">
             <el-col :span="2"><div class="ordCCon" style="cursor:pointer;">{{ordMes.create_time.substring(0,8)}}...</div></el-col>
          </el-tooltip>
          <el-col :span="2"><div class="ordCCon">{{ordMes.id}}</div></el-col>
          <el-col :span="2"><div class="ordCCon">
            <span style="color:#545c64;cursor:pointer;" @click="backOpen(indexOrd)">详情</span> ｜
            <span style="color:#545c64;cursor:pointer;" @click="editOpen(indexOrd)">编辑</span>
          </div></el-col>
        </el-row>
      </div>
    </div>
    <!-- 退款详情 -->
    <div class="">
      <el-dialog
        title="退款详情"
        :visible.sync="backBox"
        width="30%">
        <div class="ordExaV">
          <ul>
            <li>名称:</li>
            <li>退款方式:</li>
            <li>退款金额:</li>
            <li>退款状态:</li>
            <li>退款时间:</li>
          </ul>
          <ul>
            <li>{{backMes.remark}}</li>
            <li>
              <span v-if="backMes.type==1">银行卡</span>
              <span v-else>支付宝</span>
            </li>
            <li>{{backMes.money}}</li>
            <li>
              <span v-if="backMes.status==0">待退款</span>
              <span v-if="backMes.status==1">审核通过</span>
              <span v-if="backMes.status==2">退款成功</span>
              <span v-if="backMes.status==3">退款失败</span>
              <span v-if="backMes.status==4">审核不通过</span>
            </li>
            <li>{{backMes.create_time}}</li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="backBox = false">关&nbsp;闭</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 编辑退款 -->
    <div class="">
      <el-dialog
        title="编辑退款"
        :visible.sync="editBack"
        width="50%">
        <div class="ordExaV">
          <ul>
            <li>名称:</li>
            <li>退款方式:</li>
            <li>退款金额:</li>
            <li>退款状态:</li>
            <li>退款时间:</li>
          </ul>
          <ul>
            <li>{{backMes.remark}}</li>
            <li>
              <span v-if="backMes.type==1">银行卡</span>
              <span v-else>支付宝</span>
            </li>
            <li>{{backMes.money}}</li>
            <li>
              <el-radio v-model="backMes.status" :label="1">审核通过</el-radio>
              <el-radio v-model="backMes.status" :label="2">退款成功</el-radio>
              <el-radio v-model="backMes.status" :label="3">退款失败</el-radio>
              <el-radio v-model="backMes.status" :label="4">审核不通过</el-radio>
            </li>
            <li>{{backMes.create_time}}</li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editBack = false">关&nbsp;闭</el-button>
          <el-button type="primary"
          v-loading="btnLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :disable="btnLoading"
          @click="editBackJS()"
          >提交</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 用户信息 -->
    <div class="">
      <el-dialog
        title="用户详情"
        :visible.sync="cusMesBox"
        width="30%">
        <div class="ordExaV">
          <ul>
            <li>用户ID:</li>
            <li>微信名:</li>
            <li>真实姓名:</li>
            <li>联系方式:</li>
            <li>地区:</li>
          </ul>
          <ul>
            <li>{{cusMesOp.id}}</li>
            <li>{{cusMesOp.nickname}}</li>
            <li>
              <span v-if="cusMesOp.realname!=null&&cusMesOp.realname!=''">{{cusMesOp.realname}}</span>
              <span v-else>未填写真实姓名</span>
            </li>
            <li>{{cusMesOp.mobile}}</li>
            <li>
              <span v-if="cusMesOp.city!=null&&cusMesOp.city!=''">{{cusMesOp.province}}-{{cusMesOp.city}}</span>
              <span v-else>未选择地区</span>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cusMesBox = false">关&nbsp;闭</el-button>
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
       :total="ordPage">
     </el-pagination>
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      orderState:null,//订单状态
      options: [
        {
          value: -1,
          label: '全部退款'
        },
        {
          value: 0,
          label: '待退款'
        },
        {
          value: 1,
          label: '审核通过'
        }, {
          value: 2,
          label: '退款成功'
        },{
          value: 3,
          label: '退款失败'
        },{
          value: 4,
          label: '审核未通过'
        }
      ],
      ordList:[],
      currentPage3:1,//分页器默认页码
      ordState:0,
      orderLoading:false,
      ordPage:10,
      btnLoading:false,
      btnLoading1:false,
      btnLoading2:false,
      btnLoading3:false,
      ordEnd:false,
      endMes:{
        strategy_name:null,//策略名称
        amt:null,//应收佣金
        profit:null,//累计收益
        create_time:null,//下单时间
        investment_amount:null,
      },
      endID:null,
      backStatus:0,
      isHasOrd:false,//是否有数据
      backBox:false,//退款详情
      backMes:{
        remark:null,
        type:0,
        status:10,
        money:null,
        create_time:null
      },
      editBack:false,//编辑退款
      editState:1,
      cusMesBox:false,//用户详情
      cusMesOp:{
        id:null,
        nickname:null,
        address:null,
        realname:null,
        mobile:null,
      },
      searchID:'',//搜索ID
    }
  },
  watch:{
    ordList(val,oldVal){
      if(val.length<1){
        this.isHasOrd=true;
      }else{
        this.isHasOrd=false;
      }
    }
  },
  created(){
    this.getOrderlist()
  },
  methods:{
    handleCurrentChange(val) {
      if(this.backStatus==0&&this.searchID==''){
        this.getOrderlist()
      }else{
        this.filGetOrder()
      }
    },
    getOrderlist(){
      this.orderLoading=true;
      this.$http.getListAPI('tixian?page='+this.currentPage3+'&limit=15&is_bzj=1&user_id='+this.searchID).then(res=>{
        if(res.data.state==1){
          this.ordList=res.data.data.list;
          this.ordPage=(res.data.data.pagination.total/15)*100;;
          this.orderLoading=false;
        }
      }).catch(err=>{
        this.orderLoading=false;
      })
    },
    filGetOrder(){
      this.orderLoading=true;
      let state=this.ordState!=-1?'&status='+this.ordState+'&user_id='+this.searchID:'&user_id='+this.searchID
      this.$http.getListAPI('tixian?page='+this.currentPage3+"&limit=15&is_bzj=1"+state).then(res=>{
        if(res.data.state==1){
          this.ordList=res.data.data.list;
          this.ordPage=(res.data.data.pagination.total/15)*100;;
          this.orderLoading=false;
        }
      }).catch(err=>{
        this.orderLoading=false;
      })
    },
    filOrder(status){
      this.backStatus=status;
      if(this.backStatus==-1&&this.searchID==''){
        this.getOrderlist()
      }else{
        this.ordState=status;
        this.filGetOrder()
      }
    },
    backOpen(index){//退款详情
      this.$http.getListAPI('tixian/'+this.ordList[index].id).then(res=>{
        if(res.data.state==1){
          this.backMes=res.data.data;
          this.backBox=true;
        }
      })
    },
    editOpen(index){//退款编辑
      this.backMes=this.ordList[index];
      this.editBack=true;
    },
    refreshOrder(){//刷新数据
      if(this.backStatus==0&&this.searchID==''){
        this.getOrderlist()
      }else{
        this.ordState=this.backStatus;
        this.filGetOrder()
      }
    },
    cusMes(index){//客户详情
      this.cusMesOp=this.ordList[index];
      this.cusMesBox=true;
    },
    editBackJS(){//提交编辑
      this.btnLoading=true;
      this.$http.putSomeAPI('tixian',{
        id:this.backMes.id,
        status:this.backMes.status,
        tixian_no:this.backMes.tixian_no
      }).then(res=>{
        this.btnLoading=false;
        if(res.data.state==1){
          this.$message.success('操作成功')
          this.getOrderlist()
        }
      }).catch(err=>{
        this.btnLoading=false;
      })
    },
    checkDe(index){//客户详情
      const loading = this.$loading({
        lock: true,
        text: '注销中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$http.getListAPI('user/'+this.ordList[index].user_id).then(res=>{
        if(res.data.state==1){
          this.cusMesOp=res.data.data;
          this.cusMesBox=true;
          loading.close()
        }
      })
    },
    clearSearch(){
      this.searchID='';
      this.refreshOrder()
    }
  }
}
</script>

<style lang="scss" scoped>
.orderTion{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  .ordTitle{
    width: 100%;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
  }
  .ordCTitle{
    text-align: center;
    background: $tabColor;
    color:white;
    font-size: 15px;
    font-weight: bold;
    line-height: 40px;
  }
  .ordCCon{
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }
  .ordList:nth-of-type(odd){
    background: #eee;
  }
  .el-pagination{
    text-align: right;
    box-sizing: border-box;
    padding-right: 30px;
  }
  .ordExaV{
    width: 80%;
    margin:0 auto;
    display: flex;
    ul{
      li{
        line-height: 50px;
      }
    }
    ul:last-child{
      box-sizing: border-box;
      padding-left: 10px;
    }
  }
  .tiSearch{
    width: 90%;
    margin:0 auto;
    padding: 30px 0;
    ul{
      width: 100%;
      display: flex;
      li{
        width: 50%;
        text-align: center;
        position: relative;
        i{
          color:#545c64;
          font-size: 40px;
          position: absolute;
          right:0;
          top:50%;
          margin-top: -20px;
          cursor: pointer;
        }
      }
      li:nth-child(2){
        text-align: left;
        box-sizing: border-box;
        padding-left: 40px;
      }
    }
  }
}
</style>
