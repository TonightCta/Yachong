<!-- 策略列表 -->
<template lang="html">
  <div class="starList">
    <p class="lisTitle">
      <van-icon name="award-o" class="titleIcon" />
      <slot></slot>
      <span>
        更多
        <van-icon name="arrow" class="moreArrow"/>
      </span>
    </p>
    <!-- <van-pull-refresh v-model="loadStrList" @refresh="listOnre"> -->
      <ul class="listCon">
        <li v-for="(strMes,indexStr) in strList" :key="indexStr" @click="goDetails(indexStr)">
          <p class="conTitle">{{strMes.name}}</p>
          <p>{{strMes.brief}}</p>
          <p>
            <span>累计收益:<font style="color:red;">{{strMes.cumulative_income}}%</font></span>
            <span>最大回撤:<font style="color:green;">{{strMes.max_retest}}%</font></span>
          </p>
        </li>
      </ul>
    <!-- </van-pull-refresh> -->
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return{
      strList:[],
      loadStrList:false,//刷新时加载动画

    }
  },
  created(){
    if(this.mineStart.length>0){
      this.strList=this.mineStart
    }else{
      this.getStrList();
    }
  },
  computed:{
    ...mapState(['mineStart'])
  },
  methods:{
    ...mapMutations(['mineStart_fn']),
    listOnre() {//刷新策略列表
       setTimeout(() => {
         this.getStrList()
         this.$toast('策略已更新');
         this.loadStrList = false;
       }, 1000);
    },
    goDetails(_html){
      this.$router.push({
        path:'/starCon',
        query:{
          id:this.strList[_html].id
        }
      })
    },
    getStrList(){//获取策略列表
      this.$axios.get(this.Uapi+'/user/strategy?page=1&limit=2').then((res)=>{
        if(res.data.state==1){
          this.strList=res.data.data.list;
          this.mineStart_fn(res.data.data.list)
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast('策略异常,请联系异常')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.starList{
  width: 95%;
  margin:0 auto;
  background: #f3f5f9;
  .lisTitle{
    width: 100%;
    text-align: left;
    line-height: .4rem;
    position: relative;
    font-size: $fontTitle;
    // background: red;
    box-sizing: border-box;
    padding-left: .2rem;
    .titleIcon{
      color:$themeColor;
      font-size: $iconSize;
      position: absolute;
      top:50%;
      margin-top: -10px;
      left: 0;
    }
    span{
      position: absolute;
      top:0;
      right:0;
      font-size: $fontText;
      color:$moreColor;
      padding-right: 16px;
      cursor:pointer;
      .moreArrow{
        position: absolute;
        top:50%;
        font-size: .12rem;
        margin-top: -6px;
        right:2.5%;
      }
    }
  }
  .listCon{
    width: 100%;
    li{
      padding: .15rem .1rem;
      background: white;
      border-radius: 10px;
      margin-bottom: .2rem;
      p{
        width: 100%;
        text-align: left;
        font-size: $fontText;
      }
      .conTitle{
        font-size: $fontTitle;
        font-weight: bold;
      }
      p:nth-child(2){
        color:$moreColor;
        line-height: .3rem;
        margin-top: .05rem;
      }
      p:last-child{
        // line-height: 4rem;
        margin-top: .2rem;
        width: 100%;
        display: flex;
        span{
          width: 50%;
          text-align: left;
        }
      }
    }
  }
}
</style>
