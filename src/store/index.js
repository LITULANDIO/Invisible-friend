import { createStore } from 'vuex'
import auth from '../auth/store';
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    show: true,
    fiends: [ ],
    friendId: ''
  },
  getters:{
    getFriends(state){
      return state.fiends
    },
    getFriendId(state){
      return state.friendId
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
    },
    SET_FRIEND_ID(state, id){
      state.friendId = id
    }
  },
  actions: {
  },
  modules: {
    auth

  },
  plugins: [createPersistedState()],
})
