/**
 * Created by lizi on 2017/5/3.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import {getCookie} from '@/utils/widget'

let userName = getCookie('userName')
console.log(12, userName)

Vue.use(Vuex)

const state = {
  userName: userName,
  loading: false,
  loadings: [false],
  alert: {
    show: false,
    title: '',
    content: '',
    buttonLeft: '',
    buttonRight: '',
    functionLeft: null,
    functionRight: null
  },
  config: null
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
