<template>
    <div class="industry">
        <div class="in-header">
            <el-input prefix-icon="el-icon-search" placeholder="请输入新兴产业名称">
                <template slot="append"><span>搜索</span></template>
            </el-input>
        </div>
        <div class="in-content">
            <header-tab :tabList="tabList" type="header" @chooseTab="chooseTab" />
            <component :is="componentName" />
        </div>
    </div>
</template>

<script>
import headerTab from 'components/instab'
import panorama from './industry/panorama'
import plate from './industry/plate'
export default {
    data() {
        return {
            tabList: [
                {
                    name: "产业全景",
                    value: 'panorama'
                }, {
                    name: "产业板块",
                    value: 'plate'
                }
            ],
            componentName: 'panorama'
        }
    },
    components: {
        headerTab,
        panorama,
        plate
    },
    methods: {
        chooseTab(val) {
            this.componentName = val
        }
    }
}
</script>

<style lang="less" scoped>
    .industry {
        min-width: 1200px;
        overflow-x: auto;
        .in-header {
            padding: 40px 0 16px;
            text-align: center;
            /deep/.el-input {
                width: 700px;
                height: 32px;
                font-size: 12px;
                .el-input__icon {
                    line-height: 32px;
                }
                .el-input__inner {
                    height: 32px;
                    line-height: 32px;
                    color: rgba(48, 49, 51, 1);
                }
                .el-input-group__append {
                    border-radius: 2px;
                    background-color: rgba(50, 88, 222, 1);
                    color: #ffffff;
                    border: 0;
                    padding: 0;
                    span {
                        display: flex;
                        width: 80px;
                        height: 100%;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>