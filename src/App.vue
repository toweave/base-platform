<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {},
  computed: mapState({
    app: state => state.app.app,
    name: state => state.user.name
  }),
  data () {
    return {
      msg: 'App'
    }
  },
  methods: {},
  beforeCreate () {
  },
  created () {
    console.log(29, this.app, this.name)
  },
  mounted () {
    console.log(32, this.app, this.name)
  },
  watch: {
    name: function (newValue, oldValue) {
      console.log(36, this.app, this.name)
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
