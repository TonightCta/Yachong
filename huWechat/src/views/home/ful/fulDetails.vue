<!-- 涨停预测详情 -->
<template lang="html">
  <div class="fulDe">
    <div class="deHader">
      <p>
        <span>30天选股胜率</span>
        <span>
          <font>消息面</font>
        </span>
      </p>
      <p>
        <span>{{detMes.shenglv}}%</span>
        <span>
          <font>短线</font>
        </span>
      </p>
      <p>简介:{{detMes.content}}</p>
    </div>
    <div class="fulTitleMes">
      <p>策略收益</p>
      <p>
        <span class="mesBlock">
          <span>当日涨跌幅</span>
          <br>
          <span>{{detMes.zhangfu1}}%</span>
        </span>
        <span class="mesBlock">
          <span>7日涨跌幅</span>
          <br>
          <span style="color:#04cc45;">{{detMes.zhangfu7}}%</span>
        </span>
        <span class="mesBlock">
          <span>30日涨跌幅</span>
          <br>
          <span>{{detMes.zhangfu30}}%</span>
        </span>
      </p>
    </div>
    <div class="logShar">
      <p class="sharTitle">历史牛股</p>
      <ul>
        <li v-for="niuMes in detMes.niugu">
          <p>{{niuMes[2]}}</p>
          <p>{{niuMes[0].substring(4,6)}}-{{niuMes[0].substring(6,8)}}入选</p>
          <p>{{niuMes[3]}}</p>
          <p>累计涨幅</p>
        </li>
      </ul>
    </div>
    <div class="sharList">
      <p class="sharListTitle">
        <span>2020-06-04入选:2支</span>
        <router-link to="/fulDeLog" tag="span">
          更多
          <van-icon name="arrow" />
        </router-link>
      </p>
      <p class="sharListTitle2">
        <span>股票</span>
        <span>入选价</span>
        <span>最新价</span>
        <span>涨跌幅</span>
      </p>
      <ul>
        <li>
          <p>
            <span>{{shareList[0][0][1]}}</span>
            <br>
            <span>{{shareList[0][0][0]}}</span>
          </p>
          <p class="fontBold">{{shareList[0][0][2]}}</p>
          <p class="warColor fontBold">{{shareList[0][0][3]}}</p>
          <p class="warColor fontBold">{{shareList[0][0][4]}}</p>
        </li>
      </ul>
    </div>
    <Back padding="10 10 60 10"/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import {mapState} from 'vuex'
export default {
  components:{
    Back
  },
  computed:{
    ...mapState(['fulMes'])
  },
  data(){
    return{
      detMes:{},//详细内容
      shareList:[]
    }
  },
  created(){
    this.detMes=this.fulMes;
    for(let i in this.fulMes.stock){
      this.shareList.push(this.fulMes.stock[i])
    }
  }
}
</script>

<style lang="scss" scoped>
.fulDe{
  width: 100%;
  .deHader{
    width: 100%;
    box-sizing: border-box;
    padding: .1rem .2rem;
    background: $themeColor;
    color:white;
    p{
      width: 100%;
      display: flex;
      line-height: .3rem;
      span{
        width: 50%;
        text-align: left;
      }
      span:last-child{
        text-align: right;
      }
    }
    p:first-child{
      span:first-child{
        font-size: $fontText;
      }
      span:last-child{
        font{
          background: white;
          color:$themeColor;
          padding:1px 10px;
          border-radius: 10px;
          font-size: $fontText;
        }
      }
    }
    p:nth-child(2){
      span:first-child{
        font-size: .16rem;
        font-weight: bold;
      }
      span:last-child{
        font{
          background: white;
          color:$themeColor;
          padding:1px 10px;
          border-radius: 10px;
          font-size: $fontText;
        }
      }
    }
    p:last-child{
      margin-top: .2rem;
      text-align: left;
      line-height: .16rem;
      font-size: $fontText;
    }
  }
  .fulTitleMes{
    word-wrap: 100%;
    background: white;
    margin-top: .1rem;
    box-sizing: border-box;
    padding:.1rem;
    p{
      text-align: left;
      width: 100%;
      font-size: $fontText;
    }
    p:first-child{
      font-size: $fontTitle;
      font-weight: bold;
      // line-height: 3rem;
      margin-bottom: .1rem;
    }
    p:last-child{
      display: flex;
      justify-content: space-between;
      margin-top: .1rem;
      .mesBlock{
        width: 30%;
        text-align: center;
        line-height: .2rem;
        span:last-child{
          color:$warningColor;
          font-weight: bold;
        }
      }
      .mesBlock:first-child{
        text-align: left;
        span:last-child{
          box-sizing: border-box;
          padding-left: .15rem;
        }
      }
      .mesBlock:last-child{
        text-align: right;
        span:last-child{
          box-sizing: border-box;
          padding-right: .08rem;
        }
      }
    }
  }
  .logShar{
    width: 100%;
    background: white;
    margin-top: .1rem;
    box-sizing: border-box;
    padding: .1rem;
    .sharTitle{
      width: 100%;
      text-align: left;
      font-size: $fontTitle;
      font-weight: bold;
      margin-bottom: .1rem;
    }
    ul{
      display: flex;
      justify-content: space-between;
      li{
        padding: 5px 10px;
        border-radius: 10px;
        border:1px solid #eee;
        p:first-child{
          font-weight: bold;
          font-size: .13rem;
        }
        p:nth-child(2){
          font-size: $fontText;
          color:$moreColor;
        }
        p:nth-child(3){
          font-size: $fontText;
          font-weight: bold;
          color:$warningColor;
          line-height: .28rem;
        }
        p:last-child{
          color:$moreColor;
          font-size: $fontText;
        }
      }
    }
  }
  .sharList{
    width: 100%;
    .sharListTitle{
      width: 95%;
      margin:0 auto;
      text-align: left;
      line-height: .4rem;
      font-size: $fontTitle;
      font-weight: bold;
      position: relative;
      span:last-child{
        position: absolute;
        right:0;
        font-size: $fontText;
        color:$moreColor;
        font-weight: normal;
        box-sizing: border-box;
        padding-right: .15rem;
        i{
          position: absolute;
          right:0;
          font-size: .14rem;
          top:50%;
          margin-top: -8px;
        }
      }
    }
    .sharListTitle2{
      width: 100%;
      padding: 0 .1rem;
      box-sizing: border-box;
      line-height: .4rem;
      background: white;
      display: flex;
      span{
        width: 25%;
        font-size: $fontTitle;
        font-weight: bold;
      }
      span:first-child{
        text-align: left;
      }
      span:last-child{
        text-align: right;
      }
    }
    ul{
      width: 100%;
      background: white;
      box-sizing: border-box;
      padding: .05rem .1rem;
      li{
        width: 100%;
        display: flex;
        margin-bottom: .1rem;
        p{
          width: 25%;
          font-size: $fontText+.01;
        }
        p:first-child{
          text-align: left;
          span:last-child{
            color:$moreColor;
          }
        }
        p:last-child{
          text-align: right;
        }
        .warColor{
          color:$warningColor;
        }
        .fontBold{
          font-weight: bold;
        }
      }
    }
  }
}
</style>
