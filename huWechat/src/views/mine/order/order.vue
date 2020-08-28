<!-- 我的订单 -->
<template lang="html">
  <div class="orderCon">
    <div class="searchBox">
      <p class="searchInp">
        <van-field
          v-model="orderNum"
          right-icon="search"
          placeholder="输入订单名称/订单日期"
          :clearable="true"
          input-align="center"
          @clear="getOrder()"
        />
      </p>
    </div>
    <div class="listBox">
      <div class="tabsHeader">
        <van-tabs v-model="orderState" sticky class="aaaa"  @click="filOrderJS" color="#0588ff" title-active-color="#0588ff">
          <van-tab v-for="index in tabList" :title=index.text :key="index.code"></van-tab>
        </van-tabs>
      </div>
      <div ref="scroller" style="marginTop:.5rem;">
        <scroller :on-refresh="reOrder" :on-infinite="onInfinite">
          <div class=""ref="newsDa">
            <ul>
              <li v-for="(orderMes,indexOr) in orderList" :key="indexOr" @click="goOrDe(indexOr)">
                <p class="listTitle">{{orderMes.content.name}}</p>
                <!-- <p class="listTitle" v-if="orderMes.order_type==3">代理费用</p>
                <p class="listTitle" v-if="orderMes.order_type==8">优选开通费用</p> -->
                <p class="mountMes" v-if="orderMes.status==2">
                  <span v-if="orderMes.order_type==1">配置金额:{{orderMes.content.quota}}(万元)</span>
                  <span>支付金额:<font>{{orderMes.order_amount}}(元)</font></span>
                </p>
                <p class="mountMesSec" v-if="orderMes.order_type!=4&&orderMes.status!=2">资金规模:&nbsp;{{orderMes.content.quota}}(万元)</p>
                <p class="mountMesSec">下单时间:&nbsp;{{orderMes.create_time}}</p>
                <p style="width:100%;fontSize:.13rem;">
                  <span>订单编号:{{orderMes.order_sn}}</span>
                </p>
                <p class="operBtn" v-if="orderMes.status==1">
                  <span class="cancelPay">
                    <font @click="cancelOrder(indexOr)">取消支付</font>
                  </span>
                  <span>
                    <font @click="backPay(indexOr)">
                      立即支付
                    </font>
                  </span>
                </p>
                <p class="operBtn payOver" v-else>
                  <span class="cancelPay">
                    <font v-if="orderMes.status==3" style="fontSize:.15rem;">已取消</font>
                    <font v-else>¥&nbsp;{{orderMes.order_amount}}</font>
                  </span>
                  <span>
                    <font @click="goDetails(indexOr)" v-if="orderMes.order_type!=3&&orderMes.order_type!=8&&orderMes.status!=2&&orderMes.order_type!=4">重新下单</font>
                    <!-- <van-button color="linear-gradient(#44B3FF, #0588ff)"></van-button> -->
                  </span>
                </p>
                <span class="note" v-if="orderMes.status==3">已取消</span>
                <span class="note" v-else>{{orderMes.status_txt}}</span>
              </li>
            </ul>
          </div>
        </scroller>
      </div>
    </div>
    <Back padding="10 10 60 10"/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
export default {
  data(){
    return{
      orderNum:null,//搜索订单号
      orderList:[],
      orderID:null,
      isLoading:false,
      orderState:0,//订单状态
      listLength:false,
      newsDaHeight:null,//动态盒子高度
      orderPage:1,//订单页码
      orderStatus:0,//订单状态
      tabList:[
        {
          text:'全部',
          code:0
        },
        {
          text:'待支付',
          code:1
        },
        {
          text:'已支付',
          code:2
        },
        {
          text:'已取消',
          code:3
        },
        {
          text:'已完成',
          code:4
        },
        // {
        //   text:'待退款',
        //   code:4
        // },
        // {
        //   text:'已退款',
        //   code:5
        // }
      ],//切换列表
    }
  },
  created(){
    this.getOrder();
    // alert(this.baseToken)
  },
  mounted(){
    // this.newsDaHeight=document.documentElement.clientHeight - this.$refs.newsDa.getBoundingClientRect().top;
    this.getHeight()
  },
  watch:{
    orderNum(val,oldVal){//热搜索
      let reg = new RegExp("^[0-9\u4e00-\u9fa5]+$");
      // if(!reg.test(val)){
      //   this.orderNum=''
      // }else{
        if(val!=''&&val!=null){
          this.searchOrder()
          console.log(val)
        }else{
          this.getOrder()
        }
      // }
    }
  },
  components:{
    Back
  },
  methods:{
    getOrder(){//获取订单列表
      this.$toast.loading({
        message: '数据加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      this.$axios.get(this.Uapi+'/user/order/my?page='+this.orderPage,{headers:{
        'Authorization':this.baseToken,
        'SessionId':this.baseID,
        'v':'v2'
      }}).then((res)=>{
        if(res.data.state==1){
          this.orderList=res.data.data.list;
          this.$toast.clear()
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    filOrder(){
      this.$toast.loading({
        message: '数据加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      this.$axios.get(this.Uapi+'/user/order/my?page='+this.orderPage+'&status='+this.orderStatus,{headers:{
        'Authorization':this.baseToken,
        'SessionId':this.baseID,
        'v':'v2'
      }}).then((res)=>{
        if(res.data.state==1){
          this.orderList=res.data.data.list
          this.$toast.clear()
        }else{
          this.$toast(res.data.msg)
          this.$toast.clear()
        }
      }).catch((err)=>{
        this.$toast(this.errText)
        this.$toast.clear()
      })
    },
    searchOrder(){//搜索订单
      this.$axios.get(this.Uapi+'/user/orders?order_sn='+this.orderNum,{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'V':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.orderList=[];
          this.orderList.push(res.data.data);
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    backPay(index){//支付验证
      this.orderID=this.orderList[index].id;
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
          this.turnPay()
        }
      });
    },
    turnPay(){//统一下单
      this.$axios.get(this.Uapi+'/user/payorder?id='+this.orderID,{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
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
            this.$toast('支付成功')
          }),
          cancel:((err)=>{
            this.$toast('取消支付')
          }),
          fail:((fall)=>{
            this.$toast('购买失败，请重新创建订单')
          })
        });
        // wx.error((err)=>{
        //   alert('wx错误')
        // })
      })
    },
    reOrder(done){//刷新数据
      if(this.orderNum!=null&&this.orderNum!=null&&this.orderNum.length==22){
        this.searchOrder()
      }else if(this.orderStatus!=0){
        this.filOrder();
      }else{
        this.getOrder()
      }
      setTimeout(()=>{
        this.$toast('刷新成功')
        done()
      },1000)
    },
    onInfinite(done){//加载更多
    // this.orderPage++;
      setTimeout(()=>{
        done(true)
      },1500)
    },
    getHeight(){//获取盒子高度
      let bodyHeight = document.documentElement.clientHeight;
      let scroller = this.$refs.scroller;
      let scrollerTop = scroller.getBoundingClientRect().top;
      scroller.style.height = (bodyHeight-scrollerTop)+"px";
    },
    filOrderJS(name,title){//切换订单状态
      if(name==0){
        this.orderStatus=0;
        this.getOrder()
      }else if(name==1){
        this.orderStatus=1;
        this.filOrder();
      }else if(name==2){
        this.orderStatus=2;
        this.filOrder();
      }else if(name==4){
        this.orderStatus=4;
        this.filOrder();
      }else if(name==3){
        this.orderStatus=3;
        this.filOrder();
      }
    },
    goDetails(index){//重新下单
      this.$router.push({
        path:'/starCon',
        query:{
          id:this.orderList[index].content.id
        }
      })
    },
    cancelOrder(index){//取消订单
      this.$axios.get(this.Uapi+'/user/order/cancle?id='+this.orderList[index].id,{
        headers:{
          'Authorization':this.baseToken,
          'sessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.$toast('取消成功')
          if(this.orderState==0){
            this.getOrder();
          }else if(this.orderState==1){
            this.orderStatus=1;
            this.filOrder()
          }
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    goOrDe(index){//订单详情
      this.$router.push({
        path:'/orderDetails',
        query:{
          orderID:this.orderList[index].order_sn
        }
      })
    },
  },

}
</script>

<style lang="scss" scoped>
.orderCon{
  width: 100%;
  .searchBox{
    display: block;
    background: $themeColor;
    padding: .5rem .2rem;
    position: fixed;
    width: 100%;
    top:0;
    left:0;
    z-index: 10;
    box-sizing: border-box;
    .searchInp{
      width: 80%;
      margin:0 auto;
    }
  }
  .listBox{
    width: 100%;
    margin:0 auto;
    margin-top: 1.8rem;
    position: relative;
    .tabsHeader{
      width: 100%;
      position: fixed;
      top: 1.3rem;
      z-index: 10;
    }
    ul{
      width: 95%;
      margin:0 auto;
      margin-top: .1rem;
      li{
        padding: .05rem .1rem;
        padding-bottom: .15rem;
        border-radius: 10px;
        background: white;
        box-shadow: 0px 0px 10px #ccc;
        position: relative;
        overflow: hidden;
        margin-bottom: .2rem;
        p{
          text-align: left;
        }
        .listTitle{
          font-size: $fontTitle;
          font-weight: bold;
          line-height: .3rem;
        }
        .mountMes{
          width: 100%;
          display: flex;
          line-height: .3rem;
          font-size: $fontText;
          span{
            width: 50%;
            font{
              color:$warningColor;
            }
          }
        }
        .mountMesSec{
          line-height: .3rem;
          font-size: $fontText;
        }
        .operBtn{
          width: 100%;
          display: flex;
          margin-top: .2rem;
          height: .3rem;
          line-height: .3rem;
          span{
            width: 50%;
            height: .3rem;
            line-height: .3rem;
            position: relative;
            font{
              position: absolute;
              top:0;
            }
          }
          span:last-child{
            text-align: center;
            font{
              display: inline-block;
              width: .8rem;
              height: .24rem;
              text-align: center;
              line-height: .24rem;
              border-radius: 5px;
              color:$themeColor;
              font-size: $fontText;
              box-sizing: border-box;
              background: linear-gradient(#44B3FF, #0588ff);
              color:white;
            }
          }
          .cancelPay{
            font{
              display: inline-block;
              width: .8rem;
              height: .24rem;
              border:1px solid $themeColor;
              text-align: center;
              line-height: .24rem;
              border-radius: 5px;
              color:$themeColor;
              font-size: $fontText;
              box-sizing: border-box;
            }
          }
        }
        .payOver{
          margin-top:.1rem;
          .cancelPay{
            font-size: .2rem;
            font{
              border:0;
              font-size: .2rem;
              width: auto;
              color:$warningColor;
              font-weight: bold;
            }
          }
        }
        .note{
          position: absolute;
          width: 1rem;
          height: .2rem;
          line-height: .2rem;
          background: $themeColor;
          color:white;
          transform: rotate(45deg);
          right:-.3rem;
          top:.1rem;
          font-weight: bold;
          text-align: center;
          font-size: $fontText;
        }
      }
    }
  }
}
</style>
