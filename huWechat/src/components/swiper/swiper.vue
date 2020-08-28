<!-- 轮播图 -->
<template lang="html">
  <div class="swiperWapper">
    <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false" indicator-color="white">
      <van-swipe-item>
        <img src="../../assets/images/swiper.png" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/images/swiper.png" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/images/swiper.png" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/images/swiper.png" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.swiperWapper{
  width: 98%;
  margin:0 auto;
  box-sizing: border-box;
  padding: 20px 10px;
  // margin-bottom: 1rem;
  background: #f3f5f9;
}
.my-swipe{
  box-shadow: 0px 7px 10px $shaowColor;
  border-radius: 10px;
  .van-swipe-item {
      width: 100%;
      font-size: 20px;
      height: 1rem;
      text-align: center;
      border-radius: 10px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
}
</style>
