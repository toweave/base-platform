/**
 * @author Toweave (lizi)
 * @date 2018/5/3
 * @Description: plugins
 */
export default {
  install (Vue) {
    // 1. 注入全局组件
    Vue.mixin({
      methods: {
        testMethods () {
          console.log(19, this)
        }
      },
      created: function () {
        // 逻辑...
      }
    })

    // 2. 添加实例方法
    Vue.prototype.$formattingNumber = function (number, decimal, boolean) {
      if (isNaN(number) || number === null) {
        return '--'
      } else {
        if (isNaN(decimal)) {
          decimal = 0
        }
        let newNumber = Number(number)
        if (newNumber === 0) {
          return '--'
        } else {
          if (boolean !== true && boolean !== undefined) {
            return newNumber.toFixed(decimal)
          } else {
            return (newNumber.toFixed(decimal)).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
          }
        }
      }
    }

    /**
     * 设置其他方法挂载到vue
     * @constructor
     */
    Vue.prototype.$getCookie = function (cookieName) {
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

    Vue.prototype.$setCookie = function (cookieName, value, expiredays) {
      let exDate = new Date()
      exDate.setDate(exDate.getDate() + expiredays)
      document.cookie = cookieName + '=' + encodeURIComponent(JSON.stringify(value)) +
        ((expiredays !== null && expiredays !== '' && expiredays !== undefined) ? '; expires=' + exDate.toGMTString() : '') + '; path=/'
    }

    Vue.prototype.$checkCookie = function (message) {
      let messageCookie = Vue.prototype.$getCookie(message)
      if (messageCookie !== null && messageCookie !== '' && messageCookie !== undefined) {
        console.warn('Exist Cookie')
        return true
      } else {
        console.warn('Not Exist Cookie')
        return false
      }
    }
    Vue.prototype.$delCookie = function (name) {
      let exp = new Date()
      let cookieName = Vue.prototype.$getCookie(name)
      exp.setTime(exp.getTime() - 1)
      if (cookieName !== null && cookieName !== '' && cookieName !== undefined) {
        document.cookie = name + '=' + cookieName + ';expires=' + exp.toGMTString()
      }
      // alert('你清空了cookie信息。');
    }
    Vue.prototype.$setLocalStorage = function (name, value) {
      localStorage.setItem(name, JSON.stringify(value))
    }
    Vue.prototype.$getLocalStorage = function (name) {
      return JSON.parse(localStorage.getItem(name))
    }
    Vue.prototype.$delLocalStorage = function (name) {
      localStorage.removeItem(name)
    }
    window.addEventListener('storage', onStorageChange)
    function onStorageChange (e) {
      console.log(665, e)
    }
    // end
  }
}
