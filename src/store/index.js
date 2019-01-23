/**
 * Created by lizi on 2017/5/3.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import { getCookie, getLocalStorage } from '@/utils/widget'

let userName = getCookie('userName')
userName = userName && JSON.parse(userName)
let userInfo = getLocalStorage('userInfo')
userInfo = userInfo && JSON.parse(userInfo)

Vue.use(Vuex)

const state = {
  userName: userName,
  userInfo: userInfo,
  baseURL: 'http://data.yiguo.com/',
  serviceTime: null,
  loading: false,
  loadings: [false],
  areaData: null,
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
