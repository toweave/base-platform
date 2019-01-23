import { request, requestOldApi, requestNoAlert, requestNoLoading } from '@/utils/request'
export function userEmailVerify (values) {
  return request('/userinfo/verify', {
    method: 'GET',
    params: values,
    ip: 0
  })
}

export function userEmailActive (values) {
  return requestNoLoading('/userinfo/active', {
    method: 'POST',
    params: values,
    ip: 0
  })
}

export function userLoginNew (values) {
  return requestNoAlert('/user/login2', {
    method: 'POST',
    data: values,
    ip: 2
  })
}

export function userLogin (values) {
  return requestOldApi('/user/login2', {
    method: 'POST',
    data: values,
    ip: 2
  })
}
