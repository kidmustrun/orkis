<template>
  <div class="container">
    <h1>Главная</h1>
    <h2>Привет, {{user.first_name}}</h2>
    <ul class="list-group list-group-flush">
  <li class="list-group-item"><router-link to="/clients">Клиенты</router-link></li>
  <li class="list-group-item"><router-link to="/users">Сотрудники</router-link></li>
</ul>
    <button @click="logoutClick()" class="btn">Выйти</button>
  </div>
  
</template>

<script>
import { logoutUser } from "../api/auth.js";
import { getSomething }from "../api/get.js";
export default {
  name: "Main",
  data(){
    return{
      user: {}
    }
  },
  created() {
    getSomething("api/v1/user").then((response) => {
      this.user = response.data[0];
    });
  },
  methods: {
    logoutClick() {
      logoutUser();
      location.reload();
      this.$router.push("/signin");
    },
  },
};
</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
