<template>
  <div class="container3">
    <div class="top-bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="default">应急指挥</el-breadcrumb-item>
        <el-breadcrumb-item class="text">应急演练</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menu-bar">
      <!-- <router-link class="menu" to="/home/emergency/drill/" exact>演练计划制定</router-link> -->
      <router-link class="menu" :to="item.path" :class="{'router-link-active':menuIndex == index}" v-for="(item, index) in menuList" :exact="item.exact"  @click.native="menuTap(item,index)" :key="index">
        {{item.name}}
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menuIndex: -1,
        menuList: [{
          name: "演练计划制定",
          path: "/home/emergency/drill/",
          exact: true
        }, 
        {
          name: "培训课程设置",
          path: "/home/emergency/drill/traincourse"
        }, {
          name: "模拟演练管理",
          path: "/home/emergency/drill/mockdrill"
        }, {
          name: "实战演练",
          path: "/home/emergency/drill/actualdrill"
        }]
      };
    },
    mounted() {},
    watch: {
    },
    methods: {
      menuTap(item, index) {
        // this.titleText = item.name
        this.menuIndex = index
      },
    }
  };
</script>
<style lang="less">
  /* 重置框架的样式 */
  .bar-top .el-select {
    width: 140px;
  }
  .bar-top .el-range-editor {
    width: 240px;
  }
  .bar-bottom .el-button {
    min-width: 84px;
  }
  .dark-table.el-table th,
  tr {
    background: #f8f8f8 !important;
  }
</style>
<style lang="less" scoped>
  @import "../../assets/css/common.less";
  .container3 {
    color: @fontColor;
    width: 100%;
    height: 100%;
    .menu-bar {
      margin-left: 54px;
      display: flex;
      font-size: 14px;
      .menu {
        height: 40px;
        padding: 0 20px;
        line-height: 40px;
        color: #909399;
        background: white;
        text-align: center;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        margin-right: 5px;
        cursor: pointer;
      }
      .router-link-active {
        background: #6B96EC;
        color: white;
      }
    }
    .action-bar {
      width: calc(100% - 108px);
      margin-left: 54px;
      padding: 23px 20px;
      box-sizing: border-box;
      background: white;
      .bar-top {
        width: 100%;
        display: flex;
        line-height: 32px;
        .little-space {
          margin-left: 10px;
        }
        .big-space {
          margin-left: 20px;
        }
        .name {
          font-size: 15px;
          color: #43425D;
        }
      }
      .bar-center {
        margin-top: 15px;
        line-height: 32px;
        width: 100%;
        display: flex;
        .little-space {
          margin-left: 10px;
        }
        .big-space {
          margin-left: 14px;
        }
        .name {
          font-size: 15px;
          color: #43425D;
        }
      }
      .bar-bottom {
        margin-top: 15px;
        width: 100%;
        display: flex;
        .little-space {
          margin-left: 10px;
        }
        .big-space {
          margin-left: 14px;
        }
      }
    }
    .table-container {
      width: calc(100% - 108px);
      margin-left: 54px;
      box-sizing: border-box;
      background: white;
      margin-top: 14px;
    }
    .page-con {
      width: calc(100% - 108px);
      height: 75px;
      margin-left: 54px;
      display: flex;
      box-sizing: border-box;
      background: white;
      justify-content: center;
      align-items: center;
    }
    .edit-dialog {
      .legend {
        font-size: 14px;
        color: #909399;
        margin: 30px 0 13px 0;
        .red-text {
          color: #F56C6C;
        }
      }
      .info {
        margin-bottom: 18px;
        .key {
          color: #909399;
          font-size: 14px;
        }
        .value {
          color: @fontColor;
          font-size: 14px;
        }
      }
      .video-con {
        width: 660px;
        display: flex;
        flex-wrap: wrap;
        .video {
          width: 200px;
          height: 150px;
          margin-right: 20px;
          margin-bottom: 15px;
          position: relative;
          video {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
          }
          img {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 99;
          }
        }
      }
    }
  }
</style>
