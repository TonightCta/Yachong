<!-- 消息详情 -->
<template lang="html">
  <div class="mesDetails">
    <p class="mesTitle">{{mesData.title}}</p>
    <p class="mesCon">{{mesData.content.text}}</p>
    <p class="mesDate">{{mesData.create_time}}</p>
    <BackBtn/>
  </div>
</template>

<script>
import BackBtn from '@/components/backCom/backBtn'
export default {
  components:{BackBtn},
  data(){
    return{
      mesData:{
        title:null,
        create_time:null,
        content:{
          text:null,
        }
      }
    }
  },
  created(){
    this.getDetails()
  },
  methods:{
    getDetails(){
      this.$axios.get(this.Uapi+'/user/message/'+this.$route.query.id,{
        headers:{
          'Authorization':this.baseToken,
          'sessionId':this.baseID,
          'v':'v2'
        }
      }).then(res=>{
        if(res.data.state==1){
          this.mesData=res.data.data;
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
.mesDetails{
  width: 100%;
  box-sizing:border-box;
  padding: .1rem;
  .mesTitle{
    font-size: .18rem;
    font-weight: bold;
  }
  .mesCon{
    font-size: $fontTitle;
    margin-top: .1rem;
    margin-bottom: .1rem;
    color:black;
  }
  .mesDate{
    width: 100%;
    text-align: right;
    font-size: $fontText;
    color:$moreColor;
    padding-bottom:.2rem;
    border-bottom: 1px solid #aaa;
  }
}
</style>
