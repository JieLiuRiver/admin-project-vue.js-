<template>
    <div class="index-wrapper">
      <v-nav></v-nav>
      <div class="container-fluid f-p0 f-pr content-wrappper f-clearfix" :style="contentBoxStyle">
        <div class="side-box f-p0 f-h">
          <v-side></v-side>
        </div>
        <div class="content-box f-h f-p0">
          <div class="content-box-inner f-w f-h">
            <v-content></v-content>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import vNav from 'components/Nav/Nav'
  import vSide from 'components/Side/Side'
  import vContent from 'components/Content/Content'
  import $ from 'jquery'

  export default{
    name: 'index',
    props: {},
    data() {
      return {
        clientHeight: 0
      }
    },
    computed:{
      contentBoxStyle() {
         this.clientHeight = document.documentElement.clientHeight
         return {
          height: this.clientHeight - 50 + 'px'
         }
      }
    },
    methods: {
      _bindResize() {
        let self = this
        $(window).resize(() => {
           self.clientHeight = document.documentElement.clientHeight
        })
      }
    },
    components: {
      vNav,
      vSide,
      vContent
    },
    ready() {
      this._bindResize()
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .index-wrapper
    overflow: hidden
    .content-wrappper
       background: #fff
       overflow: hidden
       border-top: 5px solid #1aa094
       .side-box
         position:absolute
         width:200px
         margin-right: -200px
         background-color: #434343
       .content-box
         width: 100%
         .content-box-inner
           overflow: hidden
           margin-left: 200px
           width: calc( 100% - 200px )
</style>
