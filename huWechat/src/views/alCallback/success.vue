<template lang="html">
  <div class="">
    <p class="icon">
      <img src="../../assets/images/succ.png" alt="">
      <br>
      支付成功
    </p>
    <div class="mes">
      <ul>
        <li>订单编号:</li>
        <li>支付金额:</li>
        <li>下单时间:</li>
      </ul>
      <ul>
        <li>{{order_sn}}</li>
        <li>{{order_amount}}</li>
        <li>{{create_time}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { GetUrlKey } from '@/assets/js/getShare.js';
export default {
  data(){
    return{
      create_time:null,
      order_amount:null,
      order_sn:null,
    }
  },
  created(){
    this.getOrder()
  },
  methods:{
    getOrder(){
      this.$axios.get('http://m.dahujing.com/dev/user/order/'+GetUrlKey('order_sn',window.location.href)).then(res=>{
        if(res.data.state==1){
          this.create_time=res.data.data.create_time
          this.order_amount=res.data.data.order_amount
          this.order_sn=res.data.data.order_sn
        }else{
          // alert(JSON.stringify())
          this.$toast(res.data.msg)
        }
      }).catch(err=>{
        this.$toast('网络异常')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.icon{
  width: 100%;
  text-align: center;
  color:$themeColor;
  font-size: .22rem;
  font-weight: bold;
  margin-top: 1rem;
  img{
    width: 1rem;
    height: 1rem;
  }
}
.mes{
  width: 80%;
  margin:0 auto;
  display: flex;
  margin-top: .3rem;
  ul{
    li{
      line-height: .5rem;
      font-size: $fontTitle;
    }
  }
  ul:last-child{
    box-sizing: border-box;
    padding-left: .15rem;
  }
}
</style>
