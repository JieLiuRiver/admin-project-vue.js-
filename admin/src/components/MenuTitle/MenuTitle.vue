<template>
    <div class="menu-title-wrapper f-pr menu-wrapper-hook">
      <ul class="list f-clearfix f-m0 f-pa f-ib list-hook" :style="listStyle" v-el:$list>
        <li class="item f-ib f-h f-fl f-tc f-pr item-hook" v-for="itemNav in navListData" track-by="$index" :class="{'active': itemNav.isActive}" @click="choseNav(itemNav, $index)" v-el:item-hook  v-link="{path:itemNav.routename}">
            <i class="icon f-ib f-pa fa fa-{{itemNav.icon}}" aria-hidden="true"></i>
            <span class="title f-ib f-h">{{itemNav.title}}</span>
            <i class="f-ib close fa fa-times" aria-hidden="true" v-if="itemNav.id!=1" @click.stop.prevent="closeNav($index)"></i>
        </li>
      </ul>
      <div class="f-ib f-pa f-h btn-wrapper">
        <button type="button" class="btn btn-primary close-other-tab" @click.stop.prevent="choseAction">
          <i class="fa fa-plus" aria-hidden="true"></i>
          操作
        </button>
      </div>
      <div class="list-group f-pa f-m0" v-show="isNeedToolGroup">
        <button type="button" class="btn btn-primary close-other-tab" @click="closeOthersNav">
          <i class="fa fa-times" aria-hidden="true"></i>
          关闭其他
        </button>
        <button type="button" class="btn btn-primary close-other-tab" @click.stop.prevent="moveToRight" v-show="!isMoving">
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
          查看右侧
        </button>
        <button type="button" class="btn btn-primary close-other-tab" @click="stopMoving" v-show="isMoving">
          <i class="fa fa-stop" aria-hidden="true"></i>
          暂停
        </button>
        <button type="button" class="btn btn-primary close-other-tab" @click.stop.prevent="moveToLeft" v-show="!isMoving">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
          查看左侧
        </button>
      </div>
    </div>
</template>
<script>
  import $ from 'jquery'
  import {addTransitionEndEvent, removeTransitionEndEvent} from 'common/js/utils'

  export default{
    name: 'menuTitle',
    props: {},
    data() {
      return {
        isNeedShowMoreNav: false,
        isNeedToolGroup: false,
        listDistance: 0,
        listStyle: {},
        isMoving: false
      }
    },
    computed: {
      navListData() {
        this.listStyle.width = this._getListWidth() + 'px'
        return this.$store.state.pageData.navListData
      },
      isCanCheckRight() {
        if ($('.list-hook').outerWidth() - $('.menu-wrapper-hook').outerWidth() > 0 && !(Math.abs($('.list-hook').position().left) + $('.menu-wrapper-hook').outerWidth() == $('.list-hook').outerWidth())) {
          isCanCheckRight = true;
        }
      },
      currentActiveIndex() {
        return this.$store.state.pageData.currentMenuIndex
      }
    },
    created() {
      this.$nextTick( () => {
          this.getListStyle()
      })
    },
    methods: {
      moveToRight() {
        let distance = -($('.list-hook').outerWidth() - $('.menu-wrapper-hook').outerWidth())
        let self = this
        if (distance == this.listDistance) {
          return;
        }
        this.listDistance = distance
        this.listStyle.left = this.listDistance + 'px'
        this.listStyle.transition = '4s left ease'
        this.isMoving = true
        addTransitionEndEvent(this.$els.$list, function(){
          self.isMoving = false
          removeTransitionEndEvent(self.$els.$list, function(){}, false)
        }, false)
      },
      moveToLeft() {
        if ($('.list-hook').position().left >= 0) {
            return;
        }
        let self = this
        this.listDistance = 0
        this.listStyle.left = this.listDistance + 'px'
        this.listStyle.transition = '4s left ease'
        this.isMoving = true
        addTransitionEndEvent(this.$els.$list, function(){
          self.isMoving = false
          removeTransitionEndEvent(self.$els.$list, function(){}, false)
        }, false)
      },
      stopMoving() {
        this.listStyle.left = $('.list-hook').position().left + 'px'
        this.listStyle.transition = 'none'
        removeTransitionEndEvent(this.$els.$list, function(){}, false)
        this.isMoving = false
      },
      getListStyle() {
        let styleObj = null
        let _w = this._getListWidth()
        styleObj = {
          height: this.isNeedShowMoreNav ? 'auto' : '45px',
          width: !isNaN(_w) ?  _w + 'px' : 'auto',
          left: this.listDistance + 'px'
        }
        this.listStyle = styleObj
      },
      _getListWidth() {
         let _w = 0
         this.$store.state.pageData.navListData.forEach((itemNav, indexNav) => {
              _w += $('.item-hook').eq(indexNav).outerWidth()
         })
         return _w
      },
      watch: {

      },
      choseNav(item, index) {
        this._clearAllActiveStatus()
        item.isActive = true
        this.$store.state.pageData.currentMenuIndex = index

        this._changeRelationMenuStatus(item.id)

      },
      _clearAllActiveStatus() {
         this.$store.state.pageData.navListData.forEach((itemNav) => {
            itemNav.isActive = false
         })
      },
      closeNav(index) {
         if (this.$store.state.pageData.currentMenuIndex == index) {
            this.$store.state.pageData.navListData[0]['isActive'] = true
            this.$store.state.pageData.currentMenuIndex = 0

            this.$router.go({name: 'home'})
            this.$store.state.pageData.slideListData.forEach((itemOut, indexOut) => {
                if (itemOut.childNodes) {
                  itemOut.childNodes.forEach((itemIn, indexIn) => {
                      itemIn.isActive = false
                  })
                } else {
                  itemOut.isActive = false
                }
            })

            this.$store.state.pageData.slideListData.forEach((itemOut, indexOut) => {
                  itemOut.isActive = false
            })

         }
         this.$store.state.pageData.navListData.splice(index, 1)
         this.listStyle.width = this._getListWidth() + 'px'
      },
      seeMoreNav() {
        this.isNeedShowMoreNav = !this.isNeedShowMoreNav
      },
      choseAction() {
        this.isNeedToolGroup = !this.isNeedToolGroup
      },
      closeOthersNav() {
        let result = []
        this.$store.state.pageData.navListData.forEach((itemNav) => {
            if (itemNav.id == 1 || itemNav.id == this.$store.state.pageData.navListData[this.currentActiveIndex]['id']) {
              result.push(itemNav)
            }
        })
        this.$store.state.pageData.navListData = result
        this.listStyle.width = this._getListWidth() + 'px'
        this.listStyle.transition = '.5s left ease'
        this.listStyle.left = 0
      },
      _bindEvent() {
        let self = this
        $(document).click(() => {
          if (self.isNeedToolGroup) {
            self.isNeedToolGroup = false
          }
        })
      },
      _changeRelationMenuStatus(id) {
          this.$store.state.pageData.slideListData.forEach((itemOut, indexOut) => {
            if (itemOut.childNodes) {
              itemOut.childNodes.forEach((itemIn, indexIn) => {
                  itemIn.isActive = false
              })
            } else {
              itemOut.isActive = false
            }
         })
         this.$store.state.pageData.slideListData.forEach((itemOut, indexOut) => {
            if (itemOut.childNodes) {
              itemOut.childNodes.forEach((itemIn, indexIn) => {
                 if (itemIn.id == id) {
                    itemIn.isActive = true
                    if (!itemOut.isActive) {
                      this.$store.state.pageData.slideListData.forEach((itemK) => {
                          itemK.isActive = false
                      })
                      itemOut.isActive = true
                      $('.hover-cover-hook').css("top", '-200px')
                    }
                 }
              })
            } else {
              if (itemOut.id == id) {
                 itemIn.isActive = true
                 $('.hover-cover-hook').css("top", '-200px')
              }
            }
         })
      }
    },
    ready() {
      this._bindEvent()
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .menu-title-wrapper
    height: 45px
    border-bottom: 1px solid #1AA094
    .list
      box-sizing: border-box
      overflow: hidden
      width: auto
      top: 0
      transition: 4s left ease
      .item
        min-width: 65px
        padding: 0 10px 0 30px
        line-height: 44px
        cursor: pointer
        .icon
          width: 14px
          height: 14px
          top: 15px
          left: 10px
        .close
          width: 16px
          height: 16px
          margin-top: 14px
          margin-left: 4px
      .active
        background: #1AA094
        color: #fff
    .close-other-tab
      padding: 0 10px
      height: 30px
      right: 0
      bottom: 0
      z-index: 100
      cursor: pointer
      border-radius: 2px
      margin-top: -1px
    .list-group
      right: 0
      top: 40px
      font-size: 12px
      z-index: 100
      button
        display: block
    .btn-wrapper
      padding: 0 20px
      right: 0
      top: 0
      line-height: 44px
      border-left:1px solid #e2e2e2
      background: #fff
</style>
