<template>
  <div class="container3">
    <div class="top-bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="default">风险管控</el-breadcrumb-item>
        <el-breadcrumb-item class="text">信息摘要</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="information">
      <div class="onebox" v-for="(item, index) in boxList" :key="index">
        <div class="box-top" :style="{backgroundColor:item.color}"></div>
        <div class="box-bottom">
          <div class="data">{{item.data}}</div>
          <div class="line">
            <img :src="item.image" alt>
            <div class="name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="echart-notice">
      <div class="echart-con">
        <div class="echart echart-little">
          <div class="title">重点关注桥梁</div>
          <div id="echart1" class="s-echart"></div>
        </div>
        <div class="echart echart-little">
          <div class="title">总体风险等级</div>
          <div id="echart2" class="s-echart"></div>
        </div>
        <div class="echart echart-little">
          <div class="title">总体预警等级</div>
          <div id="echart3" class="s-echart"></div>
        </div>
        <div class="echart echart-little">
          <div class="title">总体风险评估</div>
          <div id="echart4" class="s-echart"></div>
        </div>
        <div class="echart echart-big">
          <div class="title">总体风险类型</div>
          <div id="echart5" class="s-echart"></div>
        </div>
      </div>
      <div class="notice">
        <div class="notice-top">告示牌</div>
        <div class="list" v-for="(item, index) in boxList" :key="index">
          <div class="title">
            <div class="title-em">【重要】</div>
            <div>左江大桥因出现重大隐患，系统自动预警,进行第二行显示的测试</div>
          </div>
          <div class="time">2019-03-05 11:00:59</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      boxList: [
        {
          color: "#F56C6C",
          image: require("../../assets/image/info1.png"),
          name: "总风险源",
          data: 80
        },
        {
          color: "#F29C1A",
          image: require("../../assets/image/info2.png"),
          name: "未消除风险源",
          data: 80
        },
        {
          color: "#3AC27E",
          image: require("../../assets/image/info3.png"),
          name: "已消除风险源",
          data: 80
        },
        {
          color: "#467DEC",
          image: require("../../assets/image/info4.png"),
          name: "总风险事件",
          data: 80
        },
        {
          color: "#F29C1A",
          image: require("../../assets/image/info5.png"),
          name: "未处置风险事件",
          data: 80
        },
        {
          color: "#3AC27E",
          image: require("../../assets/image/info6.png"),
          name: "已归档风险事件",
          data: 80
        }
      ]
    };
  },
  mounted() {
    this.draw1();
    this.draw2();
    this.draw3();
    this.draw4();
    this.draw5();
  },
  methods: {
    draw1() {
      console.log(this.$echarts);
      var echarts = this.$echarts;
      let myChart = this.$echarts.init(document.getElementById("echart1"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        //设置柱子的宽度
        barWidth: 43,
        xAxis: {
          data: ["重点关注", "非重点关注"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: [20, 25],
            itemStyle: {
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function(params) {
                  //我这边就两个柱子，大体就两个柱子颜色渐变，所以数组只有两个值，多个颜色就多个值
                  var colorList = [
                    ["#7CBBF5", "#188DF0"],
                    ["#FF860C","#F83636"]
                  ];
                  var index = params.dataIndex;
                  if (params.dataIndex >= colorList.length) {
                    index = params.dataIndex - colorList.length;
                  }
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: colorList[index][0] },
                    { offset: 1, color: colorList[index][1] }
                  ]);
                },
                label: {
                  show: false
                }
              }
            }
          }
        ]
      });
    },
    draw2() {
      console.log(this.$echarts);
      var echarts = this.$echarts;
      let myChart = this.$echarts.init(document.getElementById("echart2"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        //设置柱子的宽度
        barWidth: 20,
        xAxis: {
          data: ["Ⅰ级", "Ⅱ级", "Ⅲ级", "Ⅳ级"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: [11, 12, 13, 15],
            itemStyle: {
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function(params) {
                  //我这边就两个柱子，大体就两个柱子颜色渐变，所以数组只有两个值，多个颜色就多个值
                  var colorList = [
                    ["#188DF0", "#7CBBF5"],
                    ["#53E7FF", "#63ACFF"],
                    ["#FFDF0C", "#FF870E"],
                    ["#F83636", "#FF860C"]
                  ];
                  var index = params.dataIndex;
                  if (params.dataIndex >= colorList.length) {
                    index = params.dataIndex - colorList.length;
                  }
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: colorList[index][0] },
                    { offset: 1, color: colorList[index][1] }
                  ]);
                },
                label: {
                  show: false
                }
              }
            }
          }
        ]
      });
    },
    draw3() {
      var echarts = this.$echarts;
      let myChart = this.$echarts.init(document.getElementById("echart3"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        //设置柱子的宽度
        barWidth: 20,
        xAxis: {
          data: ["Ⅰ级", "Ⅱ级", "Ⅲ级", "Ⅳ级"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: [11, 12, 13, 15],
            itemStyle: {
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function(params) {
                  //我这边就两个柱子，大体就两个柱子颜色渐变，所以数组只有两个值，多个颜色就多个值
                  var colorList = [
                    ["#188DF0", "#7CBBF5"],
                    ["#53E7FF", "#63ACFF"],
                    ["#FFDF0C", "#FF870E"],
                    ["#F83636", "#FF860C"]
                  ];
                  var index = params.dataIndex;
                  if (params.dataIndex >= colorList.length) {
                    index = params.dataIndex - colorList.length;
                  }
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: colorList[index][0] },
                    { offset: 1, color: colorList[index][1] }
                  ]);
                },
                label: {
                  show: false
                }
              }
            }
          }
        ]
      });
    },
    draw4() {
      console.log(this.$echarts);
      var echarts = this.$echarts;
      let myChart = this.$echarts.init(document.getElementById("echart4"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        //设置柱子的宽度
        barWidth: 43,
        xAxis: {
          data: ["风险估测", "风险发生"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: [10, 15],
            itemStyle: {
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function(params) {
                  //我这边就两个柱子，大体就两个柱子颜色渐变，所以数组只有两个值，多个颜色就多个值
                  var colorList = [
                    ["#70FCE9", "#40CF91"],
                    ["#F83636","#FF860C"]
                  ];
                  var index = params.dataIndex;
                  if (params.dataIndex >= colorList.length) {
                    index = params.dataIndex - colorList.length;
                  }
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: colorList[index][0] },
                    { offset: 1, color: colorList[index][1] }
                  ]);
                },
                label: {
                  show: false
                }
              }
            }
          }
        ]
      });
    },
    draw5() {
      console.log(this.$echarts);
      var echarts = this.$echarts;
      let myChart = this.$echarts.init(document.getElementById("echart5"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        //设置柱子的宽度
        barWidth: 20,
        xAxis: {
          data: ["类型Ⅰ", "类型Ⅱ", "类型Ⅲ", "类型Ⅳ", "类型Ⅴ", "类型Ⅵ"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: [11, 12, 13, 15, 3, 11],
            itemStyle: {
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function(params) {
                  //我这边就两个柱子，大体就两个柱子颜色渐变，所以数组只有两个值，多个颜色就多个值
                  var colorList = [
                    ["#70FCE9", "#40CF91"],
                    ["#6453FF", "#A163FF"],
                    ["#53E7FF", "#63ACFF"],
                    ["#53E7FF", "#50FF79"],
                    ["#FFDF0C", "#FF870E"],
                    ["#F83636", "#FF860C"],
                  ];
                  var index = params.dataIndex;
                  if (params.dataIndex >= colorList.length) {
                    index = params.dataIndex - colorList.length;
                  }
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: colorList[index][0] },
                    { offset: 1, color: colorList[index][1] }
                  ]);
                },
                label: {
                  show: false
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/common.less";
.container3 {
  .information {
    width: 100%;
    min-height: 132px;
    box-sizing: border-box;
    padding-left: 72px;
    display: flex;
    flex-wrap: wrap;
    .onebox {
      width: 236px;
      height: 132px;
      background-color: white;
      margin-left: 30px;
      .box-top {
        width: 100%;
        height: 4px;
      }
      .box-bottom {
        width: 100%;
        height: calc(100% - 4px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .data {
          color: #303133;
          font-size: 40px;
          font-weight: bold;
        }
        .line {
          width: 100%;
          height: 20px;
          margin-top: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 20px;
            height: 20px;
          }
          .name {
            color: @fontColor;
            font-size: 14px;
            margin-left: 5px;
          }
        }
      }
    }
  }
  .echart-notice {
    width: 100%;
    box-sizing: border-box;
    padding-left: 86px;
    margin-top: 13px;
    display: flex;
    flex-wrap: wrap;
    .echart-con {
      width: 1158px;
      display: flex;
      flex-wrap: wrap;
      .echart {
        margin-left: 16px;
        margin-top: 17px;
        background: white;
        // box-shadow: 0px 3px 6px #A1A1A1;
        .title {
          width: 100%;
          height: 46px;
          line-height: 46px;
          background-color: #7ca2ee;
          font-size: 18px;
          font-weight: bold;
          padding-left: 20px;
          box-sizing: border-box;
          color: white;
          text-align: left;
        }
        .s-echart {
          width: 100%;
          height: calc(100% - 46px);
        }
      }
      .echart-little {
        width: 370px;
        height: 292px;
      }
      .echart-big {
        width: 756px;
        height: 292px;
      }
    }
    .notice {
      margin-top: 17px;
      margin-left: 16px;
      width: 406px;
      height: 600px;
      background: white;
      overflow-y: auto;
      // box-shadow: 0px 3px 6px #A1A1A1;
      .notice-top {
        width: 100%;
        height: 46px;
        line-height: 46px;
        background-color: #7ca2ee;
        font-size: 18px;
        font-weight: bold;
        padding-left: 20px;
        box-sizing: border-box;
        color: white;
        text-align: left;
      }
      .list {
        width: 100%;
        padding: 20px 22px 17px 22px;
        border-bottom: #f2f6fc 1px solid;
        box-sizing: border-box;
        .title {
          text-align: left;
          color: @fontColor;
          font-size: 14px;
          display: flex;
          .title-em {
            min-width: 66px;
            font-size: 16px;
            font-weight: bold;
          }
        }
        .time {
          color: #c0c4cc;
          text-align: left;
          margin-top: 6px;
          margin-left: 6px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
