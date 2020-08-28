<!-- 蚜虫扫雷 -->
<template lang="html">
  <div class="radar">
    <div class="searchBox">
      <p class="searchInp">
        <van-field
          v-model="radarSeText"
          right-icon="search"
          placeholder="输入股票名称/代码/首字母"
          :clearable="true"
          input-align="center"
        />
      </p>
    </div>
    <div class="" v-if="radarSeBox">
      <p class="raderTitle">
        <span>沪深市场共有{{ranNum}}支雷股</span>
        <span>更新时间:&nbsp;{{upDate}}</span>
      </p>
      <p class="listTitle">
        <span>股票名称</span>
        <span>风险等级</span>
        <span>财务安全等级</span>
      </p>
      <ul class="listMes">
        <li v-for="(starMes,indexStar) in starList" :key="indexStar" @click="goDeRadar(indexStar)">
          <span>{{starMes.name}}<br><font>{{starMes.code}}</font></span>
          <span>高风险<br><van-rate v-model="starNum" color="#f60f0f" size="15" readonly/></span>
          <span>{{starMes.rist_level}}级</span>
        </li>
      </ul>
    </div>
    <div class="radarSearch" v-else>
      <p v-if="hasData" class="hasData">暂无更多数据</p>
      <ul v-else>
        <li @click="goSignal(indexSin)" v-for="(sinMes,indexSin) in seaList">
          <p>{{sinMes.name}}</p>
          <p>{{sinMes.code}}</p>
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
  data(){
    return{
      radarSeText:null,
      starNum:5,
      page:1,
      starList:[],
      upDate:null,//更新时间
      radarSeBox:true,//执行搜索
      seaList:[],//搜索列表
      searchPage:1,//搜索页码
      hasData:false,
      ranNum:null,
    }
  },
  watch:{
    radarSeText(val,oldVal){
      let reg = new RegExp("^[0-9\u4e00-\u9fa5]+$");
      if(val==null||val==''){
        this.radarSeBox=true;
        this.seaList=[];
      }else if(!reg.test(val)){
        this.radarSeText=''
      }else{
        this.radarSeBox=false;
        this.searchRadar()
      }
    },
    seaList(val,oldVal){
      if(val.length>0){
        this.hasData=false;
      }else{
        this.hasData=true;
      }
    }
  },
  components:{
    Back
  },
  created(){
    this.getRadarList();
  },
  methods:{
    goDeRadar(index){
      this.$router.push({
        path:'/radarDetails',
        query:{
          title:this.starList[index].name,
          codeRadar:this.starList[index].code
        }
      })
    },
    getRadarList(){//获取扫雷列表
      this.$axios.get(this.Uapi+'/user/index/saolei?page='+this.page+'&limit=10',{
        headers:{
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.ranNum=res.data.data.total;
          this.starList=res.data.data.lists;
          this.upDate=res.data.data.update_time;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast('服务器错误,请检查网络或稍后再试')
      })
    },
    searchRadar(){//搜索雷达
      this.$axios.get('http://api2.xiaoyachong.com/search?type=1&page='+this.searchPage+'&keyword='+this.radarSeText,{
        headers:{
          'V':'v3',
          'Authorization':this.yetToken
        }
      }).then((res)=>{
        if(res.data.code==200){
          this.seaList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText);
      })
    },
    goSignal(index){//搜索内页
      this.$router.push({
        path:'/radarDetails',
        query:{
          title:this.seaList[index].name,
          codeRadar:this.seaList[index].code
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.radar{
  width: 100%;
  .searchBox{
    background: $themeColor;
    padding: .5rem .2rem;
    .searchInp{
      width: 100%;
    }
  }
  .raderTitle{
    line-height: .4rem;
    width: 95%;
    margin:0 auto;
    display: flex;
    font-size: $fontText;
    span{
      width: 50%;
      color:#666;
      text-align: left;
    }
    span:last-child{
      text-align: right;
    }
  }
  .listTitle{
    width: 100%;
    padding: 0 .1rem;
    line-height: .4rem;
    background: white;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    span{
      width: 30%;
      font-size: $fontTitle;
      font-weight: bold;
      text-align: left;
    }
    span:last-child{
      text-align: right;
    }
  }
  .listMes{
    width: 100%;
    background: white;
    li{
      width: 100%;
      padding: .05rem .1rem;
      background: white;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      font-size:$fontText;
      span{
        width: 30%;
        text-align: left;
      }
      span:last-child{
        text-align: center;
        font-weight: bold;
        line-height: .3rem;
      }
    }
  }
  .radarSearch{
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
