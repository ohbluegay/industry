<template>
    <div class="enterprovince">
        <div class="entermap">
            <div class="maptitle">
                <span>当前企业数：</span>
                <span class="active">{{total}}</span>
            </div>
            <div class="mapwrap">
                <geomap
                    mapName="china"
                    :geolocation="geolocation"
                    :data="enterList"
                />
            </div>
        </div>
        <div class="enterrank">
            <div class="header">
                <span v-for="item in tableHead" :key="item.field" :class="item.type" :style="item.width ? {'width': item.width + 'px'} : {'flex': '1'}">{{item.title}}</span>
            </div>
            <div class="enterbody">
                <template v-for="(item, index) in enterList">
                    <div v-if="index < 10" class="tr" :key="index">
                        <span v-for="sub in tableHead" :key="sub.field" :class="sub.type" :style="sub.width ? {'width': sub.width + 'px'} : {'flex': '1'}">
                            {{item[sub.field]}}
                        </span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import geomap from 'components/chart/map'
import { getSource } from 'utils/api/source'
import { getMapGeo } from "utils/api/map"
export default {
    data() {
        return {
            enterList: [],
            geolocation: {
                type: "FeatureCollection",
                features: [],
            },
            total: 0,
            tableHead: [
                { title: '中国', field: 'name', type: 'left', width: 80 },
                { title: '公司数', field: 'value', type: 'right', width: 50 },
                { title: '占比(%)', field: 'percent', type: 'right' }
            ]
        }
    },
    components: {
        geomap
    },
    methods: {
        getMapState() {
            getSource({ source: 'province_enter' }).then(res => {
                this.enterList = res.sort((a, b) => b.value - a.value)
                this.total = res.reduce((sum, item) => {
                    sum = sum + item.value
                    return sum
                }, 0)
            })
        },
        getMap(code) {
            this.geolocation = {
                type: "FeatureCollection",
                features: []
            };
            getMapGeo({ code }).then((res) => {
                this.geolocation = res;
            });
        }
    },
    created() {
        this.getMapState()
        this.getMap(100000)
    }

}
</script>

<style lang="less" scoped>
    .enterprovince {
        padding: 10px 60px 20px;
        display: flex;
        .entermap {
            font-size: 14px;
            color: #303133;
            flex: 1 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            .maptitle {
                width: 460px;
            }
            .active {
                color: #F5A623;
            }
            .mapwrap {
                width: 460px;
                height: 400px;
            }
        }
        .enterrank {
            width: 300px;
            font-size: 12px;
            color: rgba(96, 98, 102, 1);
            line-height: 32px;
            .left {
                text-align: left;
            }
            .right {
                text-align: right;
            }
            .header {
                border-radius: 2px 2px 0 0;
                background-color: rgba(245, 246, 251, 1);
                border: 1px solid rgba(214, 222, 248, 1);
                display: flex;
                padding: 0 32px;
            }
            .enterbody {
                .tr {
                    padding: 0 32px;
                    display: flex;
                    span {
                        white-space: nowrap;
                        overflow-x: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }
</style>