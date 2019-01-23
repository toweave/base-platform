import { requestOldApi } from '@/utils/request'
export function messageList (values) {
  return requestOldApi('/message/list', {
    method: 'GET',
    params: values,
    ip: 1
  })
}
