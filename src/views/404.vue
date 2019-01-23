<template>
  <div class="index">
    <h1>Ooops! 404 {{ msg }}.</h1>
    <h3>Sorry ! That page doesn't exist.</h3>
    <h3> o(╯□╰)o ......</h3>
    <h3>&nbsp;</h3>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      msg: 'Not Found'
    }
  },
  methods: {
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
    padding: 48px 72px;
    color: $red;
    background-color: $white;
  }
</style>
