<template>
  <el-container class="main" height="60px">
    <el-header class="container-header">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="7">
          <router-link to="/">首页</router-link>
        </el-menu-item>
        <el-menu-item index="8">
          <router-link to="/side">侧边导航栏</router-link>
        </el-menu-item>
        <el-menu-item index="9">
          <router-link to="/header-side">头部侧边导航栏</router-link>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="container-body" :style="{'height': bodyHeight}">
      <router-view/>
    </el-main>
    <el-footer class="container-footer" height="40px">
      Copyright© Toweave’s vue-scaffold  version 0.0.1
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'Main',
  components: {},
  computed: {},
  data () {
    return {
      bodyHeight: '',
      activeIndex2: ''
    }
  },
  methods: {
    setBodyHeight () {
      let height = document.documentElement.clientHeight || document.body.clientHeight
      this.bodyHeight = height - (60 + 40) + 'px'
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  created () {
  },
  mounted () {
    this.setBodyHeight()
  },
  watch: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  @import '../styles/index.scss';
  .main {
  }

  .container-header {
    line-height: 60px;
    color: $white;
    background-color: #545c64;
  }

  .container-footer {
    font-size: $sizeXS;
    line-height: 40px;
    background-color: $grayLight;
  }
</style>
