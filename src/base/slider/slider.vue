<template>
  <div ref="slider" class="slider">
    <div ref="sliderGroup" class="slider-group">
      <slot></slot>
    </div>
    <div class="dots" v-if="dots.length">
      <span :key="index" class="dot" :class="{'active': currentIndex === index }" v-for="(item,index) in dots">
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'

  export default {
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 1000
      },
      threshold: {
        type: Number,
        default: 0.3
      },
      speed: {
        type: Number,
        default: 400
      }
    },
    mounted() {
      setTimeout(() => {
        // 横向滚动模式下，wrapper的宽度已知或上层，但content的宽度需要根据内容来计算
        this._setSliderGroupWidth()
        this._initDots()
        this._initSlider()

        // 自动播放功能
        if (this.autoPlay) {
          this._play()
        }
      }, 20)

      window.addEventListener('resize', () => {
        // 没考虑到，当_initSlider没有执行完时，触发了resize事件时
        if (!this.slider || !this.slider.enabled) {
          return
        }
        clearTimeout(this.windowResizeTimer)
        this.windowResizeTimer = setTimeout(() => {
          if (this.slider.isInTransition) {
            this._onScrollEnd()
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this._setSliderGroupWidth(true)
          this.slider.refresh()
        }, 20)
      })
    },
    // destroyed() {
    //   clearTimeout(this.timer)
    // },
    beforeDestroy() {
      this.slider.disable()
      clearTimeout(this.timer)
    },
    data() {
      return {
        currentIndex: 0,
        dots: []
      }
    },
    methods: {
      _initDots() {
        // 初始化dots数量
        this.dots = new Array(this.children.length)
      },
      _setSliderGroupWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }

        // isResize为true时，不再额外增加content的宽度了
        if (this.loop && !isResize) {
          width += sliderWidth * 2
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: this.threshold,
            speed: this.speed
          },
          bounce: false,
          click: this.click
        })
        this.slider.on('scrollEnd', () => {
          this._onScrollEnd()
        })

        this.slider.on('touchend', () => {
          if (this.autoPlay) {
            this._play()
          }
        })

        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd() {
        this.currentIndex = this.slider.getCurrentPage().pageX
        // 要判断是否是自动播放
        if (this.autoPlay) {
          this._play()
        }
      },
      _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          // 当不是无缝轮播时，则切换到重复轮播
          if (!this.loop && this.currentIndex === this.children.length - 1) {
            this.slider.goToPage(0, 0, 0)
            this.currentIndex = 0
            this._play()
          } else {
            this.slider.next()
          }
        }, this.interval)
      }
    },
    components: {
      BScroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
