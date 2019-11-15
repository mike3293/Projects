import Vue from "vue"
import Vuex from "vuex"
//import router from "./router";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        common: {
            appIsLoaded: false
        },
        token: null,
        login: null,
        name: null,
        loading: false,
        role: null
    },
    mutations: {
        setUser(state, payload) {
            state.login = payload.email;
            state.name = payload.nickName;
            state.role = payload.role;
            state.token = payload.token;

            // if (payload.role === "admin") {
            //     router.push("/admin/users");
            // } else if (payload.role === "user") {
            //     router.push("/surveys");
            // }
        },
        setLoading(state, payload) {
            state.loading = payload;
        }
    },
    actions: {
        setUser({ commit }, payload) {
            commit("setUser", payload);
        }
    }
})