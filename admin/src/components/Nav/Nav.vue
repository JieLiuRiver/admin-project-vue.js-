<template>
    <div class="nav-wrapper container f-p0 f-m0 f-w">
      <div class="row f-h clearfix">
        <div class="title f-ib pull-left">
          <h4 class="f-h f-ib f-m0 title">管理系统</h4>
        </div>
        <div class="f-h f-ib side-toggle-wrapper pull-left">
          <div class="side text-center">
            <i class="fa fa-bars f-ib" aria-hidden="true" @click="toggleExpand"></i>
          </div>
        </div>
        <div class="f-h pull-right user-wrapper f-ib">
          <div class="item f-h clearfix addmored f-pr" @mouseenter="showMore" @mouseleave="hideMore">
              <div class="pull-left f-ib avatar">
                <img src="./avatar.jpg" width="100%" height="100%">
              </div>
              <div class="pull-left f-ib f-h name f-pr">
                heliujie
                <i class="more f-pa f-ib" :class="addmored"></i>
              </div>
              <div class="list-group f-pa" v-show="isShowMoreInfo" transition="test">
                <a href="javascript:;" class="list-group-item active">
                  <i class="fa fa-user-circle" aria-hidden="true"></i>
                  个人信息
                </a>
                <a href="javascript:;" class="list-group-item">
                  <i class="fa fa-gear" aria-hidden="true"></i>
                  设置
                </a>
                <a href="javascript:;" class="list-group-item" v-link="{name:'login'}">
                  <i class="fa fa-sign-out" aria-hidden="true"></i>
                  注销
                </a>
              </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import $ from 'jquery'

  export default{
    name: 'nav',
    props: {},
    data() {
      return {
        isShowMoreInfo: false
      }
    },
    methods: {
      showMore() {
        this.isShowMoreInfo = true
      },
      hideMore() {
        this.isShowMoreInfo = false
      },
      toggleExpand() {
         // 展开伸缩
         if (this.$store.state.pageData.slideMenuToggleState) {
             $('.side-box').animate({
              left: -200
             }, 400)
             $('.content-box-inner').css('width','100%').animate({
              marginLeft: 0
             }, 400)
             this.$store.state.pageData.slideMenuToggleState = false
          } else if (!this.$store.state.pageData.slideMenuToggleState) {
            $('.side-box').animate({
              left: 0
             }, 400)
             $('.content-box-inner').css({
                width: "calc(100% - 200px)"
             }).animate({
              marginLeft: 200
             }, 400)
             this.$store.state.pageData.slideMenuToggleState = true
         }
      }
    },
    computed: {
      addmored() {
        return {
          'mored': this.isShowMoreInfo
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">

  .nav-wrapper
    height: 50px
    color: #fff
    background: #434343
    .title
      width: 120px
      margin-left: 20px
      h4
        line-height: 50px
    .side-toggle-wrapper
      width: 30px
      margin-left: 44px
      .side
        width: 30px
        height: 30px
        line-height: 30px
        margin-top: 10px
        background-color: #1aa094
        cursor: pointer
        .fa
          color: #fff
    .user-wrapper
      width: 200px
      .item
        padding: 0 40px
        .avatar
          width: 40px
          height: 40px
          border-radius: 50%
          overflow: hidden
          margin-top: 5px
        .name
          line-height: 50px
          margin-left: 10px
        .more
          content: '';
          width: 0;
          height: 0;
          border-style: solid dashed dashed;
          border-color: #c2c2c2 transparent transparent;
          overflow: hidden;
          cursor: pointer;
          transition: all .2s;
          -webkit-transition: all .2s;
          position: absolute;
          top: 22px;
          right: -18px;
          border-width: 6px;
        .mored
            border-style:dashed dashed solid
            border-color:transparent transparent #c2c2c2
            top: 16px
        .list-group
          width: 140px
          top: 50px
          left: 30px
          z-index: 100
          border-radius: 0
          .list-group-item
            padding: 4px 10px
            border-color: #e2e2e2
          .active
            background-color: #434343



  .test-transition
    transition: .5s all ease-in-out
    opacity: 1
  .test-enter,
  .test-leave
    opacity: 0

</style>
