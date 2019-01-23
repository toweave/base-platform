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
              <span class="bread-nav__text">我的关注</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bread__line"></div>
    </div>

    <div class="star">
      <div class="star__header">
        <div class="star__item">
          <div class="star__left">指标名称</div>
          <div class="star__right">操作</div>
        </div>
      </div>
      <div class="star__body">
        <div class="star__item" v-for="(item, index) in starListData" :key="index">
          <div class="star__left">{{item.indexName}}</div>
          <div class="star__right">
            <div class="star__operation"
                 @click="handlerLike(item, index)"
                 :class="{'star__operation--active': item.thumbUp === 1}">
              <i class="star__icon star__icon--like"></i>
              <span class="star__text">{{item.thumbUp === 1 ? '已赞' : '未点赞'}}</span>
            </div>
            <div class="star__operation"
                 @click="handlerStar(item, index)"
                 :class="{'star__operation--active': item.focus === 1}">
              <i class="star__icon star__icon--star"></i>
              <span class="star__text">{{item.focus === 1 ? '已关注' : '未关注'}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="star__footer">
        <div class="star__item">
          <div class="star__left">{{starLastData.indexName || '--'}}</div>
          <div class="star__right" v-if="!starLastData.focus && starLastData.focus !== 0">
            <div class="star__operation">
              <span class="star__text">--</span>
            </div>
            <div class="star__operation">
              <span class="star__text">--</span>
            </div>
          </div>
          <div class="star__right" v-else>
            <div class="star__operation"
                 @click="handlerLike(starLastData, 'last')"
                 :class="{'star__operation--active': starLastData.thumbUp === 1}">
              <i class="star__icon star__icon--like"></i>
              <span class="star__text">{{starLastData.thumbUp === 1 ? '已赞' : '未点赞'}}</span>
            </div>
            <div class="star__operation"
                 @click="handlerStar(starLastData, 'last')"
                 :class="{'star__operation--active': starLastData.focus === 1}">
              <i class="star__icon star__icon--star"></i>
              <span class="star__text">{{starLastData.focus === 1 ? '已关注' : '未关注'}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { apiStar, apiLike, apiStarList } from './server/api'
export default {
  name: 'StarIndex',
  mixins: [],
  components: {},
  computed: mapState({
    userName: state => state.userName,
    userInfo: state => state.userInfo,
    baseURL: state => state.baseURL
  }),
  data () {
    return {
      msg: 'Welcome to StarIndex',
      // userName: 'sunhuajian',
      starListData: [],
      starLastData: {}
    }
  },
  methods: {
    goToMap () {
      this.$router.push({ path: '/' })
    },
    handlerStar (item, index) {
      if (!item.indexId) {
        return
      }
      let params = {
        indexId: item.indexId,
        user: this.userName,
        focus: item.focus === 0 ? 1 : 0
      }
      let request = apiStar(params)
      request.then((res) => {
        item.focus = params.focus
        if (params.focus === 0 && index === 'last') {
          // this.starLastData = {}
        } else if (params.focus === 0) {
          // this.starListData.splice(index, 1)
        }
      })
    },
    handlerLike (item) {
      if (!item.indexId) {
        return
      }
      let params = {
        indexId: item.indexId,
        user: this.userName,
        thumbUp: item.thumbUp === 0 ? 1 : 0
      }
      let request = apiLike(params)
      request.then((res) => {
        item.thumbUp = params.thumbUp
      })
    },
    starList () {
      let params = {
        'user': this.userName
      }
      let request = apiStarList(params)
      request.then((res) => {
        this.starListData = res
        if (res.length === 0) {
          this.starListData = []
          this.starLastData = {}
        } else if (res.length === 1) {
          this.starListData = []
          this.starLastData = res[0]
        } else {
          let lenLast = res.length - 1
          this.starListData = res.slice(0, lenLast)
          this.starLastData = res[lenLast]
        }
      })
    }
  },
  created () {
  },
  mounted () {
    this.starList()
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

  .star {
    float: left;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 48px;
    color: $white;

    .star__left {
      float: left;
      width: 50%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      overflow: hidden;
    }
    .star__right {
      float: left;
      width: 50%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      overflow: hidden;
    }

    &__header {
      width: 1326px;
      margin: 0 auto;
      .star__item {
        box-sizing: border-box;
        float: left;
        width: 1326px;
        height: 68px;
        padding: 10px 10px 0 10px;
        background: url("./../../assets/star/header.png") no-repeat center center;
      }
      .star__left {
        height: 57px;
        line-height: 57px;
      }
      .star__right {
        height: 57px;
        line-height: 57px;
      }
    }
    &__body {
      width: 1326px;
      margin: 0 auto;
      .star__item {
        box-sizing: border-box;
        float: left;
        width: 1326px;
        height: 51px;
        padding: 0 10px;
        background: url("./../../assets/star/body.png") no-repeat center center;
      }
    }
    &__footer {
      width: 1326px;
      margin: 0 auto;
      .star__item {
        box-sizing: border-box;
        float: left;
        width: 1326px;
        height: 62px;
        padding: 0px 10px 10px 10px;
        background: url("./../../assets/star/footer.png") no-repeat center center;
      }
    }

    &__icon {
      position: relative;
      top: 9px;
      display: inline-block;
      width: 32px;
      height: 32px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      &--like {
        background-image: url("../../assets/icon/like.png");
      }
      &--star {
        background-image: url("../../assets/icon/star.png");
      }
    }

    &__operation {
      display: inline-block;
      cursor: pointer;
      width: 120px;

      &:last-child {
        // margin-left: 72px;
      }
      &:hover,
      &--active {
        .star__icon--like {
          background-image: url("../../assets/icon/like-active.png");
        }
        .star__icon--star {
          background-image: url("../../assets/icon/star-active.png");
        }
      }
    }
  }
</style>
