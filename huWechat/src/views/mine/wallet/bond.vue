<!-- 我的余额 -->
<template lang="html">
  <div class="wallet">
    <div class="balance">
      <!-- <p>账户余额
        <router-link to="/bankCard" tag="span">
          <img src="../../../assets/images/addCard.png" alt="">
        </router-link>
      </p> -->
      <p class="giveMoney">
        已缴纳保证金
      </p>
      <p>
        <span>¥&nbsp;
          <font v-if="userMes.strategy_balance!=''&&userMes.strategy_balance!=null">{{userMes.strategy_balance}}</font>
          <font v-else>0.00</font>
        </span>
        <!-- <span>
          <button type="button" name="button" @click="tiXia=true">申请退款</button>
        </span> -->
      </p>
    </div>
    <p class="balanMes">
      <span>账单详情</span>
      <span @click="dateChoose=true">{{billDate}}
        <van-icon name="arrow-down" />
      </span>
    </p>
    <p class="noBill" v-if="noBill">暂无账单</p>
    <div ref="scroller" v-else style="position:relative;">
      <scroller :on-refresh="reBill" :on-infinite="onInfinite">
        <div class="">
          <ul class="balanList" v-if="true">
            <li v-for="(balaMes,indexBal) in balanList" :key="indexBal" @click="goBackDe(indexBal)">
              <p>{{balaMes.create_time.substring(0,5)}}&nbsp;&nbsp;{{balaMes.create_time.substring(5,20)}}</p>
              <p>¥&nbsp;{{balaMes.amount}}</p>
              <p v-if="balaMes.type==1" style="color:#04cc45;">已入账</p>
              <p v-else style="color:#f60f0f;">退款中</p>
              <i class="el-icon-arrow-right"></i>
            </li>
          </ul>
        </div>
      </scroller>
    </div>
    <div class="">
      <van-popup v-model="dateChoose" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="dateBlan"
          type="year-month"
          title="选择账单日"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="searBill"
        />
      </van-popup>
    </div>
    <!-- <Back padding="10 10 60 10"/> -->
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import {mapState} from 'vuex'

import {getUser} from '@/assets/js/user.js'
export default {
  components:{
    Back
  },
  computed:{
    ...mapState(['userMes'])
  },
  data(){
    return{
      balanList:[],
      dateChoose:false,//日期选择器
      dateBlan:new Date(),
      maxDate:new Date(),
      minDate:new Date(2019,0,1),
      bankList:[],
      isOpen:true,
      billPage:1,
      noBill:false,
    }
  },
  watch:{
    balanList(val,oldVal){
      if(val.length>0){
        this.noBill=false
      }else{
        this.noBill=true
      }
    }
  },
  created(){
    let data=new Date()
    let yrae=data.getFullYear();
    let mon=data.getMonth()+1;
    if(mon<10){
      mon='0'+mon
    };
    this.billDate=yrae+'-'+mon;
    this.getBill();
  },
  mounted(){
    this.getHeight()
  },
  methods:{
    formatter(type, val) {
      if (type === 'month') {
        return `${val}月`;
      } else if (type === 'day') {
        return `${val}日`;
      }
      return val;
    },
    getBill(){//账单
      this.$axios.get(this.Uapi+'/user/bill?page='+this.billPage+'&limit=20&is_bzj=1&month='+this.billDate,{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.balanList=res.data.data.list;
          if(res.data.data.list.length>1){
            setTimeout(()=>{
              this.getHeight()
            })
          }
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    searBill(cDate){//筛选账单
      let year=cDate.getFullYear();
      let mon=cDate.getMonth()+1;
      if(mon<10){
        mon='0'+mon
      }
      this.billDate=year+'-'+mon;
      this.dateChoose=false;
      setTimeout(()=>{
        this.getBill()
      })
    },
    reBill(done){//刷新账单
      this.getBill()
      setTimeout(()=>{
        this.$toast('刷新成功')
        done()
      },1000)
    },
    onInfinite(done){//加载更多
      setTimeout(()=>{
        done(true)
      },2000)
    },
    getHeight(){//获取盒子高度
      let bodyHeight = document.documentElement.clientHeight;
      let scroller = this.$refs.scroller;
      let scrollerTop = scroller.getBoundingClientRect().top;
      scroller.style.height = (bodyHeight-scrollerTop)+"px";
    },
    goBackDe(index){//账单详情
      window.sessionStorage.setItem('WaActive','保证金')
      if(this.balanList[index].remark_type==10){
        this.$router.push({
          path:'/backDetails',
          query:{
            backID:this.balanList[index].target_id,
            type:'tui'
          }
        })
      }else{
        this.$toast('该账单暂无详情')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wallet{
  width: 100%;
  .balance{
    width: 90%;
    margin:0 auto;
    margin-top: .1rem;
    padding: .1rem .1rem .2rem .1rem;
    background: linear-gradient(#44B3FF, #0588ff);
    border-radius: 10px;
    p:first-child{
      width: 100%;
      text-align: left;
      font-size: $fontTitle;
      color:white;
      font-weight: bold;
      position: relative;
      box-sizing: border-box;
      padding-left: .1rem;
      span{
        img{
          width: $iconSize;
          height: $iconSize;
          position: absolute;
          right:.1rem;
          top:0;
          height: .25rem;
          width: .25rem;
        }
      }
    }
    .giveMoney{
      width: 100%;
      text-align: left;
      line-height: .4rem;
      font-size: $fontText;
      color:white;
      font-weight: bold;
    }
    p:last-child{
      width: 100%;
      display: flex;
      margin-top: .2rem;
      font-size: $fontTitle;
      color:white;
      font-weight: bold;
      box-sizing: border-box;
      padding-left: .1rem;
      span{
        width: 100%;
        text-align: left;
        font-size: $fontTitle;
      }
      // span:last-child{
    //     text-align: right;
    //     button{
    //       height: 2.6rem;
    //       text-align: center;
    //       border-radius: 15px;
    //       color:$themeColor;
    //       font-weight: bold;
    //       width: 8rem;
    //       font-size: $fontText;
    //     }
    //   }
    }
  }
  .balanMes{
    width: 95%;
    margin:0 auto;
    text-align: left;
    display: flex;
    line-height: .3rem;
    margin-top:.1rem;
    margin-bottom: .1rem;
    span{
      width: 50%;
      font-size: $fontText;
    }
    span:last-child{
      text-align: right;
      color:#666;
      position: relative;
      box-sizing: border-box;
      padding-right: .18rem;
      i{
        position: absolute;
        font-size: .15rem;
        padding-top:2px;
        top:50%;
        margin-top: -11px;
        right:0;
      }
    }
  }
  .noBill{
    width: 95%;
    margin:0 auto;
    line-height: .4rem;
    border-radius: 10px;
    background: white;
    text-align: center;
    color:$moreColor;
    font-size: $fontText;
  }
  .balanList{
    width: 90%;
    margin:0 auto;
    padding: .1rem .1rem;
    background: white;
    border-radius: 10px;
    li{
      width:100%;
      display: flex;
      line-height: .4rem;
      font-size: $fontText;
      position: relative;
      border-bottom: 1px solid #eee;
      p{
        width: 50%;
        text-align: left;
      }
      p:first-child{
        span{
          font-size: $fontText;
          color:$moreColor;
        }
      }
      p:nth-child(2){
        width: 75%;
        text-align: center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color:$moreColor;
      }
      p:nth-child(3){
        text-align: right;
        box-sizing: border-box;
        padding-right: .25rem;
      }
      i{
        position: absolute;
        font-size: $fontTitle;
        top:50%;
        margin-top: -8px;
        right:.05rem;
        color:#aaa;
      }
    }
    li:last-child{
      border:0;
    }
  }
}
</style>
