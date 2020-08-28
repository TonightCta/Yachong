<!-- 涨停策略内页 -->
<template lang="html">
  <div class="starCon">
    <div class="conFir">
      <p>{{starMes.name}}</p>
      <p class="hasDis">
        <span>主理人:&nbsp;{{starMes.author}}</span>
        <span>创建时间:&nbsp;{{starMes.create_time}}</span>
      </p>
      <p class="hasDis">
        <span>风格:&nbsp;{{starMes.style}}</span>
        <span>风险标准:&nbsp;<font style="color:green;">-{{starMes.risk*10}}%</font></span>
      </p>
      <p class="hasDis">
        <span>止损线:&nbsp;<font style="color:red;">{{(10-2)*10}}%</font></span>
        <span>预期收益:&nbsp;<font style="color:red;">{{starMes.expect}}%</font>(年)<font style="color:red;">{{starMes.expect/12}}%</font>(月)</span>
      </p>
      <p>
        策略简述:&nbsp;{{starMes.brief}}
      </p>
      <p>
        <span v-for="mesTag in starMes.tag">{{mesTag}}</span>
      </p>
    </div>
    <div class="conEchats">
      <div class="" id="conEchats">

      </div>
      <p class="mask"></p>
    </div>
    <div class="conAll">
      <p>收益统计</p>
      <p class="allHasDis">
        <span>最新净值:&nbsp;<font style="color:red;">{{starMesT.worth}}</font></span>
        <span>年化收益:&nbsp;<font style="color:red;">{{starMesT.annualized}}%</font></span>
      </p>
      <p class="allHasDis">
        <span>实盘天数:&nbsp;{{starMesT.days}}天</span>
        <span>最大回撤:&nbsp;<font style="color:green;">{{starMesT.max_retest}}%</font></span>
      </p>
      <p>
        累计收益:&nbsp;<font style="color:red;">{{starMesT.cumulative_income}}%</font>
      </p>
    </div>
    <div class="conEXP">
      <p>收费标准</p>
      <p>1.系统服务费:客户使用程序收益的30%</p>
      <p>2.该策略的风险标准为20%</p>
      <p>3.启动该策略,需先缴纳系统保证金</p>
      <p>4.系统使用保证金计算公式:<br>
        <span style="color:red;">启动本金×1.5%=AI智投保证金</span>
        <br>
        举例:20万启动本金,风险标准为-20%
        <br>
        200000×1.5%=3000
      </p>
      <p>5.客户使用系统没有正向收益,系统不收取任何费用</p>
    </div>
    <div class="buyBtn">
      <van-button color="linear-gradient(#44B3FF, #0588ff)" @click="buyStar=true">立即购买</van-button>
    </div>
    <!-- 购买策略 -->
    <div class="buyStar">
      <van-overlay :show="buyStar" @click="buyStar = false">
        <div class="wrapper" @click.stop>
          <div class="choosePlan">
            <p class="buyTitle">
              <van-icon name="clear" color="#f5222d" @click="buyStar = false"/>
              购买策略
            </p>
            <div class="mountChs">
              <p>资金规模</p>
              <p class="chooseBtn">
                <van-radio-group v-model="mountChs" direction="horizontal">
                  <van-radio :name="quoat.capital" icon-size="12px" :disabled="quoat.disable" v-for="(quoat,indexQu) in quoatList" :key="indexQu" style="marginBottom:.1rem;fontSize:.14rem;">{{quoat.capital}}万</van-radio>
                </van-radio-group>
              </p>
              <!-- <p class="chooseBtn">
                <van-radio-group v-model="mountChs" direction="horizontal">
                  <van-radio name="3" icon-size="12px">50.00万</van-radio>
                  <span class="parMask"></span>
                  <van-radio name="4" icon-size="12px">100.00万</van-radio>
                </van-radio-group>
              </p> -->
              <!-- <p class="writeMou">输入金额&nbsp;
                <input type="number" name="" value="0" v-model="manMount">&nbsp;万
              </p> -->
              <p class="reTitle">
                提示
              </p>
              <p class="reText">1.选择/输入您要投放在智能交易系统的交易资金</p>
              <p class="reText">2.您的个人股票账号的可用资金跟所选择的资金额度匹配,服务才会启动</p>
              <p>
                <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="goPay()">下一步</van-button>
              </p>
            </div>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 支付款项 -->
    <div class="wePay">
      <van-overlay :show="wePay" @click="wePay = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="wePay = false"/>
              购买策略
            </p>
            <p>预付保证金:</p>
            <p>{{quotaAmount}}元/月</p>
            <p>收款方:厦门小蚜虫量化软件开发有限公司</p>
            <p class="payAway">
              支付方式:&nbsp;&nbsp;&nbsp;&nbsp;
              <van-radio-group v-model="payAway" direction="horizontal">
                <van-radio :name="2" icon-size="14px">
                  <img src="../../assets/images/wePay.png" alt="">
                </van-radio>
                <span class="parMask"></span>
                <!-- <van-radio :name="1" icon-size="14px">
                  <img src="../../assets/images/alPay.png" alt="">
                </van-radio> -->
                <van-radio :name="4" icon-size="14px">
                  <img src="../../assets/images/alPay.png" alt="">
                </van-radio>
                <span class="parMask"></span>
                <van-radio :name="3" icon-size="14px">
                  <img src="../../assets/images/qrIcon.png" alt="">
                </van-radio>
              </van-radio-group>
              </p>
            <p>支付代表您已同意<router-link to="/userAgeTwo" tag="font" style="color:#0588ff;"><用户服务协议></router-link></p>
            <p class="reTitle">
              提示
            </p>
            <p class="reText">1.完成支付后请前往个人中心填写证券信息</p>
            <p class="reText">2.如遇到支付异常时，可选择其他支付方式</p>
            <p>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="goPayAway()">确认支付</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 支付成功 -->
    <div class="paySuccess">
      <van-overlay :show="paySuc" @click="paySuc = false">
        <div class="wrapper" @click.stop>
          <div class="paySuc">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="paySuc = false"/>
            </p>
            <p>
              <van-icon name="passed" />
              <br>
              支付成功
            </p>
            <p class="reText">1.自服务生效日起请务必不要操作程序化交易买入股票和确定投放的资金额度</p>
            <p class="reText">2.由此产生的损失由个人承担</p>
            <p class="reText">2.请前往个人中心完善个人资料</p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 支付失败 -->
    <div class="payError">
      <van-overlay :show="payErr" @click="payErr = false">
        <div class="wrapper" @click.stop>
          <div class="payErr">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="payErr = false"/>
            </p>
            <p>
              <van-icon name="close" color="#f5222d" />
              <br>
              支付失败
            </p>
            <p>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="goPayAway()">重新支付</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 手机认证 -->
    <div class="phAuth">
      <van-overlay :show="phAuth" @click="phAuth = false">
        <div class="wrapper" @click.stop>
          <div class="phAuthCon">
            <p class="phAuthTitle">
              <van-icon name="clear" color="#f5222d" @click="phAuth = false"/>
              手机认证
            </p>
            <p>
              <input type="number" name="" value="" placeholder="请输入手机号" v-model="bindMobile">
              <van-button color="white" v-if="Verification" @click="getCode()">获取</van-button>
              <van-button color="white" v-else :disabled="!Verification">({{timer}}s)</van-button>
            </p>
            <p>
              <input type="number" name="" value="" placeholder="验证码" v-model="bindCode">
              <span @click="reMark=true;">收不到验证码？</span>
            </p>
            <p>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="subBind()">立即认证</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <div class="reMark">
      <van-overlay :show="reMark" @click="reMark = false">
        <div class="wrapper" @click.stop>
          <div class="reMarkTitle">
            <p class="tTitle">
              <van-icon name="clear" color="#f5222d" @click="reMark = false"/>
              提示
            </p>
            <p>1.请确认您的手机号是否填写正确</p>
            <p>2.请确认您的手机是否欠费或停机</p>
            <p>3.检查您的网络状态是否正常</p>
            <p>4.如果以上问题均未出现请联系客服</p>
            <p>
              <van-icon name="phone-circle-o" />0792-3632652
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <div class="qyPay" v-if="qyPay" ref="qyPay"  @touchstart="start" @touchmove="move" @touchend="end">
      <img src="http://api.dahujing.com/img/alipay_qrcode.jpg?a=1" alt="">
      <p>长按扫码支付</p>
    </div>
    <Back/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import {mapState} from 'vuex'
import {getUser} from '@/assets/js/user.js'
import {GetUrlKey} from '@/assets/js/getShare.js'
import {getMyStar} from '@/assets/js/getMystar.js'
import VConsole from 'vconsole'
import {goLogin} from '@/assets/js/goLogin.js'
import '@/assets/js/gt.js'
export default {
  components:{
    Back
  },
  computed:{
    ...mapState(['userMes','token','sessionID'])
  },
  data(){
    return{
      getData:{
        tooltip: {
        trigger: 'axis',
        position: function (pt) {
              return [pt[0], '10%'];
          }
        },
        title: {
            left: '10',
            text: '收益曲线',
            textStyle:{
              fontSize:'16'
            }
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisTick:{
              show:false
            },
            axisLine:{       //y轴
              show:false,
              onZero:false
            },
            axisPointer: {
                type: 'none'
            },
            data:[],
            show:false,
        },{
          type: 'category',
          data: [],
          //设置position为bottom,另一个x轴会自动浮到最上面
          position:'bottom',
          axisTick:{
            show:false
          },
          axisLine:{       //y轴
            show:true,
            onZero:false
          },
          axisLabel:{
            rotate:-10,
            interval:6
          },
        }],
        yAxis: [
          {
              type: 'value',
              axisLine:{       //y轴
                show:false,
                onZero:false
              },
              axisTick:{
                show:false
              },
              axisLabel:{
                // formatter:function(index,value){
                //   return value
                // }
                formatter:'{value}%'
              },
              splitLine:{
                show:false
              },
              scale:true,
          },
          {
              type: 'value',
              axisLine:{       //y轴
                show:false,
                onZero:false
              },
              axisTick:{
                show:false
              },
              axisLabel:{
                formatter: '{value} %'
              },
              show:false,
              max:1,
              // min:0,
              scale:true
          }
        ],
        legend: {
             data: ['最新收益'],
             right:'80',
             top:'3px'
        },
        series: [
            {
                name: '最新收益',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: '#f60f0f'
                },
                lineStyle:{
                  width:'1'
                },
                yAxisIndex:0,
                areaStyle: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(246,15,15,.8)'
                    }, {
                        offset: 1,
                        color: '#fff'
                    }])
                },
                data: []
            },
            {
                name: '',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgba(255,180,0,.8)'
                },
                lineStyle:{
                  width:'1'
                },
                yAxisIndex:1,
                areaStyle: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255,180,0,.8)'
                    }, {
                        offset: 1,
                        color: '#fff'
                    }])
                },
                data: []
            }
        ],
      },
      buyStar:false,//购买策略
      mountChs:20,//方案选择
      mount:null,//方案金额
      manMount:0,//手动输入金额
      wePay:false,//确认支付
      paySuc:false,//支付成功
      payErr:false,//支付失败
      phAuth:false,//手机认证
      reMark:false,//提示信息
      starMes:{},//策略详情
      starMesT:{},//收益统计
      Verification:true,//从新获取验证码
      timer:60,
      bindMobile:null,//用户手机号
      bindCode:null,//验证码
      quoatList:[],//配资列表
      quotaID:null,//配资ID
      quotaAmount:3000,//配资价格
      shareID:null,
      payAway:2,//支付方式
      qyPay:false,
      longClick: 0,
      timeOutEvent: 0
    }
  },
  watch:{
    manMount(val,oldVal){
      if(val>20){
        this.mountChs=0;
      }
    },
    mountChs(val,oldVal){
      if(this.$route.query.payed){
        if(val==20){
          this.quotaAmount=parseInt(3000-this.$route.query.payed);
        }else if(val==30){
          this.quotaAmount=parseInt(4500-this.$route.query.payed);
        }else if(val==40){
          this.quotaAmount=parseInt(6000-this.$route.query.payed);
        }else if(val==50){
          this.quotaAmount=parseInt(7500-this.$route.query.payed);
        }else if(val==80){
          this.quotaAmount=parseInt(12000-this.$route.query.payed);
        }else if(val==100){
          this.quotaAmount=parseInt(15000-this.$route.query.payed);
        }
      }else{
        if(val==20){
          this.quotaAmount=3000;
        }else if(val==30){
          this.quotaAmount=4500;
        }else if(val==40){
          this.quotaAmount=6000;
        }else if(val==50){
          this.quotaAmount=7500;
        }else if(val==80){
          this.quotaAmount=12000;
        }else if(val==100){
          this.quotaAmount=15000;
        }
      }
    },
  },
  created(){
    if(GetUrlKey('strID',window.location.href)){
      this.shareID=GetUrlKey('strID',window.location.href);
    }else{
      this.shareID=this.$route.query.id;
    };
    //处理支付宝回执token丢失
      if(!window.localStorage.getItem('token')){
        window.location.href='http://m.dahujing.com'
      }
    //------>
  },
  mounted(){
    this.getStarDem();
    this.getStarDeT();
    this.getQuoat();
    setTimeout(()=>{
      if(this.$route.query.choose){
        this.buyStar=true;
      }
    },1000)
  },
  methods:{
    goPay(){//支付
      if(this.mountChs==1){
        this.mount=20;
      }else if(this.mountChs==2){
        this.mount=30;
      }else if(this.mountChs==3){
        this.mount=50;
      }else if(this.mountChs==4){
        this.mount=100;
      }else if(this.manMount>20){
        this.mountChs=0;
        this.mount=this.manMount;
      };
      this.buyStar=false;
      if(this.userMes.mobile==''||this.userMes.mobile==null){
        this.phAuth=true;
      }else{
        this.wePay=true;
      }
    },
    getStarDec(){//获取图表数据
      this.$axios.get(this.Uapi+'/user/chart/detail?strategy_id='+this.shareID+'&limit=10',{
        headers:{
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          let cumulative_income=[];
          res.data.data.list.forEach((e)=>{
            cumulative_income.push(e.cumulative_income)
          })
          let indec=[];
          res.data.data.list.forEach((e)=>{
            indec.push(e.index)
          })
          let date=[];
          res.data.data.list.forEach((e)=>{
            date.push(e.result_date)
          })
          // console.log(worth)
          this.getData.series[0].data=cumulative_income;
          this.getData.series[1].data=indec;
          let arr=[]
          this.getData.series[0].data.unshift(-2)
          this.getData.xAxis[0].data=date;
          this.getData.xAxis[1].data=date;
          let getEcharts=this.$echarts.init(document.getElementById('conEchats'))
          getEcharts.setOption(this.getData)
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    getStarDem(){//获取策略详情
      this.$axios.get(this.Uapi+'/user/strategy/'+this.shareID,{
        headers:{
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.starMes=res.data.data;
          this.getData.legend.data.push(res.data.data.zhishu);
          this.getData.series[1].name=res.data.data.zhishu;
          this.starMes.tag=this.starMes.tag.split(',');
          this.getStarDec();
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    getStarDeT(){//获取收益统计
      this.$axios.get(this.Uapi+'/user/result?strategy_id='+this.shareID,{
        headers:{
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.starMesT=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    getCode(){//获取验证码
      let _this=this;
      if(_this.bindMobile==null||_this.bindMobile==''){
        _this.$toast('请输入您的手机号')
      }else if(!(/^1[3456789]\d{9}$/.test(_this.bindMobile))){
        _this.$toast('请输入正确的手机号码')
      }else{
        _this.$toast.loading({
          message: '验证中...',
          forbidClick: true,
          loadingType: 'spinner',
        });
        _this.$axios.get('http://gt3.xiaoyachong.com/register').then(res=>{
          _this.$toast.clear()
          if(res.data.success==1){
            initGeetest({
              gt:res.data.gt,
              challenge:res.data.challenge,
              new_captcha:true,
              product:'bind',
              width:'100%',
            },(captchaObj)=>{
              captchaObj.onReady(()=>{
                captchaObj.verify();
              }).onSuccess(()=>{
                _this.$axios.post(_this.Uapi+'/user/sms',{
                  'mobile':_this.bindMobile,
                  'event':'verifyMobile'
                },{
                  headers:{
                    'Authorization':_this.baseToken,
                    'v':'v2',
                    'SessionId':_this.baseID
                  }
                }).then((res)=>{
                  if(res.data.state==1){
                    _this.$toast('验证码已发送')
                    _this.Verification = false;
                    let auth_timer = setInterval(()=>{
                      _this.timer--;
                      if(_this.timer<=0){
                        _this.Verification = true;
                        _this.timer=60;
                        clearInterval(auth_timer)
                      }
                    },1000)
                  }else{
                    _this.$toast(res.data.msg)
                  }
                }).catch((err)=>{
                  _this.$toast(errText)
                })
              }).onError(()=>{
                _this.$toast('验证出错啦')
              })
            })
          }else{
            this.$toast('网络错误')
          }
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
              _html.phAuth=false;
              _html.wePay=true;
            },1500)
            getUser()
          }else{
            _html.$toast(res.data.msg)
          }
        }).catch((err)=>{
          _html.$toast(_html.errText);
        })
      }
    },
    getQuoat(){//获取配资列表
      this.$axios.get(this.Uapi+'/user/order/preconfig?strategy='+this.shareID,{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        // alert(JSON.stringify(res));
        if(res.data.state==1){
          this.quoatList=res.data.data.quotas;
          for(let i in this.quoatList){
            if(this.quoatList[i].capital<=this.$route.query.amount){
              this.quoatList[i]={
                capital:this.quoatList[i].capital,
                id:this.quoatList[i].id,
                disable:true
              }
            };
            if(this.quoatList[i].capital==this.$route.query.amount){
              this.mountChs=this.quoatList[Number(i)+1].capital;
            }
          };
          // console.log(this.quoatList.indexOf())
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText);
      })
    },
    starPay(){//支付验证
      this.$toast.loading({
        message: '请求中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      this.$axios.post(this.Uapi+'/user/index/wxconfig',{
        url:window.location.href
      }).then((res)=>{
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
          if(this.$route.query.orderID){
            this.zhuiPay()
          }else{
            this.wxPay();
          }
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
    wxPay(){//统一下单
      this.quoatList.forEach((e)=>{
        if(this.mountChs==e.capital){
          this.quotaID=e.id;
        }
      })
      this.$axios.post(this.Uapi+'/user/order',{
        'scene':'pre',
        'strategy':this.shareID,
        'quota':this.quotaID,
        'payed_type':'allinpay',
        'trade_type':'W02'
      },{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
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
              // this.$toast('支付成功');
              this.paySuc=true;
              this.wePay=false;
              setTimeout(()=>{
                this.$router.push({
                  path:'/mine',
                  query:{
                    hasBuy:true
                  }
                })
              },3000)
              getUser();
            }),
            cancel:((err)=>{
              this.$toast('取消支付')
              // alert()
            }),
            fail:((fall)=>{
              this.payErr=true;
              this.wePay=false;
              this.$toast('购买失败，请重新创建订单')
            })
          });
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
    zhuiPay(){//追加
      this.quoatList.forEach((e)=>{
        if(this.mountChs==e.capital){
          this.quotaID=e.id;
        }
      });
      this.$axios.get(this.Uapi+'/user/neworder?id='+this.$route.query.orderID+'&ntype=2&quota='+this.quotaID,{
        headers:{
          'Authorization':this.baseToken,
          'sessionId':this.baseID,
          'v':'v2',
        }
      }).then(res=>{
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
              // this.$toast('支付成功');
              this.paySuc=true;
              this.wePay=false;
              setTimeout(()=>{
                this.$router.push({
                  path:'/mine',
                  query:{
                    hasBuy:true
                  }
                })
              },3000)
              getUser();
            }),
            cancel:((err)=>{
              this.$toast('取消支付')
            }),
            fail:((fall)=>{
              this.payErr=true;
              this.wePay=false;
              this.$toast('购买失败，请重新创建订单')
            })
          });
        }else{
          this.$toast(res.data.msg)
        }
      }).catch(err=>{
        this.$toast(this.errText)
      })
    },
    starAiPay(){//支付宝支付
      this.quoatList.forEach((e)=>{
        if(this.mountChs==e.capital){
          this.quotaID=e.id;
        }
      });
      this.$toast.loading({
        message: '请求中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      this.$axios.post(this.Uapi+'/user/order',{
        'scene':'pre',
        'strategy':this.shareID,
        'quota':this.quotaID,
        'payed_type':'allinpay',
        'trade_type':'A022'
      },{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.$toast.clear();
          window.location.href=res.data.data.pay_url;
        }else{
          this.$toast.clear();
          this.$toast(res.data.msg)
        }
      }).catch(err=>{
        this.$toast.clear();
        this.$toast(this.errText)
      })
    },
    goPayAway(){//前往支付
      if(this.payAway==2){
        this.starPay()
      }else if(this.payAway==1){
        this.starAiPay()
      }else if(this.payAway==3){
        this.quoatList.forEach((e)=>{
          if(this.mountChs==e.capital){
            this.quotaID=e.id;
          }
        });
        this.$toast.loading({
          message: '请求中...',
          forbidClick: true,
          loadingType: 'spinner',
        });
        this.$axios.post(this.Uapi+'/user/order',{
          'scene':'pre',
          'strategy':this.shareID,
          'quota':this.quotaID,
          'payed_type':'allinpay',
          'trade_type':'A023'
        },{
          headers:{
            'Authorization':this.baseToken,
            'SessionId':this.baseID,
            'v':'v2'
          }
        }).then((res)=>{
          if(res.data.state==1){
            this.$toast.clear();
            this.qyPay=true;
            setTimeout(()=>{
              this.$refs.qyPay.style.opacity='1'
            },100)
          }else{
            this.$toast.clear();
            this.$toast(res.data.msg)
          }
        }).catch(err=>{
          this.$toast.clear();
          this.$toast(this.errText)
        })
      }else{
        this.quoatList.forEach((e)=>{
          if(this.mountChs==e.capital){
            this.quotaID=e.id;
          }
        });
        this.$toast.loading({
          message: '请求中...',
          forbidClick: true,
          loadingType: 'spinner',
        });
        this.$axios.post(this.Uapi+'/user/order',{
          'scene':'pre',
          'strategy':this.shareID,
          'quota':this.quotaID,
          'payed_type':'allinpay',
          'trade_type':'A01'
        },{
          headers:{
            'Authorization':this.baseToken,
            'SessionId':this.baseID,
            'v':'v2'
          }
        }).then((res)=>{
          if(res.data.state==1){
            this.$toast.clear();
            window.location.replace(res.data.data.pay_url)
          }else{
            this.$toast.clear();
            this.$toast(res.data.msg)
          }
        }).catch(err=>{
          this.$toast.clear();
          this.$toast(this.errText)
        })
      }
    },
    gotouchend(){

    },
    start() {
      var that = this;
      this.longClick = 0;
      this.timeOutEvent = setTimeout(function() {
        that.longClick = 1;
      }, 500);
    },
    move(e) {
      clearTimeout(this.timeOutEvent);
      this.timeOutEvent = 0;
      e.preventDefault();
    },
    end() {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0 && this.longClick == 0) {
        this.$refs.qyPay.style.opacity='0';
        setTimeout(()=>{
          this.qyPay=false;
          this.payAway=2;
          this.$toast('稍后可在我的订单中查看支付状态')
        },400)
      }
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
.starCon{
  width: 100%;
  // margin:0 auto;
  padding-bottom: .7rem;
  .conFir{
    width: 95%;
    margin:0 auto;
    box-sizing: border-box;
    padding: .1rem .15rem;
    background: white;
    border-radius: 10px;
    margin-top: .1rem;
    p{
      text-align: left;
      font-size: $fontText;
    }
    p:first-child{
      font-size: $fontText;
      font-weight: bold;
    }
    .hasDis{
      width: 100%;
      display: flex;
      line-height: .3rem;
      margin-top: .1rem;
      span{
        width: 40%;
        text-align: left;
      }
      span:last-child{
        width: 60%;
      }
    }
    p:nth-child(5){
      margin-top: .1rem;
      margin-bottom: .1rem;
    }
    p:last-child{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      span{
        padding: 0 5px;
        border:1px solid $themeColor;
        margin-left: 8px;
        border-radius: 10px;
        color:$themeColor;
      }
    }
  }
  .conEchats{
    width: 95%;
    margin:0 auto;
    padding-top: .1rem;
    background: white;
    margin-top: .2rem;
    border-radius: 10px;
    height: 3rem;
    overflow: hidden;
    position: relative;
    .mask{
      width: .1rem;
      height: 100%;
      background: white;
      position: absolute;
      top:0;
      right:0;
    }
    #conEchats{
      width: 115%;
      height: 3.2rem;
      right: -.1rem;
      z-index: 1;
      top:0;
    }
  }
  .conAll{
    width: 90%;
    margin:0 auto;
    margin-top: .1rem;
    padding: .1rem .1rem;
    background: white;
    border-radius: 10px;
    p{
      text-align: left;
      font-size: $fontText;
    }
    p:first-child{
      font-size: $fontTitle;
      font-weight: bold;
    }
    .allHasDis{
      width: 100%;
      display: flex;
      span{
        width: 50%;
        text-align: left;
        line-height: .3rem;
      }
    }
  }
  .conEXP{
    width: 90%;
    margin:0 auto;
    margin-top: .1rem;
    p{
      color:$moreColor;
      text-align: left;
      font-size: $fontText;
      line-height: .24rem;
    }
    p:first-child{
      font-size: $fontTitle;
      font-weight: bold;
      color:black;
    }
  }
  .buyBtn{
    width: 100%;
    margin:0 auto;
    position: fixed;
    bottom:0;
    text-align: center;
    padding-bottom: .1rem;
    height: .5rem;
    background: white;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    z-index: 100;
    button{
      width: 95%;
      border-radius: 5px;
      height: .35rem;
      border-radius: 30px;
      font-size: $fontTitle;
      position: absolute;
      top:.1rem;
      left:50%;
      margin-left: -47.5%;
    }
  }
  .buyStar{
    text-align: center;
    .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .choosePlan{
        width: 3rem;
        padding: .1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
        .buyTitle{
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
        .mountChs{
          width: 92%;
          margin:0 auto;
          p:first-child{
            text-align: left;
            font-weight: none;
            font-size: $fontText;
            margin-top: .1rem;
          }
          .chooseBtn{
            width: 60%;
            display: flex;
            justify-content: space-between;
            margin:0 auto;
            margin-top: .1rem;
          }

          .writeMou{
            text-align: left;
            font-weight: none;
            font-size: $fontText;
            margin-top:.1rem;
            margin-bottom: .1rem;
            input{
              width: .4rem;
              border-radius: 6px;
              border: 1px solid #ccc;
              text-align: center;
            }
          }
          .reTitle{
            text-align: left;
            color:$warningColor;
            font-size: $fontText;
          }
          .reText{
            text-align: left;
            font-size: $fontText;
            color:$moreColor;
            margin-top: .05rem;
          }
          p:last-child{
            width: 100%;
            margin-top: .1rem;
            position: relative;
            height: .4rem;
            button{
              width: 80%;
              height: .3rem;
              border-radius: 15px;
              position: absolute;
              top:0;
              left:50%;
              margin-left: -40%;
            }
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
          font-size: $fontText;
        }
        p:nth-child(2){
          margin-top: .05rem;
          font-size: $fontText;
        }
        p:nth-child(3){
          text-align: center;
          line-height: .4rem;
          font-size: $fontTitle;
          color:$themeColor;
          font-weight: bold;
        }
        .payAway{
          width: 100%;
          font-size: $fontText;
          display: flex;
          margin-top: .2rem;
          margin-bottom: .2rem;
          box-sizing: border-box;
          padding-left: .1rem;
          color:black!important;
          position: relative;
          .parMask{
            width: .35rem;
          }
          img{
            position: absolute;
            top:50%;
            margin-top: -.125rem;
            width: .25rem;
            height: .25rem;

          }
        }
        p:nth-child(5){
          color:$moreColor;
          font-size: $fontText;
          line-height: .3rem;
        }
        p:nth-child(6){
          line-height: .3rem;
          font-size: $fontText;
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
        .reTitle{
          text-align: left;
          color:$warningColor;
          font-size: $fontTitle;
        }
        .reText{
          text-align: left;
          font-size: $fontText;
          color:$moreColor;
          margin-top: .05rem;
        }
        p:last-child{
          width: 100%;
          margin-top: .1rem;
          text-align: center;
          height: .4rem;
          position: relative;
          button{
            width: 80%;
            height: .3rem;
            border-radius: 15px;
            position: absolute;
            top:0;
            left:50%;
            margin-left: -40%;
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
      .paySuc{
        width: 3rem;
        padding: .1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
        .payTitle{
          width: 100%;
          position: relative;
          height: .3rem;
          font-size: $fontTitle;
          i{
            position: absolute;
            font-size: $iconSize;
            left:.05rem;
            top:.05rem;
          }
        }
        p:nth-child(2){
          font-size: $fontText;
          font-weight: bold;
          margin-bottom: .1rem;
          i{
            font-size: 90px;
            color:$themeColor;
          }
        }
        .reText{
          width: 90%;
          margin:0 auto;
          text-align: left;
          font-size: $fontText;
          color:$moreColor;
          margin-top: .1rem;
        }
      }
    }
  }
  .payError{
    text-align: center;
    .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .payErr{
        width: 3rem;
        padding: .1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
        .payTitle{
          width: 100%;
          position: relative;
          height: .3rem;
          font-size: $fontTitle;
          i{
            position: absolute;
            font-size: $iconSize;
            left:.05rem;
            top:.05rem;
          }
        }
        p:nth-child(2){
          font-size: $fontText;
          font-weight: bold;
          margin-bottom: .1rem;
          color:$warningColor;
          i{
            font-size: 90px;
            color:$themeColor;
          }
        }
        p:last-child{
          width: 100%;
          padding-bottom: .1rem;
          text-align: center;
          position: relative;
          height: .4rem;
          button{
            width: $widthAll;
            height: .3rem;
            border-radius: 15px;
            position: absolute;
            top:.1rem;
            left:50%;
            margin-left: -1.2rem;
          }
        }
      }
    }
  }
  .phAuth{
    .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .phAuthCon{
        width: 3rem;
        padding: .1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
        text-align: center;
        .phAuthTitle{
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
          width: 90%;
          margin:0 auto;
          text-align: left;
          margin-top:.2rem;
          display: flex;
          border-bottom: 1px solid #eee;
          padding-bottom: .02rem;
          box-sizing: border-box;
          input{
            height: .28rem;
            line-height: .28rem;
            width: 65%;
            text-align: center;
            font-size: .13rem;
            background: white;
          }
          button{
            margin-left: .05rem;
            width: 30%;
            height: .28rem;
            border-radius: 15px;
            font-size: .13rem;
            color:$themeColor!important;
            font-size: $fontText+.01;
          }
        }
        p:nth-child(3){
          width: 90%;
          margin:0 auto;
          text-align: left;
          margin-top: .3rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #eee;
          padding-bottom: .02rem;
          box-sizing: border-box;
          input{
            border-radius: 15px;
            height: .3rem;
            line-height: .3rem;
            width: 50%;
            text-align: center;
            font-size: .13rem;
            background: white;
          }
          span{
            width: 50%;
            box-sizing: border-box;
            padding-left: .15rem;
            line-height: .3rem;
            color:$themeColor;
            font-size: $fontText;
          }
        }
        p:last-child{
          width: 100%;
          text-align: center;
          margin-top: .3rem;
          position: relative;
          height: .4rem;
          button{
            width: $widthAll+.3;
            height:.3rem;
            border-radius: 15px;
            position: absolute;
            top:0;
            left:50%;
            margin-left: -1.35rem;
          }
        }
      }
    }
  }
  .reMark{
    text-align: center;
    .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .reMarkTitle{
        width: 3rem;
        padding: .1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
      }
      .tTitle{
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
        width: 80%;
        margin:0 auto;
        text-align: left;
        line-height: .3rem;
        font-size: $fontText;
      }
      p:last-child{
        width: 100%;
        text-align: center;
        color:$themeColor;
        font-size: $fontText;
        font-weight: bold;
        line-height: .3rem;
        margin-top: .1rem;
        position: relative;
        i{
          font-size: $iconSize;
          position: absolute;
          top:50%;
          margin-top: -10px;
          left: .7rem;
        }
      }
    }
  }
  .qyPay{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    top:0;
    left: 0;
    z-index: 3002;
    text-align: center;
    box-sizing: border-box;
    padding-top: 10%;
    opacity: 0;
    transition: .4s all;
    img{
      width: 70%;
    }
    p{
      width: 100%;
      text-align: center;
      color:white;
      font-size: .2rem;
      font-weight: bold;
    }
  }
}
</style>
