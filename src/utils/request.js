import axios from 'axios'
import store from '@/store'
// axios.defaults.crossDomain = true
// axios.defaults.withCredentials = true
// store.dispatch('getUserName', {
//   userName: 'Toweave-123'
// })
const baseAxios = axios.create({
  baseURL: process.env.VUE_APP_API,
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
  if (options.ip) {
    options.baseURL = process.env[`VUE_APP_API_${options.ip}`]
  }
  store.commit({ type: 'app/LOADING', loading: true })
  const response = await baseAxios(url, options)
  store.commit({ type: 'app/LOADING', loading: false })
  return checkStatus(response)
}

export async function requestOldApi (url, options) {
  if (options.ip) {
    options.baseURL = process.env[`VUE_APP_API_${options.ip}`]
  }
  store.commit({ type: 'LOADING', loading: true })
  const response = await baseAxios(url, options)
  store.commit({ type: 'LOADING', loading: false })
  return checkStatusOldApi(response)
}

export async function requestNotLoading (url, options) {
  if (options.ip) {
    options.baseURL = process.env[`VUE_APP_API_${options.ip}`]
  }
  const response = await baseAxios(url, options)
  return checkStatus(response)
}

export async function requestNoAlert (url, options) {
  if (options.ip) {
    options.baseURL = process.env[`VUE_APP_API_${options.ip}`]
  }
  const response = await baseAxios(url, options)
  return checkStatusNoAlert(response)
}

export async function requestConcurrence (url, options, indexLoading) {
  if (options.ip) {
    options.baseURL = process.env[`VUE_APP_API_${options.ip}`]
  }
  let loadings = store.state.loadings
  store.commit({ type: 'LOADING', loading: true })
  if (!indexLoading && indexLoading !== 0) {
    store.commit({ type: 'LOADINGS', loadings: [true] })
  } else {
    loadings[indexLoading] = true
    store.commit({ type: 'LOADINGS', loadings: loadings })
  }
  const response = await baseAxios(url, options)
  if (!indexLoading && indexLoading !== 0) {
    store.commit({ type: 'LOADINGS', loadings: [false] })
  } else {
    loadings[indexLoading] = false
    store.commit({ type: 'LOADINGS', loadings: loadings })
  }
  let loadingsBoolean = loadings.every((item) => {
    return item === false
  })
  if (loadingsBoolean) {
    store.commit({ type: 'LOADING', loading: false })
  }
  const data = checkStatus(response)
  return data.data
}
