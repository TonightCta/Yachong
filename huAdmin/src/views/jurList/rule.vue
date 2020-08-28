<!-- 规则管理 -->
<template>
  <div class="rule">
    <p class="ruleTitle">
      规则列表
      <el-button icon="el-icon-plus" type="primary" size="small">添加</el-button>
      <el-tooltip class="item" effect="dark" content="刷新数据" placement="bottom">
        <i class="el-icon-refresh"></i>
      </el-tooltip>
    </p>
  </div>
</template>
<script>
export default {
  name: "Rule",
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>
.rule{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  .ruleTitle{
    width: 100%;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    position: relative;
    i{
      color:#545c64;
      font-size: 40px;
      position: absolute;
      right:20px;
      top:50%;
      margin-top: -20px;
      cursor: pointer;
    }
    button{
      position: absolute;
      right:80px;
      top:50%;
      margin-top: -15px;
    }
  }
}
</style>
