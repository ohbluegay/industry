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
            total: 0
        }
    },
    components: {
        geomap
    },
    methods: {
        getMapState() {
            getSource({ source: 'province_enter' }).then(res => {
                this.enterList = res
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
            width: 460px;
            .active {
                color: #F5A623;
            }
            .mapwrap {
                height: 400px;
            }
        }
    }
</style>