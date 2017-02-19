![image](http://heliujie.com/public/images/admin-logo.png)


## Requirements


- vue1.0version
- vue-cli
- vue-router
- vuex

## index.html

```
<div id="app">
  <router-view keep-alive name="outView"></router-view>
</div>
```


## main入口文件

```
import Vue from 'vue'
import IndexPage from 'components/IndexPage/IndexPage'
...
import VueRouter from 'vue-router'
import store from './vuex/store'

import './common/css/reset.css'
import './common/css/bootstrap.min.css'
import './common/css/bootstrap.cover.styl'
import './common/css/computed.css'
import './common/css/font-awesome.min.css'

// 注册
Vue.use(VueRouter)

// 空的根组件 + store 
let App = Vue.extend({
  store
})

// 实例一个路由
let router = new VueRouter()

// 路由配置
router.map({
  '/index': {
    component: IndexPage,  
    name: 'index',          // 给路由命名
    outView: IndexPage,     // 多个view，这个组件渲染到自己命名的outView中
    subRoutes: {        // 配置子路由
      '/home':{
        component: HomeContent,
        name: 'home',
        content: HomeContent
      },
      '/btn': {
        component: BtnContent,
        name: 'btn',
        content: BtnContent
      }
      ...
    }
  },
  'login': {
    component: LoginPage,
    name: 'login',
    IndexPage: LoginPage
  }
})

router.redirect({    // 没有匹配到， 统一指向首页
  '/': '/index/home'
})

router.start(App, '#app')   // 启动

```

上面subRoutes子路由下到组件会渲染在outView中，而outView位于IndexPage组件到子组件content组件中，如下


```
<div class="content-wrapper f-pr f-h">
    <v-menu-title></v-menu-title>
    <div class="inner-box f-w f-h f-pa">
      <router-view keep-alive name="content"></router-view>
    </div>
</div>
```


## 数据／状态管理 store.js

```
import Vue from 'vue'
import Vuex from 'vuex'
import {getPageData} from '../common/js/data'

Vue.use(Vuex);

let pageData = getPageData();

const state = {
  pageData
}

const mutations = {

}
export default new Vuex.Store({
  state: state,
  mutations: mutations
})
```

data.js
```
export function getPageData() {
  let data = {
    currentMenuIndex: 0,
    slideMenuToggleState: true,
    slideListData: [
      {
        id: 1,
        name: '基本元素',
        isActive: false,
        icon: 'cubes',
        childNodes: [
          {
            id: 11,
            name: '按钮',
            isActive: false,
            icon: 'archive',
            routename: 'btn'
          },
          ....
        ]
  }
  return data
}

```


## 首页组件由三个组件组成
- nav导航
- side侧边菜单
- content右侧内容


```
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
```

## common/ 目录
common/目录在src/目录下
```

--src/
    --common/
        --css
        --fonts
        --images
        --js
        
```

## Css Vs Stylus

```
npm install stylus-loader css-loader stylus 
```
使用：

```
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
```

## 始终设置可视区域高度 clientHeight
resize事件时
高度变化--->重新计算--->重新赋值height属性

```
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
ready() {
    this._bindResize()
}
```

## 侧边菜单组件
第二级菜单由 childSide组件管理

```
<div class="side-wrapper f-pr f-h">
    <div class="box f-pa f-h">
        <ul class="list f-p0 f-m0 f-pr">
          <li class="item f-w f-pr item-hook"
              v-for="item in slideListData"
              track-by="$index"
              @mouseenter="getHoverActive($index)"
              :class="{'active':item.isActive && item.childNodes, 'isActiveMenu': item.isActive && !item.childNodes}" 
              @click="test">
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
```

## 右侧Tab组件

```
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
```

## 引入utils.js的监听transitionEnd事件方法

```
import {addTransitionEndEvent, removeTransitionEndEvent} from 'common/js/utils'
```

utils.js

```
/**
 * 绑定transitionEnd事件
 * @param obj 对象
 * @param callback 会调
 */
export function addTransitionEndEvent (obj, callback){
  obj.addEventListener('webkitTransitionEnd', function(){
    callback && callback()
  }, false)
  obj.addEventListener('transitionEnd', function(){
    callback && callback()
  }, false)
}

/**
 * 移除transitionEnd事件
 * @param obj
 * @param end
 */
export function removeTransitionEndEvent(obj, end) {
  obj.removeEventListener('webkitTransitionEnd', end, false)
  obj.removeEventListener('transitionEnd', end, false)
}

```

使用：绑定此监听事件回调中关闭当前监听！
```
addTransitionEndEvent(this.$els.$list, function(){
  self.isMoving = false
  removeTransitionEndEvent(self.$els.$list, function(){}, false)
}, false)
```
