<!-- 退款详情 -->
<template lang="html">
  <div class="orderDetails">
    <p class="orderStatus" v-if="deMes.status==2">订单正在服务中</p>
    <p class="orderStatus" v-if="deMes.status==1">订单未支付</p>
    <p class="orderStatus" v-if="deMes.status==3">订单已取消</p>
    <p class="orderStatus" v-if="deMes.status==4">订单已结算</p>
    <p class="orderStatus" v-if="deMes.status==5">订单已申请退款</p>
    <p class="orderStatus" v-if="deMes.status==6">订单已退款成功</p>
    <p class="orderStatus" v-if="deMes.status==7">订单退款失败</p>
    <p class="orderStatus" v-if="deMes.status==8">订单已完结</p>
    <div class="orderMes">
      <p>{{deMes.content.name}}</p>
      <p v-if="deMes.content.quota">资金规模:&nbsp;{{deMes.content.quota}}万元</p>
      <p>下单时间:&nbsp;{{deMes.create_time}}</p>
      <p>订单编号:&nbsp;{{deMes.order_sn}}</p>
      <p>支付金额:&nbsp;<font>{{deMes.payed_amount}}元</font></p>
      <p>支付方式:&nbsp;
        <span v-if="deMes.trade_type==='W02'">微信支付</span>
        <span v-else>支付宝支付</span>
      </p>
    </div>

    <div class="" v-if="isHasBtn">
      <p class="operBtn" v-if="deMes.status==5" @click="goBaSpeed()">退款详情</p>
      <p class="operBtn" @click="tiXia=true" v-if="deMes.status==2">申请退款</p>
    </div>
    <!-- 退款 -->
    <div class="tixia">
      <van-overlay :show="tiXia" @click="tiXia = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="tiXia = false"/>
              退款
            </p>
            <p>¥&nbsp;{{deMes.payed_amount}}元</p>
            <p style="" class="pubIcon">
              <van-icon name="card" class="cardIcon" color="rgb(255,171,51)" />
              <el-select v-model="choiceCard" @change="backCard" placeholder="银行卡" clearable size="mini">
                 <el-option
                   v-for="item in bankList"
                   :key="item.id"
                   :label="item.bank.substring(0,6)"
                   :value="item.bank.substring(0,6)">
                 </el-option>
               </el-select>
            </p>
            <p style="marginTop:.2rem;" class="pubIcon" v-if="isHasPay">
              <van-icon name="alipay" class="cardIcon" color="rgb(17,157,238)"/>
              <el-select v-model="choicePay" @change="backPay" placeholder="支付宝" clearable size="mini">
                 <el-option
                   v-for="item in cardList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.name">
                 </el-option>
               </el-select>
            </p>
            <p v-else class="addPayInp">
              <van-icon name="alipay" class="alipayIcon" color="rgb(17,157,238)"/>
              <input type="text" name="" placeholder="支付宝" style="fontSize:.14rem;" value="">
              <span class="addMask" @click="openAdd()" v-if="isOpen"></span>
              <span class="addMask" @click="closenAdd()" v-else></span>
              <span class="addPayText" ref="addPayText" @click="addPay=true;tiXia=false">
                添加支付宝
                <van-icon name="plus" />
              </span>
              <van-icon name="arrow-down" class="lastArrow" color="#C0C4CC"/>
            </p>
            <p>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="turnBalan()">退款</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>

    <!-- 退款成功 -->
    <div class="tixia">
      <van-overlay :show="tiXiaSucc" @click="tiXiaSucc = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle" style="marginBottom:.1rem;">
              <van-icon name="clear" color="#f5222d" @click="tiXiaSucc = false"/>
            </p>
            <van-icon name="passed" size="80"  color="#0588ff"/>
            <p style="paddingBottom:.1rem;marginTop:0.1rem;fontSize:.16rem;">退款成功</p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 退款失败 -->
    <div class="tixia">
      <van-overlay :show="tiXiaErr" @click="tiXiaErr = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle" style="marginBottom:.1rem;">
              <van-icon name="clear" color="#f5222d" @click="tiXiaErr = false"/>
            </p>
            <van-icon name="close" size="80"  color="#f5222d"/>
            <p style="paddingBottom:.1rem;marginTop:.1rem;fontSize:.16rem;">退款失败</p>
          </div>
        </div>
      </van-overlay>
    </div>

    <!-- 确认退款至银行卡 -->
    <div class="">
      <div class="turnUp">
        <van-overlay :show="turnUp" @click="turnUp = false">
          <div class="wrapper" @click.stop>
            <div class="turnPay">
              <p class="payTitle">
                <van-icon name="clear" color="#f5222d" @click="turnUp = false"/>
                退款至银行卡
              </p>
              <p class="upMount">退款金额:<span>{{deMes.payed_amount}}</span></p>
              <p class="upAddress">退款至:<span>{{backAddress}}</span></p>
              <p class="turnUpCard">
                <van-button color="#0588ff" @click="subUpBalan()">确认退款</van-button>
              </p>
            </div>
          </div>
        </van-overlay>
      </div>
    </div>
    <!-- 添加支付宝账号 -->
    <div class="">
      <div class="addPay">
        <van-overlay :show="addPay" @click="addPay = false">
          <div class="wrapper" @click.stop>
            <div class="turnPay">
              <p class="payTitle">
                <van-icon name="clear" color="#f5222d" @click="addPay = false"/>
                添加支付宝账号
              </p>
              <p class="upMount">&nbsp;&nbsp;&nbsp;姓名:
                <input type="text" name="" value="" placeholder="请输入您的姓名" v-model="apyName">
              </p>
              <p class="upAddress">支付宝:
                <input type="text" name="" value="" placeholder="请输入支付宝账号" v-model="apyNum">
              </p>
              <p class="turnUpCard">
                <van-button color="#0588ff" @click="turnPushApy">添加</van-button>
              </p>
            </div>
          </div>
        </van-overlay>
      </div>
    </div>
    <Back/>
  </div>
</template>
<script>
import Back from '@/components/backCom/backBtn'
import {mapState} from 'vuex'
export default {
  components:{Back},
  data(){return{
    deMes:{
      content:{
        name
      }
    },
    tiXia:false,//退款窗口
    tiXiaSucc:false,//退款成功
    tiXiaErr:false,//退款失败
    balance:null,//余额
    billDate:null,//账单日期
    billPage:1,//账单页码
    choicePay:null,//支付宝账号
    noBill:false,
    cardList:[],
    bankList:[],
    choiceCard:null,//选择银行卡
    turnUp:false,//确认退款
    upBalanNum:null,//退款金额
    cardID:null,//银行卡ID
    addPay:false,//添加支付宝
    isHasPay:false,
    cities: [{value: '添加支付宝',label: 'plus'}],
    AbvValue:null,//废弃
    isOpen:true,
    apyName:null,//支付宝姓名
    apyNum:null,//支付包账号
    backAddress:null,//退款至
    upType:null,//退款方式
    bankPlace:null,
    isHasBtn:false,
  }},
  computed:{...mapState(['userMes'])},
  created(){
    this.getOrDe();
    if(this.userMes.zfb_account==''||this.userMes.zfb_account==null){
      this.isHasPay=false;
    }else{
      this.isHasPay=true;
      this.cardList.push({
        name:this.userMes.zfb_account,
        id:this.userMes.zfb_realname
      })
    };
    if(this.$route.query.ID){
      this.isHasBtn=true;
    }else{
      this.isHasBtn=false;
    }
  },
  methods:{
    getOrDe(){
      this.$axios.get(this.Uapi+'/user/order/'+this.$route.query.orderID,{
        headers:{
          'Authorization':this.baseToken,
          'sessionId':this.baseID,
          'v':'v2'
        }
      }).then(res=>{
        if(res.data.state==1){
          this.deMes=res.data.data;
          if(res.data.data.status==2){
            this.getCardList();
            this.getBackDetails()
          }
        }else{
          this.$toast(res.data.msg)
        }
      }).catch(err=>{
        this.$toast(this.errText)
      })
    },
    getBackDetails(){
      this.$axios.get(this.Uapi+'/user/tixianinfo?order_id='+this.$route.query.orderID,{
        headers:{
          'Authorization':this.baseToken,
          'sessionId':this.baseID,
          'v':'v2'
        }
      }).then(res=>{
        if(res.data.state==1){
          if(res.data.data!=null){
            this.deMes.status=5;
          }
          // console.log(this.deMes)
        }else{
          this.$toast(res.data.msg)
        }
      }).catch(err=>{
        this.$toast(this.errText)
      })
    },
    goBaSpeed(){
      this.$router.push({
        path:'/orderBack',
        query:{
          backID:this.$route.query.ID
        }
      })
    },
    getCardList(){//获取银行卡列表
      this.$axios.post(this.Uapi+'/user/bank',{

      },{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.bankList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    turnBalan(){//退款至银行卡
      if(this.choiceCard==null&&this.choicePay==null){
        this.$toast('请选择至少一种方式退款')
      }else if(this.choiceCard!=null&&this.choicePay!=null){
        this.$toast('当前仅支持一种退款方式')
      }else if(this.choiceCard!=null&&this.choicePay==null){
        this.bankList.forEach((e)=>{
          if(this.choiceCard==e.bank){
            this.cardID=e.id;
            this.bankPlace=e.bank_kaihu;
          }
        });
        this.turnUp=true;
        this.tiXia=false;
        this.backAddress=this.choiceCard;
        this.upType=1;
      }else if(this.choiceCard==null&&this.choicePay!=null){
        this.backAddress=this.choicePay;
        this.turnUp=true;
        this.tiXia=false;
        this.upType=2;
      }
    },
    subUpBalan(){//提交退款
      this.$toast.loading({
        message: '请求中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      if(this.upType==1){
        this.$axios.post(this.Uapi+'/user/tixianbzj',{
          'order_id':this.$route.query.ID,
          'type':1,
          'bank_id':this.cardID,
          'bank_kaihu':this.bankPlace,
        },{
          headers:{
            'Authorization':this.baseToken,
            'SessionId':this.baseID,
            'v':'v2'
          }
        }).then((res)=>{
          if(res.data.state==1){
            this.$toast('提交成功');
            this.cardID=null;
            this.choiceCard=null;
            this.choicePay=null;
            this.upType=null;
            this.tiXiaSucc=true;
            this.turnUp=false;
            this.$toast.clear();
            this.getOrDe()
          }else{
            this.turnUp=false;
            this.tiXiaErr=true;
            this.cardID=null;
            this.choiceCard=null;
            this.choicePay=null;
            this.$toast.clear()
            this.upType=null;
            this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          this.turnUp=false;
          this.tiXiaErr=true;
          this.cardID=null;
          this.choiceCard=null;
          this.choicePay=null;
          this.$toast.clear()
          this.upType=null;
          this.$toast(this.errText)
        })
      }else{
        this.$axios.post(this.Uapi+'/user/tixianbzj',{
          'order_id':this.$route.query.ID,
          'type':2,
          'realname':this.choicePay,
          'cardno':this.cardList[0].id,
        },{
          headers:{
            'Authorization':this.baseToken,
            'SessionId':this.baseID,
            'v':'v2'
          }
        }).then((res)=>{
          if(res.data.state==1){
            this.$toast('提交成功');
            this.cardID=null;
            this.choiceCard=null;
            this.choicePay=null;
            this.upType=null;
            this.tiXiaSucc=true;
            this.$toast.clear()
            this.turnUp=false;
            this.getOrDe()
          }else{
            this.turnUp=false;
            this.tiXiaErr=true;
            this.cardID=null;
            this.choiceCard=null;
            this.$toast.clear()
            this.choicePay=null;
            this.upType=null;
            this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          this.turnUp=false;
          this.tiXiaErr=true;
          this.cardID=null;
          this.choiceCard=null;
          this.choicePay=null;
          this.$toast.clear()
          this.upType=null;
          this.$toast(this.errText)
        })
      }

    },
    openAdd(){
      this.$refs.addPayText.style.display='block';
      // this.$refs.addPayText.style.height='3rem';
      setTimeout(()=>{
        this.$refs.addPayText.style.opacity='1';
      })
      this.isOpen=false;
    },
    closenAdd(){
      // this.$refs.addPayText.style.height='0';
      this.$refs.addPayText.style.opacity='0';
      setTimeout(()=>{
        this.$refs.addPayText.style.display='none';
      },300)
      this.isOpen=true;
    },
    turnPushApy(){// 上传支付宝
      if(this.apyName==''||this.apyName==null){
        this.$toast('请输入姓名')
      }else if(this.apyNum==''||this.apyNum==null){
        this.$toast('请输支付宝账号')
      }else{
        this.$axios.put(this.Uapi+'/user/editinfo',{
          'zfb_realname':this.apyName,
          'zfb_account':this.apyNum,
        },{headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }}).then((res)=>{
          if(res.data.state==1){
            getUser();
            this.$toast('上传成功')
            this.addPay=false;
            this.isHasPay=true;
            this.cardList.push({
              name:res.data.data.zfb_account,
              id:res.data.data.zfb_realname
            })
          }else{
            this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          this.$toast(this.errText)
        })
      }
    },
    backCard(value){
      if(value==''){
        this.choiceCard=null;
      };
    },
    backPay(value){
      if(value==''){
        this.choicePay=null;
      };
    }
  }
}
</script>

<style lang="scss">
.orderDetails{
  width: 100%;
  .orderStatus{
    box-sizing: border-box;
    padding-left: .15rem;
    line-height: .4rem;
    background: white;
    font-size: $fontTitle;
    font-weight: bold;
    margin-top: .1rem;
  }
  .orderMes{
    box-sizing: border-box;
    padding: .15rem;
    background: white;
    margin-top: .1rem;
    line-height: .3rem;
    font-size: $fontText;
    font{
      color:$warningColor;
    }
  }
  .operBtn{
    margin-top: .1rem;
    background: white;
    text-align: center;
    line-height: .4rem;
    font-size: $fontText;
    color:$themeColor;
  }
  .turnUp{
    text-align: center;
    .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .turnPay{
        width: 3rem;
        padding: .1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
        .payTitle{
          width: 100%;
          position: relative;
          text-align: center;
          line-height: .3rem;
          font-size: $fontTitle;
          font-weight: bold;
          i{
            position: absolute;
            font-size: $iconSize;
            left:.05rem;
            top:.05rem;
          }
        }
        p:nth-child(2){
          line-height: .3rem;
          font-size: .15rem;
          margin-top: .1rem;
        }
        p:nth-child(3){
          font-size: .15rem;
          margin-top: .1rem;
        }
        p:last-child{
          margin-top: .2rem;
          height: .3rem;
          position: relative;
          button{
            height: .3rem;
            font-size: $fontText;
            border-radius: 15px;
            width: $widthAll;
            position: absolute;
            top:0;
            left: 50%;
            margin-left: -1.2rem;
          }
        }
      }
    }
  }
  .tixia{
    text-align: center;
    .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .turnPay{
        width: 3rem;
        padding: .1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
        position: relative;
        p{
          height: .3rem;
          line-height: 0;
        }
        .payTitle{
          width: 100%;
          position: relative;
          text-align: center;
          line-height: .3rem;
          font-size: $fontTitle;
          font-weight: bold;
          i{
            position: absolute;
            font-size: $iconSize;
            left:.05rem;
            top:.05rem;
          }
        }
        .pubIcon{
          width: 90%;
          margin:0 auto;
          position: relative;
          border-bottom: 1px solid #eee;
          padding-bottom: .01rem;
          .el-input__inner{
            background: white!important;
            width: $widthAll+.2!important;
            height: .28rem!important;
            line-height: .28rem!important;
            font-size: $fontText;
            text-align: center;
          }
          .cardIcon{
            position: absolute;
            font-size: $iconSize;
            z-index: 10;
            left: .2rem;
            top:50%;
            margin-top: -.08rem;
          }
        }
        .addPayInp{
          width: 90%;
          margin:0 auto;
          text-align: center;
          position: relative;
          margin-top: .25rem;
          padding-bottom: .02rem;
          border-bottom: 1px solid #eee;
          .alipayIcon{
            position: absolute;
            font-size: $iconSize;
            z-index: 10;
            left: .2rem;
            top:50%;
            margin-top: -.08rem;
          }
          .lastArrow{
            top:.15rem;
            font-size: $fontText;
            text-align: right;
            left:1.09rem;
            top:-.3rem;
            width: .2rem;
          }
          .addMask{
            width: 100%;
            height: .3rem;
            position: absolute;
            left: 0;
            top:0;
            opacity: 0;
          }
          input{
            width: $widthAll;
            height: .3rem;
            line-height: .3rem;
            font-size: $fontText;
            text-align: center;
            box-sizing: border-box;
            // padding-right: .15rem;
            background: white;
          }
          .addPayText{
            width: 100%;
            border:1px solid #eee;
            position: absolute;
            left:0;
            top:.4rem;
            background: white;
            z-index: 100;
            line-height: .3rem;
            box-shadow: 0px 0px 5px #ccc;
            border-radius: 5px;
            font-size: .13rem;
            transition: .5s all;
            opacity: 0;
            background: white;
            height: .3rem;
            display: none;
            color:#333;
            i{
              position: absolute;
              left:20%;
              font-size:.13rem;
              top:50%;
              margin-top: -8px;
            }
          }
        }
        p:nth-child(2){
          line-height: .3rem;
          font-weight: bold;
          font-size: $fontText;
        }
        p:nth-child(3){
          width: 90%;
          margin:0 auto;
          font-size: $fontText;
          margin-top: .1rem;
          border-bottom: 1px solid #eee;
          input{
            width: $widthAll;
            background: white;
            height: .3rem;
            line-height: .3rem;
            font-size: $fontText;
            text-align: center;
          }
        }
        p:last-child{
          margin-top: .3rem;
          font-size: $fontText;
          button{
            height: .26rem;
            font-size: $fontTitle;
            border-radius: 15px;
            width: $widthAll;
          }
        }
      }
    }
  }
  .addPay{
    text-align: center;
    .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .turnPay{
        width: 3rem;
        padding: .1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
        .payTitle{
          width: 100%;
          position: relative;
          text-align: center;
          line-height: .3rem;
          font-size: $fontTitle;
          font-weight: bold;
          i{
            position: absolute;
            font-size: $iconSize;
            left:.05rem;
            top:.05rem;
          }
        }
        .pubIcon{
          position: relative;
          i{
            position: absolute;
            font-size: $iconSize;
            z-index: 10;
            left: .6rem;
            top:50%;
            margin-top: -8px;
          }
        }
        p:nth-child(2){
          line-height: .3rem;
          margin-top: .1rem;
          // font-weight: bold;
          font-size: $fontText;
          margin-bottom: .05rem;
          input{
            width: 60%;
            height: .3rem;
            border:1px solid #ccc;
            border-radius:15px;
            text-align: center;
          }
        }
        p:nth-child(3){
          width: 100%;
          font-size: $fontText;
          // background: red;
          margin-top: .2rem;
          input{
            width: 60%;
            height: .3rem;
            border:1px solid #ccc;
            border-radius:15px;
            text-align: center;
          }
        }
        p:last-child{
          margin-top: .2rem;
          position: relative;
          height: .4rem;
          button{
            height:.3rem;
            font-size: $fontText;
            border-radius: 15px;
            width: $widthAll;
            position: absolute;
            top:0;
            left: 50%;
            margin-left: -1.2rem;
          }
        }
      }
    }
  }
}
</style>
