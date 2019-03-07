import * as types from './mutation-types'

export default {
  [types.NAME] (state, {
    name
  }) {
    state.name = name
  }
}
