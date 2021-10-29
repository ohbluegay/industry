<template>
    <div class="instab">
        <div :class="type">
            <div class="tablist">
                <div class="tabitem" v-for="(item, index) in tabList" :key="index" :class="{'active': active === item.value}" @click="chooseTab(item.value)">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: ''
        }
    },
    props: {
        type: String,
        defaultValue: {},
        tabList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    watch: {
        tabList: {
            handler(val) {
                if (this.defaultValue) return this.active = this.defaultValue
                if (val.length) this.active = val[0].value
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        chooseTab(val) {
            this.active = val
            this.$emit('chooseTab', val)
        }
    }
}
</script>

<style lang="less" scoped>
    .instab {
        .tabitem {
            transition: all .2s ease-in;
            cursor: pointer;
        }
        .header {
            border-bottom: 1px solid #D6DEF8;
            padding: 0 20px;
            .tablist {
                font-size: 12px;
                color: #fff;
                text-align: left;
                .tabitem {
                    display: inline-block;
                    padding: 0 17px;
                    height: 24px;
                    white-space: nowrap;
                    line-height: 24px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                    background-color: rgba(173, 191, 255, 1);
                    cursor: pointer;
                    &:not(:first-child) {
                        margin-left: 8px;
                    }
                    &.active, &:hover {
                        background-color: rgba(50, 88, 222, 1);
                    }
                }
            }
        }
        .left {
            width: 160px;
            .tablist {
                display: flex;
                flex-direction: column;
                font-size: 14px;
                color: rgba(48, 49, 51, 1);
                .tabitem {
                    display: inline-block;
                    padding: 0 20px;
                    height: 30px;
                    line-height: 30px;
                    white-space: nowrap;
                    overflow-x: hidden;
                    text-overflow: ellipsis;
                    text-align: left;
                    border: 1px solid rgba(214, 222, 248, 1);
                    cursor: pointer;
                    &:not(:first-child) {
                        margin-top: 12px;
                    }
                    &.active, &:hover {
                        color: rgba(50, 88, 222, 1);
                    }
                }
            }
        }
        .inner {
            display: flex;
            justify-content: center;
            .tablist {
                display: flex;
                .tabitem {
                    height: 22px;
                    border-radius: 2px;
                    border: 1px solid rgba(211, 212, 214, 1);
                    color: rgba(96, 98, 102, 1);
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    padding: 0 8px 1px 8px;
                    &:not(:first-child) {
                        margin-left: 12px;
                    }
                    &.active, &:hover {
                        color: #fff;
                        background-color: rgba(50, 88, 222, 1);
                        border-color: rgba(50, 88, 222, 1);
                    }
                }
            }
            &.lefttab {
                justify-content: flex-start;
            }
        }
        .little {
            font-size: 14px;
            .tablist {
                display: flex;
                .tabitem {
                    color: #303133;
                    padding-bottom: 4px;
                    border-bottom: 2px solid transparent;
                    &:hover, &.active {
                        color: #3258DE;
                        border-color: #3258DE;
                    }
                    &:not(:first-child) {
                        margin-left: 20px;
                    }
                }
            }
        }
    }
</style>