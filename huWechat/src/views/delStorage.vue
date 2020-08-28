<template lang="html">
  <div class="">
    <!-- <p>清除缓存</p> -->
  </div>
</template>

<script>
export default {
  created(){
    window.localStorage.clear('token')
    window.localStorage.clear('sessionID')
  },
  mounted(){
    window.location.replace('http://m.dahujing.com/')
  }
}
</script>

<style lang="scss" scoped>
p{
  width: 100%;
  font-size: .3rem;
  text-align: center;
  font-weight: bold;
}
</style>
