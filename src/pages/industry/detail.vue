<template>
  <div class="detail">
    <div class="detailtop">
      <div class="entertitle">
        <svg-icon iconName="message" />
        <span>电子核心产业</span>
      </div>
      <div class="enterinfo">
        新一代信息产业中的电子核心产业行了解剖，发现本次战略性新兴产业的电子核心产业主要包括新型电子元器件及设备制造、电子专用设备仪器制造、高储能和关键电子材料制造和集成电路制造四大分类。
      </div>
    </div>
    <div class="detaicontent">
      <div class="innertab">
        <instab
          type="inner lefttab"
          :tabList="tabList"
          @chooseTab="chooseTab"
          :defaultValue="active"
        />
      </div>
      <keep-alive>
        <component :is="active" ref="child" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import instab from "components/instab";
import atlas from "./detail/atlas";
import enter from "./detail/enter";
export default {
  data() {
    return {
      tabList: [
        { name: "产业图谱", value: "atlas" },
        { name: "产业企业", value: "enter" },
      ],
      active: "atlas",
    };
  },
  components: {
    instab,
    atlas,
    enter,
  },
  methods: {
    chooseTab(val) {
      this.active = val;
    },
    searchChild(val) {
      this.active = "enter";
      this.$nextTick(() => {
        this.$refs.child.searchByLink(val);
      });
    },
  },
  created() {
    const { select } = this.$route.query;
    if (select) this.active = select;
  },
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 1440px) {
  .detail {
    width: 1200px;
  }
}
@media screen and (min-width: 1441px) and (max-width: 1680px) {
  .detail {
    width: 1440px;
  }
}
@media screen and (min-width: 1681px) {
  .detail {
    width: 1680px;
  }
}
.detail {
  margin: 0 auto;
  .detailtop {
    padding: 30px 0 20px;
    color: #303133;
    border-bottom: 1px solid #d6def8;
    .entertitle {
      display: flex;
      align-items: center;
      svg {
        width: 16px;
        height: 16px;
      }
      span {
        margin-left: 8px;
        font-size: 18px;
      }
    }
    .enterinfo {
      padding: 6px 0 0 24px;
      font-size: 14px;
      word-break: break-all;
      line-height: 26px;
    }
  }
  .detaicontent {
    .innertab {
      padding: 20px 0;
    }
  }
}
</style>