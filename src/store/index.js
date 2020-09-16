import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tabsview from './modules/tabsview'
import language from './modules/language'
import permission from './modules/permission'
import common from './modules/common'
import home from './modules/home'
import department from './modules/department'
import workcategory from './modules/workcategory'
import waiimg from './modules/waiimg'
import learningplan from './modules/learningplan'
import notice from './modules/notice'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    tabsview,
    language,
    permission,
    common,
    home,
    department,
    workcategory,
    waiimg,
    learningplan,
    notice
  }
})
