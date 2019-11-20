import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        common: {
            namespaced: true,
            state: {
                isLoading: false,
                appIsLoaded: false
            },
            mutations: {
                setLoading(state, payload) {
                    state.isLoading = payload;
                },
                setAppIsLoaded(state, payload) {
                    state.appIsLoaded = payload;
                }
            }
        },
        auth: {
            namespaced: true,
            state: {
                token: null,
                email: null,
                name: null,
                role: null
            },
            mutations: {
                setUser(state, payload) {
                    state.email = payload.email;
                    state.name = payload.nickName;
                    state.role = payload.role;
                    state.token = payload.token;
                }
            }
        }
    }
});