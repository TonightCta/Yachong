<template lang="html">
  <div class="detailsCon5" v-if="isHasWill">
    <p class="con5Title">商誉
      <span v-if='false' style="background:#f60f0f;">高风险</span>
      <span v-if='false' style="background:#FF502E;">中风险</span>
      <span v-if='true' style="background:#04CC45;">低风险</span>
    </p>
    <div class="con5Tabs">
      <!-- <van-tabs type="card" swipeable color="#0588ff">
        <van-tab title="净资产">

          <p class="mes1Title">商誉占比较大，注意减值风险</p>
        </van-tab>
        <van-tab title="净资产">内容 2</van-tab>
        <van-tab title="总市值">内容 3</van-tab>
      </van-tabs> -->
      <div class="tabMes1">
        <div class="" id="mes1Echarts">

        </div>
        <div class="">
          <p>
            <span>
              <span style="background:#FFB400;"></span>
              商誉
            </span>
            &nbsp;&nbsp;&nbsp;
            <span>
              <span style="background:#00C6FF;"></span>
              净资产
            </span>
          </p>
          <p>商誉{{(willMes.goodwill/10000000).toFixed(2)}}亿，净资产{{(willMes.sumshequity/100000000).toFixed(2)}}亿，占比{{((willMes.goodwill/willMes.sumshequity)*100).toFixed(2)}}%。</p>
        </div>
      </div>
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
                data: [
                  {value: 3,itemStyle:{color:'#FFB400'}},
                  {value: 1,itemStyle:{color:'#00C6FF'}},
                ]
            }
        ]
      },
      isHasWill:true,
      willMes:{},
      willType:null,
    }
  },
  mounted(){
    this.getWill()
  },
  methods:{
    getWill(){
      this.$axios.get('http://api2.xiaoyachong.com/risk/goodwill?code='+this.Code+'&type=1',{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then((res)=>{
        if(res.data.code==200){
          console.log(res)
          if(res.data.data!=null){
            this.willMes=res.data.data;
            let sumshequity_rates = Math.round(res.data.data.sumshequity_rate*10000)/100;
            if(sumshequity_rates>40){
              this.willType=1
            }else if(sumshequity_rates<=40&&sumshequity_rates>10){
              this.willType=2
            }else{
              this.willType=3;
            }
            this.obaMes.series[0].data[0].value=res.data.data.goodwill;
            this.obaMes.series[0].data[1].value=res.data.data.sumshequity;
            let mes1E=this.$echarts.init(document.getElementById('mes1Echarts'));
            mes1E.setOption(this.obaMes);
          }else{
            this.isHasWill=false;
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
.detailsCon5{
  margin-top:.1rem;
  width: 100%;
  background: white;
  box-sizing: border-box;
  padding: 0 .1rem;
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
      left: .3rem;
    }
  }
  .con5Tabs{
    width: 80%;
    margin:0 auto;
    margin-top: .1rem;
    .tabMes1{
      width: 120%;
      // background: red;
      margin-left: -10%;
      display: flex;
      div{
        height: 1.5rem;
      }
      div:first-child{
        width: 40%;
      }
      div:last-child{
        width: 60%;
        box-sizing: border-box;
        padding-top: .3rem;
        p{
          font-size: $fontText;
        }
        p:first-child{
          span{
            line-height: .4rem;

            span{
              width: 8px;
              height: 8px;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .mes1Title{
      width: 126%;
      margin-left: -13%;
      padding-bottom: .1rem;
    }
  }
}
</style>
