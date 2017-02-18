import Vue from 'vue'
import IndexPage from 'components/IndexPage/IndexPage'
import LoginPage from 'components/LoginPage/LoginPage'
import HomeContent from 'components/Home_c/Home_c'
import BtnContent from 'components/Btn_c/Btn_c'
import FormContent from 'components/Form_c/Form_c'
import GridContent from 'components/Grid_c/Grid_c'
import GuiderContent from 'components/Guider_c/Guider_c'
import TabContent from 'components/Tab_c/Tab_c'
import OtherContent from 'components/Other_c/Other_c'
import TableContent from 'components/Table_c/Table_c'
import NavbarContent from 'components/Navbar_c/Navbar_c'
import LaytplContent from 'components/Latpl_c/Latpl_c'
import IcheckContent from 'components/Icheck_c/Icheck_c'
import GithubContent from 'components/Github_c/Github_c'
import ReadmeContent from 'components/Readme_c/Readme_c'
import VueRouter from 'vue-router'
import store from './vuex/store'

import './common/css/reset.css'
import './common/css/bootstrap.min.css'
import './common/css/bootstrap.cover.styl'
import './common/css/computed.css'
import './common/css/font-awesome.min.css'


Vue.use(VueRouter)

let App = Vue.extend({
  store
})
let router = new VueRouter()

router.map({
  '/index': {
    component: IndexPage,
    name: 'index',
    outView: IndexPage,
    subRoutes: {
      '/home':{
        component: HomeContent,
        name: 'home',
        content: HomeContent
      },
      '/btn': {
        component: BtnContent,
        name: 'btn',
        content: BtnContent
      },
      '/form': {
        component: FormContent,
        name: 'form',
        content: FormContent
      },
      '/grid': {
        component: GridContent,
        name: 'grid',
        content: GridContent
      },
      '/guider': {
        component: GuiderContent,
        name: 'guider',
        content: GuiderContent
      },
      '/tab': {
        component: TabContent,
        name: 'tab',
        content: TabContent
      },
      '/other': {
        component: OtherContent,
        name: 'other',
        content: OtherContent
      },
      '/table': {
        component: TableContent,
        name: 'table',
        content: TableContent
      },
      '/navbar': {
        component: NavbarContent,
        name: 'navbar',
        content: NavbarContent
      },
      '/laytpl': {
        component: LaytplContent,
        name: 'laytpl',
        content: LaytplContent
      },
      '/icheck': {
        component: IcheckContent,
        name: 'icheck',
        content: IcheckContent
      },
      '/github': {
        component: GithubContent,
        name: 'github',
        content: GithubContent
      },
      '/readme': {
        component: ReadmeContent,
        name: 'readme',
        content: ReadmeContent
      }
    }
  },
  'login': {
    component: LoginPage,
    name: 'login',
    IndexPage: LoginPage
  }
})

router.redirect({
  '/': '/index/home'
})

router.start(App, '#app')
