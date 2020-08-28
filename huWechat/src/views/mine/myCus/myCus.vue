<!-- 代理中心 -->
<template lang="html">
  <div class="myCus">
    <div class="mesBox">
      <p>
        <img :src="userMes.avatar" alt="">
      </p>
      <p>
        <span>{{agentNumBack}}</span>
        <br>
        <span v-if="isFive">该星级代理可享受{{nowGet}}%的分佣,升级可享受{{upGet}}%的分佣</span>
        <span v-else>该星级代理可享受{{nowGet}}%的分佣</span>
        <br>
        <span>已交代理费：{{ageFee}}&nbsp;元/年</span>
        <br>
        <span v-if="isFive">
          <van-button color="#FFE7AD" @click="upAgent=true" v-if="isDaili">代理升级</van-button>
          <van-button color="#FFE7AD" v-else @click="goOpenAgent">代理升级</van-button>
        </span>
        <span v-else style="color:#FFE7AD;">您已是大虎鲸最高级别代理</span>
      </p>
    </div>
    <p class="mountMes">
      <span>最新收益&nbsp;<font>¥{{newMoney}}</font></span>
      <span>累计收益&nbsp;<font>¥{{newAmount}}</font></span>
    </p>
    <div class="cusList">
      <p class="cusListTitle">
        <span>名称</span>
        <span>资金</span>
        <span>收益</span>
        <span>日期</span>
      </p>
      <p class="upCusNo" v-if="upCusNo">暂无数据</p>
      <ul v-else>
        <li v-for="getMount in mountList">
          <span>{{getMount.nickname}}</span>
          <span>{{getMount.investment_amount/10000}}(万)</span>
          <span class="get">{{getMount.profit}}(元)</span>
          <span>{{getMount.date}}</span>
        </li>
      </ul>
    </div>
    <!-- 升级代理 -->
    <div class="upAgent">
      <van-overlay :show="upAgent" @click="upAgent = false" width="300px">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="upAgent = false"/>
              代理升级
            </p>
            <!-- <van-dropdown-menu>
              <van-dropdown-item v-model="agentNum" :options="agentList" />
            </van-dropdown-menu> -->
            <p>
              代理等级:
                <el-select v-model="agentNum" placeholder="请选择" size="mini">
                  <el-option
                    name="sel"
                    v-for="item in agentList"
                    :key="item.value"
                    :label="item.text"
                    :value="item.text">
                  </el-option>
                </el-select>
            </p>
            <p>
              代理费用:
              <input type="number" name="" v-model="upStarNum" disabled="disabled">
            </p>
            <p>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="openPay()">下一步</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 支付代理费 -->
    <div class="wePay">
      <van-overlay :show="wePay" @click="wePay = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="wePay = false"/>
              支付代理费
            </p>
            <p>{{upStarNum}}元/年</p>
            <p>收款方:厦门小蚜虫量化软件开发有限公司</p>
            <p>支付代表您已同意<router-link to="/userAge" tag="span" style="color:#0588ff"><代理协议></router-link></p>
            <p>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="starPay()">确认支付</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 升级成功 -->
    <div class="upSuccess">
      <van-overlay :show="upSuccess" @click="upSuccess = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle" style="marginBottom:.2rem;">
              <van-icon name="clear" color="#f5222d" @click="upSuccess = false"/>
            </p>
            <van-icon name="passed" size="80"  color="#0588ff"/>
            <p>恭喜您升级为大虎鲸的{{upExp}}星代理啦！</p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 升级失败 -->
    <div class="upSuccess">
      <van-overlay :show="upErr" @click="upErr = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle" style="marginBottom:.2rem;">
              <van-icon name="clear" color="#f5222d" @click="upErr = false"/>
            </p>
            <van-icon name="close" size="80"  color="#f5222d"/>
            <p>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="starPay()">重新支付</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <Back padding="10 10 60 10"/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import {mapState} from 'vuex'
import {getUser} from '@/assets/js/user.js'
export default {
  data(){
    return{
      upAgent:false,//代理升级
      agentNum:'未成为代理',
      agentList: [],
      wePay:false,//支付代理费
      upSuccess:false,//升级成功
      upErr:false,//升级失败
      upStarNum:0,//升级代理费
      upStarSar:null,//升级代理等级
      isFive:true,//是否为五星代理
      nowGet:12,//当前分佣
      upGet:14,//升级分拥
      ageFee:0.00,
      agentMes:{},
      newMoney:0,
      newAmount:0,
      mountList:[],
      upCusNo:true,
      upExp:'二',
      isDaili:false,
      agentNumBack:'未成为代理',
    }
  },
  computed:{
    ...mapState(['userMes'])
  },
  components:{
    Back
  },
  created(){
    if(this.userMes.identity!=0){
      this.getStarNum();
      this.isDaili=true;
    }else{
      this.isDaili=false;
    }
  },
  mounted(){

  },
  watch:{
    agentNum(val,oldVal){
      this.agentList.forEach((e)=>{
        if(val===e.text){
          this.upStarSar=e.num;
          this.upStarNum=e.value-this.ageFee;
        }
      })
    },
    mountList(val,oldVal){
      if(val.length>0){
        this.upCusNo=false;
      }else{
        this.upCusNo=true;
      }
    }
  },
  methods:{
    getStarNum(){//获取代理信息
      let _this=this;
      _this.$axios.get(_this.Uapi+'/user/subordinate',{
        headers:{
          'Authorization':_this.baseToken,
          'SessionId':_this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          _this.agentMes=res.data.data;
          _this.ageFee=_this.agentMes.agent.fee;
          _this.newMoney=_this.agentMes.money;
          _this.newAmount=_this.agentMes.amount;
          _this.mountList=_this.agentMes.list;
          if(res.data.data.agent.level==1){
            _this.agentNum='二星代理';
            _this.agentNumBack='一星代理'
            _this.upExp='二'
            _this.agentList=[
              { text: '二星代理', value: 6000 ,num:2},
              { text: '三星代理', value: 10000 ,num:3},
              { text: '四星代理', value: 30000 ,num:4},
              { text: '五星代理', value: 50000 ,num:5},
            ]
          }else if(res.data.data.agent.level==2){
            _this.agentNum='三星代理'
            _this.agentNumBack='二星代理'
            _this.upExp='三'
            _this.nowGet=14;
            _this.upGet=16;
            _this.agentList=[
              { text: '三星代理', value: 10000 ,num:3},
              { text: '四星代理', value: 30000 ,num:4},
              { text: '五星代理', value: 50000 ,num:5},
            ]
          }else if(res.data.data.agent.level==3){
            _this.agentNum='四星代理';
            _this.agentNumBack='三星代理'
            _this.upExp='四'
            _this.nowGet=16;
            _this.upGet=18;
            _this.agentList=[
              { text: '四星代理', value: 30000 ,num:4},
              { text: '五星代理', value: 50000 ,num:5},
            ]
          }else if(res.data.data.agent.level==4){
            _this.agentNum='五星代理'
            _this.agentNumBack='四星代理'
            _this.upExp='五'
            _this.nowGet=18;
            _this.upGet=20;
            _this.agentList=[
              { text: '五星代理', value: 50000 ,num:5},
            ]
          }else if(res.data.data.agent.level==5){
            _this.upExp='五'
            _this.agentNum='五星代理';
            _this.agentNumBack='五星代理'
            _this.nowGet=20;
            _this.isFive=false;
          }
          _this.agentList.forEach((e)=>{
            if(_this.agentNum===e.text){
              _this.upStarNum=e.value;
            }
          })
        }else{
          _this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        _this.$toast(_this.errText)
      })
    },
    openPay(){//前往支付
      this.upAgent=false;
      this.wePay=true;
    },
    starPay(){//支付验证
      this.$toast.loading({
        message: '请求中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      this.$axios.post(this.Uapi+'/user/index/wxconfig').then((res)=>{
        if(res.data.state==1){
          let wxConfig=JSON.parse(res.data.data);
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: wxConfig.appId, // 必填，公众号的唯一标识
            timestamp: wxConfig.timestamp * 1, // 必填，生成签名的时间戳
            nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
            signature: wxConfig.signature,// 必填，签名
            jsApiList: wxConfig.jsApiList // 必填，需要使用的JS接口列表
          });
          this.starWxPay();
          this.$toast.clear();
        }else{
          this.$toast.clear();
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast.clear();
        this.$toast(this.errText)
      })
    },
    starWxPay(){//统一下单
      this.$axios.post(this.Uapi+'/user/order',{
        'scene':'upg',
        'up_level':this.upStarSar,
        'payed_type':'allinpay',
        'trade_type':'W02'
      },{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'V':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          let wxPay=res.data.data.wx_order;
          wx.chooseWXPay({
            appId:wxPay.appId,
            timestamp:wxPay.timeStamp,
            nonceStr:wxPay.nonceStr,
            package:wxPay.package,
            signType:wxPay.signType,
            paySign:wxPay.paySign,
            success:((res)=>{
              this.$toast('支付成功');
              this.wePay=false;
              this.upSuccess=true;
              setTimeout(()=>{
                this.getStarNum();
              },1000)
              getUser()
            }),
            cancel:((err)=>{
              this.$toast('取消支付')
            }),
            fail:((fall)=>{
              this.$toast('购买失败，请重新创建订单')
              this.wePay=false;
              this.upErr=true;
            })
          });
        }else if(res.data.state==1311){
          this.$toast(res.data.msg+'，跳转中...');
          setTimeout(()=>{
            this.$router.push('/agentApp')
          },500)
        }else{
          this.$toast(res.data.msg)
        }
        // wx.error((err)=>{
        //   alert('wx错误')
        // })
      }).catch(err=>{
        this.$toast(this.errText)
      })
    },
    goOpenAgent(){
      this.$router.push('/agentApp')
    }
  }
}
</script>

<style lang="scss">
.myCus{
  width: 100%;
  .mesBox{
    width: 95%;
    margin:0 auto;
    margin-top: .1rem;
    height: 1.5rem;
    box-sizing: border-box;
    padding: .1rem .1rem;
    background: linear-gradient(60deg,#656565 10%,#A8A8A8 90%);
    display: flex;
    border-radius: 10px;
    p{
      font-size: $fontText;
    }
    p:first-child{
      width: 15%;
      img{
        width: .5rem;
        height: .5rem;
        border-radius: 50%;
        border:1px solid white;
      }
    }
    p:last-child{
      width: 85%;
      text-align: left;
      color:white;
      box-sizing:border-box;
      padding-left:.1rem;
      span:first-child{
        font-size: $fontTitle;
        font-weight: bold;
        line-height: .3rem;
      }
      span:nth-child(3){
        color:#FFE7AD;
      }
      span:nth-child(5){
        line-height: .3rem;
        margin-bottom: .1rem;
      }
      span:last-child{
        button{
          border-radius:20px;
          height: .2rem;
          padding: .1rem .2rem;
        }
        .van-button__text{
          color:#624500;
          font-size:.12rem;
        }
      }
    }
  }
  .mountMes{
    line-height: .5rem;
    width: 95%;
    background: white;
    margin:0 auto;
    margin-top: .1rem;
    margin-bottom: .1rem;
    display: flex;
    border-radius: 10px;
    box-sizing: border-box;
    padding-left: .05rem;
    span{
      width: 50%;
      font-size: $fontText;
      text-align: left;
      box-sizing: border-box;
      padding-left: .1rem;
      font{
        color:$warningColor;
        font-weight: bold;
      }
    }
  }
  .cusList{
    width: 100%;
    background: white;
    .cusListTitle{
      width: 95%;
      margin:0 auto;
      display: flex;
      padding: .1rem 0;
      color:#666;
      border-bottom:1px solid #eee;
      font-size: $fontText;
      span{
        width: 25%;
        text-align: center;
      }
      // span:nth-child(2){
      //   width: 18%;
      // }
      // span:nth-child(3){
      //   width: 32%;
      // }
      // span:first-child{
      //   text-align: left;
      //   width: 10%;
      // }
      // span:last-child{
      //   width: 10%;
      //   text-align: right;
      // }
    }
    .upCusNo{
      width: 100%;
      border:0;
      text-align: center;
      font-size: $fontText;
      line-height: .4rem;
      color:$moreColor;
    }
    ul{
      width: 95%;
      margin:0 auto;
      li{
        width: 100%;
        display: flex;
        padding: .1rem 0;
        font-size: $fontText;
        span{
          width: 25%;
          text-align: center;
        }
        // span:nth-child(2){
        //   width: 18%;
        // }
        // span:nth-child(3){
        //   width: 32%;
        // }
        // span:first-child{
        //   text-align: left;
        //   width: 10%;
        // }
        // span:last-child{
        //   text-align: right;
        // }
        .get{
          color:$warningColor;
        }
      }
    }
  }
  .upAgent{
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
          border: 0;
          i{
            position: absolute;
            font-size: $iconSize;
            left:.05rem;
            top:.05rem;
          }
          margin-bottom: .1rem;
        }
        p{
          width: 90%;
          margin:0 auto;
          height: .3rem;
          line-height: 0;
          text-align: center;
          border-bottom: 1px solid #eee;
          font-size: $fontText;
          .el-input__inner{
            background: white!important;
            width: $widthAll - .5!important;
            height: .28rem!important;
            line-height: .28rem!important;
            font-size: $fontText;
            box-sizing: border-box;
            padding-left: .3rem;
            text-align: center;

          }
        }
        p:nth-child(3){
          text-align: center;
          margin-top: .1rem;
          input{
            width: $widthAll - .5;
            height: .28rem;
            line-height: .28rem;
            font-size: $fontText;
            text-align: center;
            box-sizing: border-box;
            padding-right: .15rem;
            background: white;
            box-sizing: border-box;
            padding-left: .1rem;
          }
        }
        p:last-child{
          width: 100%;
          margin-top: .2rem;
          text-align: center;
          position: relative;
          height: .4rem;
          border: 0;
          button{
            width: $widthAll+.2;
            height: .3rem;
            border-radius: 15px;
            position: absolute;
            top:0;
            left:50%;
            margin-left: -1.3rem;
          }
        }
      }
    }
  }
  .wePay{
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
        p{
          width: 93%;
          margin:0 auto;
          text-align: left;
          height: .3rem;
        }
        p:nth-child(2){
          text-align: center;
          line-height: .4rem;
          font-size: $fontTitle;
          color:$themeColor;
          font-weight: bold;
        }
        p:nth-child(3){
          color:$moreColor;
          font-size: $fontText;
          line-height: .3rem;
          width: 90%;
          margin:0 auto;
        }
        p:nth-child(4){
          color:$moreColor;
          font-size: $fontText;
          line-height: .3rem;
          width: 90%;
          margin:0 auto;
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
        p:last-child{
          width: 100%;
          margin-top: .1rem;
          text-align: center;
          position: relative;
          button{
            width: 60%;
            height: .26rem;
            border-radius: 15px;
            position: absolute;
            top:0;
            left:50%;
            margin-left: -30%;
          }
        }
      }
    }
  }
  .upSuccess{
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
        p{
          font-size: $fontText;
        }
        p:last-child{
          line-height: .5rem;
          margin-top: .1rem;
          button{
            width: $widthAll;
            height: .3rem;
            border-radius:15px;
          }
        }
      }
    }
  }
}
</style>
