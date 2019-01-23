/* =======================================
 * @Author: Toweave (lizi)
 * @Blog: http://www.toweave.com/
 * @Date: 2018/8/15 15:45
 * @Description: create error route module
 * ======================================== */
export function getCookie (cookieName) {
  if (typeof cookieName !== 'string') {
    throw new Error(`TypeError: Parameter type must be string. Parameter value : ${cookieName}`)
  }
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(cookieName + '=')
    if (start !== -1) {
      start = start + cookieName.length + 1
      let end = document.cookie.indexOf(';', start)
      if (end === -1) end = document.cookie.length
      return decodeURIComponent(document.cookie.substring(start, end))
    }
  }
}
export function setCookie (cookieName, value, expireDays, path = '/', domain = location.hostname) {
  let expire = new Date()
  expire.setDate(expire.getDate() + expireDays)
  document.cookie = cookieName + '=' + encodeURIComponent(value) +
    ((expireDays !== null && expireDays !== '' && expireDays !== undefined) ? '; expires=' + expire.toGMTString() : '') +
    '; path=' + path + '; domain=' + domain
}
export function deleteCookie (name) {
  let expire = new Date()
  let cookieName = getCookie(name)
  expire.setTime(expire.getTime() - 1)
  if (cookieName !== null && cookieName !== '' && cookieName !== undefined) {
    document.cookie = name + '=' + cookieName + ';expires=' + expire.toGMTString()
  }
  // alert('你清空了cookie信息。');
}
export function setLocalStorage (name, value) {
  localStorage.setItem(name, value)
}
export function getLocalStorage (name) {
  return localStorage.getItem(name)
}
export function deleteLocalStorage (name) {
  localStorage.removeItem(name)
}
export function hasScrollbar (selector) {
  let querySelector = document.querySelector(selector)
  return querySelector.firstChild.clientHeight > querySelector.clientHeight
}
export function getScrollbarWidth (selector) {
  let querySelector = document.querySelector(selector)
  return querySelector.offsetWidth - querySelector.clientWidth
}

function resolveAfter2Seconds () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved')
    }, 2000)
  })
}

export async function asyncCall () {
  let result = await resolveAfter2Seconds()
  console.log(result)
  // expected output: 'resolved'
}
