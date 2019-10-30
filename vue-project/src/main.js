import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import AuthServices from "./auth/AuthServices";
import UsersServices from "./admin/user-list/UsersServices";
import BaseResource from "./shared/BaseResource";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { appConfig } from "./config/index";

firebase.initializeApp(appConfig.firebase);
//firebase.auth().signOut();               //To del

Vue.use(Vuelidate);

Vue.config.productionTip = false;   // disable warning about working in dev mode


new Vue({
    router,
    store,
    data: {
        auth: new AuthServices(firebase),
        usersList: new UsersServices(firebase),
        resource: new BaseResource(appConfig.baseURL, () => store.state.token)
    },
    render: function (h) {
        return h(App);
    }
}).$mount(".app");
