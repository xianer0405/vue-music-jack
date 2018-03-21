<template>
  <div class="loading">
    <!--<div class="icon">
      <img width="24px" height="24px" src="./loading.gif">
    </div>
    <div class="title">
      <span>{{title}}</span>
    </div>-->
    <img width="24px" height="24px" src="./loading.gif" class="loading-img">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在加载中'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  /*
  .loading
    .icon
      text-align:center
      width: 100px
      margin: 0 auto
    .title
      text-align:center
      width: 100px
      margin: 0 auto
      font-size: $font-size-small
      color: $color-text-l
   */
  .loading
    width: 100%
    text-align: center
    .loading-img
      width: 24px
      height: 24px
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>
