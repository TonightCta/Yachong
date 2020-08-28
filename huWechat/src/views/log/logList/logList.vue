<!-- 历史必涨股票 -->
<template lang="html">
  <div class="logList">
    <div class="listTop">
      <p class="topTitle">
        历史阶段必涨股票
        <span>分析周期:2010-2019</span>
      </p>
      <p>最近十年的历史行情中，六月份的必涨股票</p>
      <ul>
        <li>
          <span>国农科技</span>
          <br>
          <span>8年必涨</span>
          <br>
          <span>平均+10.32%</span>
        </li>
        <li>
          <span>国农科技</span>
          <br>
          <span>8年必涨</span>
          <br>
          <span>平均+10.32%</span>
        </li>
      </ul>
      <span style="background:#eee;height:.1rem;width:100%;marginLeft:-.2rem;"></span>
      <p class="topTitle">
        行业最佳表现个股
        <span>分析周期:2010-2019</span>
      </p>
      <p style="textAlign:left;">最近十年的历史行情中，<span style="color:#0588ff;">六月份</span>的必涨股票</p>
      <ul style="marginTop:.2rem;">
        <li>
          <span>国农科技</span>
          <br>
          <span>8年必涨</span>
          <br>
          <span>平均+10.32%</span>
        </li>
        <li>
          <span>国农科技</span>
          <br>
          <span>8年必涨</span>
          <br>
          <span>平均+10.32%</span>
        </li>
        <li>
          <span>国农科技</span>
          <br>
          <span>8年必涨</span>
          <br>
          <span>平均+10.32%</span>
        </li>
        <li>
          <span>国农科技</span>
          <br>
          <span>8年必涨</span>
          <br>
          <span>平均+10.32%</span>
        </li>
      </ul>
    </div>
    <p class="remarkText">(所有数据与信息仅供参考,不构成投资建议)</p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.logList{
  width: 100%;
  margin-top: .1rem;
  .listTop{
    width: 100%;
    padding: .1rem .1rem;
    background: white;
    padding-top: 0;
    .topTitle{
      text-align: left;
      font-size: $fontTitle;
      font-weight: bold;
      line-height: .4rem;
      position: relative;
      span{
        font-size: $fontText;
        color: $moreColor;
        position: absolute;
        right:.2rem;
      }
    }
    p:nth-child(2){
      text-align: left;
      font-size: $fontText;
      margin-bottom: .1rem;
    }
    ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        padding: .1rem;
        background: #ccc;
        margin-bottom: .1rem;
        border-radius: 10px;
        margin-right: .3rem;
        span{
          line-height: .2rem;
          font-size: $fontText;
        }
        span:nth-child(3){
          color:$warningColor;
          font-weight: bold;
        }
      }
    }
  }
  .remarkText{
    line-height: .4rem;
    color:$moreColor;
  }
}
</style>
