<!-- 资料编辑 -->
<template lang="html">
  <div class="mineEdit">
    <div class="picBox">
      <img :src="userMes.avatar" alt="">
      <!-- <br> -->
      <span>
        <font>{{userMes.nickname}}&nbsp;<van-icon name="friends-o"/></font>
      </span>
    </div>
    <div class="mesBox">
      <ul>
        <li>
          <span>昵称:</span>
          <span class="backName" v-if="!editName">{{userMes.nickname}}</span>
          <input type="text" name="" value="" v-model="newName" v-else placeholder="请输入您的姓名">
          <van-icon name="edit" @click="editName=true" v-if="!editName"/>
          <van-icon name="success" @click="upName()" v-else />
        </li>
        <li>
          <span>真实姓名:</span>
          <span class="backName" v-if="!editCode">
            <font v-if="userMes.realname!=null&&userMes.realname!=''">{{userMes.realname}}</font>
            <font v-else>未填写</font>
          </span>
          <input type="text" name="" value="" v-model="newRealName" v-else placeholder="真实姓名">
          <van-icon name="edit" @click="editCode=true" v-if="!editCode"/>
          <van-icon name="success" @click="upCode()" v-else />
        </li>
        <li>
          <span>TEL:</span>
          <span class="backName" v-if="!editMobile">
            <font v-if="userMes.mobile!=null&&userMes.mobile!=''">{{userMes.mobile}}</font>
            <font v-else>未填写</font>
          </span>
          <input type="text" name="" value="" v-model="newMobile" v-else placeholder="请输入您的手机号">
          <van-icon name="edit" @click="editMobile=true" v-if="!editMobile"/>
          <van-icon name="success" @click="upMobile()" v-else />
        </li>
        <li>
          <span>地区:</span>
          <span class="backName" v-if="!editPlace">{{userMes.province}}-{{userMes.city}}</span>
          <input type="text" name="" value="" v-else placeholder="请选择您的所在地区">
          <span v-if="editPlace" @click="placePick=true" class="popMask"></span>
          <van-icon name="edit" @click="editPlace=true" v-if="!editPlace"/>
          <van-icon name="success" @click="editPlace=false" v-else />
        </li>
        <li>
          <span>生日:</span>
          <span class="backName" v-if="!editDate">
            <font v-if="userMes.birthday!=''&&userMes.birthday!=''">{{userMes.birthday}}</font>
            <font v-else>未填写</font>
          </span>
          <input type="text" name="" value="" v-model="newBron" v-else placeholder="请选择您的生日">
          <span v-if="editDate" @click="datePick=true" class="popMask"></span>
          <van-icon name="edit" @click="editDate=true" v-if="!editDate"/>
          <van-icon name="success" @click="editDate=false" v-else />
        </li>
      </ul>
    </div>
    <van-popup v-model="placePick" position="bottom" :style="{ height: '40%' }" >
      <van-picker show-toolbar :columns="areaList" @change="changeProv" @confirm="turnPlace" />
    </van-popup>
    <van-popup v-model="datePick" position="bottom" :style="{ height: '40%' }" >
      <van-datetime-picker
        v-model="bornDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="upBron"
        @cancel="datePick=false"
      />
    </van-popup>
    <Back/>
  </div>
</template>

<script>
import Back from '@/components/backCom/backBtn'
import {mapState} from 'vuex'
import {getUser} from '@/assets/js/user.js'
import {Place} from '@/assets/js/place.js'
// import Address from '@/assets/js/adress.json'
const cities = Place();
export default {
  computed:{
    ...mapState(['userMes'])
  },
  data(){
    return{
      editName:false,
      editCode:false,
      editMobile:false,
      editPlace:false,
      editDate:false,
      placePick:false,//地址选择
      datePick:false,//生日选择
      bornDate:new Date(),
      minDate: new Date(1970,1, 1),
      maxDate: new Date(2002,11,31),
      areaList:[{ values: Object.keys(cities) }, { values: cities['北京'] }],
      newName:null,//编辑新昵称
      newRealName:null,
      newMobile:null,
      newBron:null,
    }
  },
  components:{
    Back
  },
  methods:{
    upName(){//修改昵称
      if(this.newName==null||this.newName==''){
        this.$toast('请输入新的昵称')
      }else{
        this.$axios.put(this.Uapi+'/user/editinfo',{
          'nickname':this.newName
        },{
          headers:{
            'Authorization':this.baseToken,
            'SessionId':this.baseID,
            'v':'v2'
          }
        }).then((res)=>{
          if(res.data.state==1){
            getUser();
            this.editName=false;
            this.$toast('保存成功')
          }else{
            this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          this.$toast(this.errText)
        })
      }
    },
    upCode(){
      if(this.newRealName==null||this.newRealName==''){
        this.$toast('请输入真实姓名')
      }else{
        this.$axios.put(this.Uapi+'/user/editinfo',{
          'realname':this.newRealName
        },{
          headers:{
            'Authorization':this.baseToken,
            'SessionId':this.baseID,
            'v':'v2'
          }
        }).then((res)=>{
          if(res.data.state==1){
            getUser();
            this.$toast('保存成功')
            this.editCode=false;
          }else{
            this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          this.$toast(this.errText)
        })
      }
    },
    upBron(value){
      let upYear=value.getFullYear();
      let upMon=value.getMonth()+1;
      if(upMon<10){
        upMon='0'+upMon
      }
      let upDay=value.getDate();
      if(upDay<10){
        upDay='0'+upDay
      }
      let upTime=upYear+'-'+upMon+'-'+upDay;
      this.$axios.put(this.Uapi+'/user/editinfo',{
        'birthday':upTime
      },{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        if(res.data.state==1){
          getUser();
          this.datePick=false;
          this.editDate=false;
          this.$toast('保存成功')
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    },
    upMobile(){
      if(this.newMobile==null||this.newMobile==''){
        this.$toast('请输入新的手机号')
      }else if(!(/^[1][3,4,5,7,8][0-9]{9}$/).test(this.newMobile)){
        this.$toast('请输入正确的的手机号')
      }else{
        this.$axios.put(this.Uapi+'/user/editinfo',{
          'mobile':this.newMobile
        },{
          headers:{
            'Authorization':this.baseToken,
            'SessionId':this.baseID,
            'v':'v2'
          }
        }).then((res)=>{
          if(res.data.state==1){
            getUser();
            this.editMobile=false;
            this.$toast('保存成功')
          }else{
            this.$toast(res.data.msg)
          }
        }).catch((err)=>{
          this.$toast(this.errText)
        })
      }
    },
    changeProv(picker, values){//切换省份
      picker.setColumnValues(1, cities[values[0]]);
    },
    turnPlace(value){//提交地区修改
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      this.$axios.put(this.Uapi+'/user/editinfo',{
        'province':value[0],
        'city':value[1],
      },{
        headers:{
          'Authorization':this.baseToken,
          'SessionId':this.baseID,
          'v':'v2'
        }
      }).then((res)=>{
        this.$toast.clear()
        if(res.data.state==1){
          getUser();
          this.placePick=false;
          this.editPlace=false;
          this.$toast('保存成功')
        }else{
          this.$toast(res.data.msg)
        }
      }).catch((err)=>{
        this.$toast(this.errText)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mineEdit{
  width: 100%;
  .picBox{
    width: 100%;
    height: 1.5rem;
    background: $themeColor;
    position: relative;
    img{
      width: .6rem;
      height: .6rem;
      border-radius: 50%;
      border: 1px solid white;
      position: absolute;
      top:.2rem;
      left:50%;
      margin-left: -.3rem;
    }
    span{
      width: 50%;
      color:white;
      font-size: $fontTitle;
      font-weight: bold;
      font{
        display: inline-block;
        position: absolute;
        width: 2rem;
        text-align: center;
        bottom: .4rem;
        left:50%;
        margin-left: -1rem;
        padding-left: .2rem;
        box-sizing: border-box;
      }
    }
  }
  .mesBox{
    width: 100%;
    ul{
      width: 95%;
      margin:0 auto;
      li{
        line-height: .4rem;
        text-align: left;
        font-size: $fontTitle;
        width: 100%;
        border-bottom:1px solid #ccc;
        position: relative;
        span{
          width: 20%;
        }
        input{
          height: .3rem;
          line-height: .3rem;
          width: 57%;
          text-align: center;
          border:0;
          position: absolute;
          top:50%;
          margin-top: -15px;
          left: 25%;
          background: #f3f5f9;
          font-size: $fontTitle;
        }
        i{
          font-size: $iconSize;
          position: absolute;
          right:0;
          top:50%;
          margin-top: -10px;
        }
        .backName{
          width: 57%;
          text-align: center;
        }
        .popMask{
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top:0;
        }
      }
    }
  }
}
</style>
