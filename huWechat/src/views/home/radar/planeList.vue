<!-- 股东减持详情 -->
<template>
  <div class="planeList">
    <ul>
      <li v-for="(plane,indexPl) in plList" :key="indexPl">
        <p>{{plane.ann_date.substring(0,4)}}-{{plane.ann_date.substring(4,6)}}-{{plane.ann_date.substring(6,8)}}</p>
        <p>股东名称:{{plane.holder_name}}</p>
        <p>数量:{{plane.change_vol/10000}}万股，占流通股比:{{plane.change_ratio}}%</p>
        <p>减持均价:{{plane.avg_price}}元，参考减持金额:{{(((plane.change_vol*plane.avg_price)/100)/100).toFixed(2)}}万元</p>
      </li>
    </ul>
    <Back/>
  </div>
</template>
<script>
import Back from '@/components/backCom/backBtn'
export default {
  name: "PlaneList",
  components: {
    Back
  },
  data: () => ({
    plList:[],
  }),
  created() {
    console.log(this.$route.params);
    this.plList=this.$route.params.plane;
  }
}
</script>
<style lang="scss" scoped>
.planeList{
  width: 95%;
  margin: 0 auto;
  ul{
    width: 100%;
    margin-top: .2rem;
    li{
      font-size: $fontText;
      margin-bottom: .1rem;
      p{
        line-height: .4rem;
        box-sizing: border-box;
        padding-left: .2rem;
      }
      p:first-child{
        color:$themeColor;
        font-size: $fontTitle+.04;
        font-weight: bold;
        box-sizing: content-box;
        padding: 0;
      }
    }
  }
}
</style>
