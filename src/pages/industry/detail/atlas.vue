<template>
  <div class="atlas">
    <div class="atlas-content">
      <div class="atlas-icons" />
      <div class="atlas-lines" />
      <div class="atlas-tabs">
        <div>
          <div class="link-1-icons" @click="linkSearch('镍氢电池材料')" />
          <div class="link-1-text" @click="linkSearch('镍氢电池材料')" />
        </div>
        <div>
          <div class="link-2-icons" @click="linkSearch('燃料电池材料')" />
          <div class="link-2-text" @click="linkSearch('燃料电池材料')" />
        </div>
        <div>
          <div class="link-3-icons" @click="linkSearch('锂电池材料')" />
          <div class="link-3-text" @click="linkSearch('锂电池材料')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    resize() {},
    linkSearch(val) {
      this.$parent.searchChild(val);
    },
  },
  created() {
    window.addEventListener("resize", () => {
      this.resize();
    });
    this.resize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      this.resize();
    });
  },
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 1440px) {
  .atlas {
    .atlas-content {
      height: 837px;
      .link-1-icons, .link-2-icons, .link-3-icons {
        width: 100px;
        height: 80px;
      }
      .link-1-text, .link-2-text, .link-3-text {
        width: 72px;
        height: 16px;
      }
      .link-1-icons {
        left: 158px;
        top: 476px;
      }
      .link-2-icons {
        left: 46px;
        top: 533px;
      }
      .link-3-icons {
        left: 103px;
        top: 622px;
      }
      .link-1-text {
        top: 456px;
        left: 128px;
      }
      .link-2-text {
        top: 511px;
        left: 17px;
      }
      .link-3-text {
        top: 598px;
        left: 79px;
      }
    }
  }
}
@media screen and (min-width: 1441px) and (max-width: 1680px) {
  .atlas {
    .atlas-content {
      height: 1004.4px;
      .link-1-icons, .link-2-icons, .link-3-icons {
        width: 120px;
        height: 96px;
      }
      .link-1-text, .link-2-text, .link-3-text {
        width: 86.4px;
        height: 19.2px;
      }
      .link-1-icons {
        left: 189px;
        top: 572px;
      }
      .link-2-icons {
        left: 54px;
        top: 640px;
      }
      .link-3-icons {
        left: 124px;
        top: 745px;
      }
      .link-1-text {
        top: 546px;
        left: 154px;
      }
      .link-2-text {
        top: 613px;
        left: 20px;
      }
      .link-3-text {
        top: 717px;
        left: 95px;
      }
    }
  }
}
@media screen and (min-width: 1681px) {
  .atlas {
    .atlas-content {
      height: 1171.8px;
      .link-1-icons, .link-2-icons, .link-3-icons {
        width: 140px;
        height: 112px;
      }
      .link-1-text, .link-2-text, .link-3-text {
        width: 100.8px;
        height: 22.4px;
      }
      .link-1-icons {
        left: 222px;
        top: 667px;
      }
      .link-2-icons {
        left: 65px;
        top: 748px;
      }
      .link-3-icons {
        left: 143px;
        top: 871px;
      }
      .link-1-text {
        top: 638px;
        left: 180px;
      }
      .link-2-text {
        top: 716px;
        left: 23px;
      }
      .link-3-text {
        top: 837px;
        left: 110px;
      }
    }
  }
}
.atlas {
  .atlas-content {
    position: relative;
    .atlas-icons, .atlas-lines {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .atlas-icons {
      background: url('../../../assets/icons.png') no-repeat;
      background-size: 100% 100%;
      z-index: 1;
    }
    .atlas-lines {
      background: url('../../../assets/lines.gif') no-repeat;
      background-size: 100% 100%;
    }
    .atlas-tabs {
      > div > div {
        z-index: 2;
        cursor: pointer;
        position: absolute;
      }
      .link-1-icons {
        clip-path: polygon(41% 0, 60% 0, 67% 26%, 90% 47%, 50% 72%, 12% 50%, 26% 29%, 32% 26%);
      }
      .link-2-icons {
        clip-path: polygon(50% 0, 73% 13%, 72% 24%, 88% 47%, 51% 72%, 14% 48%, 26% 29%, 30% 13%);
      }
      .link-3-icons {
        clip-path: polygon(50% 0, 72% 14%, 72% 24%, 89% 44%, 51% 69%, 12% 44%, 26% 29%, 30% 13%);
      }
    }
  }
}
</style>