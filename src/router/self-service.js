/* =======================================
 * @Author: Toweave (lizi)
 * @Blog: http://www.toweave.com/
 * @Date: 2018/8/15 15:45
 * @Description: create error route module
 * ======================================== */
const SelfServiceIndex = () => import(/* webpackChunkName: "group-main" */ '@/pages/self-service/Index')
const SelfServiceCreate = () => import(/* webpackChunkName: "group-main" */ '@/pages/self-service/Create')

const SelfService = {
  path: '/self-service',
  name: 'SelfServiceIndex',
  component: SelfServiceIndex,
  children: [
    {
      path: '/create',
      name: 'SelfServiceCreate',
      component: SelfServiceCreate,
      alias: ''
    }
  ]
}

export default SelfService
