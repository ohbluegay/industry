<template>
    <div class="atlas">
        <div class="list">
            <enterlist title="上游产业" :list="linkSource.type1" />
        </div>
        <div class="arrow"><svg-icon iconName="next" /></div>
        <div class="list">
            <enterlist title="中游产业" :list="linkSource.type2" />
        </div>
        <div class="arrow"><svg-icon iconName="next" /></div>
        <div class="list">
            <enterlist title="下游产业" :list="linkSource.type3" />
        </div>
    </div>
</template>

<script>
import enterlist from 'components/enterlist'
import { getSource } from 'utils/api/source'
import { formatEnter } from 'utils'
export default {
    data() {
        return {
            linkSource: {
                type1: [],
                type2: [],
                type3: []
            }
        }
    },
    components: {
        enterlist
    },
    methods: {
        getAtlas() {
            getSource({ source: 'enter' }).then(res => {
                this.linkSource = formatEnter(res)
            })
        }
    },
    created() {
        this.getAtlas()
    }
}
</script>

<style lang="less" scoped>
    .atlas {
        display: flex;
        justify-content: space-between;
        .list {
            width: 280px;
        }
        .arrow {
            width: 48px;
            display: flex;
            align-items: center;
            svg {
                width: 48px;
                height: 40px;
            }
        }
    }
</style>