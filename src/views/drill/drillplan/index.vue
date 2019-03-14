<template>
  <div class="container4">
    <div class="action-bar">
      <div class="bar-top">
        <div class="name">演练名称</div>
        <el-input type="text" class="little-space" v-model="dirllName" size="small" style="width:140px;" clearable placeholder="请输入演练名称"></el-input>
        <div class="name big-space">地 点</div>
        <el-input type="text" class="little-space" v-model="address" size="small" style="width:140px;" clearable placeholder="请输入地点"></el-input>
        <div class="name big-space">时 间</div>
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
        <div class="system-btn add-btn big-space" @click="add">
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
        <el-table-column prop="name" align="center" label="演练名称">
        </el-table-column>
        <el-table-column prop="address" align="center" label="演练主持人">
        </el-table-column>
        <el-table-column prop="date" align="center" label="时间">
        </el-table-column>
        <el-table-column prop="name" align="center" label="地点">
        </el-table-column>
        <el-table-column prop="date" align="center" label="参与单位人员">
        </el-table-column>
        <el-table-column prop="name" align="center" label="调整方案">
        </el-table-column>
        <el-table-column prop="date" align="center" label="演练类型">
        </el-table-column>
        <el-table-column prop="date" align="center" label="演练状态">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button type="primary" size="small" plain @click="edit(scope.row)">修改</el-button>
            <el-button type="danger" size="small" plain @click="report(scope.row)">删除</el-button>
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
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" style="margin-top:30px;">
        <el-row>
          <el-col :span="11">
            <el-form-item label="演练状态" prop="warnType">
              <el-select class="little-space" v-model="form.warnType" clearable filterable style="width:100%" placeholder="请选择">
                <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :offset="2" :span="11">
            <el-form-item label="演练类型" prop="warnSource">
              <el-select class="little-space" v-model="form.warnSource" style="width:100%" clearable filterable placeholder="请选择">
                <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="预估死亡人数" prop="diePeople">
              <el-input class="little-space" v-model="form.diePeople" placeholder="请输入数字" type="text"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="2" :span="11">
            <el-form-item label="经济损失" prop="economyLoss">
              <el-input class="little-space" v-model="form.economyLoss" placeholder="请输入数字" type="text" style="width:100%">
                 <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
        dirllName: '',
        address: '',
        timeValue: '',
        dataList: [{}, {}],
        page: 1,
        size: 10,
        total: 100,
        dialogState: true,
        editState: false,
        dialogState1: false,
        titleText: "一般风险源",
        menuIndex: 0,
        menuList: [{
          name: "演练计划制定"
        }, {
          name: "培训课程设置"
        }, {
          name: "模拟演练管理"
        }, {
          name: "实战演练"
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
          dirllName: '',
          drillHost: '',
          drillTime: '',
          drillAddress: '',
          drillStatus: '',
          drillType: '',
          dispatchPlan: '',
          participantPerson: '',
          attachment: ''
        },
        resetForm: {
          dirllName: '',
          drillHost: '',
          drillTime: '',
          drillAddress: '',
          drillStatus: '',
          drillType: '',
          dispatchPlan: '',
          participantPerson: '',
          attachment: ''
        },
        rules: {
          dirllName: [{required: true,message: "请选择预警类型",trigger: 'blur'}],
          drillHost: [{required: true,message: "请选择预警来源",trigger: 'blur'}],
          drillTime: [{required: true,message: "请选择预警来源",trigger: 'blur'}],
          drillAddress: [{required: true,message: "请选择事件类型",trigger: 'blur'}],
          drillStatus: [{required: true,message: "请选择预警级别",trigger: 'blur'}],
          drillType: [{required: true,message: "请输入预估受伤人数",trigger: 'blur'}],
          dispatchPlan: [{required: true,message: "请输入预估死亡人数",trigger: 'blur'}],
          participantPerson: [{required: true,message: "请输入经济损失",trigger: 'blur'}]
        }
      };
    },
    mounted() {},
    watch: {
      dialogState: function(val, oldval) {
        if (val == false) {
          this.$refs['form'].resetFields();
        }
      }
    },
    methods: {
      add () {
        this.dialogState = true
        this.editState = false
      },
      edit(item) {},
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
  @import "../../../assets/css/common.less";
  .container4 {
    color: @fontColor;
    width: 100%;
    height: 100%;
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
    }
  }
</style>
