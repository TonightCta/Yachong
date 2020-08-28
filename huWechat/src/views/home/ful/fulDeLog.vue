<!-- 涨停策略历史 -->
<template lang="html">
  <div class="northCon">
    <p class="timeChoose" v-if="false">
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
      <p>2020-05-09</p>
      <ul class="listTitle">
        <li>标的</li>
        <li>入选价</li>
        <li>入选后涨幅</li>
        <li>最新价</li>
      </ul>
      <ul class="listCon">
        <li v-for="(fulLog,indexLog) in fulLogListMes" :key="indexLog">
          <span>{{fulLog[0][1]}}</span>
          <span>{{fulLog[0][2]}}</span>
          <span class="defSty">{{fulLog[0][4]}}</span>
          <span class="defSty">{{fulLog[0][3]}}</span>
        </li>
      </ul>
      <!-- <p v-for="(fulMore,indexDeMes) in fulLogList" class="fulMore">
        {{fulMore.date.substring(0,4)}}-{{fulMore.date.substring(4,6)}}-{{fulMore.date.substring(6,8)}}
        <span v-for="(fuldeCh,indexCh) in fulMore.con" class="fulMoreCH">
          <span>{{fuldeCh[1]}}</span>
          <span>{{fuldeCh[0]}}</span>
          <span>{{fuldeCh[2]}}</span>
          <span>{{fuldeCh[3]}}</span>
          <span>{{fuldeCh[4]}}</span>
        </span>
      </p> -->
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
        />
      </van-popup>
    </div>
    <Back/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import {mapState} from 'vuex'
export default {
  data(){
    return{
      yearS:'2020',
      monS:'06',
      dayS:'16',
      timePick:false,//时间选择器
      turnDate:new Date(),//当前选中时间
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      fulLogList:[],
      fulLogListMes:[],
    }
  },
  created(){
    this.getFuleDe();
  },
  computed:{
    ...mapState(['fulMes'])
  },
  methods:{
    getFuleDe(){
      this.$axios.get(this.Uapi+'/user/index/ztyclishi?id='+this.fulMes.id,{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          for(let i in res.data.data.stock){
            this.fulLogListMes.push(res.data.data.stock[i]);
          };
        }else{
          this.$toast(this.errText)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    openPicker(){
      this.timePick=true;
    },
  },
  components:{
    Back
  },
}
</script>

<style lang="scss" scoped>
.northCon{
  width: 100%;
  padding-bottom: .3rem;
  height: 100vh;
  background: white;
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
        width: 100%;
        line-height: .2rem;
        border:1px solid black;
        text-align: center;
      }
    }
  }
  .chooseList{
    width: 100%;
    // background: white;
    p{
      line-height: .5rem;
      text-align: center;
      font-size: $fontTitle;
      font-weight: bold;
    }
    .listTitle{
      width: 95%;
      margin:0 auto;
      display: flex;
      text-align: center;
      li{
        width: 25%;
        font-size: $fontTitle;
        padding: 5px 0;
        font-weight: bold;
        border-bottom: 1px solid #ccc;
      }
    }
    .listCon{
      width: 95%;
      margin:0 auto;
      li{
        width: 100%;
        display: flex;
        border-bottom: 1px solid #ccc;
        span{
          width: 25%;
          text-align: center;
          padding: 5px 0;
          font-size: $fontText;
        }
        .defSty{
          color:#F61010;
        }
      }
    }
    .fulMore{
      width: 95%;
      margin:0 auto;
      font-size: $fontTitle;
      padding-top: .1rem;
      font-weight: bold;
      text-align: center;
      span{
        font-size: $fontText;
        display: block;
        font-weight: normal;
      }
      .fulMoreCH{
        width: 100%;
        background: white;
        display: flex;
        box-sizing: border-box;
        padding: .1rem;
        border-radius: 10px;
        box-shadow: 0px 0px 5px #333;
        margin-top: .1rem;
        justify-content: space-between;
      }
    }
  }
}
</style>
