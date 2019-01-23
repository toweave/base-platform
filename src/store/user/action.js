import * as types from './mutation-types'
// import * as apiService from './services/method'
import { getLocalStorage } from '@/utils/widget'

export default {
  async getUserName ({
    commit,
    state
  }, data) {
    commit(types.NAME, {
      name: data.name
    })
  },
  async getUserConfig ({
    commit,
    state
  }) {
    let name = getLocalStorage('name')
    commit(types.NAME, {
      config: name
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
