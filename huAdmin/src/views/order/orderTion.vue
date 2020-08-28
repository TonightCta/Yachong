<!-- 订单管理 -->
<template lang="html">
  <div class="orderTion">
    <p class="ordTitle">订单管理</p>
    <!-- 订单搜索 -->
    <div class="tionSearch">
      <ul>
        <li>
          订单编号:
          <el-input type="primary" v-model="search.orderSn" style="width:70%;" size="medium" placeholder="请输入订单编号"></el-input>
        </li>
        <li>
           用户ID:
           <el-input type="primary" v-model="search.userId" style="width:70%;" size="medium" placeholder="请输入用户ID"></el-input>
        </li>
        <li>
          <el-button type="primary" icon="el-icon-search" size="medium" @click="refreshOrder()"></el-button>
          <el-button type="primary" icon="el-icon-circle-close" size="medium" @click="clearSearch()"></el-button>
        </li>
        <li>
           订单筛选:
           <el-select v-model="orderState" placeholder="订单状态" @change="filOrder" size="medium" style="width:70%;">
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
        <el-col :span="4"><div class="ordCTitle">订单号</div></el-col>
        <el-col :span="5"><div class="ordCTitle">策略名称</div></el-col>
        <el-col :span="2"><div class="ordCTitle">微信名</div></el-col>
        <el-col :span="2"><div class="ordCTitle">订单金额</div></el-col>
        <el-col :span="2"><div class="ordCTitle">支付金额</div></el-col>
        <el-col :span="2"><div class="ordCTitle">订单状态</div></el-col>
        <el-col :span="2"><div class="ordCTitle">交易账号</div></el-col>
        <el-col :span="3"><div class="ordCTitle">下单时间</div></el-col>
        <el-col :span="2"><div class="ordCTitle">操作</div></el-col>
      </el-row>
      <p style="textAlign:center;lineHeight:50px;color:#aaa;fontSize:18px;marginTop:30px;" v-if="isHasOrd">暂无更多数据</p>
      <div class="" style="minHeight:600px;" v-loading="orderLoading">
        <el-row class="ordList" v-for="(ordMes,indexOrd) in ordList" :key="indexOrd">
          <el-col :span="4"><div class="ordCCon">{{ordMes.order_sn}}</div></el-col>
          <el-col :span="5"><div class="ordCCon">{{ordMes.content.name}}</div></el-col>
          <el-tooltip class="item" effect="dark" content="点击查看用户信息" placement="bottom">
            <el-col :span="2"><div class="ordCCon" style="cursor:pointer;" @click="cusMes(indexOrd)">{{ordMes.nickname}}</div></el-col>
          </el-tooltip>
          <el-col :span="2"><div class="ordCCon">{{ordMes.order_amount}}</div></el-col>
          <el-col :span="2"><div class="ordCCon">{{ordMes.payed_amount}}</div></el-col>
          <el-col :span="2"><div class="ordCCon">
            <span v-if="ordMes.status==2" style="color:green;">已支付</span>
            <span v-if="ordMes.status==4" style="color:blue;">已结算</span>
            <span v-if="ordMes.status==8" style="color:orange;">已完结</span>
            <span v-if="ordMes.status==1" style="color:red;">未支付</span>
            <span v-if="ordMes.status==-1">异常订单</span>
            <span v-if="ordMes.status==3" style="color:#aaa;">已取消</span>
            <span v-if="ordMes.status==5">申请退款</span>
            <span v-if="ordMes.status==6">退款成功</span>
            <span v-if="ordMes.status==7">退款失败</span>
          </div></el-col>
          <el-col :span="2"><div class="ordCCon">
            <span v-if="ordMes.account_info">{{ordMes.account_info.name}}</span>
            <span v-else>未关联</span>
            <!-- - -->
          </div></el-col>
          <el-col :span="3"><div class="ordCCon">{{ordMes.create_time}}</div></el-col>
          <el-col :span="2"><div class="ordCCon">
            <span style="color:#545c64;cursor:pointer;" @click="texOpen(indexOrd)">审核</span>&nbsp;|
            <span style="color:#545c64;cursor:pointer;" @click="endOrder(indexOrd)">结算</span>
          </div></el-col>
        </el-row>
      </div>
    </div>
    <!-- 审核订单 -->
    <div class="">
      <el-dialog
        title="订单审核"
        :visible.sync="ordExa"
        width="30%">
        <div class="ordExaV">
          <ul>
            <li>订单金额:</li>
            <li>实付金额:</li>
            <li>开户券商:</li>
            <li>交易账号:</li>
            <li>交易密码:</li>
          </ul>
          <ul>
            <li>{{ordMesD.order_amount}}</li>
            <li>{{ordMesD.payed_amount}}</li>
            <li>
              <span v-if="ordMesD.account_info.name!=null&&ordMesD.account_info.name!=''">{{ordMesD.account_info.name}}</span>
              <span v-else>未选择交易券商</span>
            </li>
            <li>
              <span v-if="ordMesD.account_info.account!=null&&ordMesD.account_info.account!=''">{{ordMesD.account_info.account}}</span>
              <span v-else>未输入交易账号</span>
            </li>
            <li>
              <span v-if="ordMesD.account_info.pwd!=null&&ordMesD.account_info.pwd!=''">{{ordMesD.account_info.pwd}}</span>
              <span v-else>未输入交易密码</span>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ordExa = false">关&nbsp;闭</el-button>
          <el-button type="primary"
          v-loading="btnLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :disable="btnLoading"
          @click="exaAdo()">审核通过</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 结算订单 -->
    <div class="">
      <el-dialog
        title="订单结算"
        :visible.sync="ordEnd"
        width="30%">
        <div class="ordExaV">
          <ul>
            <li>用户名称:</li>
            <li>策略名称:</li>
            <li>配置金额:</li>
            <li>策略收益:</li>
            <li>应交佣金:</li>
            <li>策略使用保证金:</li>
          </ul>
          <ul>
            <li>{{endMes.nickname}}</li>
            <li>{{endMes.strategy_name}}</li>
            <li>{{endMes.investment_amount}}</li>
            <li>{{endMes.profit}}</li>
            <li>{{endMes.amt}}</li>
            <li>{{endMes.order_amount}}</li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ordEnd = false">关&nbsp;闭</el-button>
          <el-button type="primary"
          v-loading="btnLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :disable="btnLoading"
          @click="endOrderJS()">结算订单</el-button>
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
            <li>{{cusMesOp.user_id}}</li>
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
      options: [{
          value: 0,
          label: '全部订单'
        }, {
          value: 2,
          label: '支付完成'
        }, {
          value: 1,
          label: '未支付'
        }, {
          value: -1,
          label: '异常订单'
        },{
          value: 3,
          label: '已取消'
        },{
          value: 4,
          label: '已结算'
        },{
          value: 5,
          label: '申请退款'
        },{
          value: 6,
          label: '退款成功'
        },{
          value: 7,
          label: '退款失败'
        },{
          value: 8,
          label: '已完结'
        }
      ],
      ordList:[],
      currentPage3:1,//分页器默认页码
      ordExa:false,//订单审核
      ordState:0,
      ordMesD:{
        order_amount:null,
        payed_amount:null,
        account_info:{
          name:null,
          account:null,
          pwd:null
        }
      },
      orderLoading:false,
      ordPage:10,
      btnLoading:false,
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
      cusMesBox:false,//用户信息
      cusMesOp:{
        user_id:null,
        nickname:null,
        address:null,
        realname:null,
        mobile:null,
      },
      search:{
        orderSn:'',
        userId:'',
      },
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
      if(this.backStatus==0&&this.search.orderSn==''&&this.search.userId==''){
        this.getOrderlist()
      }else{
        this.filGetOrder()
      }
    },
    texOpen(_this){//审核订单
      if(this.ordList[_this].account_info){
        this.ordMesD=this.ordList[_this];
        this.ordExa=true;
      }else{
        this.$message.error('当前订单未绑定交易账号,暂不支持审核')
      }
    },
    getOrderlist(){
      this.orderLoading=true;
      this.$http.getListAPI('order?page='+this.currentPage3+'&limit=15').then(res=>{
        if(res.data.state==1){
          this.ordList=res.data.data.list;
          this.ordPage=(res.data.data.pagination.total/15)*100;
          this.orderLoading=false;
        }
      }).catch(err=>{
        this.orderLoading=false;
      })
    },
    filGetOrder(){
      this.orderLoading=true;
      let state=this.ordState!=0?'&status='+this.ordState+'&order_sn='+this.search.orderSn+'&user_id='+this.search.userId:'&order_sn='+this.search.orderSn+'&user_id='+this.search.userId;
      this.$http.getListAPI('order?page='+this.currentPage3+'&limit=15'+state).then(res=>{
        if(res.data.state==1){
          this.ordList=res.data.data.list;
          this.ordPage=(res.data.data.pagination.total/15)*100;
          this.orderLoading=false;
        }
      }).catch(err=>{
        this.orderLoading=false;
      })
    },
    filOrder(status){
      this.backStatus=status;
      if(this.backStatus==0&&this.search.orderSn==''&&this.search.userId==''){
        this.getOrderlist()
      }else{
        this.ordState=status;
        this.filGetOrder()
      }
    },
    exaAdo(){//审核通过
      this.btnLoading=true;
      this.$http.putSomeAPI('order/verify',{
        id:this.ordMesD.id,
        is_verify:1
      }).then(res=>{
        if(res.data.state==1){
          this.$message.success('已通过');
          this.ordExa=false;
          this.btnLoading=false;
          this.getOrderlist()
        }else{
          this.btnLoading=false;
        }
      }).catch(err=>{
        this.btnLoading=false;
      })
    },
    endOrder(index){//获取结算详情
      if(this.ordList[index].account_info==null){
        this.$message.error('该订单尚未绑定证券账号')
      }else{
        if(this.ordList[index].status==4||this.ordList[index].status==2){
          const loading = this.$loading({
            lock: true,
            text: '加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.endID=this.ordList[index].id;
          this.$http.getListAPI('order/settle?id='+this.ordList[index].id).then(res=>{
            if(res.data.state==1){
              this.endMes=res.data.data;
              this.ordEnd=true;
              loading.close()
            }else{
              loading.close()
              this.$message.error(res.data.msg)
            }
          }).catch(err=>{
            loading.close()
          })
        }else{
          this.$message.error('当前订单状态不可结算')
        }
      }
    },
    endOrderJS(){//结算订单
      this.btnLoading=true;
      this.$http.postFormAPI('order/settle',{
        id:this.endID
      }).then(res=>{
        if(res.data.state==1){
          this.$message.success('结算成功!');
          this.ordEnd=false;
          this.getOrderlist()
          this.btnLoading=false;
        }else{
          this.btnLoading=false;
          this.$message.error(res.data.msg)
        }
      }).catch(err=>{
        this.btnLoading=false;
      })
    },
    refreshOrder(){//刷新数据
      if(this.backStatus==0&&this.search.orderSn==''&&this.search.userId==''){
        this.getOrderlist()
      }else{
        this.filGetOrder()
      }
    },
    cusMes(index){//客户详情
      this.cusMesOp=this.ordList[index];
      this.cusMesBox=true;
    },
    clearSearch(){//清空搜索
      this.search={
        orderSn:'',
        userId:''
      };
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
    height: 50px;
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
  .tionSearch{
    width: 90%;
    margin:0 auto;
    padding: 30px 0;
    ul{
      width: 100%;
      display: flex;
      justify-content: space-between;
      li{
        width: 30%;
        text-align: center;
        position: relative;
        i{
          color:#545c64;
          font-size: 40px;
          position: absolute;
          right:-40px;
          top:50%;
          margin-top: -20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
