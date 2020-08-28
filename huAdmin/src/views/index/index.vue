<!-- 首页 -->
<template lang="html">
  <div class="homePage">
    <div class="">

    </div>
    <el-container>
      <div class="nav" ref="nav">
        <img src="../../assets/favicon.png" alt="" ref="logo">
        <p v-if="isCollapse" @click="openMeu()">
          <i class="el-icon-right"></i>
        </p>
        <p v-else @click="closeMeu()">
          <i class="el-icon-back"></i>
        </p>
        <el-aside>
          <el-menu :default-active="getMeuIndex"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#0588ff"
          :unique-opened='true'
          >
            <el-submenu :index="meuMes.titleOne" v-for="(meuMes,indexMeu) in routeList" :key="indexMeu">
              <template slot="title">
                <i :class="meuMes.icon"></i>
                <span slot="title">{{meuMes.titleOne}}</span>
              </template>
              <el-menu-item-group>
                <!-- <span slot="title">{{meuMes.titleTwo}}</span> -->
                <el-menu-item :index="rouMes.index" v-for="(rouMes,indexRou) in meuMes.child" :key="indexRou">
                  <router-link :to="rouMes.url" tag="span" style="display:inline-block;width:100%;height:100%;" @click.native="upRoute(indexMeu,indexRou)">{{rouMes.title}}</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </div>
      <el-container>
        <el-header>
          <div class="header">
            <p>
              当前账户:&nbsp;&nbsp;<span>{{userName}}</span>
              <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
                <i class="el-icon-switch-button" @click="loginOut()"></i>
              </el-tooltip>
            </p>
            <Tabs ref="tabs" @openMeu='getMeu'/>
          </div>
        </el-header>
        <el-main>
          <div class="content">
            <transition :name="transitionName">
              <router-view></router-view>
            </transition>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Tabs from '@/components/tab/tabs'
export default {
  components: {
    Tabs
  },
  data(){
    return{
      isCollapse:false,
      titleOne:null,
      titleTwo:null,
      userName:null,//账号名称
      getMeuIndex:'0-0',
      transitionName:'',
      routeList:[],
      routeCholdren:[],
    }
  },
  watch:{
    $route(to,from){
      if(to.meta.index>from.meta.index){
        this.transitionName='slide-left'
      }else{
        this.transitionName='slide-right'
      }
    },
  },
  created(){
    this.getUserMes();
    // 欢迎信息
    this.welCome()
    //权限注入
    this.inGroup()
  },
  mounted(){
  },
  methods:{
    closeMeu(){//闭合菜单
      this.$refs.nav.style.width='64px'
      this.$refs.logo.style.width='30px'
      this.$refs.logo.style.height='30px'
      this.isCollapse=true
    },
    openMeu(){//打开菜单
      this.$refs.nav.style.width='200px'
      this.$refs.logo.style.width='70px'
      this.$refs.logo.style.height='70px'
      this.isCollapse=false
    },
    upRoute(index,indexTwo){
      // console.log(this.routeList[index])
      this.titleOne=this.routeList[index].titleOne;
      this.titleTwo=this.routeList[index].child[indexTwo].title;
      this.$refs.tabs.getUrl(this.routeList[index].titleOne,this.routeList[index].child[indexTwo])
    },
    getUserMes(){
      this.$http.getListAPI('self').then(res=>{
        if(res.data.state==1){
          window.sessionStorage.setItem('userMes',JSON.stringify(res.data.data));
          this.userName=res.data.data.account;
        }
      })
    },
    loginOut(){//退出登录
      const loading = this.$loading({
        lock: true,
        text: '注销中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(()=>{
        loading.close()
        this.$router.push('/')
      },1000)
    },
    getMeu(indexOpen){//重置菜单
      this.getMeuIndex=indexOpen;
    },
    welCome(){
      let date=new Date();
      let year=date.getFullYear();
      let mon=date.getMonth()+1;
      if(mon<10){
        mon='0'+mon
      }
      let day=date.getDate();
      if(day<10){
        day='0'+day
      };
      let hour=date.getHours();
      let dayUP='';
      if(hour>12){
        hour='下午'+hour;
        dayUP='下午'
      }else{
        hour='上午'+hour;
        dayUP='上午'
      }
      let min=date.getMinutes();
      let alMess='欢迎登录大虎鲸AI智能管理系统，现在是北京时间 '+year+' 年 '+mon+' 月 '+day+' 日 '+hour+' 时 '+min+' 分。';
      if(this.$route.query.isLogin==1){
        this.$notify({
          title: dayUP+'好！',
          message: alMess,
          type: 'success',
          duration:6500
        });
      };
    },
    inGroup(){
      this.routeList=JSON.parse(window.sessionStorage.getItem('groupList'));
      this.routeCholdren=JSON.parse(window.sessionStorage.getItem('groupChildren'));
      this.routeList.forEach((e,et)=>{
        this.routeCholdren.forEach((i,it)=>{
          if(i.parent==e.id){
            e.child.push({
              url:i.url,
              title:i.title,
              index:et+1+'-'+(it+1)
            })
          }
        })
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 89.5vh;
  border:0!important;
}
.header{
  height: 100%;
  border-bottom: 1px solid #eee;
  position: relative;
  height: 120px;
  overflow-y: hidden;
  p:first-child{
    position: absolute;
    top:15px;
    right:40px;
    line-height: 30px;
    padding-right: 50px;
    font-size: 14px;
    color:#545c64;
    span{
      color:#0588ff;
    }
    i{
      font-size: 26px;
      color:red;
      cursor:pointer;
      position: absolute;
      right:0;
      top:50%;
      margin-top: -15px;
    }
  }
}
.nav{
  width: 200px;
  background: #545c64;
  position: relative;
  transition: .6s all;
  height: 100vh;
  img{
    display: block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin:0 auto;
    transition: .6s all;
    margin-top:15px;
    margin-bottom:15px;
  }
  p{
    position: absolute;
    width: 100%;
    height: 40px;
    background: #434648;
    z-index: 100;
    bottom: 0;
    line-height: 50px;
    text-align: center;
    i{
      font-size: 30px;
      color:white;
    }
  }
}
.content{
  width: 100%;
  height:87vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 60px;
  position: relative;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
    transition: all 300ms;
    position: absolute;
  }.slide-right-enter {
   opacity: 0;
   transform: translate3d(-50%, 0, 0);
 }.slide-right-leave-active {
   opacity: 0;
   transform: translate3d(100%, 0, 0);
 }.slide-left-enter {
   opacity: 0;
   transform: translate3d(100%, 0, 0);
 }.slide-left-leave-active {
   opacity: 0;
   transform: translate3d(-50%, 0, 0);
 }
</style>
