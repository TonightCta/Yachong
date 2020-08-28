<!-- 我的钱包-->
<template lang="html">
  <div class="wallet">
    <van-tabs v-model="active" color="#0588ff" title-active-color="#0588ff">
      <van-tab title="余额" name="余额">
        <Balance/>
      </van-tab>
      <van-tab title="保证金" name="保证金">
        <Bond/>
      </van-tab>
    </van-tabs>
    <Back :ClearBa='clearWin'/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import Balance from './balance'
import Bond from './bond'
import {mapState} from 'vuex'
export default {
  components:{
    Back,Balance,Bond
  },
  computed:{
    ...mapState(['userMes'])
  },
  data(){
    return{
      active:'余额',
      clearWin:true,
    }
  },
  created(){
    if(window.sessionStorage.getItem('WaActive')){
      this.active=window.sessionStorage.getItem('WaActive');
    }
  },
  methods:{
    a(){
      alert(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet{
  width: 100%;

}
</style>
