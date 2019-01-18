<template>
  <div class="index">
    <h1 @click="booleanMenuAnimation = !booleanMenuAnimation">{{ msg }}</h1>
    <div class="hamburger" :class="{'hamburger-active': booleanMenuAnimation}" @click="booleanMenuAnimation = !booleanMenuAnimation">
      <svg class="hamburger--svg" viewBox="0 0 800 600">
        <path class="hamburger--path" d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" id="top"></path>
        <path class="hamburger--path" d="M300,320 L540,320" id="middle"></path>
        <path class="hamburger--path" d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" id="bottom" transform="translate(480, 320) scale(1, -1) translate(-480, -318) "></path>
      </svg>
    </div>
    <h3>
      <span @click="openVNode">Test Alert</span>
    </h3>
    <div class="scroll-vertical">
      <div class="table-thead">
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

      <div class="table-body">
        <table class="">
          <tbody>
          <tr v-for="item in 5" :key="item">
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
    <div class="scroll-horizontal">
      <div class="table-fixed">
        <table class="">
          <thead>
          <tr>
            <th>1</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in 4" :key="item">
            <td>1</td>
          </tr>
          </tbody>

        </table>
      </div>

      <div class="table-body">
        <div class="table-thead">
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

        <table class="">
          <tbody>
          <tr v-for="item in 5" :key="item">
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
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
      msg: 'Welcome to SelfServiceCreate',
      booleanMenuAnimation: false
    }
  },
  methods: {
    openVNode () {
      const h = this.$createElement
      this.$message({
        duration: 12000,
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ])
      })
    }
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

  .hamburger {
    display: inline-block;
    &--svg {
      width: 60px;
      height: 60px;
      cursor: pointer;
      transform: translate3d(0, 0, 0) scale(1);
      // transform: scale(0.5);
    }
    &--path {
      fill: none;
      stroke-width: 40px;
      stroke-linecap: round;
      stroke: #a06ba5;
      stroke-dashoffset: 0px;
      transition: stroke-dashoffset 0.5s cubic-bezier(0.25, -0.25, 0.75, 1.25), stroke-dasharray 0.5s cubic-bezier(0.25, -0.25, 0.75, 1.25);

      &#top,
      &#bottom {
        stroke-dasharray: 240px 950px;
      }
      &#middle {
        stroke-dasharray: 240px 240px;
      }
    }

    &-active {
      .hamburger--path#top,
      .hamburger--path#bottom {
        stroke-dashoffset: -650px;
      }
      .hamburger--path#middle {
        stroke-dashoffset: -115px;
        stroke-dasharray: 1px 220px;
      }
    }
  }

  .scroll-vertical {
    position: relative;
    width: 300px;
    height: 200px;
    overflow: hidden;

    .table-thead {
      position: absolute;
      top: 0;
      left: 0;
      width: 283px;
    }
    .table-body {
      margin-top: 50px;
      width: 300px;
      height: 152px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }

  .scroll-horizontal {
    position: relative;
    width: 300px;
    height: 200px;
    margin-top: 36px;
    overflow: hidden;

    .table-fixed {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
    }
    .table-head {
      z-index: 9;
      position: relative;
      top: 0;
      left: 0;
    }
    .table-body {
      width: 300px;
      height: 200px;
      overflow-x: auto;
      overflow-y: hidden;
      table {
        width: 600px;
      }
    }
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
    border: 0;
    // border: 1px solid #eee;

    tr th,
    tr td {
      width: 200px;
      height: 48px;
      border: 1px solid #eee;
    }
  }
</style>
