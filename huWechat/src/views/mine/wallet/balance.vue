<!-- 我的余额 -->
<template lang="html">
  <div class="wallet">
    <div class="balance">
      <p>账户余额
        <router-link to="/bankCard" tag="span">
          <img src="../../../assets/images/addCard.png" alt="">
        </router-link>
      </p>
      <!-- <p class="giveMoney">
        已缴纳保证金:¥&nbsp;{{userMes.strategy_balance}}
      </p> -->
      <p>
        <span>¥&nbsp;{{balance}}</span>
        <span>
          <button type="button" name="button" @click="tiXia=true">提现</button>
        </span>
      </p>
    </div>
    <p class="balanMes">
      <span>账单详情</span>
      <span @click="dateChoose=true">{{billDate}}
        <van-icon name="arrow-down" />
      </span>
    </p>
    <p class="noBill" v-if="noBill">暂无账单</p>
    <div ref="scroller" v-else style="position:relative;">
      <scroller :on-refresh="reBill" :on-infinite="onInfinite">
        <ul class="balanList">
          <li v-for="(balaMes,indexBal) in balanList" :key="indexBal" @click="goTiDe(indexBal)">
            <p>{{balaMes.create_time.substring(0,5)}}&nbsp;&nbsp;{{balaMes.create_time.substring(5,20)}}</p>
            <p>{{balaMes.remark}}</p>
            <p v-if="balaMes.type==1" style="color:#f60f0f;">+{{balaMes.amount}}</p>
            <p v-else style="color:#04cc45;">-{{balaMes.amount}}</p>
            <i class="el-icon-arrow-right"></i>
          </li>
        </ul>
      </scroller>
    </div>
    <div class="">
      <van-popup v-model="dateChoose" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="dateBlan"
          type="year-month"
          title="选择账单日"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="searBill"
        />
      </van-popup>
    </div>
    <!-- 提现 -->
    <div class="tixia">
      <van-overlay :show="tiXia" @click="tiXia = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="tiXia = false"/>
              提现
            </p>
            <p>当前可提现金额:&nbsp;{{userMes.balance}}元</p>
            <p>
              <input type="number" name="" value="" v-model="upBalanNum" placeholder="请输入提现金额">
            </p>
            <p style="marginTop:.2rem;" class="pubIcon">
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
              <input type="text" name="" placeholder="支付宝" value="" style="fontSize:.14rem;">
              <span class="addMask" @click="openAdd()" v-if="isOpen"></span>
              <span class="addMask" @click="closenAdd()" v-else></span>
              <span class="addPayText" ref="addPayText" @click="addPay=true;tiXia=false">
                添加支付宝
                <van-icon name="plus" />
              </span>
              <van-icon name="arrow-down" class="lastArrow" color="#C0C4CC"/>
            </p>
            <p>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="turnBalan()">提现</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 提现成功 -->
    <div class="tixia">
      <van-overlay :show="tiXiaSucc" @click="tiXiaSucc = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle" style="marginBottom:.1rem;">
              <van-icon name="clear" color="#f5222d" @click="tiXiaSucc = false"/>
            </p>
            <van-icon name="passed" size="80"  color="#0588ff"/>
            <p style="paddingBottom:.1rem;marginTop:.05rem;fontSize:.16rem;">提现成功</p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 提现失败 -->
    <div class="tixia">
      <van-overlay :show="tiXiaErr" @click="tiXiaErr = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle" style="marginBottom:.1rem;">
              <van-icon name="clear" color="#f5222d" @click="tiXiaErr = false"/>
            </p>
            <van-icon name="close" size="80"  color="#f5222d"/>
            <p style="paddingBottom:.1rem;marginTop:.05rem;fontSize:.16rem;">提现失败</p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 确认提现至银行卡 -->
    <div class="">
      <div class="turnUp">
        <van-overlay :show="turnUp" @click="turnUp = false">
          <div class="wrapper" @click.stop>
            <div class="turnPay">
              <p class="payTitle">
                <van-icon name="clear" color="#f5222d" @click="turnUp = false"/>
                提现至银行卡
              </p>
              <p class="upMount">提现金额:<span>{{upBalanNum}}</span></p>
              <p class="upAddress">提现至:<span>{{backAddress}}</span></p>
              <p class="turnUpCard">
                <van-button color="#0588ff" @click="subUpBalan()">确认提现</van-button>
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
    <!-- <Back padding="10 10 60 10"/> -->
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import {mapState} from 'vuex'

import {getUser} from '@/assets/js/user.js'
export default {
  components:{
    Back
  },
  computed:{
    ...mapState(['userMes'])
  },
  data(){
    return{
      balanList:[],
      dateChoose:false,//日期选择器
      dateBlan:new Date(),
      maxDate:new Date(),
      minDate:new Date(2019,0,1),
      tiXia:false,//提现窗口
      tiXiaSucc:false,//提现成功
      tiXiaErr:false,//提现失败
      balance:0.00,//余额
      billDate:null,//账单日期
      billPage:1,//账单页码
      choicePay:null,//支付宝账号
      noBill:false,
      cardList:[],
      bankList:[],
      choiceCard:null,//选择银行卡
      turnUp:false,//确认提现
      upBalanNum:null,//提现金额
      cardID:null,//银行卡ID
      addPay:false,//添加支付宝
      isHasPay:false,
      cities: [{value: '添加支付宝',label: 'plus'}],
      AbvValue:null,//废弃
      isOpen:true,
      apyName:null,//支付宝姓名
      apyNum:null,//支付包账号
      backAddress:null,//提现至
      upType:null,//提现方式
      bankPlace:null,
    }
  },
  watch:{
    balanList(val,oldVal){
      if(val.length>0){
        this.noBill=false
      }else{
        this.noBill=true
      }
    }
  },
  created(){
    let data=new Date()
    let yrae=data.getFullYear();
    let mon=data.getMonth()+1;
    if(mon<10){
      mon='0'+mon
    };
    this.billDate=yrae+'-'+mon;
    this.getBlan();
    this.getCardList();
    if(this.userMes.zfb_account==''||this.userMes.zfb_account==null){
      this.isHasPay=false;
    }else{
      this.isHasPay=true;
      this.cardList.push({
        name:this.userMes.zfb_account,
        id:this.userMes.zfb_realname
      })
    }
  },
  mounted(){
    this.getBill();
    this.getHeight()
  },
  methods:{
    formatter(type, val) {
      if (type === 'month') {
        return `${val}月`;
      } else if (type === 'day') {
        return `${val}日`;
      }
      return val;
    },
    getBlan(){//余额
      this.$axios.get(this.Uapi+'/user/item?item=balance',{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.balance=res.data.data.value;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    getBill(){//账单
      this.$axios.get(this.Uapi+'/user/bill?page='+this.billPage+'&limit=20&is_bzj=0&month='+this.billDate,{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.balanList=res.data.data.list;
          if(res.data.data.list.length>1){
            setTimeout(()=>{
              this.getHeight()
            })
          }
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    searBill(cDate){//筛选账单
      let year=cDate.getFullYear();
      let mon=cDate.getMonth()+1;
      if(mon<10){
        mon='0'+mon
      }
      this.billDate=year+'-'+mon;
      this.dateChoose=false;
      setTimeout(()=>{
        this.getBill()
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
    turnBalan(){//提现
      if(this.upBalanNum==''||this.upBalanNum==null){
        this.$toast('请输入提现金额')
      }else if(this.choiceCard==null&&this.choicePay==null){
        this.$toast('请选择至少一种方式提现')
      }else if(this.choiceCard!=null&&this.choicePay!=null){
        this.$toast('当前仅支持一种提现方式')
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
    subUpBalan(){//提交提现
      this.$toast.loading({
        message: '请求中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      if(this.upType==1){
        this.$axios.post(this.Uapi+'/user/tixian',{
          'type':1,
          'money':this.upBalanNum,
          'bank_id':this.cardID,
          'bank_kaihu':this.bankPlace
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
            this.upBalanNum=null;
            this.choiceCard=null;
            this.choicePay=null;
            this.upType=null;
            this.tiXiaSucc=true;
            this.turnUp=false;
            this.$toast.clear()
            this.getBlan();
            this.getBill();
          }else{
            this.turnUp=false;
            this.tiXiaErr=true;
            this.cardID=null;
            this.upBalanNum=null;
            this.choiceCard=null;
            this.choicePay=null;
            this.upType=null;
            this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          this.$toast.clear()
          this.turnUp=false;
          this.tiXiaErr=true;
          this.cardID=null;
          this.upBalanNum=null;
          this.choiceCard=null;
          this.choicePay=null;
          this.upType=null;
          this.$toast(this.errText)
        })
      }else{
        this.$axios.post(this.Uapi+'/user/tixian',{
          'type':2,
          'realname':this.choicePay,
          'cardno':this.cardList[0].id,
          'money':this.upBalanNum
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
            this.upBalanNum=null;
            this.choiceCard=null;
            this.choicePay=null;
            this.upType=null;
            this.tiXiaSucc=true;
            this.turnUp=false;
            this.$toast.clear();
            this.getBlan();
            this.getBill();
          }else{
            this.turnUp=false;
            this.tiXiaErr=true;
            this.cardID=null;
            this.upBalanNum=null;
            this.choiceCard=null;
            this.choicePay=null;
            this.upType=null;
            this.$toast.clear()
            this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          this.turnUp=false;
          this.tiXiaErr=true;
          this.cardID=null;
          this.upBalanNum=null;
          this.choiceCard=null;
          this.choicePay=null;
          this.upType=null;
          this.$toast.clear()
          this.$toast(this.errText)
        })
      }

    },
    addPayJS(){
      // alert(1);
      this.tiXia=false;
      this.addPay=true;
      this.isHasPay=true;
      this.AbvValue=null;
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
    reBill(done){//刷新账单
      this.getBill()
      setTimeout(()=>{
        this.$toast('刷新成功')
        done()
      },1000)
    },
    onInfinite(done){//加载更多
      setTimeout(()=>{
        done(true)
      },2000)
    },
    getHeight(){//获取盒子高度
      let bodyHeight = document.documentElement.clientHeight;
      let scroller = this.$refs.scroller;
      let scrollerTop = scroller.getBoundingClientRect().top;
      scroller.style.height = (bodyHeight-scrollerTop)+"px";
    },
    goTiDe(index){
      window.sessionStorage.setItem('WaActive','余额');
      if(this.balanList[index].remark_type==10){
        this.$router.push({
          path:'/backDetails',
          query:{
            backID:this.balanList[index].target_id,
            type:'ti'
          }
        })
      }else{
        this.$toast('该账单暂无详情')
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
  },
}
</script>

<style lang="scss">
.wallet{
  width: 100%;
  .balance{
    width: 90%;
    margin:0 auto;
    margin-top: .1rem;
    padding: .1rem .1rem .2rem .1rem;
    background: linear-gradient(#44B3FF, #0588ff);
    border-radius: 10px;
    p:first-child{
      width: 100%;
      text-align: left;
      font-size: $fontTitle;
      color:white;
      font-weight: bold;
      position: relative;
      margin-bottom: .3rem;
      box-sizing: border-box;
      padding-left: .1rem;
      margin-top: .05rem;
      span{
        img{
          width: $iconSize;
          height: $iconSize;
          position: absolute;
          right:.1rem;
          top:0;
          height: .25rem;
          width: .25rem;
        }
      }
    }
    .giveMoney{
      width: 100%;
      text-align: left;
      line-height: .4rem;
      font-size: $fontText;
      color:white;
      margin-top: .1rem;
      font-weight: bold;
    }
    p:last-child{
      width: 100%;
      display: flex;
      margin-top: .2rem;
      font-size: $fontTitle;
      color:white;
      font-weight: bold;
      box-sizing: border-box;
      padding-left: .1rem;
      span{
        width: 50%;
        text-align: left;
        font-size: $fontTitle;
      }
      span:last-child{
        text-align: right;
        button{
          height: .26rem;
          text-align: center;
          border-radius: 15px;
          color:$themeColor;
          font-weight: bold;
          width: .8rem;
          font-size: $fontText;
        }
      }
    }
  }
  .balanMes{
    width: 95%;
    margin:0 auto;
    text-align: left;
    display: flex;
    line-height: .3rem;
    margin-top:.1rem;
    margin-bottom: .1rem;
    span{
      width: 50%;
      font-size: $fontText;
    }
    span:last-child{
      text-align: right;
      color:#666;
      position: relative;
      box-sizing: border-box;
      padding-right: .18rem;
      i{
        position: absolute;
        font-size: .15rem;
        padding-top:2px;
        top:50%;
        margin-top: -11px;
        right:0;
      }
    }
  }
  .noBill{
    width: 95%;
    margin:0 auto;
    line-height: .4rem;
    border-radius: 10px;
    background: white;
    text-align: center;
    color:$moreColor;
    font-size: $fontText;
  }
  .balanList{
    width: 90%;
    margin:0 auto;
    padding: .1rem .1rem;
    background: white;
    border-radius: 10px;
    li{
      width:100%;
      display: flex;
      line-height: .4rem;
      font-size: $fontText;
      position: relative;
      border-bottom: 1px solid #eee;
      p{
        width: 50%;
        text-align: left;
      }
      p:first-child{
        span{
          font-size: $fontText;
          color:$moreColor;
        }
      }
      p:nth-child(2){
        width: 75%;
        text-align: center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color:$moreColor;
      }
      p:nth-child(3){
        text-align: right;
        box-sizing: border-box;
        padding-right: .25rem;
      }
      i{
        position: absolute;
        font-size: $fontTitle;
        top:50%;
        margin-top: -8px;
        right:.05rem;
        color:#aaa;
      }
    }
    li:last-child{
      border:0;
    }
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
          height: .4rem;
          position: relative;
          button{
            height: .3rem;
            font-size: $fontText;
            border-radius: 15px;
            width: $widthAll;
            position: absolute;
            top:0;
            left:50%;
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
          // text-align: center;
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
            background: white;
            text-align: center;
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
          margin-top: .4rem;
          font-size: $fontText;
          button{
            height: .3rem;
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
          height: .4rem;
          position: relative;
          button{
            height: .3rem;
            font-size: $fontText;
            border-radius: 15px;
            width: $widthAll;
            position: absolute;
            top:0;
            margin-left: -1.2rem;
          }
        }
      }
    }
  }
}
</style>
