<template>
  <div class="component">
    <h1>{{msg}}</h1>
    <div id="drawing"></div>
    <div class="scroll">
      <div class="scroll__box" ref="scrollBox">
        <div class="scroll__content" ref="scrollContent" @mousewheel="handlerWheel">
          <p v-for="item in 50" :key="item" @click="activeItem(item)">{{item}}</p>
          <!--<img src="../../assets/map/detail-box.png" />-->
          {{isHandlerBar}}
        </div>
      </div>
      <div class="scroll__bar" ref="scrollBar" v-if="isHandlerBar">
        <div class="scroll__handler"  ref="scrollHandler" @mousedown="handlerBar"></div>
        <div class="scroll__line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BasePool',
  mixins: [],
  components: {},
  computed: mapState({
    app: state => state.app.app,
    name: state => state.user.name
  }),
  data () {
    return {
      msg: 'Welcome to BasePool',
      isHandlerBar: false
    }
  },
  methods: {
    handlerWheel ($event) {
      if (this.isHandlerBar) {
        let scrollBox = this.$refs.scrollBox
        let scrollContent = this.$refs.scrollContent
        let scrollBar = this.$refs.scrollBar
        let scrollHandler = this.$refs.scrollHandler
        setTimeout(() => {
          let scrollBarHeight = parseInt(getComputedStyle(scrollBar).height)
          let vHeight = parseInt(getComputedStyle(scrollContent).height) - parseInt(getComputedStyle(scrollBox).height)
          scrollBarHeight -= parseInt(getComputedStyle(scrollHandler).height)
          let topD = (scrollBox.scrollTop / vHeight) * scrollBarHeight
          scrollHandler.style.setProperty('top', topD + 'px')
        }, 20)
      }
    },
    hasHandlerBar () {
      let scrollBox = this.$refs.scrollBox
      let scrollContent = this.$refs.scrollContent
      let vHeight = parseInt(getComputedStyle(scrollContent).height) - parseInt(getComputedStyle(scrollBox).height)
      this.isHandlerBar = vHeight >= 0
    },
    handlerBar ($event) {
      let scrollBox = this.$refs.scrollBox
      let scrollContent = this.$refs.scrollContent
      let scrollBar = this.$refs.scrollBar
      let scrollHandler = this.$refs.scrollHandler
      let scrollBarHeight = parseInt(getComputedStyle(scrollBar).height)
      let vHeight = parseInt(getComputedStyle(scrollContent).height) - parseInt(getComputedStyle(scrollBox).height)
      let event = $event || window.event
      event.preventDefault()
      event.stopPropagation()
      scrollBarHeight -= parseInt(getComputedStyle(scrollHandler).height)
      let topD = (scrollBox.scrollTop / vHeight) * scrollBarHeight
      let yD = 0
      document.onmousemove = function (e) {
        yD = topD + e.clientY - event.clientY
        yD = Math.min(yD, scrollBarHeight)
        yD = Math.max(yD, 0)
        scrollBox.scrollTop = vHeight * yD / scrollBarHeight
        // scrollHandler.style..top = yD
        scrollHandler.style.setProperty('top', yD + 'px')
      }
      document.onmouseup = () => {
        document.onmousemove = null
      }
    },
    activeItem (item) {
    }
  },
  created () {
    console.log(29, this.app, this.name)
  },
  mounted () {
    console.log(32, this.app, this.name)
    this.hasHandlerBar()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  @import '../../styles/index.scss';

  .component {
  }

  .scroll {
    box-sizing: border-box;
    z-index: 9;
    position: relative;
    width: 1280px;
    height: 360px;
    border: 1px solid #ccc;
    overflow: hidden;
    padding-right: 10px;

    &__box {
      width: 1280px;
      height: 360px;
      overflow: hidden auto;
      padding-right: 30px;
      box-sizing: content-box;
      scroll-behavior: smooth;
      // &::-webkit-scrollbar { display: none; }
      // pointer-events: none;
    }

    &__content {
      float: left;
      width: 100%;
    }

    p {
      background-color: $line;
    }

    &__bar {
      position: absolute;
      right: 0;
      top: 0;
      width: 10px;
      height: 100%;
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
    &__handler {
      z-index: 2;
      position: absolute;
      right: 6px;
      top: 0;
      width: 10px;
      height: 60px;
      border-radius: 15px;
      background: rgb(32, 32, 32);
      transition: top 100ms linear 0ms;
    }
    &__line {
      z-index: 1;
      position: absolute;
      left: 4px;
      height: 100%;
      width: 2px;
      background: rgb(128, 128, 128);
    }
  }
</style>
