<!-- 个人中心头部 -->
<template lang="html">
  <div class="headerCon">
    <div class="conPic">
      <router-link to="/mineEdit" tag="img" :src="userMes.avatar"></router-link>
      <!-- <img :src="" alt="" @click="goEdit()"> -->
      <div class="">
        <span>{{userMes.nickname}}</span>
        <!-- <br> -->
        <span>分享码:{{userMes.share_code}}</span>
      </div>
      <div class="">
        <img src="../../../assets/images/shareIcon.png" @click="creatShare()"  alt="">
        <img src="../../../assets/images/messIcon.png" style="width:.24rem;height:.24rem;"  @click="goMessage()"alt="">
        <span class="mesNum" v-if="isHasMes">{{readNum}}</span>
      </div>
    </div>
    <div class="conTable">
      <ul>
        <router-link to="/myCus" tag="li">
          <img src="../../../assets/images/mineIcon1.png" alt="">
          <br>
          代理中心
        </router-link>
        <router-link to="/agentApp" tag="li">
          <img src="../../../assets/images/mineIcon2.png" alt="">
          <br>
          申请代理
        </router-link>
        <router-link to="/wallet" tag="li">
          <img src="../../../assets/images/mineIcon3.png" alt="">
          <br>
          我的钱包
        </router-link>
        <router-link to="/order" tag="li">
          <img src="../../../assets/images/mineIcon4.png" alt="">
          <br>
          我的订单
        </router-link>
      </ul>
    </div>
    <!-- 客户分享 -->
    <div class="cusShare" ref="cusShare" style="display:block;">
      <p class="userSharePic">
        <img :src="userPic" alt="">
        <img src="" class="mask" alt="">
      </p>
      <p class="userName">{{userMes.nickname}}</p>
      <div class="qrBox">
        <span class="boll bollone"></span>
        <span class="boll bolltwo"></span>
        <span class="linemask">
          <font v-for="(item,indexLine) in 20" :key="indexLine"></font>
        </span>
        <div class="getBox">
          <p>
            <span>最新收益</span>
            <span>{{userMes.cur_profit}}</span>
          </p>
          <p>
            <span>累计收益</span>
            <span>{{userMes.total_profit}}</span>
          </p>
        </div>
        <div class="qrCon">
          <p>我有赚钱的方法,你有赚钱的想法</p>
          <img src="../../../assets/images/cusDown.png" alt="" class="downToch">
          <img src="../../../assets/images/qrFa.png" class="qrToch" alt="">
          <button type="button" name="button">长按保存到相册</button>
        </div>
      </div>
    </div>
    <!-- 代理分享 -->
    <div class="appShare" ref="appShare">
      <img :src="userPic" class="userPic" alt="">
      <span class="appMask"></span>
      <p class="userText">
        <span>{{userMes.nickname}}</span>
        <span>邀请你一起体验大虎鲸AI智投啦～</span>
      </p>
      <p class="conText">
        <span>专业化</span>
        <span>智能化</span>
        <span>安全化</span>
      </p>
      <img src="../../../assets/images/qr.jpeg" class="qrPic" alt="">
      <p class="endText">扫码进入公众号立即体验</p>
    </div>
    <div class="showShare" v-if="showShare" ref="showShareDom" @touchstart="start" @touchmove="move" @touchend="end">
      <img :src="imgUrl" alt="">
    </div>
  </div>
</template>

<script>
import {html2canvas} from '@/assets/js/getCavans.js'
import {mapState} from 'vuex'
// import html2canvas from "html2canvas"
export default {
  data(){
    return{
      readNum:0,
      isHasMes:false,
      imgUrl:null,
      showShare:false,
      userPic:null,
      longClick: 0,
      timeOutEvent: 0
    }
  },
  watch:{
    readNum(val,oldVal){
      if(val>0){
        this.isHasMes=true;
      }else{
        this.isHasMes=false;
      }
    }
  },
  methods:{
    goEdit(){//编辑资料
      this.$router.push('/mineEdit')
    }
  },
  computed:{
    ...mapState(['userMes'])
  },
  created(){
    // if(window.localStorage.getItem('token')){
      this.getMesNum()
    // }
  },
  methods:{
    getMesNum(){//获取未读消息
      this.$axios.get(this.Uapi+'/user/read',{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then(res=>{
        if(res.data.state==1){
          this.readNum=res.data.data.unread;
        }else{
          // this.$toast(res.data.msg)
        }
      }).catch(err=>{
        // this.$toast(this.errText)
      })
    },
    creatShare(){//分享
      let _this=this;
      // 一定要设置为let，不然图片不显示
      let image = new Image();
      // 解决跨域问题
      image.setAttribute('crossOrigin', 'anonymous');
      const imageUrl = this.userMes.avatar;
      image.src = imageUrl;
      // image.onload为异步加载
      image.onload = () => {
          var canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          var context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, image.width, image.height);
          var quality = 0.8;
          // 这里的dataurl就是base64类型
          // 使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
          this.userPic = canvas.toDataURL('image/jpeg', quality);
          _this.$toast.loading({
            message: '分享生成中...',
            forbidClick: true,
            loadingType: 'spinner',
          });
          if(this.userMes.identity!=0){
            this.$refs.appShare.style.display='block';
            this.$refs.appShare.style.opacity='1';
            setTimeout(()=>{
              html2canvas(_this.$refs.appShare,{
                dpi: window.devicePixelRatio * 2,
                scale:2,
                width: _this.$refs.appShare.offsetWidth,
                heigth: _this.$refs.appShare.offsetHeight
              }).then(canvas=>{
                let dataURL=canvas.toDataURL("image/png",1);
                _this.imgUrl = dataURL;
                _this.showShare=true;
                setTimeout(()=>{
                  _this.$refs.showShareDom.style.opacity='1'
                })
                _this.$toast.clear()
              })
            },500)
          }else{
            this.$refs.cusShare.style.display='block';
            this.$refs.cusShare.style.opacity='1';
            setTimeout(()=>{
              html2canvas(_this.$refs.cusShare,{
                dpi: window.devicePixelRatio * 2,
                scale:2,
                width: _this.$refs.cusShare.offsetWidth,
                heigth: _this.$refs.cusShare.offsetHeight
              }).then(canvas=>{
                let dataURL=canvas.toDataURL("image/png",1);
                _this.imgUrl = dataURL;
                _this.showShare=true;
                setTimeout(()=>{
                  _this.$refs.showShareDom.style.opacity='1'
                })
                _this.$toast.clear()
              })
            },500)
          }
      }
    },
    gotouchend(){

    },
    goMessage(){
      this.$router.push('/message')
    },
    start() {
      var that = this;
      this.longClick = 0;
      this.timeOutEvent = setTimeout(function() {
        that.longClick = 1;
      }, 500);
    },
    move(e) {
      clearTimeout(this.timeOutEvent);
      this.timeOutEvent = 0;
      e.preventDefault();
    },
    end() {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0 && this.longClick == 0) {
        this.$refs.showShareDom.style.opacity='0'
        setTimeout(()=>{
            this.showShare=false;
            this.$refs.cusShare.style.display='none';
            this.$refs.appShare.style.display='none';
        },300)
      }
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
.headerCon{
  width: 100%;
  padding:.2rem .2rem;
  background: $themeColor;
  box-sizing: border-box;
  overflow: hidden;
  .conPic{
    box-sizing: border-box;
    text-align: left;
    padding: .3rem 0;
    display: flex;
    height: auto;
    // background: red;
    img{
      width: .6rem;
      height: .6rem;
      border-radius: 50%;
      border: 1px solid white;
    }
    div:nth-child(2){
      width: 50%;
      box-sizing: border-box;
      padding-left: .1rem;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      span{
        color:white;
        font-size: $fontTitle;
        line-height: .3rem;
      }
      span:first-child{
        font-weight: bold;
      }
    }
    div:last-child{
      width: 30%;
      text-align: right;
      line-height: .6rem;
      height: .3rem;
      line-height: .4rem;
      img{
        width: .22rem;
        height: .22rem;
        border:0;
      }
      img:nth-child(2){
        margin-left:.1rem;
      }
      .mesNum{
        background: $warningColor;
        position: absolute;
        width: .15rem;
        height: .15rem;
        line-height: .15rem;
        text-align: center;
        border-radius: 50%;
        color:white;
        font-size: .1rem;
        padding: .01rem;
        right:.2rem;
        top:.8rem;
      }
    }
  }
  .conTable{
    width: 100%;
    margin-top: .1rem;
    ul{
      width: 100%;
      display: flex;
      justify-content: space-between;
      li{
        width: 20%;
        color:white;
        text-align: center;
        font-size: $fontText;
        img{
          width: .26rem;
          height: .26rem;
        }
      }
    }
  }
  .cusShare{
    width: 3.75rem;
    height: 6.67rem;
    background: url('../../../assets/images/cusShare.png');
    background-size: 100% 100%;
    display: none;
    z-index: -100;
    opacity:0;
    position: fixed;
    left: 0;
    top:0;
    .userSharePic{
      width: .54rem;
      height: .54rem;
      position: absolute;
      top:.94rem;
      left:50%;
      margin-left: -.28rem;
      text-align: center;
      padding-top: .01rem;
      img{
        width: 100%;
        height: 100%;
      }
      .mask{
        width: 1.1rem;
        height: 1.1rem;
        border-radius: 55%;
        position: absolute;
        top:-.22rem;
        left:50%;
        margin-left: -.55rem;
        overflow: hidden;
        border: .3rem solid rgb(255,207,115);
        box-sizing: border-box;
        // background: red;
      }
    }
    .userName{
      width: 100%;
      text-align: center;
      line-height: .4rem;
      font-size: .24rem;
      font-weight: bold;
      color:black;
      position: absolute;
      top:1.5rem;
      letter-spacing:.02rem;
    }
    .qrBox{
      width: 90%;
      border-radius: 10px;
      height: 3.5rem;
      background: white;
      position: absolute;
      bottom:.4rem;
      left:50%;
      margin-left: -45%;
      .boll{
        width: .18rem;
        height: .18rem;
        background: rgb(255,165,19);
        position: absolute;
        top:1rem;
        border-radius: 10px;
      }
      .bollone{
        left: -.09rem;
      }
      .bolltwo{
        right:-.09rem;
        background: rgb(255,177,47);
      }
      .linemask{
        width: 80%;
        position: absolute;
        left:50%;
        margin-left: -40%;
        top:1.1rem;
        display: flex;
        justify-content: space-between;
        font{
          display: inline-block;
          height: 1px;
          width: .08rem;
          background:  rgb(255,177,47);
        }
      }
      .getBox{
        width: 100%;
        height: 1rem;
        display: flex;
        box-sizing: border-box;
        padding-top: .1rem;
        p{
          width: 50%;
          text-align: center;
          font-size: .18rem;
          height: .8rem;
          display: flex;
          flex-direction: column;
          line-height: .4rem;
          span:last-child{
            font-weight: bold;
            color:rgb(255,128,26);
          }
        }
      }
      .qrCon{
        p{
          width: 100%;
          text-align: center;
          font-size: .16rem;
          font-weight: bold;
          line-height: .6rem;
        }
        .downToch{
          width: .2rem;
          height: .2rem;
          top:1.42rem;
          position: absolute;
          margin-left: -.1rem;
          left:50%;
        }
        .qrToch{
          position: absolute;
          margin-left: -.7rem;
          border-radius: 0;
          width: 1.4rem;
          height: 1.4rem;
          top:1.6rem;
          left:50%;
          box-shadow: 0px 0px 15px rgb(255,165,19);
        }
        button{
          height: .3rem;
          background: rgb(255,165,19);
          border-radius: 15px;
          width: 50%;
          position: absolute;
          bottom:.15rem;
          left:50%;
          margin-left: -25%;
          font-size: .15rem;
          font-weight: bold;
          color::white;

        }
      }
    }
  }
  .appShare{
    width: 3.75rem;
    height: 6.67rem;
    background: url('../../../assets/images/appShare.png');
    background-size: 100% 100%;
    position: fixed;
    left:0;
    z-index: -100;
    overflow: hidden;
    display: none;
    .userPic{
      position: absolute;
      width: .55rem;
      height: .55rem;
      left: .15rem;
      top:.05rem;
    }
    .appMask{
      width: .7rem;
      height: .7rem;
      position: absolute;
      left: .1rem;
      top:-.02rem;
      box-sizing: border-box;
      border:.1rem solid rgb(31,149,255);
      border-radius: 20px;
    }
    .userText{
      height: .7rem;
      width: 100%;
      box-sizing: border-box;
      padding-left: .9rem;
      display: flex;
      flex-direction: column;
      line-height: .3rem;
      color:white;
      span:first-child{
        font-weight: bold;
        font-size: .2rem;
      }
      span:last-child{
        font-size:.14rem;
      }
    }
    .conText{
      font-size: .22rem;
      color:rgb(17,127,226);
      width: 80%;
      margin:0 auto;
      display: flex;
      justify-content: space-between;
      position: absolute;
      top:3.03rem;
      left:50%;
      margin-left: -40%;
      span{
        width: 30%;
        text-align: center;
      }
    }
    .qrPic{
      width: 1rem;
      height: 1rem;
      position: absolute;
      border-radius: 0;
      bottom:.6rem;
      left:50%;
      margin-left: -.5rem;
    }
    .endText{
      position: absolute;
      width: 100%;
      text-align: center;
      font-size: .17rem;
      color:white;
      bottom: .28rem;
      font-weight: bold;
    }
  }
  .showShare{
    width: 100%;
    height: 100%;
    position: fixed;
    transition: .5s all;
    background: rgba(0,0,0,.5);
    top:0;
    left:0;
    z-index: 1000;
    text-align: center;
    opacity: 0;
    i{
      color:$warningColor;
      font-size: .24rem;
      position: absolute;
      right:.15rem;
      top:.4rem;
    }
    img{
      width: 85%;
      height: 85%;
      padding-top: 15%;
    }
  }
}
</style>
