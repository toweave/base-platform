/* =======================================
 * @Author: Toweave (lizi)
 * @Blog: http://www.toweave.com/
 * @Date: 2018/8/15 15:45
 * @Description: create error route module
 * ======================================== */
const BaseIndex = () => import(/* webpackChunkName: "import-base" */ '@/views/base/Index')
const BasePool = () => import(/* webpackChunkName: "import-base" */ '@/views/base/Pool')
const BaseDaily = () => import(/* webpackChunkName: "import-base" */ '@/views/base/Daily')

const Base = {
  path: 'base',
  name: 'BaseIndex',
  meta: { title: '仓端' },
  component: BaseIndex,
  // alias: '',
  children: [
    {
      path: 'pool',
      name: 'BasePool',
      meta: { title: '基地订单池监控' },
      component: BasePool
    }, {
      path: 'daily',
      name: 'BaseDaily',
      meta: { title: '基地日常运营监控' },
      component: BaseDaily,
      alias: ''
    }
  ]
}

export default Base
