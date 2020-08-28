<!-- 个人中心 -->
<template lang="html">
  <div class="" style="width:100%;overflow:hidden;">
    <Header/>
    <Swiper/>
    <div class="mineStr">
      <p class="strTitle">
        <i class="el-icon-tickets"></i>
        我的策略
        <router-link to="/logStar" tag="span">
          历史策略
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </p>
      <p class="isHasSatr" v-if="isHasSatr">暂无策略,快去购买吧</p>
      <ul v-else>
        <li v-for="(mineSMes,indexSMes) in mineStrList" :key="indexSMes" @click="goStarDe(indexSMes)">
          <p class="inStarTitle">{{mineSMes.content.name}}</p>
          <p>{{mineSMes.content.brief}}</p>
          <div class="">
            <p>配置金额:<span>{{mineSMes.investment_amount}}</span></p>
            <p>累计收益:<span>{{mineSMes.profit}}</span></p>
          </div>
          <p class="insOperStar">
            <button type="button" name="button" class="othoerBtn" @click.stop="addNal(indexSMes)">追加</button>
            <button type="button" name="button" class="othoerBtn" @click.stop="reNew(indexSMes)">续费</button>
            <van-button color="linear-gradient( #44B3FF, #0588ff)" size="small" @click.stop="bindBefore(indexSMes)" v-if="!mineSMes.account_info">绑定交易账号</van-button>
            <van-button color="linear-gradient( #44B3FF, #0588ff)" size="small" v-else @click.stop="changeBind(indexSMes)">{{mineSMes.account_info.security}}</van-button>
          </p>
          <span class="note" v-if="mineSMes.is_commission==2">未结算</span>
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
    <StarList>
      <p>推荐策略</p>
    </StarList>
    <!-- 绑定交易账号 -->
    <div class="bindCus">
      <van-overlay :show="bindCus" @click="bindCus = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="bindCus = false"/>
              绑定交易账号
            </p>
            <div class="bingMes">
              <ul>
                <li>
                  <p>证券公司:</p>
                  <p class="mineBindCus">
                    <el-select v-model="secuName" @change="turnSecu" @focus="closeJI()" placeholder="选择证券" filterable size="mini">
                      <el-option
                        name="sel"
                        v-for="item in secuList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                    <van-icon name="checked" v-if="secuName!=null&&secuName!=''"/>
                  </p>
                </li>
                <li>
                  <p>账号:</p>
                  <p>
                    <input type="number" name="" value="" v-model="secuNum" placeholder="请输入证券账号">
                    <van-icon name="checked"  v-if="secuNum!=null&&secuNum!=''"/>
                  </p>
                </li>
                <li>
                  <p>密码:</p>
                  <p>
                    <input :type="pasType" name="" value="" v-model="secuPass" placeholder="请输入证券密码">
                    <i class="el-icon-view lockPass" v-if="lockPass" style="color:#0588ff;" @click="pasType='text';lockPass=false"></i>
                    <i class="el-icon-view lockPass" v-else style="color:#aaa;" @click="pasType='password';lockPass=true"></i>
                    <van-icon name="checked" v-if="secuPass!=null&&secuPass!=''" />
                  </p>
                </li>
              </ul>
              <!-- <ul>
                <li>

                </li>
                <li>

                </li>
                <li>

                </li>
              </ul> -->
            </div>
            <p class="bindTurn">
              <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="bindTurn()">绑定</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 绑定成功 -->
    <div class="bindSuccess">
      <van-overlay :show="bindSuccess" @click="bindSuccess = false">
        <div class="wrapper" @click.stop>
          <div class="paySuc">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="bindSuccess = false"/>
            </p>
            <p>
              <van-icon name="passed" />
              <br>
              <br>
              绑定成功
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <!-- 续费 -->
    <div class="wePay">
      <van-overlay :show="wePay" @click="wePay = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="wePay = false"/>
              续费策略
            </p>
            <p>交易资金{{wePayQuota}}W预支付:</p>
            <p>0元/月</p>
            <p>收款方:厦门小蚜虫量化软件开发有限公司</p>
            <p>支付代表您已同意<router-link to="/userAgeTwo" tag="font" style="color:#0588ff;"><用户服务协议></router-link></p>
            <p class="reTitle">
              提示
            </p>
            <p class="reText">1.续费完成后即代表开始新的服务</p>
            <p>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="starPay()">确认支付</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
import Header from './header/header'
import Swiper from '@/components/swiper/swiper'
import StarList from './mineStar'
import {mapMutations,mapState} from 'vuex'
import {getUser} from '@/assets/js/user.js'
// import VConsole from 'vconsole'
// let vConsole=new VConsole();
export default {
  components:{
    Header,Swiper,StarList
  },
  data(){
    return{
      mineStrList:[],
      bindCus:false,//绑定交易账号
      secuName:null,//证券名称
      secuNum:null,//证券账号
      secuPass:null,//证券密码
      secuID:null,//证券ID
      starID:null,
      secuList:[],
      isHasSatr:true,
      bindSuccess:false,//绑定成功
      wePay:false,
      wePayQuota:null,
      wePayID:null,
      lockPass:true,//查看密码
      pasType:'password'
    }
  },
  computed:{
    ...mapState(['myStar','userMes'])
  },
  created(){
    if(this.$route.query.hasBuy){
      this.getMyStar();
    }
    this.getSecu();
    if(this.myStar.length>0){
      this.mineStrList=this.myStar;
    }else{
      this.getMyStar();
    }
  },
  watch:{
    mineStrList(val,oldVal){
      if(val.length>0){
        this.isHasSatr=false;
      }else{
        this.isHasSatr=true;
      }
    },
    bindCus(val,oldVal){
      if(!val){
        this.secuName=null;
        this.secuNum=null;
        this.secuPass=null;
        this.lockPass=true;
        this.pasType='password'
      }
    },
  },
  mounted(){

  },
  // beforeRouteEnter(to,form,next){
  //   if(window.localStorage.getItem('token')){
  //     getUser()
  //     next(vm=>{
  //       vm.getMyStar()
  //     })
  //   }else{
  //     next()
  //   }
  // },
  methods:{
    ...mapMutations(['myStar_fn','userMes_fn']),
    getMyStar(){//我的策略
      let _this=this;
      _this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      _this.$axios.get(_this.Uapi+'/user/strategy/mine&is_commission=0',{
        headers:{
          'Authorization':_this.baseToken,
          'SessionId':_this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          _this.mineStrList=res.data.data.list;
          _this.myStar_fn(res.data.data.list);
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
    turnSecu(value){//绑定证券ID
      for(let i in this.secuList){
        if(value===this.secuList[i].name){
          this.secuID=this.secuList[i].id;
        }
      }
    },
    bindBefore(index){//绑定交易账号
      this.starID=this.mineStrList[index].id;
      this.bindCus=true;
    },
    getSecu(){//获取证券列表
      this.$axios.get(this.Uapi+'/user/serurities',{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.secuList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    bindTurn(){//绑定账号
      let _this=this;
      if(_this.secuID==null||_this.secuID==''){
        _this.$toast('请选择证券公司')
      }else if(_this.secuNum==null||_this.secuNum==''){
        _this.$toast('请输入证券账号')
      }else if(_this.secuPass==null||_this.secuPass==''){
        _this.$toast('请输入密码')
      }else{
        _this.$toast.loading({
          message: '请求中...',
          forbidClick: true,
          loadingType: 'spinner',
        });
        _this.$axios.post(this.Uapi+'/user/account',{
          'us_id':_this.starID,
          'sec_id':_this.secuID,
          'account':_this.secuNum,
          'pwd':_this.secuPass
        },{
          headers:{
            'Authorization':_this.baseToken,
            'SessionId':_this.baseID,
            'v':'v2'
          }
        }).then((res)=>{
          if(res.data.state==1){
            _this.bindCus=false;
            _this.bindSuccess=true;
            window.localStorage.setItem(this.starID,_this.secuPass)
            _this.starID=null;
            _this.secuID=null;
            _this.secuNum=null;
            _this.secuPass=null;
            _this.getMyStar();
            _this.$toast.clear()
          }else{
            _this.$toast.clear()
            _this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          _this.$toast.clear()
          _this.$toast(_this.errText)
        })
      }
    },
    changeBind(index){
      if(this.mineStrList[index].is_commission==0||this.mineStrList[index].is_commission==1){
        this.starID=this.mineStrList[index].id;
        this.secuName=this.mineStrList[index].account_info.security;
        this.secuList.forEach((e)=>{
          if(this.secuName==e.name){
            this.secuID=e.id;
          }
        })
        this.secuNum=this.mineStrList[index].account_info.account;
        this.secuPass=window.localStorage.getItem(this.starID)
        this.bindCus=true;
      }else{
        this.$toast('当前策略状态不可修改证券账号')
      }
    },
    addNal(index){//追加
      if(this.myStar[index].order_status==2||this.myStar[index].order_status==4){
        this.$router.push({
          path:'/starCon',
          query:{
            id:this.myStar[index].strategy_id,
            orderID:this.myStar[index].order_id,
            amount:this.myStar[index].content.quota,
            payed:this.myStar[index].order_strategy_amount,
            choose:true,
          }
        })
      }else{
        this.$toast('该订单当前状态暂不支持追加')
      }
    },
    reNew(index){//续费
      if(this.myStar[index].order_status==4){
        this.wePayQuota=this.myStar[index].content.quota;
        this.wePayID=this.myStar[index].order_id,
        this.wePay=true;
      }else{
        this.$toast('策略进行中,未结算,暂不可续费')
      }
    },
    starPay(){
      this.$toast.loading({
        message: '请求中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      this.$axios.get(this.Uapi+'/user/neworder?id='+this.wePayID+'&ntype=1',{
        headers:{
          'Authorization':this.baseToken,
          'sessionId':this.baseID,
          'v':'v2'
        }
      }).then(res=>{
        if(res.data.state==1){
          setTimeout(()=>{
            this.$toast.clear()
            this.$toast('续费成功')
          },1000)
          this.getMyStar();
          this.wePay=false;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch(err=>{
        this.$toast(this.errText)
      })
    },
    closeJI(){
      document.activeElement.blur()
    },
    goStarDe(index){//策略详情
      this.$router.push({
        path:'/orderDetails',
        query:{
          orderID:this.myStar[index].order_sn,
          ID:this.myStar[index].order_id
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.mineStr{
  background: #f3f5f9;
  min-height: .5rem;
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
    span{
      position: absolute;
      right:0;
      font-size: $fontText;
      color:$moreColor;
      padding-right: .2rem;
      i{
        color:$moreColor;
        position: absolute;
        left:.58rem;
        margin-top: -9px;
      }
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
      .note{
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
        text-align: right;
        span{
          color:white;
        }
        .othoerBtn{
          border:1px solid $themeColor;
          color:$themeColor;
          display: inline-block;
          height: .32rem;
          margin-right: .1rem;
        }
        button{
          font-size: $fontText;
          border-radius: 5px;
          padding: 2px 20px;
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
.bindCus{
  .wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .turnPay{
      width: 3.2rem;
      padding: .1rem;
      border-radius: 10px;
      background: white;
      margin:0 auto;
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
        margin-bottom: .1rem;
      }
      .bingMes{
        width: 95%;
        margin:0 auto;
        ul{
          li{
            font-size: $fontText;
            display: flex;
            border-bottom: 1px solid #eee;
            line-height: .5rem;
            p{
              margin-top: .1rem;
              position: relative;
              input{
                width: 1.9rem;
                text-align: center;
                background: white;
              }
              .lockPass{
                position: absolute;
                right:.1rem;
                font-size: .2rem;
              }
              i{
                color:$themeColor;
                font-size: $iconSize;
                position: absolute;
                right:-.25rem;
                top:50%;
                margin-top: -10px;
              }
            }
            p:first-child{
              width: 25%;
              text-align: left;
            }
          }
        }
        // ul:last-child{
        //   li{
        //     box-sizing: border-box;
        //     margin-left: .5rem;
        //     line-height: 6rem;
        //     position: relative;
        //     input{
        //       height: 3rem;
        //       line-height: 3rem;
        //       border-radius: 15px;
        //       text-align: center;
        //       width: 100%;
        //       border-bottom: 1px solid #ccc;
        //     }
        //
        //   }
        // }
      }
      .bindTurn{
        width: 100%;
        margin-top: .2rem;
        text-align: center;
        height: .4rem;
        position: relative;
        button{
          width: $widthAll+.2;
          height: .3rem;
          border-radius: 15px;
          position: absolute;
          top:0;
          left:50%;
          margin-left: -1.3rem;
        }
      }
    }
  }
}
.bindSuccess{
  text-align: center;
  .wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .paySuc{
      width: 3rem;
      padding: .1rem;
      border-radius: 10px;
      background: white;
      margin:0 auto;
      .payTitle{
        width: 100%;
        position: relative;
        height: .3rem;
        font-size: $fontTitle;
        i{
          position: absolute;
          font-size: $iconSize;
          left:.05rem;
          top:.05rem;
        }
      }
      p:nth-child(2){
        font-size: $fontTitle;
        font-weight: bold;
        padding-bottom: .1rem;
        i{
          font-size: 90px;
          color:$themeColor;
        }
      }
    }
  }

}
.wePay{
  .wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .turnPay{
      width: 3rem;
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
        margin-top: .05rem;
        font-size: $fontText;
      }
      p:nth-child(3){
        text-align: center;
        line-height: .4rem;
        font-size: $fontTitle;
        color:$themeColor;
        font-weight: bold;
      }
      p:nth-child(4){
        color:$moreColor;
        font-size: $fontText;
        line-height: .3rem;
      }
      p:nth-child(5){
        line-height: .3rem;
        font-size: $fontText;
      }
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
      .reTitle{
        text-align: left;
        color:$warningColor;
        font-size: $fontTitle;
      }
      .reText{
        text-align: left;
        font-size: $fontText;
        color:$moreColor;
        margin-top: .05rem;
      }
      p:last-child{
        width: 100%;
        margin-top: .1rem;
        text-align: center;
        button{
          width: 80%;
          height: .26rem;
          border-radius: 15px;
        }
      }
    }
  }
}
</style>
