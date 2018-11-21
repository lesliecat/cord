import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tags-view'
import configure from './modules/configure'
import getters from './getters'

Vue.use(Vuex)

const autoSave = (store) => {
  store.watch(
    state => state.configure.site,
    (newValue, oldValue) => {
      store.dispatch('configure/savePreviewData')
    },
    { deep: true }
  )
}

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    configure
  },
  getters,
  plugins: [autoSave]
})

export default store
