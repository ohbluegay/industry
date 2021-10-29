<template>
  <div class="enterlist">
    <div class="title">{{ title }}</div>
    <div class="list">
      <div
        class="listitem"
        v-for="item in list"
        :key="item.label"
        @click="chooseItem(item.label)"
      >
        <span class="name">{{ item.label }}</span>
        <span class="value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    list: Array,
  },
  methods: {
    chooseItem(val) {
      this.$emit("choose", val);
    },
  },
};
</script>

<style lang="less" scoped>
.enterlist {
  border: 1px solid #d6def8;
  background-color: #fff;
  border-radius: 4px;
  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
    background-color: #dae9fc;
    padding: 0 14px;
    color: #3258DE;
    font-size: 18px;
    font-weight: 600;
  }
  .list {
    display: flex;
    flex-direction: column;
    padding: 9px 16px;
    .listitem {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      cursor: pointer;
      &:not(:last-child) {
          margin-bottom: 7px;
      }
      .name {
        flex: 1 0 auto;
        padding-right: 10px;
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
        color: #3258DE;
      }
      .value {
        color: #303133;
        width: 40px;
        white-space: nowrap;
        text-align: right;
      }
    }
  }
}
</style>