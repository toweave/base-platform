import getters from '@/store/app/getters'
import actions from '@/store/app/action'
import mutations from '@/store/app/mutations'

const state = {
  app: 'base-platform',
  loading: false,
  loadings: [false, false]
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
