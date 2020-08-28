<!-- 北上资金内页 -->
<template lang="html">
  <div class="northDetails">
    <div class="northCond">
      <p class="condTitle">调出条件</p>
      <p>
        <span>**********</span>
        <span>**********</span>
        <span>**********</span>
      </p>
      <p class="condRe">备注:入选后公司发生重大事件</p>
    </div>
    <div class="firstEcharts" id="firstEcharts">

    </div>
    <div class="secEcharts" id="secEcharts">

    </div>
    <Back/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import {GetUrlKey} from '@/assets/js/getShare.js'
export default {
  data(){
    return{
      getData:{
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: '10',
            top:'0',
            text: '北上资金持仓分析',
            textStyle:{
              fontSize:'16'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data:['2020-01','2020-02','2020-03','2020-04'],
            axisTick:{
              show:false
            },
            axisLine:{       //y轴
              show:true,
              lineStyle:{
                color:'#999'
              }
            },
        },
        yAxis: [
          {
              type: 'value',
              boundaryGap: [0, '100%'],
              splitLine:{
                show:false
              },
              axisLine:{
               show:false
              },
              axisTick:{
      		     show:false
              },
              axisLabel:{
                color:'#0588FF'
              }
          },
          {
              type: 'value',
              boundaryGap: [0, '100%'],
              splitLine:{
                show:false
              },
              axisLine:{
               show:false
              },
              axisTick:{
      		     show:false
              },
              axisLabel:{
                color:'#FFAA06'
              }
          },
        ],
        legend: {
             data: ['持仓比例(%)','收盘价(元)'],
             right:'10',
             top:'3px'
        },
        series: [
            {
                name: '持仓比例(%)',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: '#0588FF'
                },
                areaStyle: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(5,136,255,.5)'
                    }, {
                        offset: 1,
                        color: 'rgba(5,136,255,.2)'
                    }])
                },
                yAxisIndex:0,
                data: [40,130,40,180]
            },
            {
                name: '收盘价(元)',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: '#FFAA06'
                },
                areaStyle: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255,170,6,.5)'
                    }, {
                        offset: 1,
                        color: 'rgba(255,170,6,.2)'
                    }])
                },
                yAxisIndex:1,
                data: [5,190,70,100]
            }
        ]
      },
      getDataTwo:{
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
                return [pt[0], '35%'];
            },
          backgroundColor:'rgba(0,0,0,0)',
          textStyle:{
            color:'rgba(0,0,0,1)'
          }
        },
        title: {
            left: '10',
            top:'0',
            text: '估值风险分析',
            textStyle:{
              fontSize:'16'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data:['0.40','1.2','1.8','2.76','0.40','1.2','1.8','2.76','0.40','1.2','1.8','2.76','0.40','1.2','1.8','2.76','0.40','1.2','1.8','2.76','0.40','1.2','1.8','2.76'],
            axisLine:{
              lineStyle:{
                color:'#FFAA06'
              },
            },
            axisPointer: {
               value: '0.40',
               snap: false,
               lineStyle:{
                 color:'#FFAA06',
                 width: 2,
                 type:'dashed'
               },
               handle: {
                   show: true,
                   color: '#FFAA06',
                   size:10,
                   margin:'0'
               }
           },
            axisLabel:{
              color:'black'
            },
            axisTick:{
             show:false
            },
        },
        yAxis: [
          {
              type: 'value',
              boundaryGap: [0, '100%'],
              splitLine:{
                show:false
              },
              axisLine:{
               show:false
              },
              axisTick:{
      		     show:false
              },
              axisLabel:{
                color:'black'
              }
          },
        ],
        series: [
            {
                name: '收盘价(元)',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: '#FFAA06'
                },
                areaStyle: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#FFAA06'
                    }, {
                        offset: 1,
                        color: 'white'
                    }])
                },
                // yAxisIndex:1,
                data: [5,390,70,100,5,190,70,100,5,280,70,100,5,190,70,100,5,190,70,100,5,190,70,100]
            }
        ]
      },
    }
  },
  mounted(){
    this.getNorthDe()
    let northEchartsTwo=this.$echarts.init(document.getElementById('secEcharts'))
    northEchartsTwo.setOption(this.getDataTwo);
  },
  methods:{
    getNorthDe(){
      let id='';
      if(GetUrlKey('north',window.location.href)){
        id=GetUrlKey('north',window.location.href)
      }else{
        id=this.$route.query.codeID
      }
      this.$axios.get(this.Uapi+'/user/index/bxzjccfx?ts_code='+id,{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.getData.series[0].data=res.data.data.ccfx.high;
          this.getData.series[1].data=res.data.data.ccfx.close;
          this.getData.xAxis.data=res.data.data.ccfx.date;
          let northEcharts=this.$echarts.init(document.getElementById('firstEcharts'));
          northEcharts.setOption(this.getData);
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    }
  },
  components:{
    Back
  }
}
</script>

<style lang="scss" scoped>
.northDetails{
  width: 100%;
  .northCond{
    width: 100%;
    margin-top:.1rem;
    padding:.1rem .2rem;
    box-sizing: border-box;
    background: white;
    text-align: left;
    .condTitle{
      width: 100%;
      font-size: $fontTitle;
      font-weight: bold;
      line-height: .3rem;
    }
    p:nth-child(2){
      display: flex;
      flex-wrap: wrap;
      span{
        padding: 2px 5px 0;
        background: $themeColor;
        font-size: $fontTitle;
        margin-right: .1rem;
        color:white;
        height: .2rem;
        line-height: .24rem;
        border-radius: 20px;
      }
    }
    .condRe{
      width: 100%;
      text-align: left;
      color:$moreColor;
      line-height: .2rem;
      margin-top: .1rem;
      font-size: $fontText;
    }
  }
  .firstEcharts{
    width: 100%;
    height: 2.5rem;
    background: white;
    margin-top: .1rem;
    padding-top: .2rem;
    box-sizing: border-box;
  }
  .secEcharts{
    width: 100%;
    height: 2.5rem;
    background: white;
    margin-top: .1rem;
    padding-top: .2rem;
    box-sizing: border-box;
    display: none;
  }
}
</style>
