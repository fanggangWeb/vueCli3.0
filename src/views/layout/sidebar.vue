<template>
  <div class="sidebar">
    <router-link class="menu risk" to="/home/risk">
      <div class="icon"></div>
      <div class="text">风险管控</div>
    </router-link>
    <router-link class="menu emergency" to="/home/emergency">
      <div class="icon"></div>
      <div class="text">应急指挥</div>
    </router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.sidebar {
  width: 100%;
  height: 100%;
  background: white;
  box-sizing: border-box;
  padding-top: 33px;
  .menu {
    display: block;
    width: 88px;
    height: 79px;
    background: #F5F7FA;
    box-sizing: border-box;
    border: 1px #e2e2e2 solid;
    border-radius: 10px;
    margin-left: 22px;
    margin-bottom: 37px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      width: 30px;
      height: 30px;
      background-size: 100% 100%;
    }
    .text {
      margin-top: 7px;
      font-size: 10px;
      color: #6A6A6A;
    }
  }
  .risk {
    .icon {
      background-image: url("../../assets/image/risk.png");
    }
  }
  .emergency {
    .icon {
      background-image: url("../../assets/image/emergency.png");
    }
  }
  .menu.router-link-active {
    background: #6998F1;
    border: 1px solid #74A0F9;
    .text {
      color: white;
    }
  }
  .risk.router-link-active {
    .icon {
      background-image: url("../../assets/image/riskchosen.png");
    }
  }
  .emergency.router-link-active {
    .icon {
      background-image: url("../../assets/image/emergencychosen.png");
    }
  }
}
</style>
