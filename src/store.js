import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/app'
import user from '@/store/user'
console.log(5, 'store app:', app)
console.log(6, 'store user:', user)

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  strict: debug,
  modules: {
    app,
    user
  }
})
