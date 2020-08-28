<!-- 优选选股 -->
<template lang="html">
  <div class="perDetails">
    <p class="deTitle">关键词:<span>{{titlePerDe}}</span></p>
    <p class="listTitle">
      <span>股票名称</span>
      <span>最新价</span>
      <span>净利润增长值</span>
    </p>
    <div ref="scroller">
      <scroller :on-refresh="rePer">
        <ul class="perDeList">
              <li v-for="(perDeMes,indexPer) in perDeList" :key="indexPer">
                    <p>
                      <span>{{perDeMes.name}}</span>
                      <br>
                      <span>{{perDeMes.symbol}}</span>
                    </p>
                    <p>
                      <span>{{perDeMes.amount}}</span>
                      <br>
                      <span v-if="perDeMes.pct_chg.substring(0,1)!='-'" style="color:#f5222d;">+{{perDeMes.pct_chg}}%</span>
                      <span v-else style="color:#0be000;">{{perDeMes.pct_chg}}%</span>
                    </p>
                    <p>{{perDeMes.high}}</p>
                  </li>
          </ul>
      </scroller>
    </div>


    <div class="backOff">
      <van-button color="#0588ff" @click="goVipDe()">优选股票</van-button>
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
  data(){
    return{
      titlePerDe:null,
      perDeList:[],
    }
  },
  computed:{
    ...mapState(['perText'])
  },
  created(){
    this.titlePerDe=this.perText.title+'...';
    this.getperDeList()
  },
  mounted(){
    this.getHeight()
  },
  methods:{
    goVipDe(){
      this.$router.push('/vipList')
    },
    getperDeList(){//获取选股列表
      this.$axios.get(this.Uapi+"/user/index/tiaojianxg?condition="+this.perText.code.replace(/%/g,'%25'),{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.perDeList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    rePer(done){//刷新数据
      this.getperDeList()
      setTimeout(()=>{
        this.$toast('刷新成功')
        done()
      },1000)
    },
    getHeight(){//获取盒子高度
      let bodyHeight = document.documentElement.clientHeight;
      let scroller = this.$refs.scroller;
      let scrollerTop = scroller.getBoundingClientRect().top;
      scroller.style.height = (bodyHeight-scrollerTop)+"px";
    },
  }
}
</script>

<style lang="scss" scoped>
._v-container{
  top:.7rem!important;
}
.perDetails{
  width: 100%;
  .deTitle{
    line-height: .4rem;
    width: 95%;
    margin: 0 auto;
    font-size: $fontText;
    span{
      padding: 1px 10px;
      background: $themeColor;
      border-radius: 10px;
      height: .2rem;
      line-height: .2rem;
      color:white;
      margin-left: .05rem;
    }
  }
  .listTitle{
    width: 100%;
    background: white;
    line-height: .3rem;
    font-size: $fontTitle;
    box-sizing: border-box;
    padding: 0 .1rem;
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #eee;
    span{
      width: 30%;
      color:$moreColor;
    }
    span:last-child{
      text-align: right;
    }
  }
  .perDeList{
    width: 100%;
    padding: 0 .1rem;
    box-sizing: border-box;
    background: white;
    li{
      display: flex;
      width: 100%;
      border-bottom: 1px solid #eee;
      justify-content: space-between;
      box-sizing: border-box;
      padding: .05rem 0;
      p{
        width: 30%;
        font-size: .15rem;
      }
      p:first-child{
        span:last-child{
          font-size: $fontText;
          color:$moreColor;
        }
      }
      p:nth-child(2){
        span:last-child{
          color:#0be000;
          font-size: $fontText;
        }
      }
      p:last-child{
        text-align: right;
        line-height: .4rem;
      }
    }
  }
  .backOff{
    position: fixed;
    bottom: .1rem;
    width: 96%;
    height: .28rem;
    left:50%;
    margin-left: -48%;
    border-radius: 15px;
    color:white;
    line-height: .28rem;
    text-align: center;
    margin-top:.2rem ;
    button{
      width: 90%;
      height: .3rem;
      border-radius: 15px;
      font-size: .16rem;
    }
  }
  .openVip{
    .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .turnPay{
        width: 70%;
        padding: .1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
        p{
          width: 93%;
          margin:0 auto;
          text-align: left;
        }
        p:nth-child(2){
          display: flex;
          line-height: .3rem;
          span{
            width: 50%;
            text-align: left;
          }
          span:last-child{
            color:$themeColor;
          }
        }
        p:nth-child(3){
          line-height: .2rem;
        }
        p:nth-child(4){
          line-height: .3rem;
        }
        p:nth-child(5){
          margin-bottom: .1rem;
        }
        p:nth-child(6){
          line-height: .2rem;
          position: relative;
          i{
            font-size: $iconSize;
            position: absolute;
            top:50%;
            margin-top: -10px;
          }
          i:first-child{
            left: 25%;
          }
          i:last-child{
            left: 38%;
          }
        }
        .payTitle{
          width: 100%;
          position: relative;
          text-align: center;
          line-height: .3rem;
          font-size: $fontTitle;
          font-weight: bold;
          i{
            font-size: $iconSize;
            position: absolute;
          }
          i:first-child{
            left:.05rem;
            top:.05rem;
          }
          i:last-child{
            right:.05rem;
            top:.05rem;
            color:$moreColor;
          }
        }
        p:last-child{
          width: 93%;
          margin:0 auto;
          margin-top: .2rem;
          display: flex;
          line-height: .22rem;
          justify-content: space-between;
          span{
            font{
              color:$themeColor;
            }
          }
          button{
            // width: 70%;
            // margin-left: 40%;
            height: .22rem;
            border-radius: 15px;
            font-size: 12px;
          }
        }
      }
    }
  }
  .paySuccess{
    .wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .turnPay{
        width: 70%;
        padding: .1rem;
        border-radius: 10px;
        background: white;
        margin:0 auto;
        text-align: center;
        .payTitle{
          width: 100%;
          position: relative;
          text-align: center;
          line-height: .3rem;
          font-size: $fontTitle;
          font-weight: bold;
          i{
            position: absolute;
            font-size: $iconSize;
            left:.05rem;
            top:.05rem;
          }
        }

        p:nth-child(2){
          line-height: .3rem;
          font-weight: bold;
          font-size: $fontText;
        }
        p:nth-child(3){
          width: 100%;
          margin-top: .1rem;
          input{
            width: 70%;
            height: .26rem;
            border:1px solid #ccc;
            border-radius:10px;
            text-align: center;
          }
        }
        p:nth-child(4){
          margin-top: .2rem;
          button{
            height: .26rem;
            font-size: $fontTitle;
            border-radius: 15px;
            padding-left: .6rem;
            padding-right: .6rem;
          }
        }
        p:last-child{
          width: 100%;
          margin-top: .1rem;
          button{
            width: 60%;
            height: .26rem;
            border-radius: 15px;
          }
        }
      }
    }
  }
}
</style>
