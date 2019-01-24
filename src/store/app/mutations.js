import * as types from './mutation-types'

export default {
  [types.APP] (state, {
    app
  }) {
    console.log(7, app)
    state.app = app
  },
  [types.LOADING] (state, {
    loading
  }) {
    console.log(12, loading)
    state.loading = loading
  },
  [types.LOADINGS] (state, {
    loadings
  }) {
    state.loadings = loadings
  }
}
