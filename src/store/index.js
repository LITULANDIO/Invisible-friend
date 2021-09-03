import { createStore } from 'vuex'

export default createStore({
  state: {
    show: false,
    fiends: [ ]
  },
  getters:{
    getFriends(state){
      return state.fiends
    }
  },
  mutations: {
    SET_SHOW_MODAL(state, payload){
      state. show = payload
    },
    SET_LIST_FRIENDS(state, payload){
      state.fiends = payload
    },
    UPDATE_FRIENDS(state, friend){
      const idx = state.fiends.map(e => e.id).indexOf(friend.id)
      state.fiends[idx] = friend
    }
  },
  actions: {
  },
  modules: {
  }
})
