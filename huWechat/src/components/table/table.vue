<!-- 首页table选项卡 -->
<template lang="html">
  <div class="tableWapper">
    <ul class="">
      <router-link to="/ful" tag="li">
        <p>
          <img src="../../assets/images/homeIcon1.png" alt="">
        </p>
        <span>涨停策略</span>
      </router-link>
      <router-link to="/north" tag="li">
        <p>
          <img src="../../assets/images/homeIcon2.png" alt="">
        </p>
        <span>北上资金</span>
      </router-link>
      <router-link to="/signal" tag="li">
        <p>
          <img src="../../assets/images/homeIcon3.png" alt="">
        </p>
        <span>多空信号</span>
      </router-link>
    </ul>
    <ul style="marginTop:.1rem;">
      <router-link to="/choosePer" tag="li">
        <p>
          <img src="../../assets/images/homeIcon4.png" alt="">
        </p>
        <span>条件选股</span>
      </router-link>
      <router-link to="/logSearch" tag="li">
        <p>
          <img src="../../assets/images/homeIcon5.png" alt="">
        </p>
        <span>历史回顾</span>
      </router-link>
      <router-link to="/radar" tag="li">
        <p>
          <img src="../../assets/images/homeIcon6.png" alt="">
        </p>
        <span>蚜虫扫雷</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.tableWapper{
  width: 100%;
  box-sizing: border-box;
  padding: 20px 10px;
  background: white;
  ul{
    display: flex;
    justify-content: space-between;
    li{
      width: 20%;
      text-align: center;
      font-size: $fontText;
      p{
        width: .5rem;
        height: .5rem;
        margin:0 auto;
        border-radius: 50%;
        box-shadow: 0px 7px 10px $shaowColor;
        line-height: .65rem;
        text-align: center;
        img{
          display: inline-block;
          width: .25rem;
          height: .25rem;
        }
      }
      span{
        line-height: .4rem;
      }
    }
  }
  ul:first-child{
    li:first-child{
      p{
        background: linear-gradient( #0588FF, #44B3FF);
      }
    }
    li:nth-child(2){
      p{
        box-shadow: 0px 7px 10px #FFC34E;
        background: linear-gradient( #FFAA05, #FFC34E);
      }
    }
    li:nth-child(3){
      p{
        box-shadow: 0px 7px 10px #FFC34E;
        background: linear-gradient( #FFAA05, #FFC34E);
      }
    }
  }
  ul:last-child{
    li:first-child{
      p{
        box-shadow: 0px 7px 10px #007EFF;
        background: linear-gradient( #0054FF, #007EFF);
      }
    }
    li:nth-child(2){
      p{
        box-shadow: 0px 7px 10px #FF6D6D;
        background: linear-gradient( #FF3737, #FF6D6D);
      }
    }
    li:nth-child(3){
      p{
        box-shadow: 0px 7px 10px #44B3FF;
        background: linear-gradient( #0588FF, #44B3FF);
      }
    }
  }
}
</style>
