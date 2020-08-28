<template lang="html">
  <div class="detailsCon3">
    <p class="con3Title">业绩
      <span v-if='staType==2' style="background:#f60f0f;">高风险</span>
      <span v-if='staType==3' style="background:#04CC45;">低风险</span>
    </p>
    <p class="con3Re">{{con3Mes.first_ann_date}}业绩报告</p>
    <p class="con3Re" v-if="con3Mes.summary">{{con3Mes.summary}}元 <span>{{con3Mes.type}}</span></p>
    <p class="con3Mes">
      &nbsp;&nbsp;&nbsp;{{con3Mes.change_reason}}
    </p>
  </div>
</template>

<script>
export default {
  props:['Code'],
  data(){
    return{
      con3Mes:{},
      staType:null,
    }
  },
  created(){
    this.getCon3()
  },
  methods:{
    getCon3(){
      this.$axios.get('http://api2.xiaoyachong.com/risk/achieve?code='+this.Code,{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then((res)=>{
        if(res.data.code==200){
          let str='预增/续盈/略增/略减';
          if(res.data.data.type&&str.indexOf(res.data.data.type)!=-1){
            this.staType=3
          }else{
            this.staType=1;
          }
          this.con3Mes=res.data.data;
          if(this.con3Mes.first_ann_date!=null&&this.con3Mes.first_ann_date!=''){
            this.con3Mes.first_ann_date=this.con3Mes.first_ann_date.substring(0,4)+'-'+this.con3Mes.first_ann_date.substring(4,6)+'-'+this.con3Mes.first_ann_date.substring(6,8)
          }
        }else{
          // this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        // console.log(err)
        // this.$toast(this.errText)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detailsCon3{
  margin-top:.1rem;
  width: 100%;
  background: white;
  box-sizing: border-box;
  padding: 0 .1rem;
  .con3Title{
    width: 100%;
    line-height: .3rem;
    font-weight: bold;
    font-size: $fontTitle;
    position: relative;
    span{
      font-weight: normal;
      font-size: .1rem;
      padding: 0 5px;
      background: red;
      height: .2rem;
      line-height: .2rem;
      margin-left: .05rem;
      border-radius: 10px;
      color:white;
      background:$warningColor;
      position: absolute;
      left:.3rem;
      top:50%;
      margin-top:-.095rem;
    }
  }
  .con3Re{
    line-height: .2rem;
    font-size: $fontText;
    color:$moreColor;
    position: relative;
    span{
      font-size: $fontText;
      color:$warningColor;
      font-weight: bold;
      position: absolute;
      right:.1rem;
    }
  }
  .con3Mes{
    margin-top: .05rem;
    box-sizing: border-box;
    padding-bottom: .05rem;
    text-align: justify;
    text-justify:justify;
    font-size: $fontText;
  }
}
</style>
