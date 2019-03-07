import getters from '@/store/user/getters'
import actions from '@/store/user/action'
import mutations from '@/store/user/mutations'

const state = {
  name: 'lizi'
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
