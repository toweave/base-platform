<template>
  <router-view/>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '@/mixins'
export default {
  name: 'HeaderSide',
  mixins: [mixin],
  components: {},
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
  },
  watch: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  @import '../styles/index.scss';
</style>
