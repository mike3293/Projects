import Vue from 'vue'
import Vuex from 'vuex'
import router from "./router";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        login: null,
        name: null,
        loading: false,
        role: 'user'
    },
    mutations: {
        setUser(state, payload) {
            state.login = payload.email;
            state.name = payload.nickName;
            state.role = payload.role;
            state.token = payload.token;

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
