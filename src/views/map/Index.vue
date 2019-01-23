<template>
  <div class="component" ref="MapParent" :style="{'width': viewWidth, 'height': viewHeight, 'min-height': '420px'}" @click="$eventBubble">
    <!--<div class="map-line">-->
      <!--<div class="map-line__h"></div>-->
      <!--<div class="map-line__v"></div>-->
    <!--</div>-->

    <div class="search">
      <div class="search__body">
        <input class="search__input"
               placeholder="请输入搜索关键字"
               v-model="keywords"
               @keyup.enter="handlerSearchForm()" />
        <div class="search__button" @click="handlerSearchForm()"></div>
      </div>
    </div>

    <!--<div class="search-result" v-if="showSearchResult">-->
    <div class="search-result">
      <div class="search-result__body" :class="{'search-result__body--active': showSearchResult}">
        <div class="search-result__blank" v-if="searchResultStatus === 0">
          努力加载中
          <span class="search-result__dot">.</span>
          <span class="search-result__dot">.</span>
          <span class="search-result__dot">.</span>
        </div>
        <div class="search-result__blank" v-else-if="searchResultStatus === 1">搜索无结果</div>
        <div class="search-result__content" v-else-if="searchResultStatus === 2">
          <div class="search-result__item"
               v-for="(item, index) in searchResult"
               @click="goToPositionIndicator(item)"
               :key="index">
            <div class="search-result__name">{{item.name || '--'}}</div>
            <div class="search-result__channel">{{item.subbuChineseName || '--'}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--v-if="tempActiveIndicator"-->
    <div class="indicator" v-if="tempActiveIndicatorTimer" :class="{'indicator--top': showSearchResult}">
      <div class="indicator__box animated" :class="{'fadeInLeft': tempActiveIndicator, 'fadeOutLeft': !tempActiveIndicator}">
        <div class="indicator__header">
          <div class="indicator__toggle">
            <div class="indicator__ghost"
                 :class="{'indicator__ghost--active': tempIndicatorCase === 0}"
                 @click="toggleIndicator(0)">指标</div>
            <div class="indicator__ghost"
                 :class="{'indicator__ghost--active': tempIndicatorCase === 1}"
                 @click="toggleIndicator(1)">报表</div>
          </div>
        </div>
        <div class="indicator__body">
          <dl class="dl-horizontal dl-horizontal--result" v-if="tempIndicatorCase === 0">
            <dt>指标名称：</dt>
            <dd>
              <span class="dl-horizontal__name" :title="tempIndicatorDetail.name">{{tempIndicatorDetail.name}}</span>
              <span class="dl-horizontal__right">Owner：{{tempIndicatorDetail.owner}}</span>
            </dd>
            <dt>父指标名称：</dt>
            <dd>--</dd>
            <dt>是否 KPI 指标：</dt>
            <dd>
              <div class="radio radio--prevent" :class="{'radio--active': tempIndicatorDetail.iskpi}">
                <span class="radio__outer">
                  <span class="radio__inner"></span>
                </span>
                <span class="radio__label">是</span>
              </div>
              <div class="radio radio--prevent" :class="{'radio--active': !tempIndicatorDetail.iskpi}">
                <span class="radio__outer">
                  <span class="radio__inner"></span>
                </span>
                <span class="radio__label">否</span>
              </div>
            </dd>
            <dt>指标状态：</dt>
            <dd>{{tempIndicatorDetail.isused ? '在用' : '不在用'}} </dd>
            <dt>指标定义：</dt>
            <dd>{{tempIndicatorDetail.conception || '--'}}</dd>
            <dt>指标公式：</dt>
            <dd>{{tempIndicatorDetail.logicFormula || '--'}}</dd>
            <dt>指标口径：</dt>
            <dd>--</dd>
            <dt>BG：</dt>
            <dd>{{tempIndicatorDetail.bgChineseName || '--'}}</dd>
            <dt>BU：</dt>
            <dd>{{tempIndicatorDetail.buChineseName || '--'}}</dd>
            <dt>SUBBU：</dt>
            <dd>{{tempIndicatorDetail.subbuChineseName || '--'}} </dd>
            <dt>数据源：</dt>
            <dd>{{'--'}} </dd>
            <dt>应用场景：</dt>
            <dd>{{tempIndicatorDetail.scenario || '--'}} </dd>
            <dt>干系人：</dt>
            <dd>{{tempIndicatorDetail.relations || '--'}} </dd>
          </dl>
          <div class="indicator-table" v-if="tempIndicatorCase === 1">
            <p class="indicator-table__p"
               v-for="(item, index) in tempIndicatorTable" :key="index">
              {{item}}
            </p>
            <p v-if="!tempIndicatorTable.length" style="text-align: center">暂时无数据</p>
          </div>
        </div>
        <div class="indicator__footer">
          <div class="indicator__button" @click="handlerIndicatorDetail()">关闭</div>
        </div>
      </div>
    </div>

    <div class="operation">
      <div class="operation__item" @click="handlerOperation(index)"
           v-for="(item, index) in groupOperation" :key="index">
        <i class="operation__icon" :class="[item.icon]"></i>
        <span class="operation__text">{{item.name}}</span>
        <i class="operation__icon operation__icon--pull"
           :class="{'operation__icon--active': item.boolean}"></i>
      </div>
      <!--<div class="operation__item" @click="handlerOperation(1)">-->
        <!--<i class="operation__icon operation__icon&#45;&#45;hot"></i>-->
        <!--<span class="operation__text">热度</span>-->
        <!--<i class="operation__icon operation__icon&#45;&#45;pull"-->
           <!--:class="{'operation__icon&#45;&#45;active': groupOperation[1]}"></i>-->
      <!--</div>-->
      <!--<div class="operation__item" @click="handlerOperation(2)">-->
        <!--<i class="operation__icon operation__icon&#45;&#45;list"></i>-->
        <!--<span class="operation__text">一周热点</span>-->
        <!--<i class="operation__icon operation__icon&#45;&#45;pull"-->
           <!--:class="{'operation__icon&#45;&#45;active': groupOperation[2]}"></i>-->
      <!--</div>-->
      <!--<div class="operation__item" @click="handlerOperation(3)">-->
        <!--<i class="operation__icon operation__icon&#45;&#45;msg"></i>-->
        <!--<span class="operation__text">消息</span>-->
        <!--<i class="operation__icon operation__icon&#45;&#45;pull"-->
           <!--:class="{'operation__icon&#45;&#45;active': groupOperation[3]}"></i>-->
      <!--</div>-->
    </div>
    <div class="channel" v-show="groupOperation[0].boolean">
      <div class="channel__header">
        <div class="channel__title">渠道</div>
        <div class="channel__icon channel__icon--close" @click="closeOperationChannel"></div>
      </div>
      <div class="channel__body">
        <div class="channel__list" v-for="(item, index) in groupChannel" :key="index">
          <div class="channel__bg">{{item.dimName}}</div>
          <dl class="dl-horizontal subitem" v-for="(subitem, i) in item.children" :key="i">
            <dt>
              <!--@mouseover="handlerSubitem(index, i)"-->
              <div class="radio radio--hover"
                   @click="handlerActiveSubitem($event, index, i)"
                   :class="{'radio--active': subitem.selected}">
                <span class="radio__outer">
                  <span class="radio__inner"></span>
                </span>
                <span class="radio__label">{{subitem.dimName}}</span>
              </div>
              <i class="subitem__icon subitem__icon--arrow" v-if="subitem.children.length"></i>
            </dt>
            <dd>
              <!--@mouseover="handlerChildItem(index, i, j)"-->
              <div class="radio radio--hover"
                   @click="handlerActiveChildItem($event, index, i, j)"
                   v-for="(childItem, j) in subitem.children" :key="j"
                   :class="{'radio--active': childItem.selected}">
                <span class="radio__line"></span>
                <span class="radio__outer">
                  <span class="radio__inner"></span>
                </span>
                <span class="radio__label">{{childItem.dimName}}</span>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>

    <div class="level" v-show="groupOperation[1].boolean">
      <div class="level__item">
        <div class="level__box level__box--0"
             :class="{'level__box--active': levelHot === 2}"
             @click="handlerLevel(2)">低</div>
      </div>
      <div class="level__item">
        <div class="level__box level__box--1"
             :class="{'level__box--active': levelHot === 1}"
             @click="handlerLevel(1)">中</div>
      </div>
      <div class="level__item">
        <div class="level__box level__box--2"
             :class="{'level__box--active': levelHot === 0}"
             @click="handlerLevel(0)">高</div>
      </div>
    </div>

    <div class="hot" v-show="groupOperation[2].boolean">
      <div class="hot__header">
        <!--<div class="hot__icon hot__icon&#45;&#45;message"></div>-->
        <div class="hot__title">一周热点</div>
        <div class="hot__icon hot__icon--close"  @click="closeHotRank()"></div>
      </div>
      <div class="hot__body">
        <div class="hot__toggle">
          <div class="hot__button"
               v-for="(item, index) in rankTypes"
               @click="handlerRankType(index)"
               :class="{'hot__button--active': item.boolean}"
               :key="index">{{item.name}}</div>
        </div>
        <div class="hot__content">
          <div class="table">
            <div class="table__body">
              <div class="table__tr" v-for="(item, index) in rankIndicatorList" :key="index">
                <div class="table__td">{{index + 1}}、</div>
                <div class="table__td" :title="item.indexName">{{item.indexName}}</div>
                <div class="table__td">{{item.hotIndex}}</div>
                <div class="table__td">
                  <i class="hot__icon hot__icon--small"
                     :class="{'hot__icon--up': item.status === 2, 'hot__icon--down': item.status === 0}"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="message" v-show="groupOperation[3].boolean">
      <div class="message__header">
        <div class="message__icon message__icon--message" @click="goToMessage()"></div>
        <div class="message__title">消息</div>
        <div class="message__icon message__icon--close" @click="closeMessage()"></div>
      </div>
      <div class="message__body">
        <div class="message__item"
             v-for="(item, index) in messagesLimit3"
             :key="index">
          <div class="message__name">{{item.messageTitle}}</div>
          <div class="message__view" @click="goToMessageDetail(item)">点此查看</div>
        </div>
      </div>
    </div>

    <div class="avatar">
      <div class="avatar__box" @click="handlerUserMenu()">
        <div class="avatar__name" :title="userName">{{userName}}</div>
        <i class="avatar__icon avatar__icon--pull" :class="{'avatar__icon--active': showUserMenu}"></i>
      </div>
      <div class="avatar__content" :class="{'avatar__content--active': showUserMenu}">
        <div class="avatar__item" @click="goToStatus(0)">消息中心</div>
        <div class="avatar__item" @click="goToStatus(1)">我的关注</div>
      </div>
    </div>

    <!--<div class="move" id="MapBox" @mousedown="testMouseDown" @mousewheel="testMouseWheel" @dblclick="goToOrigin">-->
    <div class="move" id="MapBox" @mousedown="testMouseDown" @mousewheel="testMouseWheel" @dblclick="goToOrigin">
      <div class="move__body" id="MapTestBody">
        <div class="bg">
          <div class="bg__body"></div>
        </div>
        <!--<div class="line">-->
        <!--<div class="line__0"></div>-->
        <!--<div class="line__1"></div>-->
        <!--<div class="line__2"></div>-->
        <!--<div class="line__3"></div>-->
        <!--<div class="line__4"></div>-->
        <!--</div>-->
        <div class="inner-race">
          <svg class="inner-race__body" id="innerRace"></svg>
        </div>
        <div class="inner-circle">
          <svg class="inner-circle__body" id="innerCircle"></svg>
        </div>
        <div class="outer-circle">
          <svg class="outer-circle__body" id="outerCircle" ref="outerCircle"></svg>
        </div>

        <!--  这一块儿的结构相对统一，但是暂时不想把他们合并在一起 -->
        <!-- 左上位置 left top  (-x, -y) -->
        <div class="group" :class="['group-' + index, item.selected && 'group--active']"
             v-for="(item, index) in groupData" :key="index">
          <div class="box"
               v-for="(subitem, i) in item.data" :key="i"
               :class="{'box--active': subitem.selected}"
               :style="{'top': subitem.yaxis + 'px', 'left': subitem.xaxis + 'px'}">
            <!--levelHot === 2-->
            <div class="box__body box__body--lvl0"
                 v-show="subitem.active"
                 :class="{'box__body--active': subitem.selected,
                 'box__body--lvl0': subitem.indexLevel === 0,
                 'box__body--lvl1': subitem.indexLevel === 1,
                 'box__body--lvl2': subitem.indexLevel === 2}"
                 @click="handlerIndicatorIntro(index, i, subitem)">
              <!--:class="{'box__body&#45;&#45;active': subitem.active || levelHot === subitem.indexLevel,-->
              <!--'box__body&#45;&#45;lvl0': subitem.indexLevel === 0,-->
              <!--'box__body&#45;&#45;lvl1': subitem.indexLevel === 1,-->
              <!--'box__body&#45;&#45;lvl2': subitem.indexLevel === 2}"-->
              <div class="box__text" :title="subitem.name">
                {{$formattingText(subitem.name)}}
              </div>
              <div class="annotation" v-if="subitem.selected">
                <div class="annotation__dot dot" ref="annotationActive">
                  <span class="dot__point"></span>
                  <span class="dot__circle"></span>
                  <span class="dot__circle"></span>
                  <span class="dot__circle"></span>
                  <span class="dot__circle"></span>
                </div>
                <div class="annotation__line line">
                  <div class="line__diagonal">
                    <div class="line__diagonal--animate"></div>
                  </div>
                  <div class="line__horizontal">
                    <div class="line__horizontal--animate"></div>
                  </div>
                </div>
                <div class="annotation__animate animated" :class="{'fadeIn': subitem.selected, 'fadeOut': !subitem.selected}">
                  <!--<div class="annotation__content dict"
                  @mousedown="$event.stopPropagation()"
                  @click="$event.preventDefault();$event.stopPropagation();">-->
                  <div class="annotation__content dict" @click="$event.preventDefault();$event.stopPropagation();">
                    <div class="dict__dot"></div>
                    <div class="dict__header">
                      <div class="dict__title" :title="subitem.name">{{subitem.name}}</div>
                      <!--  @mousedown="$event.preventDefault();$event.stopPropagation();" -->
                      <!--  @dblclick="$event.preventDefault();$event.stopPropagation();" -->
                      <div class="dict__icon dict__icon--close"
                           @click="handlerClose(index, i, subitem)"></div>
                    </div>
                    <div class="dict__body">
                      <dl class="dl-horizontal dl-horizontal--info">
                        <dt>父指标名称：</dt>
                        <dd>
                          <span class="dl-horizontal__name" :title="'--'">{{'--'}}</span>
                          <span class="dl-horizontal__right">Owner：{{subitem.owner}}</span></dd>
                        <dt>是否 KPI 指标：</dt>
                        <dd>
                          <div class="radio radio--prevent" :class="{'radio--active': subitem.iskpi}">
                            <span class="radio__outer">
                              <span class="radio__inner"></span>
                            </span>
                            <span class="radio__label">是</span>
                          </div>
                          <div class="radio radio--prevent" :class="{'radio--active': !subitem.iskpi}">
                            <span class="radio__outer">
                              <span class="radio__inner"></span>
                            </span>
                            <span class="radio__label">否</span>
                          </div>
                        </dd>
                        <dt>指标状态：</dt>
                        <dd>{{subitem.isused ? '在用' : '不在用'}}</dd>
                        <dt>指标定义：</dt>
                        <dd>{{subitem.conception || '--'}}</dd>
                        <dt>指标公式：</dt>
                        <dd>{{subitem.logicFormula || '--'}}</dd>
                        <dt>指标口径：</dt>
                        <dd>--</dd>
                      </dl>
                      <div class="dict__detail">
                        <div class="dict__button" @click="getIndicatorDetail(index, i, subitem)">查看详情</div>
                      </div>
                    </div>
                    <div class="dict__footer">
                      <div class="dict__left">
                        <div class="dict__button dict__button--none" >
                          <i class="dict__icon dict__icon--like"
                             @click="handlerLike(subitem)"
                             :class="{'dict__icon--active': subitem.thumbUpSingle === 1}"></i>
                          <span class="dict__number">{{subitem.thumbUpTot || 0}} 人赞过</span>
                        </div>
                      </div>
                      <div class="dict__right">
                        <div class="dict__button dict__button--none">
                          <i class="dict__icon dict__icon--star"
                             @click="handlerStar(subitem)"
                             :class="{'dict__icon--active': subitem.focusSingle === 1}"></i>
                          <span class="dict__number">{{subitem.focusTot || 0}} 人关注</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<div @click="goToPosition">Position</div>-->
  </div>
</template>

<script>
// import Drag from 'draggabilly'
import TWEEN from 'tween.js'
import Snap from 'snapsvg'
// import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'
import { mapState } from 'vuex'
import { apiStar, apiLike, apiMessages, apiChannels, apiRankIndicator, apiRankTable, apiIndicatorTable, apiSearch, apiSearchNotLoading } from './server/api'
let position = { x: 0, y: 0, scale: 1 }
let initMove = (x, y, scale) => {
  let tween = new TWEEN.Tween(position)
    .to({ x: x, y: y, scale: scale }, 800)
    .delay(18)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate(update)
  tween.start()
}
let update = () => {
  let MapTestBody = document.querySelector('#MapTestBody')
  let MapTestBodyStyle = getComputedStyle(MapTestBody)
  let MapTestBodyStyleTransform = MapTestBodyStyle.transform.replace('matrix(', '').replace(')', '').split(',')
  MapTestBodyStyleTransform[0] = position.scale
  MapTestBodyStyleTransform[3] = position.scale
  MapTestBodyStyleTransform[4] = position.x
  MapTestBodyStyleTransform[5] = position.y
  MapTestBody.style.setProperty('transform', 'matrix(' + MapTestBodyStyleTransform.join(',') + ')')
}
let animate = (time) => {
  let id = requestAnimationFrame(animate)
  let result = TWEEN.update(time)
  if (!result) {
    cancelAnimationFrame(id)
  }
}
let $formattingText = (text) => {
  if (text && text.length >= 8) {
    return text.slice(0, 8) + '...'
  } else {
    return text
  }
}
/* =======================================
 * @Author: Toweave (lizi)
 * @Blog: http://www.toweave.com/
 * @Date: 2018/12/20 10:10
 * @Description: 圆弧弧度计算
 * @Params: p3Angle -> 圆弧占比角度
 * @Params: p3Rotate -> 圆弧旋转角度
 * ======================================== */
const COLOR = {
  '$white': '#ffffff',
  '$group0': '#fa04fb',
  '$group1': '#4474f9',
  '$group2': '#00cb65',
  '$group3': '#ef8a26',
  '$group4': '#d95e5e'
}
let drawInnerRace = (angles, p0Angle = 90, p0Rotate = 0, p1Angle = 90, p1Rotate = 90, p2Angle = 90, p2Rotate = 180, p3Angle = 90, p3Rotate = 270) => {
  const svg = Snap('#innerRace')
  // 圆弧一： 设置一定的偏移量
  p0Angle = p0Angle && p0Angle - 2
  p0Rotate = p0Rotate && p0Rotate + 1
  // 绘制环形路径及环形旋转角度
  let innerRace0 = null
  let innerRaceText0 = null
  let p0RotateFlag = (p0Angle <= 180) ? 0 : 1
  let p0AngleRadian = p0Angle * Math.PI / 180
  let p0AngleCos = Math.cos(p0AngleRadian)
  let p0AngleSin = Math.sin(p0AngleRadian)
  let p0RotateRadian = p0Rotate * Math.PI / 180
  let p0RotateCos = Math.cos(p0RotateRadian)
  let p0RotateSin = Math.sin(p0RotateRadian)
  let p0RotateSinNegation = -p0RotateSin
  let p0x = 117 - 92 * p0AngleCos
  let p0y = 117 - 92 * p0AngleSin
  innerRace0 = svg.paper.path(`M 25, 117 h 0 v 0 A 92, 92 0 ${p0RotateFlag}, 1 ${p0x}, ${p0y}`)
  innerRace0.attr({
    fill: 'transparent',
    stroke: COLOR.$group0,
    strokeWidth: 48,
    'transform-origin': 'center center',
    // cosθ，-sinθ, sinθ, cosθ,
    transform: `matrix(${p0RotateCos}, ${p0RotateSin}, ${p0RotateSinNegation}, ${p0RotateCos}, 0, 0)`
  })
  // 绘制文字路径及文字
  let p0xText = 117 - 82 * p0AngleCos
  let p0yText = 117 - 82 * p0AngleSin
  innerRaceText0 = svg.paper.path(`M 35, 117 h 0 v 0 A 82, 82 0 ${p0RotateFlag}, 1 ${p0xText}, ${p0yText}`)
  innerRaceText0.attr({
    fill: 'transparent',
    stroke: COLOR.$white,
    strokeWidth: 0,
    'transform-origin': 'center center',
    transform: `matrix(${p0RotateCos}, ${p0RotateSin}, ${p0RotateSinNegation}, ${p0RotateCos}, 0, 0)`
  })
  let p0xTextPosition = 262 * p0Angle / 360
  innerRaceText0 = svg.paper.text(p0xTextPosition, 0, angles[0].name).attr({
    fill: COLOR.$white,
    stroke: 'transparent',
    fontSize: 20,
    textAnchor: 'middle',
    textpath: innerRaceText0
  })
  // 圆弧二
  p1Angle = p1Angle && p1Angle - 2
  p1Rotate = p1Rotate && p1Rotate + 1
  let innerRace1 = null
  let innerRaceText1 = null
  let p1RotateFlag = (p1Angle <= 180) ? 0 : 1
  let p1AngleRadian = p1Angle * Math.PI / 180
  let p1AngleCos = Math.cos(p1AngleRadian)
  let p1AngleSin = Math.sin(p1AngleRadian)
  let p1RotateRadian = p1Rotate * Math.PI / 180
  let p1RotateCos = Math.cos(p1RotateRadian)
  let p1RotateSin = Math.sin(p1RotateRadian)
  let p1RotateSinNegation = -p1RotateSin
  let p1x = 117 - 92 * p1AngleCos
  let p1y = 117 - 92 * p1AngleSin
  innerRace1 = svg.paper.path(`M 25, 117 h 0 v 0 A 92, 92 0 ${p1RotateFlag}, 1 ${p1x}, ${p1y}`)
  innerRace1.attr({
    fill: 'transparent',
    stroke: COLOR.$group1,
    strokeWidth: 48,
    'transform-origin': 'center center',
    transform: `matrix(${p1RotateCos}, ${p1RotateSin}, ${p1RotateSinNegation}, ${p1RotateCos}, 0, 0)`
  })
  // 绘制文字路径及文字
  let p1xText = 117 - 82 * p1AngleCos
  let p1yText = 117 - 82 * p1AngleSin
  innerRaceText1 = svg.paper.path(`M 35, 117 h 0 v 0 A 82, 82 0 ${p1RotateFlag}, 1 ${p1xText}, ${p1yText}`)
  innerRaceText1.attr({
    fill: 'transparent',
    stroke: COLOR.$group1,
    strokeWidth: 0,
    'transform-origin': 'center center',
    transform: `matrix(${p1RotateCos}, ${p1RotateSin}, ${p1RotateSinNegation}, ${p1RotateCos}, 0, 0)`
  })
  let p1xTextPosition = 262 * p1Angle / 360
  innerRaceText1 = svg.paper.text(p1xTextPosition, 0, angles[1].name).attr({
    fill: COLOR.$white,
    stroke: 'transparent',
    fontSize: 20,
    textAnchor: 'middle',
    textpath: innerRaceText1
  })
  // 圆弧三
  p2Angle = p2Angle && p2Angle - 2
  p2Rotate = p2Rotate && p2Rotate + 1
  let innerRace2 = null
  let innerRaceText2 = null
  let p2RotateFlag = (p2Angle <= 180) ? 0 : 1
  let p2AngleRadian = p2Angle * Math.PI / 180
  let p2AngleCos = Math.cos(p2AngleRadian)
  let p2AngleSin = Math.sin(p2AngleRadian)
  let p2RotateRadian = p2Rotate * Math.PI / 180
  let p2RotateCos = Math.cos(p2RotateRadian)
  let p2RotateSin = Math.sin(p2RotateRadian)
  let p2RotateSinNegation = -p2RotateSin
  let p2x = 117 - 92 * p2AngleCos
  let p2y = 117 - 92 * p2AngleSin
  innerRace2 = svg.paper.path(`M 25, 117 h 0 v 0 A 92, 92 0 ${p2RotateFlag}, 1 ${p2x}, ${p2y}`)
  innerRace2.attr({
    fill: 'transparent',
    stroke: COLOR.$group2,
    strokeWidth: 48,
    'transform-origin': 'center center',
    transform: `matrix(${p2RotateCos}, ${p2RotateSin}, ${p2RotateSinNegation}, ${p2RotateCos}, 0, 0)`
  })
  // 绘制文字路径及文字
  let p2xText = 117 - 82 * p2AngleCos
  let p2yText = 117 - 82 * p2AngleSin
  innerRaceText2 = svg.paper.path(`M 35, 117 h 0 v 0 A 82, 82 0 ${p2RotateFlag}, 1 ${p2xText}, ${p2yText}`)
  innerRaceText2.attr({
    fill: 'transparent',
    stroke: COLOR.$group2,
    strokeWidth: 0,
    'transform-origin': 'center center',
    transform: `matrix(${p2RotateCos}, ${p2RotateSin}, ${p2RotateSinNegation}, ${p2RotateCos}, 0, 0)`
  })
  let p2xTextPosition = 262 * p2Angle / 360
  innerRaceText2 = svg.paper.text(p2xTextPosition, 0, angles[2].name).attr({
    fill: COLOR.$white,
    stroke: 'transparent',
    fontSize: 20,
    textAnchor: 'middle',
    textpath: innerRaceText2
  })
  // 圆弧四
  p3Angle = p3Angle && p3Angle - 2
  p3Rotate = p3Rotate && p3Rotate + 1
  let innerRace3 = null
  let innerRaceText3 = null
  let p3RotateFlag = (p3Angle <= 180) ? 0 : 1
  let p3AngleRadian = p3Angle * Math.PI / 180
  let p3AngleCos = Math.cos(p3AngleRadian)
  let p3AngleSin = Math.sin(p3AngleRadian)
  let p3RotateRadian = p3Rotate * Math.PI / 180
  let p3RotateCos = Math.cos(p3RotateRadian)
  let p3RotateSin = Math.sin(p3RotateRadian)
  let p3RotateSinNegation = -p3RotateSin
  let p3x = 117 - 92 * p3AngleCos
  let p3y = 117 - 92 * p3AngleSin
  innerRace3 = svg.paper.path(`M 25, 117 h 0 v 0 A 92, 92 0 ${p3RotateFlag}, 1 ${p3x}, ${p3y}`)
  innerRace3.attr({
    fill: 'transparent',
    stroke: COLOR.$group3,
    strokeWidth: 48,
    'transform-origin': 'center center',
    transform: `matrix(${p3RotateCos}, ${p3RotateSin}, ${p3RotateSinNegation}, ${p3RotateCos}, 0, 0)`
  })
  // 绘制文字路径及文字
  let p3xText = 117 - 82 * p3AngleCos
  let p3yText = 117 - 82 * p3AngleSin
  innerRaceText3 = svg.paper.path(`M 35, 117 h 0 v 0 A 82, 82 0 ${p3RotateFlag}, 1 ${p3xText}, ${p3yText}`)
  innerRaceText3.attr({
    fill: 'transparent',
    stroke: COLOR.$group3,
    strokeWidth: 0,
    'transform-origin': 'center center',
    transform: `matrix(${p3RotateCos}, ${p3RotateSin}, ${p3RotateSinNegation}, ${p3RotateCos}, 0, 0)`
  })
  let p3xTextPosition = 262 * p3Angle / 360
  innerRaceText3 = svg.paper.text(p3xTextPosition, 0, angles[3].name).attr({
    fill: COLOR.$white,
    stroke: 'transparent',
    fontSize: 20,
    textAnchor: 'middle',
    textpath: innerRaceText3
  })
}
let drawInnerCircle = (p0Angle = 90, p0Rotate = 0, p1Angle = 90, p1Rotate = 90, p2Angle = 90, p2Rotate = 180, p3Angle = 90, p3Rotate = 270) => {
  const svg = Snap('#innerCircle')
  let innerCircle = null
  // 圆弧一
  p0Angle = p0Angle && p0Angle - 4
  p0Rotate = p0Rotate && p0Rotate + 2
  let p0RotateFlag = (p0Angle <= 180) ? 0 : 1
  let p0AngleRadian = p0Angle * Math.PI / 180
  let p0AngleCos = Math.cos(p0AngleRadian)
  let p0AngleSin = Math.sin(p0AngleRadian)
  let p0RotateRadian = p0Rotate * Math.PI / 180
  let p0RotateCos = Math.cos(p0RotateRadian)
  let p0RotateSin = Math.sin(p0RotateRadian)
  let p0RotateSinNegation = -p0RotateSin
  let p0x = 240 - 236 * p0AngleCos
  let p0y = 240 - 236 * p0AngleSin
  innerCircle = svg.paper.path(`M 4, 240 h 0 v 0 A 236, 236 0 ${p0RotateFlag}, 1 ${p0x}, ${p0y}`)
  innerCircle.attr({
    fill: 'transparent',
    stroke: COLOR.$group0,
    strokeWidth: 8,
    'transform-origin': 'center center',
    // cosθ，-sinθ, sinθ, cosθ,
    transform: `matrix(${p0RotateCos}, ${p0RotateSin}, ${p0RotateSinNegation}, ${p0RotateCos}, 0, 0)`
  })
  // 圆弧二
  p1Angle = p1Angle && p1Angle - 4
  p1Rotate = p1Rotate && p1Rotate + 2
  let p1RotateFlag = (p1Angle <= 180) ? 0 : 1
  let p1AngleRadian = p1Angle * Math.PI / 180
  let p1AngleCos = Math.cos(p1AngleRadian)
  let p1AngleSin = Math.sin(p1AngleRadian)
  let p1RotateRadian = p1Rotate * Math.PI / 180
  let p1RotateCos = Math.cos(p1RotateRadian)
  let p1RotateSin = Math.sin(p1RotateRadian)
  let p1RotateSinNegation = -p1RotateSin
  let p1x = 240 - 236 * p1AngleCos
  let p1y = 240 - 236 * p1AngleSin
  innerCircle = svg.paper.path(`M 4, 240 h 0 v 0 A 236, 236 0 ${p1RotateFlag}, 1 ${p1x}, ${p1y}`)
  innerCircle.attr({
    fill: 'transparent',
    stroke: COLOR.$group1,
    strokeWidth: 8,
    'transform-origin': 'center center',
    transform: `matrix(${p1RotateCos}, ${p1RotateSin}, ${p1RotateSinNegation}, ${p1RotateCos}, 0, 0)`
  })
  // 圆弧三
  p2Angle = p2Angle && p2Angle - 4
  p2Rotate = p2Rotate && p2Rotate + 2
  let p2RotateFlag = (p2Angle <= 180) ? 0 : 1
  let p2AngleRadian = p2Angle * Math.PI / 180
  let p2AngleCos = Math.cos(p2AngleRadian)
  let p2AngleSin = Math.sin(p2AngleRadian)
  let p2RotateRadian = p2Rotate * Math.PI / 180
  let p2RotateCos = Math.cos(p2RotateRadian)
  let p2RotateSin = Math.sin(p2RotateRadian)
  let p2RotateSinNegation = -p2RotateSin
  let p2x = 240 - 236 * p2AngleCos
  let p2y = 240 - 236 * p2AngleSin
  innerCircle = svg.paper.path(`M 4, 240 h 0 v 0 A 236, 236 0 ${p2RotateFlag}, 1 ${p2x}, ${p2y}`)
  innerCircle.attr({
    fill: 'transparent',
    stroke: COLOR.$group2,
    strokeWidth: 8,
    'transform-origin': 'center center',
    transform: `matrix(${p2RotateCos}, ${p2RotateSin}, ${p2RotateSinNegation}, ${p2RotateCos}, 0, 0)`
  })

  // 圆弧四
  p3Angle = p3Angle && p3Angle - 4
  p3Rotate = p3Rotate && p3Rotate + 2
  let p3RotateFlag = (p3Angle <= 180) ? 0 : 1
  let p3AngleRadian = p3Angle * Math.PI / 180
  let p3AngleCos = Math.cos(p3AngleRadian)
  let p3AngleSin = Math.sin(p3AngleRadian)
  let p3RotateRadian = p3Rotate * Math.PI / 180
  let p3RotateCos = Math.cos(p3RotateRadian)
  let p3RotateSin = Math.sin(p3RotateRadian)
  let p3RotateSinNegation = -p3RotateSin
  let p3x = 240 - 236 * p3AngleCos
  let p3y = 240 - 236 * p3AngleSin
  innerCircle = svg.paper.path(`M 4, 240 h 0 v 0 A 236, 236 0 ${p3RotateFlag}, 1 ${p3x}, ${p3y}`)
  innerCircle.attr({
    fill: 'transparent',
    stroke: COLOR.$group3,
    strokeWidth: 8,
    'transform-origin': 'center center',
    transform: `matrix(${p3RotateCos}, ${p3RotateSin}, ${p3RotateSinNegation}, ${p3RotateCos}, 0, 0)`
  })
}
let drawOuterCircle = (maxWidth = 400, p0Angle = 90, p0Rotate = 0, p1Angle = 90, p1Rotate = 90, p2Angle = 90, p2Rotate = 180, p3Angle = 90, p3Rotate = 270) => {
  const svg = Snap('#outerCircle')
  let circleWidth = maxWidth - 2
  let innerCircle = null
  // 圆弧一
  p0Angle = p0Angle && p0Angle - 4
  p0Rotate = p0Rotate && p0Rotate + 2
  let p0RotateFlag = (p0Angle <= 180) ? 0 : 1
  let p0AngleRadian = p0Angle * Math.PI / 180
  let p0AngleCos = Math.cos(p0AngleRadian)
  let p0AngleSin = Math.sin(p0AngleRadian)
  let p0RotateRadian = p0Rotate * Math.PI / 180
  let p0RotateCos = Math.cos(p0RotateRadian)
  let p0RotateSin = Math.sin(p0RotateRadian)
  let p0RotateSinNegation = -p0RotateSin
  let p0x = maxWidth - circleWidth * p0AngleCos
  let p0y = maxWidth - circleWidth * p0AngleSin
  innerCircle = svg.paper.path(`M 2, ${maxWidth} h 0 v 0 A ${circleWidth}, ${circleWidth} 0 ${p0RotateFlag}, 1 ${p0x}, ${p0y}`)
  innerCircle.attr({
    fill: 'transparent',
    stroke: COLOR.$group0,
    strokeWidth: 2,
    'transform-origin': 'center center',
    // cosθ，-sinθ, sinθ, cosθ,
    transform: `matrix(${p0RotateCos}, ${p0RotateSin}, ${p0RotateSinNegation}, ${p0RotateCos}, 0, 0)`
  })
  // 圆弧二
  p1Angle = p1Angle && p1Angle - 4
  p1Rotate = p1Rotate && p1Rotate + 2
  let p1RotateFlag = (p1Angle <= 180) ? 0 : 1
  let p1AngleRadian = p1Angle * Math.PI / 180
  let p1AngleCos = Math.cos(p1AngleRadian)
  let p1AngleSin = Math.sin(p1AngleRadian)
  let p1RotateRadian = p1Rotate * Math.PI / 180
  let p1RotateCos = Math.cos(p1RotateRadian)
  let p1RotateSin = Math.sin(p1RotateRadian)
  let p1RotateSinNegation = -p1RotateSin
  let p1x = maxWidth - circleWidth * p1AngleCos
  let p1y = maxWidth - circleWidth * p1AngleSin
  innerCircle = svg.paper.path(`M 2, ${circleWidth} h 0 v 0 A ${circleWidth}, ${circleWidth} 0 ${p1RotateFlag}, 1 ${p1x}, ${p1y}`)
  innerCircle.attr({
    fill: 'transparent',
    stroke: COLOR.$group1,
    strokeWidth: 2,
    'transform-origin': 'center center',
    transform: `matrix(${p1RotateCos}, ${p1RotateSin}, ${p1RotateSinNegation}, ${p1RotateCos}, 0, 0)`
  })
  // 圆弧三
  p2Angle = p2Angle && p2Angle - 4
  p2Rotate = p2Rotate && p2Rotate + 2
  let p2RotateFlag = (p2Angle <= 180) ? 0 : 1
  let p2AngleRadian = p2Angle * Math.PI / 180
  let p2AngleCos = Math.cos(p2AngleRadian)
  let p2AngleSin = Math.sin(p2AngleRadian)
  let p2RotateRadian = p2Rotate * Math.PI / 180
  let p2RotateCos = Math.cos(p2RotateRadian)
  let p2RotateSin = Math.sin(p2RotateRadian)
  let p2RotateSinNegation = -p2RotateSin
  let p2x = maxWidth - circleWidth * p2AngleCos
  let p2y = maxWidth - circleWidth * p2AngleSin
  innerCircle = svg.paper.path(`M 2, ${circleWidth} h 0 v 0 A ${circleWidth}, ${circleWidth} 0 ${p2RotateFlag}, 1 ${p2x}, ${p2y}`)
  innerCircle.attr({
    fill: 'transparent',
    stroke: COLOR.$group2,
    strokeWidth: 2,
    'transform-origin': 'center center',
    transform: `matrix(${p2RotateCos}, ${p2RotateSin}, ${p2RotateSinNegation}, ${p2RotateCos}, 0, 0)`
  })

  // 圆弧四
  p3Angle = p3Angle && p3Angle - 4
  p3Rotate = p3Rotate && p3Rotate + 2
  let p3RotateFlag = (p3Angle <= 180) ? 0 : 1
  let p3AngleRadian = p3Angle * Math.PI / 180
  let p3AngleCos = Math.cos(p3AngleRadian)
  let p3AngleSin = Math.sin(p3AngleRadian)
  let p3RotateRadian = p3Rotate * Math.PI / 180
  let p3RotateCos = Math.cos(p3RotateRadian)
  let p3RotateSin = Math.sin(p3RotateRadian)
  let p3RotateSinNegation = -p3RotateSin
  let p3x = 1000 - 998 * p3AngleCos
  let p3y = 1000 - 998 * p3AngleSin
  innerCircle = svg.paper.path(`M 2, 1000 h 0 v 0 A 998, 998 0 ${p3RotateFlag}, 1 ${p3x}, ${p3y}`)
  innerCircle.attr({
    fill: 'transparent',
    stroke: COLOR.$group3,
    strokeWidth: 2,
    'transform-origin': 'center center',
    transform: `matrix(${p3RotateCos}, ${p3RotateSin}, ${p3RotateSinNegation}, ${p3RotateCos}, 0, 0)`
  })
}
export default {
  name: 'MapIndex',
  mixins: [],
  components: {},
  computed: mapState({
    userName: state => state.userName,
    userInfo: state => state.userInfo,
    baseURL: state => state.baseURL
  }),
  data () {
    return {
      msg: 'Welcome to MapIndex',
      // userName: 'sunhuajian',
      wheelData: 1,
      viewWidth: 0,
      viewHeight: 0,
      isClick: false,
      activePull: false,
      activeScroll: true,
      tempActiveIndicator: false,
      tempActiveIndicatorTimer: false,
      tempIndicatorDetail: null,
      tempIndicatorTable: [],
      tempIndicatorCase: 0,
      keywords: null,
      showSearchResult: false,
      searchResultStatus: 0,
      searchResult: [],
      groupOperation: [
        { name: '渠道', icon: 'operation__icon--channel', boolean: false },
        { name: '热度', icon: 'operation__icon--hot', boolean: false },
        { name: '一周热点', icon: 'operation__icon--list', boolean: false },
        { name: '消息', icon: 'operation__icon--msg', boolean: false }],
      groupChannel: null,
      rankTypes: [{ name: '指标', boolean: true }, { name: '报表', boolean: false }],
      rankIndicatorList: [],
      levelHot: null, // 0: 低， 1: 中, 2: 高
      messagesLimit3: null,
      showUserMenu: false,
      maxWidth: 0,
      groupData: [],
      exFresh: [],
      newRetail: [],
      cloudElephant: []
    }
  },
  methods: {
    resetBackground () {
      let resizeMethod = () => {
        window.requestAnimationFrame(() => {
          this.viewWidth = document.body.offsetWidth + 'px'
          this.viewHeight = document.body.offsetHeight + 'px'
        })
      }
      resizeMethod()
      window.addEventListener('resize', resizeMethod, true)
    },
    $formattingText: $formattingText,
    testMouseWheel ($event) {
      if (this.activeScroll) {
        let event = $event || window.event
        if (event.wheelDelta < 0) {
          this.wheelData -= 0.1
          this.wheelData = Math.max(this.wheelData, 0.3)
        } else {
          this.wheelData += 0.1
          this.wheelData = Math.min(this.wheelData, 3)
        }
        let MapTestBody = document.querySelector('#MapTestBody')
        let MapTestBodyStyle = getComputedStyle(MapTestBody)
        let MapTestBodyStyleTransform = MapTestBodyStyle.transform.replace('matrix(', '').replace(')', '').split(',')
        MapTestBodyStyleTransform[0] = this.wheelData
        MapTestBodyStyleTransform[3] = this.wheelData
        MapTestBody.style.setProperty('transform', 'matrix(' + MapTestBodyStyleTransform.join(',') + ')')
      }
    },
    testMouseDown ($event) {
      let start = new Date()
      let MapBox = document.querySelector('#MapBox')
      let MapTestBody = document.querySelector('#MapTestBody')
      let MapTestBodyStyle = getComputedStyle(MapTestBody)
      let MapTestBodyStyleTransform = MapTestBodyStyle.transform.replace('matrix(', '').replace(')', '').split(',')
      // 浏览器默认当鼠标移动时，滚动条也会跟着动，所以要阻止默认事件
      let event = $event || window.event
      event.preventDefault()
      event.stopPropagation()
      // 元素在坐标系中的起始位置 ( xOrigin, yOrigin )
      let xOrigin = Number(MapTestBodyStyleTransform[4])
      let yOrigin = Number(MapTestBodyStyleTransform[5])
      let x = 0
      let y = 0
      // x, y 轴鼠标位移距离
      let xD = 0
      let yD = 0
      MapBox.onmousemove = ($e) => {
        let e = $e || window.event
        // 阻止默认事件
        e.preventDefault()
        xD = e.clientX - event.clientX
        yD = e.clientY - event.clientY
        x = xD + xOrigin
        y = yD + yOrigin
        // 临界值判断，当元素超出窗口大小时，把元素位置定在窗口的最小/最大值
        x = Math.max(x, -this.maxWidth)
        x = Math.min(x, this.maxWidth)
        y = Math.max(y, -this.maxWidth)
        y = Math.min(y, this.maxWidth)
        MapTestBodyStyleTransform[4] = x
        MapTestBodyStyleTransform[5] = y
        MapTestBody.style.setProperty('transform', 'matrix(' + MapTestBodyStyleTransform.join(',') + ')')
      }
      document.onmouseup = () => {
        MapBox.onmousemove = null
        let end = new Date()
        // 判断点击在子元素的事件是否是单击事件
        this.isClick = end - start < 200 && (xD === 0 && yD === 0)
        // if ((x === 600 || x === -600) && (y === 600 || y === -600)) {
        //   return
        // }
        if (end - start < 500 && (Math.abs(xD) > 50 || Math.abs(yD) > 50)) {
          let xF = Math.floor(x + xD / 6)
          let yF = Math.floor(y + yD / 6)
          // 当前位置
          position.scale = MapTestBodyStyleTransform[0]
          position.x = x
          position.y = y
          // 目标位置
          initMove(xF, yF, MapTestBodyStyleTransform[0])
          animate()
        }
      }
    },
    goToPosition (xAxis = 0, yAxis = 0) {
      // let x = $event.x - ( 1280 / 2)
      // let y = $event.y - ( 720 / 2 + 80)
      // this.wheelData = 1
      let x = xAxis + 136
      let y = yAxis + 73
      // 目标位置
      let MapTestBody = document.querySelector('#MapTestBody')
      let MapTestBodyStyle = getComputedStyle(MapTestBody)
      let MapTestBodyStyleTransform = MapTestBodyStyle.transform.replace('matrix(', '').replace(')', '').split(',')
      // 元素在坐标系中的起始位置 ( xOrigin, yOrigin )
      position.scale = Number(MapTestBodyStyleTransform[0])
      position.x = Number(MapTestBodyStyleTransform[4])
      position.y = Number(MapTestBodyStyleTransform[5])
      initMove(-x, -y, this.wheelData)
      animate()
    },
    goToOrigin () {
      // let x = $event.x - ( 1280 / 2)
      // let y = $event.y - ( 720 / 2 + 80)
      // 判断点击在子元素的事件是否是单击事件
      this.wheelData = 1
      this.isClick = false
      let MapTestBody = document.querySelector('#MapTestBody')
      let MapTestBodyStyle = getComputedStyle(MapTestBody)
      let MapTestBodyStyleTransform = MapTestBodyStyle.transform.replace('matrix(', '').replace(')', '').split(',')
      // 元素在坐标系中的起始位置 ( xOrigin, yOrigin )
      position.scale = Number(MapTestBodyStyleTransform[0])
      position.x = Number(MapTestBodyStyleTransform[4])
      position.y = Number(MapTestBodyStyleTransform[5])
      initMove(0, 0, 1)
      animate()
    },
    goToStatus (status) {
      switch (status) {
        case 0:
          this.$router.push({ path: '/message' })
          break
        case 1:
          this.$router.push({ path: '/star' })
          break
        default:
          this.$router.push({ path: '/' })
      }
    },
    handlerIndicatorIntro (index, i, item) {
      setTimeout(() => {
        if (this.isClick) {
          this.tempActiveIndicator = false
          // setTimeout 时间会叠加
          setTimeout(() => { this.tempActiveIndicatorTimer = false }, 500)
          // 移动到指定位置
          this.goToPosition(item.xaxis, item.yaxis)
          this.groupData = this.resetSelectedGroupData(this.groupData)
          this.groupData[index].selected = true
          this.groupData[index].data[i].selected = true
          this.activeScroll = false
        }
      }, 250)
    },
    handlerClose (index, i, item) {
      this.activeScroll = true
      this.groupData[index].selected = false
      this.groupData[index].data[i].selected = false
    },
    getIndicatorDetail (index, i, item) {
      this.tempIndicatorCase = 0
      this.tempActiveIndicator = true
      this.tempActiveIndicatorTimer = true
      this.tempIndicatorDetail = item
      setTimeout(() => {
        this.activeScroll = true
        this.groupData[index].selected = false
        this.groupData[index].data[i].selected = false
      }, 250)
    },
    handlerIndicatorDetail () {
      this.tempActiveIndicator = false
      setTimeout(() => {
        this.tempActiveIndicatorTimer = false
      }, 600)
    },
    handlerOperation (index) {
      this.groupOperation.forEach((item, i) => {
        if (index !== i) {
          item.boolean = false
        }
      })
      this.groupOperation[index].boolean = !this.groupOperation[index].boolean
      if (this.groupOperation[index].boolean) {
        switch (index) {
          case 0: // 渠道
            break
          case 1: // 热度
            break
          case 2: // 一周热点
            if (this.rankTypes[0].boolean === true) {
              this.reqRankIndicator()
            } else {
              this.reqRankTable()
            }
            break
          case 3: // 消息
            this.reqMessages()
            break
        }
      }
      if (!this.groupOperation[0].boolean && !this.groupOperation[1].boolean) {
        this.groupData = this.resetActiveGroupData(this.groupData)
      }
    },
    closeOperationChannel () {
      this.groupOperation[0].boolean = false
      this.groupData = this.resetActiveGroupData(this.groupData)
    },
    handlerSubitem (index, i) {
      this.groupChannel = this.tidyGroupChannel(this.groupChannel)
      this.groupChannel[index].selected = true
      this.groupChannel[index].children[i].selected = true
    },
    handlerActiveSubitem ($event, index, i) {
      this.groupOperation[0].boolean = false
      // this.$eventStop($event)
      this.handlerSubitem(index, i)
      this.reqChannelSearch({
        bgName: this.groupChannel[index].dimName,
        buName: this.groupChannel[index].children[i].dimName
      })
    },
    handlerChildItem (index, i, j) {
      this.groupChannel = this.tidyGroupChannel(this.groupChannel)
      this.groupChannel[index].selected = true
      this.groupChannel[index].children[i].selected = true
      this.groupChannel[index].children[i].children[j].selected = true
    },
    handlerActiveChildItem ($event, index, i, j) {
      this.groupOperation[0].boolean = false
      // this.$eventStop($event)
      this.handlerChildItem(index, i, j)
      this.reqChannelSearch({
        bgName: this.groupChannel[index].dimName,
        buName: this.groupChannel[index].children[i].dimName,
        subbuName: this.groupChannel[index].children[i].children[j].dimName
      })
    },
    reqChannels () {
      let request = apiChannels()
      request.then((res) => {
        this.groupChannel = this.tidyGroupChannel(res.bg)
      })
    },
    tidyGroupChannel (data) {
      let tidyItem = (item) => {
        if (item.children && item.children.length) {
          let temp = item.children.map((subitem) => {
            subitem.selected = false
            tidyItem(subitem)
            return subitem
          })
          return temp
        } else {
          return item
        }
      }
      if (data) {
        return data.map((item) => {
          item.selected = false
          tidyItem(item)
          return item
        })
      }
    },
    handlerLevel (index) {
      this.levelHot = index
      let count = 0
      // levelHot === subitem.indexLevel
      this.groupData.forEach((parent, index) => {
        parent.data.forEach((son, i) => {
          let boolean = this.levelHot === son.indexLevel
          son.active = boolean
          if (boolean && count === 0) {
            count++
            this.goToPosition(son.xaxis, son.yaxis)
          }
        })
      })
    },
    closeHotRank () {
      this.groupOperation[2].boolean = false
    },
    handlerRankType (index) {
      this.rankTypes.forEach((item) => {
        item.boolean = false
      })
      this.rankTypes[index].boolean = true
      if (index === 0) {
        this.reqRankIndicator()
      } else {
        this.reqRankTable()
      }
    },
    reqRankIndicator () {
      let params = {
        rankNumber: 10
      }
      let request = apiRankIndicator(params)
      request.then((res) => {
        this.rankIndicatorList = res
      })
    },
    reqRankTable () {
      let params = {
        rankNumber: 8
      }
      let request = apiRankTable(params)
      request.then((res) => {
        this.rankIndicatorList = res
      })
    },
    goToMessage () {
      this.$router.push({ path: '/message' })
    },
    reqMessages () {
      let params = {
        'user': this.userName
      }
      let request = apiMessages(params)
      request.then((res) => {
        this.messagesLimit3 = res.slice(0, 3)
      })
    },
    closeMessage () {
      this.groupOperation[3].boolean = false
    },
    goToMessageDetail (item) {
      this.$router.push({ path: '/message', query: { id: item.id } })
    },
    handlerUserMenu () {
      this.showUserMenu = !this.showUserMenu
    },
    toggleIndicator (status) {
      this.tempIndicatorCase = status
      if (status === 1) {
        this.reqIndicatorTable()
      }
    },
    reqIndicatorTable () {
      let params = {
        indexId: this.tempIndicatorDetail.id
      }
      let request = apiIndicatorTable(params)
      request.then((res) => {
        this.tempIndicatorTable = res || []
      })
    },
    handlerSearchForm () {
      let keywords = this.keywords && this.keywords.trim()
      if (keywords) {
        this.showSearchResult = true
        this.reqSearchNotLoading({ keywords })
      } else {
        // this.$store.commit({
        //   type: 'ACTIVE_ALERT',
        //   alert: {
        //     show: true,
        //     title: '提示',
        //     content: '输入不能为空，请重新输入！',
        //     buttonLeft: '确定'
        //   }
        // })
      }
    },
    goToPositionIndicator (item) {
      this.tempActiveIndicator = false
      setTimeout(() => {
        this.showSearchResult = false
        this.tempActiveIndicatorTimer = false
      }, 600)
      this.goToPosition(item.xaxis, item.yaxis)
      // item.annotation = true
      // this.$forceUpdate()
      this.groupData.forEach((parentItem, index) => {
        parentItem.selected = false
        parentItem.data.forEach((subitem, i) => {
          subitem.selected = false
          if (item.id === subitem.id) {
            parentItem.selected = true
            subitem.selected = true
          }
        })
      })
      // this.$forceUpdate()
    },
    $eventStop ($event) {
      // $event.preventDefault()
      $event.stopPropagation()
    },
    $eventBubble ($event) {
      // console.log(9999, $event)
    },
    handlerStar (item) {
      let params = {
        indexId: item.id,
        user: this.userName,
        focus: item.focusSingle === 0 ? 1 : 0
      }
      let request = apiStar(params)
      request.then((res) => {
        item.focusSingle = params.focus
        if (params.focus === 0) {
          item.focusTot--
        } else {
          item.focusTot++
        }
      })
    },
    handlerLike (item) {
      let params = {
        indexId: item.id,
        user: this.userName,
        thumbUp: item.thumbUpSingle === 0 ? 1 : 0
      }
      let request = apiLike(params)
      request.then((res) => {
        item.thumbUpSingle = params.thumbUp
        if (params.thumbUp === 0) {
          item.thumbUpTot--
        } else {
          item.thumbUpTot++
        }
      })
    },
    reqSearchNotLoading ({ ...parameter }) {
      let { id, keywords, bgName, buName, subbuName } = parameter
      let params = {
        'id': id,
        'name': keywords,
        'user': this.userName,
        'bgName': bgName,
        'buName': buName,
        'subbuName': subbuName
      }
      this.searchResultStatus = 0
      this.showSearchResult = false
      let request = apiSearchNotLoading(params)
      request.then((res) => {
        this.searchResult = this.tidySearchResult(res)
        if (this.searchResult.length === 0) {
          this.showSearchResult = true
          this.searchResultStatus = 1
        } else if (this.searchResult.length === 1) {
          /* =======================================
           * @Author: Toweave (lizi)
           * @Blog: http://www.toweave.com/
           * @Date: 2019/1/10 11:29
           * @Description: 如果只查询到一个指标就直接定位到该指标
           * ======================================== */
          this.showSearchResult = false
          this.searchResultStatus = 2
          this.goToPositionIndicator(this.searchResult[0])
        } else {
          this.showSearchResult = true
          this.searchResultStatus = 2
        }
      }, (res) => {
        this.showSearchResult = true
        this.searchResultStatus = 1
      })
    },
    tidySearchResult (data) {
      let result = []
      Object.keys(data).forEach((key) => {
        result = result.concat(data[key].data)
      })
      return result
    },
    reqChannelSearch ({ ...parameter }) {
      let { id, keywords, bgName, buName, subbuName } = parameter
      let params = {
        'id': id,
        'name': keywords,
        'user': this.userName,
        'bgName': bgName,
        'buName': buName,
        'subbuName': subbuName
      }
      let request = apiSearch(params)
      request.then((res) => {
        let tempData = []
        Object.keys(res).forEach((key) => {
          tempData.push(res[key])
        })
        this.tidyGroupDataCompare(tempData)
      })
    },
    tidyGroupDataCompare (data) {
      this.groupData.forEach((parent, index) => {
        parent.active = false
        parent.data.forEach((son, i) => {
          son.active = false
        })
      })
      data.forEach((item) => {
        this.groupData.forEach((parent, index) => {
          if (item.name === parent.name) {
            parent.active = true
            item.data.forEach((subitem) => {
              parent.data.forEach((son, i) => {
                if (subitem.id === son.id) {
                  son.active = true
                }
              })
            })
          }
        })
      })
    },
    reqSearch ({ ...parameter }) {
      let { id, keywords, bgName, buName, subbuName } = parameter
      let params = {
        'id': id,
        'name': keywords,
        'user': this.userName,
        'bgName': bgName,
        'buName': buName,
        'subbuName': subbuName
      }
      let request = apiSearch(params)
      request.then((res) => {
        let tempData = []
        Object.keys(res).forEach((key) => {
          tempData.push(res[key])
        })
        this.groupData = this.resetGroupData(tempData)
        let maxWidth = this.groupData[0].rMAX || 600
        this.maxWidth = maxWidth
        let angles = this.groupData.map((item) => {
          return {
            name: item.name,
            angle: ((item.bgRatio * 180 / Math.PI) || 0),
            boundary: ((item.circleValue * 180 / Math.PI) || 0)
          }
        })
        while (angles.length < 4) {
          angles.push({ name: '', angle: 0, boundary: 0 })
        }
        let p0Angle = angles[0].angle
        let p1Angle = angles[1].angle
        let p2Angle = angles[2].angle
        let p3Angle = angles[3].angle
        // 上一个 BG 的结束边界 是下一个 BG 的起始边界
        let p0Rotate = angles[this.groupData.length - 1].boundary
        let p1Rotate = p0Rotate + p0Angle
        let p2Rotate = p0Rotate + p0Angle + p1Angle
        let p3Rotate = p0Rotate + p0Angle + p1Angle + p2Angle
        // this.$refs.outerCircle.setAttribute('style', maxWidth + 'px')
        this.$refs.outerCircle.style.width = 2 * maxWidth + 'px'
        this.$refs.outerCircle.style.height = 2 * maxWidth + 'px'
        drawInnerRace(angles, p0Angle, p0Rotate, p1Angle, p1Rotate, p2Angle, p2Rotate, p3Angle, p3Rotate)
        drawInnerCircle(p0Angle, p0Rotate, p1Angle, p1Rotate, p2Angle, p2Rotate, p3Angle, p3Rotate)
        drawOuterCircle(maxWidth, p0Angle, p0Rotate, p1Angle, p1Rotate, p2Angle, p2Rotate, p3Angle, p3Rotate)
      })
    },
    resetActiveGroupData (data) {
      data.forEach((item, index) => {
        item.active = true
        item.data.forEach((subitem, i) => {
          subitem.active = true
        })
      })
      return data
    },
    resetSelectedGroupData (data) {
      data.forEach((item, index) => {
        item.selected = false
        item.data.forEach((subitem, i) => {
          subitem.selected = false
        })
      })
      return data
    },
    resetGroupData (data) {
      data.forEach((item, index) => {
        item.selected = false
        item.active = true
        item.data.forEach((subitem, i) => {
          subitem.selected = false
          subitem.active = true
        })
      })
      return data
    }
  },
  created () {
  },
  mounted () {
    this.resetBackground()
    // drawInnerRace()
    // drawInnerCircle()
    // drawOuterCircle()
    this.reqChannels()
    this.reqSearch()
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
    background-color: $bg;
    overflow: hidden;
  }

  .map-line {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    &__h {
      position: absolute;
      top: 0;
      left: -720px;
      width: 1440px;
      border-top: 1px dotted #999;
      transform-origin: center;
      transform: rotate(0deg);
    }

    &__v {
      position: absolute;
      top: 0;
      left: -720px;
      width: 1440px;
      border-top: 1px dotted #999;
      transform-origin: center;
      transform: rotate(90deg);
    }
  }

  .search {
    box-sizing: border-box;
    z-index: 39;
    position: absolute;
    top: 48px;
    left: 36px;
    width: 410px;
    height: 84px;
    padding: 12px;
    font-size: 16px;
    color: $white;
    background: url("../../assets/map/search-box.png") no-repeat center center;

    &__body {
      float: left;
      width: 336px;
      margin-top: 12px;
      margin-left: 28px;
    }
    &__input {
      box-sizing: border-box;
      float: left;
      width: 280px;
      height: 38px;
      margin: 0;
      padding: 0 14px;
      border: none;
      outline: none;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      color: $white;
      background-color: $btn;
      &::placeholder {
        color: $whiteLight;
      }
      &:focus {
        box-shadow: 0 0 5px 0 $btn;
      }
    }
    &__button {
      float: left;
      width: 56px;
      height: 38px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      background: $search url("../../assets/map/search.png") no-repeat center center;
      cursor: pointer;
      &:hover {
        background-color: $btnDeep;
      }
    }
  }

  .search-result {
    box-sizing: border-box;
    z-index: 30;
    position: absolute;
    top: 120px;
    left: 36px;
    width: 410px;
    height: auto;
    color: $white;
    overflow: hidden;
    &__body {
      float: left;
      width: 410px;
      height: 0;
      background: url("../../assets/map/pull-down.png") no-repeat center 0;
      overflow: hidden;
      transition: height 400ms;

      &--active {
        height: 128px;
      }
    }
    &__content {
      box-sizing: border-box;
      float: left;
      width: 300px;
      height: 100px;
      margin: 24px 0 0 54px;
      padding: 10px 10px;
      // border: 1px solid $line;
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
    }
    &__blank {
      box-sizing: border-box;
      float: left;
      width: 300px;
      height: 100px;
      margin: 24px 0 0 54px;
      line-height: 100px;
      text-align: center;
      color: $font;
      // border: 1px solid $line;
    }

    &__dot {
      opacity: 1;
      &:nth-child(1) {
      }
      &:nth-child(2) {
        animation: dotAnimate 600ms linear infinite;
      }
      &:nth-child(3) {
        animation: dotAnimate 600ms linear 300ms infinite;
      }
    }
    &__item {
      box-sizing: border-box;
      float: left;
      width: 100%;
      height: 26px;
      line-height: 26px;
      cursor: pointer;
    }
    &__name {
      float: left;
      width: 180px;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &__channel {
      float: right;
      width: 80px;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .indicator {
    box-sizing: border-box;
    z-index: 30;
    position: absolute;
    top: 131px;
    left: 36px;
    width: 410px;
    height: 473px;
    overflow: hidden;
    transition: top 400ms;

    &--top {
      top: 256px;
    }

    &__box {
      box-sizing: border-box;
      float: left;
      width: 410px;
      height: 473px;
      padding: 12px;
      color: $white;
      background: url("../../assets/map/intro.png") no-repeat center center;
    }

    &__header {
      float: left;
      width: 100%;
      margin-top: 30px;
    }

    &__toggle {
      float: left;
      width: 100%;
      margin-top: -6px;
      margin-bottom: 6px;
      font-size: 14px;
      text-align: center;
    }

    &__ghost {
      box-sizing: border-box;
      float: left;
      width: 160px;
      height: 40px;
      line-height: 38px;
      color: $line;
      border: 1px solid $line;
      // background-color: $btnDeep;
      cursor: pointer;
      &:first-child {
        // border-right: 1px solid $search;
        margin-left: 34px;
        // border-right: 1px solid $btn;
        /*border-top-left-radius: 26px;*/
        /*border-bottom-left-radius: 26px;*/
        border-right: none;
      }
      &:last-child {
      }
      &--active {
        color: $white;
      }
    }

    &__body {
      float: left;
      width: 100%;
    }

    &__footer {
      float: left;
      width: 100%;
      text-align: center;
    }

    &__button {
      display: inline-block;
      padding: 6px 22px;
      border-radius: 4px;
      font-size: 16px;
      background-color: $btn;
      cursor: pointer;
      &:hover {
        background-color: $btnDeep;
      }
    }
  }

  .dl-horizontal--result {
    box-sizing: border-box;
    float: none;
    height: 302px;
    width: 360px;
    margin-top: 6px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 6px 0 6px;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
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
      margin-top: 8px;
      width: auto;
      text-align: left;
    }
    dd {
      // max-height: 108px;
      margin-top: 8px;
      margin-left: auto;
    }

    .dl-horizontal__name {
      display: inline-block;
      max-width: 140px;
    }
    .dl-horizontal__right {
      float: right;
      margin-right: 0.5em;
    }
  }

  .indicator-table {
    box-sizing: border-box;
    float: none;
    height: 316px;
    width: 360px;
    margin-top: 6px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 6px 0 6px;
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
  }

  .avatar {
    box-sizing: border-box;
    z-index: 30;
    position: absolute;
    top: 48px;
    right: 36px;
    width: 105px;
    height: 107px;
    padding: 0;
    color: $white;
    background: url("../../assets/map/avatar.png") no-repeat center center;

    &__name {
      box-sizing: border-box;
      width: 90px;
      height: 24px;
      margin-top: 81px;
      padding: 0 4px;
      line-height: 24px;
      font-size: 12px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
    }
    &__icon {
      position: absolute;
      right: 0;
      bottom: 0;
      display: inline-block;
      width: 24px;
      height: 24px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      transform-origin: center;
      transform: rotate(0deg);
      transition: transform 200ms;

      &--pull {
        background-image: url("../../assets/map/pull.png");
      }
      &--active {
        transform: rotate(180deg);
      }
    }
    &__content {
      position: relative;
      top: 1px;
      width: 105px;
      height: 0;
      font-size: 16px;
      background: url("../../assets/map/user-menu.png") no-repeat 0 0;
      overflow: hidden;
      transition: height 400ms;
      &--active {
        height: 82px;
      }
    }
    &__item {
      width: 105px;
      height: 41px;
      line-height: 41px;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: $line;
      }
    }
  }

  .operation {
    box-sizing: border-box;
    z-index: 30;
    position: absolute;
    top: 48px;
    right: 158px;
    width: 541px;
    height: 84px;
    padding: 22px 12px 12px 12px;
    font-size: 16px;
    color: $white;
    background: url("../../assets/map/operation-box.png") no-repeat center center;

    &__item {
      box-sizing: border-box;
      float: left;
      width: 128px;
      height: 40px;
      line-height: 48px;
      border-right: 1px solid $blackLight;
      text-align: center;
      cursor: pointer;
      &:last-child {
        border-right: none;
      }
      // &:hover {
      //   background-color: $lineLight;
      // }
    }

    &__icon {
      position: relative;
      display: inline-block;
      width: 24px;
      height: 24px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      transform-origin: center;
      transform: rotate(0deg);
      transition: transform 200ms;

      &--channel {
        background-image: url("../../assets/map/channel.png");
      }

      &--hot {
        background-image: url("../../assets/map/hot.png");
      }
      &--list {
        left: 4px;
        background-image: url("../../assets/map/list.png");
      }
      &--msg {
        background-image: url("../../assets/map/msg.png");
      }
      &--pull {
        background-image: url("../../assets/map/pull.png");
      }
      &--active {
        transform: rotate(180deg);
      }
    }
    &__text {
      position: relative;
      top: -6px;
      left: 4px;
      display: inline-block;
    }
  }

  .channel {
    box-sizing: border-box;
    z-index: 99;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 541px;
    height: 592px;
    padding: 10px;
    color: $white;
    background: url("../../assets/map/channel-box.png") no-repeat 0 0;
    transform: translate(-50%,-50%);
    // overflow: hidden;

    &__header {
      position: relative;
      float: left;
      width: 100%;
    }
    &__title {
      display: inline-block;
      width: 400px;
      height: 60px;
      margin-left: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: $weightBold;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &__body {
      box-sizing: border-box;
      float: left;
      width: 510px;
      height: 484px;
      // border-top: 1px solid $line;
      padding: 24px 0 24px 0;
      line-height: 150%;
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
    }

    &__icon {
      position: absolute;
      top: 14px;
      right: 14px;
      display: inline-block;
      height: 36px;
      width: 36px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      &:hover {
        background-color: $lineLight;
      }
      &--close {
        right: 14px;
        background-image: url("../../assets/icon/close.png");
      }
    }

    &__list {
      float: left;
      width: 100%;
      margin: 6px 0;
    }

    &__bg {
      position: relative;
      left: -1px;
      float: left;
      width: auto;
      height: 26px;
      margin-bottom: 1em;
      padding: 0 2em;
      line-height: 26px;
      border-top-right-radius: 13px;
      border-bottom-right-radius: 13px;
      background-color: $line;
    }
  }

  .subitem {
    position: relative;
    box-sizing: border-box;
    min-height: 2em;
    margin: 0;
    padding: 0 24px 0 80px;

    dt {
      position: absolute;
      min-width: 108px;
      text-align: left;
    }
    dd {
      box-sizing: border-box;
      margin-left: 108px;
      padding-left: 24px;
    }

    &__icon {
      display: inline-block;
      height: 12px;
      width: 12px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      transform: rotate(-90deg);
      &--arrow {
        position: absolute;
        top: 6px;
        right: 0;
        width: 12px;
        height: 12px;
        background-image: url("../../assets/map/pull.png");
      }
    }
    .radio {
      top: 0;
      box-sizing: border-box;
      margin-bottom: 12px;
    }
    .radio__line {
      display: inline-block;
      float: left;
      height: 21px;
      padding-right: 1em;
      border-left: 1px solid #fff;
    }
  }

  .level {
    box-sizing: border-box;
    z-index: 30;
    position: absolute;
    top: 136px;
    right: 158px;
    width: 410px;
    height: 104px;
    padding: 12px;
    color: $white;
    background: url("../../assets/map/level-box.png") no-repeat center center;

    &__item {
      position: relative;
      float: left;
      margin-top: 40px;
      width: 106px;
      height: 12px;

      &:first-child {
        margin-left: 50px;
      }
    }
    &__box {
      box-sizing: border-box;
      position: absolute;
      float: left;
      display: inline-block;
      width: 80px;
      height: 80px;
      text-align: center;
      font-size: $sizeS;
      font-weight: $weightBold;
      border: 1px solid $white;
      border-radius: 50%;
      transform: translate(0%,-50%);
      cursor: pointer;

      &:hover,
      &--active {
        animation: boxShadow 2.4s linear infinite;
      }

      &--0 {
        width: 32px;
        height: 32px;
        line-height: 30px;
        border-width: 1px;
      }
      &--1 {
        width: 48px;
        height: 48px;
        line-height: 42px;
        border-width: 3px;
      }
      &--2 {
        width: 66px;
        height: 66px;
        line-height: 56px;
        border-width: 5px;
      }
    }
  }

  .message {
    box-sizing: border-box;
    z-index: 30;
    position: absolute;
    top: 136px;
    right: 158px;
    width: 410px;
    height: 222px;
    padding: 12px;
    color: $white;
    background: url("../../assets/map/message-box.png") no-repeat center center;

    &__header {
      position: relative;
      float: left;
      width: 100%;
    }
    &__title {
      display: inline-block;
      width: 270px;
      height: 60px;
      margin-left: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: $weightBold;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &__close {

      &:hover {
        background-color: $lineLight;
      }
    }

    &__body {
      box-sizing: border-box;
      float: left;
      width: 100%;
      height: 120px;
      padding: 15px 24px;
      line-height: 150%;
      overflow: hidden;
    }

    &__icon {
      position: absolute;
      top: 14px;
      right: 14px;
      display: inline-block;
      height: 36px;
      width: 36px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      &:hover {
        background-color: $lineLight;
      }
      &--close {
        right: 14px;
        background-image: url("../../assets/icon/close.png");
      }
      &--message {
        left: 18px;
        background-image: url("../../assets/map/message.png");
        &:hover {
          background-color: transparent;
        }
      }
    }
    &__item {
      box-sizing: border-box;
      float: left;
      width: 100%;
      height: 34px;
      line-height: 34px;
    }
    &__name {
      float: left;
      width: 256px;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &__view {
      float: right;
      width: 80px;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;

      &:hover {
        color: $line;
      }
    }
  }

  .hot {
    box-sizing: border-box;
    z-index: 30;
    position: absolute;
    top: 137px;
    right: 158px;
    width: 410px;
    height: 473px;
    padding: 11px;
    color: $white;
    background: url("../../assets/map/top.png") no-repeat center center;

    &__header {
      position: relative;
      float: left;
      width: 100%;
    }
    &__title {
      display: inline-block;
      width: 270px;
      height: 60px;
      margin-left: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: $weightBold;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &__body {
      box-sizing: border-box;
      float: left;
      width: 100%;
      // height: 482px;
      padding: 22px 24px 16px 24px;
      // border-top: 1px solid $line;
      line-height: 150%;
      overflow: hidden;
    }

    &__toggle {
      float: left;
      width: 100%;
      margin-top: -6px;
      margin-bottom: 6px;
      font-size: 14px;
      text-align: center;
    }

    &__button {
      box-sizing: border-box;
      float: left;
      width: 80px;
      height: 26px;
      line-height: 26px;
      background-color: $btnDeep;
      cursor: pointer;
      &:first-child {
        // border-right: 1px solid $search;
        margin-left: 92px;
        border-right: 1px solid $btn;
        border-top-left-radius: 26px;
        border-bottom-left-radius: 26px;
      }
      &:last-child {
        border-top-right-radius: 26px;
        border-bottom-right-radius: 26px;
      }
      &--active {
        background-color: $btn;
      }
    }

    &__close {
      &:hover {
        background-color: $lineLight;
      }
    }

    &__icon {
      position: absolute;
      top: 14px;
      right: 14px;
      display: inline-block;
      height: 36px;
      width: 36px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      &:hover {
        background-color: $lineLight;
      }
      &--close {
        right: 14px;
        background-image: url("../../assets/icon/close.png");
      }
      &--small {
        position: relative;
        top: 4px;
        right: 0;
        width: 24px;
        height: 24px;
        &:hover {
          background-color: transparent;
        }
      }
      &--up {
        background-image: url("../../assets/map/up.png");
      }
      &--down {
        background-image: url("../../assets/map/down.png");
        transform: rotate(180deg);
      }
    }
  }

  .move {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: $red;

    &__body {
      position: absolute;
      top: 0;
      left: 0;
      transform: scale(1);
    }
  }

  .line {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    background-color: #f0f;

    &__0 {
      z-index: 10;
      position: absolute;
      top: 0;
      left: -1px;
      width: 0px;
      height: 100px;
      border-left: 1px solid #fff;
      transform-origin: left top;
      transform: rotate(0deg);
    }
    &__1 {
      z-index: 11;
      position: absolute;
      top: 0;
      left: 0;
      width: 0px;
      height: 100px;
      border-left: 1px solid #fff;
      transform-origin: left top;
      transform: rotate(90deg);
    }
    &__2 {
      z-index: 12;
      position: absolute;
      width: 0px;
      height: 100px;
      border-left: 1px solid #fff;
      transform-origin: left top;
      transform: rotate(180deg);
    }
    &__3 {
      z-index: 13;
      position: absolute;
      top: 1px;
      left: 0;
      width: 0px;
      height: 100px;
      border-left: 1px solid #fff;
      transform-origin: left top;
      transform: rotate(270deg);
    }
    &__4 {
      z-index: 14;
      position: absolute;
      top: 0;
      left: 0;
      width: 0px;
      height: 1000px;
      border-left: 1px solid #fff;
      transform-origin: left top;
      transform: rotate(135deg);
    }
  }
  .bg {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;

    &__body {
      z-index: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1366px;
      height: 1200px;
      transform: translate(-50%,-50%);
      background: $bg;
      // background: $bg url("../../../static/img/map/bg-map-01.png") no-repeat 1px 7px;
    }
  }

  .inner-race {
    z-index: 8;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    &__body {
      z-index: 10;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 234px;
      height: 234px;
      transform: translate(-50%,-50%);
    }
  }

  .inner-circle {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    &__body {
      z-index: 10;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 480px;
      height: 480px;
      transform: translate(-50%,-50%);
    }
  }

  .outer-circle {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    &__body {
      z-index: 10;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2000px;
      height: 2000px;
      border-radius: 50%;
      transform: translate(-50%,-50%);
      background-color: rgba(11, 42, 117, 0.08);
    }
  }

  .group {
    &-0 {
      position: relative;
      z-index: 20;
      .box__body {
        border-color: $group0Border;
        background-color: $group0Bg;
      }
    }
    &-1 {
      position: relative;
      z-index: 21;
      .box__body {
        border-color: $group1Border;
        background-color: $group1Bg;
      }
    }
    &-2 {
      position: relative;
      z-index: 22;
      .box__body {
        border-color: $group2Border;
        background-color: $group2Bg;
      }
    }
    &-3 {
      position: relative;
      z-index: 23;
      .box__body {
        border-color: $group3Border;
        background-color: $group3Bg;
      }
    }
    &--active {
      z-index: 29;

      .box--active {
        z-index: 9;
      }
    }
  }

  .box {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 0;
    height: 0;
    &__body {
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: 50%;
      width: 98px;
      height: 98px;
      border-radius: 50%;
      border: 5px solid #f00;
      box-shadow: 0 0 10px transparent;
      transform: translate(-50%,-50%);
      background-color: $green;
      /*overflow: hidden;*/
      cursor: default;

      &:hover,
      &--active {
        animation: boxShadow 1800ms linear infinite;
      }
      &--lvl0 {
        width: 98px;
        height: 98px;
        border-width: 5px;
      }
      &--lvl1 {
        width: 88px;height: 88px;
        border-width: 3px;
      }
      &--lvl2 {
        width: 78px;height: 78px;
        border-width: 1px;
      }
    }
    &__text {
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      max-height: 100%;
      padding: 13px;
      line-height: 120%;
      text-align: center;
      word-wrap: break-word;
      transform: translate(-50%,-50%);
      color: $white;
    }
  }

  /* dot */
  .annotation {
    z-index: 99;
    position: absolute;
    left: 100%;
    top: 50%;
    display: inline-block;
    width: 0px;
    height: 0px;
    transform: translate(-50%,-50%);
    &__dot {
      position: absolute;
      top: -6px;
      left: -4px;
      display: inline-block;
      width: 12px;
      height: 12px;
    }
    &:hover{
      cursor: pointer;
      .dot__point {
        background-color: $line;
      }
      .dot__circle {
        border-color: $line;
      }
    }
    &--green {
      .dot__point {
        background-color: $green;
      }
      .dot__circle {
        border-color: $green;
      }
    }
    &--yellow {
      .dot__point {
        background-color: $yellow;
      }
      .dot__circle {
        border-color: $yellow;
      }
    }

    &__line {
    }
    &__content {}
  }
  .dot {
    &__point{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      display: inline-block;
      width: 100%;
      height: 100%;
      background-color: $line;
      border-radius: 50%;
      transition: all 0s linear;
      z-index: 50;
    }
    &__circle {
      position: absolute;
      box-sizing: border-box;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 1px solid $line;
      animation: toLarge 3s linear 0;
      &:nth-child(2){
        animation: toLarge 3s linear 1.2s infinite;
      }
      &:nth-child(3){
        animation: toLarge 3s linear 2.4s infinite;
      }
      &:nth-child(4){
        animation: toLarge 3s linear 600ms infinite;
      }
    }
  }
  .line {
    z-index: 1;
    position: absolute;
    top: 0px;
    left: 0px;
    &__diagonal {
      position: absolute;
      top: 0;
      left: 0;
      width: 56px;
      height: 0;
      transform-origin: left top;
      transform: rotate(0deg);

      &--animate {
        border-bottom: 1px solid $line;
        animation: lineDiagonal 0.8s linear;
      }
    }
    &__horizontal {
      position: absolute;
      top: 0;
      left: 56px;
      width: 56px;
      height: 0;
      transform-origin: left top;
      transform: rotate(33deg);
      // transform: rotateY(180deg);
      &--animate {
        border-bottom: 1px solid $line;
        animation: lineHorizontal 0.8s linear;
        animation-fill-mode: forwards;
      }
    }
  }
  .dict {
    box-sizing: border-box;
    z-index: 2;
    position: absolute;
    top: -100px;
    left: 92px;
    width: 410px;
    height: 473px;
    padding: 12px;
    text-align: left;
    color: $white;
    // border: 1px solid $lineBorder;
    // background-color: rgba(13, 31, 47, 0.9);
    background: url("../../assets/map/intro.png") no-repeat center center;
    // cursor: auto;
    &__dot {
      z-index: 1;
      position: absolute;
      top: 124px;
      left: 5px;
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      box-shadow: 0 0 12px $line;
      background-color: $line;
    }
    &__header {
      position: relative;
      float: left;
      width: 100%;
    }
    &__title {
      display: inline-block;
      width: 270px;
      height: 60px;
      margin-left: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: $weightBold;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &__close {

      &:hover {
        background-color: $lineLight;
      }
    }

    &__body {
      float: left;
      width: 100%;
      margin-top: -16px;
    }

    &__detail {
      float: left;
      width: 100%;
      margin-top: 6px;
      text-align: center;
    }

    &__icon {
      display: inline-block;
      width: 32px;
      height: 32px;
      padding: 0;
      border-radius: 4px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center center;
      &:hover {
        &.dict__icon--close {
          background-color: $lineLight;
        }
        &.dict__icon--like {
          background-image: url("../../assets/icon/like-active.png");
        }
        &.dict__icon--star {
          background-image: url("../../assets/icon/star-active.png");
        }
      }
      &--active {
        &.dict__icon--like {
          background-image: url("../../assets/icon/like-active.png");
        }
        &.dict__icon--star {
          background-image: url("../../assets/icon/star-active.png");
        }
      }
      &--close {
        position: absolute;
        top: 14px;
        right: 14px;
        height: 36px;
        width: 36px;
        background-image: url("../../assets/icon/close.png");
      }
      &--like {
        background-image: url("../../assets/icon/like.png");
      }
      &--star {
        background-image: url("../../assets/icon/star.png");
      }
    }

    &__number {
      position: relative;
      top: -8px;
      display: inline-block;
    }

    &__button {
      display: inline-block;
      padding: 6px 22px;
      border-radius: 4px;
      font-size: 16px;
      background-color: $btn;
      cursor: pointer;

      &:hover {
        background-color: $btnDeep;
      }

      &--none {
        background-color: transparent;
        &.dict__button:hover {
          background-color: transparent;
        }
      }
    }

    &__footer {
      position: absolute;
      bottom: 20px;
      float: left;
      width: 100%;
    }

    &__left {
      float: left;
      width: 50%;
      text-align: center;
    }
    &__right {
      float: left;
      width: 50%;
      text-align: center;
    }
  }
  .dl-horizontal--info {
    box-sizing: border-box;
    float: none;
    height: 280px;
    width: 360px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 6px 0 6px;
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
      margin-top: 8px;
      width: auto;
      text-align: left;
    }
    dd {
      // max-height: 108px;
      margin-top: 8px;
      margin-left: auto;
    }
    .dl-horizontal__name {
      display: inline-block;
      max-width: 140px;
    }

    .dl-horizontal__right {
      float: right;
      margin-right: 0.5em;
    }
  }

  @keyframes toRotateUp {
    from {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  @keyframes toRotateDown {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }

  @keyframes toLarge {
    from {
      // width: 20px;
      // height: 20px;
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    to {
      // width: 55px;
      // height: 55px;
      transform: translate(-50%, -50%) scale(3);
      opacity: 0;
    }
  }

  @keyframes lineDiagonal {
    0%{
      width: 0;
    }
    36%{
      width: 100%;
    }
    100%{
      width: 100%;
    }
  }

  @keyframes lineHorizontal {
    0%{
      width: 0;
    }
    36% {
      width: 0;
    }
    /*36%{*/
    /*width: 0;*/
    /*}*/
    72%{
      width: 100%;
    }
    100%{
      width: 100%;
    }
  }

  .table {
    float: left;
    width: 100%;
    &__body {
      float: left;
      width: 100%;
    }
    &__tr {
      float: left;
      width: 100%;
    }
    &__td {
      float: left;
      display: inline-block;
      width: 84px;
      height: 32px;
      line-height: 32px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      &:nth-child(1) {
        width: 48px;
        text-align: right;
      }
      &:nth-child(2) {
        width: 180px;
      }
      &:nth-child(3) {
        width: 80px;
        text-align: right;
      }
      &:nth-child(4) {
        width: 32px;
      }
      &:nth-child(5) {}
    }
  }

  @keyframes dotAnimate {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes boxShadow {
    0%, 100% {
      box-shadow: 0 0 12px $white;
    }
    50% {
      box-shadow: 0 0 22px $red;
    }
  }
</style>
