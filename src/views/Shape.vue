<template>
  <div class="index">
    <h1>Test {{ msg }}</h1>
    <div>
      <div class="shape" style="color: #000">12313</div>
    </div>
    <h1>{{'0' | number(1)}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Shape',
  data () {
    return {
      msg: 'Welcome to Shape'
    }
  },
  methods: {
    focusTest (event) {
    },
    blurTest (event) {
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  @import './../styles/index.scss';

  .index {
    box-sizing: border-box;
    float: left;
    width: 100%;
    padding: 0 24px;
    color: $red;
    background-color: $white;
  }

  .shape {
    width: 100px;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid $red;
    overflow: hidden;
  }
</style>
