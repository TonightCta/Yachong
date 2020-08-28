<!-- 蚜虫扫雷内页 -->
<template lang="html">
  <div class="radarDetails">
    <Con1 :Code="getCode"/>
    <Con2 :Code="getCode"/>
    <Con3 :Code="getCode"/>
    <Con4 :Code='getCode'/>
    <Con5 :Code='getCode'/>
    <Con6 :Code='getCode'/>
    <p class="remark">所有数据与信息仅供参考，不构成投资建议</p>
    <Back/>
  </div>
</template>

<script>
import Con1 from './detailsCon1'
import Con2 from './detailsCon2'
import Con3 from './detailsCon3'
import Con4 from './detailsCon4'
import Con5 from './detailsCon5'
import Con6 from './detailsCon6'
import Back from '@/components/backCom/backBtn'
import { GetUrlKey } from '@/assets/js/getShare.js';
export default {
  data(){
    return{
      getCode:null,
    }
  },
  components:{
    Back,Con1,Con2,Con3,Con4,Con5,Con6
  },
  created(){
    if(GetUrlKey('radar',window.location.href)){
      this.getCode=GetUrlKey('radar',window.location.href)
    }else{
      this.getCode=this.$route.query.codeRadar;
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      if(vm.$route.query.title){
        document.title='蚜虫扫雷-'+vm.$route.query.title
      }else{
        document.title='蚜虫扫雷'
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.remark{
  width: 100%;
  line-height: .4rem;
  color:$moreColor;
  text-align: center;
  font-size: $fontText;
}
</style>
