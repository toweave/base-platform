/* =======================================
 * @Author: Toweave (lizi)
 * @Blog: http://www.toweave.com/
 * @Date: 2018/8/15 15:45
 * @Description: create error route module
 * ======================================== */
const StarIndex = () => import(/* webpackChunkName: "import-base" */ '@/views/star/Index')

const Star = {
  path: 'star',
  name: 'StarIndex',
  meta: { title: '我的关注' },
  component: StarIndex
}

export default Star
