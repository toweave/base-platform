<template>
  <el-main class="main" :style="{'height': bodyHeight}">
    <div class="login">
      <div class="login--skew"></div>
      <div class="login--body">
        <el-row>
          <el-col :span="12">
            <div class="login-banner">
              <transition-group name="cell" tag="div" class="container">
                <div v-for="cell in cells" :key="cell.id" class="cell">
                  {{ cell.number }}
                </div>
              </transition-group>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="login-form">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="74px">
                <el-form-item label="用户" required>
                  <el-input
                    placeholder="请输入内容"
                    v-model="ruleForm.date1">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </el-form-item>
                <el-form-item label="密码" required>
                  <el-input
                    placeholder="请输入内容"
                    v-model="ruleForm.date1">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </el-form-item>
                <el-form-item label="" class="text-left">
                  <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-main>
</template>

<script>
// import VelocityAnimate from 'velocity-animate'
export default {
  name: 'Login',
  components: {},
  computed: {},
  data () {
    return {
      bodyHeight: '',
      viewHeight: '',
      cells: Array.apply(null, {length: 81})
        .map(function (item, index) {
          return {
            id: index,
            number: index % 9 + 1
          }
        }),
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resizeBodyHeight () {
      let resizeMethod = () => {
        window.requestAnimationFrame(() => {
          let height = document.documentElement.clientHeight || document.body.clientHeight
          this.bodyHeight = height + 'px'
        })
      }
      resizeMethod()
      window.addEventListener('resize', resizeMethod, true)
    },
    shuffleRandom (arr) {
      let len = arr.length
      for (let i = 0; i < len - 1; i++) {
        let idx = Math.floor(Math.random() * (len - i))
        let temp = arr[idx]
        arr[idx] = arr[len - i - 1]
        arr[len - i - 1] = temp
      }
      return arr
    },
    shuffle () {
      this.cells = this.shuffleRandom(this.cells)
      this.$forceUpdate()
      setTimeout(() => {
        this.shuffle()
      }, 5000)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created () {
  },
  mounted () {
    this.resizeBodyHeight()
    this.shuffle()
  },
  watch: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  @import '../styles/index.scss';

  .main {
    min-width: 1200px;
    margin: 0;
    padding: 0;
  }

  .login {
    display: table;
    float: left;
    width: 100%;
    height: 100%;

    &--skew {
      position: absolute;
      top: 19%;
      left: 0;
      right: 0;
      bottom: 0;
      display: block;
      height: 61.8%;
      margin: 0px;
      padding: 0px;
      background: #1F65D6;
      transform: skewY(-4.5deg);
    }

    &--body {
      display: table-cell;
      vertical-align: middle;
    }
  }

  .login-form {
    box-sizing: border-box;
    width: 324px;
    height: 324px;
    padding: 84px 36px 16px 0;
    background-color: $white;
  }

  .container {
    float: right;
    display: flex;
    flex-wrap: wrap;
    width: 324px;
    height: 324px;

    .cell {
      float: left;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 36px;
      height: 36px;
      border: 1px solid #aaa;
      color: $white;
      margin-right: -1px;
      margin-bottom: -1px;
    }
    .cell:nth-child(3n) {
      margin-right: 0;
    }
    .cell:nth-child(27n) {
      margin-bottom: 0;
    }
    .cell-move {
      transition: transform 2s;
    }
  }
</style>
