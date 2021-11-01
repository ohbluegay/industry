<template>
  <div class="plate">
    <div class="platetop">
      <instab type="inner" :tabList="tabList" :defaultValue="active" @chooseTab="chooseTab" />
      <div class="platecontent" :style="{'padding-left': renderSize(120), 'padding-right': renderSize(80)}">
          <div class="resultitem" @click="enterDetail(item.name)" v-for="(item, index) in resultList" :key="index" :style="{'width': renderSize(250), 'height': renderSize(120), 'margin-right': renderSize(40)}">
              <img :src="imgPath[index]" />
              <span>{{item.name}}</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import instab from 'components/instab'
import { getSource } from 'utils/api/source'
export default {
  data() {
    return {
      tabList: [
        { name: '不限', value: 1 },
        { name: '新一代信息技术', value: 2 },
        { name: '高端制造', value: 3 },
        { name: '新材料产业', value: 4 },
        { name: '生物产业', value: 5 },
        { name: '新能源汽车', value: 6 },
        { name: '新能源产业', value: 7 },
        { name: '节能环保', value: 8 },
        { name: '数字创意', value: 9 },
        { name: '相关服务', value: 10 },
      ],
      domScale: 1,
      resultList: [],
      active: 2,
      imgPath: [
        require('src/assets/net.png'),
        require('src/assets/dianzi.png'),
        require('src/assets/soft.png'),
        require('src/assets/data.png'),
        require('src/assets/micro.png')
      ]
    }
  },
  components: {
    instab
  },
  methods: {
    chooseTab(val) {
      this.active = val
      this.getList(val)
    },
    resizeDom() {
      this.domScale = (document.body.clientWidth < 1172 ? 1172 : document.body.clientWidth) / 1360
    },
    renderSize(size) {
      return size * this.domScale + 'px'
    },
    getList(val) {
      getSource({ source: 'plate' }).then(res => {
        this.resultList = res[val]
      })
    },
    enterDetail(name) {
      if (name === '电子核心产业') this.$router.push('/industry/detail')
    }
  },
  created() {
    this.resizeDom()
    this.getList(this.active)
    window.addEventListener('resize', this.resizeDom)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeDom)
  }
}
</script>

<style lang="less" scoped>
  .plate {
    .platetop {
      margin-top: 12px;
    }
    .platecontent {
      padding-top: 20px;
      .resultitem {
        display: inline-block;
        margin-bottom: 40px;
        position: relative;
        font-size: 12px;
        cursor: pointer;
        span {
          white-space: nowrap;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          color: #fff;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>