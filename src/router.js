// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from './views/Home.vue'
//
// Vue.use(Router)
//
// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//     }
//   ]
// })
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import ModuleErrors from '@/router/errors'
import Base from '@/router/base'
import Map from '@/router/map'
import Star from '@/router/star'
import Message from '@/router/message'
const ParentMain = () => import(/* webpackChunkName: "layouts" */ '@/layouts/Main')
const Login = () => import(/* webpackChunkName: "layouts" */ '@/layouts/Login')
const ApiTest = () => import(/* webpackChunkName: "views" */ '@/views/ApiTest')
const Shape = () => import(/* webpackChunkName: "views" */ '@/views/Shape')

Vue.use(Router)

const router = new Router({
  // mode: 'hash',
  // base: __dirname,
  // mode: 'history',
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'ParentMain',
      meta: { title: '数据地图测试' },
      component: ParentMain,
      alias: '',
      redirect: '/error',
      children: [
        Base,
        Map,
        Star,
        Message
      ]
    },
    {
      path: '/login',
      name: 'Login',
      meta: { title: 'Login' },
      component: Login
    },
    {
      path: '/api-test',
      name: 'ApiTest',
      meta: { title: 'APi 测试' },
      component: ApiTest
    },
    {
      path: '/shape',
      name: 'Shape',
      meta: { title: '形状测试' },
      component: Shape
    },
    ModuleErrors.errorLayout,
    ModuleErrors.errorMatching
  ]
})

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start() // finish progress bar
  if (to.query.pageName) {
    document.title = to.query.pageName
  } else if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path !== '/login') {
    if (store.state.userName) {
      next()
    } else {
      next()
      // let redirectURL = encodeURIComponent(location.href)
      // next(`/login?redirectURL=${redirectURL}`)
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
export default router
