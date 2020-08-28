<!-- 内页2 -->
<template lang="html">
  <div class="detailsCon2">
    <p class="con2Title">财务
      <span v-if='riskMes.score<0.89' style="background:#f60f0f;">高风险</span>
      <span v-if='riskMes.score==0.91||riskMes.score==0.92' style="background:#FF502E;">低风险</span>
      <span v-if='riskMes.score>0.92' style="background:#04CC45;">低风险</span>
    </p>
    <div class="con2Mes">
      <div class="ecartsLeft" id="ecartsLeft">

      </div>
      <p class="riskNum">
        <span v-if="riskMes.score*100>=95" style="color:#04CC45;">{{riskMes.score*100}}</span>
        <span v-if="riskMes.score*100<=87" style="color:#f60f0f;">{{riskMes.score*100}}</span>
        <span v-if="riskMes.score*100<=92&&riskMes.score*100>87" style="color:#FF502E;">{{riskMes.score*100}}</span>
      </p>
      <div class="">
        <p>财务安全评级</p>
        <!-- <br> -->
        <p>
          <span v-if="riskMes.score*100>=95" style="color:#04CC45;">AAA</span>
          <span v-if="riskMes.score*100<=87" style="color:#f60f0f;">D</span>
          <span v-if="riskMes.score*100<=92&&riskMes.score*100>87" style="color:#FF502E;">BB</span>
        </p>
      </div>
    </div>
    <p class="con2Remark">
      {{reMark}}
    </p>
    <div class="con2Tab" v-if="isDown">
      <van-tabs type="card" color="#0588ff" title-inactive-color='#666' swipeable>
        <van-tab :title="'风险警示('+riskNum+')'">
          <p v-if="noRisk" class="noDataRadar">暂无数据</p>
          <ul class="tabList">
            <li v-if="riskMes.fengxian.a1!=undefined">
              <span></span>
              现金流风险
            </li>
            <li v-if="riskMes.fengxian.a2!=undefined">
              <span></span>
              筹资风险
            </li>
            <li v-if="riskMes.fengxian.a3!=undefined">
              <span></span>
              投资回报风险
            </li>
            <li v-if="riskMes.fengxian.a4!=undefined">
              <span></span>
              资金收回风险
            </li>
            <li v-if="riskMes.fengxian.b11!=undefined">
              <span></span>
              变现力风险
            </li>
            <li v-if="riskMes.fengxian.b21!=undefined">
              <span></span>
              偿债能力风险
            </li>
            <li v-if="riskMes.fengxian.b22!=undefined">
              <span></span>
              资本机构风险
            </li>
            <li v-if="riskMes.fengxian.b31!=undefined">
              <span></span>
              盈利能力风险
            </li>
            <li v-if="riskMes.fengxian.b32!=undefined">
              <span></span>
              成长能力风险
            </li>
            <li v-if="riskMes.fengxian.b41!=undefined">
              <span></span>
              流动资产能力风险
            </li>
            <li v-if="riskMes.fengxian.b42!=undefined">
              <span></span>
              其他风险
            </li>
          </ul>
        </van-tab>
        <van-tab :title="'异常指标('+yicNum+')'">
          <p v-if="noYic" class="noDataRadar">暂无数据</p>
          <ul class="tabList">
            <li v-if="riskMes.yichang.a1!=undefined">
              <span></span>
              现金流异常
            </li>
            <li v-if="riskMes.yichang.a2!=undefined">
              <span></span>
              筹资异常
            </li>
            <li v-if="riskMes.yichang.a3!=undefined">
              <span></span>
              投资回报异常
            </li>
            <li v-if="riskMes.yichang.a4!=undefined">
              <span></span>
              资金收回异常
            </li>
            <li v-if="riskMes.yichang.b11!=undefined">
              <span></span>
              变现力异常
            </li>
            <li v-if="riskMes.yichang.b21!=undefined">
              <span></span>
              偿债能力异常
            </li>
            <li v-if="riskMes.yichang.b22!=undefined">
              <span></span>
              资本机构异常
            </li>
            <li v-if="riskMes.yichang.b31!=undefined">
              <span></span>
              盈利能力异常
            </li>
            <li v-if="riskMes.yichang.b32!=undefined">
              <span></span>
              成长能力异常
            </li>
            <li v-if="riskMes.yichang.b41!=undefined">
              <span></span>
              流动资产能力异常
            </li>
            <li v-if="riskMes.yichang.b42!=undefined">
              <span></span>
              其他异常
            </li>
          </ul>
        </van-tab>
        <van-tab :title="'正常('+zhengNum+')'">
          <p v-if="noZheng" class="noDataRadar">暂无数据</p>
          <ul class="tabList">
            <li v-if="riskMes.zhengchang.a1!=undefined">
              <span></span>
              现金流异常
            </li>
            <li v-if="riskMes.zhengchang.a2!=undefined">
              <span></span>
              筹资异常
            </li>
            <li v-if="riskMes.zhengchang.a3!=undefined">
              <span></span>
              投资回报异常
            </li>
            <li v-if="riskMes.zhengchang.a4!=undefined">
              <span></span>
              资金收回异常
            </li>
            <li v-if="riskMes.zhengchang.b11!=undefined">
              <span></span>
              变现力异常
            </li>
            <li v-if="riskMes.zhengchang.b21!=undefined">
              <span></span>
              偿债能力异常
            </li>
            <li v-if="riskMes.zhengchang.b22!=undefined">
              <span></span>
              资本机构异常
            </li>
            <li v-if="riskMes.zhengchang.b31!=undefined">
              <span></span>
              盈利能力异常
            </li>
            <li v-if="riskMes.zhengchang.b32!=undefined">
              <span></span>
              成长能力异常
            </li>
            <li v-if="riskMes.zhengchang.b41!=undefined">
              <span></span>
              流动资产能力异常
            </li>
            <li v-if="riskMes.zhengchang.b42!=undefined">
              <span></span>
              其他异常
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
    <!-- <router-link to="/obaDe" tag="p" class="loadOba">
      查看详细财务体系
      <van-icon name="arrow" />
    </router-link> -->
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
                  data: [],
              }
          ],
          color:['red','blue']
      },
      reMark:null,//预警文案
      riskNum:0,
      yicNum:0,
      zhengNum:0,
      riskMes:{},
      isDown:false,
      noRisk:false,
      noYic:false,
      noZheng:false,
    }
  },
  mounted(){
    this.getCon2()

  },
  methods:{
    getCon2(){
      this.$axios.get('http://api2.xiaoyachong.com/risk/finance?code='+this.Code+'&mp=1',{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then((res)=>{
        if(res.data.code==200){
          if (res.data.data.score*100>=92) {
            this.reMark = '该级别为低风险。公司短期内无财务异常情况。';
            this.obaMes.color=['#33d343','#d33333'];
          }else if (res.data.data.score*100<92&&res.data.data.score*100>87) {
              this.reMark  ='该级别为中风险级。公司短期内存在财务异常情况，对异常处应及时确认和注意采取风险防范措施。'
              this.obaMes.color=['#FF502E','#33d343'];
          }else{
              this.reMark  = '该级别为高风险级。公司短期内存在巨大的财务风险，随时可能出现风险，应立刻采取防范措施。'
              this.obaMes.color=['#d33333','#33d343'];
          };
          let last=Number(1)-Number(res.data.data.score);
          this.obaMes.series[0].data.push(res.data.data.score);
          this.obaMes.series[0].data.push(last.toFixed(2));
          let obaDom=this.$echarts.init(document.getElementById('ecartsLeft'));
          obaDom.setOption(this.obaMes)
          let fengxian=[]
          for(let i in res.data.data.fengxian){
            fengxian.push(res.data.data.fengxian[i])
          }
          this.riskNum=fengxian.length;
          if(this.riskNum<1){
            this.noRisk=true;
          }
          let yichang=[]
          for(let i in res.data.data.yichang){
            yichang.push(res.data.data.yichang[i])
          }
          this.yicNum=yichang.length;
          if(this.yicNum<1){
            this.noYic=true;
          }
          let zhengchang=[]
          for(let i in res.data.data.zhengchang){
            zhengchang.push(res.data.data.zhengchang[i])
          }
          this.zhengNum=zhengchang.length;
          if(this.zhengNum<1){
            this.noZheng=true;
          }
          this.riskMes=res.data.data;
          this.isDown=true;
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
.detailsCon2{
  margin-top:.1rem;
  width: 100%;
  background: white;
  box-sizing: border-box;
  padding: 0 .1rem;
  .con2Title{
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
  .con2Mes{
    width: 100%;
    display: flex;
    position: relative;
    div{
      height: 1.5rem;
      text-align: center;
    }
    .riskNum{
      width: 1rem;
      text-align: center;
      font-size: $fontTitle+.06;
      font-weight: bold;
      color:#d33333;
      position: absolute;
      left:.2rem;
      top:.63rem;
    }
    div:first-child{
      width: 40%;
    }
    div:last-child{
      width: 60%;
      box-sizing: border-box;
      padding-top: .5rem;
      p{
        font-weight: bold;
        font-size: $fontTitle;
      }
      p:last-child{
        margin-top: .1rem;
        font-size: .2rem;
        color:$warningColor;
      }
    }
  }
  .con2Remark{
    width: 100%;
    font-weight: bold;
    font-size: $fontText;
    margin-bottom: .1rem;
  }
  .con2Tab{
    width: 85%;
    margin:0 auto;
    .noDataRadar{
      width: 100%;
      text-align: center;
      line-height: .4rem;
      font-size: $fontText;
      color:$moreColor;
    }
    .tabList{
      width: 80%;
      margin:0 auto;
      line-height: .3rem;
      font-size: $fontText;
      span{
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $themeColor;
      }
    }
  }
  .loadOba{
    width: 100%;
    line-height: .3rem;
    border-top: 1px solid #eee;
    color:$moreColor;
    position: relative;
    font-size: $fontText;
    i{
      font-size: .15rem;
      position: absolute;
      top:50%;
      margin-top:-9px;
      right:.05rem;
    }
  }
}
</style>
