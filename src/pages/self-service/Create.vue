<template>
  <div class="index">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import mixin from '@/mixins'
import * as apiService from './services/home'
console.log(31, apiService)
export default {
  name: 'SelfServiceCreate',
  mixins: [mixin],
  components: {},
  data () {
    return {
      msg: 'Welcome to SelfServiceCreate'
    }
  },
  methods: {
  },
  created () {
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
