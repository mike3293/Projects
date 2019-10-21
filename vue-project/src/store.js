import Vue from 'vue'
import Vuex from 'vuex'
import router from "./router";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        name: null,
        loading: false
    },
    mutations: {
        setUser(state, payload) {
            state.login = payload.email;
            state.name = payload.nickName;

            if (payload.role === "admin") {
                router.push('/admin');
            }
            else { router.push('/home'); }    //Change to survey mb
        },
        setLoading(state, payload) {
            state.loading = payload
        }
    },
    actions: {
        setUser({ commit }, payload) {
            commit('setUser', payload);
        }
    }
})
