import axios from 'axios'
import store from '@/store'
// axios.defaults.crossDomain = true
// axios.defaults.withCredentials = true
// store.dispatch('getUserName', {
//   userName: 'Toweave-123'
// })
let debugCase = 999 // 1: 本地调试  2: 测试环境 3: 预览测试 999: 正式环境
let baseUrl = {}
switch (debugCase) {
  case 0: // 本地调试连接
    baseUrl.ip0 = 'http://192.168.1.109:8080'
    baseUrl.ip1 = 'http://172.17.29.16:8080'
    break
  case 1: // 本地调试连接
    baseUrl.ip0 = 'http://172.17.29.16:8080'
    baseUrl.ip1 = 'http://172.17.29.16:8080'
    break
  case 2: // 测试环境链接
    baseUrl.ip0 = 'http://47.106.156.173:8080'
    baseUrl.ip1 = 'http://47.106.156.173:9999'
    break
  case 3: // 测试环境链接 wifi
    baseUrl.ip0 = 'http://172.17.250.111:8080'
    baseUrl.ip1 = 'http://47.106.156.173:9999'
    break
  case 999: // 正式环境
    baseUrl.ip0 = 'http://jsonplaceholder.typicode.com'
    baseUrl.ip1 = 'http://jsonplaceholder.typicode.com'
    break
}
console.log('store::', store)
const baseAxios = axios.create({
  baseURL: baseUrl,
  timeout: 1000 * 60 * 60 * 2 // 60s 超时
  // params: {
  //   ID: 12345
  // },
  // withCredentials: false,
  // // headers: {
  //   'X-Custom-Header': 'foobar',
  //   'Authorization': '12345679',
  //   'X-Token': '12345679abc'
  // }
})

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    let res = response.data
    if (res.code === 0) {
      return res.data
    } else {
      store.commit({
        type: 'ACTIVE_ALERT',
        alert: {
          show: true,
          title: '提示',
          content: res.message,
          buttonLeft: '确定'
        }
      })
    }
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function checkStatusNoAlert (response) {
  if (response.status >= 200 && response.status < 300) {
    let res = response.data
    if (res.code === 0) {
      return res.data
    }
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "axios"
 * @return {object}           An object containing either "data" or "err"
 */
export async function request (url, options) {
  if (options.hasOwnProperty('ip') && options.ip) {
    options.baseURL = baseUrl['ip' + options.ip]
  }
  store.commit({type: 'ACTIVE_LOADING', loading: true})
  const response = await baseAxios(url, options)
  store.commit({type: 'ACTIVE_LOADING', loading: false})
  return checkStatus(response)
}

export async function requestNoLoading (url, options) {
  if (options.hasOwnProperty('ip') && options.ip) {
    options.baseURL = baseUrl['ip' + options.ip]
  }
  const response = await baseAxios(url, options)
  return checkStatus(response)
}

export async function requestNoAlert (url, options) {
  if (options.hasOwnProperty('ip') && options.ip) {
    options.baseURL = baseUrl['ip' + options.ip]
  }
  const response = await baseAxios(url, options)
  return checkStatusNoAlert(response)
}

export async function requestConcurrence (url, options, indexLoading) {
  console.log('loadings:', store.state.loadings)
  let loadings = store.state.loadings
  store.commit({type: 'ACTIVE_LOADING', loading: true})
  if (!indexLoading && indexLoading !== 0) {
    store.commit({type: 'ACTIVE_LOADINGS', loadings: [true]})
  } else {
    loadings[indexLoading] = true
    store.commit({type: 'ACTIVE_LOADINGS', loadings: loadings})
  }
  const response = await baseAxios(url, options)
  if (!indexLoading && indexLoading !== 0) {
    store.commit({type: 'ACTIVE_LOADINGS', loadings: [false]})
  } else {
    loadings[indexLoading] = false
    store.commit({type: 'ACTIVE_LOADINGS', loadings: loadings})
  }
  console.log('loadings++:', store.state.loadings)
  let loadingsBoolean = loadings.every((item) => {
    return item === false
  })
  if (loadingsBoolean) {
    store.commit({type: 'ACTIVE_LOADING', loading: false})
  }
  const data = checkStatus(response)
  return data.data
}
