import axios from 'axios'
import store from '@/store'
// axios.defaults.crossDomain = true
// axios.defaults.withCredentials = true
// store.dispatch('getUserName', {
//   userName: 'Toweave-123'
// })
let debugCase = 999 // 1: 本地调试  2: 测试环境 3: 预览测试 999: 正式环境
let baseURL = {}
switch (debugCase) {
  case 0: // 本地调试
    baseURL.ip0 = 'http://172.17.100.80:9072'
    baseURL.ip1 = 'http://172.17.29.16:8080'
    store.commit({
      type: 'BASE_URL',
      baseURL: 'http://testdata.yiguo.com/'
    })
    break
  case 1: // 测试环境
    baseURL.ip0 = 'http://172.17.8.230:9072' // 172.17.250.111
    baseURL.ip1 = 'http://172.17.250.111:9081'
    store.commit({
      type: 'BASE_URL',
      baseURL: 'http://testdata.yiguo.com/'
    })
    break
  case 2: // 预发布环境
    baseURL.ip0 = 'http://data.yiguo.com'
    baseURL.ip1 = 'http://172.17.2.48:8081'
    break
  case 999: // 正式环境
    baseURL.ip0 = 'http://172.17.2.51:9072'
    baseURL.ip1 = 'http://jsonplaceholder.typicode.com'
    break
}
const baseAxios = axios.create({
  baseURL: baseURL.ip0,
  timeout: 1000 * 60 * 60 * 2, // 60 * 60 * 2s 超时
  // params: {
  //   ID: 12345
  // },
  // withCredentials: false,
  headers: {
  //   'X-Custom-Header': 'foobar',
  //   'Authorization': '12345679',
  //   'X-Token': '12345679abc'
  // 'Content-Type': 'application/json;charset=UTF-8'
    'Content-Type': 'application/json;charset=UTF-8'
    // 'Content-Type': 'application/x-www-form-urlencoded'
  }
})

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    let res = response.data
    if (res.status === 0) {
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
    if (res.status === 0) {
      return res.data
    }
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function checkStatusOldApi (response) {
  if (response.status >= 200 && response.status < 300) {
    let res = response.data
    if (res.Code === 'SUCCESS') {
      return res.Data
    } else {
      store.commit({
        type: 'ACTIVE_ALERT',
        alert: {
          show: true,
          title: '提示',
          content: res.Message,
          buttonLeft: '我知道了'
        }
      })
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
    options.baseURL = baseURL['ip' + options.ip]
  }
  store.commit({ type: 'ACTIVE_LOADING', loading: true })
  const response = await baseAxios(url, options)
  store.commit({ type: 'ACTIVE_LOADING', loading: false })
  return checkStatus(response)
}

export async function requestOldApi (url, options) {
  if (options.hasOwnProperty('ip') && options.ip) {
    options.baseURL = baseURL['ip' + options.ip]
  }
  store.commit({ type: 'ACTIVE_LOADING', loading: true })
  const response = await baseAxios(url, options)
  store.commit({ type: 'ACTIVE_LOADING', loading: false })
  return checkStatusOldApi(response)
}

export async function requestNotLoading (url, options) {
  if (options.hasOwnProperty('ip') && options.ip) {
    options.baseURL = baseURL['ip' + options.ip]
  }
  const response = await baseAxios(url, options)
  return checkStatus(response)
}

export async function requestNoAlert (url, options) {
  if (options.hasOwnProperty('ip') && options.ip) {
    options.baseURL = baseURL['ip' + options.ip]
  }
  const response = await baseAxios(url, options)
  return checkStatusNoAlert(response)
}

export async function requestConcurrence (url, options, indexLoading) {
  if (options.hasOwnProperty('ip') && options.ip) {
    options.baseURL = baseURL['ip' + options.ip]
  }
  let loadings = store.state.loadings
  store.commit({ type: 'ACTIVE_LOADING', loading: true })
  if (!indexLoading && indexLoading !== 0) {
    store.commit({ type: 'ACTIVE_LOADINGS', loadings: [true] })
  } else {
    loadings[indexLoading] = true
    store.commit({ type: 'ACTIVE_LOADINGS', loadings: loadings })
  }
  const response = await baseAxios(url, options)
  if (!indexLoading && indexLoading !== 0) {
    store.commit({ type: 'ACTIVE_LOADINGS', loadings: [false] })
  } else {
    loadings[indexLoading] = false
    store.commit({ type: 'ACTIVE_LOADINGS', loadings: loadings })
  }
  let loadingsBoolean = loadings.every((item) => {
    return item === false
  })
  if (loadingsBoolean) {
    store.commit({ type: 'ACTIVE_LOADING', loading: false })
  }
  const data = checkStatus(response)
  return data.data
}
