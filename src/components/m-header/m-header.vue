<template>
  <div class="header">
    <img class="logo" src="../../common/images/default.png"/>
    <h1 class="title">Chicken Music</h1>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      name: 'm-header'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .header
    text-align: center
    height: 44px
    line-height 44px
    .logo
      width: 32px
      height: 36px
      vertical-align: top
    .title
      display: inline-block
      color: $color-theme
</style>
