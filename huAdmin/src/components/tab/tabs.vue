<!-- tabs标签 -->
<template>
  <div id="" class="tabs">
    <p class="tabsTitle">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="titleOne!=null">{{titleOne}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="titleTwo!=null">{{titleTwo}}</el-breadcrumb-item>
      </el-breadcrumb>
    </p>
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-click="setView" @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "Tabs",
  data: () => ({
    editableTabsValue: '/home',
    editableTabs: [
      {
        title: '首页',
        name: '/home',
        prent:'',
      }
    ],
    tabIndex: 2,
    titleOne:null,
    titleTwo:null,
    pathMes:{},
    lastChoice:null,
  }),
  methods:{
    removeTab(targetName) {//删除tabs
      if(targetName!=='/home'){
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                this.$router.push(activeName)
              }
            }
          });
        };
        this.editableTabsValue=activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        let tabsArr=[];
        this.editableTabs.forEach((e)=>{
          tabsArr.push(e.name);
        });
        if(tabsArr.indexOf(this.editableTabsValue)!=-1){
          this.$emit('openMeu',this.editableTabs[tabsArr.indexOf(this.editableTabsValue)].index)
        }
      }
    },
    setView(targetName){//选中tabs
      if(targetName.name!==this.$router.history.current.fullPath){
        this.$router.push(targetName.name);
        this.titleOne=this.editableTabs[targetName.index].prent;
        this.titleTwo=this.editableTabs[targetName.index].title;
        this.$emit('openMeu',this.editableTabs[targetName.index].index)
        this.lastChoice=this.editableTabs[targetName.index].name;
      }
    },
    getUrl(backData,data){//接收路由信息
      this.titleOne=backData;
      this.titleTwo=data.title;
      this.pathMes={
        title:data.title,
        name:data.url,
        prent:backData,
        index:data.index
      };
      let tabsArr=[];
      this.editableTabs.forEach((e)=>{
        tabsArr.push(e.name)
      });
      this.editableTabsValue=data.url;
      if(tabsArr.indexOf(data.url)==-1){
        this.editableTabs.push(this.pathMes)
      };
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs{
  position: absolute;
  bottom:0;
  height: 35px;
  .tabsTitle{
    position: absolute;
    top:-80px;
    width: 500px;
    box-sizing: border-box;
    padding-left: 10px;
  }
}
</style>
