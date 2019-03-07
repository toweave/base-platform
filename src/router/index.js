import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import ModuleErrors from './errors'
import DataImport from './data-import'
import SelfService from './self-service'
import IFrame from './i-frame'
import DatePlugin from './date-plugin'

const HeaderSide = () => import(/* webpackChunkName: "group-side" */ '@/layouts/HeaderSide')
const Login = () => import(/* webpackChunkName: "group-side" */ '@/layouts/Login')

console.log(13, DataImport, SelfService)
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  // mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'HeaderSide',
      component: HeaderSide,
      alias: '',
      children: [
        DataImport, // 默认主页
        SelfService,
        DatePlugin,
        IFrame
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    ModuleErrors.errorLayout,
    ModuleErrors.errorMatching
  ]
})

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  console.log(to, from)
  NProgress.start() // finish progress bar
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
export default router
