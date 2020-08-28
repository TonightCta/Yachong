<template>
  <div id="app" ref="app">
    <transition :name="transitionName">
      <!-- <keep-alive> -->
        <router-view v-wechat-title="$route.meta.title"></router-view>
      <!-- </keep-alive> -->
      <!-- <router-view v-wechat-title="$route.meta.title" v-if="!$route.meta.keep"></router-view> -->
    </transition>
    <!-- <transition :name="transitionName">
      <router-view v-wechat-title="$route.meta.title" v-if="!$route.meta.keep"></router-view>
    </transition> -->
    <Footer :name="transitionName" v-show="!$route.meta.isAllSize"/>
  </div>
</template>

<script>
import Footer from '@/components/footer/footer'
export default {
  name: 'App',
  data(){
    return{
      transitionName:'',
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
    isAlls(val,oldVal){
      if(!val){
        this.$refs.app.style.paddingBottom='.8rem'
      }else{
        this.$refs.app.style.paddingBottom='0'
      }
    }
  },
  computed:{
    isAlls(){
      return this.$route.meta.isAllSize
    }
  },
  components:{
    Footer
  },
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* padding-bottom: 8rem; */
  overflow: hidden;
  /* touch-action:none; */
}
#nprogress .bar {
  background: #d8ecff !important;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  width: 100%;
  height: 100%;
  will-change: transform;
    transition: all 500ms;
    position: absolute;
  }.slide-right-enter {
   opacity: 0;
   /* transform: translate3d(-100%, 0, 0); */
 }.slide-right-leave-active {
   opacity: 0;
   /* transform: translate3d(100%, 0, 0); */
 }.slide-left-enter {
   opacity: 0;
   /* transform: translate3d(100%, 0, 0); */
 }.slide-left-leave-active {
   opacity: 0;
   /* transform: translate3d(-100%, 0, 0); */
 }
</style>
