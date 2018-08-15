<template>
  <div class="index">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import * as apiService from './services/home'
import mixin from '../../mixins'
export default {
  name: 'SelfServiceCreate',
  mixins: [mixin],
  components: {},
  data () {
    return {
      msg: 'Welcome to SelfServiceCreate',
      booleanLoading: false,
      testData: '123456789',
      formatTime: 'yyyy-MM-dd HH:mm:ss.Z',
      formatNumber: 3,
      testTime: 0,
      tableData4: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      tableData: [],
      navigationData: []
    }
  },
  methods: {
    handlerLocalStorage () {
      this.navigationData[this.navigationData.length] = {
        index: this.navigationData.length,
        title: '测试' + this.navigationData.length,
        url: 'http://www.baidu.com/'
      }
      this.$setLocalStorage('LocalNavigation', this.navigationData)
    },
    watchData () {
      console.log(34)
    },
    testFocus () {
      console.log('1234789')
    },
    testAlert () {
      this.$store.commit({
        type: 'ACTIVE_ALERT',
        alert: {
          show: true,
          title: '提示',
          content: '消息已读！',
          buttonLeft: '确定',
          buttonRight: '取消',
          functionLeft: () => {
            console.log('你点击了确定')
          },
          functionRight: () => {
            console.log('你点击了取消')
          }
        }
      })
    },
    getDataLoading () {
      let params = {
        page: 1,
        limit: 4
      }
      let test = apiService.fetch(params)
      test.then((res) => {
        // this.booleanLoading = false
        console.log(24, res)
        this.tableData = res || []
      })
    },
    getDataNoLoading () {
      let params = {
        page: 2,
        limit: 5
      }
      this.booleanLoading = true
      let test = apiService.fetchNoLoading(params)
      setInterval(() => {
        test.then((res) => {
          this.booleanLoading = false
          // this.booleanLoading = false
          console.log(24, res)
          this.tableData = res || []
        })
      }, 500)
    }
  },
  created () {
    console.log(69, this)
    // this.testMethods()
    // let number = 0
    let LocalNavigation = this.$getLocalStorage('LocalNavigation')
    console.log(291, LocalNavigation)
    if (LocalNavigation) {
      this.navigationData = LocalNavigation
    }
    setInterval(() => {
      this.testTime = new Date()
    }, 1000)
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  @import '../../styles/index.scss';

  .index {
    color: red;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
