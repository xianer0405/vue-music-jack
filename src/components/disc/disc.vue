<template>
  <div class="disc">
  </div>
</template>

<script type="text/ecmascript-6">
  import {getCdInfo} from 'api/recommend'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        name: 'disc'
      }
    },
    created() {
      this._getCdInfo(this.disc.disstid)
    },
    methods: {
      _getCdInfo() {
        getCdInfo('3635728953').then((res) => {
          console.log(res)
        })
      }
    },
    computed: {
      ...mapGetters([
        'disc'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
