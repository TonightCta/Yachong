<template lang="html">
  <div class="detailsCon6">
    <p class="con6Title">诉讼仲裁
      <span v-if='lawMes.count>2' style="background:#f60f0f;">高风险</span>
      <span v-if='lawMes.count>=1' style="background:#FF502E;">中风险</span>
      <span v-if='lawMes.count==0' style="background:#04CC45;">低风险</span>
    </p>
    <p class="con6Title2">近两年，公司涉及{{lawMes.count}}起诉讼案件</p>
    <p v-if="isLawList" class="isLawList">暂无数据</p>
    <ul class="con6List" v-else>
      <li v-for="lawMesCH in lawMes.list">
        <p>{{lawMesCH.title}}</p>
        <p>{{lawMesCH.publish_date}}</p>
      </li>
    </ul>
    <p class="lineMask"></p>
    <div class=""  v-if="jianchiL>=1">
      <p class="con6Title outLeft">股东减持计划
        <span style="background:#f60f0f;" v-if="jianchiL>4">高风险</span>
        <span style="background:#FF502E;" v-if="jianchiL<=4">中风险</span>
        <span style="background:#04CC45;" v-if="jianchiL<=1">低风险</span>
      </p>
      <!-- <p class="con6Title3">2018-11-02公布股份减持计划</p> -->
      <p class="con6Title4">
        <span v-if="jianchiL>4">近一年累计减持:{{jianchiVol}}亿股，占总股本:{{jianchiRatio}}%</span>
        <span v-if="jianchiL>=1">近一年公司股东减持频繁，说明公司经验存在资金短缺风险</span>
      </p>
      <p class="con6LoadMore" @click="goPlane()" v-if="jianchiL>1">
        查看减持明细
        <van-icon name="arrow" />
      </p>
      <p class="lineMask"></p>
    </div>
    <p class="con6Title">退市风险
      <span style="background:#f60f0f;" v-if="tuishiS==1">高风险</span>
      <span style="background:#FF502E;" v-if="tuishiS==2">中风险</span>
      <span style="background:#04CC45;" v-if="tuishiS==3">低风险</span>
    </p>
    <p  class="tuiText" style="fontSize:.14rem;">公司股票存在退市风险提示</p>
    <p class="lineMask"></p>
    <p class="con6Title outLeft">会计师审计意见
      <span style="background:#FF502E;left:1.1rem;" v-if="backID!=null">高风险</span>
      <span style="background:#04CC45;left:1.1rem;" v-else>低风险</span>
    </p>
    <p class="tuiText" style="fontSize:.14rem;">
      <span v-if="backID!=0">拒绝/无法表达意见</span>
      <span v-else>标准无保留意见</span>
    </p>
  </div>
</template>

<script>
export default {
  props:['Code'],
  data(){
    return{
      lawMes:{},
      isLawList:false,
      backID:null,
      tuishiS:null,
      jianchiL:null,
      jianchiData:null,
      jianchiVol:null,
      jianchiRatio:null,
    }
  },
  created(){
    this.getLaw();
    this.getLast();
    this.getTuishi();
    this.getJianchi();
    this.getJianchiTwo()
  },
  methods:{
    getLaw(){
      this.$axios.get('http://api2.xiaoyachong.com/risk/lawsuit?code='+this.Code+'&page=1&limit=10',{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.lawMes=res.data.data;
          if(this.lawMes.list.length<1){
            this.isLawList=true;
          }
        }else{
          // this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        // this.$toast(this.errText)
      })
    },
    getLast(){
      this.$axios.get('http://api2.xiaoyachong.com/risk/audit?code='+this.Code,{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then(res=>{
        if(res.data.code==200){
          if(res.data.data!=null){
            this.backID=res.data.data.id
          }
        }
      })
    },
    getTuishi(){
      this.$axios.get('http://api2.xiaoyachong.com/risk/delisting?code='+this.Code+'&page=1&limit=15',{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then(res=>{
        if(res.data.code==200){
          this.tuishiS=res.data.data.status;
        }
      })
    },
    getJianchi(){
      this.$axios.get('http://api2.xiaoyachong.com/risk/reduction_data?code='+this.Code+'&page=1&limit=15',{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then(res=>{
        if(res.data.code==200){
          this.jianchiL=res.data.data.length;
          this.jianchiData=res.data.data;
        }
      })
    },
    getJianchiTwo(){
      this.$axios.get('http://api2.xiaoyachong.com/risk/reduction?code='+this.Code,{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then(res=>{
        if(res.data.code==200){
          this.jianchiVol=res.data.data.vol;
          this.jianchiRatio=res.data.data.ratio;
        }
      })
    },
    goPlane(){//股东减持计划
      if(this.jianchiL<1){
        this.$toast('暂无明细')
      }else{
        this.$router.push({
          name:'PlaneList',
          params:{
            plane:this.jianchiData
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detailsCon6{
  margin-top:.1rem;
  width: 100%;
  background: white;
  box-sizing: border-box;
  padding: 0 .1rem;
  p{
    font-size: $fontText;
  }
  .con6Title{
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
      background:#04CC45;
      position: absolute;
      left:.62rem;
      top:50%;
      margin-top: -.095rem;
    }
  }
  .outLeft{
    span{
      left: .94rem;
    }
  }
  .con6Title2{
    font-size: $fontText;
    line-height: .3rem;
    border-bottom: 1px solid #eee;
    margin-top: .1rem;
  }
  .isLawList{
    width: 100%;
    text-align: center;
    line-height: .4rem;
    font-size: $fontText;
    color:$moreColor;
  }
  .con6List{
    width: 100%;
    li{
      padding-top: .05rem;
      border-bottom: 1px solid #eee;
      padding-bottom: .05rem;
      font-size: $fontText;
      box-sizing: border-box;
      padding-left: .1rem;
      p:last-child{
        line-height: .3rem;
        font-size: $fontText;
        color:$moreColor;
      }
    }
  }
  .lineMask{
    width: 110%;
    height: .1rem;
    background: #eee;
    margin-left: -5%;
  }
  .con6Title3{
    line-height: .3rem;
    font-size: $fontText;
  }
  .con6Title4{
    margin-bottom:.1rem;
    font-size: $fontText;
  }
  .con6LoadMore{
    line-height: .3rem;
    font-size: $fontText;
    color:$moreColor;
    border-top: 1px solid #eee;
    position: relative;
    i{
      font-size: .15rem;
      position: absolute;
      top:50%;
      margin-top: -9px;
      right:.1rem;
    }
  }
  .tuiText{
    line-height: .4rem;
  }
}
</style>
