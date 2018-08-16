/* =======================================
 * @Author: Toweave (lizi)
 * @Blog: http://www.toweave.com/
 * @Date: 2018/8/15 15:45
 * @Description: create error route module
 * ======================================== */
const DataImportIndex = () => import(/* webpackChunkName: "data-import" */ '@/pages/data-import/Index')
const DataImportCreate = () => import(/* webpackChunkName: "data-import" */ '@/pages/data-import/Create')

const DataImport = {
  path: 'data-import',
  name: 'DataImportIndex',
  component: DataImportIndex,
  alias: '',
  children: [
    {
      path: 'create',
      name: 'DataImportCreate',
      component: DataImportCreate,
      alias: ''
    }
  ]
}

export default DataImport
