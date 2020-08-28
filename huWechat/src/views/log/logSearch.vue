<!-- 历史回顾 -->
<template lang="html">
  <div class="signalCon">
    <div class="onlySearch">
      <p class="searchInp">
        <van-field
          v-model="searchLog"
          right-icon="search"
          placeholder="输入你想要搜索的内容"
          :clearable="true"
          input-align="center"
        />
      </p>
    </div>
    <div class="" style="transition:.3s all;" v-show="isSearch" ref="hotKey">
      <p class="hotSearch">
        <img src="../../assets//images/hotIcon.png" alt="">
        热门搜索
        <span @click="changeHot()">换一批</span>
      </p>
      <p class="hotList">
        <span v-for="(hotMes,indexHot) in hotList" @click="turnKey(indexHot)" :key="indexHot">{{hotMes.name}}</span>
      </p>
    </div>
    <div class="searchCon" v-show="!isSearch" ref="searchCon">
      <p v-if="isHasData" class="isHasData">暂无数据</p>
      <ul v-else>
        <li @click="goLogDe(indexLog)" v-for="(logMes,indexLog) in logList" :key="indexLog">
          <p>{{logMes.name}}</p>
          <p>{{logMes.code}}</p>
          <p>
            <van-icon name="arrow"/>
          </p>
        </li>
      </ul>
    </div>
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
      isSearch:true,
      hotPage:1,//热门搜索页码
      hotList:[],//热门词汇
      searchLog:null,//搜索值
      searPage:1,
      logList:[],
      isHasData:false,
    }
  },
  watch:{
    searchLog(val,oldVal){
      let reg = new RegExp("^[0-9\u4e00-\u9fa5]+$");
      if(val==''||val==null){
        this.isSearch=true
      }else if(!reg.test(val)){
        this.searchLog=''
      }else{
        this.isSearch=false;
        this.getSearchLog()
      }
    },
    logList(val,oldVal){
      if(val.length>0){
        this.isHasData=false;
      }else{
        this.isHasData=true;
      }
    },
  },
  created(){
    this.getHotWords()
  },
  methods:{
    goLogDe(index){
      this.$router.push({
        name:'LogDetails',
        query:{
          title:this.logList[index].name,
          log:this.logList[index].code
        }
      })
    },
    backOff(){
      thies.$router.back()
    },
    getHotWords(){//获取热词
      this.$axios.get('http://api2.xiaoyachong.com/search?type=1&page='+this.hotPage+'&limit=8',{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then((res)=>{
        if(res.data.code==200){
          for(let i in res.data.data){
            this.hotList.push({
              code:i,
              name:res.data.data[i]
            })
          }
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    changeHot(){//更新热词
      this.hotPage++;
      this.hotList=[];
      this.getHotWords();
    },
    getSearchLog(){//触发搜索
      this.$axios.get('http://api2.xiaoyachong.com/search?type=1&page='+this.searPage+'&keyword='+this.searchLog.replace(/%/g,'%25')+'&mp=1',{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.logList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    turnKey(index){
      this.$router.push({
        name:'LogDetails',
        query:{
          title:this.hotList[index].name,
          log:this.hotList[index].code
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.signalCon{
  width: 100%;
  .onlySearch{
    width: 100%;
    padding: .4rem 0;
    background: $themeColor;
    .searchInp{
      width: 90%;
      margin:0 auto;
    }
  }
  .hotSearch{
    width: 95%;
    margin:0 auto;
    font-size: $fontTitle;
    position: relative;
    box-sizing: border-box;
    padding-left: .2rem;
    line-height: .4rem;
    text-align: left;
    img{
      position: absolute;
      left:0;
      top:50%;
      margin-top: -10px;
      width: .14rem;
      height: .18rem;
    }
    span{
      padding: 0 10px;
      border:1px solid $moreColor;
      color:$moreColor;
      border-radius: 10px;
      line-height: .16rem;
      font-size: $fontText;
      position: absolute;
      right:0;
      top:50%;
      margin-top: -10px;
    }
  }
  .hotList{
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    span{
      padding:2px 10px;
      background: #ddd;
      margin-left: 10px;
      margin-bottom: 10px;
      border-radius: 10px;
      color:$moreColor;
      font-size: $fontText;
    }
  }
  .searchCon{
    width: 100%;
    margin-top: .1rem;
    transition: .5s all;
    .isHasData{
      width: 100%;
      text-align: center;
      color:$moreColor;
      line-height: .4rem;
      font-size: $fontText;
    }
    li{
      box-sizing: border-box;
      padding: .1rem;
      display: flex;
      background: white;
      font-size: $fontTitle;
      line-height: auto;
      position: relative;
      border-bottom:1px solid #ccc;
      p:first-child{
        min-width: 1rem;
      }
      p:nth-child(2){
        margin-left: .2rem;
        box-sizing: border-box;
        padding-top: .01rem;
      }
      p:last-child{
        position: absolute;
        right:.1rem;
        top:50%;
        margin-top: -10px;
        i{
          font-size: $iconSize;
          color:$moreColor;
        }
      }
    }
    li:last-child{
      border:0;
    }
  }
}
</style>
