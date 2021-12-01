import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import SignIn from "./components/SignIn";
import AddUser from "./components/AddUser";
import Users from "./components/Users";
import User from "./components/User";
import Clients from "./components/Clients";
import Client from "./components/Client";
import Main from "./components/Main";

Vue.config.productionTip = false;
Vue.use(VueRouter);
const isAuthenticated = () => {
  if (localStorage.getItem("token")) return true;
  else false;
};
const routes = [
  { path: "/add_user", component: AddUser },
  {
    path: "/signin",
    component: SignIn,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next("/main");
      } else {
        next();
      }
    },
  },
  {
    path: "/users",
    component: Users,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "/users/:id",
    component: User,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "/clients",
    component: Clients,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "/main",
    component: Main,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "/clients/:id",
    component: Client,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "*",
    component: Main,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next("/main");
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
