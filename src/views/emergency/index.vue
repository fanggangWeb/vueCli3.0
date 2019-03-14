<template>
  <div class="container">
    <div class="menu-bar">
      <!-- <router-link class="menu" to="/home/emergency/" exact>应急首页</router-link> -->
      <router-link class="menu" :class="{'router-link-active':index == chooseIndex}" :to="item.path" v-for="(item,index) in menuList" :exact="item.exact" :key="index" @click.native="changeMenu(item,index)">
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
        name: "应急首页",
        path: "/home/emergency/",
        exact: true
      },{
        name: "事件发布",
        path: "/home/emergency/eventpublish"
      }, {
        name: "指挥调度",
        path: "/home/emergency/command"
      }, {
        name: "应急演练",
        path: "/home/emergency/drill"
      }, {
        name: "应急预案",
        path: "/home/risk/riskoverall"
      }, {
        name: "应急资源",
        path: "/home/risk/riskstatistics"
      }, {
        name: "值班管理",
        path: "/home/risk/riskstatistics"
      }, {
        name: "应急指挥统计",
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
  .menu-bar {
    width: 100%;
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
    height: calc(100% - 76px);
    overflow: auto; 
  }
}
</style>
