import * as types from './mutation-types'
// import * as apiService from './services/method'
import { getLocalStorage } from '@/utils/widget'

export default {
  async getUserName ({
    commit,
    state
  }, data) {
    commit(types.USER_NAME, {
      userName: data.userName
    })
  },
  async getUserConfig ({
    commit,
    state
  }) {
    let userInfo = getLocalStorage('userInfo')
    commit(types.SET_CONFIG, {
      config: userInfo
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
