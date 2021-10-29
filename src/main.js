import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as echarts from 'echarts'
import * as moment from 'moment'
import "src/icons"
Vue.use(ElementUI)

Vue.prototype.$echarts = echarts;
Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
