import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import AuthServices from "./auth/AuthServices";
import UsersServices from "./admin/user-list/UsersServices";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./config/index";

firebase.initializeApp(firebaseConfig);
//firebase.auth().signOut();               //To del

Vue.use(Vuelidate);

Vue.config.productionTip = false;   // disable warning about working in dev mode

fetch("https://us-central1-vivid-cache-256107.cloudfunctions.net/api", {
    method: "POST", // POST, PUT, DELETE, etc.,
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ "email": "admin@admin.com" })
});

new Vue({
    router,
    store,
    data: {
        auth: new AuthServices(firebase),
        usersList: new UsersServices(firebase)
    },
    render: function (h) {
        return h(App);
    }
}).$mount(".app");
