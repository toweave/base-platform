import * as types from './mutation-types'

export default {
  [types.USER_NAME] (state, {
    userName
  }) {
    state.userName = userName
  },
  [types.USER_INFO] (state, {
    userInfo
  }) {
    state.userInfo = userInfo
  },
  [types.BASE_URL] (state, {
    baseURL
  }) {
    state.baseURL = baseURL
  },
  [types.SERVICE_TIME] (state, {
    serviceTime
  }) {
    state.serviceTime = serviceTime
  },
  [types.AREA_DATA] (state, {
    areaData
  }) {
    state.areaData = areaData
  },
  [types.ACTIVE_LOADING] (state, {
    loading
  }) {
    state.loading = loading
  },
  [types.ACTIVE_LOADINGS] (state, {
    loadings
  }) {
    state.loadings = loadings
  },
  [types.ACTIVE_ALERT] (state, {
    alert
  }) {
    state.alert = alert
  },
  [types.SET_CONFIG] (state, {
    config
  }) {
    state.config = config
  }
}
