<!-- 详细财务报表 -->
<template lang="html">
  <div class="obaDe">
    <p class="obaDeTitle">
      <span>报告期:</span>
      <span @click="choiceDate=true">2019-09-03 <van-icon name="arrow-down"/></span>
    </p>
    <div class="obaMes">
      <p class="obaTitle">公司财务安全总体状况</p>
      <p style="color:#333;lineHeight:.3rem;">财务安全评级:&nbsp;<span style="color:#f60f0f;">D</span>
        &nbsp;&nbsp;&nbsp;得分-20
      </p>
      <p>该级别为高风险级。公司短期内存在巨大的财务风险，随时可能出现风险，应立刻采防范措施。</p>
    </div>
    <div class="obaMes">
      <p class="obaTitle">公司财务安全评级得分同比分析</p>
      <p class="tabTitle1">
        <span>日期</span>
        <span>综合得分</span>
        <span>等级</span>
      </p>
      <ul class="tabList1">
        <li>
          <p>2019-09</p>
          <p>-20</p>
          <p>D</p>
        </li>
      </ul>
    </div>
    <div class="obaMes">
      <p class="obaTitle">公司2019年各项财务安全指标得分情况</p>
      <p style="marginTop:.1rem;textAlign:justify-content;">
        据公司各项财务安全指标得分情况来看，2019年，赊销赊购周转期，金融债务销售比，金融债务不健全度，存货周转变化度，固定资产周转变化度，无形资产效率，资产系数，说明公司应当： 1) 加强应收应付款的管理，对赊销赊购中存在的问题加以注意。 2) 企业的借款规模存在不合理，企业应当加强资金管理，充分利用借款的杠杆效用。 3) 注意企业借款的增长可能产生了不良影响，借款使用效率不高，企业应当提高企业的借款使用效率。 4) 库存周转的变化存在异常，建议审查企业的库存情况。 5) 固定资产的使用效率过低，建议审查固定资产情况。 6) 无形资产对企业的资金造成压迫负担，建议审查企业无形资产状况，进行相应调整提高无形资产效率。 7) 企业资产与收入不匹配，这种情况如果长期持续将会给企业带来重大财务风险，建议审查企业的资产状况。
      </p>
    </div>
    <div class="obaMes">
      <p class="obaTitle">运营转变化合理度</p>
      <p class="tabTitle2">
        <span>项目评分</span>
        <span>分值</span>
        <span>得分</span>
        <span>状态</span>
      </p>
      <ul class="tabList2">
        <li>
          <p>金融债务销售比</p>
          <p>10</p>
          <p>0</p>
          <p>警示</p>
        </li>
      </ul>
      <p style="marginTop:.1rem;textAlign:justify-content;">2019年，周转期指标为-66.96，从本期应收应付状况看，企业应付账款的数额非常庞大，怀疑该企业的支付能力已经恶化，可能危及到债权人的资金安全、及时回收。同时，由于支付缓慢，该企业在供应商中的信誉度受到损害。仅从本期应收应付状况分析，本指标得分在行业中最低，企业存在较高风险。建议立刻审查该企业短期资金链状况和短期偿付能力。2019年，周转期变化量指标为-64.48，相对企业前期水平，本期企业存在以下可能：（1）应付账款额增长过大；（2）应收账款额下降过快；（3）应付账款上升同时应收账款下降。无论上述何种原因，均说明企业的资金链紧张，企业正在通过应收应付手段筹集资金。仅从本期和前期应收应付周转期变化状况分析，本指标得分在行业中最低，企业运营资金存在很大风险。建议评估人员立刻向企业了解资金状况和支付能力，并考评其严重性。</p>
    </div>
    <div class="obaMes">
      <p class="obaTitle">金融债务销售比</p>
      <p class="tabTitle2">
        <span>项目评分</span>
        <span>分值</span>
        <span>得分</span>
        <span>状态</span>
      </p>
      <ul class="tabList2">
        <li>
          <p>金融债务销售比</p>
          <p>10</p>
          <p>0</p>
          <p>警示</p>
        </li>
      </ul>
      <p style="marginTop:.1rem;textAlign:justify-content;">2019年，公司金融债务销售比指标值为231，相对企业的销售状况，企业的借款规模非常大，借款对销售的支持非常小，在行业中该企业的借款使用效率最低。建议立刻审查该企业借款使用状况，并着重分析该企业借款是否能够支撑企业按期偿还本息。</p>
    </div>
    <div class="obaMes">
      <p class="obaTitle">金融债务不健全度</p>
      <p class="tabTitle2">
        <span>项目评分</span>
        <span>分值</span>
        <span>得分</span>
        <span>状态</span>
      </p>
      <ul class="tabList2">
        <li>
          <p>金融债务不健全度</p>
          <p>10</p>
          <p>0</p>
          <p>警示</p>
        </li>
      </ul>
      <p style="marginTop:.1rem;textAlign:justify-content;">2019年，公司金融债务不健全度指标为231，企业销售环节严重依赖借款，但借款使用效率非常低，借款已经基本不能促进企业销售。因此，本指标得分在行业中最低。可能的原因是（1）库存过大；（2）固定资产投资过大，但投资效果非常差；（3）应收账款回收期延长，可能存在不良应收账款。建议立刻对企业库存、固定资产投资和应收账款等状况进行全面考察、分析。</p>
    </div>
    <div class="obaMes">
      <p class="obaTitle">存货周转变化度</p>
      <p class="tabTitle2">
        <span>项目评分</span>
        <span>分值</span>
        <span>得分</span>
        <span>状态</span>
      </p>
      <ul class="tabList2">
        <li>
          <p>存货周转变化度</p>
          <p>10</p>
          <p>0</p>
          <p>警示</p>
        </li>
      </ul>
      <p style="marginTop:.1rem;textAlign:justify-content;">2019年，公司存货周转变化度指标为4.69，与销售额相比，企业库存率上升的速度极快，占压大量资金，此指标得分最低，在行业中表现较差。可能的原因是（1）销售额下降造成库存增加；（2）产品滞销；（3）存在不良库存。建议立刻审查企业库存率上升的原因，以及对企业资金占压的影响程度。2019年，公司固定资产周转变化度指标为10.84，从销售规模分析，企业的固定资产投资回报非常不合理。可能的原因是：（1）固定资产投资没有转化成为公司收益；（2）固定资产投资与产出比不匹配，投资产出比很差；（3）固定资产投资产生效益的速度慢。建议立刻审查企业的固定资产投资状况、固定资产使用效率、固定资产投资计划实施情况及资金占压状况。</p>
    </div>
    <div class="obaMes">
      <p class="obaTitle">固定资产周转变化度</p>
      <p class="tabTitle2">
        <span>项目评分</span>
        <span>分值</span>
        <span>得分</span>
        <span>状态</span>
      </p>
      <ul class="tabList2">
        <li>
          <p>固定资产周转变化度</p>
          <p>10</p>
          <p>0</p>
          <p>警示</p>
        </li>
      </ul>
      <p style="marginTop:.1rem;textAlign:justify-content;">2019年，公司存货周转变化度指标为4.69，与销售额相比，企业库存率上升的速度极快，占压大量资金，此指标得分最低，在行业中表现较差。可能的原因是（1）销售额下降造成库存增加；（2）产品滞销；（3）存在不良库存。建议立刻审查企业库存率上升的原因，以及对企业资金占压的影响程度。2019年，公司固定资产周转变化度指标为10.84，从销售规模分析，企业的固定资产投资回报非常不合理。可能的原因是：（1）固定资产投资没有转化成为公司收益；（2）固定资产投资与产出比不匹配，投资产出比很差；（3）固定资产投资产生效益的速度慢。建议立刻审查企业的固定资产投资状况、固定资产使用效率、固定资产投资计划实施情况及资金占压状况。</p>
    </div>
    <div class="obaMes">
      <p class="obaTitle">投资资产效率</p>
      <p class="tabTitle2">
        <span>项目评分</span>
        <span>分值</span>
        <span>得分</span>
        <span>状态</span>
      </p>
      <ul class="tabList2">
        <li>
          <p>投资资产效率</p>
          <p>10</p>
          <p>0</p>
          <p>警示</p>
        </li>
      </ul>
      <p style="marginTop:.1rem;textAlign:justify-content;">2019年，公司投资资产效率为0，公司无投资。</p>
    </div>
    <div class="obaMes">
      <p class="obaTitle">无形资产效率</p>
      <p class="tabTitle2">
        <span>项目评分</span>
        <span>分值</span>
        <span>得分</span>
        <span>状态</span>
      </p>
      <ul class="tabList2">
        <li>
          <p>无形资产效率</p>
          <p>10</p>
          <p>0</p>
          <p>警示</p>
        </li>
      </ul>
      <p style="marginTop:.1rem;textAlign:justify-content;">2019年，公司无形资产变化度为2.23，无形资产对企业销售的贡献度明显下降，同事，无形资产占总资产的非常高,严重脱离行业标准，对企业的资金和折旧费用构成非常严重威胁，建议立刻审查企业无形资产状况。</p>
    </div>
    <div class="obaMes">
      <p class="obaTitle">经常收支比率</p>
      <p class="tabTitle2">
        <span>项目评分</span>
        <span>分值</span>
        <span>得分</span>
        <span>状态</span>
      </p>
      <ul class="tabList2">
        <li>
          <p>经常收支比率</p>
          <p>10</p>
          <p>0</p>
          <p>警示</p>
        </li>
      </ul>
      <p style="marginTop:.1rem;textAlign:justify-content;">2019年的经常收支比率为23.81，三年平均经常收支比率为111.39%</p>
    </div>
    <div class="obaMes">
      <p class="obaTitle">异常系数</p>
      <p class="tabTitle2">
        <span>项目评分</span>
        <span>分值</span>
        <span>得分</span>
        <span>状态</span>
      </p>
      <ul class="tabList2">
        <li>
          <p>异常系数</p>
          <p>10</p>
          <p>0</p>
          <p>警示</p>
        </li>
      </ul>
      <p style="marginTop:.1rem;textAlign:justify-content;">2019年，公司异常指数为0.92，从企业的经营状态分析，企业异常系数指标符合行业状况。</p>
    </div>
    <div class="obaMes">
      <p class="obaTitle">支付余力系数</p>
      <p class="tabTitle2">
        <span>项目评分</span>
        <span>分值</span>
        <span>得分</span>
        <span>状态</span>
      </p>
      <ul class="tabList2">
        <li>
          <p>支付余力系数</p>
          <p>10</p>
          <p>0</p>
          <p>警示</p>
        </li>
      </ul>
      <p style="marginTop:.1rem;textAlign:justify-content;">2019年，公司Themis支付余力系数为109.63，从资产与企业支付能力的角度分析，企业资产支撑现有销售规模存在一定压力。如进一步增加销售规模，将对企业资金构成压力。该指标存在异常，应关注企业资产和销售变化趋势。</p>
    </div>
    <div class="obaMes">
      <p class="obaTitle">成本体系</p>
      <p class="tabTitle2">
        <span>项目评分</span>
        <span>分值</span>
        <span>得分</span>
        <span>状态</span>
      </p>
      <ul class="tabList2">
        <li>
          <p>成本体系</p>
          <p>10</p>
          <p>0</p>
          <p>警示</p>
        </li>
      </ul>
      <p style="marginTop:.1rem;textAlign:justify-content;">2019年，公司成本体系为0.47，从收入和成本角度分析，企业成本费用的增长略大于收入的增长，企业应当审核营运策略是否合理，加强企业内部控制，提供企业的收入与成本的协调能力。</p>
    </div>
    <div class="obaMes">
      <p class="obaTitle">资产系数</p>
      <p class="tabTitle2">
        <span>项目评分</span>
        <span>分值</span>
        <span>得分</span>
        <span>状态</span>
      </p>
      <ul class="tabList2">
        <li>
          <p>资产系数</p>
          <p>10</p>
          <p>0</p>
          <p>警示</p>
        </li>
      </ul>
      <p style="marginTop:.1rem;textAlign:justify-content;">2019年，公司成本体系为38.76，自有资本占总资本的27.07196，从企业资本与销售额的关系分析，企业销售额非常小，运营能力非常差，对资金需求不迫切。如果这种情况持续下去一定时期内企业将出现重大财务危机。</p>
    </div>
    <div class="obaMes">
      <p style="marginTop:.1rem;textAlign:justify-content;">2019年，该公司被减分处理48分，说明该公司在个别指标方面存在一定的问题。主要的减分原因在于：1、从公司流动资产和流动负债各会计科目变动情况分析,公司存在将应付账款藏匿于其他科目的可能性,建议予以审查。2、从公司借款与公司销售关系分析,公司借款并未对销售产生贡献。公司存在利用借款弥补坏账或其他用途的嫌疑。建议审查公司的借款使用情况。3、公司本期经常收支状况严重恶化，存在三年内重大财务危机的可能性。建议立刻审查公司的收支状况。4、短期债务过大，近期陷入无法偿付债务的可能性大。有必要紧急筹集资金。</p>
    </div>
    <p class="obaRemark">根据大数据系统进行评级，仅供参考，不构成投资建议</p>
    <van-popup v-model="choiceDate" position="bottom" :style="{ height: '40%' }" >
      <van-datetime-picker
        v-model="dataTime"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <Back/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
export default {
  data(){
    return{
      dataTime:new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      choiceDate:false,
    }
  },
  components:{
    Back
  }
}
</script>

<style lang="scss" scoped>
.obaDe{
  width: 100%;
  .obaDeTitle{
    width: 100%;
    padding: 0 .1rem;
    box-sizing: border-box;
    line-height: .3rem;
    color:$themeColor;
    display: flex;
    background: white;
    font-size: $fontText;
    span{
      width: 50%;
    }
    span:last-child{
      text-align: right;
      position: relative;
      box-sizing: border-box;
      padding-right: .2rem;
      i{
        position: absolute;
        top:50%;
        margin-top: -8px;
        right:.05rem;
      }
    }
  }
  .obaMes{
    width: 100%;
    margin-top: .1rem;
    background: white;
    box-sizing: border-box;
    padding: .1rem;
    .obaTitle{
      font-size: $fontTitle;
    }
    .tabTitle1{
      width: 100%;
      line-height: .2rem;
      display: flex;
      justify-content: space-between;
      border:1px solid #ccc;
      margin-top: .1rem;
      span{
        width: 33%;
        text-align: center;
        color:$moreColor;
      }
    }
    .tabList1{
      width: 100%;
      border:1px solid #ccc;
      border-top: 0;
      li{
        width: 100%;
        line-height: .2rem;
        display: flex;
        p{
          width: 33%;
          text-align: center;
          color:#333;
        }
        p:last-child{
          color:#000;
          font-weight: bold;
        }
      }
    }
    .tabTitle2{
      width: 100%;
      display: flex;
      border:1px solid #ccc;
      margin-top: .1rem;
      span{
        width: 20%;
        text-align: center;
        color:$moreColor;
        line-height: .2rem;
      }
      span:first-child{
        width: 40%;
      }
    }
    .tabList2{
      width: 100%;
      border:1px solid #ccc;
      border-top:0;
      li{
        display: flex;
        line-height: .2rem;
        p{
          width: 20%;
          text-align: center;
          color:#333;
        }
        p:first-child{
          width: 40%;
        }
        p:last-child{
          color:$warningColor;
        }
      }
    }
  }
  .obaRemark{
    width: 100%;
    line-height: .4rem;
    color:$moreColor;
    text-align: center;
  }
}
</style>
