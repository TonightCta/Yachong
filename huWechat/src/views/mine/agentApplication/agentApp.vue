<!-- 代理申请 -->
<template lang="html">
  <div class="agentApp">
    <!-- <div class="" style="position:absolute;width:100%;"> -->
      <!-- 申请代理 -->
      <div class="">
        <div class="choiceStar" ref="choiceStar" v-if="choiceStar">
          <p class="choiceTitle">
            申请代理
          </p>
          <p>代理等级:
            <el-select v-model="starGar" @focus="closeJI()" placeholder="选择代理星级" size="mini">
               <el-option
                 v-for="item in agentList"
                 :key="item.value"
                 :label="item.text"
                 :value="item.text">
               </el-option>
             </el-select>
          </p>
          <p>
            代理费用:
            <input type="text" v-model="agentMount" disabled="disabled" name="" value="">
          </p>
          <p>
            <van-button color="#0588FF" @click="openPay()">立即申请</van-button>
          </p>
        </div>
      </div>
      <!-- 手机认证 -->
      <div class="">
        <div class="phoneAuth"  v-if="phoneAuth" ref="phoneAuth">
          <p class="authTitle">
            <img src="../../../assets/images/appBack.png" @click="choiceStarBack()" alt="">
            手机认证
          </p>
          <p>
            <input type="number" name="" value="" placeholder="请输入手机号" v-model="bindMobile">
            <span v-if="Verification" @click="getCode()">获取验证码</span>
            <span v-else>({{timer}}s)后获取</span>
          </p>
          <p>
            <input type="number" name="" value="" placeholder="输入验证码" v-model="bindCode">
            <span>收不到验证码？</span>
          </p>
          <p>
            <van-button :color="authSOE" @click="subBind()">{{authText}}</van-button>
          </p>
        </div>
      </div>
      <!-- 支付代理费 -->
      <div class="payStar" ref="payStar" v-if="payStar">
        <p class="payTitle">
          <img src="../../../assets/images/appBack.png" @click="choiceStarBack()" alt="">
          支付代理费
        </p>
        <p>¥&nbsp;<span>{{agentMount}}</span></p>
        <p>收款方:厦门小蚜虫量化软件开发有限公司</p>
        <p>收款方:支付代表您已同意<router-link tag="span" to="/userAge" style="color:#0588ff;"><代理协议></router-link></p>
        <p>
          <van-button color="#0588FF" @click="starPay()">确认支付</van-button>
        </p>
      </div>
      <!-- 支付成功 -->
      <div class="paySucc" v-if="paySucc" ref="paySucc">
        <p class="payTitle">
          <van-icon name="clear" color="#f5222d" @click="paySucc = false"/>
        </p>
        <p>
          <van-icon name="passed" size="100" color="#0588ff" />
        </p>
        <p>恭喜您成为大虎鲸的代理商</p>
        <p>提示：退出此页面重进后就是您的个人代理页面啦</p>
      </div>
      <!-- 支付失败 -->
      <div class="payErr" v-if="payErr" ref="payErr">
        <p class="payTitle">
          <!-- <van-icon name="clear" color="#f5222d" @click="payErr = false"/> -->
        </p>
        <p>
          <van-icon name="close" size="100" color="#f5222d" />
        </p>
        <p>支付失败</p>
        <p>
          <van-button color="#0588FF" @click="starPay()">重新支付</van-button>
        </p>
      </div>

      <div class="agentBox" v-if="false">
        <van-button color="#0588FF" @click="tuenApp()">立即申请</van-button>
      </div>
    <!-- </div> -->
    <Back padding="10 10 60 10" />
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import {mapState} from 'vuex'
import {getUser} from '@/assets/js/user.js'
export default {
  data(){
    return{
      phoneAuth:false,
      choiceStar:true,
      agentNum:0,//代理等级
      agentMount:0,//代理费用
      agentList: [
        { text: '一星代理', value: 3000,num:1 },
        { text: '二星代理', value: 6000 ,num:2},
        { text: '三星代理', value: 10000 ,num:3},
        { text: '四星代理', value: 30000 ,num:4},
        { text: '五星代理', value: 50000 ,num:5},
      ],
      mountList:[
        { text: '3000', value: 0 },
        { text: '6000', value: 0 },
        { text: '10000', value: 0 },
        { text: '30000', value: 0 },
        { text: '50000', value: 0 },
      ],
      payStar:false,//支付代理费
      paySucc:false,//支付成功
      payErr:false,
      starGar:null,//代理等级
      starNum:null,//代理等级上传
      bindMobile:null,//绑定手机
      bindCode:null,//绑定验证码
      timer:60,
      Verification:true,//从新获取验证码
      authSOE:'#0588FF',
      authText:'立即认证'
    }
  },
  components:{
    Back
  },
  watch:{
    starGar(val,oldVal){
      this.agentList.forEach((e)=>{
        if(val===e.text){
          this.agentMount=e.value+'/年'
          this.starNum=e.num
        }
      })
    }
  },
  computed:{
    ...mapState(['userMes'])
  },
  created(){
    console.log(this.userMes)
  },
  methods:{
    tuenApp(){//申请代理
      // if(this.userMes.identity!=0){
      //   this.$toast('您已是大虎鲸代理，将为您跳转至代理中心')
      //   setTimeout(()=>{
      //     this.$router.push('/myCus')
      //   },1000)
      // }else if(this.userMes.mobile!=''||this.userMes.mobile!=null){
      //   this.choiceStar=true;
      // }else{
      //   this.phoneAuth=true;
      // }
    },
    openPay(){//打开支付
      if(this.userMes.identity!=0){
        this.$toast('您已是大虎鲸代理，将为您跳转至代理中心')
        setTimeout(()=>{
          this.$router.push('/myCus')
        },1000)
      }
      else if(this.userMes.mobile!=''||this.userMes.mobile!=null){
        if(this.starGar==''||this.starGar==null){
          this.$toast('请先选择代理星级')
        }else{
          this.$refs.choiceStar.style.opacity="0"
          setTimeout(()=>{
            this.$refs.payStar.style.opacity='1';
          },200)
          this.payStar=true;
          setTimeout(()=>{
            this.choiceStar=false;
          },400)
        }
      }else{
        this.$refs.choiceStar.style.opacity="0"
        setTimeout(()=>{
           this.$refs.phoneAuth.style.opacity='1';
        },200)
        this.phoneAuth=true;
        setTimeout(()=>{
           this.choiceStar=false;
        },400)
      }
    },
    choiceStarBack(){//返回选择星级
      if(this.$refs.payStar){
        this.$refs.payStar.style.opacity='0';
      }
      if(this.$refs.phoneAuth){
        this.$refs.phoneAuth.style.opacity='0';
      }
      this.choiceStar=true;
      setTimeout(()=>{
        this.$refs.choiceStar.style.opacity="1"
      },200)
      setTimeout(()=>{
        this.payStar=false;
        this.phoneAuth=false;
      },400)
    },
    starPay(){//支付验证
      this.$toast.loading({
        message: '请求中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      this.$axios.post(this.Uapi+'/user/index/wxconfig').then((res)=>{
        // console.log(res)
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
        'scene':'age',
        'level':this.starNum,
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
              if(this.$refs.payStar){
                this.$refs.payStar.style.opacity="0"
              }
              if(this.$refs.payErr){
                this.$refs.payErr.style.opacity='0';
              }
              setTimeout(()=>{
                 this.$refs.paySucc.style.opacity='1';
              },200)
              this.paySucc=true;
              setTimeout(()=>{
                 this.payStar=false;
                 this.payErr=false;
              },400)
              this.$toast('即将为您跳转至代理中心...');
              getUser();
              setTimeout(()=>{
                this.$router.push('/myCus')
              },1500)
            }),
            cancel:((err)=>{
              this.$toast('取消支付');
              this.$refs.payStar.style.opacity="0"
              setTimeout(()=>{
                 this.$refs.payErr.style.opacity='1';
              },200)
              this.payErr=true;
              setTimeout(()=>{
                 this.payStar=false;
              },400)
            }),
            fail:((fall)=>{
              this.$refs.payStar.style.opacity="0"
              setTimeout(()=>{
                 this.$refs.payErr.style.opacity='1';
              },200)
              this.payErr=true;
              setTimeout(()=>{
                 this.payStar=false;
              },400)
              this.$toast('购买失败，请重新创建订单')
            })
          });
        }else{
          this.$toast(res.data.msg)
        }
        // console.log(res,'微信支付发起')

        // wx.error((err)=>{
        //   alert('wx错误')
        // })
      }).catch(err=>{
        this.$toast(this.errText)
      })
    },
    getCode(){//获取验证码
      if(this.bindMobile==null||this.bindMobile==''){
        this.$toast('请输入您的手机号')
      }else if(!(/^1[3456789]\d{9}$/.test(this.bindMobile))){
        this.$toast('请输入正确的手机号码')
      }else{
        this.$axios.post(this.Uapi+'/user/sms',{
          'mobile':this.bindMobile,
          'event':'verifyMobile'
        },{
          headers:{
            'Authorization':this.baseToken,
            'v':'v2',
            'SessionId':this.baseID
          }
        }).then((res)=>{
          if(res.data.state==1){
            this.$toast('验证码已发送')
            this.Verification = false;
            let auth_timer = setInterval(()=>{
              this.timer--;
              if(this.timer<=0){
                this.Verification = true;
                this.timer=60;
                clearInterval(auth_timer)
              }
            },1000)
          }else{
            this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          this.$toast(errText)
        })
      }
    },
    subBind(){//绑定手机
      let _html=this;
      if(_html.bindMobile==''||_html.bindMobile==null){
        _html.$toast('请输入手机号')
      }else if(!(/^1[3456789]\d{9}$/.test(_html.bindMobile))){
        _html.$toast('请输入正确的手机号码')
      }else if(_html.bindCode==''||_html.bindCode==null){
        _html.$toast('请输入验证码')
      }else{
        _html.$axios.post(this.Uapi+'/user/bindMobile',{
            'mobile':_html.bindMobile,
            'sms_code':_html.bindCode
          },{
            headers:{
              'Authorization':_html.baseToken,
              'SessionId':_html.baseID,
              'v':'v2'
            }
            }).then((res)=>{
          if(res.data.state==1){
            _html.$toast('绑定成功,正在为您跳转支付...');
            setTimeout(()=>{
              this.$refs.phoneAuth.style.opacity="0"
              setTimeout(()=>{
                 this.$refs.payStar.style.opacity='1';
              },200)
              this.payStar=true;
              setTimeout(()=>{
                this.phoneAuth=false;
              },400)
            },1500)
          }else{
            _html.authText='认证失败'
            _html.authSOE='#f5222d'
            setTimeout(()=>{
              _html.authText='立即认证'
              _html.authSOE='#0588ff'
            },2000)
          }
        }).catch((err)=>{
          _html.$toast(_html.errText);
        })
      }
    },
    closeJI(){
      document.activeElement.blur()
    }
  }
}
</script>

<style lang="scss">
.agentApp{
  width: 100%;
  height: 8rem;
  background: url('../../../assets/images/agentBg.png');
  background-size: 100% 100%;
  box-sizing: border-box;
  position: relative;
  .agentBox{
    width: 100%;
    position: fixed;
    bottom:0;
    height: .5rem;
    background: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-sizing: border-box;
    padding-top: .1rem;
    text-align: center;
    z-index: 200;
    button{
      width: 90%;
      height: .3rem;
      border-radius: 15px;
    }
  }
  .phoneAuth{
    text-align: center;
    background: white;
    width: 95%;
    margin:0 auto;
    border-radius: 10px;
    padding-bottom: .2rem;
    transition: .5s all;
    opacity: 0;
    position: absolute;
    margin-left: -47.5%;
    left: 50%;
    bottom: .2rem;
    .authTitle{
      width: 100%;
      position: relative;
      text-align: center;
      line-height: .4rem;
      font-size: $fontTitle;
      font-weight: bold;
      img{
        position: absolute;
        font-size: $iconSize;
        width: .22rem;
        height: .22rem;
        left:.1rem;
        top:.07rem;
      }
      margin-bottom: .1rem;
    }
    p{
      width: 80%;
      margin:0 auto;
      text-align: left;
      line-height: .5rem;
      input{
        height: .3rem;
        background: white;
        border-bottom: 1px solid #ccc!important;
        text-align: center;
      }
    }
    p:nth-child(2){
      input{
        width: 1.8rem;
        font-size: $fontText;
      }
      span{
        background: $themeColor;
        height: .3rem;
        border-radius: 15px;
        padding: 0 10px;
        line-height: .3rem;
        color:white;
        font-size: $fontText;
        margin-left: .1rem;
      }
    }
    p:nth-child(3){
      margin-top: .2rem;
      input{
        width: 1.6rem;
        font-size: $fontText;
      }
      span{
        font-size: $fontText;
        box-sizing: border-box;
        padding-left: .1rem;
        color:$themeColor;
      }
    }
    p:last-child{
      width: 100%;
      text-align: center;
      margin-top: .2rem;
      button{
        width: 80%;
        height: .3rem;
        border-radius: 15px;
        transition: .5s all;
      }
    }
  }
  .choiceStar{
    text-align: center;
    background: white;
    width: 95%;
    margin:0 auto;
    border-radius: 10px;
    padding-bottom: .2rem;
    transition: .5s all;
    position: absolute;
    margin-left: -47.5%;
    left: 50%;
    bottom: .1rem;
    .choiceTitle{
      width: 100%;
      position: relative;
      text-align: center;
      line-height: .4rem;
      font-size: $fontTitle;
      font-weight: bold;
      i{
        position: absolute;
        font-size: $iconSize;
        left:.1rem;
        top:.1rem;
      }
      margin-bottom: .1rem;
    }
    p:nth-child(2){
      width: 80%;
      margin:0 auto;
      border-bottom: 1px solid #ccc;
      margin-top: .3rem;
      font-size: $fontText;
      padding-bottom: .05rem;
      .el-input__inner{
        background: white!important;
        width: 2.2rem!important;
        height: .3rem!important;
        line-height: .3rem!important;
        font-size: $fontText;
      }
    }
    p:nth-child(3){
      width: 80%;
      margin:0 auto;
      margin-top: .4rem;
      margin-bottom: .2rem;
      border-bottom: 1px solid #ccc;
      font-size: $fontText;
      padding-bottom: .05rem;
      input{
        height: .28rem;
        border-radius: 15px;
        background: white;
        text-align: center;
        width: 2.2rem;
        font-size: $fontText;
      }
    }
    p:last-child{
      width: 100%;
      text-align: center;
      // margin-top: .2rem;
      button{
        width: 2.8rem;
        height: .3rem;
        border-radius: 15px;
      }
    }
  }
  .payStar{
    text-align: center;
    background: white;
    width: 95%;
    margin:0 auto;
    border-radius: 10px;
    padding-bottom: .2rem;
    opacity: 0;
    transition: .5s all;
    position: absolute;
    margin-left: -47.5%;
    left: 50%;
    bottom: .2rem;
    .payTitle{
      width: 100%;
      position: relative;
      text-align: center;
      line-height: .4rem;
      font-size: $fontTitle;
      font-weight: bold;
      img{
        position: absolute;
        font-size: $iconSize;
        width: .22rem;
        height: .22rem;
        left:.1rem;
        top:.07rem;
      }
      margin-bottom: .1rem;
    }
    p{
      font-size: $fontText;
    }
    p:nth-child(2){
      font-size: .18rem;
      font-weight: bold;
      color:$themeColor;
      line-height: .4rem;
      span{
        font-size: .24rem;
      }
    }
    p:nth-child(3){
      width: 80%;
      margin:0 auto;
      margin-top: .2rem;
      color:$moreColor;
      text-align: left;
    }
    p:nth-child(4){
      color:$moreColor;
      width: 80%;
      margin:0 auto;
      text-align: left;
      margin-top: .2rem;
      span{
        color:black;
      }
    }
    p:last-child{
      width: 100%;
      text-align: center;
      margin-top: .3rem;
      button{
        width: 85%;
        height: .3rem;
        border-radius: 15px;
      }
    }
  }
  .paySucc{
    text-align: center;
    background: white;
    width: 95%;
    margin:0 auto;
    border-radius: 10px;
    padding-bottom: .2rem;
    opacity: 0;
    transition: .5s all;
    position: absolute;
    margin-left: -47.5%;
    left: 50%;
    bottom: .2rem;
    .payTitle{
      width: 100%;
      position: relative;
      text-align: center;
      i{
        position: absolute;
        font-size: $iconSize;
        left:.1rem;
        display: none;
        top:.1rem;
      }
      margin-bottom: .1rem;
    }
    p:nth-child(2){
      box-sizing: border-box;
      padding-top: .3rem;
    }
    p:nth-child(3){
      line-height: .4rem;
      font-weight: bold;
      font-size: $fontTitle;
    }
    p:last-child{
      color:$moreColor;
      font-size: $fontText;
    }
  }
  .payErr{
    text-align: center;
    background: white;
    width: 95%;
    margin:0 auto;
    border-radius: 10px;
    padding-bottom: .2rem;
    opacity: 0;
    transition: .5s all;
    position: absolute;
    margin-left: -47.5%;
    left: 50%;
    bottom: .2rem;
    .payTitle{
      width: 100%;
      position: relative;
      text-align: center;
      i{
        position: absolute;
        font-size: $iconSize;
        left:.1rem;
        top:.1rem;
      }
      margin-bottom: .1rem;
    }
    p:nth-child(2){
      box-sizing: border-box;
      padding-top: .3rem;
    }
    p:nth-child(3){
      line-height: .4rem;
      font-weight: bold;
      font-size: $fontTitle;
    }
    p:last-child{
      width: 100%;
      text-align: center;
      margin-top: .1rem;
      button{
        width: 70%;
        height: .3rem;
        border-radius: 15px;
      }
    }
  }
}
</style>
