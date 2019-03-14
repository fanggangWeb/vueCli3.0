<template>
  <div class="container">
    <div class="menu-bar">
      <!-- <router-link to="/home/risk/" class="menu" exact>信息摘要</router-link> -->
      <router-link class="menu" :to="item.path" :exact="item.exact"  :class="{'router-link-active':index == chooseIndex}" v-for="(item,index) in menuList" :key="index" @click.native="changeMenu(item,index)">
        {{item.name}}
      </router-link>
    </div>
    <router-view class="third-router"></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
      chooseIndex: -1,
      menuList: [{
        name: "信息摘要",
        path: "/home/risk/",
        exact: true
      }, {
        name: "风险辨识",
        path: "/home/risk/riskidentify"
      }, {
        name: "风险评估",
        path: "/home/risk/riskassessment"
      }, {
        name: "归档",
        path: "/home/risk/file"
      }, {
        name: "桥体总体风险",
        path: "/home/risk/riskoverall"
      }, {
        name: "风险情况统计",
        path: "/home/risk/riskstatistics"
      }]
    }
  },
  methods: {
    changeMenu (item,index) {
      this.chooseIndex = index
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/common.less";
.container {
  width: 100%;
  height: 100%;
  .menu-bar {
    width: 100%;
    // height: 76px;
    box-sizing: border-box;
    padding: 14px 0 14px 66px;
    background: white;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .menu {
    height: 40px;
    line-height: 40px;
    padding: 0 13px;
    color: @mainBlue;
    font-size: 16px;
    margin-right: 34px;
    border-radius: 4px;
  }
  .menu.router-link-active {
    background: @mainBlue;
    color: white;
  }
  .third-router {
    width: 100%;
    max-height: calc(100% - 76px);
    overflow: auto; 
  }
}
</style>
