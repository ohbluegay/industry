import Vue from 'vue'
import VueRouter from 'vue-router'
import home from 'views'
import industry from 'pages/industry'
import industryDetail from 'pages/industry/detail'
// 跳转到同一路由的报错解决
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return routerPush.call(this, location, onResolve, onReject)
    return routerPush.call(this, location).catch((error) => error)
}
Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: home,
    redirect: '/industry/detail',
    children: [
        {
            path: '/industry',
            component: industry
        }, {
            path: '/industry/detail',
            component: industryDetail
        }
    ]
}]

var router = new VueRouter({
    routes
})
export default router
