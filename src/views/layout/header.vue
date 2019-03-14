<template>
  <div class="header">
    <img class="logo" src="../../assets/image/logo.png" alt>
    <div class="system-name">桥梁应急系统</div>
    <div class="right">
      <div class="time-con">
        <i class="el-icon-time"></i>
        <div class="time-text">2018-12-26 17:00 PM</div>
      </div>
      <div class="userinfo">
        <img src="../../assets/image/test.jpg" alt="" class="avatar">
        <div class="username">张三丰</div>
      </div>
      <div class="logout">
        <img @click="logout" src="../../assets/image/logouticon.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$confirm('是否注销当前登录并退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/')
      }).catch(() => {
        console.log('取消')     
      })
    }
  },
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 100%;
  background: #467dec;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  -webkit-align-items: center;
  line-height: 76px;
  .logo {
    width: 44px;
    height: 44px;
    border-radius: 44px;
    margin-left: 36px;
  }
  .system-name {
    margin-left: 21px;
    font-size: 24px;
    color: white;
    font-weight: bold;
  }
  .right {
    display: flex;
    margin-left: auto;
    height: 100%;
    .time-con {
      min-width: 278px;
      height: 100%;
      display: flex;
      justify-content: center;
      -webkit-justify-content: center;
      align-items: center;
      -webkit-align-items: center;
      box-sizing: border-box;
      margin-left: auto;
      padding: 0 20px;
      background: #4177e4;
      border-left: #3C73E2 1px solid;
      border-right: #3C73E2 1px solid;
      .el-icon-time {
        font-size: 20px;
        color: white;
      }
      .time-text {
        font-size: 16px;
        color: #fff;
        margin-left: 13px;
      }
    }
    .userinfo {
      min-width: 165px;
      height: 100%;
      display: flex;
      justify-content: center;
      -webkit-justify-content: center;
      align-items: center;
      -webkit-align-items: center;
      box-sizing: border-box;
      background: #4177e4;
      border-left: #3C73E2 1px solid;
      border-right: #3C73E2 1px solid;
      padding: 0 20px;
      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 16px;
      }
      .username {
        font-size: 16px;
        color: white;
        margin-left: 10px;
      }
    }
    .logout {
      width: 76px;
      height: 100%;
      text-align: center;
      line-height: 80px;
      background: #4177e4;
      img {
        width: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
