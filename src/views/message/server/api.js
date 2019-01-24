import { request, requestNotLoading } from '@/utils/request'
// const option = {
//   method: 'GET',
//   // params: {
//   //   ID: 12345
//   // },
//   responseType: 'json', // 默认的
//   timeout: 6000
// }

export function apiMessages (params) {
  return request(`/map/index/messageList`, {
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

export function star (params) {
  return request(`/map/index/focusAction`, {
    method: 'POST',
    data: params
  })
}

export function like (params) {
  return request(`/map/index/thumbupAction`, {
    method: 'POST',
    data: params
  })
}
