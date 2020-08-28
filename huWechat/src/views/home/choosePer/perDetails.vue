<!-- 选股详情 -->
<template lang="html">
  <div class="perDetails">
    <p class="deTitle">关键词:<span>{{titlePerDe}}</span></p>
    <p class="listTitle">
      <span>股票名称</span>
      <span>最新价</span>
      <span>净利润增长值</span>
    </p>
    <div ref="scroller">
      <scroller :on-refresh="rePer">
        <ul class="perDeList">
          <li v-for="(perDeMes,indexPer) in perDeList" :key="indexPer">
            <p>
              <span>{{perDeMes.name}}</span>
              <br>
              <span>{{perDeMes.symbol}}</span>
            </p>
            <p>
              <span>{{perDeMes.high}}</span>
              <br>
              <span v-if="perDeMes.pct_chg.substring(0,1)!='-'" style="color:#f5222d;">+{{perDeMes.pct_chg}}%</span>
              <span v-else style="color:#0be000;">{{perDeMes.pct_chg}}%</span>
            </p>
            <p>{{perDeMes.amount}}</p>
          </li>
        </ul>
      </scroller>
    </div>
    <div class="opeVip" @click="$toast('暂未开放，敬请期待')">
      <img src="../../../assets/images/vipIcon.png" alt="">
      一键开通特权
      <span>查看详情</span>
    </div>
    <!-- 开通特权 -->
    <div class="openVip">
      <van-overlay :show="openVip" @click="openVip = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="openVip = false"/>
              确认订单
              <van-icon name="question" />
            </p>
            <p>
              <span>开通特权</span>
              <span>¥99.99</span>
            </p>
            <p>收款方</p>
            <p>厦门小蚜虫量化软件开发有限公司</p>
            <p>
              <van-checkbox v-model="isAgree" shape="square" icon-size="12">我已阅读并接受服务协议</van-checkbox>
            </p>
            <p>支付方式:
              <van-icon name="alipay" color="#008aff"/>
              <van-icon name="wechat" color="rgb(146,232,103)"/>
            </p>
            <p>
              <span>合计:&nbsp;<font>¥99.99</font></span>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="starPay()">确认支付</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 支付成功-->
    <div class="paySuccess">
      <van-overlay :show="paySuccess" @click="paySuccess = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle" style="marginBottom:.2rem;">
              <van-icon name="clear" color="#f5222d" @click="paySuccess = false"/>
            </p>
            <van-icon name="passed" size="80"  color="#0588ff"/>
            <p>开通成功</p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 支付失败 -->
    <div class="paySuccess">
      <van-overlay :show="payErr" @click="payErr = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle" style="marginBottom:.2rem;">
              <van-icon name="clear" color="#f5222d" @click="payErr = false"/>
            </p>
            <van-icon name="close" size="80"  color="#f5222d"/>
            <p>
              <van-button color="linear-gradient( #44B3FF, #0588ff)">重新支付</van-button>
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
  components:{
    Back
  },
  data(){
    return{
      openVip:false,//开通VIP
      isAgree:false,
      paySuccess:false,//支付成功
      payErr:false,//支付失败
      titlePerDe:null,//关键词
      perDeList:[],//选股列表
    }
  },
  computed:{
    ...mapState(['perText'])
  },
  created(){
    this.titlePerDe=this.perText.title+'...';
    this.getperDeList()
  },
  mounted(){
    this.getHeight()
  },
  methods:{
    getperDeList(){//获取选股列表
      this.$axios.get(this.Uapi+'/user/index/tiaojianxg?condition='+this.perText.code.replace(/%/g,'%25'),{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.perDeList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    rePer(done){//刷新数据
      this.getperDeList()
      setTimeout(()=>{
        this.$toast('刷新成功')
        done()
      },1000)
    },
    starPay(){//支付验证
      if(!this.isAgree){
        this.$toast('请先同意服务协议')
      }else{
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
            this.openVIP()
          }
        });
      }
    },
    openVIP(){//统一下单
      this.$axios.post(this.Uapi+'/user/order',{
        'scene':'you',
        'amount':99.99,
        'payed_type':'allinpay',
        'trade_type':'W02'
      },{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'V':'v2'
        }
      }).then((res)=>{
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
            this.paySuccess=true;
            this.openVip=false;
            getUser();
            this.$router.push('/perDetailsVip')
          }),
          cancel:((err)=>{
            this.$toast('取消支付')
          }),
          fail:((fall)=>{
            this.$toast('购买失败，请重新创建订单');
            this.payErr=true;
            this.openVip=false;
          })
        });
        // wx.error((err)=>{
        //   alert('wx错误')
        // })
      })
    },
    getHeight(){//获取盒子高度
      let bodyHeight = document.documentElement.clientHeight;
      let scroller = this.$refs.scroller;
      let scrollerTop = scroller.getBoundingClientRect().top;
      scroller.style.height = (bodyHeight-scrollerTop)+"px";
    },
  }
}
</script>

<style lang="scss" scoped>
._v-container{
  top:.7rem!important;
}
.perDetails{
  width: 100%;
  .deTitle{
    line-height: .4rem;
    width: 95%;
    margin: 0 auto;
    font-size: $fontText;
    span{
      padding: 1px 10px;
      background: $themeColor;
      border-radius: 10px;
      height: .2rem;
      line-height: .2rem;
      color:white;
      margin-left: .05rem;
    }
  }
  .listTitle{
    width: 100%;
    background: white;
    line-height: .3rem;
    font-size: $fontTitle;
    box-sizing: border-box;
    padding: 0 .1rem;
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #eee;
    span{
      width: 30%;
      color:$moreColor;
    }
    span:last-child{
      text-align: right;
    }
  }
  .perDeList{
    width: 100%;
    padding: 0 .1rem;
    box-sizing: border-box;
    background: white;
    li{
      display: flex;
      width: 100%;
      border-bottom: 1px solid #eee;
      justify-content: space-between;
      box-sizing: border-box;
      padding: .05rem 0;
      span{
        font-size: $fontText;
      }
      p{
        width: 30%;
        font-size: .15rem;
      }
      p:first-child{
        span:last-child{
          font-size: $fontText;
          color:$moreColor;
        }
      }
      p:nth-child(2){
        span:last-child{
          font-size: $fontText;
        }
      }
      p:last-child{
        text-align: right;
        line-height: .4rem;
      }
    }
  }
  .opeVip{
    position: fixed;
    bottom: .1rem;
    width: 90%;
    height: .35rem;
    background: rgb(18,57,102);
    left:50%;
    margin-left: -45%;
    border-radius: 20px;
    color:white;
    line-height: .35rem;
    text-align: center;
    font-size: $fontText;
    margin-top: .2rem;
    span{
      color:#f2ca4f;
      position: absolute;
      right:.2rem;
    }
    img{
      width: .18rem;
      height: .14rem;
      position: absolute;
      top:50%;
      margin-top: -8px;
      left:30%;
    }
  }
  .openVip{
    .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .turnPay{
        width: 70%;
        padding: .1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
        p{
          width: 93%;
          margin:0 auto;
          text-align: left;
          font-size: $fontText;
        }
        p:nth-child(2){
          display: flex;
          line-height: .3rem;
          span{
            width: 50%;
            text-align: left;
          }
          span:last-child{
            color:$themeColor;
          }
        }
        p:nth-child(3){
          line-height: .2rem;
        }
        p:nth-child(4){
          line-height: .3rem;
        }
        p:nth-child(5){
          margin-bottom: .1rem;
        }
        p:nth-child(6){
          line-height: .2rem;
          position: relative;
          i{
            font-size: $iconSize;
            position: absolute;
            top:50%;
            margin-top: -10px;
          }
          i:first-child{
            left: 25%;
          }
          i:last-child{
            left: 38%;
          }
        }
        .payTitle{
          width: 100%;
          position: relative;
          text-align: center;
          line-height: .3rem;
          font-size: $fontTitle;
          font-weight: bold;
          i{
            font-size: $iconSize;
            position: absolute;
          }
          i:first-child{
            left:.05rem;
            top:.05rem;
          }
          i:last-child{
            right:.05rem;
            top:.05rem;
            color:$moreColor;
          }
        }
        p:last-child{
          width: 93%;
          margin:0 auto;
          margin-top: .2rem;
          display: flex;
          line-height: .22rem;
          justify-content: space-between;
          span{
            font{
              color:$themeColor;
            }
          }
          button{
            // width: 70%;
            // margin-left: 40%;
            height: .22rem;
            border-radius: 15px;
            font-size: 12px;
          }
        }
      }
    }
  }
  .paySuccess{
    text-align: center;
    .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .turnPay{
        width: 70%;
        padding: .1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
        text-align: center;
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
      }
    }
  }
}
</style>
