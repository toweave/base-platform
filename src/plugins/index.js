/**
 * @author Toweave (lizi)
 * @date 2018/5/3
 * @Description: plugins
 */
export default {
  install (Vue) {
    // 1. 注入全局组件
    Vue.mixin({
      data () {
        return {
        }
      },
      methods: {
        testMethods () {
        }
      },
      created: function () {
        // 逻辑...
      }
    })

    /* =======================================
     * @Author: Toweave (lizi)
     * @Blog: http://www.toweave.com/
     * @Date: 2018/9/12 17:55
     * @Description: 全局阈值参数
     * @Params: threshold
     * ======================================== */
    Vue.prototype.$threshold = {
      blast: 0.72,
      rateFinish: 75
    }
    Vue.prototype.$baseUrl = 'ws://172.17.2.48:8092'
    Vue.prototype.$baseUrlTMall = 'ws://172.17.2.48:8088'
    Vue.prototype.$color = {
      label: '#618496',
      white: '#fff',
      grey: '#6f95a7'
    }

    // 2. 添加实例方法
    Vue.prototype.$scrollToMainTop = function (value = 0) {
      if (isNaN(value)) {
        throw console.error('TypeError: Parameter type must be number. Parameter value : %s', value)
      } else {
        const scrollToTop = () => {
          let main = document.querySelector('#main')
          const scrollPosition = main.scrollTop
          if (scrollPosition > value) {
            main.scrollTo(value, scrollPosition - scrollPosition / 8)
            window.requestAnimationFrame(scrollToTop)
          }
        }
        scrollToTop()
      }
    }
    Vue.prototype.$formatNumber = (value, decimals, separators, points) => {
      if (!value && value !== 0) {
        return ''
      } else {
        /**
         * @author Toweave (lizi)
         * @date 2018/5/4
         * @Description: XXX
         * number：要格式化的数字
         * decimals：保留几位小数
         * point：小数点符号
         * separator：千分位符号
         */
        value = (value + '').replace(/[^0-9+-Ee.]/g, '')
        let number = !isFinite(+value) ? 0 : +value
        let decimal = !isFinite(+decimals) ? 0 : Math.abs(decimals)
        let separator = (typeof separators === 'undefined') ? ',' : separators
        let point = (typeof points === 'undefined') ? '.' : points
        let string = ''
        let reg = /(-?\d+)(\d{3})/
        let toFixedFix = function (number, decimal) {
          let fix = Math.pow(10, decimal)
          return '' + Math.round(number * fix) / fix
        }
        string = (decimal ? toFixedFix(number, decimal) : '' + Math.round(number)).split('.')
        while (reg.test(string[0])) {
          string[0] = string[0].replace(reg, '$1' + separator + '$2')
        }

        if ((string[1] || '').length < decimal) {
          string[1] = string[1] || ''
          string[1] += new Array(decimal - string[1].length + 1).join('0')
        }
        return string.join(point)
      }
    }
    // 添加时间格式化可能会以零开头
    Vue.prototype.$formatMonoNumber = function (number) {
      if (number) {
        let numberArray = number.toString().split('')
        let html = ''
        numberArray.forEach((item) => {
          if (item === ',' || item === '.') {
            html += '<span class="mono--division">' + item + '</span>'
          } else {
            html += '<span class="mono--font">' + item + '</span>'
          }
        })
        return html
      }
    }
    // 不允许以零开头
    Vue.prototype.$formatMonoSpace = function (number, decimals) {
      if (number || number === 0) {
        let numberArray = Vue.prototype.$formatNumber(number, decimals).split('')
        let html = ''
        numberArray.forEach((item) => {
          if (item === ',' || item === '.') {
            html += '<span class="mono--division">' + item + '</span>'
          } else {
            html += '<span class="mono--font">' + item + '</span>'
          }
        })
        return html
      }
    }
    Vue.prototype.$animate = function (time) {
      window.requestAnimationFrame(Vue.prototype.$animate)
      window.TWEEN.update(time)
    }
    // end
  }
}
