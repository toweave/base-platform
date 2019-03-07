<template>
  <div class="annotation">
    <div class="annotation--dot dot" ref="annotationActive" @mouseover="mouseAnnotationIn" @mouseout="mouseAnnotationOut">
      <span class="dot--point"></span>
      <span class="dot--circle"></span>
      <span class="dot--circle"></span>
      <span class="dot--circle"></span>
      <span class="dot--circle"></span>
    </div>
    <div class="annotation--line line" v-show="animateAnnotation">
      <div class="line--diagonal">
        <div class="line--diagonal-animate"></div>
      </div>
      <div class="line--horizontal">
        <div class="line--horizontal-animate"></div>
      </div>
    </div>
    <div class="annotation--animate animated" v-show="animateAnnotationContent" :class="{'fadeIn': animateAnnotation, 'fadeOut': !animateAnnotation}">
      <div class="annotation--content dict">
        <div class="group">
          <div class="group--border group--border-bottom"></div>
          <div class="group--border group--border-left"></div>
          <div class="group--border group--border-top-cw"></div>
          <div class="group--border group--border-right-cw"></div>
        </div>
        <div class="dict--dot"></div>
        <div class="dict--title">{{Indicator.name}}</div>
        <div class="dict--content" v-html="Indicator.definition"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Annotation',
  components: {},
  props: ['Indicator'],
  data () {
    return {
      msg: 'Annotation',
      animateAnnotation: false,
      animateAnnotationContent: false
    }
  },
  computed: {
  },
  methods: {
    mouseAnnotationIn () {
      this.animateAnnotation = true
      this.animateAnnotationContent = true
    },
    mouseAnnotationOut () {
      this.animateAnnotation = false
    }
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

  .annotation {
    z-index: 99;
    position: absolute;
    top: 0;
    right: -48px;
    display: inline-block;
    width: 18px;
    height: 18px;
    &--dot {
      position: relative;
      display: inline-block;
      width: 18px;
      height: 18px;
    }
    &:hover{
      cursor: pointer;
      .dot--point {
        background-color: $line;
      }
      .dot--circle {
        border-color: $line;
      }
    }
    &-green {
      .dot--point {
        background-color: $green;
      }
      .dot--circle {
        border-color: $green;
      }
    }
    &-yellow {
      .dot--point {
        background-color: $yellow;
      }
      .dot--circle {
        border-color: $yellow;
      }
    }

    &--line {
    }
    &--content {}
  }
  .dot {
    &--point{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      display: inline-block;
      width: 100%;
      height: 100%;
      background-color: $line;
      border-radius: 50%;
      transition: all 0.1s linear;
      z-index: 50;
    }
    &--circle {
      position: absolute;
      box-sizing: border-box;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 1px solid $line;
      animation: toLarge 4.5s linear 0;
      &:nth-child(2){
        animation: toLarge 4.5s linear 1.5s infinite;
      }
      &:nth-child(3){
        animation: toLarge 4.5s linear 3s infinite;
      }
      &:nth-child(4){
        animation: toLarge 3s linear 1s infinite;
      }
    }
  }
  .line {
    z-index: 1;
    position: absolute;
    top: 11px;
    left: 9px;
    &--diagonal {
      position: absolute;
      top: 0;
      left: 0;
      width: 56px;
      height: 0;
      transform-origin: left top;
      transform: rotate(0deg);

      &-animate {
        border-bottom: 1px solid $line;
        animation: lineDiagonal 0.8s linear;
      }
    }
    &--horizontal {
      position: absolute;
      top: 0;
      left: 56px;
      width: 56px;
      height: 0;
      transform-origin: left top;
      transform: rotate(33deg);
      // transform: rotateY(180deg);
      &-animate {
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
    top: 42px;
    left: -140px;
    width: 500px;
    height: 230px;
    padding: 36px;
    text-align: left;
    border: 1px solid $lineBorder;
    background-color: rgba(13, 31, 47, 0.9);
    &--dot {
      z-index: 1;
      position: absolute;
      top: -7px;
      left: 50%;
      right: 50%;
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      box-shadow: 0 0 12px $line;
      background-color: $line;
    }
    &--title {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: $weightBold;
      color: $white;
    }
    &--content {
      line-height: 150%;
      font-size: 24px;
      color: $white;
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
      transform: translate(-50%, -50%) scale(2.5);
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

  .group {
    position: absolute;
    top: 0;
    left: 0;
    width: 500px;
    height: 230px;
    overflow: hidden;

    &--border {
      position: absolute;
      &-left {
        top: -200px;
        left: 0;
        width: 1px;
        height: 200px;
        background: linear-gradient(top,$lightLow 0%,$lightStrong 50%,$lightLow 100%);
        background: -webkit-gradient(linear, left top, left bottom, from($lightLow), color-stop(50%, $lightStrong), to($lightLow));
        animation: left0 $animationTime linear infinite;
        transform: translateY(0);
      }
      &-bottom {
        bottom: 0;
        left: -200px;
        width: 200px;
        height: 1px;
        background: linear-gradient(left,$lightLow 0%,$lightStrong 50%,$lightLow 100%);
        background: -webkit-gradient(linear, left top, right top, from($lightLow), color-stop(50%, $lightStrong), to($lightLow));
        animation: bottom0 $animationTime linear infinite;
        transform: translateX(0);
      }
      &-right {
        right: 0;
        bottom: -200px;
        width: 1px;
        height: 200px;
        background: linear-gradient(top,$lightLow 0%,$lightStrong 50%,$lightLow 100%);
        background: -webkit-gradient(linear, left top, left bottom, from($lightLow), color-stop(0%, $lightLow), color-stop(50%, $lightStrong), to($lightLow));
        animation: right0 $animationTime linear infinite;
        transform: translateY(0);
      }
      &-top {
        top: 0;
        right: -200px;
        width: 200px;
        height: 1px;
        background: linear-gradient(left, $lightLow 0%, $lightStrong 50%, $lightLow 100%);
        background: -webkit-gradient(linear, left top, right top, from($lightLow), color-stop(50%, $lightStrong), to($lightLow));
        animation: top0 $animationTime linear infinite;
        transform: translateX(0);
      }

      &-top-cw {
        top: 0;
        left: -200px;
        width: 200px;
        height: 1px;
        background: linear-gradient(left, $lightLow 0%, $lightStrong 50%, $lightLow 100%);
        background: -webkit-gradient(linear, left top, right top, from($lightLow), color-stop(50%, $lightStrong), to($lightLow));
        animation: topCW0 $animationTime linear infinite;
        transform: translateX(0);
      }
      &-right-cw {
        right: 0;
        top: -200px;
        width: 1px;
        height: 200px;
        background: linear-gradient(top,$lightLow 0%,$lightStrong 50%,$lightLow 100%);
        background: -webkit-gradient(linear, left top, left bottom, from($lightLow), color-stop(0%, $lightLow), color-stop(50%, $lightStrong), to($lightLow));
        animation: rightCW0 $animationTime linear infinite;
        transform: translateY(0);
      }
      &-bottom-cw {
        bottom: 0;
        right: -200px;
        width: 200px;
        height: 1px;
        background: linear-gradient(left,$lightLow 0%,$lightStrong 50%,$lightLow 100%);
        background: -webkit-gradient(linear, left top, right top, from($lightLow), color-stop(50%, $lightStrong), to($lightLow));
        animation: bottomCW0 $animationTime linear infinite;
        transform: translateX(0);
      }
      &-left-cw {
        bottom: -200px;
        left: 0;
        width: 1px;
        height: 200px;
        background: linear-gradient(top,$lightLow 0%,$lightStrong 50%,$lightLow 100%);
        background: -webkit-gradient(linear, left top, left bottom, from($lightLow), color-stop(50%, $lightStrong), to($lightLow));
        animation: leftCW0 $animationTime linear infinite;
        transform: translateY(0);
      }
    }

    @keyframes left0 {
      0%{
        transform: translateY(0);
      }
      19.03%{
        transform: translateY(430px);
      }
      100%{
        transform: translateY(430px);
      }
    }

    @keyframes bottom0 {
      0%{
        transform: translateX(0);
      }
      19.03%{
        transform: translateX(0);
      }
      50%{
        transform: translateX(700px);
      }
      100%{
        transform: translateX(700px);
      }
    }

    @keyframes right0 {
      0%{
        transform: translateY(0);
      }
      50%{
        transform: translateY(0px);
      }
      69.03%{
        transform: translateY(-430px);
      }
      100%{
        transform: translateY(-430px);
      }
    }

    @keyframes top0 {
      0%{
        transform: translateX(0);
      }
      69.03%{
        transform: translateX(0);
      }
      100%{
        transform: translateX(-700px);
      }
    }

    @keyframes topCW0 {
      0%{
        transform: translateX(0);
      }
      30.97%{
        transform: translateX(700px);
      }
      100%{
        transform: translateX(700px);
      }
    }

    @keyframes rightCW0 {
      0%{
        transform: translateY(0);
      }
      30.97%{
        transform: translateY(0);
      }
      50%{
        transform: translateY(430px);
      }
      100%{
        transform: translateY(430px);
      }
    }

    @keyframes bottomCW0 {
      0%{
        transform: translateX(0);
      }
      50%{
        transform: translateX(0px);
      }
      80.97%{
        transform: translateX(-700px);
      }
      100%{
        transform: translateX(-700px);
      }
    }

    @keyframes leftCW0 {
      0%{
        transform: translateY(0);
      }
      80.97%{
        transform: translateY(0);
      }
      100%{
        transform: translateY(-430px);
      }
    }
  }
</style>
