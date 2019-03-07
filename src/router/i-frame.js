/* =======================================
 * @Author: Toweave (lizi)
 * @Blog: http://www.toweave.com/
 * @Date: 2018/8/15 15:45
 * @Description: create error route module
 * ======================================== */
const IFrameIndex = () => import(/* webpackChunkName: "i-frame" */ '@/pages/i-frame/Index')
const IFrameCreate = () => import(/* webpackChunkName: "i-frame" */ '@/pages/i-frame/Create')

const IFrame = {
  path: 'i-frame',
  name: 'IFrameIndex',
  component: IFrameIndex,
  children: [
    {
      path: 'create',
      name: 'IFrameCreate',
      component: IFrameCreate,
      alias: ''
    }
  ]
}

export default IFrame
