<template>
  <div class="container3">
    <div class="top-bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="default">风险管控</el-breadcrumb-item>
        <el-breadcrumb-item class="text">归档</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="action-bar">
      <div class="bar-top">
        <div class="name">桥梁名称</div>
        <el-select class="little-space" v-model="bridgeName" size="small" clearable filterable placeholder="请选择">
          <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="name big-space">风险源类型</div>
        <el-select class="little-space" v-model="riskType" size="small" clearable filterable placeholder="请选择">
          <el-option v-for="item in riskTypeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="name big-space">风险等级</div>
        <el-select class="little-space" v-model="riskLevel" size="small" clearable filterable placeholder="请选择">
          <el-option v-for="item in riskLevelList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="name big-space">状态</div>
        <el-select class="little-space" v-model="status" size="small" clearable filterable placeholder="请选择">
          <el-option v-for="item in riskLevelList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
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
      </div>
    </div>
    <div class="table-container">
      <el-table :data="dataList" style="width: 100%">
        <el-table-column prop="date" align="center" label="编号" width="100">
        </el-table-column>
        <el-table-column prop="name" align="center" label="桥梁名称">
        </el-table-column>
        <el-table-column prop="address" align="center" label="风险源名称">
        </el-table-column>
        <el-table-column prop="date" align="center" label="人员伤亡">
        </el-table-column>
        <el-table-column prop="name" align="center" label="经济损失">
        </el-table-column>
        <el-table-column prop="date" align="center" label="估测损失">
        </el-table-column>
        <el-table-column prop="name" align="center" label="风险等级">
        </el-table-column>
        <el-table-column prop="date" align="center" label="估测时间">
        </el-table-column>
        <el-table-column prop="date" align="center" label="上报方式">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="260">
          <template slot-scope="scope">
            <el-button type="primary" size="small" plain @click="Estimate(scope.row)">估测</el-button>
            <el-button type="primary" size="small" plain @click="detail(scope.row)">详情</el-button>
            <!-- <el-button type="danger" size="small" plain @click="del(scope.row)">删除</el-button> -->
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
        <el-col class="key" :offset="1" :span="3">上报:</el-col>
        <el-col class="value" :span="4">成吉思汗</el-col>
        <el-col class="key"  :offset="1" :span="3">时间:</el-col>
        <el-col class="value" :span="4">2019-03-07 10:01</el-col>
      </el-row>
      <el-row class="info">
        <el-col class="key" :span="3">风险源编号:</el-col>
        <el-col class="value" :span="4">YK002</el-col>
        <el-col class="key" :offset="1" :span="3">风险源名称:</el-col>
        <el-col class="value" :span="4">风险源名称</el-col>
      </el-row>
      <div class="legend">类似风险曾造成事故<span class="red-text">8</span>件</div>
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
            <el-form-item label="风险源类型" prop="riskType">
              <el-select class="little-space" v-model="form.riskType" clearable filterable placeholder="请选择">
                <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="风险症状" prop="riskSymptom">
              <el-select class="little-space" v-model="form.riskSymptom" style="width:100%" clearable filterable placeholder="请选择">
                <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="潜在事故类型" prop="accidentType">
              <el-select style="width:100%" v-model="form.accidentType" multiple clearable filterable placeholder="请选择潜在事故类型">
                <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="评估理由" prop="reason">
              <el-input type="textarea" style="width:100%" v-model="form.reason"></el-input>
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
        bridgeName: '',
        riskType: '',
        riskLevel: '',
        status: "",
        dataList: [{}, {}],
        page: 1,
        size: 10,
        total: 100,
        dialogState: false,
        editState: false,
        dialogState1: false,
        bridgeNameList: [
          {
            label: '某个大桥',
            value: 1
          }, {
            label: '朝天门大桥',
            value: 2
          }],
          riskTypeList: [{
            label: '风险1',
            value: 1
          }, {
            label: '风险2',
            value: 2
          }],
          riskLevelList: [{
            label: '状态1',
            value: 1
          }, {
            label: '状态2',
            value: 2
          }
        ],
        similarList: [{},{}],
        form: {
          bridge: '',
          riskName: '',
          accidentType: [],
          riskType: '',
          riskSymptom: '',
          reason: ''
        },
        resetForm: {
          bridge: '',
          riskName: '',
          accidentType: [],
          riskType: '',
          riskSymptom: '',
          reason: ''
        },
        rules: {
          bridge:[{required: true, message: "请选择桥梁", trigger: 'change'}],
          riskName: [{required: true, message: "请输入风险源名称", trigger: 'blur'}],
          accidentType: [{type:'array', required: true,  message: "请选择潜在事故类型", trigger: 'change'}],
          riskType: [{required: true, message: "请选择风险源类型", trigger: 'change'}],
          riskSymptom: [{required: true, message: "请选择风险症状", trigger: 'change'}],
          reason: [{required: true, message: "请输入风险描述", trigger: 'blur'}]
        }
      };
    },
    mounted() {
    },
    watch: {
      dialogState: function (val, oldval) {
        if (val == false) {
          this.$refs['form'].resetFields();
        }
      },
      dialogState: function (val, oldval) {
        if (val == false) {
          this.$refs['form'].resetFields();
        }
      }
    },
    methods: {
      detail (item) {
        this.$router.push({
          path: '/home/risk/fileDetail'
        })
      },
      del (item) {},
      Estimate (item) {
        this.dialogState = true
      },
      handleCurrentChange() {},
      closeMap () {
        var map = new BMap.Map("map");// 创建地图实例 
        map.clearOverlays();    
      },
      reset() {
        this.bridgeName = ''
        this.riskType = ''
        this.riskLevel = ''
        this.status = ''
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
  .dark-table.el-table th,tr{
    background:#f8f8f8 !important;
  }
</style>
<style lang="less" scoped>
  @import "../../assets/css/common.less";
  .container3 {
    color: @fontColor;
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
    }
  }
</style>
