import Vue from "vue"
import Vuex from "vuex"
//import router from "./router";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        common: {
            isLoading: false,
            appIsLoaded: false
        },
        auth: {
            token: null,
            email: null,
            name: null,
            role: null
        }
    },
    mutations: {
        setUser(state, payload) {
            state.auth.email = payload.email;
            state.auth.name = payload.nickName;
            state.auth.role = payload.role;
            state.auth.token = payload.token;
        },
        setLoading(state, payload) {
            state.common.isLoading = payload;
        }
    },
    actions: {
        setUser({ commit }, payload) {
            commit("setUser", payload);
        }
    }
})