import * as types from './mutation-types'
// import * as apiService from './services/method'
import { getLocalStorage } from '@/utils/widget'

export default {
  async getAppName ({
    commit,
    state
  }, data) {
    commit(types.APP, {
      app: data.app
    })
  },
  async getUserConfig ({
    commit,
    state
  }) {
    let app = getLocalStorage('app')
    commit(types.APP, {
      config: app
    })
    // if (state.userName) {
    //   let params = {
    //     username: state.userName
    //   }
    //   let requestService = apiService.messageList(params)
    //   requestService.then((res) => {
    //     commit(types.SET_CONFIG, {
    //       config: res.rows
    //     })
    //   })
    // }
    // end
  }
}
