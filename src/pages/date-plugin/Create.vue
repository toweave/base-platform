<template>
  <div class="index">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'DatePluginCreate',
  mixins: [],
  components: {},
  data () {
    return {
      msg: 'Welcome to DatePluginCreate'
    }
  },
  methods: {
    getNowDate () {
      let date = new Date()
      date.setDate(1)
      console.log(21, date)
    },
    openPanelDate () {
      let date = new Date('2019-02-01')
      let firstDateSet = date.setDate(1)
      let firstDate = new Date(firstDateSet)
      let firstDateDay = firstDate.getDay()
      console.log(27, firstDate, firstDate.getTime(), firstDateDay)
      let startDate = firstDate.getTime() - 86400000 * firstDateDay
      console.log(30, startDate, new Date(startDate))
      let pannelDates = []
      let i = 0
      while (pannelDates.length < 42) {
        let setDate = new Date(startDate + i * 86400000)
        pannelDates.push({
          dateObject: setDate,
          day: setDate.getDay(),
          date: setDate.getDate()
        })
        i++
      }
      console.log(40, pannelDates)
    }
  },
  created () {
  },
  mounted () {
    this.openPanelDate()
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
