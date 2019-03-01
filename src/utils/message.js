import { Message } from 'element-ui'
// 数据成功的提示
export function MS (message) {
  Message({
    type: 'success',
    message
  })
}
// 数据失败的提示
export function ME (message = '服务器出错，请联系后台管理人员') {
  Message({
    type: 'error',
    showClose: true,
    message
  })
}
