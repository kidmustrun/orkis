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
import Cities from "./components/Cities";
import Countries from "./components/Countries";
import Preagreements from "./components/Preagreements";
import Preagreement from "./components/Preagreement";
import Agreements from "./components/Agreements";
import Agreement from "./components/Agreement";
import Hotels from "./components/Hotels";
import AddPreagreement from "./components/AddPreagreement";
import AddAgreement from "./components/AddAgreement";
import { getSomething } from "./api/get";

Vue.config.productionTip = false;
Vue.use(VueRouter);
var admin;
var user;
var authenticated = true;
getSomething("api/v1/user")
  .then(function (response) {
    user = response.data[0];
    authenticated = true;
    if (user.role === "admin") admin = true;
    else admin = false;
  })
  .catch(() => (authenticated = false));

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
  {
    path: "/add_client",
    component: AddClient,
    beforeEnter(to, from, next) {
      if (authenticated) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "/addagr/:id",
    component: AddAgreement,
    beforeEnter(to, from, next) {
      if (authenticated) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "/signin",
    component: SignIn,
    beforeEnter(to, from, next) {
      if (authenticated) {
        next("/main");
      } else {
        next();
      }
    },
  },
  {
  path: "/addpreagr",
  component: AddPreagreement,
  beforeEnter(to, from, next) {
    if (authenticated) {
      next();
    } else {
      next("/signin");
    }
  },
},
  {
    path: "/users",
    component: Users,
    beforeEnter(to, from, next) {
      if (authenticated) {
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
      if (authenticated) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "/preagreements/:id",
    component: Preagreement,
    beforeEnter(to, from, next) {
      if (authenticated) {
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
      if (authenticated) {
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
      if (authenticated) {
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
      if (authenticated) {
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
      if (authenticated) {
        next("/main");
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "/cities",
    component: Cities,
    beforeEnter(to, from, next) {
      if (authenticated) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "/countries",
    component: Countries,
    beforeEnter(to, from, next) {
      if (authenticated) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "/hotels",
    component: Hotels,
    beforeEnter(to, from, next) {
      if (authenticated) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "/preagreements",
    component: Preagreements,
    beforeEnter(to, from, next) {
      if (authenticated) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "/agreements",
    component: Agreements,
    beforeEnter(to, from, next) {
      if (authenticated) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  {
    path: "/agreements/:id",
    component: Agreement,
    beforeEnter(to, from, next) {
      if (authenticated) {
        next();
      } else {
        next("/signin");
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
