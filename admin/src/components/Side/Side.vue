<template>
    <div class="side-wrapper f-pr f-h">
        <div class="box f-pa f-h">
            <ul class="list f-p0 f-m0 f-pr">
              <li class="item f-w f-pr item-hook"
                  v-for="item in slideListData"
                  track-by="$index"
                  @mouseenter="getHoverActive($index)"
                  :class="{'active':item.isActive && item.childNodes, 'isActiveMenu': item.isActive && !item.childNodes}" @click="test">
                <a class="link f-w f-h ellipsis" href="javascript:void(0)" data-id="{{item.id}}">
                  <i class="fa f-ib fa-{{item.icon}}" aria-hidden="true" data-icon="fa-cubes"></i>
                  <span class="f-ib text">{{item.name}}</span>
                  <span class="more" :class="{'mored': item.isActive}" v-if="item.childNodes"></span>
                </a>
                <child-side :show="item.isActive" :childs="item.childNodes" transition="expand"></child-side>
              </li>
              <span class="hover-cover f-ib f-w f-pa hover-cover-hook"
                    :style="hoverStyle"
                    @click="choseMenu">
                <span class="barl f-pa f-h f-ib"></span>
                <span class="bar f-ib f-h f-pa"></span>
              </span>
            </ul>
        </div>
    </div>
</template>
<script>
  import childSide from 'components/ChildSide/ChildSide'
  import $ from 'jquery'

  const ITEMHEIGHT = 45

  export default{
    name: 'side',
    props: {
    },
    data() {
      return {
        currentHoverIndex: 0,
        currentFontHeight: 0
      }
    },
    methods: {
      getHoverActive(index) {
        this.currentHoverIndex = index
      },
      test() {
        console.log('...')
      },
      choseMenu() {
            this._solveHoverCoverPostion()
            // 更改属性
            if (!this.$store.state.pageData.slideListData[this.currentHoverIndex].isActive) {
              this._clearAllMenuActiveValue()
              this.$store.state.pageData.slideListData[this.currentHoverIndex].isActive = true
            } else {
              if (!this.$store.state.pageData.slideListData[this.currentHoverIndex]['childNodes']) {
                return;
              }
              this._clearAllMenuActiveValue()
              this.$store.state.pageData.slideListData[this.currentHoverIndex].isActive = false
            }
      },
      _clearAllMenuActiveValue() {
        this.$store.state.pageData.slideListData.forEach((item) => {
            item.isActive = false
        })
      },
      _getFontHeights() {
        let $items = $('.item-hook')
        let result = 0
        for (let i = 0; i < this.currentHoverIndex; i++) {
          result += $items.eq(i).height()
        }
        this.currentFontHeight = result
      },
      _solveHoverCoverPostion() {
        // 锁定位置
        if (this.$store.state.pageData.slideListData[this.currentHoverIndex]['childNodes']) {
          for (let i = 0; i < this.currentHoverIndex; i++) {
            if (this.$store.state.pageData.slideListData[i]['isActive']) {
              if (i == 0) {
                $('.hover-cover-hook').css("top", ITEMHEIGHT)
              } else if (i == 1) {
                $('.hover-cover-hook').css("top", ITEMHEIGHT * 2)
              } else if (i == 2) {
                $('.hover-cover-hook').css("top", ITEMHEIGHT * 3)
              } else if (i == 3) {
                $('.hover-cover-hook').css("top", ITEMHEIGHT * 4)
              }  else if ( i == 4) {
                $('.hover-cover-hook').css("top", ITEMHEIGHT * 5)
              }
            }
          }
        } else {
            $('.hover-cover-hook').css("top", ITEMHEIGHT * this.currentHoverIndex)
        }
      },
      _setActiveBg() {

      }
    },
    computed: {
      hoverStyle() {
        // 获取前面的高度
        this._getFontHeights()
        return {
          top:   this.currentFontHeight + 'px',
          opacity: 1
        }
      },
      slideListData() {
        return this.$store.state.pageData.slideListData
      }
    },
    ready() {
      // console.log(this.slideListData)
    },
    components: {
      childSide
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .side-wrapper
    .box
      width: 100%
      height: 100%
      overflow:hidden
      left: 0
      top: 0
      .list
        color: fff
        font-size: 0
        overflow: hidden
        .item
          height: auto
          line-height: 50px
          color: #c2c2c2
          overflow: hidden
          .link
            padding: 0 20px
            display: block
            height: 45px
            .text
              font-size: 14px
              padding: 0 10px
              color: #c2c2c2
            .fa
              width: 18px
              height: 14px
              font-size: 14px
              color: #c2c2c2
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
              top: 20px;
              right: 10px;
              border-width: 6px
            .mored
              border-style:dashed dashed solid
              border-color:transparent transparent #c2c2c2
              top: 16px
          .expand-transition
            transition: .2s all ease
            opacity: 1
          .expand-enter,
          .expand-leave
            opacity: 0
            height: 0
        .active
          background-color: #000
          .link
           background-color: rgba(67, 67, 67, .4)
        .isActiveMenu
          background-color: #1aa094
        .hover-cover
          height: 45px
          left: 0
          top: 0
          transition: .2s all
          .bar
            width: 194px
            background: #fff
            opacity: .1
            right: 0
            top: 0
          .barl
            width: 6px
            background: #009688

</style>
