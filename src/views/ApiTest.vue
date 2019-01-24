<template>
  <div class="index">
    <!--<h1>404 {{ msg }}</h1>-->
    <h3>socket 链接</h3>
    <p>
      <textarea style="box-sizing: border-box;width: 512px; height: 150px;margin: 0;padding: 0;" placeholder="请按照示例输入链接" v-model="urlSocket"></textarea>
    </p>
    <h3>socket 参数</h3>
    <p>
      <input style="box-sizing: border-box;width: 512px; height: auto;margin: 0;padding: 0;" placeholder="请输入参数，默认为空" v-model="urlSocketParams" />
    </p>
    <button @click="testWebSocket()"> 测试 socket </button>
    <h3>result</h3>
    <pre style="font-size: 14px">{{socketResponse}}</pre>
    <p>
      <img src="../assets/logo.png" />
    </p>
    <div ref="testFocus" style="" tabindex="999" @focus="focusTest" @blur="blurTest" @mouseout="mouseoutTest">focus</div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      msg: 'Welcome to NotFound',
      urlSocket: 'ws://172.17.2.48:8088/operation/tmall/summary/socket',
      urlSocketParams: '',
      socketResponse: null,
      socketObject: null
    }
  },
  methods: {
    mouseoutTest () {
      this.$refs.testFocus.blur()
    },
    focusTest (event) {
    },
    blurTest (event) {
    },
    testWebSocket () {
      if (this.socketObject) {
        this.socketObject.close()
      }
      this.socketObject = new WebSocket(this.urlSocket)
      this.socketObject.onopen = (res) => {
        this.socketObject.send(this.urlSocketParams)
      }
      this.socketObject.onmessage = (res) => {
        let response = JSON.parse(res.data)
        this.socketResponse = JSON.stringify(response, null, 4)
      }
      this.socketObject.onclose = (res) => {
      }
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
</style>
