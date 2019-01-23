<template>
  <div class="component">
    <!--<h1>{{msg}}</h1>-->
    <svg class="svg-demo" id="svg"></svg>
  </div>
</template>

<script>
// import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'
import Snap from 'snapsvg'
export default {
  name: 'BaseDaily',
  mixins: [],
  components: {},
  data () {
    return {
      msg: 'Welcome to BaseDaily'
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
    const svg = Snap('#svg')
    const svgPath = svg.paper.path('M 300, 300 h 0 v 0 A 100, 100 0 0, 1 400, 200')
    svgPath.attr({
      fill: 'transparent',
      stroke: '#000',
      strokeWidth: 8
      // path: ' A 100 100 0 0 1 200 200'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  @import '../../styles/index.scss';

  .component {
  }
  .svg-demo {
    width: 1280px;
    height: 720px;
    border: 1px solid #999;
  }
</style>
