import { request, requestNotLoading } from '@/utils/request'
// const option = {
//   method: 'GET',
//   // params: {
//   //   ID: 12345
//   // },
//   responseType: 'json', // 默认的
//   timeout: 6000
// }

export function apiStarList (params) {
  return request(`/map/index/focusList`, {
    method: 'GET',
    params: params
  })
}

export function searchNotLoading (params) {
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
