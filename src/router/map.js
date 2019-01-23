/* =======================================
 * @Author: Toweave (lizi)
 * @Blog: http://www.toweave.com/
 * @Date: 2018/8/15 15:45
 * @Description: create error route module
 * ======================================== */
const MapIndex = () => import(/* webpackChunkName: "import-base" */ '@/views/map/Index')

const Map = {
  path: 'map',
  name: 'MapIndex',
  meta: { title: '数据地图' },
  component: MapIndex,
  alias: ''
}

export default Map
