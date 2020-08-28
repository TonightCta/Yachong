<!-- 条件选股 -->
<template lang="html">
  <div class="choosePer">
    <div class="">
      <van-collapse v-model="opCond" accordion>
        <van-collapse-item :title="indexKey" :name="indexKey" v-for="(ketMes,indexKey) in keyList" :key="indexKey">
          <template #title>
            <div>{{ketMes.sTypeShowWord}} <van-icon name="fire" color="#ff1f1f" v-if="ketMes.sTypeShowWord==='最近热门'" /></div>
          </template>
          <p class="keyWords">
            <span v-for="(ketChildMes,indexKeyC) in ketMes.vtConditionSearch" @click="opensFieChild(indexKey,indexKeyC)">
              <!-- <span v-for="(childKetMes,indexChildKet) in ketChildMes.vtRange" ref="choiceKey" class="choiceKey" @click="choiceKey(indexKey,indexKeyC,indexChildKet)">{{childKetMes}}</span> -->
              {{ketChildMes.sFieldShowWord}}
            </span>
          </p>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="searchKey" >
      <p class="nokey">
        <!-- <span v-if="false">选择你想要的关键词</span> -->

      </p>
      <div class="keyWordsList">
        <span v-for="(turnKey,indxTK) in choiceList">{{turnKey}}
          <van-icon name="clear" @click="deleKey(indxTK)"/>
        </span>
      </div>
      <p>
        <van-button color="#0588ff" @click="goPerDe()">立即查找</van-button>
      </p>
    </div>
    <div>
      <van-popup v-model="showPicker" round position="bottom">
        <p class="choiceTexg">
          <van-icon name="clear" color="#F60F0F" @click="cancelTexg()"/>
          <van-icon name="checked" color="#04CC45" @click="turnTexg()"/>
        </p>
        <van-picker
          ref="texg"
          :columns="columns"
        />
      </van-popup>
    </div>
    <Back padding="10 10 60 10" />
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import {mapState,mapMutations} from 'vuex'
export default {
  components:{
    Back
  },
  data(){
    return{
      opCond:'0',//默认展开手风琴
      keyList:[],//所有热词列表
      choiceList:[],//选中热词
      showPicker: false,//open选择子级
      columns: [],//热词子级列表
      texgParent:null,//选中热词上级
      texgParentID:null,//选中上级ID
      choiceListUp:[],//上传选中热词
    }
  },
  created(){
    this.getKey();
  },
  computed:{
    ...mapState(['userMes'])
  },
  methods:{
    ...mapMutations(['perText_fn']),
    getKey(){//获取热词
      this.$axios.get(this.Uapi+'/user/index/tiaojian',{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          this.keyList=res.data.data;
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    opensFieChild(indexOne,indexTwo){
      this.texgParent=this.keyList[indexOne].vtConditionSearch[indexTwo].sFieldShowWord;
      this.texgParentID=this.keyList[indexOne].vtConditionSearch[indexTwo].eField;
      this.columns=this.keyList[indexOne].vtConditionSearch[indexTwo].vtRange;
      this.showPicker=true;
    },
    cancelTexg(){//取消选择
      this.showPicker=false;
    },
    turnTexg(){//确认选中
      let baseTexg=this.$refs.texg.getValues()[0];
      this.choiceList.push(this.texgParent+'-'+baseTexg);
      this.choiceListUp.push(this.texgParentID+'_'+baseTexg)
      this.showPicker=false;
    },
    deleKey(index){//删除选中热词
      this.choiceList.splice(this.choiceList.indexOf(this.choiceList[index]),1)
      this.choiceListUp.splice(this.choiceListUp.indexOf(this.choiceListUp[index]),1);
    },
    goPerDe(){//触发搜索
      if(this.choiceListUp.length<1){
        this.$toast('请选择至少一个筛选项');
      }else if(!this.userMes.youxuan){
        this.perText_fn({
          code:this.choiceListUp.join('|'),
          title:this.choiceList[0]
        })
        this.$router.push('/perDetails')
      }else if(this.userMes.youxuan==0){
        this.perText_fn({
          code:this.choiceListUp.join('|'),
          title:this.choiceList[0]
        })
        this.$router.push('/perDetails')
      }else if(this.userMes.youxuan==1){
        this.perText_fn({
          code:this.choiceListUp.join('|'),
          title:this.choiceList[0]
        })
        this.$router.push('/perDetailsVip')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.choosePer{
  width: 100%;
  .searchKey{
    width: 100%;
    height: .5rem;
    position: fixed;
    bottom:0;
    left:0;
    background: white;
    display: flex;
    .nokey{
      width: 75%;
      height: 100%;
      line-height: .5rem;
      overflow:auto;
    }
    p:last-child{
      width: 25%;
      position: relative;
      button{
        width: 100%;
        height: 100%;
        background: $themeColor;
        color:white;
        position: absolute;
        top:0;
        font-size: $fontText;
      }
    }
    .keyWordsList{
      position: absolute;
      left:0;
      width: 48%;
      top:50%;
      margin-top: -10px;
      height: .22rem;
      display: flex;
      overflow-x: scroll;
      padding-right: 1rem;
      font-size: $fontText;
      span{
        margin-left: .2rem;
        height: .2rem;
        padding: 0 20px 0 8px;
        flex-shrink: 0;
        border:1px solid $themeColor;
        // box-sizing: border-box;
        color:$themeColor;
        border-radius: 10px;
        position: relative;
        i{
          // margin-top: 5px;
          position: absolute;
          right:4px;
          top:50%;
          margin-top: -6px;
        }
      }
      span:last-child{
        margin-right: 2rem;
      }
    }
  }
  .keyWords{
    color:black;
    font-size: $fontText;
    display: flex;
    flex-wrap: wrap;
    span{
      padding: 1px 10px;
      margin-right: .1rem;
      margin-bottom: .1rem;
      border-radius: 10px;
      border:1px solid $themeColor;
      color:$themeColor;
    }
  }
  .choiceTexg{
    width: 90%;
    margin:0 auto;
    padding-top: .1rem;
    display: flex;
    justify-content: space-between;
    i{
      font-size: .24rem;
    }
  }
}
</style>
