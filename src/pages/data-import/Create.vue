<template>
  <div class="index">
    <h1>{{ msg }}</h1>
    <el-select v-model="value" placeholder="请选择" ref="selectTest">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <p style="padding:20px;height: 300px; background-color: #f1f1f1;" v-for="item in 1" :key="item">test P {{item}}</p>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <el-button type="text" @click="$scrollToMainTop()">GO TO TOP</el-button>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

    <div>
      <div class="scroll">
        <div class="table-thead" ref="scrollTableHead">
          <table class="">
            <thead>
            <tr>
              <th>1</th>
              <th>2</th>
              <th>3</th>
            </tr>
            </thead>
          </table>
        </div>

        <div class="table-body" ref="scrollTable">
          <table class="">
            <tbody>
            <tr v-for="item in 5" :key="item">
              <td>A-{{item}}</td>
              <td>2</td>
              <td>3</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="table-fixed" ref="scrollTableFirst">
          <table class="">
            <tbody>
            <tr v-for="item in 5" :key="item">
              <td>A-{{item}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@/mixins'
import * as apiService from './services/home'
console.log(31, apiService)
export default {
  name: 'DataImportCreate',
  mixins: [mixin],
  components: {},
  data () {
    return {
      msg: 'Welcome to DataImportCreate',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      dialogVisible: false
    }
  },
  methods: {
    onScroll () {
      this.$refs.selectTest.blur()
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  created () {
  },
  mounted () {
    let scrollTable = this.$refs.scrollTable
    let scrollTableFirst = this.$refs.scrollTableFirst
    let scrollTableHead = this.$refs.scrollTableHead
    console.log(scrollTable)
    scrollTable.addEventListener('scroll', ($event) => {
      console.log(117, $event)
      console.log(scrollTable.scrollTop)
      scrollTableFirst.scrollTop = scrollTable.scrollTop
      scrollTableHead.scrollLeft = scrollTable.scrollLeft
    }, false)
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

  .scroll {
    position: relative;
    width: 300px;
    height: 150px;
    overflow-x: hidden;
    overflow-y: hidden;

    table {
      cellspacing: 0;
      cellpadding: 0;
      border-collapse: separate;
      border-spacing: 0;
      border: 0;
      // border: 1px solid #eee;
    }
    table tr th,
    table tr td {
      width: 200px;
      height: 48px;
      border: 1px solid #eee;
    }
  }

  .table-thead {
    overflow: hidden;
    color: #00f;
    table {
      width: 600px;
      // table-layout: fixed;
    }
  }
  .table-fixed {
    z-index: 4;
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 138px;
    overflow: hidden;
    color: #0f0;
    table {
      width: 200px;
      // table-layout: fixed;
    }
  }

  .table-body {
    position: relative;
    width: 300px;
    height: 102px;
    overflow-x: auto;
    overflow-y: auto;
    table {
      width: 600px;
      // table-layout: fixed;
    }
  }
</style>
