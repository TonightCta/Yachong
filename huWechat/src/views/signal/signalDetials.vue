<!-- 多空信号内页 -->
<template lang="html">
  <div class="signalDe">
    <!-- <van-tabs color="#0588ff" swipeable title-active-color="#0588ff" sticky>
      <van-tab title="近期多空信号">

      </van-tab>
      <van-tab title="盘中多空趋势">内容 2</van-tab>
    </van-tabs> -->
    <div class="detCon">
          <p class="detTitle">个股近期多空信号<span>{{geguTitle}}</span></p>
          <p class="detText">最近一次发出的是多点信号(D)累计涨跌幅达+19.55%；结合神奇海波形态分析，近期趋势上涨，信号强！</p>
          <div class="detEcharts">
            <div class="" id="detEcharts">

            </div>
            <div class="mask">

            </div>
          </div>
          <p class="timeTitle">
            <span>{{startTime}}</span>
            <span>{{endTime}}</span>
          </p>
          <div class="detAutoLine">
            <span class="cenLine"></span>
            <span class="col1 col"></span>
            <span class="col2 col"></span>
            <span class="col3 col"></span>
            <span class="col4 col"></span>
            <span class="col5 colBot"></span>
            <span class="col6 colBot"></span>
            <span class="col7 colBot"></span>
          </div>
        </div>
        <div class="detCon">
          <p class="detTitle">行业近期多空信号<span>{{geguTitle}}</span></p>
          <p class="detText">多空信号或神奇海波数据过少，暂不支持近期的多空趋势分析！</p>
          <div class="detEcharts">
            <div class="" id="detEchartsTwo">

            </div>
            <div class="mask">

            </div>
          </div>
          <p class="timeTitle">
            <span>{{startTime}}</span>
            <span>{{endTime}}</span>
          </p>
          <div class="detAutoLine">
            <span class="cenLine"></span>
            <span class="col1 col"></span>
            <span class="col2 col"></span>
            <span class="col3 col"></span>
            <span class="col4 col"></span>
            <span class="col5 colBot"></span>
            <span class="col6 colBot"></span>
            <span class="col7 colBot"></span>
          </div>
        </div>
        <p class="exoText">(所有数据与信息仅供参考，不构成投资建议)</p>
    <Back/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import {GetUrlKey} from '@/assets/js/getShare.js'
export default {
  data(){
    return{
      linData:[
        ['2013/4/24', 2187.35,2218.32,2184.11,2226.12],
        ['2013/4/25', 2213.19,2199.31,2191.85,2224.63],
        ['2013/4/26', 2203.89,2177.91,2173.86,2210.58],
        ['2013/5/2', 2170.78,2174.12,2161.14,2179.65],
        ['2013/5/3', 2179.05,2205.5,2179.05,2222.81],
        ['2013/5/6', 2212.5,2231.17,2212.5,2236.07],
        ['2013/5/7', 2227.86,2235.57,2219.44,2240.26],
        ['2013/5/8', 2242.39,2246.3,2235.42,2255.21],
        ['2013/5/9', 2246.96,2232.97,2221.38,2247.86],
        ['2013/5/10', 2228.82,2246.83,2225.81,2247.67],
        ['2013/5/13', 2247.68,2241.92,2231.36,2250.85],
        ['2013/5/14', 2238.9,2217.01,2205.87,2239.93],
        ['2013/5/15', 2217.09,2224.8,2213.58,2225.19],
        ['2013/5/16', 2221.34,2251.81,2210.77,2252.87],
        ['2013/5/17', 2249.81,2282.87,2248.41,2288.09],
        ['2013/5/20', 2286.33,2299.99,2281.9,2309.39],
        ['2013/5/21', 2297.11,2305.11,2290.12,2305.3],
        ['2013/5/22', 2303.75,2302.4,2292.43,2314.18],
        ['2013/5/23', 2293.81,2275.67,2274.1,2304.95],
        ['2013/5/24', 2281.45,2288.53,2270.25,2292.59],
      ],
      upDowndata:{
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: [],
            boundaryGap: false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            axisLabel:{
                show:false
            },
            axisTick:{
    		     show:false
            },
            axisLine:{
        	   show:false
            },
        },
        yAxis: {
            scale: true,
            splitArea: {
                show: false
            },
            axisTick:{
    		     show:false
            },
            axisLine:{
        	   show:false
            },
            axisLabel:{
                show:false
            },
            splitLine:{
              show:false
            }
        },
        series: [
            {
                name: '日K',
                type: 'candlestick',
                data: [],
                itemStyle: {
                    color: '#ec0000',
                    color0:  '#00da3c',
                },
                markPoint: {
                    label: {
                        normal: {
                            formatter: function (param) {
                                return param != null ? Math.round(param.value) : '';
                            }
                        }
                    },
                    data: [],
                    tooltip: {
                        formatter: function (param) {
                            return param.name + '<br>' + (param.data.coord || '');
                        }
                    }
                },
            },
        ]
      },
      geguMes:{},
      geguTitle:null,//多空详情title
      endTime:null,//数据结束时间
      startTime:null,//数据开始时间
    }
  },
  created(){
    let date=new Date();
    let year=date.getFullYear();
    let mon=date.getMonth()+1;
    if(mon<10){
      mon='0'+mon
    }
    let day=date.getDate();
    if(day<10){
      day='0'+day
    };
    this.endTime=year+'-'+mon+'-'+day
    let sDate=new Date(date.getTime()-1000*60*60*24*30);
    let sYear=sDate.getFullYear();
    let sMon=sDate.getMonth()+1;
    if(sMon<10){
      sMon='0'+sMon
    }
    let sDay=sDate.getDate();
    if(sDay<10){
      sDay='0'+sDay
    }
    this.startTime=sYear+'-'+sMon+'-'+sDay;
    this.getSinDe()
    this.geguTitle=this.$route.query.title;
    let rawData=this.linData;
    let categoryData = [];
    let values = []
    for (let i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i])
    };
    this.upDowndata.xAxis.data=categoryData;
    this.upDowndata.series[0].data=values;
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      let title='';
      if(vm.$route.query.title){
        title=vm.$route.query.title
        document.title='多空信号-'+title
      }else{
        document.title='多空信号'
      }
    })
  },
  methods:{
    getSinDe(){//获取详情
      let id=null;
      if(GetUrlKey('codeSign',window.location.href)){
        id=GetUrlKey('codeSign',window.location.href)
      }else{
        id=this.$route.query.code
      }
      this.$axios.get(this.Uapi+'/user/index/duokonginfo?symbol='+id,{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          let open=res.data.data.gegu.open;
          let close=res.data.data.gegu.close;
          let low=res.data.data.gegu.low;
          let high=res.data.data.gegu.high;
          let date=res.data.data.gegu.date;
          this.upDowndata.xAxis.data=date;
          this.upDowndata.series[0].data=open.map((item,i)=>{
            return [Number(open[i]),Number(close[i]),Number(low[i]),Number(high[i])]
          });
          let detEchartsID=document.getElementById('detEcharts');
          if(detEchartsID!=null){
            let detEcharts=this.$echarts.init(detEchartsID);
            detEcharts.setOption(this.upDowndata)
          }
          let detEchartsIDTow=document.getElementById('detEchartsTwo');
          if(detEchartsIDTow!=null){
            let detEchartsTwo=this.$echarts.init(detEchartsIDTow);
            detEchartsTwo.setOption(this.upDowndata)
          }
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
.signalDe{
  width: 100%;
  .detCon{
    margin-top: .1rem;
    background: white;
    padding-bottom: .1rem;
    p{
      width: 95%;
      margin:0 auto;
      font-size: $fontText;
      text-align: left;
    }
    .detTitle{
      font-size: $fontTitle;
      font-weight: bold;
      text-align: left;
      position: relative;
      box-sizing: border-box;
      padding-top: .1rem;
      margin-bottom:.1rem;
      span{
        font-size: $fontText;
        color:$themeColor;
        position: absolute;
        right:0;
      }
    }
    .detEcharts{
      width: 95%;
      margin:0 auto;
      height: 1rem;
      border:1px solid #ccc;
      margin-top:.1rem;
      overflow: hidden;
      position: relative;
      #detEcharts{
        width: 100%;
        height: 1.8rem;
        position: absolute;
        top:-60px;
        z-index: 10;
      }
      #detEchartsTwo{
        width: 100%;
        height: 1.8rem;
        position: absolute;
        top:-60px;
        z-index: 10;
      }
      .mask{
        width: .8rem;
        height: 100%;
        background: #ccc;
        position: absolute;
        right:0;
        top:0;
        z-index: 1;
      }
    }
    .timeTitle{
      width: 95%;
      margin:0 auto;
      display: flex;
      line-height: .3rem;
      span{
        width: 50%;
        font-size: $fontText;
      }
      span:last-child{
        text-align: right;
      }
    }
    .detAutoLine{
      width: 95%;
      margin:0 auto;
      border:1px solid #ccc;
      height: .8rem;
      position: relative;
      display: none;
      .cenLine{
        width: 100%;
        height: 1px;
        background: #ccc;
        position: absolute;
        top:50%;
        margin-top: -.5px;
        left: 0;
      }
      .col{
        width: 0;
        height: 0;
        border-left: .05rem solid transparent;
        border-right: .05rem solid transparent;
        border-bottom: .4rem solid #FFB400;
        position: absolute;
        top:0;
      }
      .colBot{
        width: 0;
        height: 0;
        border-left: .05rem solid transparent;
        border-right: .05rem solid transparent;
        border-top: .4rem solid #04CC46;
        position: absolute;
        bottom:0;
      }
      .col1{
        left: 50%;
      }
      .col2{
        left: 60%;
      }
      .col3{
        left: 75%;
      }
      .col4{
        right:0;
      }
      .col5{
        left: 62%;
      }
      .col6{
        left: 70%;
      }
      .col7{
        left:90%;
      }
    }

  }
  .exoText{
    line-height: .4rem!important;
    color:$moreColor;
    text-align: center;
    font-size: $fontText;
  }
}
</style>
