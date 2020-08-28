<!-- 银行卡 -->
<template lang="html">
  <div class="card">
    <div class="cardList">
      <ul v-for="bankMes in bankList">
        <li v-if="bankMes.bank!=='工商银行'&&bankMes.bank!=='建设银行'&&bankMes.bank!=='中国银行'&&bankMes.bank!=='农业银行'&&bankMes.bank!=='交通银行'&&bankMes.bank!=='招商银行'&&bankMes.bank!=='兴业银行'&&bankMes.bank!=='光大银行'&&bankMes.bank!=='平安银行'&&bankMes.bank!=='民生银行'">
          <p>
            <img src="../../../assets/images/bata.png" alt="">
            <span>{{bankMes.bank}}</span>
          </p>
          <p>储蓄卡</p>
          <p>{{bankMes.cardno}}</p>
        </li>
        <li style="background:rgb(299,1,17);" v-if="bankMes.bank==='工商银行'">
          <p>
            <img src="../../../assets/images/gonghang.png" alt="">
            <span>{{bankMes.bank}}</span>
          </p>
          <p>储蓄卡</p>
          <p>{{bankMes.cardno}}</p>
        </li>
        <li style="background:rgb(0,102,179);" v-if="bankMes.bank==='建设银行'">
          <p>
            <img src="../../../assets/images/jianhang.png" alt="">
            <span>{{bankMes.bank}}</span>
          </p>
          <p>储蓄卡</p>
          <p>{{bankMes.cardno}}</p>
        </li>
        <li style="background:rgb(184,28,33);" v-if="bankMes.bank==='中国银行'">
          <p>
            <img src="../../../assets/images/zhongguo.png" alt="">
            <span>{{bankMes.bank}}</span>
          </p>
          <p>储蓄卡</p>
          <p>{{bankMes.cardno}}</p>
        </li>
        <li style="background:rgb(0,152,130);" v-if="bankMes.bank==='农业银行'">
          <p>
            <img src="../../../assets/images/nonghang.png" alt="">
            <span>{{bankMes.bank}}</span>
          </p>
          <p>储蓄卡</p>
          <p>{{bankMes.cardno}}</p>
        </li>
        <li style="background:rgb(0,54,122);" v-if="bankMes.bank==='交通银行'">
          <p>
            <img src="../../../assets/images/jiaohang.png" alt="">
            <span>{{bankMes.bank}}</span>
          </p>
          <p>储蓄卡</p>
          <p>{{bankMes.cardno}}</p>
        </li>
        <li style="background:rgb(199,21,46);" v-if="bankMes.bank==='招商银行'">
          <p>
            <img src="../../../assets/images/zhaohang.png" alt="">
            <span>{{bankMes.bank}}</span>
          </p>
          <p>储蓄卡</p>
          <p>{{bankMes.cardno}}</p>
        </li>
        <li style="background:rgb(0,66,135);" v-if="bankMes.bank==='兴业银行'">
          <p>
            <img src="../../../assets/images/xinghang.png" alt="">
            <span>{{bankMes.bank}}</span>
          </p>
          <p>储蓄卡</p>
          <p>{{bankMes.cardno}}</p>
        </li>
        <li style="background:rgb(106,22,132);" v-if="bankMes.bank==='光大银行'">
          <p>
            <img src="../../../assets/images/guanghang.png" alt="">
            <span>{{bankMes.bank}}</span>
          </p>
          <p>储蓄卡</p>
          <p>{{bankMes.cardno}}</p>
        </li>
        <li style="background:rgb(236,104,27);" v-if="bankMes.bank==='平安银行'">
          <p>
            <img src="../../../assets/images/pinghang.png" alt="">
            <span>{{bankMes.bank}}</span>
          </p>
          <p>储蓄卡</p>
          <p>{{bankMes.cardno}}</p>
        </li>
        <li style="background:rgb(1,167,91);" v-if="bankMes.bank==='民生银行'">
          <p>
            <img src="../../../assets/images/minhang.png" alt="">
            <span>{{bankMes.bank}}</span>
          </p>
          <p>储蓄卡</p>
          <p>{{bankMes.cardno}}</p>
        </li>

      </ul>
      <p class="addCardDom" @click="addCard=true">
        <van-icon name="add-o" size="20" />
        添加银行卡
      </p>
    </div>
    <!-- 绑定新卡 -->
    <div class="addCard">
      <van-overlay :show="addCard" @click="addCard = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="addCard = false"/>
              添加银行卡
            </p>
            <p>
              请绑定持卡人本人的银行卡
            </p>
            <p style="marginTop:.1rem;">
              <span>姓名:</span>
              <input type="text" name="" value="" placeholder="持卡人姓名" v-model="bankName">
            </p>
            <p style="marginBottom:.1rem;marginTop:.1rem;">
              <span>卡号:</span>
              <input type="number" name="" value="" placeholder="输入卡号" v-model="bankNum">
            </p>
            <p style="marginBottom:.1rem;">
              <span>开户行:</span>
              <input type="text" name="" value="" placeholder="开户行地址" v-model="bankPlace">
            </p>
            <p>
              <van-button color="linear-gradient( #44B3FF, #0588ff)" @click="goFinCard()">下一步</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <div class="addCard">
      <van-overlay :show="addCardSuc" @click="addCardSuc = false">
        <div class="wrapper" @click.stop>
          <div class="turnPay">
            <p class="payTitle">
              <van-icon name="clear" color="#f5222d" @click="addCardSuc = false"/>
              添加银行卡
            </p>
            <!-- <p class="cardMes">
              工商银行
            </p> -->
            <p class="cardMes">
              持卡人:{{bankName}}
            </p>
            <p class="cardMes">
              开户行地址:{{bankPlace}}
            </p>
            <p class="cardMes">
              卡号:{{turnBankNum}}&nbsp;****&nbsp;****&nbsp;****
            </p>
            <p>
              <van-button color="linear-gradient( #44B3FF, #0588ff)"  @click="subCard()">添加</van-button>
            </p>
          </div>
        </div>
      </van-overlay>
    </div>
    <Back padding="10 10 60 10"/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
export default {
  data(){
    return{
      addCard:false,//添加银行卡
      addCardSuc:false,//添加完成
      bankList:[],
      bankName:null,//持卡人姓名
      bankNum:null,//卡号
      bankPlace:null,//开户地址
      turnBankNum:null,
    }
  },
  components:{
    Back
  },
  created(){
    this.getCard()


  },
  methods:{
    goFinCard(){
      if(this.bankName==null||this.bankName==''){
        this.$toast('请输入持卡人姓名')
      }else if(this.bankPlace==null||this.bankPlace==''){
        this.$toast('请输入开户行地址')
      }else if(this.bankNum==null||this.bankNum==''){
        this.$toast('请输入银行卡号码')
      }else{
        this.addCard=false;
        this.addCardSuc=true;
        this.turnBankNum=this.bankNum.substring(0,4);
      }
    },
    getCard(){//获取银行卡
      this.$axios.post(this.Uapi+'/user/bank',{

      },{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.bankList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    subCard(){//添加银行卡
      this.$toast.loading({
        message: '添加中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      this.$axios.post(this.Uapi+'/user/addbank',{
        'realname':this.bankName,
        'cardno':this.bankNum,
        'bank_kaihu':this.bankPlace
      },{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
        //
      }).then((res)=>{
        if(res.data.state==1){
          this.$toast('添加成功');
          this.addCardSuc=false;
          this.getCard();
          this.bankName=null;
          this.bankNum=null;
          this.bankPlace=null;
          this.$toast.clear()
        }else{
          this.$toast.clear()
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast.clear()
        this.$toast(this.errText);
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.card{
  width: 100%;
  .cardList{
    width: 100%;
    margin-top: .1rem;
    ul{
      li{
        width: 90%;
        margin:0 auto;
        height: 1.2rem;
        background: linear-gradient(#d93333,#e34a4a);
        box-sizing: border-box;
        padding: .1rem .1rem;
        border-radius: 10px;
        margin-bottom: .1rem;
        p{
          text-align: left;
        }
        p:first-child{
          text-align: left;
          position: relative;
          box-sizing: border-box;
          padding-left: .24rem;
          color:white;
          font-size: $fontTitle;
          font-weight: bold;
          img{
            width: $iconSize;
            height: $iconSize;
            position: absolute;
            left:0;
            top:.02rem;
          }
        }
        p:nth-child(2){
          box-sizing: border-box;
          padding-left: .24rem;
          color:white;
          line-height: .3rem;
          font-size: $fontText;
        }
        p:last-child{
          line-height: .4rem;
          font-size: $fontText;
          font-weight: bold;
          color:white;
          box-sizing: border-box;
          padding-left: .24rem;
          font-size: $fontTitle;
          margin-top: .1rem;
        }
      }

    }
    .addCardDom{
      width: 90%;
      margin:0 auto;
      background: linear-gradient(#d93333,#e34a4a);
      box-sizing: border-box;
      padding: .1rem .1rem;
      border-radius: 10px;
      margin-bottom: 1rem;
      margin-top: .15rem;
      height: .4rem;
      background: white;
      position: relative;
      text-align: left;
      box-sizing: border-box;
      font-size: $fontTitle;
      padding-left: .3rem;
      i{
        position: absolute;
        left: .05rem;
      }
    }
  }
  .addCard{
    padding-bottom: .1rem;
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
          width: 90%;
          margin:0 auto;
          text-align: center;
          height: .4rem;
          line-height: 0;
          box-sizing: border-box;
          position: relative;
          border-bottom: 1px solid #eee;
          font-size: $fontText;

          input{
            width: $widthAll - .4;
            height: .3rem;
            line-height: .3rem;
            font-size: $fontText;
            text-align: center;
            box-sizing: border-box;
            padding-right: .15rem;
            background: white;
          }
        }
        .payTitle{
          width: 100%;
          position: relative;
          text-align: center;
          line-height: .3rem;
          font-size: $fontTitle;
          font-weight: bold;
          border:0;
          i{
            position: absolute;
            font-size: $iconSize;
            left:.05rem;
            top:.05rem;
          }
        }
        .cardMes{
          color:black!important;
          line-height: .3rem;
          font-size: $fontText;
          // margin-top: .1rem;
        }
        p:nth-child(2){
          color:$moreColor;
          line-height: .3rem;
          font-size: $fontText;
          border:0;
        }
        p:last-child{
          width: 90%;
          margin:0 auto;
          text-align: center;
          margin-top: .2rem;
          position: relative;
          border:0;
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
}
</style>
