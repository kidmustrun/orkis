<template>
  <div class="form-signin">
    <form>
      <h1 class="h3 mb-3 fw-normal">Зарегистрироваться</h1>

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
          type="text"
          class="form-control"
          id="login"
          v-model="login"
          placeholder="login"
        />
        <label for="login">Логин</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Иван"
          v-model="name"
        />
        <label for="name">Имя</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="surname"
          v-model="surname"
          placeholder="Иванов"
        />
        <label for="surname">Фамилия</label>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="lastname"
          v-model="lastname"
          placeholder="Иванович"
        />
        <label for="lastname">Отчество</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          placeholder="Пароль"
        />
        <label for="password">Пароль</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="password2"
          v-model="password2"
          placeholder="Пароль еще раз"
        />
        <label for="password2">Повторите пароль</label>
      </div>
      <div class="form-floating">
        <select class="form-select" id="orgs" v-model="org">
          <option selected value="1">Организация 1</option>
          <option value="2">Организация 2</option>
          <option value="3">Организация 3</option>
        </select>
        <label for="orgs">Выберите организацию</label>
      </div>
      <div class="form-check form-check-inline mt-2 mb-2">
        <input
          class="form-check-input"
          type="radio"
          name="gender"
          id="man"
          value="male"
          v-model="gender"
        />
        <label class="form-check-label" for="man"> Мужской </label>
      </div>
      <div class="form-check form-check-inline mt-2 mb-2">
        <input
          class="form-check-input"
          type="radio"
          name="gender"
          id="woman"
          value="female"
          v-model="gender"
        />
        <label class="form-check-label" for="woman"> Женский </label>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" id="roles" v-model="role">
          <option selected value="agent">Роль 1</option>
        </select>
        <label for="roles">Выберите роль</label>
      </div>
      <div class="checkbox mb-3">
        <label>
          <input v-model="remember" type="checkbox" value="remember-me" />
          Запомнить меня
        </label>
      </div>
      <div v-show="showError" class="mt-2 alert alert-danger" >
        {{ this.errorMessage }}
      </div>
    </form>
    <button class="w-100 btn btn-submit btn-lg btn-primary" @click="sendUser()">
      Зарегистрироваться
    </button>
    <router-link to="/signin">Войти</router-link>
    <div v-if="loading" class="cssload-spinner">
      <div class="cssload-ball cssload-ball-1"></div>
      <div class="cssload-ball cssload-ball-2"></div>
      <div class="cssload-ball cssload-ball-3"></div>
      <div class="cssload-ball cssload-ball-4"></div>
    </div>
  </div>
</template>

<script>
import { registerUser } from "../api/auth.js";
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      login: "",
      name: "",
      surname: "",
      lastname: "",
      password: "",
      password2: "",
      org: "",
      gender: "",
      role: "",
      remember: false,
      showError: false,
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    sendUser() {
      this.loading = true;
      this.showError = false;
      registerUser({
        email: this.email,
        username: this.login,
        first_name: this.name,
        second_name: this.surname,
        last_name: this.lastname,
        password: this.password,
        password_confirmation: this.password2,
        organisation: +this.org,
        gender: this.gender,
        role: this.role,
        remember: this.remember,
      })
        .then(() => {
          this.$router.push("/main");
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = error.response.data.error.errors;
          this.showError = true;
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
</style>
