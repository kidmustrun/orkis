<template>
  <div class="container">
    <h1>Главная</h1>
    <router-link to="/clients">Клиенты</router-link>
    <router-link to="/users">Сотрудники</router-link>
    <button @click="logoutClick()">Выйти</button>
  </div>
</template>

<script>
import { logoutUser } from "../api/auth.js";
export default {
  name: "Main",
  methods: {
    logoutClick() {
      console.log("logout...");
      logoutUser();
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
