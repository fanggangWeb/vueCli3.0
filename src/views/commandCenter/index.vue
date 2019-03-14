<template>
  <div class="container3">
    <div class="map-container">
      <div id="map"></div>
      <div class="fold foldout fold-left-out" v-show="!leftShow" @click="leftShow=!leftShow"></div>
      <div class="fold foldin fold-left" v-show="leftShow" @click="leftShow=!leftShow"></div>
      <div class="left-bar" v-show="leftShow">
        <el-input v-model="keyValue" type="text" style="margin-bottom:20px" placeholder="搜索关键字">
          <template slot="append" style="cursor:pointer;">搜索</template>
        </el-input>
        <div class="title-con">
          <div class="title">处置简介</div>
          <div class="text" @click="handle">处置</div>
        </div>
        <div class="line">
          <div class="key">事件名称</div>
          <div class="value">长江大桥的某事件</div>
        </div>
        <div class="line">
          <div class="key">发生时间</div>
          <div class="value">2019-10-11 09:12</div>
        </div>
        <div class="line">
          <div class="key">预计持续时间</div>
          <div class="value">30分钟</div>
        </div>
        <div class="line">
          <div class="key">事件影响范围</div>
          <div class="value">6千米</div>
        </div>
        <div class="bg"></div>
        <div class="title-con">
          <div class="title">预案</div>
        </div>
      </div>
      <div class="fold foldout-right fold-right-out" v-show="!rightShow" @click="rightShow=!rightShow"></div>
      <div class="fold foldin-right fold-right" v-show="rightShow" @click="rightShow=!rightShow"></div>
      <div class="right-bar"  v-show="rightShow">
        <div class="title">应急物资</div>
        <el-checkbox-group v-model="checkedBox" @change="chooseSelect">
          <el-checkbox v-for="city in cities" :label="city.id" :key="city.id">
            <img style="width:16px;height:18px;position:relative;top:5px;" src="../../assets/image/mapicon.png"/>{{city.name}}
            </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>
<script>
let map,that
export default {
  data () {
    return {
      keyValue: '',
      leftShow: true,
      rightShow: true,
      checkedBox: [1, 2],
      cities: [{name:'专家库',id: 1}, {name: '物资装备',id: 2}, {name: '救援队伍',id: 3}, {name: '储备库', id: 4}, {name: '预案库', id: 5}, {name: '法规库', id: 6}, {name:'案例库', id: 7}],
      videoList: [
        {src: require("../../assets/image/144117180.mp4")},
        {src: require("../../assets/image/144117180.mp4")},
        {src: require("../../assets/image/144117180.mp4")},
        {src: require("../../assets/image/144117180.mp4")},
      ]
    }
  },
  mounted () {
    that = this
    map = new BMap.Map("map") // 创建地图实例 
    this.initMap()
    
  },
  methods: {
    initMap () {
      var point = new BMap.Point(116.404, 39.915); // 创建点坐标
      map.centerAndZoom(point, 15);
      var pt = new BMap.Point(116.417, 39.909);
      var myIcon = new BMap.Icon(require("../../assets/image/mapicon.png"), new BMap.Size(27,33), {
        imageSize: new BMap.Size(27,33)
      });
      var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注            
      map.addOverlay(marker);
      map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
      var html = ''
      that.videoList.forEach(e => {
        html+=`<div class="video">
              <video src="${e.src}" controls="controls"></video>
            </div>`
      })
      var sContent =
        `<div class="info-window">
          <div class="info-top">
            <div class="text">桥梁信息</div>
            <div class="box-con">
              <div class="box active" data-index="1">基本信息</div>
              <div class="box" data-index="2">视频信息</div>
            </div>
          </div>
          <div class="info-bottom info-bottom1">
            <div class="line">
              <div class="key">桥梁名称</div><div class="value">朝天门大桥</div><div class="key">管理单位</div><div class="value">某某局</div>
            </div>
            <div class="line">
              <div class="key">当前进口流量</div><div class="value">50</div><div class="key">收费性质</div><div class="value">50</div>
            </div>
            <div class="line">
              <div class="key">历史进口流量</div><div class="value">50</div><div class="key">当前出口流量</div><div class="value">50</div>
            </div>
            <div class="line">
              <div class="key">当前平均流量</div><div class="value">50</div><div class="key">历史出口流量</div><div class="value">50</div>
            </div>
            <div class="line">
              <div class="key">天气情况</div><div class="value">50</div><div class="key">历史平均流量</div><div class="value">50</div>
            </div>
          </div>
          <div class="info-bottom info-bottom2">
            ${html}
          </div>
        </div>`;
      var infoWindow = new BMap.InfoWindow(sContent); // 创建信息窗口对象      
      marker.addEventListener("click", function(){          
        this.openInfoWindow(infoWindow);
        $(".info-bottom2").hide()
        $('.box').on('click',function () { // 切换信息窗口和视频窗口
          var index = $(this).data('index')
          $(this).addClass('active').siblings().removeClass('active')
          infoWindow.redraw()
          if (index == 1) {
            $(".info-bottom2").hide()
            $(".info-bottom1").show()
          } else {
            $(".info-bottom1").hide()
            $(".info-bottom2").show()
          }
        })
      });
    },
    closeMap () {
      map.clearOverlays()
    },
    chooseSelect () {
      var mapPoints = [
        {x:30.312903, y:120.382029},
        {x:30.215855, y:120.024568},
        {x:30.18015, y:120.174968},
        {x:30.324994, y:120.164399},
        {x:30.24884, y:120.305074}
      ]
      // 函数 创建多个标注
      function markerFun (points) {
        var markers = new BMap.Marker(points)
        map.addOverlay(markers)
      }
      for (var i = 0;i < mapPoints.length; i++) {
        var points = new BMap.Point(mapPoints[i].y,mapPoints[i].x) // 创建坐标点
        markerFun(points)
      }
    },
    handle () {
      this.$router.push("/home/emergency/eventHandle")
    }
  },
  updated () {
    
  }
}
</script>
<style lang="less">
  .right-bar {
    .el-checkbox-group {
      text-align: left;
      .el-checkbox {
        width: 110px;
        margin-bottom: 20px;
        margin-right: 5px;
      }
    }
  }
  .info-window {
    width: 423px;
    margin-right: 13px;
    // height: 290px;
    // background: red;
    border: 1px solid #f6f6f6;
    // box-shadow: 0px 0px 6px #C9C9C9;
    .info-top {
      width: 100%;
      height: 45px;
      background: #F6F6F6;
      display: flex;
      align-items: center;
      .text {
        color: #4D4D4D;
        font-size: 16px;
        font-weight: bold;
        margin-left: 21px;
      }
      .box-con {
        margin-left: auto;
        margin-right: 15px;
        width: 116px;
        height: 25px;
        line-height: 25px;
        display: flex;
        font-size: 10px;
        .box {
          width: 50%;
          height: 100%;
          box-sizing: border-box;
          text-align: center;
          color: white;
          color: #467DEC;
          background: #BFD5FF;
          border: 1px #6998F1 solid;
          cursor: pointer;
        }
        .active {
          color: white;
          background: #6998F1;
        }
      }
    }
    .info-bottom1 {
      
    }
    .info-bottom {
      width: 100%;
      box-sizing: border-box;
      padding: 25px 14px 20px 16px;
      background: white;
      .line {
        width: 100%;
        height: 38px;
        font-size: 12px;
        display: flex;
        text-align: center;
        .key {
          width: 201px;
          line-height: 38px;
          height: 100%;
          background: #F1F1F1;
          color: #909399;
          box-sizing: border-box;
          border: 0.5px solid #E8E8E8;
        }
        .value {
          width: 201px;
          height: 100%;
          background: #F8F8F8;
          color: #4D4D4D;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          border: 0.5px solid #E8E8E8;
        }
      }
    }
    .info-bottom2 {
      display: flex;
      max-height: 345px;
      padding: 16px 10px 10px 10px;
      flex-wrap: wrap;
      overflow: auto;
      .video {
        width: 48%;
        height: 140px;
        margin-right: 1%;
        margin-bottom: 10px;
        video {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
<style lang="less" scoped>
  @import "../../assets/css/common.less";
  // 侧边栏的折叠和延伸统一样式集合
  .fold {
    width: 35px;
    height: 100px;
    background-size: 100% 100%;
  }
  .foldin, .foldin-right {
    background-image: url("../../assets/image/foldinicon.png");
  }
  .foldout, .foldout-right {
    background-image: url("../../assets/image/foldouticon.png");    
  }
  .foldin-right {
    // background-image: url("../../assets/image/foldinrighticon.png");
    transform:rotate(180deg);
  }
  .foldout-right {
    // background-image: url("../../assets/image/foldinrighticon.png");
    transform:rotate(180deg);
  }
  .container3 {
    width: 100%;
    height: 100%;
    background: white;
    position: relative;
    .map-container {
      width: 100%;
      height: 100%;
      #map {
        width: 100%;
        height: 100%;
      }
    }
    .fold-left {
      position: absolute;
      top: calc(50% - 60px);
      left: 432px;
    }
    .fold-left-out {
      position: absolute;
      top: calc(50% - 60px);
      left: 0px;
    }
    .fold-right {
      position: absolute;
      top: 56px;
      right: 409px;
    }
    .fold-right-out {
      position: absolute;
      top: 56px;
      right: 0px;
    }
    .left-bar {
      position: absolute;
      width: 432px;
      height: 100%;
      overflow-y: auto;
      background: white;
      top: 0;
      left: 0;
      box-sizing: border-box;
      border-top: solid 1px #F1F2F5;
      box-shadow: 0px 3px 6px #AFAFAF;
      padding: 30px 26px 28px 26px;
      .bg {
        width: 100%;
        height: 1px;
        background:  #E1E1E1;
        margin: 25px 0 16px 0;
      }
      .title-con {
        width: 100%;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        .title {
          font-weight: bold;
          color: #4D4D4D;
          font-size: 18px;
        }
        .text {
          color: #467DEC;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .line {
        width: 100%;
        height: 50px;
        display: flex;
        div {
          height: 100%;
          border: 1px solid #ECECEC;
          font-size: 13px;
          box-sizing: border-box;
        }
        .key {
          text-align: left;
          padding-left: 10px;
          width: 35%;
          line-height: 50px;
          background: #F1F1F1;
          color: #909399;
        }
        .value {
          width: 65%;
          padding-right: 10px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          background: #F6F6F6;
          color: #303133;
        }
      }
    }
    .right-bar {
      position: absolute;
      right: 0px;
      top:0px;
      width: 409px;
      min-height: 232px;
      box-sizing: border-box;
      padding: 28px 25px;
      background: white;
      border-top: solid 1px #F1F2F5;
      box-shadow: 0px 3px 6px #AFAFAF;
      padding: 30px 26px 28px 26px;
      .title {
        text-align: left;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 25px;
      }
    }
  }
</style>