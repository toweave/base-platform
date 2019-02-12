const path = require('path')
const fs = require('fs')
const packageJSON = require('./package.json')

const resolve = dir => {
  return path.join(__dirname, dir)
}
process.env.VUE_APP_VERSION = packageJSON.version
process.env.VUE_APP_NAME = packageJSON.name
// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production'
  ? './'
  : '/'
let test = fs.readFileSync('src/styles/color.scss', 'utf-8')
let testA = test.replace(/[ ]/g, '').replace(/[\r\n]/g, '')
console.log(22, testA)
let a = testA.split(';')
console.log(24, a)
let o = {}
a.forEach((item) => {
  if (item) {
    let temp = item.split(':')
    o[temp[0]] = temp[1]
  }
})
console.log(33, process.env.VUE_APP_STYLES, o)
process.env.VUE_APP_STYLES = JSON.stringify(o)
module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync('src/styles/color.scss', 'utf-8')
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .end()
      // .set('snapsvg', resolve('snapsvg'))
    // GraphQL Loader
    config.module
      .rule()
      .test(require.resolve('snapsvg/dist/snap.svg.js'))
      .use()
      .loader('imports-loader?this=>window,fix=>module.exports=0')
      .end()
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  // devServer: {
  //   proxy: 'localhost:3000'
  // }
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://www.example.org',
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // },
}
