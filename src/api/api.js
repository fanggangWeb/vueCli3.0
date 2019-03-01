import fetch from '@/utils/fetch'
import qs from 'qs'
export const HTTP = ''
// 登陆接口
export function login (data) {
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/authentication/form`,
    data,
    method: 'post',
    load: true
  })
}