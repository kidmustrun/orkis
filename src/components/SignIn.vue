<template>
  <div class="form-signin">
    <form>
      <h1 class="h3 mb-3 fw-normal">Войти в систему</h1>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          placeholder="name@example.com"
        />
        <label for="email">Email</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          placeholder="Password"
        />
        <label for="password">Пароль</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Запомнить меня
        </label>
      </div>
      <button
        class="w-100 btn btn-submit btn-lg btn-primary"
        @click="sendUser()"
      >
        Войти
      </button>
    </form>
    <router-link to="/signup">Зарегистрироваться</router-link>
  </div>
</template>

<script>
import { loginUser } from "../api/api.js";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    sendUser() {
      loginUser({ email: this.email, password: this.password });
      // if (localStorage.getItem("token")) this.$router.push("/clients");
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
