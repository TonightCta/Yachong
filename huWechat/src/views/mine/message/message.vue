<!-- 消息通知 -->
<template lang="html">
  <div class="message">
    <scroller :on-refresh="reMessage" :on-infinite="loadMessage">
      <div class="messList" v-for="(messAge,indexAge) in messList" :key="indexAge">
        <!-- <p class="dateTitle">{{messAge.time}}</p> -->

      </div>
      <ul>
        <li v-for="(entMes,indexEnt) in entList" @click="goDetails(indexEnt)">
          <p>{{entMes.title}}</p>
          <p>{{entMes.content.text}}</p>
          <p>{{entMes.create_time}}</p>
        </li>
      </ul>
    </scroller>
    <Back padding="10 10 60 10"/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
export default {
  components:{
    Back
  },
  data(){
    return{
      messList:[],
      entList:[],
      limit:10
    }
  },
  created(){
    this.getMesList()
  },
  methods:{
    getMesList(){
      this.$axios.get(this.Uapi+'/user/message?page=1&limit='+this.limit,{
        headers:{
          'Authorization':this.baseToken,
          'sessionId':this.baseID,
          'v':'v2'
        }
      }).then(res=>{
        if(res.data.state==1){
          this.entList=res.data.data.list;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch(err=>{
        this.$toast(this.errText)
      })
    },
    reMessage(done){//刷新消息
      this.getMesList()
      setTimeout(()=>{
        this.$toast('刷新成功')
        done()
      },1000)
    },
    loadMessage(done){//加载更多
      this.limit+10;
      this.getMesList()
      setTimeout(()=>{
        // this.$toast('加载完成')
        done(true)
      },1000)
    },
    goDetails(index){
      this.$router.push({
        path:'/mesDetails',
        query:{
          id:this.entList[index].id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.message{
  width: 100%;
  padding-bottom: 1rem;
  .messList{

  }
  .dateTitle{
    width: 95%;
    margin:0 auto;
    line-height: .4rem;
    font-size: .15rem;
    text-align: center;
  }
  ul{
    width: 95%;
    margin:0 auto;
    li{
      width: 92%;
      margin:0 auto;
      padding: .1rem .1rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0px 0px 10px 5px #ddd;
      margin-top:.1rem;
      p{
        text-align: left;
        font-size: $fontText;
      }
      p:first-child{
        line-height: .3rem;
        font-size: $fontTitle;
      }
      p:nth-child(2){
        color:#555;
        width: 100%;
        display: flex;
      }
      p:last-child{
        color:#aaa;
        text-align: right;
        line-height: .2rem;
      }
    }
    li:last-child{
      margin-bottom:0;
    }
  }
}

</style>
