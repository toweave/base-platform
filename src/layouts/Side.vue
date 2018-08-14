<template>
  <el-container class="container">
    <el-aside class="container-side" width="200px">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1" style="width: 200px;">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2" style="width: 200px;">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" style="width: 200px;">
          <i class="el-icon-setting"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
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
    </el-aside>
    <el-main :style="{'height': bodyHeight}">Main</el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Side',
  components: {},
  computed: {},
  data () {
    return {
      bodyHeight: ''
    }
  },
  methods: {
    setBodyHeight () {
      let height = document.documentElement.clientHeight || document.body.clientHeight
      this.bodyHeight = height + 'px'
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
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
  .container {
  }

  .container-side {
    background-color: #545c64;
  }
</style>
