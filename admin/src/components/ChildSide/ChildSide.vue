<template>
    <div class="child-side-wrapper f-pr" v-show="show">
        <ul class="child-list">
          <li class="child-item" v-for="item in childs" track-by="$index" v-el:$child-item @click.stop.prevent="choseMenuItem(item, $index)" :class="{'active': item.isActive}" v-link="{name: item.routename}">
            <a class="child-link f-w f-ib f-h" href="javascrip:void(0)">
              <i class="fa f-ib fa-{{item.icon}}" aria-hidden="true" data-icon="fa-file"></i>
              <span class="f-ib text">{{item.name}}</span>
            </a>
          </li>
        </ul>
    </div>
</template>
<script>
  export default{
    name: 'RoutePage',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      childs: {
        type: [Array, Boolean],
        default: []
      }
    },
    data() {
      return {
        slideListData() {
          return this.$store.state.pageData.slideListData
        }
      }
    },
    computed: {

    },
    methods: {
      choseMenuItem(item, index) {
          this._clearAllActiveStatus()
          item.isActive = true

          // 如果有重复的
          if (this._validateNavRepeatCondition(item.id)) {
              this._keepNavActiveStatus(item.id)
              return
          }

          let navOptions = {
            id: item.id,
            title: item.name,
            icon: item.icon,
            isActive: item.isActive,
            routename: item.routename
          }
          this._clearNavActiveStatus()
          this.$store.state.pageData.navListData.push(navOptions)
          this.$store.state.pageData.currentMenuIndex = this.$store.state.pageData.navListData.length - 1
      },
      _clearAllActiveStatus() {
         this.$store.state.pageData.slideListData.forEach((itemOut, indexOut) => {
            if (itemOut.childNodes) {
              itemOut.childNodes.forEach((itemIn, indexIn) => {
                  itemIn.isActive = false
              })
            }
         })
      },
      _clearNavActiveStatus() {
         this.$store.state.pageData.navListData.forEach((itemNav) => {
            itemNav.isActive = false
         })
      },
      _validateNavRepeatCondition(id) {
          var _bool = false
          this.$store.state.pageData.navListData.forEach((item) => {
              if (item.id == id) {
                _bool = true
              }
          })
          return _bool
      },
      _keepNavActiveStatus(id) {
          this.$store.state.pageData.navListData.forEach((item) => {
              item.isActive = false
          })
          this.$store.state.pageData.navListData.forEach((item) => {
              if (item.id == id) {
                item.isActive = true
              }
          })
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .child-side-wrapper
    z-index: 20
    .child-list
      color: #393D49
      font-size: 0
      .child-item
        height: 45px
        line-height: 45px
        color: #c2c2c2
        padding: 0 20px
        .child-link
          color: #ccc
          .text
            font-size: 14px
            padding: 0 10px
            color: #c2c2c2
          .fa
            width: 18px
            height: 14px
            font-size: 14px
            color: #c2c2c2
      .active
        background: #1aa094
        color: #fff
</style>
