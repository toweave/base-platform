<template>
  <div class="index">
    <div @click="handlerLocalStorage()">test local</div>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>

    <h1>{{ msg }} app 0</h1>
    <h1>{{$formattingNumber(123456789.111, 3)}}</h1>
    <a class="link-color">link-color</a>
    <el-button type="primary" @click="getDataLoading()">点击Loading</el-button>
    <el-button type="primary" :loading="booleanLoading" @click="getDataNoLoading()">点击No Loading</el-button>

    <el-button type="primary" :loading="false" @click="testAlert()">test</el-button>
    <!--<input id="test" v-focus="testData">-->
    <div>{{watchData()}}</div>
    <br>
    <input v-model="formatTime">
    <div>{{testTime | date(formatTime)}}</div>
    <br>
    <input v-model="formatNumber">
    <div>{{'123456789.1234567' | number(formatNumber)}}</div>
    <br>
    <div>{{'toweave is a web maker.' | capitalize}}</div>
    <!--<div>{{testFocus()}}</div>-->
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          style="width: 100%;text-align: left"
          max-height="250">
          <el-table-column
            fixed
            prop="id"
            label="id"
            width="50">
          </el-table-column>
          <el-table-column
            prop="email"
            label="email"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="name"
            width="200">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="phone"
            width="200">
          </el-table-column>
          <el-table-column
            prop="username"
            label="username"
            width="">
          </el-table-column>
          <el-table-column
            prop="website"
            label="website"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData4)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as apiService from './services/home'
import mixin from '../../mixins'
import ElRow from 'element-ui/packages/row/src/row'
import ElCol from 'element-ui/packages/col/src/col'
export default {
  components: {
    ElCol,
    ElRow},
  name: 'HomeIndex',
  mixins: [mixin],
  data () {
    return {
      msg: 'Welcome to HomeIndex',
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
