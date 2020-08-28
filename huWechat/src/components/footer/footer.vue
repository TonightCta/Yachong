<!-- 脚部 -->
<template lang="html">
  <div class="footerWapper">
    <ul>
      <router-link to="/" tag="li">
        <img src="../../assets/images/footerActive1.png" v-if="$route.meta.color==1" alt="">
        <img src="../../assets/images/footer1.png" alt="" v-else>
        <br>
        <span :class="{fooActive:$route.meta.color==1}">策略工具</span>
      </router-link>
      <router-link to="/ai" tag="li">
        <span>
          <img src="../../assets/images/ai.png" alt="">
        </span>
      </router-link>
      <router-link to="/mine" tag="li">
        <img src="../../assets/images/footerActive2.png" v-if="$route.meta.color==2" alt="">
        <img src="../../assets/images/footer2.png" alt="" v-else>
        <br>
        <span :class="{fooActive:$route.meta.color==2}">个人中心</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.fooActive{
  color:$themeColor;
}
.footerWapper{
  width: 100%;
  height: .5rem;
  background: white;
  position: fixed;
  bottom:0;
  border-top: 1px solid #eee;
  left:0;
  // z-index: 88;
  ul{
    width: 100%;
    height: .5rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    padding-top: .05rem;
    li{
      width: 30%;
      text-align: center;
      cursor: pointer;
      font-size: .12rem;
      color:$moreColor;
      span{
        font-size: $fontText;
      }
      img{
        width: .2rem;
        height: .2rem;
      }
    }
    li:nth-child(2){
      position: absolute;
      width:.6rem;
      height: .6rem;
      background: white;
      border-radius: 50%;
      line-height: .4rem;
      left:50%;
      margin-left: -.3rem;
      top:-.1rem;
      box-sizing: border-box;
      span{
        width: .4rem;
        height: .4rem;
        background: red;
        border-radius:50%;
        margin-top: .05rem;
        line-height: .4rem;
        box-sizing: border-box;
        padding-top: .05rem;
        color:white;
        background: linear-gradient(#44B3FF,#0588ff);
        box-shadow: 0px 0px 10px #0588ff;
        img{
          width: .22rem;
          height: .22rem;
        }
      }
    }
  }
}
</style>
