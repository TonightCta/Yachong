<!-- 提现详情 -->
<template lang="html">
  <div class="backDe">
    <div class="backLine">
      <div class="lineBox">
        <van-steps :active="backMes.status" active-color="#0588ff">
          <van-step>发起退款<br>
            <span v-if="backMes.create_time!=null&&backMes.create_time!=''">{{backMes.create_time.substring(0,10)}}</span>
            <span v-else>-</span>
          </van-step>
          <van-step>审核中<br>
            <span v-if="backMes.audit_time!=null&&backMes.audit_time!=''">{{backMes.audit_time.substring(0,10)}}</span>
            <span v-else>-</span>
          </van-step>
          <van-step>退款成功<br>
            <span v-if="backMes.tixian_time!=null&&backMes.tixian_time!=''">{{backMes.tixian_time.substring(0,10)}}</span>
            <span v-else>-</span>
          </van-step>
        </van-steps>
      </div>
    </div>
    <div class="backMes">
      <p>退款金额:&nbsp;<span>{{backMes.money}}元</span></p>
      <p>退回账户:&nbsp;尾号{{weiNum}}的<font v-if="backMes.type==1">银行卡</font><font v-else>支付宝</font>账户</p>
      <p>到账时间:&nbsp;预计在提交申请后三个工作日到账</p>
      <p>订单编号:&nbsp;{{orderSn}}</p>
    </div>
    <Back/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
export default {
  components:{Back},
  data(){
    return{
      backMes:{
        status:0
      },
      active:0,
      weiNum:null,
      orderSn:null,
    }
  },
  created(){
    this.getBaDe();
    this.getBaID()
  },
  methods:{
    getBaDe(){
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      this.$axios.get(this.Uapi+'/user/tixianinfo?order_id='+this.$route.query.backID,{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then(res=>{
        if(res.data.state==1){
          if(res.data.data!=null){
            this.backMes=res.data.data;
            this.weiNum=res.data.data.cardno.substring(res.data.data.cardno.length-4,res.data.data.cardno.length);
          }
          this.$toast.clear()
        }else{
          this.$toast(res.data.msg)
          this.$toast.clear()
        }
      }).catch(err=>{
        this.$toast(this.errText)
        this.$toast.clear()
      })
    },
    getBaID(){
      this.$axios.get(this.Uapi+'/user/order/'+this.$route.query.backID,{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then(res=>{
        if(res.data.state==1){
          this.orderSn=res.data.data.order_sn;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch(err=>{
        this.$toast(this.errText)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.backDe{
  width: 100%;
  .backLine{
    width: 100%;
    height: 1rem;
    background: white;
    margin-top: .05rem;
    .lineBox{
      width: 90%;
      margin:0 auto;
    }
  }
  .backMes{
    box-sizing: border-box;
    padding: .1rem .26rem;
    background: white;
    margin-top: .05rem;
    p{
      font-size: .15rem;
      line-height: .4rem;
      span{
        color:$themeColor;
      }
    }
  }
}
</style>
