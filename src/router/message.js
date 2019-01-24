/* =======================================
 * @Author: Toweave (lizi)
 * @Blog: http://www.toweave.com/
 * @Date: 2018/8/15 15:45
 * @Description: create error route module
 * ======================================== */
const MessageIndex = () => import(/* webpackChunkName: "message" */ '@/views/message/Index')

const Message = {
  path: 'message',
  name: 'MessageIndex',
  meta: { title: '消息中心' },
  component: MessageIndex
}

export default Message
