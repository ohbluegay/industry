<template>
    <div class="atlas">
        <div class="atlas-content" @click="linkSearch('EDA软件')">
            <div class="atlas-lines" />
            <div class="atlas-tabs">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        resize() {

        },
        linkSearch(val) {
            this.$parent.searchChild(val)
        }
    },
    created() {
        window.addEventListener('resize', () => {
            this.resize()
        })
        this.resize()
    },
    beforeDestroy() {
        window.removeEventListener('resize', () => {
            this.resize()
        })
    }
}
</script>

<style lang="less" scoped>
    .atlas {
        .atlas-content {
            height: 500px;
            background: url(../../../assets/net.png) no-repeat;
            background-size: 100% 100%;
            position: relative;
            .atlas-lines {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: url('../../../assets/dianzi.png') no-repeat;
                background-size: 100% 100%;
                z-index: 1;
            }
        }
    }
</style>