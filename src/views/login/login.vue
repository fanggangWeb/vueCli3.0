<template>
  <div class="login" @keydown="keyDown">
    <div class="top">登录桥梁应急系统</div>
    <div class="center">
      <div class="login-display">
        <!-- <img src="../../assets/image/logo.png" class="logo"> -->
        <div class="header">欢迎登录桥梁应急系统</div>
        <div class="login-info">
          <div class="account-number">账号</div>
          <div class="number-input" ref="numberInput">
            <img src="../../assets/image/login_number.png">
            <input type="text" placeholder="请输入账号" v-model.trim="accountNumber">
          </div>
        </div>
        <div class="login-info">
          <div class="account-number">密码</div>
          <div class="number-input" ref="passwordInput">
            <img src="../../assets/image/login_password.png">
            <input type="password" placeholder="请输入密码" v-model.trim="password">
          </div>
        </div>
        <div class="remember-password">
          <div class="checkbox" @click="isRememberPassword = !isRememberPassword">
            <span v-if="isRememberPassword">√</span>
          </div>
          <span style="cursor:pointer;-moz-user-select:none;" onselectstart="return false;" @click="isRememberPassword = !isRememberPassword">记住账号</span>
        </div>
        <div class="submit-button" @click="loginClick">登 录</div>
      </div>
    </div>
    <el-dialog :visible.sync="showState" width="35%" :close-on-click-modal="false" center>
      <el-row style="font-size:16px;line-height:25px;margin-top:20px;color:rgb(144, 147, 153)">
        <el-col :offset="4" :span="20">检测到当前登录账号有多种角色权限，请进行选择登录</el-col>
      </el-row>
      <el-row style="font-size:16px;line-height:25px;margin-top:20px;color:rgb(144, 147, 153)">
        <el-col :offset="4">
          <span>请选择登录角色:</span>
          <el-select style="width:160px;margin-left:10px;" v-model="roleValue" clearable placeholder="选择角色">
            <el-option v-for="item in roleList" :key="item.securityRoles" :label="item.name" :value="item.securityRoles"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
          <el-button @click="showState = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
    </el-dialog>
    <div class="bottom"></div>
  </div>
</template>

<script>
  import common from "@/utils/common";
  const SUCCESS_OK = "200";
  import {
    mapMutations,
    actions
  } from "vuex";
  export default {
    name: "login",
    data() {
      return {
        isRememberPassword: false,
        accountNumber: "",
        password: "",
        showState: false,
        roleValue: "",
        roleList: []
      };
    },
    mounted() {
      if (
        this.getCookie("user") &&
        this.getCookie("user") != "null" &&
        this.getCookie("pswd") &&
        this.getCookie("pswd")
      ) {
        this.accountNumber = this.getCookie("user");
        this.password = this.getCookie("pswd");
        this.isRememberPassword = true;
      }
    },
    methods: {
      loginClick() {
        let lable;
        let error;
        let isError = false;
        if (!this.accountNumber) {
          isError = true;
          lable = this.$refs["numberInput"];
          error = "请输入账号！";
        } else if (!this.password) {
          isError = true;
          lable = this.$refs["passwordInput"];
          error = "请输入密码！";
        }
        if (isError) {
          common.bubbleHints(lable, error);
          return;
        }
        if (this.isRememberPassword) {
          this.setValue("user", this.accountNumber, 365);
          this.setValue("pswd", this.password, 365);
        } else {
          if (this.getCookie("user") && this.getCookie("pswd")) {
            this.delCookie("user");
            this.delCookie("pswd");
          }
        }
        const data = {
          username: this.accountNumber,
          password: this.password
        };
        this.$router.push("/home/risk/");
      },
      setValue(name, value, day) {
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = name + "=" + value + ";expires=" + day;
      },
      getCookie(name) {
        let reg = RegExp(name + "=([^;]+)");
        let arr = document.cookie.match(reg);
        if (arr) {
          return arr[1];
        } else {
          return "";
        }
      },
      delCookie(name) {
        this.setValue(name, null, -1);
      },
      keyDown(ev) {
        if (ev.keyCode == 13) {
          this.loginClick();
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../../assets/css/common";
  .login {
    width: 100%;
    height: 100%;
    // background: #ccc;
    background-size: 100% 100%;
    text-align: center;
    .top {
      width: 100%;
      height: 109px;
      max-height: 12%;
      box-sizing: border-box;
      padding-left: 62px;
      color: #467dec;
      font-weight: bold;
      font-size: 30px;
      // line-height: 109px;
      background: white;
      text-align: left;
      display: flex;
      align-items: center;
    }
    .center {
      width: 100%;
      height: calc(100% - 218px);
      max-height: 80%;
      background-image: url("../../assets/image/loginbg.png");
      .login-display {
        width: 570px;
        height: 457px;
        max-width: 90%;
        background: #fff;
        border-radius: 8px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 0 57px;
        box-sizing: border-box;
        .logo {
          position: absolute;
          width: 150px;
          height: 100px;
          top: -126px;
          left: 50%;
          transform: translateX(-50%);
        }
        .header {
          height: 100px;
          font-size: 30px;
          color: #467dec;
          line-height: 100px;
          font-weight: bold;
        }
        .login-info {
          margin-top: 10px;
          .account-number {
            height: 36px;
            line-height: 36px;
            font-size: 16px;
            text-align: left;
          }
          .number-input {
            width: 100%;
            height: 50px;
            border: 1px solid #eaeaea;
            border-radius: 8px;
            /*padding-left: 50px;*/
            background: #f5f5f5;
            img {
              width: 15px;
              height: 17px;
              float: left;
              margin: 18px 10px 0 15px;
            }
            input {
              width: calc(100% - 60px);
              height: 48px;
              line-height: 48px;
              border: 0;
              outline: none;
              font-size: 16px;
              color: #333;
              background: #f5f5f5;
            }
          }
        }
        .remember-password {
          margin: 24px 0 18px 0;
          height: 30px;
          line-height: 30px;
          text-align: left;
          .checkbox {
            width: 15px;
            height: 15px;
            border: 1px solid #e1e1e1;
            background: #eeeeee;
            border-radius: 3px;
            cursor: pointer;
            position: relative;
            float: left;
            margin-top: 7px;
            span {
              font-size: 14px;
              font-weight: bold;
              position: absolute;
              top: -6px;
              left: 2px;
            }
          }
          >span {
            font-size: 16px;
            color: #848484;
            margin-left: 10px;
          }
        }
        .submit-button {
          height: 50px;
          line-height: 50px;
          background: #5788f7;
          border-radius: 8px;
          font-size: 22px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .bottom {
      width: 100%;
      height: 109px;
      max-height: 10%;
      background: white;
      position: absolute;
      bottom: 0;
    }
  }
</style>
