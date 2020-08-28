<!-- ai -->
<template lang="html">
  <div class="aiPage">
    <div class="title">
      <p>
        <img src="@/assets/images/aiIcon1.png" alt="">
        AI技术选股
      </p>
      <p>
        在传统的K线形态的基础上，整合A股大数据及人工智能辅助线，根据历史行情走势，分析当下市场及对未来市场的预测，每日精选优质个股供投资者参考决策，现已开发了以下三种AI技术根据不同的数据在A股市场选择出了优质股票。
      </p>
    </div>
    <ul>
      <li>
        <div class="left">
          <div class="picLeft">
            <p>{{aiList[0].shenglv}}%</p>
            <p>策略胜率</p>
          </div>
        </div>
        <div class="right">
          <p>{{aiList[0].title}}</p>
          <p>{{aiList[0].content}}</p>
          <p>
            <router-link :to="{path:'/t',query:{aiT:aiList[0].id}}" tag="span">
              <van-button color="linear-gradient(#44B3FF, #0588ff)">查看优股</van-button>
            </router-link>
          </p>
        </div>
      </li>
      <li>
        <div class="left">
          <div class="picLeft">
            <p>{{aiList[1].shenglv}}%</p>
            <p>策略胜率</p>
          </div>
        </div>
        <div class="right">
          <p>{{aiList[1].title}}</p>
          <p>{{aiList[1].content}}</p>
          <p>
            <router-link :to="{path:'/w',query:{aiT:aiList[1].id}}" tag="span">
              <van-button color="linear-gradient(#44B3FF, #0588ff)">查看优股</van-button>
            </router-link>
          </p>
        </div>
      </li>
      <li>
        <div class="left">
          <div class="picLeft">
            <p>{{aiList[2].shenglv}}%</p>
            <p>策略胜率</p>
          </div>
        </div>
        <div class="right">
          <p>{{aiList[2].title}}</p>
          <p>{{aiList[2].content}}</p>
          <p>
            <router-link :to="{path:'/y',query:{aiT:aiList[2].id}}" tag="span">
              <van-button color="linear-gradient(#44B3FF, #0588ff)">查看优股</van-button>
            </router-link>
          </p>
        </div>
      </li>
    </ul>
    <Back padding="10 10 60 10"/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
export default {
  data(){
    return{
      aiList:[
        {
          shenglv:'',
          title:'',
          content:''
        },
        {
          shenglv:'',
          title:'',
          content:''
        },
        {
          shenglv:'',
          title:'',
          content:''
        },
      ],
    }
  },
  components:{
    Back
  },
  created(){
    this.getAiList()
  },
  methods:{
    getAiList(){
      this.$axios.get(this.Uapi+'/user/index/aiyouxuan',{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.aiList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.aiPage{
  width: 100%;
  background: white;
  .title{
    width: 100%;
    height: 1.6rem;
    background: url('../../assets/images/headerBg1.png');
    background-size: 100% 100%;
    p:first-child{
      width: 100%;
      color:white;
      line-height: .4rem;
      font-size: $fontTitle;
      font-weight: bold;
      position: relative;
      text-align: left;
      box-sizing: border-box;
      padding-left: .35rem;
      img{
        width: $iconSize;
        height: $iconSize;
        position: absolute;
        top:.1rem;
        left:.1rem;
      }
    }
    p:nth-child(2){
      color:white;
      margin-top: .05rem;
      width: 96%;
      margin:0 auto;
      text-align: left;
      line-height: .2rem;
      font-size: $fontText;
    }
  }
  ul{
    width: 95%;
    padding: .1rem .1rem 0 .1rem;
    background: white;
    border-radius: 10px;
    margin-top: -.1rem;
    li{
      width: 100%;
      margin:0 auto;
      padding: .1rem 0;
      display: flex;
      border-bottom:1px solid #eee;
      .left{
        width: 30%;
        height: .1rem;
        box-sizing: border-box;
        padding-top: .2rem;
        text-align: center;
        .picLeft{
          width: .8rem;
          height: .8rem;
          background: url('../../assets/images/aiIcon2.png');
          background-size: 100% 100%;
          position: relative;
          box-sizing: border-box;
          padding-top: .2rem;
          p{
            width: 100%;
            line-height: .2rem;
          }
          p:first-child{
            font-size: $fontTitle;
            color:$warningColor;
            font-weight: bold;
          }
          p:last-child{
            font-size: .13rem;
          }
        }
      }
      .right{
        width: 70%;
        p{
          text-align: left;
        }
        p:first-child{
          font-size: $fontTitle;
          font-weight: bold;
          line-height: .3rem;
        }
        p:nth-child(2){
          font-size: $fontText;
          color:$moreColor;
        }
        p:last-child{
          margin-top: -.3rem;
          button{
            padding-left: .2rem;
            padding-right: .2rem;
            height: .22rem;
            border-radius: 15px;
            font-size: $fontText;
          }
        }
      }
    }
    li:nth-child(2){
      .left{
        .picLeft{
          background: url('../../assets/images/aiIcon3.png');
          background-size: 100% 100%;
        }
      }
    }
    li:nth-child(3){
      .left{
        .picLeft{
          background: url('../../assets/images/aiIcon4.png');
          background-size: 100% 100%;
        }
      }
    }
    li:last-child{
      border:0;
    }
  }
}
</style>
