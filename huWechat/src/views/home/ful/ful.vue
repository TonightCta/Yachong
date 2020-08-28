<!-- 涨停策略 -->
<template lang="html">
  <div class="ful">
    <van-pull-refresh v-model="loadFul" @refresh="onRefresh">
      <ul>
        <li v-for="(fulMes,indexFul) in fulList" :key="indexFul" @click="goDe(indexFul)">
          <p class="titleText">
            <span>{{fulMes.title}}</span>
            <span>{{fulMes.zhangfu7}}%</span>
          </p>
          <p class="titleText titleText2">
            <span>{{fulMes.content}}</span>
            <span>连续7天涨幅</span>
          </p>
          <p>
            <span class="comBox" v-for="(comMes,indexCom) in fulMes.niugu" :key="indexCom">
              <span>{{comMes[2]}}</span>
              <br>
              <span style="paddingLeft:.03rem;">{{comMes[3]}}</span>
            </span>
          </p>
        </li>
      </ul>
    </van-pull-refresh>
    <Back padding="10 10 60 10" />
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import {mapMutations} from 'vuex'
export default {
  components:{
    Back
  },
  data(){
    return{
      loadFul:false,
      fulList:[]
    }
  },
  created(){
    this.getFulList()
  },
  methods:{
    ...mapMutations(['fulMes_fn']),
    onRefresh() {
      this.getFulList()
      setTimeout(() => {
        this.$toast('刷新成功');
        this.loadFul = false;
      }, 1000);
    },
    goDe(index){
      this.fulMes_fn(this.fulList[index])
      this.$router.push({
        name:'FulDetiails'
      })
    },
    getFulList(){
      this.$axios.get(this.Uapi+'/user/index/ztyc',{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.fulList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.ful{
  width: 100%;
  ul{
    width: 95%;
    margin:0 auto;
    margin-top: .1rem;
    li{
      padding: .1rem .1rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0px 0px 10px #bbb;
      margin-bottom: .2rem;
      .titleText{
        width: 100%;
        display: flex;
        // line-height: 3rem;
        margin-top: .06rem;
        margin-bottom: .08rem;
        span{
          width: 50%;
          text-align: left;
        }
        span:last-child{
          text-align: right;
        }
      }
      .titleText2{
        font-size: $fontText;
        span{
          width: 70%;
        }
        span:last-child{
          width: 30%;
        }
      }
      p:first-child{
        span:first-child{
          font-size: $fontTitle;
          font-weight: bold;
        }
        span:last-child{
          box-sizing: border-box;
          padding-right: .15rem;
          color:$warningColor;
          font-size: $fontText;
          font-weight: bold;
        }
      }
      p:nth-child(2){
        color:$moreColor;
      }
      p:last-child{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: .3rem;
        .comBox{
          width: 30%;
          text-align: center;
          font-size: $fontText;
          span:last-child{
            color:$warningColor;
            font-weight: bold;
            margin-top: .02rem;
          }
        }
        .comBox:first-child{
          text-align: left;
        }
        .comBox:last-child{
          text-align: right;
        }
      }
    }
  }
}
</style>
