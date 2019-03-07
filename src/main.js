import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
console.table(process.env)
console.log(103, store)
store.commit({ type: 'app/APP', app: '12345679' })
store.commit({ type: 'app/LOADING', loading: 'abc' })
store.commit({ type: 'user/NAME', name: 'JJJ' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
