<template>
    <div class="enter">
        <div class="enterform">
            <el-form ref="form" :model="form" label-width="80px" label-position="left">
                <el-form-item :label="label.recom">
                    <el-radio-group v-model="form.recom" @change="searchEnter">
                        <el-radio :label="0" :key="0">不限</el-radio>
                        <el-radio :label="1" :key="1">
                            <span class="split">
                                <span>潜客推荐</span>
                                <svg-icon iconName="if" @mouseenter.native="showTip = true" @mouseleave.native="showTip = false" />
                                <div class="tooltip" v-show="showTip">
                                    <p>以下推荐结果与您自有客户资源存在竞争、合作、产业链上下游、经营类似业务等关系，他们可能是您的潜在商机！</p>
                                </div>
                            </span>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="label.link">
                    <el-radio-group v-model="form.link" @change="searchEnter">
                        <el-radio v-for="item in linkList" :label="item.value" :key="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="label.state" class="province">
                    <el-cascader
                        v-model="form.state"
                        placeholder="不限"
                        :options="stateList"
                        :props="{ multiple: true, value: 'name', label: 'name' }"
                        @change="searchEnter"
                        clearable
                        collapse-tags />
                </el-form-item>
                <el-form-item :label="label.register">
                    <el-radio-group v-model="form.register" @change="searchEnter">
                        <el-radio v-for="item in registList" :label="item.value" :key="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="label.time">
                    <el-radio-group v-model="form.time" @change="searchEnter">
                        <el-radio v-for="item in timeList" :label="item.value" :key="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>
        <div class="selected">
            <div class="title">已选:</div>
            <template v-for="item in Object.keys(selected)">
                <div class="selecttip" :key="item" v-show="!!selected[item]" :title="selected[item]">
                    <span class="label">{{label[item]}}：</span>
                    <span class="text">{{selected[item]}}</span>
                    <span class="close" @click="removeSelect(item)">
                        <i class="el-icon-close" />
                    </span>
                </div>
            </template>
        </div>
        <div class="entercontent">
            <div class="entertab">
                <instab :tabList="tabList" :defaultValue="enterShow" type="little" @chooseTab="chooseTab" />
            </div>
            <div class="enterinner">
                <keep-alive>
                    <component :is="enterShow" :tableData="tableList" />
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
import { getSource } from 'utils/api/source'
import { formatEnter } from 'utils'
import instab from 'components/instab'
import entertable from './enter/entertable'
import province from './enter/province'
export default {
    data() {
        return {
            recomList: [
                { label: '不限', value: 0 }, { label: '潜客推荐', value: 1 }
            ],
            linkList: [{ label: '不限', value: 0 }],
            stateList: [],
            registList: [
                { label: '不限', value: 0 }, { label: '0-100万', value: '0-100' }, { label: '100-200万', value: '100-200' }, { label: '200-500万', value: '200-500' }, { label: '500-1000万', value: '500-1000' }, { label: '1000万以上', value: '1000+' }
            ],
            timeList: [
                { label: '不限', value: 0 }, { label: '1年以内', value: '0-1' }, { label: '1-5年', value: '1-5' }, { label: '5-10年', value: '5-10' }, { label: '10-15年', value: '10-15' }, { label: '15年以上', value: '15+' }
            ],
            form: {
                recom: 0,
                link: 0,
                state: [],
                register: 0,
                time: 0
            },
            enterList: [],
            tableList: [],
            selected: {
                recom: '',
                link: '',
                state: '',
                register: '',
                time: ''
            },
            label: {
                recom: '客群选择',
                link: '产业环节',
                state: '省份地域',
                register: '注册资本',
                time: '注册时间'
            },
            tabList: [
                { name: '列表', value: 'entertable' },
                { name: '地图', value: 'province' }
            ],
            enterShow: 'province',
            showTip: false
        }
    },
    watch: {
        form: {
            handler(val) {
                const { recom, link, state, register, time } = val
                this.selected = {
                    recom: this.renderTip(recom, this.recomList),
                    link: this.renderTip(link, this.linkList),
                    state: state.length > 0 ? state.map(item => item.join('')).join(';') : '',
                    register: this.renderTip(register, this.registList),
                    time: this.renderTip(time, this.timeList)
                }
            },
            immediate: true,
            deep: true
        }
    },
    components: {
        entertable,
        province,
        instab
    },
    methods: {
        getEnterList() {
            const typeObj = {
                1: '上游',
                2: '中游',
                3: '下游'
            }
            getSource({ source: 'enter' }).then(res => {
                this.enterList = res.map(item => {
                    item.namefield = `${item.link}（${typeObj[item.type]}）`
                    item.statefield = item.state.replace(/,/g, '')
                    return item
                })
                const { type1, type2, type3 } = formatEnter(res)
                const link = [...type1, ...type2, ...type3].map(item => {
                    return {
                        label: `${item.label}（${item.typeName}）`,
                        value: item.label
                    }
                })
                this.linkList.push(...link)
                this.searchEnter()
            })
        },
        getStateList() {
            getSource({ source: 'state' }).then(res => {
                this.stateList = res
            })
        },
        // 清楚选中条件
        removeSelect(key) {
            const val = key === 'state' ? [] : 0
            this.form[key] = val
            this.searchEnter()
        },
        // 显示选择标签
        renderTip(val, list) {
            let value = ''
            if (val) {
                list.map(item => {
                    if (item.value === val) value = item.label
                })
            }
            return value
        },
        // 转时间戳
        toStamp(date) {
            return new Date(date).getTime()
        },
        /**
         * 搜索企业
         */
        searchEnter() {
            const { recom, link, state, register, time } = this.form
            this.tableList = this.enterList.filter(item => {
                // 客群选择
                if (recom && !item.recom) return false
                // 产业环节
                if (link && item.link !== link) return false
                // 省份地域
                if (state.length) {
                    let bool = false
                    state.map(sub => {
                        const text = sub.join(',')
                        if (item.state.includes(text)) bool = true
                    })
                    if (!bool) return false
                }
                // 注册资本
                if (register) {
                    let bool = false
                    if (register.includes('-')) {
                        const range = register.split('-')
                        bool = item.register >= range[0] && item.register < range[1]
                    } else if (register.includes('+')) {
                        bool = item.register >= register.split('+')[0]
                    }
                    if (!bool) return false
                }
                // 注册时间
                if (time) {
                    let bool = false
                    const itemFormat = item.time.replace(/年|月/g, '-').replace('日', '')
                    if (time.includes('-')) {
                        const range = time.split('-')
                        bool = this.toStamp(itemFormat) > this.toStamp(this.$moment().subtract(range[1], 'years').format('YYYY-MM-DD')) && this.toStamp(itemFormat) <= this.toStamp(this.$moment().subtract(range[0], 'years').format('YYYY-MM-DD'))
                    } else if (time.includes('+')) {
                        bool = this.toStamp(itemFormat) <= this.toStamp(this.$moment().subtract(time.split('+')[0], 'years').format('YYYY-MM-DD'))
                    }
                    if (!bool) return false
                }
                return true
            })
        },
        /**
         * 选择组件
         */
        chooseTab(val) {
            this.enterShow = val
        }
    },
    created() {
        this.getEnterList()
        this.getStateList()
    }
}
</script>

<style lang="less" scoped>
    .enter {
        .enterform {
            svg {
                width: 14px;
                height: 14px;
                margin: 0 0 -2px 4px;
                cursor: pointer;
            }
            /deep/.el-form {
                .el-form-item {
                    margin-bottom: 0;
                    .el-form-item__label {
                        line-height: 14px;
                        color: #0E1423;
                    }
                    &.province .el-form-item__label {
                        line-height: 28px;
                    }
                    .el-form-item__content {
                        line-height: 14px;
                        .el-radio-group {
                            .el-radio {
                                margin: 0 40px 20px 0;
                                color: #303133;
                                .el-radio__inner::after {
                                    width: 6px;
                                    height: 6px;
                                }
                                .el-radio__input.is-checked+.el-radio__label {
                                    color: #303133;
                                }
                                .el-radio__input.is-checked .el-radio__inner::after {
                                    background-color: #3258DE;
                                }
                                .el-radio__label {
                                    padding-left: 8px;
                                }
                                .el-radio__input.is-checked .el-radio__inner {
                                    background-color: #fff;
                                    border-color: #3258DE;
                                }
                            }
                        }
                        .el-cascader {
                            height: 28px;
                            width: 140px;
                            line-height: 28px;
                            margin-bottom: 16px;
                            .el-cascader__tags {
                                flex-wrap: nowrap;
                                overflow-x: hidden;
                                .el-tag .el-icon-close {
                                    right: 0;
                                    top: 0;
                                }
                            }
                            .el-input__inner {
                                height: 28px !important;
                                border-color: #D6DEF8;
                            }
                            .el-input__icon {
                                line-height: 28px;
                            }
                        }
                    }
                }
                .split {
                    position: relative;
                }
                .tooltip {
                    position: absolute;
                    width: 500px;
                    top: -50px;
                    left: 100%;
                    color: rgba(74, 74, 74, 1);
                    padding: 0 6px;
                    background-color: #DBDBDB;
                    border-radius: 4px;
                    font-size: 12px;
                    line-height: 25px;
                    white-space: pre-wrap;
                }
            }
        }
       .selected {
           margin: 5px 0 10px;
           padding: 8px 10px;
           background-color: #F9FBFD;
           display: flex;
           flex-wrap: nowrap;
           font-size: 14px;
           border: 1px solid #D3D4D6;
           white-space: nowrap;
           .title {
               color: #0E1423;
               line-height: 24px;
           }
           .selecttip {
               color: #606266;
               border: 1px solid #D3D4D6;
               height: 21px;
               padding-bottom: 1px;
               display: flex;
               align-items: center;
               margin-left: 12px;
               span {
                   display: inline-block;
                   max-width: 140px;
                   white-space: nowrap;
                   overflow-x: hidden;
                   text-overflow: ellipsis;
               }
               .label {
                   margin-left: 8px;
               }
               .close {
                   display: inline-block;
                   height: 20px;
                   line-height: 20px;
                   padding: 0 8px;
                   cursor: pointer;
                   font-size: 14px;
                   color: #FF4D4F;
               }
           }
       }
       .entercontent {
           padding-bottom: 20px;
           .entertab {
               padding: 10px 0;
           }
       }
    }
</style>