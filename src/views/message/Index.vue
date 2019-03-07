<template>
  <div class="component">
    <div class="bread">
      <div class="bread__content">
        <div class="bread-nav">
          <div class="bread-nav__body">
            <div class="bread-nav__item" @click="goToMap">
              <span class="bread-nav__text">数据地图</span>
              <span class="bread-nav__division">&#62;</span>
            </div>
            <div class="bread-nav__item bread-nav__item--active">
              <span class="bread-nav__text">消息中心</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bread__line"></div>
    </div>

    <div class="message">
      <div class="message__item" v-for="(item, index) in messageListData" :key="index">
        <div class="message-detail" :class="{'message-detail--active': item.active}">
          <div class="message-detail__header">
            <div class="message-detail__subject">{{item.messageTitle}}</div>
            <div class="message-detail__btn" @click="handlerDetail(item)">{{item.active ? '收起查看' : '点击查看'}}</div>
            <div class="message-detail__date">{{item.recModifytime | date('yyyy-MM-dd')}}</div>
          </div>
          <div class="message-detail__body" v-if="item.active">
            <div class="message-detail__left">
              <dl class="dl-horizontal dl-horizontal--result">
                <dt>指标名称：</dt>
                <dd>
                  <span class="dl-horizontal__name" :title="item.name" v-html="item.name"></span>
                  <span class="dl-horizontal__right">Owner： <span v-html="item.owner"></span></span>
                </dd>
                <dt>父指标名称：</dt>
                <dd>--</dd>
                <dt>是否 KPI 指标：</dt>
                <dd :class="{'is-modify': item. isKpiModify}">
                  <!--{{item.iskpi ? '是' : '否'}}-->
                  <div class="radio radio--prevent" :class="{'radio--active': item.iskpi}">
                    <span class="radio__outer">
                        <span class="radio__inner"></span>
                    </span>
                    <span class="radio__label">是</span>
                  </div>
                  <div class="radio radio--prevent" :class="{'radio--active': !item.iskpi}">
                    <span class="radio__outer">
                      <span class="radio__inner"></span>
                    </span>
                    <span class="radio__label">否</span>
                  </div>
                </dd>
                <dt>指标状态：</dt>
                <dd :class="{'is-modify': item. isUsedModify}">{{item.isused ? '在用' : '不在用'}}</dd>
                <dt>指标定义：</dt>
                <dd v-html="item.conception || '--'"></dd>
                <dt>指标公式：</dt>
                <dd v-html="item.logicFormula || '--'"></dd>
                <dt>指标口径：</dt>
                <dd>--</dd>
              </dl>
            </div>
            <div class="message-detail__right">
              <dl class="dl-horizontal dl-horizontal--half">
                <dt>BU：</dt>
                <dd>{{item.buChineseName || '--'}}</dd>
                <dt>SUBBU：</dt>
                <dd>{{item.subbuChineseName || '--'}} </dd>
                <dt>数据源：</dt>
                <dd>{{'--'}} </dd>
                <dt>应用场景：</dt>
                <dd>{{item.scenario || '--'}} </dd>
                <dt>干系人：</dt>
                <dd v-html="item.relations || '--'"></dd>
              </dl>
            </div>
            <div class="message-detail__pick" @click="handlerDetail(item)">
              <i class="message-detail__icon"></i>
              收起
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { apiMessages } from './server/api'
export default {
  name: 'MessageIndex',
  mixins: [],
  components: {},
  computed: mapState({
    userName: state => state.userName,
    userInfo: state => state.userInfo,
    baseURL: state => state.baseURL
  }),
  data () {
    return {
      msg: 'Welcome to MessageIndex',
      activeDetail: false,
      // userName: 'sunhuajian',
      messageId: null,
      messageListData: []
    }
  },
  methods: {
    goToMap () {
      this.$router.push({ path: '/' })
    },
    handlerDetail (item) {
      item.active = !item.active
    },
    reqMessageList () {
      let params = {
        'user': this.userName
      }
      let request = apiMessages(params)
      request.then((res) => {
        this.messageListData = this.tidyMessageList(res)
      })
    },
    tidyMessageList (data) {
      data.forEach((item) => {
        item.active = false
        if (this.messageId && this.messageId === item.id) {
          item.active = true
        }
        let modifyList = null
        // 判断某个属性被修改变更
        if (item.modifiedColumn) {
          modifyList = item.modifiedColumn.split(',')
          modifyList.forEach((parent) => {
            Object.keys(item).forEach((key) => {
              if (key === parent && key === 'iskpi') {
                item.isKpiModify = true
              } else if (key === parent && key === 'isused') {
                item.isUsedModify = true
              } else if (key === parent) {
                item[key] = `<span class="is-modify">${item[key]}</span>`
              }
            })
          })
        }
      })
      return data
    }
  },
  created () {
    this.messageId = this.$route.query.id
  },
  mounted () {
    this.reqMessageList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  @import '../../styles/index.scss';

  .component {
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 16px;
    background: $bg url("./../../assets/star/bg-embellishment.png");
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  .bread {
    float: left;
    width: 100%;
    color: $white;
    &__content {
      float: left;
      width: 100%;
    }
    &__line {
      float: left;
      width: 100%;
      border-bottom: 1px solid $borderMain;
    }
  }

  .bread-nav {
    float: left;
    width: 100%;
    margin: 60px 0 24px 0;

    &__body {
      width: 1306px;
      margin: 0 auto;
      background-color: $lineLight;
    }
    &__item {
      float: left;
      display: inline-block;
      color: $line;
      cursor: pointer;
      &:hover {
        color: $white;
      }
      &--active {
        color: $white;
      }
    }
    &__text {
      float: left;
      display: inline-block;
    }
    &__division {
      float: left;
      display: inline-block;
      margin: 0 0.5em;
      // color: $line;
    }
  }

  .message {
    float: left;
    width: 100%;
    margin: 32px 0;

    &__item {
      width: 1326px;
      margin: 0 auto;
    }
  }

  .message-intro {
    box-sizing: border-box;
    float: left;
    width: 1326px;
    height: 80px;
    padding: 11px;
    color: $white;
    background: url("./../../assets/message/messge-bar.png") no-repeat center center;

    &__subject {
      box-sizing: border-box;
      float: left;
      max-width: 1070px;
      height: 58px;
      padding-left: 48px;
      line-height: 58px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &__btn {
      float: left;
      height: 58px;
      padding: 0 14px;
      line-height: 58px;
      color: $line;
      cursor: pointer;

      &:hover {
        color: $white;
      }
    }
    &__date {
      box-sizing: border-box;
      float: right;
      height: 58px;
      padding-right: 48px;
      line-height: 58px;
    }
  }

  .message-detail {
    box-sizing: border-box;
    position: relative;
    float: left;
    width: 1326px;
    height: 80px;
    margin: 0 0 12px 0;
    padding: 11px;
    color: $white;
    background: url("./../../assets/message/messge-bar.png") no-repeat 0 0;
    transition: height 200ms;

    &--active {
      height: 461px;
      background: url("./../../assets/message/messge-detail.png") no-repeat 0 0;
    }

    &__header {
      float: left;
      width: 100%;
    }

    &__subject {
      box-sizing: border-box;
      float: left;
      max-width: 1070px;
      height: 58px;
      padding-left: 48px;
      line-height: 58px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &__btn {
      float: left;
      height: 58px;
      padding: 0 14px;
      line-height: 58px;
      color: $line;
      cursor: pointer;

      &:hover {
        color: $white;
      }
    }
    &__date {
      box-sizing: border-box;
      float: right;
      height: 58px;
      padding-right: 48px;
      line-height: 58px;
    }

    &__body {
      position: relative;
      float: left;
      width: 100%;
      // height: 381px;
    }
    &__left {
      box-sizing: border-box;
      float: left;
      width: 50%;
      height: 381px;
      border-right: 1px solid $borderMain;
    }
    &__right {
      float: left;
      width: 50%;
      height: 381px;
    }
    &__pick {
      position: absolute;
      right: 48px;
      bottom: 32px;
      width: 72px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      background-color: #011540;
      cursor: pointer;
      &:hover {
        color: $line;
      }
    }
    &__icon {
      position: relative;
      top: 3px;
      display: inline-block;
      width: 18px;
      height: 18px;
      background: url("../../assets/icon/pick-up.png") no-repeat center center;
    }
  }

  .dl-horizontal--result {
    box-sizing: border-box;
    float: right;
    height: 356px;
    width: 604px;
    margin-top: 12px;
    margin-left: auto;
    margin-right: 6px;
    padding: 0 7px 0 6px;
    overflow-x: hidden;
    overflow-y: auto;
    /*IE scroll Bar Failed*/
    /*scrollbar-arrow-color: #f4ae21; !**!!*三角箭头的颜色*!*/
    /*scrollbar-face-color: #333; !**!!*立体滚动条的颜色*!*/
    /*scrollbar-3dlight-color: #666; !**!!*立体滚动条亮边的颜色*!*/
    /*scrollbar-highlight-color: #666; !**!!*滚动条空白部分的颜色*!*/
    /*scrollbar-shadow-color: #999; !**!!*立体滚动条阴影的颜色*!*/
    /*scrollbar-darkshadow-color: #666; !**!!*立体滚动条强阴影的颜色*!*/
    /*scrollbar-track-color: #666; !**!!*立体滚动条背景颜色*!*/
    /*scrollbar-base-color:#f8f8f8; !**!!*滚动条的基本颜色*!*/

    &::-webkit-scrollbar {
      // height: 6px;
      width: 6px;
      border-radius: 50%;
    }
    &::-webkit-scrollbar-corner {
      cursor: pointer;
      background: #f00;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background-color: #0a256c;
    }
    &::-webkit-scrollbar-thumb:hover {
      border-radius: 6px;
      // border: solid 6px #ff0;
      background-color: #093197;
      background-clip: content-box;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    dt {
      margin-top: 17px;
      width: auto;
      text-align: left;
    }
    dd {
      // max-height: 108px;
      margin-top: 17px;
      margin-left: auto;
    }
    .dl-horizontal__name {
      display: inline-block;
      max-width: 378px;
    }

    .dl-horizontal__right {
      float: right;
      margin-right: 0.5em;
    }
  }

  .dl-horizontal--half {
    box-sizing: border-box;
    float: left;
    height: 356px;
    width: 580px;
    margin-top: 12px;
    margin-left: 48px;
    margin-right: 6px;
    padding: 0 7px 0 6px;
    overflow-x: hidden;
    overflow-y: auto;
    /*IE scroll Bar Failed*/
    /*scrollbar-arrow-color: #f4ae21; !**!!*三角箭头的颜色*!*/
    /*scrollbar-face-color: #333; !**!!*立体滚动条的颜色*!*/
    /*scrollbar-3dlight-color: #666; !**!!*立体滚动条亮边的颜色*!*/
    /*scrollbar-highlight-color: #666; !**!!*滚动条空白部分的颜色*!*/
    /*scrollbar-shadow-color: #999; !**!!*立体滚动条阴影的颜色*!*/
    /*scrollbar-darkshadow-color: #666; !**!!*立体滚动条强阴影的颜色*!*/
    /*scrollbar-track-color: #666; !**!!*立体滚动条背景颜色*!*/
    /*scrollbar-base-color:#f8f8f8; !**!!*滚动条的基本颜色*!*/

    &::-webkit-scrollbar {
      // height: 6px;
      width: 6px;
      border-radius: 50%;
    }
    &::-webkit-scrollbar-corner {
      cursor: pointer;
      background: #f00;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background-color: #0a256c;
    }
    &::-webkit-scrollbar-thumb:hover {
      border-radius: 6px;
      // border: solid 6px #ff0;
      background-color: #093197;
      background-clip: content-box;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    dt {
      margin-top: 17px;
      width: auto;
      text-align: left;
    }
    dd {
      // max-height: 108px;
      margin-top: 17px;
      margin-left: auto;
    }

    .dl-horizontal__name {
      display: inline-block;
      max-width: 378px;
    }

    .dl-horizontal__right {
      float: right;
      margin-right: 0.5em;
    }
  }

</style>
