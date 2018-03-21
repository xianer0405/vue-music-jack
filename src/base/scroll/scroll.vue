<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      bounce: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      _initScroll() {
        this.scroll = new BScroll(this.$refs.scroll, {
          scrollY: true,
          click: this.click,
          probeType: this.probeType,
          bounce: this.bounce
        })

        this.scroll.on('scroll', (pos) => {
          this._onScroll(pos)
        })
      },
      _onScroll(pos) {
        this.$emit('scroll', pos)
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    watch: {
      data() {
        this.scroll.refresh()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
