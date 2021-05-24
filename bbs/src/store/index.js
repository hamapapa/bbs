import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogined: false,
    userName: "",
    token: ""
  },
  mutations: {
    login(state, payload) {
      state.token = payload.token;
      state.userName = payload.userName;
      state.isLogined = true;
    },

    logout(state) {
      state.token = "";
      state.userName = "";
      state.isLogined = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
