<template>
  <el-main class="main" :style="{'height': bodyHeight}">
    <div class="login">
      <div class="login--body">
        <el-row>
          <el-col :span="14">
            <div class="login-banner">
              <el-carousel trigger="click" height="150px">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3>{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="login-form">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
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
import VelocityAnimate from 'velocity-animate'

export default {
  name: 'Login',
  components: {},
  computed: {},
  data () {
    return {
      bodyHeight: '',
      viewHeight: '',
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  },
  created () {
  },
  mounted () {
    this.resizeBodyHeight()
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

    &--body {
      display: table-cell;
      vertical-align: middle;
    }
  }
</style>
