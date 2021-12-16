import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import SignIn from "./components/SignIn";
import AddUser from "./components/AddUser";
import AddClient from "./components/AddClient";
import Users from "./components/Users";
import User from "./components/User";
import Clients from "./components/Clients";
import Client from "./components/Client";
import Main from "./components/Main";
import { getSomething } from "./api/get";

Vue.config.productionTip = false;
Vue.use(VueRouter);
const isAuthenticated = () => {
  if (localStorage.getItem("token")) return true;
  else false;
};
var admin;

getSomething("user").then((response) => {
  let user;
  user = response.data[0];

  if (user.role === "admin") admin = true;
  else admin = false;
});
const routes = [
  {
    path: "/add_user",
    component: AddUser,
    beforeEnter(to, from, next) {
      if (admin) {
        next();
      } else {
        next("/main");
      }
    },
  },
  { path: "/add_client", component: AddClient },
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
