<template>
  <el-container>
    <el-header class="home-header" height="76px">
      <main-header></main-header>
    </el-header>
    <el-container>
      <el-aside class="home-aside" width="131px">
        <main-side></main-side>
      </el-aside>
      <el-main class="home-main">
        <div class="main-content">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import mainHeader from '../layout/header'
import mainSide from  '../layout/sidebar'
export default {
  components: {
    mainHeader,
    mainSide
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/common.less";
.el-container {
  width: 100%;
  height: 100%;
}
.home-header {
  width: 100%;
  padding: 0px !important;
}
.home-aside {
  height: 100%;
  box-sizing: border-box;
  border-right: solid 1px @mainBg;
}
.home-main {
  background: @mainBg;
  padding: 0px !important;
  overflow: auto;
  width: 100%;
  height: 100%;
}
.main-content {
  width: 100%;
  height: 100%;
}
</style>

