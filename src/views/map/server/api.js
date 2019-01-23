import { request, requestNotLoading } from '@/utils/request'
const option = {
  method: 'GET',
  // params: {
  //   ID: 12345
  // },
  responseType: 'json', // 默认的
  timeout: 6000
}

export function fetch ({ page = 1, limit = 3 }) {
  return request(`/users?_limit=${limit}&_page=${page}`, option)
}

export function fetchNoLoading ({ page = 1, limit = 3 }) {
  return requestNotLoading(`/users?_limit=${limit}&_page=${page}`)
}

export function apiSearch (params) {
  return request(`/map/index/search`, {
    method: 'GET',
    params: params
  })
}

export function apiSearchNotLoading (params) {
  return requestNotLoading(`/map/index/search`, {
    method: 'GET',
    params: params
  })
}

export function apiStar (params) {
  return request(`/map/index/focusAction`, {
    method: 'POST',
    data: params
  })
}

export function apiLike (params) {
  return request(`/map/index/thumbupAction`, {
    method: 'POST',
    data: params
  })
}

export function apiMessages (params) {
  return request(`/map/index/messageList`, {
    method: 'GET',
    params: params
  })
}

export function apiChannels (params) {
  return request(`/map/index/init`, {
    method: 'GET',
    params: params
  })
}

export function apiRankIndicator (params) {
  return request(`/map/index/hotIndex`, {
    method: 'GET',
    params: params
  })
}

export function apiRankTable (params) {
  return request(`/map/index/hotReport`, {
    method: 'GET',
    params: params
  })
}

export function apiIndicatorTable (params) {
  return request(`/map/index/indexReportList`, {
    method: 'GET',
    params: params
  })
}
