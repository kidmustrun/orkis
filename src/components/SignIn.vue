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
          <input v-model="remember" type="checkbox" value="remember-me" /> Запомнить меня
        </label>
      </div>
    </form>
    <button class="w-100 btn btn-submit btn-lg btn-primary" @click="sendUser()">
      Войти
    </button>
    <div v-if="loading" class="cssload-spinner">
      <div class="cssload-ball cssload-ball-1"></div>
      <div class="cssload-ball cssload-ball-2"></div>
      <div class="cssload-ball cssload-ball-3"></div>
      <div class="cssload-ball cssload-ball-4"></div>
    </div>
    <div v-show="show400" class="mt-2 alert alert-danger">
      Неправильный пароль или email.
    </div>
    <div v-show="show503" class="mt-2 alert alert-danger">
      Что-то пошло не так
    </div>
  </div>
</template>

<script>
import { loginUser } from "../api/auth.js";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      remember: false,
      show400: false,
      show503: false,
      loading: false,
    };
  },
  methods: {
    sendUser() {
      this.loading = true;
      this.show400 = false;
      this.show503 = false;
      console.log(this.loading);
      loginUser({ email: this.email, password: this.password, remember: this.remember })
        .then(() => {
          this.$router.push("/main");
          this.show400 = false;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 400) this.show400 = true;
          else this.show503 = true;
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/downloading.scss";
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
