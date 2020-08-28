<!-- 扫雷内页1 -->
<template lang="html">
  <div class="detailsCon1">
    <ul>
      <li v-for="(con1Mes,indexCon1) in con1List">
        <span class="Color1" v-show="con1Mes.type==1">审计</span>
        <span class="Color1" v-show="con1Mes.type==2">退市</span>
        <span class="Color1" v-show="con1Mes.type==3">财务</span>
        <span class="Color2" v-show="con1Mes.type==4">监管</span>
        <span class="Color2" v-show="con1Mes.type==5">质押</span>
        <span class="Color2" v-show="con1Mes.type==6">商誉</span>
        {{con1Mes.content}}
        <font></font>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      con1List:[]
    }
  },
  props:['Code'],
  created(){
    this.getCon1()
  },
  methods:{
    getCon1(){
      this.$axios.get('http://api2.xiaoyachong.com/risk/risk_total?code='+this.Code,{
        headers:{
          'v':'v3',
          'Authorization':this.yetToken,
        }
      }).then((res)=>{
        if(res.data.code==200){
          if(res.data.data!=null){
            if(res.data.data.audit){
              // res.data.data.audit.push
              this.con1List.push({
                content:res.data.data.audit[0],
                type:1,
              })
            }
            if(res.data.data.delisting){
              this.con1List.push({
                content:res.data.data.delisting[0],
                type:2,
              })
            }
            if(res.data.data.finance){
              this.con1List.push({
                content:res.data.data.finance[0],
                type:3,
              })
            }
            if(res.data.data.supervise){
              this.con1List.push({
                content:res.data.data.supervise[0],
                type:4,
              })
            }
            if(res.data.data.forecast){
              this.con1List.push({
                content:res.data.data.forecast[0],
                type:5,
              })
            }
            if(res.data.data.goodwill){
              this.con1List.push({
                content:res.data.data.goodwill[0],
                type:6,
              })
            };
          }
        }else{
          // this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        console.log(err)
        // this.$toast(this.errText)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detailsCon1{
  margin-top: .1rem;
  background: white;
  box-sizing: border-box;
  padding: 0 .1rem;
  ul{
    li{
      width: 100%;
      line-height: .4rem;
      font-size: $fontText;
      position: relative;
      box-sizing: border-box;
      padding-left: .5rem;
      .Color1{
        background: $warningColor;
      }
      .Color2{
        background: #ff502e;
      }
      span{
        padding: 0 5px;
        height: .2rem;
        line-height: .2rem;
        border-radius: 10px;
        font-size: .1rem;
        color:white;
        margin-right: .1rem;
        position: absolute;
        top:50%;
        margin-top: -.1rem;
        left:.1rem;
      }
    }
  }
}
</style>
