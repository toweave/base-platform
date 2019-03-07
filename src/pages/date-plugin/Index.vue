<template>
  <div class="index">
    <h1>{{ msg }}</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'DatePluginIndex',
  mixins: [],
  components: {},
  data () {
    return {
      msg: 'Welcome to DatePluginIndex'
    }
  },
  methods: {
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

</style>
