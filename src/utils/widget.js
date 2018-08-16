/* =======================================
 * @Author: Toweave (lizi)
 * @Blog: http://www.toweave.com/
 * @Date: 2018/8/15 15:45
 * @Description: create error route module
 * ======================================== */
const getCookie = (cookieName) => {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(cookieName + '=')
    if (start !== -1) {
      start = start + cookieName.length + 1
      let end = document.cookie.indexOf(';', start)
      if (end === -1) end = document.cookie.length
      return JSON.parse(decodeURIComponent(document.cookie.substring(start, end)))
    }
  }
}
const setCookie = (cookieName, value, expiredays, path = '/', domain = location.hostname) => {
  console.log(37, cookieName, value, expiredays, path, domain)
  let expiredayDate = new Date()
  expiredayDate.setDate(expiredayDate.getDate() + expiredays)
  document.cookie = cookieName + '=' + encodeURIComponent(JSON.stringify(value)) +
    ((expiredays !== null && expiredays !== '' && expiredays !== undefined) ? '; expires=' + expiredayDate.toGMTString() : '') +
    '; path=' + path + '; domain=' + domain
}
const deleteCookie = (name) => {
  let exp = new Date()
  let cookieName = getCookie(name)
  exp.setTime(exp.getTime() - 1)
  if (cookieName !== null && cookieName !== '' && cookieName !== undefined) {
    document.cookie = name + '=' + cookieName + ';expires=' + exp.toGMTString()
  }
  // alert('你清空了cookie信息。');
}
const setLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value))
}
const getLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name))
}
const deleteLocalStorage = (name) => {
  localStorage.removeItem(name)
}

const widget = {
  getCookie,
  setCookie,
  deleteCookie,
  setLocalStorage,
  getLocalStorage,
  deleteLocalStorage
}

export default widget
