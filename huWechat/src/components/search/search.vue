<!-- 搜索框 -->
<template lang="html">
  <div class="searchWapper">
    <p class="searchInp">
      <van-field
        v-model="homeSearch"
        right-icon="search"
        placeholder="输入你想要搜索的内容"
        :clearable="true"
        input-align="center"
      />
    </p>
    <div class="homeSe" v-if="isHasData">
      <p class="triMask"></p>
      <p class="noData" v-if="!isHasData">暂无数据</p>
      <ul v-else>
        <li v-for="(hoSerMes,indexHoSe) in hoSeList" :key="indexHoSe" @click="goHoDe(indexHoSe)">
          <p>{{hoSerMes.name}}</p>
          <p>{{hoSerMes.code}}</p>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
    <p class="searchText">
      快速搜索
      <span @click="goDetails(4)">量化交易复合策略</span>
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      homeSearch:null,//搜索值
      hoSeList:[],//搜索内容
      isHasData:false,
    }
  },
  watch:{
    homeSearch(val,oldVal){
      let reg = new RegExp("^[0-9\u4e00-\u9fa5]+$");
      if(val==''||val==null){
        this.hoSeList=[];
      }else if(!reg.test(val)){
        this.homeSearch=''
      }else{
        this.searchJS()
      }
    },
    hoSeList(val,oldVal){
      if(val.length>0){
        this.isHasData=true;
      }else{
        this.isHasData=false;
      }
    }
  },
  methods:{
    searchJS(){//触发搜索
      this.$axios.get('http://api2.xiaoyachong.com/search?type=1&page=1&keyword='+this.homeSearch+'&mp=1',{
        headers:{
          'Authorization':this.yetToken,
          'v':'v3'
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.hoSeList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(res.data.errText)
      })
    },
    goHoDe(index){
      this.$router.push({
        path:'/radarDetails',
        query:{
          title:this.hoSeList[index].name,
          codeRadar:this.hoSeList[index].code
        }
      })
    },
    goDetails(code){
      this.$router.push({
        path:'/starCon',
        query:{
          id:code
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.searchWapper{
  width: 100%;
  height: 1.1rem;
  background: #0588ff;
  box-sizing: border-box;
  padding-top: .2rem;
  position: relative;;
  .searchInp{
    width: 90%;
    margin:0 auto;
  }
  .homeSe{
    width: 90%;
    background: white;
    position: absolute;
    top:.6rem;
    left:50%;
    margin-left: -45%;
    border-radius:15px;
    box-sizing: border-box;
    padding: .1rem;
    z-index: 10;
    box-shadow: 0px 0px 10px #666;
    .triMask{
      width: 0;
      height: 0;
      border-width: 0 10px 10px;
      border-style: solid;
      border-color: transparent transparent white;
      position: absolute;
      left:50%;
      margin-left: -15px;
      top:-.1rem;
    }
    .noData{
      width: 100%;
      text-align: center;
      line-height: .4rem;
      font-size: $fontText;
      color:$moreColor;
    }
    ul{
      height: 3rem;
      width: 100%;
      overflow-y: auto;
      li{
        display: flex;
        position: relative;
        line-height: .4rem;
        border-bottom: 1px solid #eee;
        p{
          width: 50%;
          text-align: left;
          font-size: $fontText;
        }
        i{
          position: absolute;
          right:.1rem;
          top:50%;
          font-size: .15rem;
          margin-top: -.08rem;
        }
      }
    }
  }
  .searchText{
    width: 90%;
    margin:0 auto;
    line-height: .5rem;
    color:white;
    font-size: .14rem;
    text-align: left;
    position: relative;
    span{
      height: .2rem;
      line-height: .2rem;
      padding: 0 5px;
      font-size: .12rem;
      border-radius: 10px;
      border:1px solid white;
      cursor:pointer;
      margin-left: .1rem;
      position: absolute;
      top:50%;
      margin-top: -12px;
    }
    span:first-child{
      left:.6rem;
    }
    span{
      left:0.16rem;
    }
  }
}
</style>
