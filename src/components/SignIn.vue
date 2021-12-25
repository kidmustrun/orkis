<template>
<div class="temp1">
  <div class="form-signin">
    <form>
      <h1 >Войти в систему</h1>

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
          <input v-model="remember" type="checkbox" value="remember-me" /> <span class="remember" >Запомнить меня</span>
        </label>
      </div>
    </form>
    <button class="signin" @click="sendUser()">
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
      loginUser({ email: this.email, password: this.password, remember: this.remember })
        .then(() => {
          this.$router.push("/main");
          location.reload()
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

<style>
  body{
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
   
    background: rgba(77, 56, 75, 1);
    background: -moz-linear-gradient(left, rgba(77, 56, 75, 1) 0%, rgba(36, 54, 90, 1) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(77, 56, 75, 1)), color-stop(100%, rgba(36, 54, 90, 1)));
    background: -webkit-linear-gradient(left, rgba(77, 56, 75, 1) 0%, rgba(36, 54, 90, 1) 100%);
    background: -o-linear-gradient(left, rgba(77, 56, 75, 1) 0%, rgba(36, 54, 90, 1) 100%);
    background: -ms-linear-gradient(left, rgba(77, 56, 75, 1) 0%, rgba(36, 54, 90, 1) 100%);
    background: linear-gradient(to right, rgba(77, 56, 75, 1) 0%, rgba(36, 54, 90, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4d384b', endColorstr='#24365a', GradientType=1 );
    height: 100%;
    min-height: 400px; }
  .signin {
    width: 80%;
    background: none;
    border:none;
    border: 1px solid #666;
    color: white;
    font-size: 18px;
    font-weight: 200;
    cursor: pointer;
    transition: box-shadow .4s ease;
    width: 80%;
    margin-bottom: 25px;
    margin-left: 10%;
    height: 40px;
    border-radius: 5px;
    outline: 0;
    -moz-outline-style: none;
    background: #3ce786;
    border:none;
    color: white;
    font-size: 18px;
    font-weight: 200;
    cursor: pointer;
    transition: box-shadow .4s ease;}
    h1{
      text-align: left;
    font-weight: 200;
    font-size: 1.6em;
    margin: 0 0 10px 0;
    padding: 0 0 10px 0;
    border-bottom: 1px solid #eeeeee;
    color: #e9e9e9;
    }
    .remember{
      display: flexbox;
      color: #e9e9e9;
    }
</style>

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
