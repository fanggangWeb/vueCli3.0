<template>
  <div class="container3">
    <div class="top-bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="default">应急指挥</el-breadcrumb-item>
        <el-breadcrumb-item class="text">事件发布</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menu-bar">
      <div class="menu" :class="{'active':menuIndex == index}" v-for="(item, index) in menuList" @click="menuTap(item,index)" :key="index">
        {{item.name}}
      </div>
    </div>
    <div class="action-bar">
      <div class="bar-top">
        <div class="name">预警类型</div>
        <el-select class="little-space" v-model="warnType" size="small" clearable filterable placeholder="请选择预警类型">
          <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="name big-space">事件类型</div>
        <el-select class="little-space" v-model="eventType" size="small" clearable filterable placeholder="请选择">
          <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="name big-space">桥梁</div>
        <el-select class="little-space" v-model="bridge" size="small" clearable filterable placeholder="请选择">
          <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="name big-space">来源</div>
        <el-select class="little-space" v-model="source" size="small" clearable filterable placeholder="请选择">
          <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="name big-space">预警级别</div>
        <el-select class="little-space" v-model="warnLevel" size="small" clearable filterable placeholder="请选择">
          <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="name big-space">关键字</div>
        <el-input type="text" class="little-space" v-model="keyword" size="small" style="width:140px;" clearable placeholder="输入预警标题"></el-input>
      </div>
      <div class="bar-center">
        <div class="name">时间</div>
        <el-date-picker v-model="timeValue" class="little-space" type="daterange" size="small" style="width:240px" clearable range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <div class="system-btn choose-btn little-space" :class="{'active': index==chooseIndex}" v-for="(item, index) in btnList" :key="index" @click="chooseTime(item,index)">
          {{item.name}}
        </div>
      </div>
      <div class="bar-bottom">
        <!-- <el-button type="primary" size="small">查询</el-button> -->
        <div class="system-btn query-btn">
          <div class="icon"></div>
          <div class="text">查询</div>
        </div>
        <div class="system-btn reset-btn big-space" @click="reset">
          <div class="icon"></div>
          <div class="text">重置</div>
        </div>
        <div class="system-btn add-btn big-space">
          <div class="icon"></div>
          <div class="text">新增</div>
        </div>
        <div class="system-btn export-btn big-space">
          <div class="icon"></div>
          <div class="text">导出EXCEL</div>
        </div>
      </div>
    </div>
    <div class="table-container">
      <el-table :data="dataList" style="width: 100%">
        <el-table-column prop="date" align="center" label="编号" width="100">
        </el-table-column>
        <el-table-column prop="name" align="center" label="事件标题">
        </el-table-column>
        <el-table-column prop="address" align="center" label="桥梁名称">
        </el-table-column>
        <el-table-column prop="date" align="center" label="事件类型">
        </el-table-column>
        <el-table-column prop="name" align="center" label="人员伤/亡">
        </el-table-column>
        <el-table-column prop="date" align="center" label="经济损失(万元)">
        </el-table-column>
        <el-table-column prop="name" align="center" label="预警级别">
        </el-table-column>
        <el-table-column prop="date" align="center" label="事件时间">
        </el-table-column>
        <el-table-column prop="date" align="center" label="预警时间">
        </el-table-column>
        <el-table-column prop="date" align="center" label="预警状态">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="260">
          <template slot-scope="scope">
            <el-button type="primary" size="small" plain @click="check(scope.row)">核实</el-button>
            <!-- <el-button type="primary" size="small" plain @click="handle(scope.row)">处置</el-button> -->
            <el-button type="primary" size="small" plain @click="report(scope.row)">上报</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-con">
      <el-pagination
        background
        @size-change="handleCurrentChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="size"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="风险源估测"
      :close-on-click-modal="false"
      :visible.sync="dialogState"
      width="45%"
      class="edit-dialog"
      center>
      <el-row class="info">
        <el-col class="key" :span="3">桥梁:</el-col>
        <el-col class="value" :span="4">朝天门大桥</el-col>
        <el-col class="key" :offset="1" :span="3">预警标题:</el-col>
        <el-col class="value" :span="4">成吉思汗</el-col>
        <el-col class="key"  :offset="1" :span="3">时间:</el-col>
        <el-col class="value" :span="4">2019-03-07 10:01</el-col>
      </el-row>
      <el-row class="info">
        <el-col class="key" :span="3">桥梁名称:</el-col>
        <el-col class="value" :span="4">朝天门大桥</el-col>
        <el-col class="key" :offset="1" :span="3">管理单位:</el-col>
        <el-col class="value" :span="4">风险源名称</el-col>
      </el-row>
      <div class="legend">近十年类似风险曾造成事故<span class="red-text">8</span>件</div>
      <el-table class="dark-table" :data="similarList" border style="width: 100%;background:#f8f8f8;">
        <el-table-column prop="date" label="事件名称" align="center">
        </el-table-column>
        <el-table-column prop="date" label="桥梁名称" align="center">
        </el-table-column>
        <el-table-column prop="date" label="发生时间" align="center">
        </el-table-column>
        <el-table-column prop="date" label="亡(人)" align="center">
        </el-table-column>
        <el-table-column prop="date" label="伤(人)" align="center">
        </el-table-column>
        <el-table-column prop="date" label="经济损失(万元)" align="center">
        </el-table-column>
        <el-table-column prop="date" label="事件等级" align="center">
        </el-table-column>
      </el-table>
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" style="margin-top:30px;">
        <el-row>
          <el-col :span="12">
            <el-form-item label="预警类型" prop="warnType">
              <el-select class="little-space" v-model="form.warnType" clearable filterable placeholder="请选择">
                <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预警来源" prop="warnSource">
              <el-select class="little-space" v-model="form.warnSource" style="width:100%" clearable filterable placeholder="请选择">
                <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="事件类型" prop="eventType">
              <el-select style="width:100%" v-model="form.eventType" multiple clearable filterable placeholder="请选择">
                <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="5">
            <el-form-item prop="eventType1" label-width="0">
              <el-select style="width:100%;" v-model="form.eventType1" multiple clearable filterable placeholder="请选择">
                <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="预警级别" prop="warnLevel">
              <el-select class="little-space" v-model="form.warnLevel" clearable filterable placeholder="请选择">
                <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预估受伤人数" prop="hurtPeople">
              <el-input class="little-space" v-model="form.hurtPeople" placeholder="请输入数字" type="text" style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="预估死亡人数" prop="diePeople">
              <el-input class="little-space" v-model="form.diePeople" placeholder="请输入数字" type="text" style="width:217px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经济损失" prop="economyLoss">
              <el-input class="little-space" v-model="form.economyLoss" placeholder="请输入数字" type="text" style="width:100%">
                 <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="video-con">
        <div class="video" v-for="(item, index) in videoList" :key="index">
          <!-- <img src="../../assets/image/videobg.png" alt=""> -->
          <video src="../../assets/image/144117180.mp4" controls="controls"></video>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="dialogState = false">保 存</el-button>
        <el-button @click="dialogState = false">取 消</el-button>  
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        warnType: '',
        eventType: '',
        bridge: '',
        source: '',
        warnLevel: '',
        keyword: '',
        timeValue: '',
        dataList: [{}, {}],
        page: 1,
        size: 10,
        total: 100,
        dialogState: false,
        editState: false,
        dialogState1: false,
        titleText: "一般风险源",
        menuIndex: 0,
        menuList: [{
          name: "待处理预警"
        }, {
          name: "所有预警信息"
        }],
        bridgeNameList: [{
          label: '某个大桥',
          value: 1
        }, {
          label: '朝天门大桥',
          value: 2
        }],
        similarList: [{}, {}],
        chooseIndex: 1,
        btnValue: '',
        btnList: [{
          name: '近一月',
          value: 1
        }, {
          name: '近三月',
          value: 3
        }, {
          name: '近一年',
          value: 12
        }],
        form: {
          warnType: '',
          warnSource: '',
          eventType: '',
          eventType1: '',
          warnLevel: '',
          hurtPeople: '',
          diePeople: '',
          economyLoss: ''
        },
        resetForm: {
          warnType: '',
          warnSource: '',
          eventType: '',
          eventType1: '',
          warnLevel: '',
          hurtPeople: '',
          diePeople: '',
          economyLoss: ''
        },
        rules: {
          warnType: [{required: true,message: "请选择预警类型",trigger: 'blur'}],
          warnSource: [{required: true,message: "请选择预警来源",trigger: 'blur'}],
          eventType: [{required: true,message: "请选择事件类型",trigger: 'blur'}],
          eventType1: [{required: true,message: "请选择事件类型",trigger: 'blur'}],
          warnLevel: [{required: true,message: "请选择预警级别",trigger: 'blur'}],
          hurtPeople: [{required: true,message: "请输入预估受伤人数",trigger: 'blur'}],
          diePeople: [{required: true,message: "请输入预估死亡人数",trigger: 'blur'}],
          economyLoss: [{required: true,message: "请输入经济损失",trigger: 'blur'}]
        },
        videoList: [{},{},{}]
      };
    },
    mounted() {},
    watch: {
      dialogState: function(val, oldval) {
        if (val == false) {
          this.$refs['form'].resetFields();
        }
      },
      dialogState: function(val, oldval) {
        if (val == false) {
          this.$refs['form'].resetFields();
        }
      }
    },
    methods: {
      detail(item) {},
      del(item) {},
      check(item) {
        this.dialogState = true
      },
      handle (item) {
        this.$router.push({ path: '/home/emergency/eventHandle'})
      },
      handleCurrentChange() {},
      chooseTime(item, index) {
        if (index == this.chooseIndex) {
          this.chooseIndex = -1
          this.btnValue = ''
        } else {
          this.chooseIndex = index
          this.btnValue = item.value
        }
      },
      videoPlay (item) {
      },
      menuTap(item, index) {
        this.titleText = item.name
        this.menuIndex = index
      },
      reset() {
        this.warnType = '',
        this.eventType = '',
        this.bridge = '',
        this.source = '',
        this.warnLevel = '',
        this.keyword = '',
        this.timeValue = '',
        this.btnValue = '',
        this.chooseIndex = ''
      }
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
      .menu.active {
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
