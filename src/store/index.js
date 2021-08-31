import { createStore } from 'vuex'

export default createStore({
  state: {
    show: false
  },
  mutations: {
    SET_SHOW_MENU(state, payload){
      state. show = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
