<!-- w趋势反转 -->
<template lang="html">
  <div class="w">
    <div class="w_title">
      <p>策略原理：股票下跌后形成W底形态，采用人工智能辅助线寻找出W底形态，两次探底确认支撑，形成K线结构并发出买入信号。</p>
      <img src="../../assets/images/wIcon.png" alt="">
    </div>
    <div class="w_con">
      <p class="w_title1">
        <span></span>
        今日入选股票
      </p>
      <div class="w_con1">
        <ul>
          <li>
            <p>+{{wMes.shenglv}}%</p>
            <p>上升空间</p>
          </li>
          <li>
            <p>发出信号时间</p>
            <p>{{putTime}}</p>
          </li>
          <li @click="$toast('暂未开放，敬请期待')">
            <span>今日入选股票</span>
            <img src="../../assets/images/lock.png" alt="">
            <p>正在发出<font>超强买入信号</font></p>
            <p>点击免费解锁查看</p>
          </li>
        </ul>
      </div>
      <p class="w_title2">
        ———————该股目前走势和情况———————
      </p>
      <div class="wKEcharts">
        <div id="wKEcharts">

        </div>
      </div>
      <span style="width:120%;height:.1rem;background:#eee;marginLeft:-10%;marginTop:.1rem;"></span>
      <div class="logList">
        <p class="w_title1">
          <span></span>
          历史战绩
          <font>(通过AI技术选股后,股票累计涨幅）</font>
        </p>
        <ul>
          <li v-for="logMes in wMes.jinri">
            <p>
              <span>{{logMes[1]}}</span>
              <br>
              <span>{{logMes[0]}}</span>
            </p>
            <p>
              <span>{{logMes[3].substring(4,6)}}-{{logMes[3].substring(6,8)}}</span>
              <br>
              <span>入选时间</span>
            </p>
            <p>
              <span>+{{logMes[2]}}%</span>
              <br>
              <span>入选后涨幅</span>
            </p>
          </li>
        </ul>
      </div>
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
      logData:[
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
      logMes: {
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
            axisTick:{
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
      putTime:null,//入选时间
      wMes:{},
    }
  },
  mounted(){
    this.getWDe()
  },
  components:{
    Back
  },
  methods:{
    getWDe(){
      let Aid=null;
      if(GetUrlKey('ai',window.location.href)){
        Aid=GetUrlKey('ai',window.location.href)
      }else{
        Aid=this.$route.query.aiT
      }
      this.$axios.get(this.Uapi+'/user/index/aiyxinfo?id='+Aid,{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.wMes=res.data.data;
          let date=new Date(this.wMes.createtime*1000);
          let mon=date.getMonth()+1;
          if(mon<10){
            mon='0'+mon
          }
          let day=date.getDate();
          if(day<10){
            day='0'+day
          }
          this.putTime=mon+'-'+day;
          this.getWEc();
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    getWEc(){//获取选股Echarts数据
      let date=new Date();
      let year=date.getFullYear();
      let mon=date.getMonth()+1;
      if(mon<10){
        mon='0'+mon
      }
      let day=date.getDate();
      if(day<10){
        day='0'+day
      }
      this.startTime=year+mon+day;
      this.$axios.get(this.Uapi+'/user/index/dailyhq?symbol='+this.wMes.jinri[0][0]+'&start_date=20200101&end_date='+this.startTime,{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          let open=res.data.data.open;
          let close=res.data.data.close;
          let low=res.data.data.low;
          let high=res.data.data.high;
          let date=res.data.data.date;
          this.logMes.series[0].data = open.map((item,i) => {
            return [open[i],close[i],low[i],high[i]]
          });
          this.logMes.xAxis.data=res.data.data.date;
          let logWEcharts=this.$echarts.init(document.getElementById('wKEcharts'));
          logWEcharts.setOption(this.logMes)
        }else{
          tjhos.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.w{
  width: 100%;
  .w_title{
    width: 100%;
    height: 1.6rem;
    background: url('../../assets/images/headerBg1.png');
    background-size: 100% 100%;
    display: flex;
    box-sizing: border-box;
    padding-top: .55rem;
    p{
      width: 65%;
      text-align: justify;
      color:white;
      box-sizing: border-box;
      padding-left: .15rem;
      font-size: $fontText;
    }
    img{
      width: 30%;
      height: .6rem;
      margin-left: .1rem;
      // margin-top: 1rem;
    }
  }
  .w_con{
    width: 100%;
    padding: .1rem;
    box-sizing: border-box;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: white;
    margin-top: -.1rem;
    .w_title1{
      width: 100%;
      line-height: .2rem;
      font-size: $fontTitle;
      position: relative;
      box-sizing: border-box;
      padding-left: .1rem;
      span{
        width: 4px;
        height: .16rem;
        background: #242424;
        position: absolute;
        top:50%;
        margin-top: -9px;
        left: 0;
      }
      font{
        font-size: $fontText;
        color:$moreColor;
      }
    }
    .w_con1{
      width: 100%;
      height: 1.5rem;
      border:1px solid #cbcbcb;
      margin-top: .1rem;
      ul{
        width: 100%;
        display: flex;
        height: 100%;
        justify-content: space-between;
        li{
          width: 31%;
          height: 100%;
          box-sizing: border-box;
          text-align: center;
          font-size: $fontText;
        }
        li:first-child{
          border-right:1px dashed #cbcbcb;
          display: flex;
          flex-direction: column;
          justify-content: center;
          p{
            line-height: .2rem;
          }
          p:first-child{
            font-weight: bold;
            font-size: $fontTitle;
            color:$warningColor;
          }
          p:last-child{
            color:$moreColor;
          }
        }
        li:nth-child(2){
          display: flex;
          flex-direction: column;
          justify-content: center;
          p{
            line-height: .2rem;
          }
          p:first-child{
            color:$moreColor;
          }
        }
        li:last-child{
          width: 38%;
          background: rgba(246,15,15,.5);
          box-sizing: border-box;
          img{
            width: .4rem;
            height: .5rem;
          }
          span{
            width: 100%;
            background: rgba(246,15,15,.6);
            color:white;
            text-align: center;
            margin-bottom: .3rem;
          }
          p{
            color:$moreColor;
            font-size: .12rem;
            font{
              font-size: $fontText;
              font-weight: bold;
              color:$warningColor;
            }
          }
        }
      }
    }
    .w_title2{
      width: 100%;
      line-height: .4rem;
      text-align: center;
      font-size: $fontText;
    }
    .wKEcharts{
      width: 100%;
      height: 1.5rem;
      // border:1px solid #ccc;
      overflow: hidden;
      position: relative;
      #wKEcharts{
        width: 110%;
        height: 2rem;
        position: absolute;
        top:-.5rem;
        right:-.2rem;
      }
    }
    .logList{
      margin-top: .1rem;
      ul{
        width: 100%;
        margin-top: .1rem;
        li{
          width: 100%;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          padding: .05rem;
          border-radius: 10px;
          border:1px solid #ccc;
          margin-bottom: .15rem;
          p{
            width: 30%;
            text-align: center;
            font-size: $fontText;
            span:first-child{
              font-weight: bold;
            }
            span:last-child{
              color:$moreColor;
            }
          }
          p:first-child{
            text-align: left;
            box-sizing: border-box;
            padding-left: .1rem;
          }
          p:last-child{
            text-align: right;
            box-sizing: border-box;
            padding-right: .1rem;
            span:first-child{
              color:$warningColor;
            }
          }
        }
      }
    }
  }
}
</style>
