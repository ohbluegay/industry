<template>
    <div ref="map" class="chart map"></div>
</template>

<script>
export default {
    data() {
        return {
            myChart: null,
            chartOptions: {
                grid: {
                    top: 0,
                    bottom: 0
                },
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderColor: 'transparent',
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                        lineHeight: 42
                    },
                    extraCssText: 'border-radius: 2px;',
                    formatter: params => {
                        const { name, value } = params
                        return `<span style="display:inline-block;margin-right:4px;border-radius:4px;width:8px;height:8px;background-color: rgba(255, 142, 13, 1);"></span><span>${name}</span><span style="margin-left: 30px;">${value}</span>`
                    }
                },
                visualMap: {
                    left: 'left',
                    min: 0,
                    max: 1,
                    text: ['高', '低'],
                    itemWidth: 10,
                    itemHeight: 70,
                    realtime: false,
                    calculable: true,
                    inRange: {
                        color: ['#dee9ff', '#b5ccff', '#88a8f7', '#5b7feb', '#3258de']
                    }
                },
                series: [
                    {
                        type: 'map',
                        top: 10,
                        bottom: 40,
                        emphasis: {
                            label: false,
                            itemStyle: {
                                areaColor: '#FF8E0D',
                            }
                        },
                        select: {
                            itemStyle: {
                                areaColor: '#FF8E0D',
                            },
                            label: false
                        },
                        data: []
                    }
                ]
            },
        }
    },
    props: {
        geolocation: {
            type: Object
        },
        data: {
            type: Array
        },
        mapName: {
            type: String,
            default: 'china'
        }
    },
    watch: {
        geolocation: {
            handler(val) {
                if (val) this.resize()
            },
            deep: true,
            immediate: true
        },
        data: {
            handler(val) {
                if (val) this.resize()
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        renderOptions() {
            this.chartOptions.visualMap.max = this.data.length > 0 ? Math.max(...this.data.map(item => item.value)) : 0
            this.chartOptions.series[0].map = this.mapName
            this.chartOptions.series[0].data = this.data
            return this.chartOptions
        },
        resize() {
            if (!this.geolocation.features.length) return
            this.$echarts.registerMap(this.mapName, this.geolocation)
            setTimeout(() => {
                this.myChart.setOption(this.renderOptions(), true);
                this.myChart.resize();
            }, 500)
        },
        mapClick(params) {
            this.$emit('mapClick', params)
        }
    },
    mounted() {
        const chart = this.$refs.map
        this.myChart = this.$echarts.init(chart)
        window.addEventListener("resize", () => {
            this.myChart && this.myChart.resize();
        });
        this.myChart.on('click', (params) => this.mapClick(params))
    }
}
</script>

<style>
    .map {
        width: 100%;
        height: 100%;
    }
</style>