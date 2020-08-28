<!-- 北上资金 -->
<template lang="html">
  <div class="northCon" v-loading="noLoad">
    <p class="timeChoose">
      <span @click="openPicker()">
        <input type="text" name="" value="" disabled="disable" v-model="yearS">
      </span>
      <font>年</font>
      <span @click="openPicker()">
        <input type="text" name="" value="" disabled="disable" v-model="monS">
      </span>
      <font>月</font>
      <span @click="openPicker()">
        <input type="text" name="" value="" disabled="disable" v-model="dayS">
      </span>
      <font>日</font>
    </p>
    <div class="chooseList">
      <ul class="listTitle">
        <li>标的</li>
        <li>入选价</li>
        <li>入选后涨幅</li>
        <li>状态</li>
      </ul>
      <ul class="listCon">
        <li @click="goNorth(indexNor)" v-for="(northMes,indexNor) in northList" :key="indexNor">
          <span>{{northMes.name}}</span>
          <span>{{northMes.low}}</span>
          <span class="defSty">{{northMes.pct_chg}}3%</span>
          <span class="defSty">入选</span>
        </li>
      </ul>
    </div>
    <!-- 时间选择器 -->
    <div class="">
      <van-popup v-model="timePick" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="turnDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="turnFind"
          @cancel="timePick=false"
        />
      </van-popup>
    </div>
    <Back/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
export default {
  data(){
    return{
      yearS:'2020',
      monS:'06',
      dayS:'16',
      timePick:false,//时间选择器
      turnDate:new Date(),//当前选中时间
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      northList:[],
      noLoad:false,
    }
  },
  created(){
    this.getNorthList();
    let nowDate=new Date();
    this.yearS=nowDate.getFullYear();
    this.monS=nowDate.getMonth()+1;
    if(this.monS<10){
      this.monS='0'+this.monS
    }
    this.dayS=nowDate.getDate();
    if(this.dayS<10){
      this.dayS='0'+this.dayS
    };
  },
  components:{
    Back
  },
  methods:{
    openPicker(){//时间选择器
      this.timePick=true;
    },
    goNorth(index){
      this.$router.push({
        path:'/northDetails',
        query:{
          codeID:this.northList[index].ts_code
        }
      })
    },
    getNorthList(){//获取资金列表
      this.$axios.get(this.Uapi+'/user/index/bxzj',{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.northList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    turnFind(){//搜索
      this.yearS=this.turnDate.getFullYear();
      this.monS=this.turnDate.getMonth()+1;
      if(this.monS<10){
        this.monS='0'+this.monS
      }
      this.dayS=this.turnDate.getDate();
      if(this.dayS<10){
        this.dayS='0'+this.dayS
      };
      let noDate=this.yearS+'-'+this.monS+'-'+this.dayS;
      this.noLoad=true;
      this.$axios.get(this.Uapi+'/user/index/bxzj?date='+noDate,{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.northList=res.data.data;
          this.noLoad=false;
          this.timePick=false;
        }else{
          this.$toast(res.data.msg)
          this.noLoad=false;
          this.timePick=false;
        }
      }).catch((err)=>{
        this.$toast(this.errText)
        this.timePick=false;
        this.noLoad=false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.northCon{
  width: 100%;
  .timeChoose{
    width: 100%;
    text-align: center;
    color:black;
    line-height: .5rem;
    font-size: $fontTitle;
    span{
      width: .5rem;
      input{
        height: .2rem;
        line-height: .2rem;
        width: 100%;
        border-bottom:1px solid #666!important;
        text-align: center;
        background: #f3f5f9;
      }
    }
  }
  .chooseList{
    width: 100%;
    background: white;
    .listTitle{
      width: 95%;
      margin:0 auto;
      display: flex;
      text-align: center;
      li{
        width: 25%;
        font-size: $fontTitle;
        padding: 5px 0;
        font-weight: 450;
        border-bottom: 1px solid #eee;
      }
    }
    .listCon{
      width: 95%;
      margin:0 auto;
      li{
        width: 100%;
        display: flex;
        border-bottom: 1px solid #eee;
        span{
          width: 25%;
          text-align: center;
          padding: 10px 0;
          font-size: $fontText;
        }
        .defSty{
          color:#F61010;
        }
      }
      li:last-child{
        border:0;
      }
    }
  }
}
</style>
