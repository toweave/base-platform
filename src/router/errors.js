/* =======================================
 * @Author: Toweave (lizi)
 * @Blog: http://www.toweave.com/
 * @Date: 2018/8/15 15:45
 * @Description: create error route module
 * ======================================== */
const ErrorMain = () => import(/* webpackChunkName: "error" */ '@/layouts/Main')
const NotFound = () => import(/* webpackChunkName: "error" */ '@/views/404')

const errorLayout = {
  path: '/error',
  name: 'ErrorMain',
  component: ErrorMain,
  children: [
    {
      path: '404',
      name: 'NotFound',
      meta: { title: '404' },
      component: NotFound,
      alias: ''
    }
  ]
}
const errorMatching = { path: '*', redirect: '/error', hidden: true }

export default {
  errorLayout,
  errorMatching
}
