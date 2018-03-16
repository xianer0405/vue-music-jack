<template>
  <div class="tab">
    <ul>
      <router-link to="/recommend" tag="li" class="tab-item active">
        <span class="tab-link">推荐</span>
      </router-link>
      <router-link to="/singer" tag="li" class="tab-item">
        <span class="tab-link">歌手</span>
      </router-link>
      <router-link to="/rank" tag="li" class="tab-item">
        <span class="tab-link">排行榜</span>
      </router-link>
      <router-link to="/search" tag="li" class="tab-item">
        <span class="tab-link">搜索</span>
      </router-link>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .tab
    width: 100%
    height: 44px
    ul
      display: flex
      line-height: 44px;
      justify-content: space-between
      align-content: center
    .tab-item
      flex: 1
      height: 44px
      font-size: $font-size-medium
      text-align: center
      color: $color-text-d
      &.router-link-active > .tab-link
        color: $color-theme
        border-bottom: 3px solid $color-theme
</style>
