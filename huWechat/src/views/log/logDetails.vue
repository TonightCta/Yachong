<!-- 历史回顾内页 -->
<template lang="html">
  <div class="logDetails">
    <!-- <van-tabs v-model="active" color="#0588ff" swipeable title-active-color="#0588ff" sticky>
      <van-tab title="历史行情回顾">
      </van-tab>
      <van-tab title="历史必涨股票">
        <LogList/>
      </van-tab>
    </van-tabs> -->
    <LogCon :Code="code"/>
    <Back padding="10 10 60 10"/>
  </div>
</template>

<script>
import LogList from './logList/logList'
import LogCon from './logCon/logCon'
import Back from '@/components/backCom/backBtn'
import {GetUrlKey} from '@/assets/js/getShare.js'
export default {
  data(){
    return{
      active:0,
      code:null,
    }
  },
  created(){
    if(GetUrlKey('log',window.location.href)){
      this.code=GetUrlKey('log',window.location.href)
    }else{
      this.code=this.$route.query.log;
    }
  },
  components:{
    LogList,
    LogCon,
    Back
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      if(vm.$route.query.title){
        document.title='历史回顾-'+vm.$route.query.title
      }else{
        document.title='历史回顾'
      }
    })
  },
}
</script>

<style lang="scss" scoped>

</style>
