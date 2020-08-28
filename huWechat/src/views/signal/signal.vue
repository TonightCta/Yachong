<!-- 多空信号 -->
<template lang="html">
  <div class="signalCon">
    <div class="onlySearch">
      <p class="searchInp">
        <van-field
          v-model="searchGu"
          right-icon="search"
          placeholder="输入你想要搜索的内容"
          :clearable="true"
          input-align="center"
        />
      </p>
    </div>
    <div class="" style="transition:.3s all;" v-if="isSearch" ref="hotKey">
      <p class="hotSearch">
        <img src="../../assets/images/hotIcon.png" alt="">
        热门搜索
        <span @click="changeHot()">换一批</span>
      </p>
      <p class="hotList">
        <span v-for="(houtKey,indexHot) in hotList" @click="seHotKey(indexHot)">{{houtKey.name}}</span>
      </p>
    </div>
    <div class="searchCon" v-else ref="searchCon">
      <p v-if="hasData" class="hasData">暂无更多数据</p>
      <van-pull-refresh v-model="loadSearCon" @refresh="onRefresh"  v-else>
        <ul>
          <li @click="goSignal(indexSin)" v-for="(sinMes,indexSin) in sinList">
            <p>{{sinMes.name}}</p>
            <p>{{sinMes.code}}</p>
            <p>
              <van-icon name="arrow"/>
            </p>
          </li>
        </ul>
      </van-pull-refresh>
    </div>
    <Back/>
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
      isSearch:true,//是否启用搜索
      hotPage:1,//热门搜索页码
      hotList:[],//热门搜索列表
      searchGu:null,//搜索关键词
      searchPage:1,//搜索页码
      sinList:[],
      hasData:true,
      loadSearCon:false,
    }
  },
  created(){
    this.getHotKey()
  },
  watch:{
    searchGu(val,oldVal){
      let reg = new RegExp("^[0-9\u4e00-\u9fa5]+$");
      if(val==null||val==''){
        this.isSearch=true;
        this.sinList=[];
      }else if(!reg.test(val)){
        this.searchGu=''
      }else{
        this.isSearch=false;
        this.searchMes()
      }
    },
    sinList(val,oldVal){
      if(val.length>0){
        this.hasData=false;
      }else{
        this.hasData=true;
      }
    }
  },
  methods:{
    searchMes(){//触发搜索
      this.$axios.get('http://api2.xiaoyachong.com/search?type=1&page='+this.searchPage+'&keyword='+this.searchGu.replace(/%/g,'%25')+'&mp=1',{
        headers:{
          'V':'v3',
          'Authorization':this.yetToken
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.sinList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText);
      })
    },
    goSignal(index){
      this.$router.push({
        name:'SignalDetails',
        query:{
          title:this.sinList[index].name,
          code:this.sinList[index].code
        }
      })
    },
    getHotKey(){//获取热门搜索
      this.$axios.get('http://api2.xiaoyachong.com/search?type=1&page='+this.hotPage+'&limit=9',{
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
    changeHot(){//换一批
      this.hotPage++;
      this.hotList=[];
      this.getHotKey()
    },
    seHotKey(index){//搜索热门关键词
      this.$router.push({
        name:'SignalDetails',
        query:{
          title:this.hotList[index].name,
          code:this.hotList[index].code
        }
      })
    },
    onRefresh(){
      this.getHotKey();
      setTimeout(()=>{
        this.$toast('刷新成功');
        this.loadSearCon=false;
      },1000)
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
    .hasData{
      width: 100%;
      line-height: .4rem;
      color:$moreColor;
      text-align: center;
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
