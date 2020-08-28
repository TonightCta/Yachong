<!-- 历史回顾内页 -->
<template lang="html">
  <div class="logCon">
    <div class="monthMes">
      <p class="monthTitle">
        月份历史行情回顾
        <span>六月
          <!-- <van-icon name="arrow-down" /> -->
        </span>
      </p>
      <!-- <p>最近10年的历史行情，6月份上涨概率为50%，平均涨跌幅为-1.29%</p> -->
      <!-- <MonEch/> -->
      <div class="conEcharts">
        <div class="" id="conEcharts">
          <!-- <highcharts :options="monthData"></highcharts> -->
        </div>
      </div>
    </div>
    <div class="monthMes">
      <p class="monthTitle">
        星期历史行情回顾
        <span>周五
          <!-- <van-icon name="arrow-down" /> -->
        </span>
      </p>
      <div class="conEcharts">
        <div class="" id="conEchartsTwo">

        </div>
      </div>
      <!-- <p>最近10年的历史行情，周五上涨概率为50%，平均涨跌幅为-1.29%</p> -->
      <!-- <WeekEch/> -->
    </div>
    <div class="monthMes">
      <p class="monthTitle">
        每年同期历史行情回顾
        <span>2020
          <!-- <van-icon name="arrow-down" /> -->
        </span>
      </p>
      <!-- <p>最近10年的历史行情，6月份上涨概率为50%，平均涨跌幅为-1.29%</p> -->
      <!-- <YearEch/> -->
      <div class="conEcharts">
        <div class="" id="yearEchars">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
export default {
  props:['Code'],
  components:{

  },
  data(){
    return{
      monData:null,
      week : {
        xAxis: {
            data: [],
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitArea: {show: false},
            axisLine:{show:false},
            axisTick:{show:false},
        },
        yAxis: {
            splitArea: {show: false},
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}%',
            },
            position:"right",
            axisLine:{show:false},
            axisTick:{show:false},
            splitLine:{
                show:true,
                lineStyle:{
                    type:'dashed'
                }
            }
        },
        series: [
            {
                name: 'bar1',
                type: 'bar',
                stack: 'one',
                itemStyle:{
                  color:'#04cc45'
                },
                data: []
            },
            {
                name: 'bar2',
                type: 'bar',
                stack: 'two',
                data: [],
                itemStyle:{
                    color:'#f60f0f'
                }
            }
        ]
      },
      year : {
        xAxis: {
            data: [],
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitArea: {show: false},
            axisLine:{show:false},
            axisTick:{show:false},
        },
        yAxis: {
            splitArea: {show: false},
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}%',
            },
            position:"right",
            axisLine:{show:false},
            axisTick:{show:false},
            splitLine:{
                show:true,
                lineStyle:{
                    type:'dashed'
                }
            }
        },
        series: [
            {
                name: 'bar1',
                type: 'bar',
                stack: 'one',
                itemStyle:{
                  color:'#04cc45'
                },
                data: []
            },
            {
                name: 'bar2',
                type: 'bar',
                stack: 'two',
                data: [],
                itemStyle:{
                    color:'#f60f0f'
                }
            }
        ]
      },
      month : {
        xAxis: {
            data: [],
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitArea: {show: false},
            axisLine:{show:false},
            axisTick:{show:false},
        },
        yAxis: {
            splitArea: {show: false},
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}%',
            },
            position:"right",
            axisLine:{show:false},
            axisTick:{show:false},
            splitLine:{
                show:true,
                lineStyle:{
                    type:'dashed'
                }
            }
        },
        series: [
            {
                name: 'bar1',
                type: 'bar',
                stack: 'one',
                itemStyle:{
                  color:'#04cc45'
                },
                data: []
            },
            {
                name: 'bar2',
                type: 'bar',
                stack: 'two',
                data: [],
                itemStyle:{
                    color:'#f60f0f'
                }
            }
        ]
      },
    }
  },
  mounted(){
    this.getLoDe()
  },
  methods:{
    getLoDe(){
      let _this=this;
      _this.$axios.get(this.Uapi+'/user/index/lishi?symbol='+_this.Code,{
        headers:{
          'Authorization':_this.baseToken,
          'SessionId':_this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.month.xAxis.data=res.data.data.month_data.date.splice(5,10);
          res.data.data.month_data.lists.forEach((e)=>{
            if(e.pct_chg>0){
              this.month.series[0].data.push(e.pct_chg)
            }else{
              this.month.series[1].data.push(e.pct_chg)
            }
          })
          _this.week.xAxis.data=res.data.data.week_data.date;
          res.data.data.week_data.lists.forEach((e)=>{
            if(e>0){
              _this.week.series[0].data.push(e)
            }else{
              _this.week.series[1].data.push(e)
            }
          })
          _this.year.xAxis.data=res.data.data.year_data.date;
          res.data.data.year_data.lists.forEach((e)=>{
            if(e.pct_chg>0){
              _this.year.series[0].data.push(e.pct_chg)
            }else{
              _this.year.series[1].data.push(e.pct_chg)
            }
          })
          let conEcharts=_this.$echarts.init(document.getElementById('conEcharts'));
          let conEchartsTwo=_this.$echarts.init(document.getElementById('conEchartsTwo'));
          let yearEcharsDom=_this.$echarts.init(document.getElementById('yearEchars'));
          conEcharts.setOption(_this.month)
          conEchartsTwo.setOption(_this.week)
          setTimeout(()=>{
            yearEcharsDom.setOption(_this.year);
          },500)
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logCon{
  width: 100%;
  .monthMes{
    width: 100%;
    padding: .1rem .1rem;
    background: white;
    margin-top: .1rem;
    .monthTitle{
      text-align: left;
      font-size: $fontTitle;
      font-weight: bold;
      position: relative;
      span{
        position: absolute;
        border:1px solid $themeColor;
        color:$themeColor;
        border-radius: 10px;
        width: .46rem;
        text-align: center;
        padding: 0 4px;
        box-sizing: border-box;
        right:.2rem;
        font-size: .13rem;
        // i{
        //   position: absolute;
        //   font-size: 1.4rem;
        //   top:50%;
        //   margin-top: -7px;
        // }
      }
    }
    p:nth-child(2){
      width: 95%;
      text-align: left;
      margin-top: .1rem;
    }
    .conEcharts{
      width: 95%;
      height: 2rem;
      position: relative;
      padding-bottom: .2rem;
      #conEcharts{
        width: 100%;
        height: 2.5rem;
        margin-left: -.2rem;
        margin-top: -.5rem;
      }
      #conEchartsTwo{
        width: 100%;
        height: 2.5rem;
        margin-left: -.2rem;
        margin-top: -.5rem;
      }
      #yearEchars{
        width: 100%;
        height: 2.5rem;
        margin-left: -.2rem;
        margin-top: -.5rem;
      }
    }
  }
}
</style>
