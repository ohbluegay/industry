<template>
  <div class="panorama">
    <div class="pa-header">
      <div class="pa-header-inner">战略新兴产业全局分析</div>
    </div>
    <div class="pa-content">
      <div class="pa-content-left">
        <instab
          :tabList="tabList"
          type="left"
          :defaultValue="activetab"
          @chooseTab="chooseTab"
        />
      </div>
      <div class="pa-content-center">
        <div class="pa-content-c-header">
          <div class="infolist">
            <div class="info">
              <span>商品产业链</span>
              <span>{{ topInfo.number }}</span>
            </div>
            <div class="info">
              <span>商品服务数</span>
              <span>{{ topInfo.service }}</span>
            </div>
            <div class="info">
              <span>企业数量</span>
              <span>{{ topInfo.enter }}</span>
            </div>
            <div class="info">
              <span>总产值</span>
              <span>{{ topInfo.produce }}亿</span>
            </div>
          </div>
        </div>
        <div class="pa-content-c-content">
          <div class="enterNum">
            <span>当前企业数：</span>
            <span>{{ enterNum }}</span>
          </div>
          <div class="chartwrap">
            <geomap
              :mapName="mapName"
              :geolocation="geolocation"
              :data="mapData"
              :mapGrid="{
                top: 10,
                bottom: 20
              }"
            />
            <!-- <el-button
              type="primary"
              icon="el-icon-arrow-left"
              size="small"
              @click="parentMap()"
              v-show="!!parentCode"
              >返回上一级</el-button
            > -->
          </div>
        </div>
        <div class="pa-content-c-bottom">
          <lineChart
            :data="enterData.dev"
            :options="{ ...enterData.options, title: '高端装备发展指数' }"
          />
          <lineChart
            :data="enterData.increase"
            :options="{ ...enterData.options, title: '高端装备增长力指数' }"
          />
          <lineChart
            :data="enterData.active"
            :options="{ ...enterData.options, title: '高端装备活跃度指数' }"
          />
        </div>
      </div>
      <div class="pa-content-right">
        <div class="rankwrap">
          <enterrank :data="provinceRank" title="企业数量分布排行" />
          <div class="split" />
          <enterrank
            :data="produceData"
            :rank="false"
            :active="activeName"
            classname="sels"
            title="企业产值排行"
          />
        </div>
        <div class="growup">
          <div class="growtitle">
            <span>产业成长力</span>
          </div>
          <div class="growchart">
            <lineChart :data="grows.data" :options="grows.options" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instab from "components/instab";
import geomap from "components/chart/map";
import enterrank from "components/enterrank";
import lineChart from "components/chart/line";
import { getMapGeo } from "utils/api/map";
import { getSource } from "utils/api/source";
export default {
  data() {
    return {
      activetab: 1,
      mapName: "china",
      geolocation: {
        type: "FeatureCollection",
        features: [],
      },
      mapData: [],
      privinceData: [],
      topInfo: {
        number: 34,
        service: 56,
        enter: 4678,
        produce: 1406.5,
      },
      parentCode: null,
      enterNum: 0,
      tabList: [
        { name: "新一代信息技术", value: 1 },
        { name: "高端制造", value: 2 },
        { name: "新材料产业", value: 3 },
        { name: "生物产业", value: 4 },
        { name: "新能源汽车", value: 5 },
        { name: "新能源产业", value: 6 },
        { name: "节能环保", value: 7 },
        { name: "数字创意", value: 8 },
        { name: "相关服务", value: 9 },
      ],
      linkData: [],
      provinceData: [],
      provinceRank: [],
      enterData: {
        options: {
          keys: ["ga"],
          types: {
            ga: "area",
          },
          xAxis: "date",
          area: ["ga"],
        },
        dev: [
          { date: "2019", ga: 20 },
          { date: "2020", ga: 25 },
          { date: "2021", ga: 45 },
        ],
        increase: [
          { date: "2019", ga: 20 },
          { date: "2020", ga: 25 },
          { date: "2021", ga: 45 },
        ],
        active: [
          { date: "2019", ga: 20 },
          { date: "2020", ga: 25 },
          { date: "2021", ga: 45 },
        ],
      },
      grows: {
        options: {
          keys: ["ga", "gb"],
          types: {
            ga: "bar",
            gb: "line",
          },
          rightAxis: ["gb"],
          xAxis: "date",
          legend: ["新增企业数量", "新增企业成长率"],
        },
        data: [
          { date: "2019Q4", ga: 18, gb: 45 },
          { date: "2020Q1", ga: 34, gb: 48 },
          { date: "2020Q2", ga: 22, gb: 70 },
          { date: "2020Q3", ga: 19, gb: 40 },
          { date: "2020Q4", ga: 55, gb: 35 },
          { date: "2021Q1", ga: 5, gb: 78 },
          { date: "2021Q2", ga: 18, gb: 22 },
        ],
      },
    };
  },
  computed: {
    produceData() {
      return this.linkData
        .map((item) => {
          item.value = item.produce;
          return item;
        })
        .sort((a, b) => b.value - a.value);
    },
    activeName() {
      let name = "";
      this.tabList.some((item) => {
        if (item.value === this.activetab) name = item.name;
      });
      return name;
    },
  },
  components: {
    instab,
    geomap,
    enterrank,
    lineChart,
  },
  methods: {
    chooseTab(val) {
      this.activetab = val;
      this.getTopInfo()
      this.linkProvinceData()
    },
    getMap(code) {
      this.geolocation = {
        type: "FeatureCollection",
        features: [],
      };
      getMapGeo({ code }).then((res) => {
        this.geolocation = res;
      });
    },
    mapClick(params) {
      const { name } = params;
      let code = null,
        parentCode = null;
      this.geolocation.features.map((item) => {
        if (
          item.properties.name === name &&
          item.properties.parent.adcode &&
          Number(item.properties.adcode) !==
            Number(item.properties.parent.adcode)
        ) {
          parentCode = item.properties.parent.adcode;
          code = item.properties.adcode;
        }
      });
      if (Number(code) === 100000 || !code || !parentCode) return;
      this.parentCode = parentCode;
      this.getMapConfig(code);
    },
    getMapConfig(code) {
      this.mapName = code === 100000 ? "china" : "中国领土";
      this.getMap(code);
    },
    parentMap() {
      if (!this.parentCode) return;
      const index = this.geolocation.features[0].properties.acroutes.indexOf(
        this.parentCode
      );
      const codeList = this.geolocation.features[0].properties.acroutes.slice(
        0,
        index
      );
      this.getMapConfig(this.parentCode);
      this.$nextTick(() => {
        this.parentCode = codeList.pop();
      });
    },
    // 获取省份数据
    getProvinceData() {
      getSource({ source: 'province_chain' }).then(res => {
        this.provinceData = res
        this.linkProvinceData()
      })
    },
    // 获取当前产业下的省份数据
    linkProvinceData() {
        this.mapData = this.provinceData.map(item => {
          return {
            name: item.name,
            value: item[this.activetab]
          }
        })
        this.provinceRank = this.mapData.length ? JSON.parse(JSON.stringify(this.mapData)).sort((a, b) => b.value - a.value).slice(0, 10) : []
        this.enterNum = this.provinceRank.reduce((sum, item) => sum + item.value, 0)
    },
    // 获取产业链数据
    getlinkData() {
      getSource({ source: "produce" }).then((res) => {
        this.linkData = res;
        this.getTopInfo();
      });
    },
    // 获取当前产业链数据
    getTopInfo() {
      let name = "";
      this.tabList.some((item) => {
        if (item.value === this.activetab) name = item.name;
      });
      this.linkData.some(item => {
        if (item.name === name) this.topInfo = item
      })
    },
  },
  created() {
    this.getlinkData();
    this.getProvinceData();
    this.getMapConfig(100000);
  },
};
</script>

<style lang="less" scoped>
.panorama {
  padding: 0 20px 20px;
  .pa-header {
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
    .pa-header-inner {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: #88a8f7;
      font-size: 24px;
      width: 340px;
      height: 44px;
      border-radius: 0 0 100px 100px;
    }
  }
  .pa-content {
    display: flex;
    .pa-content-left {
      padding-top: 16px;
      width: 160px;
    }
    .pa-content-center {
      flex: 1 0 auto;
      padding: 16px 40px 0;
      .pa-content-c-header {
        padding-bottom: 30px;
        .infolist {
          display: flex;
          justify-content: space-between;
          .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 60px;
            span:nth-of-type(1) {
              font-size: 18px;
              color: rgba(48, 49, 51, 1);
            }
            span:nth-of-type(2) {
              font-size: 22px;
              color: rgba(245, 166, 35, 1);
            }
          }
        }
      }
      .pa-content-c-content {
        .enterNum {
          font-size: 14px;
          span:nth-of-type(1) {
            color: rgba(48, 49, 51, 1);
          }
          span:nth-of-type(2) {
            color: rgba(245, 166, 35, 1);
          }
        }
        .chartwrap {
          width: 100%;
          height: 328px;
          position: relative;
          text-align: center;
          /deep/.chart {
            width: 450px;
            margin: 0 auto;
          }
          /deep/.el-button {
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }
      .pa-content-c-bottom {
        display: flex;
        height: 175px;
        margin-top: 20px;
        & > .chart {
          flex: 1;
          min-width: 150px;
          &:not(:first-child) {
            margin-left: 10px;
          }
        }
      }
    }
    .pa-content-right {
      padding: 20px 10px 6px;
      width: 485px;
      display: flex;
      flex-direction: column;
      background-color: #f7f9ff;
      .rankwrap {
        display: flex;
        /deep/.enterrank {
          &:nth-of-type(1) {
            width: 200px;
          }
          &.sels {
            flex: 1 0 auto;
            .ranklist .rank.name > div {
              width: 85px !important;
            }
          }
        }
        .split {
          margin: 0 20px;
          width: 1px;
          height: 100%;
          background-color: #dde1ed;
        }
      }
    }
    .growup {
      margin-top: 10px;
      .growtitle {
        margin-bottom: 5px;
        span {
          font-size: 14px;
          color: #000000;
          border-bottom: 3px solid rgba(136, 168, 247, 1);
          padding-bottom: 2px;
        }
      }
      .growchart {
        width: 100%;
        height: 230px;
        border: 1px solid #d6def8;
        background-color: #fff;
        margin-top: 12px;
        border-radius: 2px;
      }
    }
  }
}
</style>