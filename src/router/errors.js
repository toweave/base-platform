/* =======================================
 * @Author: Toweave (lizi)
 * @Blog: http://www.toweave.com/
 * @Date: 2018/8/15 15:45
 * @Description: create error route module
 * ======================================== */
const ParentHeaderSide = () => import(/* webpackChunkName: "group-error" */ '@/layouts/HeaderSide')
const NotFound = () => import(/* webpackChunkName: "group-error" */ '@/pages/404')

const errorLayout = {
  path: '/error',
  name: 'ParentHeaderSide',
  component: ParentHeaderSide,
  children: [
    {
      path: '404',
      name: 'NotFound',
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
