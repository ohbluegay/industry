<template>
    <div class="enterrank" :class="classname">
        <div class="ranktitle">
            <span>{{title}}</span>
        </div>
        <div class="ranklist">
            <div class="rank no">
                <div v-for="(item, index) in data" :key="index">No.{{index+1}}</div>
            </div>
            <div class="rank name">
                <div v-for="(item, index) in data" :key="index" :title="item.name">{{item.name}}</div>
            </div>
            <div class="rank progress" :class="{'rankcolor': rank}">
                <div class="progress-wrap" v-for="(item, index) in data" :key="index">
                    <div class="inner" :class="{'active': item.name === active}" :style="{'width': (item.value / data[0].value) * 100 + '%'}" />
                </div>
            </div>
            <div class="rank num">
                <div v-for="(item, index) in data" :key="index">{{item.value}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '排行'
        },
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        active: {},
        rank: {
            type: Boolean,
            default: true
        },
        classname: String
    }
}
</script>

<style lang="less" scoped>
    .enterrank {
        .ranktitle {
            margin-bottom: 10px;
            span {
                color: #000;
                font-size: 14px;
                padding-bottom: 2px;
                border-bottom: 3px solid rgba(136, 168, 247, 1);
            }
        }
        .ranklist {
            font-size: 12px;
            color: #303133;
            display: flex;
            .rank {
                display: flex;
                flex-direction: column;
                > div {
                    height: 32px;
                    line-height: 32px;
                }
                &.no {
                    width: 30px;
                }
                &.name > div {
                    text-align: right;
                    width: 50px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                &.progress {
                    flex: 1 0 auto;
                    padding: 0 15px 0 10px;
                    &.rankcolor {
                        .progress-wrap {
                            &:nth-of-type(1) .inner {
                                background-color: #FF7485;
                            }
                            &:nth-of-type(2) .inner {
                                background-color: #84D22F;
                            }
                            &:nth-of-type(3) .inner {
                                background-color: #F3E10A;
                            }
                        }
                    }
                    .progress-wrap {
                        height: 32px;
                        line-height: 32px;
                        .inner {
                            display: inline-block;
                            height: 12px;
                            border-radius: 2px;
                            background-color: #6C8BFF;
                            cursor: pointer;
                            transition: all .2s ease;
                            &.active {
                                background-color: #FF7485;
                            }
                        }
                    }
                }
                &.num {
                    flex: 0 1 auto;
                }
            }
        }
    }
</style>