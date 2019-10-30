import Vue from "vue";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import VueMaterial from "vue-material";
import Vuelidate from "vuelidate";

import { appConfig } from "./config/index";

import BaseResource from "./shared/BaseResource";
import store from "./store";
import router from "./router";

import AuthServices from "./auth/AuthServices";
import UsersServices from "./admin/user-list/UsersServices";

import App from "./App.vue";

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
//import 'vue-material/dist/theme/default-dark.css'

firebase.initializeApp(appConfig.firebase);
//firebase.auth().signOut();               //To del

Vue.use(Vuelidate);

Vue.use(VueMaterial);

Vue.config.productionTip = false;   // disable warning about working in dev mode

const authService = new AuthServices(firebase);
const baseResource = new BaseResource(appConfig.baseURL, () => store.state.token);
const usersService = new UsersServices(firebase, baseResource);

new Vue({
    router,
    store,
    data: {
        auth: authService,
        users: usersService,
    },
    render: function (h) {
        return h(App);
    }
}).$mount(".app");
