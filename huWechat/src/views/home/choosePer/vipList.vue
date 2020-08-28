<!-- VIP选股 -->
<template lang="html">
  <div class="vipList">
    <p class="vipTitle">关键词:<span>{{vipTitle}}</span></p>
    <div ref="scroller">
      <scroller :on-refresh="rePer">
        <ul>
          <li v-for="(vipMes,indexVip) in vipList" :key="indexVip">
            <div class="">
              <p>
                <span>{{vipMes.name}}</span>
                <br>
                <span>{{vipMes.symbol}}</span>
              </p>
              <p>
                <span><font>最新价</font>&nbsp;&nbsp;{{vipMes.amount}}</span>
                <br>
                <span v-if="vipMes.pct_chg.substring(0,1)!='-'" style="color:#f5222d;">+{{vipMes.pct_chg}}%</span>
                <span v-else style="color:#0be000;">{{vipMes.pct_chg}}%</span>
              </p>
              <p>
                <span><font>净利润增长值</font>30.50</span>
              </p>
            </div>
            <div class="botPer">
              <van-button @click="goDuoK(indexVip)">多空信号</van-button>
              <van-button color="#5088ff">投资风险</van-button>
            </div>
          </li>
        </ul>
      </scroller>
    </div>
    <Back/>
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
      vipList:[],
      vipTitle:null,
    }
  },
  computed:{
    ...mapState(['perText'])
  },
  created(){
    vipTitle:null,
    this.getperDeList()
  },
  mounted(){
    this.vipTitle=this.perText.title+'...';
    this.getHeight()
  },
  methods:{
     getperDeList(){//获取选股列表
      this.$axios.get(this.Uapi+'/user/index/tiaojianxg?condition='+this.perText.code.replace(/%/g,'%25'),{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.vipList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    getHeight(){//获取盒子高度
      let bodyHeight = document.documentElement.clientHeight;
      let scroller = this.$refs.scroller;
      let scrollerTop = scroller.getBoundingClientRect().top;
      scroller.style.height = (bodyHeight-scrollerTop)+"px";
    },
    rePer(done){//刷新数据
      this.getperDeList()
      setTimeout(()=>{
        this.$toast('刷新成功')
        done()
      },1000)
    },
    goDuoK(index){//多空信号
      this.$router.push({
        path:'/signalDetails',
        query:{
          code:this.vipList[index].symbol,
          title:this.vipList[index].name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
._v-container{
  top:.4rem!important;
}
.vipList{
  width: 100%;
  .vipTitle{
    width: 100%;
    color:$moreColor;
    box-sizing: border-box;
    padding: .1rem;
    font-size: $fontText;
    span{
      padding: 0 10px;
      background: $themeColor;
      color:white;
      margin-left: 5px;
      border-radius: 15px;
    }
  }
  ul{
    width: 100%;
    li{
      width: 100%;
      display: flex;
      flex-direction: column;
      background: white;
      box-sizing: border-box;
      padding: .1rem;
      margin-bottom: .05rem;
      div{
        width: 100%;
        height: 50%;
      }
      div:first-child{
        display: flex;
        justify-content: space-between;
        p{
          width: 33%;
          font-size: $fontText;
          font{
            color:$moreColor;
            font-size: $fontText;
          }
        }
        p:first-child{
          span:last-child{
            color:$moreColor;
            font-size: $fontText;
          }
        }
        p:nth-child(2){
          text-align: right;
          span:last-child{
            width: 100%;
            text-align: right;
          }
        }
        p:last-child{
          text-align: center;
        }
      }
      .botPer{
        margin-top: .1rem;
        text-align: right;
        button{
          height: .2rem;
          border-radius: 10px;
          font-size: .15rem;
        }
        button:first-child{
          color:$themeColor;
          border-color:$themeColor;
          margin-right: .1rem;
        }
      }
    }
  }
}
</style>
