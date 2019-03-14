<template>
  <div class="container3">
    <div class="top-bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="default">风险管控</el-breadcrumb-item>
        <el-breadcrumb-item to="/home/risk/file" class="default">归档</el-breadcrumb-item>
        <el-breadcrumb-item class="text">详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="detail-con">
        <div class="top">
          <div class="icon"></div>
          <div class="title">事件处置</div>
        </div>
        <div class="center">
          <div class="info">
            <el-row class="info-line">
              <el-col class="key" :span="4">风险源名称:</el-col>
              <el-col class="value" :span="8">朝天门大桥</el-col>
              <el-col class="key" :span="4">估测可能性:</el-col>
              <el-col class="value" :span="8">清水河桥桥面结冰</el-col>
            </el-row>
            <el-row class="info-line">
              <el-col class="key" :span="4">风险源症状:</el-col>
              <el-col class="value" :span="8">自然灾害类</el-col>
              <el-col class="key" :span="4">风险等级:</el-col>
              <el-col class="value" :span="8">成华区交通局</el-col>
            </el-row>
            <el-row class="info-line">
              <el-col class="key" :span="4">风险源详情:</el-col>
              <el-col class="value" :span="8">极寒天气导致桥面面裂开</el-col>
              <el-col class="key" :span="4">上报人:</el-col>
              <el-col class="value" :span="8">张三</el-col>
            </el-row>
            <el-row class="info-line">
              <el-col class="key" :span="4">潜在风险事故:</el-col>
              <el-col class="value" :span="8">坍塌,火灾</el-col>
              <el-col class="key" :span="4">预估人员伤亡::</el-col>
              <el-col class="value" :span="8">10人</el-col>
            </el-row>
            <el-row class="info-line">
              <el-col class="key" :span="4">预估经济损失:</el-col>
              <el-col class="value" :span="8">100万</el-col>
              <el-col class="key" :span="4">上传时间:</el-col>
              <el-col class="value" :span="8">2018-11-26 11:11:00</el-col>
            </el-row>
          </div>
          <div class="reason">
            <div class="title">评估理由:</div>
            <div class="text">职位评价(postevaluation)也称工作评价(jobevaluation)，就是根据各职位对组织目标的贡献，通过专门的技术和程序对组织中的各个职位的价值进行综合比较，确定组织中各个职位的相对价值差异。它是薪酬级别设计的基础。职位评价(iobevaluation)就是根据各职位对企业经营目标的贡献，对企业中的各个职位的价值进行综合评价，决定企业中各个职位相对价值的大小，从而确立一个合理、系统、稳定的工作结构，开发一个工作价值的等级制度，在此基础上确定各职位的薪酬级别和职位待遇。</div>
          </div>
          <div class="reason">
            <div class="title">检测点布控建议:</div>
            <div class="text">职位评价(postevaluation)也称工作评价(jobevaluation)，就是根据各职位对组织目标的贡献，通过专门的技术和程序对组织中的各个职位的价值进行综合比较，确定组织中各个职位的相对价值差异。它是薪酬级别设计的基础。职位评价(iobevaluation)就是根据各职位对企业经营目标的贡献，对企业中的各个职位的价值进行综合评价，决定企业中各个职位相对价值的大小，从而确立一个合理、系统、稳定的工作结构，开发一个工作价值的等级制度，在此基础上确定各职位的薪酬级别和职位待遇。</div>
          </div>
          <div class="reason">
            <div class="title">风险防控预案:</div>
            <div class="text">职位评价(postevaluation)也称工作评价(jobevaluation)，就是根据各职位对组织目标的贡献，通过专门的技术和程序对组织中的各个职位的价值进行综合比较，确定组织中各个职位的相对价值差异。它是薪酬级别设计的基础。职位评价(iobevaluation)就是根据各职位对企业经营目标的贡献，对企业中的各个职位的价值进行综合评价，决定企业中各个职位相对价值的大小，从而确立一个合理、系统、稳定的工作结构，开发一个工作价值的等级制度，在此基础上确定各职位的薪酬级别和职位待遇。</div>
          </div>
        </div>
        <div class="bg"></div>
        <div class="bottom">
          <el-button type="primary" plain>处置响应</el-button>
        </div>
      </div>
      <div class="process-con">
        <div class="title">
          <div class="icon"></div>
          <div class="text">风险事件处理流程</div>
        </div>
        <div class="list-con">
          <div class="list">
            <div class="left">1</div>
            <div class="right">
              <div class="time">2019-03-11 09:00</div>
              <div class="desc">处置过程1</div>
            </div>
          </div>
          <div class="list">
            <div class="left">2</div>
            <div class="right">
              <div class="time">2019-03-11 09:00</div>
              <div class="desc">处置过程1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      };
    },
    mounted() {
    },
    watch: {
    },
    methods: {
    }
  };
</script>
<style lang="less">
</style>
<style lang="less" scoped>
  @import "../../assets/css/common.less";
  .container3 {
    color: @fontColor;
    .content {
      margin-left: 13%;
      display:flex;
      flex-wrap: wrap;
      .detail-con {
        width: 826px;
        max-width: 85%;
        box-sizing: border-box;
        background: white;
        padding: 24px 0 0px 0px;
        margin-right: 14px;
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
          .reason {
            width: 100%;
            text-align: left;
            box-sizing: border-box;
            padding: 16px 0;
            border-bottom: 1px dotted #E4E7ED;
            .title {
              color: #909399;
              font-size: 15px;
              margin-bottom: 10px;
            }
            .text {
              color: #909399;
              font-size: 13px;
              line-height: 20px;
            }
          }
        }
        .bg {
          width: 100%;
          height: 10px;
          background: #F1F2F5;
        }
        .bottom {
          width: 100%;
          box-sizing: border-box;
          padding: 13px  0 13px 54px;
          display: flex;
        }
      }
      .process-con {
        width: 256px;
        max-height: 500px;
        overflow-y: auto;
        background: white;
        .title {
          width: 100%;
          height: 52px;
          line-height: 52px;
          background: #6998F0;
          font-size: 18px;
          font-weight: bold;
          color: white;
          display: flex;
          align-items: center;
          .icon {
            width: 8px;
            height: 28px;
            background: white;
            margin-right: 18px;
          }
        }
        .list-con {
          width: 100%;
          box-sizing: border-box;
          padding: 20px 28px 0 27px;
          .list {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 20px;
            background: #F6F7FB;
            border: 1px solid #E6E6E6;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
            .left {
              width: 32px;
              height: 32px;
              margin-right: 10px;
              border-radius: 32px;
              background: #6998F1;
              line-height: 32px;
              text-align: center;
              color: white;
              font-size: 20px;
            }
            .right {
              width: calc(100% - 30px);
              height: 32px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              text-align: left;
              .time {
                color: #4D4D4D;
                font-size: 12px;
              }
              .desc {
                color: #C0C4CC;
                font-size: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>
