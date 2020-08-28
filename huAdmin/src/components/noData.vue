<!-- 暂无更多 -->
<template lang="html">
  <div class="noData">
    <p v-if="isData">暂无更多数据</p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isData:false,
    }
  },
  methods:{
    isHasData(data){
      if(data.length<1){
        this.isData=true;
      }else{
        this.isData=false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.noData{
  width: 100%;
  p{
    line-height: 50px;
    color:#aaa;
    text-align: center;
    width: 100%;
  }
}
</style>
