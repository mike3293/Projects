import Vue from 'vue'
import Vuex from 'vuex'
import router from "./router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      if (payload == "admin@admin.com")
        router.push('/admin');
    }
  },
  actions: {
    setUser({ commit }, payload) {
      commit('setUser', payload);
    }
  }
})
