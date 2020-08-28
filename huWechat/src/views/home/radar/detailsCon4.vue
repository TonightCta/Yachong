<template lang="html">
  <div class="detailsCon4" v-if="isHasCon4">
    <p class="con4Title">质押
      <span v-if="pledgeType==1" style="background:#f60f0f;">高风险</span>
      <span v-if="pledgeType==2" style="background:#FF502E;">中风险</span>
      <span v-if="pledgeType==3" style="background:#04CC45;">低风险</span>
    </p>
    <div class="con4Mes">
      <div class="" id="ecartsCon4">

      </div>
      <div class="">
        <p>
          <span style="background:#f60f0f;"></span>
          {{echTwo}}%，约{{echOne}}亿股，控股股东股数
        </p>
        <p>
          <span style="background:#ffac00;"></span>
          {{pleMes.pledge_ratio}}%，约{{pleMes.pledge_amount}}亿股，控股股东质押总数
        </p>
      </div>
    </div>
    <p style="fontSize:.14rem;">总质押量{{echOne}}亿股，占质押股东总持股比例{{pleMes.pledge_ratio}}%。</p><!-- 占总股本比例43.97%。--></p>
    <!-- <p style="fontSize:.14rem;">质押比例过大，注意资金链风险。</p> -->
    <div class="con5">
      <span class="bgLine"></span>
      <!-- {{supMes.count}} -->
      <p class="con5Title">监管询问
        <span v-if="supMes.count>2" style="background:#f60f0f;">高风险</span>
        <span v-if="supMes.count>=1&&supMes.count<=2" style="background:#FF502E;">中风险</span>
        <span v-if="supMes.count==0" style="background:#04CC45;">低风险</span>
      </p>
      <p>近一年，公司涉及记监管层{{supMes.count}}起调查通知</p>
      <p v-if="isSupList">暂无数据</p>
      <ul v-else>
        <li v-for="con4MesCh in supMes.list">
          <p>{{con4MesCh.title}}</p>
          <p>{{con4MesCh.publish_date}}</p>
        </li>
      </ul>
      <p>
        <button @click="loadmoreSup()" :disabled="isSupList" v-if="!isSupList">点击加载更多</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props:['Code'],
  data(){
    return{
      obaMes:{
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'left'
                },
                labelLine: {
                    show: false
                },
                data: []
            }
        ],
        color:['#f60f0f','#ffac00']
      },
      pleMes:{},
      supMes:{},
      supPage:1,
      isSup:true,
      isSupList:false,
      echOne:null,
      echTwo:null,
      isHasCon4:true,
      pledgeType:null,
    }
  },
  created(){
    this.getSup();
  },
  mounted(){
    this.getPle()
  },
  methods:{
    getPle(){//获取质押
      this.$axios.get('http://api2.xiaoyachong.com/risk/pledge?code='+this.Code+'&type=1',{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.pledgeType=res.data.data.pledge_ratio*1>=50?'1':res.data.data.pledge_ratio*1<=10?3:2
          if(Number(res.data.data.pledge_ratio)==0){
            this.obaMes.series[0].data.push(0);
            this.obaMes.series[0].data.push(0);
            this.obaMes.color=['#ffac00']
            this.echTwo=0;
            this.echOne=0;
            let obaDom=this.$echarts.init(document.getElementById('ecartsCon4'));
            obaDom.setOption(this.obaMes)
            this.pleMes=res.data.data;
          }else{
            let amount=Math.round((res.data.data.pledge_amount*1)/100)/100;
            let allNum=Math.round(amount/(res.data.data.pledge_ratio*0.01)*100)/100;
            this.echOne=Math.round((allNum-amount)*100)/100;
            this.echTwo=Math.round((100-res.data.data.pledge_ratio*1)*100)/100;
            if(this.echTwo<1){
              this.echTwo=0;
            }
            if(res.data.data.pledge_ratio>100){
              res.data.data.pledge_ratio=100
            }
            this.obaMes.series[0].data.push(this.echTwo)
            this.obaMes.series[0].data.push(res.data.data.pledge_ratio);
            let obaDom=this.$echarts.init(document.getElementById('ecartsCon4'));
            obaDom.setOption(this.obaMes)
            this.pleMes=res.data.data;
          }
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    getSup(){//获取监管询问
      this.$axios.get('http://api2.xiaoyachong.com/risk/supervise?code='+this.Code+'&page='+this.supPage+'&limit=15',{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then((res)=>{
        // console.log(res)
        if(res.data.code==200){
          this.supMes=res.data.data;
          if(this.supMes.list.length<1){
            this.isSupList=true
          }
        }else{
          // this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        // this.$toast(this.errText)
      })
    },
    loadmoreSup(){//查看更多

      this.supPage++;
      this.$axios.get('http://api2.xiaoyachong.com/risk/supervise?code='+this.Code+'&page='+this.supPage+'&limit=15',{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then((res)=>{
        if(res.data.code==200){
          if(res.data.data!=null){
            if(res.data.data.list.length>1){
              this.supMes=res.data.data;
            }else{
              this.$toast('没有更多了')
            }
            if(this.supMes.list.length<1){
              this.isSupList=true
            }
          }else{
            this.isSup=false;
          }
        }else{
          // this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        // this.$toast(this.errText)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detailsCon4{
  margin-top:.1rem;
  width: 100%;
  background: white;
  box-sizing: border-box;
  padding: 0 .1rem;
  .con4Title{
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
      margin-top: -.095rem;
    }
  }
  .con4Mes{
    width: 100%;
    display: flex;
    div{
      width: 50%;
      height: 1.5rem;
    }
    div:first-child{
      width: 40%;
    }
    div:last-child{
      width: 60%;
      box-sizing: border-box;
      padding-left: .05rem;
      padding-top: .25rem;
      p{
        line-height: .3rem;
        font-size: $fontText;
        span{
          width: 8px;
          height: 8px;
          background: red;
          border-radius: 50%;
          font-size: $fontText;
        }
      }
    }
  }
  .con5{
    margin-top: .2rem;
    position: relative;
    .bgLine{
      width: 120%;
      background: #f7f7f7;
      height: .1rem;
      position: absolute;
      left: -10%;
      top:-.1rem;
    }
    .con5Title{
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
        background:#ff502e;
        position: absolute;
        top:50%;
        margin-top: -.095rem;
        left: .62rem;
      }
    }
    p{
      font-size: $fontText;
      text-align: center;
    }
    p:nth-child(2){
      text-align: left;
    }
    p:nth-child(3){
      line-height: .3rem;
      font-size: $fontText;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    p:nth-child(4){
      line-height: .4rem;
      font-size: $fontText;
      text-align: center;
      color:$moreColor;
    }
    ul{
      margin-top: .1rem;
      li{
        p{
          font-size: $fontText;
          text-align: left;
        }
        p:last-child{
          font-size: $fontText;
          color:$moreColor;
          text-align: left;
          margin-top: 0;
          padding: 0;
        }
      }
    }
    p:last-child{
      line-height: .4rem;
      text-align: center;
      margin-top: .05rem;
      padding-bottom: .05rem;
      button{
        width: 35%;
        height: .3rem;
        line-height: .3rem;
        border:1px solid #ccc;
        font-size: $fontText;
      }
    }
  }
}
</style>
