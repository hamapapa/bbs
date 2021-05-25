import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogined: false,
    userId: null,
    userName: "",
    token: ""
  },
  mutations: {
    login(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId
      state.userName = payload.userName;
      state.isLogined = true;
    },

    logout(state) {
      state.token = "";
      state.userId = null
      state.userName = "";
      state.isLogined = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
