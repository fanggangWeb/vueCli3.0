<template>
  <div class="container3">
    <div class="top-bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="default">应急指挥</el-breadcrumb-item>
        <el-breadcrumb-item to="/home/emergency/command" class="default">指挥调度</el-breadcrumb-item>
        <el-breadcrumb-item class="text">处置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-button type="primary" style="margin: 0px 0 20px 66px;" @click="dialogState = true">发送预警</el-button>
    <div class="content">
      <div class="detail-con">
        <div class="top">
          <div class="icon"></div>
          <div class="title">事件处置</div>
        </div>
        <div class="center">
          <div class="info">
            <el-row class="info-line">
              <el-col class="key" :span="4">编号:</el-col>
              <el-col class="value" :span="8">YJ001</el-col>
              <el-col class="key" :span="4">预警标题:</el-col>
              <el-col class="value" :span="8">清水河桥桥面结冰</el-col>
            </el-row>
            <el-row class="info-line">
              <el-col class="key" :span="4">桥梁名称:</el-col>
              <el-col class="value" :span="8">清水河桥</el-col>
              <el-col class="key" :span="4">管养单位:</el-col>
              <el-col class="value" :span="8">成华区交通局</el-col>
            </el-row>
            <el-row class="info-line">
              <el-col class="key" :span="4">预警类型:</el-col>
              <el-col class="value" :span="8">人工录入</el-col>
              <el-col class="key" :span="4">预警来源:</el-col>
              <el-col class="value" :span="8">公众来电</el-col>
            </el-row>
            <el-row class="info-line">
              <el-col class="key" :span="4">事件列席:</el-col>
              <el-col class="value" :span="8">自然灾害——结冰</el-col>
              <el-col class="key" :span="4">预警时间:</el-col>
              <el-col class="value" :span="8">2019-03-21 11:11:11</el-col>
            </el-row>
            <el-row class="info-line">
              <el-col class="key" :span="4">预估受伤人数:</el-col>
              <el-col class="value" :span="8">10人</el-col>
              <el-col class="key" :span="4">经济损失:</el-col>
              <el-col class="value" :span="8">10万元</el-col>
            </el-row>
            <el-row class="info-line">
              <el-col class="key" :span="4">预估死亡人数:</el-col>
              <el-col class="value" :span="8">0人</el-col>
              <el-col class="key" :span="4">预警等级:</el-col>
              <el-col class="value" :span="8">II级</el-col>
            </el-row>
          </div>
          <div class="range">
            <div class="title">预计影响范围(KM):</div>
            <el-input v-model="rangeValue" placeholder="请输入数字" @change="getCircle" @blur="getCircle"></el-input>
          </div>
          <div class="range">
            <div class="title">预警预案</div>
            <el-row v-for="(one,index) in planList" class="row" :key="index">
              <el-col :span="6">
                <el-select class="little-space" v-model="one.plan" style="width:100%"  clearable filterable placeholder="请选择预警类型">
                  <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :offset="1" :span="12">
                <el-select class="little-space" v-model="one.person" style="width:100%" multiple clearable filterable placeholder="选择人员">
                  <el-option v-for="item in bridgeNameList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :offset="1" :span="3" v-if="index == 0">
                <el-button type="primary" plain @click="addPlan">添加</el-button>
              </el-col>
              <el-col :offset="1" :span="3" v-if="index !== 0">
                <el-button type="danger" plain @click="delPlan(index)">删除</el-button>
              </el-col>
            </el-row>
            <el-button type="primary" style="margin-top:12px;">处置</el-button>
          </div>
        </div>
      </div>
      <div class="map-con">
        <div id="map"></div>
      </div>
    </div>
    <div class="process">
      <div class="top">
        <div class="icon"></div>
        <div class="title">事件处置状态</div>
      </div>
      <div class="bottom">
        <div class="box" :class="{'wait':item.state == 1}" v-for="(item,index) in processList" :key="index">
          <div class="single" :style="{'backgroundColor':item.color}">{{item.single}}</div>
          <div class="type">{{item.type}}</div>
          <div class="desc">{{item.desc}}</div>
          <div class="date">{{item.date}}</div>
        </div>
      </div>
    </div>
    <el-dialog
      title="信息发送"
      :close-on-click-modal="false"
      :visible.sync="dialogState"
      width="54%"
      class="warning-dialog"
      center>
      <div class="early-warn">
        <div class="left">
          <div class="top">
            <el-input v-model="filterText" size="small" clearable placeholder="关键词搜索"/>
          </div>
          <div class="bottom">
            <el-tree
              show-checkbox
              class="filter-tree"
              :data="departmentList"
              node-key="id"
              highlight-current
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              @check-change="getChecked"
              ref="tree">
            </el-tree>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <div class="call">
              <img src="../../assets/image/phonecall.png" alt="">
              <div class="text">语音电话</div>
            </div>
            <div class="call">
              <img src="../../assets/image/videocall.png" alt="">
              <div class="text">视频电话</div>
            </div>
          </div>
          <div class="center">
            <el-input type="textarea" v-model="warnText" :rows="5" placeholder="请输入信息的内容"/>
            <el-button type="success" style="margin-top:15px;">发送消息</el-button>
          </div>
          <div class="bottom">
            <div class="title">发送方式：</div>
            <el-checkbox-group v-model="checkedBox" @change="chooseSelect">
              <el-checkbox v-for="city in cities" :label="city.id" :key="city.id">
                {{city.name}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="dialogState = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  let map,that
  export default {
    data() {
      return {
        rangeValue: "",
        planList: [{plan: "", person: []}],
        checkedBox: [1],
        cities: [{name:'短信/邮件',id: 1}, {name: '情报板',id: 2}],
        bridgeNameList: [{
          label: '某个大桥',
          value: 1
        }, {
          label: '朝天门大桥',
          value: 2
        }],
        processList: [
          {
            single: "报",
            type: "已上报",
            color: "#F5CC5A",
            desc: "由成华区第三维护组 李强 前往现在进行风险确认",
            date: "2019-03-01 12:00"
          },
          {
            single: "报",
            type: "已上报",
            color: "#F5CC5A",
            desc: "由成华区第三维护组 李强 前往现在进行风险确认",
            date: "2019-03-01 12:00"
          },
          {
            single: "报",
            type: "已上报",
            color: "#F5CC5A",
            desc: "由成华区第三维护组 李强 前往现在进行风险确认",
            date: "2019-03-01 12:00"
          },
          {
            single: "审",
            state: 1,
            type: "待核实",
            color: "#F16980",
            desc: "由成华区第三维护组 李强 前往现在进行风险确认",
            date: "2019-03-01 12:00"
          }
        ],
        dialogState: false,
        filterText: "",
        departmentList: [{
          id: 1,
          label: '总部',
          children: [{
            id: 4,
            label: '行政部门',
            children: [{
              id: 9,
              label: '周伟'
            }, {
              id: 10,
              label: '胡歌'
            }]
          }, {
            id: 2,
            label: "后勤部门",
            children: [{
              id: 9,
              label: '周伟'
            }, {
              id: 10,
              label: '胡歌'
            }]
          }, {
            id: 3,
            label: "应急部门",
            children: [{
              id: 9,
              label: '周伟'
            }, {
              id: 10,
              label: '胡歌'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        warnText: ''
      }
    },
    mounted() {
      that = this
      map = new BMap.Map("map") // 创建地图实例 
      this.initMap()
      this.eventMaker()
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      getCircle () {
        console.log(this.rangeValue)
        if (isNaN(this.rangeValue)) {
          this.ME("请输入数字")
          this.rangeValue = ""
        }
        map.clearOverlays()
        this.eventMaker()
        var point = new BMap.Point(116.404, 39.915); // 创建点坐标
        var circle = new BMap.Circle(point,this.rangeValue*1000);
        circle.setFillColor("#F57F7F"); //填充颜色
        circle.setStrokeColor("#FF0000"); //边线颜色
        circle.setStrokeWeight("2")
        map.addOverlay(circle)
      },
      addPlan () {
        var obj = {
          plan: "",
          person: []
        }
        this.planList.push(obj)
      },
      eventMaker () {
        var point = new BMap.Point(116.404, 39.915); // 创建点坐标
         var myIcon = new BMap.Icon(require("../../assets/image/mapicon.png"), new BMap.Size(27,33), {
          imageSize: new BMap.Size(27,33)
        })
        var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注            
        map.addOverlay(marker);
        var html = ''
        var src1 = require("../../assets/image/phonecall.png")
        var src2 = require("../../assets/image/videocall.png")
        var sContent =
          `<div class="handle-window">
            <div class="top">杨党朋</div>
            <div class="bottom">
              <div class="bottom-item phonecall bottom-left">
                <img src="${src1}"/>
              </div>
              <div class="bottom-item videocall bottom-right">
                <img src="${src2}"/>
              </div>
            </div>
          </div>`
        var infoWindow = new BMap.InfoWindow(sContent) // 创建信息窗口对象  
        marker.addEventListener("click", function(){          
          this.openInfoWindow(infoWindow);
          that.phonecall()
        })
      },
      phonecall () {
        $(".handle-window").on("click", ".phonecall", function () {
          that.MS("语音通话")
        })
        $(".handle-window").on("click", ".videocall", function () {
          that.MS("视频通话")
        })
      },
      initMap () {
        var point = new BMap.Point(116.404, 39.915); // 创建点坐标
        map.centerAndZoom(point, 15);
        var pt = new BMap.Point(116.417, 39.909);
        var myIcon = new BMap.Icon(require("../../assets/image/mapicon.png"), new BMap.Size(27,33), {
          imageSize: new BMap.Size(27,33)
        });
        var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注            
        map.addOverlay(marker);
        map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
      },
      delPlan (index) {
        this.planList.splice(index,1)
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      chooseSelect () {},
      getChecked () {
        console.log(this.$refs.tree.getCheckedKeys())
      }
    }
  };
</script>
<style lang="less">
// 地图上的信息窗口样式
.handle-window {
  width: 200px;
  height: 93px;
  .top {
    width: 100%;
    height: 48px;
    font-weight: bold;
    line-height: 48px;
    font-size: 18px;
    text-align: center;
    box-sizing: border-box;
    background: white;
    border: #EBEBEB 1px solid;
    border-bottom: none;
  }
  .bottom {
    width: 100%;
    height: 45px;
    box-sizing: border-box;
    background: white;
    display: flex;
    flex-wrap: nowrap;
    .bottom-item {
      flex: 1;
      box-sizing: border-box;
      border: #EBEBEB 1px solid;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 26px;
        height: 26px;
      }
    }
    .bottom-left {
      border-right: none;
    }
    .bottom-right {
    }
  }
}
</style>
<style lang="less" scoped>
  @import "../../assets/css/common.less";
  .container3 {
    color: @fontColor;
    text-align: left;
    .content {
      margin-left: 66px;
      display:flex;
      flex-wrap: wrap;
      .detail-con {
        width: 826px;
        max-width: 85%;
        box-sizing: border-box;
        background: white;
        padding: 24px 0 0px 0px;
        margin-right: 14px;
        margin-bottom: 15px;
        .top {
          width: 100%;
          height: 28px;
          color: #4D4D4D;
          line-height: 28px;
          display: flex;
          .icon {
            width: 8px;
            height: 100%;
            background: @mainBlue;
            margin-right: 47px;  
          }
          .title {
            font-size: 20px;
            font-weight: bold;
          }
        }
        .center {
          width: 100%;
          box-sizing: border-box;
          padding: 0px 36px 20px 54px;
          .info {
            width: 100%;
            box-sizing: border-box;
            padding: 26px 0 26px 0;
            border-bottom: 1px dotted #E4E7ED;
            .info-line {
              text-align: left;
              margin-bottom: 18px;
              .key {
                color: #909399;
                font-size: 15px;
              }
              .value {
                color: @fontColor;
                font-size: 15px;
              }
            }
            .info-line:last-child {
              margin-bottom: 0px;
            }
          }
          .range {
            width: 100%;
            box-sizing: border-box;
            padding: 26px 0 26px 0;
            border-bottom: 1px dotted #E4E7ED;
            .title {
              font-size: 15px;
              color: #303133;
              font-weight: bold;
            }
            .el-input {
              margin-top: 12px;
            }
            .row {
              margin-top: 12px;
            }
          }
          
        }
      }
      .map-con {
        width: 712px;
        height: 597px;
        background: white;
        box-sizing: border-box;
        border: 1px solid #C8C8C8;
        #map {
          width: 100%;
          height: 100%;
        }
      }
    }
    .process {
      margin-left: 66px;
      width: 1552px;
      max-width: 90%;
      box-sizing: border-box;
      padding: 24px 0 0 0;
      background: white;
      .top {
        width: 100%;
        height: 28px;
        color: #4D4D4D;
        line-height: 28px;
        display: flex;
        .icon {
          width: 8px;
          height: 100%;
          background: @mainBlue;
          margin-right: 47px;  
        }
        .title {
          font-size: 20px;
          font-weight: bold;
        }
      }
      .bottom {
        width: 100%;
        margin-top: 24px;
        padding-left: 59px;
        display: flex;
        flex-wrap: wrap;
        .box {
          width: 256px;
          height: 185px;
          background: #F5F7FA;
          margin-bottom: 24px;
          margin-right: 40px;
          text-align: left;
          box-sizing: border-box;
          padding: 12px 18px 16px 18px;
          border: 1px solid #E4E7ED;
          .single {
            width: 44px;
            height: 44px;
            border-radius: 44px;
            text-align: center;
            line-height: 44px;
            color: white;
            font-size: 16px;
          }
          .type {
            font-size: 16px;
            color: #4d4d4d;
            margin-top: 10px;
          }
          .desc {
            margin-top: 10px;
            height: 60px;
            color: #8B8B8B;
            font-size: 14px;
            line-height: 20px;
          }
          .date {
            margin-top: 5px;
            color: #C0C4CC;
            font-size: 12px;
          }
        }
        .wait {
          background: #FFFFFF;
          border: #E4E7ED 1px solid;
          .type {
            color: #A2A2A2;
          }
          .desc {
            color: #CBCBCB;
          }
        }
      }
    }
    .warning-dialog {
      .early-warn {
        width: 100%;
        height: 520px;
        box-sizing: border-box;
        border: 1px solid #EEEEEE;
        display: flex;
        .left,.right {
          box-sizing:border-box;
          .top {
            width: 100%;
            height: 54px;
            background: #EEEEEE;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 0 15px;
          }
          .bottom {
            width: 100%;
            height: calc(100% - 54px);
            box-sizing: border-box;
            padding: 15px 15px;
            overflow-y: auto;
          }
        }
        .left {
          width: 25%;
          border-right: 1px solid #E4E7ED;
        }
        .right {
          width: 75%;
          .top {
            justify-content: flex-start;
            .call {
              height: 35px;
              box-sizing: border-box;
              padding: 0 13px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: white;
              border-radius: 4px;
              margin-right: 5px;
              cursor: pointer;
              img {
                width: 23px;
                height: 23px;
              }
              .text {
                margin-left: 5px;
              }
            }
          }
          .center {
            width: 100%;
            height: 380px;
            border-bottom: 1px #ECECEC solid;
            box-sizing: border-box;
            padding: 15px 15px;
          }
          .bottom {
            width: 100%;
            height: 86px;
            box-sizing: border-box;
            padding: 15px;
            .title {
              color: #303133;
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
</style>
