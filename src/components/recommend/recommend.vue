<template>
  <div class="recommend">
    <scroll :data="discList"
            :probeType="2"
            :listenScroll="false"
            class="recommend-content">
      <div>
        <div class="slider-wrapper" v-if="slider.length">
          <slider>
            <div :key="item.id" v-for="item in slider">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" :key="item.dissid" class="item" v-for="item in discList">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-wrapper" v-if="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Slider from 'base/slider/slider'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import {mapMutations} from 'vuex'

  export default {
    created() {
      this._getRecommend()
      setTimeout(() => {
        this._getDiscList()
      }, 1000)
    },
    data() {
      return {
        slider: [],
        discList: []
      }
    },
    methods: {
      selectItem(disc) {
        console.log(disc)
        // this.$router.push(disc.dissid)
        this.$router.push({ path: `/recommend/${disc.dissid}` })
        this.setDisc(disc)
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.slider = res.data.slider
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        }).catch((err) => {
          console.log(`recommend.vue, getDiscList err:${err}`)
        })
      },
      ...mapMutations({
        'setDisc': 'SET_DISC'
      })
    },
    components: {
      Slider,
      Loading,
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            flex: 1
            display: flex
            flex-direction: column
            justify-content: center
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-wrapper
        /*margin-top: 50px*/
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
