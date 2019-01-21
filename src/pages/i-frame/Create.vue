<template>
  <div class="index">
    <h1>{{ msg }}</h1>
    <div id="iFrame" class="i-frame"></div>
  </div>
</template>

<script>
export default {
  name: 'IFrameCreate',
  mixins: [],
  components: {},
  data () {
    return {
      msg: 'Welcome to IFrameCreate'
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
    let docFrag = new DocumentFragment()
    let iframe = document.createElement('iframe')
    iframe.src = 'http://172.17.100.72:7010/i-frame?authCode=dk3hn3rt&authUser=qiuguangming'
    iframe.width = '100%'
    iframe.height = 600 + 'px'
    iframe.style.border = '1px solid #f1f1f1'
    docFrag.appendChild(iframe)
    document.querySelector('#iFrame').appendChild(docFrag)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  @import '../../styles/index.scss';

  .index {
    color: red;
  }
  .i-frame {
    height: 600px;
    iframe {
      border: 1px solid #f1f1f1;
    }
  }
</style>
