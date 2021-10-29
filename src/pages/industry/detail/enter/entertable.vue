<template>
    <div class="entertable">
        <div class="tablehead">
            <div class="td" :style="item.width ? {'width': item.width + 'px'} : {'flex': '1'}" v-for="item in tableHead" :key="item.field" :class="item.type">
                {{item.title}}
            </div>
        </div>
        <div class="tablebody" ref="tbody" :class="{'scroll': scroll}">
            <div class="tr" v-for="(item, index) in tableData" :key="index">
                <div class="ta">
                    <div class="td" v-for="sub in tableHead" :key="sub.field" :style="sub.width ? {'width': sub.width + 'px'} : {'flex': '1'}" :class="sub.type" @click="toZhimou(sub.field, item.creditCode)">
                        <span class="recom" v-if="sub.field === 'recom' && item[sub.field]" @mouseenter="showTooltip(item[sub.field], $event)" @mouseleave="showTooltip('', $event)">{{item[sub.field]}}</span>
                        <span v-else>{{item[sub.field]}}</span>
                    </div>
                </div>
                <div class="tb" v-if="item.tips[0].length">
                    <span class="tip active" v-for="sub in item.tips[0]" :key="sub">{{sub}}</span>
                </div>
            </div>
        </div>
        <div class="tooltip" ref="tooltip" v-show="!!tooltip">
            <span>推荐理由:</span>
            <span v-if="tooltip !== '客户的竞争对手'">与</span>
            “<span class="hover">深圳市腾讯计算机系统有限公司</span>”
            <template>
                <span v-if="tooltip !== '客户的竞争对手'">有</span>
                <span v-else>的</span>
            </template>
            <span>{{tooltip === '客户的竞争对手' ? '竞争对手' : tooltip}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableHead: [
                { title: '企业名称', field: 'entername', width: 230, type: 'active' },
                { title: '潜客推荐', field: 'recom', width: 140 },
                { title: '地域', field: 'statefield', width: 140 },
                { title: '注册资本(万元)', field: 'register', width: 80, type: 'right' },
                { title: '国标行业', field: 'standard', width: 200 },
                { title: '成立时间', field: 'time', type: 'center' },
                { title: '新兴产业环节', field: 'namefield', width: 150 }
            ],
            scroll: false,
            tooltip: ''
            
        }
    },
    props: {
        tableData: Array
    },
    watch: {
        tableData: {
            handler() {
                this.$nextTick(() => {
                    const scrollheight = this.$refs.tbody.scrollHeight
                    const offsetheight = this.$refs.tbody.offsetHeight
                    this.scroll = scrollheight > offsetheight
                })
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        showTooltip(text, e) {
            if (!e) return
            const width = e.target.offsetWidth
            const { left, top } = e.target.getBoundingClientRect()
            this.tooltip = text
            if (!text) {
                this.$refs.tooltip.style.display = 'none'
                this.$refs.tooltip.style.top = '-100%'
                this.$refs.tooltip.style.left = '-100%'
                return
            }
            this.$refs.tooltip.style.display = 'inline-block'
            this.$refs.tooltip.style.top = top - 25 + 'px'
            this.$refs.tooltip.style.left = width + left - 5 + 'px'
        },
        // 跳转到智眸
        toZhimou(field, code) {
            if (field !== 'entername') return
            window.open(`https://zhimou.gildata.com/#/subjectPortrait/corporateOverview/${code}`)
        }
    }
}
</script>

<style lang="less" scoped>
    .entertable {
        border: 1px solid #EAEEFB;
        border-radius: 2px;
        font-size: 12px;
        .center {
            text-align: center;
        }
        .right {
            text-align: right;
            padding-right: 80px;
        }
        .tooltip {
            display: inline-block;
            position: fixed;
            top: 0;
            left: 0;
            color: rgba(74, 74, 74, 1);
            padding: 7px 6px;
            background-color: #DBDBDB;
            border-radius: 4px;
            .hover {
                color: rgba(245, 166, 35, 1);
            }
        }
        .tablehead {
            display: flex;
            align-items: center;
            height: 30px;
            border-bottom: 1px solid #EAEEFB;
            padding: 0 17px 0 12px;
            color: #606266;
        }
        .tablebody {
            max-height: 400px;
            overflow: auto;
            color: #303133;
            .active {
                color: #3258DE;
            }
            &.scroll {
                padding-right: 0;
                .tr {
                    padding-right: 0;
                }
            }
            .tr {
                padding: 12px 17px 0 12px;
                &:not(:last-child) {
                    border-bottom: 1px solid #EAEEFB;
                }
                >div {
                    line-height: 18px;
                }
                .ta {
                    display: flex;
                    padding-bottom: 12px;
                    .td {
                        white-space: nowrap;
                        overflow-x: hidden;
                        text-overflow: ellipsis;
                        &.active {
                            cursor: pointer;
                        }
                        .recom {
                            color: #fff;
                            background-color: #F67C55;
                            padding: 2px 8px;
                            border-radius: 2px;
                            cursor: pointer;
                        }
                    }
                }
                .tb {
                    display: flex;
                    padding-bottom: 12px;
                    .tip {
                        display: inline-block;
                        height: 18px;
                        line-height: 18px;
                        padding: 0 8px;
                        background-color: #EAEEFB;
                        border-radius: 2px;
                        &:not(:first-child) {
                            margin-left: 12px;
                        }
                    }
                }
            }
        }
    }
</style>