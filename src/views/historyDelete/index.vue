<template>
  <div class="container3">
    <div class="top-bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="default">风险管控</el-breadcrumb-item>
        <el-breadcrumb-item to="/home/risk/riskoverall" class="default">桥梁总体风险评估</el-breadcrumb-item>
        <el-breadcrumb-item class="text">历史删除</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="action-bar">
      <div class="bar-top">
        <div class="name">桥梁名称</div>
        <el-select class="little-space" v-model="bridgeName" size="small" clearable filterable placeholder="请选择">
          <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="name big-space">卡号</div>
        <el-input type="text" size="small" v-model="cardNumber" class="little-space" clearable placeholder="请输入卡号" style="width:140px;"></el-input>
        <div class="name big-space">管理单位</div>
        <el-select class="little-space" v-model="managerUnit" size="small" clearable filterable placeholder="请选择">
          <el-option v-for="item in riskTypeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="name big-space">所在地区</div>
        <el-select class="little-space" v-model="location" size="small" clearable filterable placeholder="请选择">
          <el-option v-for="item in riskTypeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="name big-space">风险等级</div>
        <el-select class="little-space" v-model="riskLevel" size="small" clearable filterable placeholder="请选择">
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
        <el-table-column prop="date" align="center" label="卡号" width="100">
        </el-table-column>
        <el-table-column prop="name" align="center" label="桥梁名称">
        </el-table-column>
        <el-table-column prop="address" align="center" label="管理单位">
        </el-table-column>
        <el-table-column prop="date" align="center" label="所在地区">
        </el-table-column>
        <el-table-column prop="name" align="center" label="总体风险评分">
        </el-table-column>
        <el-table-column prop="date" align="center" label="专项风险评估">
        </el-table-column>
        <el-table-column prop="date" align="center" label="风险统计表" width="240">
          <template slot-scope="scope">
            <el-button size="small" plain>查看</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="small" plain @click="restore(scope.row)">还原</el-button>
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
      title="新增风险源"
      :close-on-click-modal="false"
      :visible.sync="dialogState"
      width="45%"
      class="add-dialog"
      center>
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="桥梁" prop="bridge">
              <el-select class="little-space" v-model="form.bridge" clearable filterable placeholder="请选择">
                <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="风险源名称" prop="riskName">
              <el-input type="text" v-model="form.riskName"></el-input>
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
            <el-form-item label="风险描述" prop="riskDesc">
              <el-input type="textarea" style="width:100%" v-model="form.riskDesc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="登记日期" prop="registerDate">
              <el-date-picker v-model="form.registerDate" style="width:100%" type="date" placeholder="请选择登记日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上报人员" prop="reportPerson">
              <el-select class="little-space" v-model="form.reportPerson" clearable filterable placeholder="请选择">
                <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上报人员电话" prop="reportPhone">
              <el-input type="text" v-model.number="form.reportPhone" placeholder="请输入上报人员电话"></el-input>
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
  // import BMap from 'BMap'
  var map
  export default {
    data() {
      return {
        bridgeName: '',
        managerUnit: '',
        riskLevel: '',
        cardNumber: '',
        location: '',
        dataList: [{}, {}],
        page: 1,
        size: 10,
        total: 100,
        dialogState: false,
        editState: false,
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
        form: {
          bridge: '',
          riskName: '',
          accidentType: [],
          riskType: '',
          riskSymptom: '',
          riskDesc: '',
          registerDate: '',
          reportPerson: '',
          reportPhone: ''
        },
        resetForm: {
          bridge: '',
          riskName: '',
          accidentType: [],
          riskType: '',
          riskSymptom: '',
          riskDesc: '',
          registerDate: '',
          reportPerson: '',
          reportPhone: ''
        },
        rules: {
          bridge:[{required: true, message: "请选择桥梁", trigger: 'change'}],
          riskName: [{required: true, message: "请输入风险源名称", trigger: 'blur'}],
          accidentType: [{type:'array', required: true,  message: "请选择潜在事故类型", trigger: 'change'}],
          riskType: [{required: true, message: "请选择风险源类型", trigger: 'change'}],
          riskSymptom: [{required: true, message: "请选择风险症状", trigger: 'change'}],
          riskDesc: [{required: true, message: "请输入风险描述", trigger: 'blur'}],
          registerDate: [{required: true, message: "请选择登记日期", trigger: 'blur'}],
          reportPerson: [{required: true, message: "请选择上报人员", trigger: 'change'}],
          reportPhone: [{ type: 'number',required: true, message: "请输入正确的手机号", trigger: 'blur'}]
        },
        form1: {
          riskDesc: '',
          firstJudge: ''
        },
        rules1: {
          riskDesc: [{required: true, message: "请输入风险描述", trigger: 'blur'}],
          firstJudge: [{required: true, message: "请选择初判结果", trigger: 'blur'}]
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
      }
    },
    methods: {
      addRisk () {
        this.dialogState = true
        this.editState = false
        this.form = this.resetForm
      },
      chooseTime(item, index) {
        if (index == this.chooseIndex) {
          this.chooseIndex = -1
          this.btnValue = ''
        } else {
          this.chooseIndex = index
          this.btnValue = item.value
        }
      },
      handleCurrentChange() {},
      initMap () {
        var map = new BMap.Map("map");// 创建地图实例 
        var point = new BMap.Point(116.404, 39.915); // 创建点坐标
        map.centerAndZoom(point, 15);
        var pt = new BMap.Point(116.417, 39.909);
        var myIcon = new BMap.Icon(require("../../assets/logo.png"), new BMap.Size(130,130), {
          imageSize: new BMap.Size(130,130)
        });
        var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注            
        map.addOverlay(marker2);
        map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
      },
      closeMap () {
        var map = new BMap.Map("map");// 创建地图实例 
        map.clearOverlays();    
      },
      reset() {
        this.bridgeName = ''
        this.managerUnit = ''
        this.riskLevel = ''
        this.cardNumber = ''
        this.location = ''
      },
      historyDel () {
        this.$router.push("/home/risk/historyDelete")
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
    .map-dialog {
      #mapcontainer {
        width: 100%;
        height: 352px;
        #map {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
