<template>
    <div ref="line" class="chart line"></div>
</template>

<script>
import rgbColor from 'color-rgba'
export default {
    data() {
        return {
            myChart: null,
            chartOptions: {
                xAxis: {
                    type: 'category'
                },
            },
            colorList: ['#536DFE', '#FFB980', '#84D22F', '#FF7485']
        }
    },
    props: {
        options: {},
        data: {
            type: Array
        },
    },
    watch: {
        options: {
            handler(val) {
                if (val) this.resize()
            },
            deep: true
        },
        data: {
            handler(val) {
                if (val) this.resize()
            },
            deep: true
        }
    },
    methods: {
        formatType(type) {
            if (type === 'area') return 'line'
            return type
        },
        renderOptions() {
            const chartOptions = {
                color: this.colorList,
                grid: {
                    top: 20,
                    bottom: 50,
                    left: 40,
                    right: 40
                },
                legend: {
                    textStyle: {
                        color: '#303133'
                    },
                    bottom: 3
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        symbol: 'none',
                        lineStyle: {
                            color: "#D6DEF8"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#303133',
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: true,
                        symbol: 'none',
                        lineStyle: {
                            color: "#D6DEF8"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#303133',
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#D6DEF8",
                            type: 'dashed'
                        }
                    }
                },
                series: []
            }
            const { keys, types, rightAxis, xAxis, legend, area, title } = this.options
            if (title) {
                chartOptions.title = {
                    show: true,
                    text: title,
                    textStyle: {
                        color: '#303133',
                        fontSize: 14
                    },
                    left: 0,
                    top: 0
                }
            }
            chartOptions.xAxis.data = this.data.map(sub => sub[xAxis])
            keys.map((item, index) => {
                const obj = {
                    name: legend && legend[index],
                    type: this.formatType(types[item]),
                    data: this.data.map(sub => sub[item])
                }
                if (rightAxis && rightAxis.includes(item)) obj.yAxisIndex = 1
                if (types[item] === 'bar') {
                    obj.barMaxWidth = 15
                    obj.itemStyle = {
                        normal: {
                            barBorderRadius: obj.stack === "multi" ? 0 : 2,
                        }
                    }
                }
                if (area && area.includes(item)) {
                    const rgba = rgbColor(this.colorList[index])
                    obj.showSymbol = false
                    obj.color = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, .5)`
                    obj.areaStyle = {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0, color: `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 1)`,
                                },{
                                    offset: 0.4, color: `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 0.5)`,
                                }, {
                                    offset: 1, color: `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 0)`
                                }
                            ],
                            global: false
                        }
                    }
                }
                chartOptions.series.push(obj)
            })
            if (!rightAxis) chartOptions.grid.right = 15
            if (title) chartOptions.grid.top = 35
            if (!legend) chartOptions.grid.bottom = 20
            if (rightAxis && rightAxis.length) {
                chartOptions.yAxis = [
                    {
                        type: 'value',
                        axisLine: {
                            show: true,
                            symbol: 'none',
                            lineStyle: {
                                color: "#D6DEF8"
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: '#D6DEF8'
                            }
                        },
                        axisLabel: {
                            color: '#303133',
                        },
                        splitLine: {
                            show: false
                        }
                    }, {
                        type: 'value',
                        axisLine: {
                            show: true,
                            symbol: 'none',
                            lineStyle: {
                                color: "#D6DEF8"
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: '#D6DEF8'
                            }
                        },
                        axisLabel: {
                            color: '#303133',
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ]
            }
            return chartOptions
        },
        resize() {
            if (!this.myChart) {
                const chart = this.$refs.line
                this.myChart = this.$echarts.init(chart)
            }
            this.myChart.setOption(this.renderOptions(), true);
            this.myChart.resize();
        },
    },
    mounted() {
        const chart = this.$refs.line
        this.myChart = this.$echarts.init(chart)
        this.myChart.setOption(this.renderOptions())
        window.addEventListener("resize", () => {
            this.myChart && this.myChart.resize();
        });
    }
}
</script>

<style>
    .chart {
        width: 100%;
        height: 100%;
    }
</style>