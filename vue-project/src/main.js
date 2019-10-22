import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import AuthServices from "./auth/AuthServices";


Vue.use(Vuelidate);

const auth = new AuthServices();

Vue.config.productionTip = false;   // disable warning about working in dev mode

new Vue({
    router,
    store,
    data: {
        auth
    },
    render: function (h) {
        return h(App);
    }
}).$mount(".app");
