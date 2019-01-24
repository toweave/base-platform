<template>
  <div class="component" ref="MapParent" :style="{'width': viewWidth, 'height': viewHeight, 'min-height': '420px'}" @click="$eventBubble">
    <!--<div class="map-line">-->
      <!--<div class="map-line__h"></div>-->
      <!--<div class="map-line__v"></div>-->
    <!--</div>-->

    <div class="search">
      <div class="search__body">
        <input class="search__input"
               placeholder="请输入搜索关键字"
               v-model="keywords"
               @keyup.enter="handlerSearchForm()" />
        <div class="search__button" @click="handlerSearchForm()"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import Drag from 'draggabilly'
import TWEEN from 'tween.js'
import Snap from 'snapsvg'
// import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'
import { mapState } from 'vuex'
import { apiStar } from './server/api'
console.log(27, TWEEN, Snap, apiStar)

export default {
  name: 'MapIndex',
  mixins: [],
  components: {},
  computed: mapState({
    app: state => state.app.app
  }),
  data () {
    return {
      msg: 'Welcome to MapIndex',
      // userName: 'sunhuajian',
      viewWidth: 0,
      viewHeight: 0,
      keywords: null
    }
  },
  methods: {
    resetBackground () {
      let resizeMethod = () => {
        window.requestAnimationFrame(() => {
          this.viewWidth = document.body.offsetWidth + 'px'
          this.viewHeight = document.body.offsetHeight + 'px'
        })
      }
      resizeMethod()
      window.addEventListener('resize', resizeMethod, true)
    },
    $eventBubble ($event) {
      // console.log(9999, $event)
      // $event.preventDefault()
      // $event.stopPropagation()
    },
    handlerSearchForm () {
      console.log('click')
    }
  },
  created () {
  },
  mounted () {
    this.resetBackground()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  @import '../../styles/index.scss';

  .component {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: $bg;
    overflow: hidden;
  }

  .map-line {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    &__h {
      position: absolute;
      top: 0;
      left: -720px;
      width: 1440px;
      border-top: 1px dotted #999;
      transform-origin: center;
      transform: rotate(0deg);
    }

    &__v {
      position: absolute;
      top: 0;
      left: -720px;
      width: 1440px;
      border-top: 1px dotted #999;
      transform-origin: center;
      transform: rotate(90deg);
    }
  }

  .search {
    box-sizing: border-box;
    z-index: 39;
    position: absolute;
    top: 48px;
    left: 36px;
    width: 410px;
    height: 84px;
    padding: 12px;
    font-size: 16px;
    color: $white;
    background: url("../../assets/map/search-box.png") no-repeat center center;

    &__body {
      float: left;
      width: 336px;
      margin-top: 12px;
      margin-left: 28px;
    }
    &__input {
      box-sizing: border-box;
      float: left;
      width: 280px;
      height: 38px;
      margin: 0;
      padding: 0 14px;
      border: none;
      outline: none;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      color: $white;
      background-color: $btn;
      &::placeholder {
        color: $whiteLight;
      }
      &:focus {
        box-shadow: 0 0 5px 0 $btn;
      }
    }
    &__button {
      float: left;
      width: 56px;
      height: 38px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      background: $search url("../../assets/map/search.png") no-repeat center center;
      cursor: pointer;
      &:hover {
        background-color: $btnDeep;
      }
    }
  }

  .search-result {
    box-sizing: border-box;
    z-index: 30;
    position: absolute;
    top: 120px;
    left: 36px;
    width: 410px;
    height: auto;
    color: $white;
    overflow: hidden;
    &__body {
      float: left;
      width: 410px;
      height: 0;
      background: url("../../assets/map/pull-down.png") no-repeat center 0;
      overflow: hidden;
      transition: height 400ms;

      &--active {
        height: 128px;
      }
    }
    &__content {
      box-sizing: border-box;
      float: left;
      width: 300px;
      height: 100px;
      margin: 24px 0 0 54px;
      padding: 10px 10px;
      // border: 1px solid $line;
      overflow-x: hidden;
      overflow-y: auto;
      /*IE scroll Bar Failed*/
      /*scrollbar-arrow-color: #f4ae21; !**!!*三角箭头的颜色*!*/
      /*scrollbar-face-color: #333; !**!!*立体滚动条的颜色*!*/
      /*scrollbar-3dlight-color: #666; !**!!*立体滚动条亮边的颜色*!*/
      /*scrollbar-highlight-color: #666; !**!!*滚动条空白部分的颜色*!*/
      /*scrollbar-shadow-color: #999; !**!!*立体滚动条阴影的颜色*!*/
      /*scrollbar-darkshadow-color: #666; !**!!*立体滚动条强阴影的颜色*!*/
      /*scrollbar-track-color: #666; !**!!*立体滚动条背景颜色*!*/
      /*scrollbar-base-color:#f8f8f8; !**!!*滚动条的基本颜色*!*/

      &::-webkit-scrollbar {
        // height: 6px;
        width: 6px;
        border-radius: 50%;
      }
      &::-webkit-scrollbar-corner {
        cursor: pointer;
        background: #f00;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 6px;
        background-color: #0a256c;
      }
      &::-webkit-scrollbar-thumb:hover {
        border-radius: 6px;
        // border: solid 6px #ff0;
        background-color: #093197;
        background-clip: content-box;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
    }
    &__blank {
      box-sizing: border-box;
      float: left;
      width: 300px;
      height: 100px;
      margin: 24px 0 0 54px;
      line-height: 100px;
      text-align: center;
      color: $font;
      // border: 1px solid $line;
    }

    &__dot {
      opacity: 1;
      &:nth-child(1) {
      }
      &:nth-child(2) {
        animation: dotAnimate 600ms linear infinite;
      }
      &:nth-child(3) {
        animation: dotAnimate 600ms linear 300ms infinite;
      }
    }
    &__item {
      box-sizing: border-box;
      float: left;
      width: 100%;
      height: 26px;
      line-height: 26px;
      cursor: pointer;
    }
    &__name {
      float: left;
      width: 180px;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &__channel {
      float: right;
      width: 80px;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .indicator {
    box-sizing: border-box;
    z-index: 30;
    position: absolute;
    top: 131px;
    left: 36px;
    width: 410px;
    height: 473px;
    overflow: hidden;
    transition: top 400ms;

    &--top {
      top: 256px;
    }

    &__box {
      box-sizing: border-box;
      float: left;
      width: 410px;
      height: 473px;
      padding: 12px;
      color: $white;
      background: url("../../assets/map/intro.png") no-repeat center center;
    }

    &__header {
      float: left;
      width: 100%;
      margin-top: 30px;
    }

    &__toggle {
      float: left;
      width: 100%;
      margin-top: -6px;
      margin-bottom: 6px;
      font-size: 14px;
      text-align: center;
    }

    &__ghost {
      box-sizing: border-box;
      float: left;
      width: 160px;
      height: 40px;
      line-height: 38px;
      color: $line;
      border: 1px solid $line;
      // background-color: $btnDeep;
      cursor: pointer;
      &:first-child {
        // border-right: 1px solid $search;
        margin-left: 34px;
        // border-right: 1px solid $btn;
        /*border-top-left-radius: 26px;*/
        /*border-bottom-left-radius: 26px;*/
        border-right: none;
      }
      &:last-child {
      }
      &--active {
        color: $white;
      }
    }

    &__body {
      float: left;
      width: 100%;
    }

    &__footer {
      float: left;
      width: 100%;
      text-align: center;
    }

    &__button {
      display: inline-block;
      padding: 6px 22px;
      border-radius: 4px;
      font-size: 16px;
      background-color: $btn;
      cursor: pointer;
      &:hover {
        background-color: $btnDeep;
      }
    }
  }

  .dl-horizontal--result {
    box-sizing: border-box;
    float: none;
    height: 302px;
    width: 360px;
    margin-top: 6px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 6px 0 6px;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
    /*IE scroll Bar Failed*/
    /*scrollbar-arrow-color: #f4ae21; !**!!*三角箭头的颜色*!*/
    /*scrollbar-face-color: #333; !**!!*立体滚动条的颜色*!*/
    /*scrollbar-3dlight-color: #666; !**!!*立体滚动条亮边的颜色*!*/
    /*scrollbar-highlight-color: #666; !**!!*滚动条空白部分的颜色*!*/
    /*scrollbar-shadow-color: #999; !**!!*立体滚动条阴影的颜色*!*/
    /*scrollbar-darkshadow-color: #666; !**!!*立体滚动条强阴影的颜色*!*/
    /*scrollbar-track-color: #666; !**!!*立体滚动条背景颜色*!*/
    /*scrollbar-base-color:#f8f8f8; !**!!*滚动条的基本颜色*!*/

    &::-webkit-scrollbar {
      // height: 6px;
      width: 6px;
      border-radius: 50%;
    }
    &::-webkit-scrollbar-corner {
      cursor: pointer;
      background: #f00;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background-color: #0a256c;
    }
    &::-webkit-scrollbar-thumb:hover {
      border-radius: 6px;
      // border: solid 6px #ff0;
      background-color: #093197;
      background-clip: content-box;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    dt {
      margin-top: 8px;
      width: auto;
      text-align: left;
    }
    dd {
      // max-height: 108px;
      margin-top: 8px;
      margin-left: auto;
    }

    .dl-horizontal__name {
      display: inline-block;
      max-width: 140px;
    }
    .dl-horizontal__right {
      float: right;
      margin-right: 0.5em;
    }
  }

  .indicator-table {
    box-sizing: border-box;
    float: none;
    height: 316px;
    width: 360px;
    margin-top: 6px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 6px 0 6px;
    overflow-x: hidden;
    overflow-y: auto;
    /*IE scroll Bar Failed*/
    /*scrollbar-arrow-color: #f4ae21; !**!!*三角箭头的颜色*!*/
    /*scrollbar-face-color: #333; !**!!*立体滚动条的颜色*!*/
    /*scrollbar-3dlight-color: #666; !**!!*立体滚动条亮边的颜色*!*/
    /*scrollbar-highlight-color: #666; !**!!*滚动条空白部分的颜色*!*/
    /*scrollbar-shadow-color: #999; !**!!*立体滚动条阴影的颜色*!*/
    /*scrollbar-darkshadow-color: #666; !**!!*立体滚动条强阴影的颜色*!*/
    /*scrollbar-track-color: #666; !**!!*立体滚动条背景颜色*!*/
    /*scrollbar-base-color:#f8f8f8; !**!!*滚动条的基本颜色*!*/

    &::-webkit-scrollbar {
      // height: 6px;
      width: 6px;
      border-radius: 50%;
    }
    &::-webkit-scrollbar-corner {
      cursor: pointer;
      background: #f00;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background-color: #0a256c;
    }
    &::-webkit-scrollbar-thumb:hover {
      border-radius: 6px;
      // border: solid 6px #ff0;
      background-color: #093197;
      background-clip: content-box;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  .avatar {
    box-sizing: border-box;
    z-index: 30;
    position: absolute;
    top: 48px;
    right: 36px;
    width: 105px;
    height: 107px;
    padding: 0;
    color: $white;
    background: url("../../assets/map/avatar.png") no-repeat center center;

    &__name {
      box-sizing: border-box;
      width: 90px;
      height: 24px;
      margin-top: 81px;
      padding: 0 4px;
      line-height: 24px;
      font-size: 12px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
    }
    &__icon {
      position: absolute;
      right: 0;
      bottom: 0;
      display: inline-block;
      width: 24px;
      height: 24px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      transform-origin: center;
      transform: rotate(0deg);
      transition: transform 200ms;

      &--pull {
        background-image: url("../../assets/map/pull.png");
      }
      &--active {
        transform: rotate(180deg);
      }
    }
    &__content {
      position: relative;
      top: 1px;
      width: 105px;
      height: 0;
      font-size: 16px;
      background: url("../../assets/map/user-menu.png") no-repeat 0 0;
      overflow: hidden;
      transition: height 400ms;
      &--active {
        height: 82px;
      }
    }
    &__item {
      width: 105px;
      height: 41px;
      line-height: 41px;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: $line;
      }
    }
  }

  .operation {
    box-sizing: border-box;
    z-index: 30;
    position: absolute;
    top: 48px;
    right: 158px;
    width: 541px;
    height: 84px;
    padding: 22px 12px 12px 12px;
    font-size: 16px;
    color: $white;
    background: url("../../assets/map/operation-box.png") no-repeat center center;

    &__item {
      box-sizing: border-box;
      float: left;
      width: 128px;
      height: 40px;
      line-height: 48px;
      border-right: 1px solid $blackLight;
      text-align: center;
      cursor: pointer;
      &:last-child {
        border-right: none;
      }
      // &:hover {
      //   background-color: $lineLight;
      // }
    }

    &__icon {
      position: relative;
      display: inline-block;
      width: 24px;
      height: 24px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      transform-origin: center;
      transform: rotate(0deg);
      transition: transform 200ms;

      &--channel {
        background-image: url("../../assets/map/channel.png");
      }

      &--hot {
        background-image: url("../../assets/map/hot.png");
      }
      &--list {
        left: 4px;
        background-image: url("../../assets/map/list.png");
      }
      &--msg {
        background-image: url("../../assets/map/msg.png");
      }
      &--pull {
        background-image: url("../../assets/map/pull.png");
      }
      &--active {
        transform: rotate(180deg);
      }
    }
    &__text {
      position: relative;
      top: -6px;
      left: 4px;
      display: inline-block;
    }
  }

  .channel {
    box-sizing: border-box;
    z-index: 99;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 541px;
    height: 592px;
    padding: 10px;
    color: $white;
    background: url("../../assets/map/channel-box.png") no-repeat 0 0;
    transform: translate(-50%,-50%);
    // overflow: hidden;

    &__header {
      position: relative;
      float: left;
      width: 100%;
    }
    &__title {
      display: inline-block;
      width: 400px;
      height: 60px;
      margin-left: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: $weightBold;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &__body {
      box-sizing: border-box;
      float: left;
      width: 510px;
      height: 484px;
      // border-top: 1px solid $line;
      padding: 24px 0 24px 0;
      line-height: 150%;
      overflow-x: hidden;
      overflow-y: auto;
      /*IE scroll Bar Failed*/
      /*scrollbar-arrow-color: #f4ae21; !**!!*三角箭头的颜色*!*/
      /*scrollbar-face-color: #333; !**!!*立体滚动条的颜色*!*/
      /*scrollbar-3dlight-color: #666; !**!!*立体滚动条亮边的颜色*!*/
      /*scrollbar-highlight-color: #666; !**!!*滚动条空白部分的颜色*!*/
      /*scrollbar-shadow-color: #999; !**!!*立体滚动条阴影的颜色*!*/
      /*scrollbar-darkshadow-color: #666; !**!!*立体滚动条强阴影的颜色*!*/
      /*scrollbar-track-color: #666; !**!!*立体滚动条背景颜色*!*/
      /*scrollbar-base-color:#f8f8f8; !**!!*滚动条的基本颜色*!*/

      &::-webkit-scrollbar {
        // height: 6px;
        width: 6px;
        border-radius: 50%;
      }
      &::-webkit-scrollbar-corner {
        cursor: pointer;
        background: #f00;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 6px;
        background-color: #0a256c;
      }
      &::-webkit-scrollbar-thumb:hover {
        border-radius: 6px;
        // border: solid 6px #ff0;
        background-color: #093197;
        background-clip: content-box;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
    }

    &__icon {
      position: absolute;
      top: 14px;
      right: 14px;
      display: inline-block;
      height: 36px;
      width: 36px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      &:hover {
        background-color: $lineLight;
      }
      &--close {
        right: 14px;
        background-image: url("../../assets/icon/close.png");
      }
    }

    &__list {
      float: left;
      width: 100%;
      margin: 6px 0;
    }

    &__bg {
      position: relative;
      left: -1px;
      float: left;
      width: auto;
      height: 26px;
      margin-bottom: 1em;
      padding: 0 2em;
      line-height: 26px;
      border-top-right-radius: 13px;
      border-bottom-right-radius: 13px;
      background-color: $line;
    }
  }

  .subitem {
    position: relative;
    box-sizing: border-box;
    min-height: 2em;
    margin: 0;
    padding: 0 24px 0 80px;

    dt {
      position: absolute;
      min-width: 108px;
      text-align: left;
    }
    dd {
      box-sizing: border-box;
      margin-left: 108px;
      padding-left: 24px;
    }

    &__icon {
      display: inline-block;
      height: 12px;
      width: 12px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      transform: rotate(-90deg);
      &--arrow {
        position: absolute;
        top: 6px;
        right: 0;
        width: 12px;
        height: 12px;
        background-image: url("../../assets/map/pull.png");
      }
    }
    .radio {
      top: 0;
      box-sizing: border-box;
      margin-bottom: 12px;
    }
    .radio__line {
      display: inline-block;
      float: left;
      height: 21px;
      padding-right: 1em;
      border-left: 1px solid #fff;
    }
  }

  .level {
    box-sizing: border-box;
    z-index: 30;
    position: absolute;
    top: 136px;
    right: 158px;
    width: 410px;
    height: 104px;
    padding: 12px;
    color: $white;
    background: url("../../assets/map/level-box.png") no-repeat center center;

    &__item {
      position: relative;
      float: left;
      margin-top: 40px;
      width: 106px;
      height: 12px;

      &:first-child {
        margin-left: 50px;
      }
    }
    &__box {
      box-sizing: border-box;
      position: absolute;
      float: left;
      display: inline-block;
      width: 80px;
      height: 80px;
      text-align: center;
      font-size: $sizeS;
      font-weight: $weightBold;
      border: 1px solid $white;
      border-radius: 50%;
      transform: translate(0%,-50%);
      cursor: pointer;

      &:hover,
      &--active {
        animation: boxShadow 2.4s linear infinite;
      }

      &--0 {
        width: 32px;
        height: 32px;
        line-height: 30px;
        border-width: 1px;
      }
      &--1 {
        width: 48px;
        height: 48px;
        line-height: 42px;
        border-width: 3px;
      }
      &--2 {
        width: 66px;
        height: 66px;
        line-height: 56px;
        border-width: 5px;
      }
    }
  }

  .message {
    box-sizing: border-box;
    z-index: 30;
    position: absolute;
    top: 136px;
    right: 158px;
    width: 410px;
    height: 222px;
    padding: 12px;
    color: $white;
    background: url("../../assets/map/message-box.png") no-repeat center center;

    &__header {
      position: relative;
      float: left;
      width: 100%;
    }
    &__title {
      display: inline-block;
      width: 270px;
      height: 60px;
      margin-left: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: $weightBold;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &__close {

      &:hover {
        background-color: $lineLight;
      }
    }

    &__body {
      box-sizing: border-box;
      float: left;
      width: 100%;
      height: 120px;
      padding: 15px 24px;
      line-height: 150%;
      overflow: hidden;
    }

    &__icon {
      position: absolute;
      top: 14px;
      right: 14px;
      display: inline-block;
      height: 36px;
      width: 36px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      &:hover {
        background-color: $lineLight;
      }
      &--close {
        right: 14px;
        background-image: url("../../assets/icon/close.png");
      }
      &--message {
        left: 18px;
        background-image: url("../../assets/map/message.png");
        &:hover {
          background-color: transparent;
        }
      }
    }
    &__item {
      box-sizing: border-box;
      float: left;
      width: 100%;
      height: 34px;
      line-height: 34px;
    }
    &__name {
      float: left;
      width: 256px;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &__view {
      float: right;
      width: 80px;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;

      &:hover {
        color: $line;
      }
    }
  }

  .hot {
    box-sizing: border-box;
    z-index: 30;
    position: absolute;
    top: 137px;
    right: 158px;
    width: 410px;
    height: 473px;
    padding: 11px;
    color: $white;
    background: url("../../assets/map/top.png") no-repeat center center;

    &__header {
      position: relative;
      float: left;
      width: 100%;
    }
    &__title {
      display: inline-block;
      width: 270px;
      height: 60px;
      margin-left: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: $weightBold;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &__body {
      box-sizing: border-box;
      float: left;
      width: 100%;
      // height: 482px;
      padding: 22px 24px 16px 24px;
      // border-top: 1px solid $line;
      line-height: 150%;
      overflow: hidden;
    }

    &__toggle {
      float: left;
      width: 100%;
      margin-top: -6px;
      margin-bottom: 6px;
      font-size: 14px;
      text-align: center;
    }

    &__button {
      box-sizing: border-box;
      float: left;
      width: 80px;
      height: 26px;
      line-height: 26px;
      background-color: $btnDeep;
      cursor: pointer;
      &:first-child {
        // border-right: 1px solid $search;
        margin-left: 92px;
        border-right: 1px solid $btn;
        border-top-left-radius: 26px;
        border-bottom-left-radius: 26px;
      }
      &:last-child {
        border-top-right-radius: 26px;
        border-bottom-right-radius: 26px;
      }
      &--active {
        background-color: $btn;
      }
    }

    &__close {
      &:hover {
        background-color: $lineLight;
      }
    }

    &__icon {
      position: absolute;
      top: 14px;
      right: 14px;
      display: inline-block;
      height: 36px;
      width: 36px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      &:hover {
        background-color: $lineLight;
      }
      &--close {
        right: 14px;
        background-image: url("../../assets/icon/close.png");
      }
      &--small {
        position: relative;
        top: 4px;
        right: 0;
        width: 24px;
        height: 24px;
        &:hover {
          background-color: transparent;
        }
      }
      &--up {
        background-image: url("../../assets/map/up.png");
      }
      &--down {
        background-image: url("../../assets/map/down.png");
        transform: rotate(180deg);
      }
    }
  }

  .move {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: $red;

    &__body {
      position: absolute;
      top: 0;
      left: 0;
      transform: scale(1);
    }
  }

  .line {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    background-color: #f0f;

    &__0 {
      z-index: 10;
      position: absolute;
      top: 0;
      left: -1px;
      width: 0px;
      height: 100px;
      border-left: 1px solid #fff;
      transform-origin: left top;
      transform: rotate(0deg);
    }
    &__1 {
      z-index: 11;
      position: absolute;
      top: 0;
      left: 0;
      width: 0px;
      height: 100px;
      border-left: 1px solid #fff;
      transform-origin: left top;
      transform: rotate(90deg);
    }
    &__2 {
      z-index: 12;
      position: absolute;
      width: 0px;
      height: 100px;
      border-left: 1px solid #fff;
      transform-origin: left top;
      transform: rotate(180deg);
    }
    &__3 {
      z-index: 13;
      position: absolute;
      top: 1px;
      left: 0;
      width: 0px;
      height: 100px;
      border-left: 1px solid #fff;
      transform-origin: left top;
      transform: rotate(270deg);
    }
    &__4 {
      z-index: 14;
      position: absolute;
      top: 0;
      left: 0;
      width: 0px;
      height: 1000px;
      border-left: 1px solid #fff;
      transform-origin: left top;
      transform: rotate(135deg);
    }
  }
  .bg {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;

    &__body {
      z-index: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1366px;
      height: 1200px;
      transform: translate(-50%,-50%);
      background: $bg;
      // background: $bg url("../../../static/img/map/bg-map-01.png") no-repeat 1px 7px;
    }
  }

  .inner-race {
    z-index: 8;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    &__body {
      z-index: 10;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 234px;
      height: 234px;
      transform: translate(-50%,-50%);
    }
  }

  .inner-circle {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    &__body {
      z-index: 10;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 480px;
      height: 480px;
      transform: translate(-50%,-50%);
    }
  }

  .outer-circle {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    &__body {
      z-index: 10;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2000px;
      height: 2000px;
      border-radius: 50%;
      transform: translate(-50%,-50%);
      background-color: rgba(11, 42, 117, 0.08);
    }
  }

  .group {
    &-0 {
      position: relative;
      z-index: 20;
      .box__body {
        border-color: $group0Border;
        background-color: $group0Bg;
      }
    }
    &-1 {
      position: relative;
      z-index: 21;
      .box__body {
        border-color: $group1Border;
        background-color: $group1Bg;
      }
    }
    &-2 {
      position: relative;
      z-index: 22;
      .box__body {
        border-color: $group2Border;
        background-color: $group2Bg;
      }
    }
    &-3 {
      position: relative;
      z-index: 23;
      .box__body {
        border-color: $group3Border;
        background-color: $group3Bg;
      }
    }
    &--active {
      z-index: 29;

      .box--active {
        z-index: 9;
      }
    }
  }

  .box {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 0;
    height: 0;
    &__body {
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: 50%;
      width: 98px;
      height: 98px;
      border-radius: 50%;
      border: 5px solid #f00;
      box-shadow: 0 0 10px transparent;
      transform: translate(-50%,-50%);
      background-color: $green;
      /*overflow: hidden;*/
      cursor: default;

      &:hover,
      &--active {
        animation: boxShadow 1800ms linear infinite;
      }
      &--lvl0 {
        width: 98px;
        height: 98px;
        border-width: 5px;
      }
      &--lvl1 {
        width: 88px;height: 88px;
        border-width: 3px;
      }
      &--lvl2 {
        width: 78px;height: 78px;
        border-width: 1px;
      }
    }
    &__text {
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      max-height: 100%;
      padding: 13px;
      line-height: 120%;
      text-align: center;
      word-wrap: break-word;
      transform: translate(-50%,-50%);
      color: $white;
    }
  }

  /* dot */
  .annotation {
    z-index: 99;
    position: absolute;
    left: 100%;
    top: 50%;
    display: inline-block;
    width: 0px;
    height: 0px;
    transform: translate(-50%,-50%);
    &__dot {
      position: absolute;
      top: -6px;
      left: -4px;
      display: inline-block;
      width: 12px;
      height: 12px;
    }
    &:hover{
      cursor: pointer;
      .dot__point {
        background-color: $line;
      }
      .dot__circle {
        border-color: $line;
      }
    }
    &--green {
      .dot__point {
        background-color: $green;
      }
      .dot__circle {
        border-color: $green;
      }
    }
    &--yellow {
      .dot__point {
        background-color: $yellow;
      }
      .dot__circle {
        border-color: $yellow;
      }
    }

    &__line {
    }
    &__content {}
  }
  .dot {
    &__point{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      display: inline-block;
      width: 100%;
      height: 100%;
      background-color: $line;
      border-radius: 50%;
      transition: all 0s linear;
      z-index: 50;
    }
    &__circle {
      position: absolute;
      box-sizing: border-box;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 1px solid $line;
      animation: toLarge 3s linear 0;
      &:nth-child(2){
        animation: toLarge 3s linear 1.2s infinite;
      }
      &:nth-child(3){
        animation: toLarge 3s linear 2.4s infinite;
      }
      &:nth-child(4){
        animation: toLarge 3s linear 600ms infinite;
      }
    }
  }
  .line {
    z-index: 1;
    position: absolute;
    top: 0px;
    left: 0px;
    &__diagonal {
      position: absolute;
      top: 0;
      left: 0;
      width: 56px;
      height: 0;
      transform-origin: left top;
      transform: rotate(0deg);

      &--animate {
        border-bottom: 1px solid $line;
        animation: lineDiagonal 0.8s linear;
      }
    }
    &__horizontal {
      position: absolute;
      top: 0;
      left: 56px;
      width: 56px;
      height: 0;
      transform-origin: left top;
      transform: rotate(33deg);
      // transform: rotateY(180deg);
      &--animate {
        border-bottom: 1px solid $line;
        animation: lineHorizontal 0.8s linear;
        animation-fill-mode: forwards;
      }
    }
  }
  .dict {
    box-sizing: border-box;
    z-index: 2;
    position: absolute;
    top: -100px;
    left: 92px;
    width: 410px;
    height: 473px;
    padding: 12px;
    text-align: left;
    color: $white;
    // border: 1px solid $lineBorder;
    // background-color: rgba(13, 31, 47, 0.9);
    background: url("../../assets/map/intro.png") no-repeat center center;
    // cursor: auto;
    &__dot {
      z-index: 1;
      position: absolute;
      top: 124px;
      left: 5px;
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      box-shadow: 0 0 12px $line;
      background-color: $line;
    }
    &__header {
      position: relative;
      float: left;
      width: 100%;
    }
    &__title {
      display: inline-block;
      width: 270px;
      height: 60px;
      margin-left: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: $weightBold;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &__close {

      &:hover {
        background-color: $lineLight;
      }
    }

    &__body {
      float: left;
      width: 100%;
      margin-top: -16px;
    }

    &__detail {
      float: left;
      width: 100%;
      margin-top: 6px;
      text-align: center;
    }

    &__icon {
      display: inline-block;
      width: 32px;
      height: 32px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      &:hover {
        &.dict__icon--close {
          background-color: $lineLight;
        }
        &.dict__icon--like {
          background-image: url("../../assets/icon/like-active.png");
        }
        &.dict__icon--star {
          background-image: url("../../assets/icon/star-active.png");
        }
      }
      &--active {
        &.dict__icon--like {
          background-image: url("../../assets/icon/like-active.png");
        }
        &.dict__icon--star {
          background-image: url("../../assets/icon/star-active.png");
        }
      }
      &--close {
        position: absolute;
        top: 14px;
        right: 14px;
        height: 36px;
        width: 36px;
        background-image: url("../../assets/icon/close.png");
      }
      &--like {
        background-image: url("../../assets/icon/like.png");
      }
      &--star {
        background-image: url("../../assets/icon/star.png");
      }
    }

    &__number {
      position: relative;
      top: -8px;
      display: inline-block;
    }

    &__button {
      display: inline-block;
      padding: 6px 22px;
      border-radius: 4px;
      font-size: 16px;
      background-color: $btn;
      cursor: pointer;

      &:hover {
        background-color: $btnDeep;
      }

      &--none {
        background-color: transparent;
        &.dict__button:hover {
          background-color: transparent;
        }
      }
    }

    &__footer {
      position: absolute;
      bottom: 20px;
      float: left;
      width: 100%;
    }

    &__left {
      float: left;
      width: 50%;
      text-align: center;
    }
    &__right {
      float: left;
      width: 50%;
      text-align: center;
    }
  }
  .dl-horizontal--info {
    box-sizing: border-box;
    float: none;
    height: 280px;
    width: 360px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 6px 0 6px;
    overflow-x: hidden;
    overflow-y: auto;
    /*IE scroll Bar Failed*/
    /*scrollbar-arrow-color: #f4ae21; !**!!*三角箭头的颜色*!*/
    /*scrollbar-face-color: #333; !**!!*立体滚动条的颜色*!*/
    /*scrollbar-3dlight-color: #666; !**!!*立体滚动条亮边的颜色*!*/
    /*scrollbar-highlight-color: #666; !**!!*滚动条空白部分的颜色*!*/
    /*scrollbar-shadow-color: #999; !**!!*立体滚动条阴影的颜色*!*/
    /*scrollbar-darkshadow-color: #666; !**!!*立体滚动条强阴影的颜色*!*/
    /*scrollbar-track-color: #666; !**!!*立体滚动条背景颜色*!*/
    /*scrollbar-base-color:#f8f8f8; !**!!*滚动条的基本颜色*!*/

    &::-webkit-scrollbar {
      // height: 6px;
      width: 6px;
      border-radius: 50%;
    }
    &::-webkit-scrollbar-corner {
      cursor: pointer;
      background: #f00;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background-color: #0a256c;
    }
    &::-webkit-scrollbar-thumb:hover {
      border-radius: 6px;
      // border: solid 6px #ff0;
      background-color: #093197;
      background-clip: content-box;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    dt {
      margin-top: 8px;
      width: auto;
      text-align: left;
    }
    dd {
      // max-height: 108px;
      margin-top: 8px;
      margin-left: auto;
    }
    .dl-horizontal__name {
      display: inline-block;
      max-width: 140px;
    }

    .dl-horizontal__right {
      float: right;
      margin-right: 0.5em;
    }
  }

  @keyframes toRotateUp {
    from {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  @keyframes toRotateDown {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }

  @keyframes toLarge {
    from {
      // width: 20px;
      // height: 20px;
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    to {
      // width: 55px;
      // height: 55px;
      transform: translate(-50%, -50%) scale(3);
      opacity: 0;
    }
  }

  @keyframes lineDiagonal {
    0%{
      width: 0;
    }
    36%{
      width: 100%;
    }
    100%{
      width: 100%;
    }
  }

  @keyframes lineHorizontal {
    0%{
      width: 0;
    }
    36% {
      width: 0;
    }
    /*36%{*/
    /*width: 0;*/
    /*}*/
    72%{
      width: 100%;
    }
    100%{
      width: 100%;
    }
  }

  .table {
    float: left;
    width: 100%;
    &__body {
      float: left;
      width: 100%;
    }
    &__tr {
      float: left;
      width: 100%;
    }
    &__td {
      float: left;
      display: inline-block;
      width: 84px;
      height: 32px;
      line-height: 32px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      &:nth-child(1) {
        width: 48px;
        text-align: right;
      }
      &:nth-child(2) {
        width: 180px;
      }
      &:nth-child(3) {
        width: 80px;
        text-align: right;
      }
      &:nth-child(4) {
        width: 32px;
      }
      &:nth-child(5) {}
    }
  }

  @keyframes dotAnimate {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes boxShadow {
    0%, 100% {
      box-shadow: 0 0 12px $white;
    }
    50% {
      box-shadow: 0 0 22px $red;
    }
  }
</style>
