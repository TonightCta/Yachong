<!-- 首页 -->
<template lang="html">
  <div class="home">
    <Search/>
    <Table/>
    <Swiper/>
    <StarList>
      <p>精选策略</p>
    </StarList>
  </div>
</template>

<script>
import Search from '@/components/search/search'
import Table from '@/components/table/table'
import Swiper from '@/components/swiper/swiper'
import StarList from '@/components/starList/starList'
 import {getUser} from '@/assets/js/user.js'
// import {mapState} from 'vuex'
// import {delCode} from '@/assets/js/.js'

// 移动端调试工具
//import VConsole from 'vconsole'
//let vConsole=new VConsole();

export default {
  components:{
    Search,Table,Swiper,StarList
  },
  computed:{
    // ...mapState(['userMes'])
  },
  created(){
    // if(window.localStorage.getItem('token')){
    //   alert(1)
    // }
    // alert(JSON.stringify(this.userMes))
    getUser()
  }
}
</script>

<style lang="scss" scoped>

</style>
