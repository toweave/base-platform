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
    // end
  }
}
