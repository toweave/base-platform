/* =======================================
 * @Author: Toweave (lizi)
 * @Blog: http://www.toweave.com/
 * @Date: 2018/8/15 15:45
 * @Description: create error route module
 * ======================================== */
const DatePluginIndex = () => import(/* webpackChunkName: "group-date" */ '@/pages/date-plugin/Index')
const DatePluginCreate = () => import(/* webpackChunkName: "group-date" */ '@/pages/date-plugin/Create')

const DatePlugin = {
  path: 'date-plugin',
  name: 'DatePluginIndex',
  component: DatePluginIndex,
  children: [
    {
      path: 'create',
      name: 'DatePluginCreate',
      component: DatePluginCreate,
      alias: ''
    }
  ]
}

export default DatePlugin
