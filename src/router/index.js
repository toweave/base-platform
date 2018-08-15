import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import ModuleErrors from './errors'
import DataImport from './data-import'
import SelfService from './self-service'

const HeaderSide = () => import(/* webpackChunkName: "group-side" */ '@/layouts/HeaderSide')

console.log(13, ModuleErrors)
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
        DataImport,
        SelfService
      ]
    },
    ModuleErrors.errorLayout,
    ModuleErrors.errorMatching
  ]
})

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  NProgress.start() // finish progress bar
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
export default router
