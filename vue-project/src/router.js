import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signin from "./auth/sign-in/SignIn.vue";
import * as firebase from "firebase/app";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "sign-in",
            component: Signin
        },
        {
            path: "/admin",
            name: "admin",
            component: function () {
                return import("./admin/Admin.vue");
            },
            children: [
                {
                    path: "users",
                    name: "users",
                    component: function () {
                        return import("./admin/user-list/UserList.vue");
                    }
                },
                {
                    path: "create-survey",
                    name: "create-survey",
                    component: function () {
                        return import("./admin/create-survey/CreateSurvey.vue");
                    }
                }
            ],
            meta: { requiresAuth: true, requiresAdmin: true }
        },
        // {
        //     path: "/admin/users",
        //     name: "users",
        //     component: function () {
        //         return import("./admin/user-list/UserList.vue");
        //     }
        // },
        {
            path: '/admin/users/edit',
            name: "edit",
            props: true,
            component: function () {
                return import("./admin/user-edit/UserEdit.vue");
            }
        },
        {
            path: "/sign-up",
            name: "sign-up",
            component: function () {
                return import("./auth/sign-up/SignUp.vue");
            }
        },
        {
            path: "/home",
            name: "home",
            component: Home
        },
        {
            path: "/about",
            name: "about",
            component: function () {
                return import("./about/About.vue");
            }
        }
    ]
});

export default router;

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = firebase.auth().currentUser;

    // TODO: check for admin
    //const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
    //const isAdmin = (this.$store.state.role === 'admin');

    // if (requiresAdmin && this.$store.state.role !== 'admin') {
    //     next('/')
    // } else {
    //     next()
    // }

    if (requiresAuth && !isAuthenticated) {
        next('/')
    } else {
        next()
    }
})