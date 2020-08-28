<!-- 历史策略 -->
<template lang="html">
  <div class="logStar">
    <scroller :on-refresh="reStar" :on-infinite="onInfinite">
      <div class="mineStr">
        <p class="isHasSatr" v-if="false">暂无策略,快去购买吧</p>
        <ul v-else>
          <li v-for="(mineSMes,indexSMes) in mineStrList" :key="indexSMes">
            <p class="inStarTitle">{{mineSMes.content.name}}</p>
            <p>{{mineSMes.content.brief}}</p>
            <div class="">
              <p>配资金额:<span>{{mineSMes.investment_amount}}</span></p>
              <p>累计收益:<span>{{mineSMes.profit}}</span></p>
            </div>
            <p class="insOperStar">
              <span v-if="mineSMes.is_commission==2">未结算</span>
              <span v-if="mineSMes.is_commission==1">已结算</span>
              <span v-if="mineSMes.is_commission==0">待结算</span>
              <!-- <button type="button" name="button" class="othoerBtn" @click="addNal(indexSMes)">追加</button>
              <button type="button" name="button" class="othoerBtn" @click="reNew(indexSMes)">续费</button>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" size="small" @click="bindBefore(indexSMes)" v-if="!mineSMes.account_info">绑定交易账号</van-button>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" size="small" v-else @click="changeBind(indexSMes)">{{mineSMes.account_info.security}}</van-button> -->
            </p>
          </li>
          <!-- <li>
            <img src="../../assets/images/bata.png" alt="" />
            <div class="">
              <p class="title"></p>
              <p class="content"></p>
            </div>
          </li> -->
        </ul>
      </div>
    </scroller>
    <Back/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
export default {
  components:{Back},
  data(){
    return{
      mineStrList:[],
      isHasSatr:false,
    }
  },
  created(){
    this.getMyStar()
  },
  watch:{
    mineStrList(val,oldVal){
      if(val.length>0){
        this.isHasSatr=false;
      }else{
        this.isHasSatr=true;
      }
    }
  },
  methods:{
    getMyStar(){//我的策略
      let _this=this;
      _this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      _this.$axios.get(_this.Uapi+'/user/strategy/mine?is_commission=2',{
        headers:{
          'Authorization':_this.baseToken,
          'SessionId':_this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          _this.mineStrList=res.data.data.list;
          _this.$toast.clear()
        }else{
          _this.$toast(res.data.msg)
          _this.$toast.clear()
        }
      }).catch((err)=>{
        _this.$toast(_this.errText);
        _this.$toast.clear()
      })
    },
    reStar(done){
      this.getMyStar()
      setTimeout(()=>{
        done()
      })
    },
    onInfinite(done){//加载更多
    // this.orderPage++;
      setTimeout(()=>{
        done(true)
      },1500)
    },
  }
}
</script>

<style lang="scss" scoped>
.mineStr{
  padding-top: .2rem;
  .strTitle{
    width: 95%;
    margin:0 auto;
    text-align: left;
    line-height: .4rem;
    font-size: $fontTitle;
    position: relative;
    box-sizing: border-box;
    padding-left: .2rem;
    background: #f3f5f9;
    i{
      font-size: $iconSize;
      position: absolute;
      top:50%;
      left: 0;
      margin-top: -10px;
      color:#f5222d;
    }
  }
  .isHasSatr{
    width: 100%;
    text-align: center;
    line-height: .4rem;
    color:$moreColor;
    font-size: $fontText;
  }
  ul{
    width: 95%;
    margin:0 auto;
    li{
      padding: .15rem .1rem;
      background: white;
      border-radius: 10px;
      margin-bottom: .15rem;
      position: relative;
      overflow: hidden;
      p{
        text-align: left;
        font-size: $fontText;
        margin-top:.05rem;
        span{
          color:$warningColor;
        }
      }

      .inStarTitle{
        font-size: $fontTitle;
        font-weight: bold;
      }
      p:nth-child(2){
        color:$moreColor;
      }
      div{
        display: flex;
        p{
          width: 50%;
          line-height: .3rem;
        }
      }
      .insOperStar{
        span{
          position: absolute;
          width: 1rem;
          height: .2rem;
          line-height: .2rem;
          background: $themeColor;
          color:white;
          transform: rotate(45deg);
          right:-.3rem;
          top:.1rem;
          font-weight: bold;
          text-align: center;
          font-size: $fontText;
        }
      }
    }
    // li:last-child{
    //   width: 100%;
    //   display: flex;
    //   img{
    //     width: 70px;
    //     height: 70px;
    //     border-radius: 50%;
    //     background: #ccc;
    //   }
    //   div{
    //     display: flex;
    //     width: 70%;
    //     box-sizing: border-box;
    //     padding-left: 20px;
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: space-between;
    //     p{
    //       width: 100%;
    //       height: 30px;
    //       background: #ccc;
    //       border-radius: 10px;
    //     }
    //     p:last-child{
    //       width:70%;
    //     }
    //   }
    // }
  }
}
</style>
