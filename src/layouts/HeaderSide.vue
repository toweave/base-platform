<template>
  <el-container class="container">
    <el-header class="container-header" height="60px">
      <el-row>
        <el-col :span="6" style="text-align: left">
          <img src="../../static/logo.png" style="height: 40px;margin-top: 10px" />
          <div style="display: inline-block" @click="handlerToggleAsideMenu">Toggle</div>
        </el-col>
        <el-col :span="18">
          <el-menu style="float: right"
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
            <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            <el-menu-item index="7">
              <router-link to="/">首页</router-link>
            </el-menu-item>
            <el-menu-item index="8">
              <router-link to="/side">侧边导航栏</router-link>
            </el-menu-item>
            <el-menu-item index="9">
              <router-link to="/header-side">头部侧边导航栏</router-link>
            </el-menu-item>
            <el-menu-item index="10">
              <router-link to="/">个人中心</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="container-side" id="asideMenuBox" style="width: 200px">
        <el-menu
          :collapse="isCollapseAsideMenu"
          :collapse-transition="false"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
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
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main class="container-body" :style="{'height': bodyHeight}" id="mainBody">
          <router-view/>
        </el-main>
        <el-footer class="container-footer" style="font-size: 14px;color: #999" height="40px">产品 version v1.0.0</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import VelocityAnimate from 'velocity-animate'

export default {
  name: 'HeaderSide',
  components: {},
  computed: {},
  data () {
    return {
      isCollapseAsideMenu: false,
      bodyHeight: '',
      activeIndex2: ''
    }
  },
  methods: {
    handlerToggleAsideMenu () {
      this.isCollapseAsideMenu = !this.isCollapseAsideMenu
      let asideMenuBox = document.querySelector('#asideMenuBox')
      if (this.isCollapseAsideMenu) {
        VelocityAnimate(asideMenuBox, { width: '64px' }, { duration: 500 })
      } else {
        VelocityAnimate(asideMenuBox, { width: '200px' }, { duration: 500 })
      }
    },
    setBodyHeight () {
      let height = document.documentElement.clientHeight || document.body.clientHeight
      this.bodyHeight = height - (60 + 40) + 'px'
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
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
    min-width: 1200px;
  }

  .container-header {
    line-height: 60px;
    color: $white;
    background-color: #545c64;
  }

  .container-side {
    width: 200px;
    border-top: 1px solid $white;
    background-color: #545c64;
    overflow-x: hidden;
    overflow-y: auto;

    .el-menu {
      border-right: none;
    }
  }

  .container-footer {
    line-height: 40px;
    background-color: #f1f1f1;
  }
</style>
