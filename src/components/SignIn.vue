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
    <div v-if="show400" class="mt-2 alert alert-danger">
      Неправильный пароль или email.
    </div>
    <div v-if="show503" class="mt-2 alert alert-danger">
      Что-то пошло не так
    </div>
    <router-link to="/signup">Зарегистрироваться</router-link>
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
      loginUser({ email: this.email, password: this.password })
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
@import "../assets/scss/styles.scss";
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
.cssload-spinner {
  height: 37px;
  width: 37px;
  margin: 37px auto;
  position: relative;
  animation: cssload-invert 2.3s infinite steps(2, end);
  -o-animation: cssload-invert 2.3s infinite steps(2, end);
  -ms-animation: cssload-invert 2.3s infinite steps(2, end);
  -webkit-animation: cssload-invert 2.3s infinite steps(2, end);
  -moz-animation: cssload-invert 2.3s infinite steps(2, end);
}
.cssload-ball {
  height: 100%;
  width: 100%;
  position: absolute;
  border-radius: 50%;
  top: 0;
  left: 0;
  background: $accent-color;
}
.cssload-ball-1 {
  animation: cssload-ball1 1.15s infinite alternate linear;
  -o-animation: cssload-ball1 1.15s infinite alternate linear;
  -ms-animation: cssload-ball1 1.15s infinite alternate linear;
  -webkit-animation: cssload-ball1 1.15s infinite alternate linear;
  -moz-animation: cssload-ball1 1.15s infinite alternate linear;
}
.cssload-ball-2 {
  animation: cssload-ball2 1.15s infinite alternate linear;
  -o-animation: cssload-ball2 1.15s infinite alternate linear;
  -ms-animation: cssload-ball2 1.15s infinite alternate linear;
  -webkit-animation: cssload-ball2 1.15s infinite alternate linear;
  -moz-animation: cssload-ball2 1.15s infinite alternate linear;
}
.cssload-ball-3 {
  animation: cssload-ball3 1.15s infinite alternate linear;
  -o-animation: cssload-ball3 1.15s infinite alternate linear;
  -ms-animation: cssload-ball3 1.15s infinite alternate linear;
  -webkit-animation: cssload-ball3 1.15s infinite alternate linear;
  -moz-animation: cssload-ball3 1.15s infinite alternate linear;
}
.cssload-ball-4 {
  animation: cssload-ball4 1.15s infinite alternate linear;
  -o-animation: cssload-ball4 1.15s infinite alternate linear;
  -ms-animation: cssload-ball4 1.15s infinite alternate linear;
  -webkit-animation: cssload-ball4 1.15s infinite alternate linear;
  -moz-animation: cssload-ball4 1.15s infinite alternate linear;
}

@keyframes cssload-invert {
  100% {
    transform: rotate(180deg);
  }
}

@-o-keyframes cssload-invert {
  100% {
    -o-transform: rotate(180deg);
  }
}

@-ms-keyframes cssload-invert {
  100% {
    -ms-transform: rotate(180deg);
  }
}

@-webkit-keyframes cssload-invert {
  100% {
    -webkit-transform: rotate(180deg);
  }
}

@-moz-keyframes cssload-invert {
  100% {
    -moz-transform: rotate(180deg);
  }
}

@keyframes cssload-ball1 {
  12% {
    transform: none;
  }
  26% {
    transform: translateX(25%) scale(1, 0.8);
  }
  40% {
    transform: translateX(50%) scale(0.8, 0.8);
  }
  60% {
    transform: translateX(50%) scale(0.8, 0.8);
  }
  74% {
    transform: translate(50%, 25%) scale(0.6, 0.8);
  }
  88% {
    transform: translate(50%, 50%) scale(0.6, 0.6);
  }
  100% {
    transform: translate(50%, 50%) scale(0.6, 0.6);
  }
}

@-o-keyframes cssload-ball1 {
  12% {
    -o-transform: none;
  }
  26% {
    -o-transform: translateX(25%) scale(1, 0.8);
  }
  40% {
    -o-transform: translateX(50%) scale(0.8, 0.8);
  }
  60% {
    -o-transform: translateX(50%) scale(0.8, 0.8);
  }
  74% {
    -o-transform: translate(50%, 25%) scale(0.6, 0.8);
  }
  88% {
    -o-transform: translate(50%, 50%) scale(0.6, 0.6);
  }
  100% {
    -o-transform: translate(50%, 50%) scale(0.6, 0.6);
  }
}

@-ms-keyframes cssload-ball1 {
  12% {
    -ms-transform: none;
  }
  26% {
    -ms-transform: translateX(25%) scale(1, 0.8);
  }
  40% {
    -ms-transform: translateX(50%) scale(0.8, 0.8);
  }
  60% {
    -ms-transform: translateX(50%) scale(0.8, 0.8);
  }
  74% {
    -ms-transform: translate(50%, 25%) scale(0.6, 0.8);
  }
  88% {
    -ms-transform: translate(50%, 50%) scale(0.6, 0.6);
  }
  100% {
    -ms-transform: translate(50%, 50%) scale(0.6, 0.6);
  }
}

@-webkit-keyframes cssload-ball1 {
  12% {
    -webkit-transform: none;
  }
  26% {
    -webkit-transform: translateX(25%) scale(1, 0.8);
  }
  40% {
    -webkit-transform: translateX(50%) scale(0.8, 0.8);
  }
  60% {
    -webkit-transform: translateX(50%) scale(0.8, 0.8);
  }
  74% {
    -webkit-transform: translate(50%, 25%) scale(0.6, 0.8);
  }
  88% {
    -webkit-transform: translate(50%, 50%) scale(0.6, 0.6);
  }
  100% {
    -webkit-transform: translate(50%, 50%) scale(0.6, 0.6);
  }
}

@-moz-keyframes cssload-ball1 {
  12% {
    -moz-transform: none;
  }
  26% {
    -moz-transform: translateX(25%) scale(1, 0.8);
  }
  40% {
    -moz-transform: translateX(50%) scale(0.8, 0.8);
  }
  60% {
    -moz-transform: translateX(50%) scale(0.8, 0.8);
  }
  74% {
    -moz-transform: translate(50%, 25%) scale(0.6, 0.8);
  }
  88% {
    -moz-transform: translate(50%, 50%) scale(0.6, 0.6);
  }
  100% {
    -moz-transform: translate(50%, 50%) scale(0.6, 0.6);
  }
}

@keyframes cssload-ball2 {
  12% {
    transform: none;
  }
  26% {
    transform: translateX(25%) scale(1, 0.8);
  }
  40% {
    transform: translateX(50%) scale(0.8, 0.8);
  }
  60% {
    transform: translateX(50%) scale(0.8, 0.8);
  }
  74% {
    transform: translate(50%, -25%) scale(0.6, 0.8);
  }
  88% {
    transform: translate(50%, -50%) scale(0.6, 0.6);
  }
  100% {
    transform: translate(50%, -50%) scale(0.6, 0.6);
  }
}

@-o-keyframes cssload-ball2 {
  12% {
    -o-transform: none;
  }
  26% {
    -o-transform: translateX(25%) scale(1, 0.8);
  }
  40% {
    -o-transform: translateX(50%) scale(0.8, 0.8);
  }
  60% {
    -o-transform: translateX(50%) scale(0.8, 0.8);
  }
  74% {
    -o-transform: translate(50%, -25%) scale(0.6, 0.8);
  }
  88% {
    -o-transform: translate(50%, -50%) scale(0.6, 0.6);
  }
  100% {
    -o-transform: translate(50%, -50%) scale(0.6, 0.6);
  }
}

@-ms-keyframes cssload-ball2 {
  12% {
    -ms-transform: none;
  }
  26% {
    -ms-transform: translateX(25%) scale(1, 0.8);
  }
  40% {
    -ms-transform: translateX(50%) scale(0.8, 0.8);
  }
  60% {
    -ms-transform: translateX(50%) scale(0.8, 0.8);
  }
  74% {
    -ms-transform: translate(50%, -25%) scale(0.6, 0.8);
  }
  88% {
    -ms-transform: translate(50%, -50%) scale(0.6, 0.6);
  }
  100% {
    -ms-transform: translate(50%, -50%) scale(0.6, 0.6);
  }
}

@-webkit-keyframes cssload-ball2 {
  12% {
    -webkit-transform: none;
  }
  26% {
    -webkit-transform: translateX(25%) scale(1, 0.8);
  }
  40% {
    -webkit-transform: translateX(50%) scale(0.8, 0.8);
  }
  60% {
    -webkit-transform: translateX(50%) scale(0.8, 0.8);
  }
  74% {
    -webkit-transform: translate(50%, -25%) scale(0.6, 0.8);
  }
  88% {
    -webkit-transform: translate(50%, -50%) scale(0.6, 0.6);
  }
  100% {
    -webkit-transform: translate(50%, -50%) scale(0.6, 0.6);
  }
}

@-moz-keyframes cssload-ball2 {
  12% {
    -moz-transform: none;
  }
  26% {
    -moz-transform: translateX(25%) scale(1, 0.8);
  }
  40% {
    -moz-transform: translateX(50%) scale(0.8, 0.8);
  }
  60% {
    -moz-transform: translateX(50%) scale(0.8, 0.8);
  }
  74% {
    -moz-transform: translate(50%, -25%) scale(0.6, 0.8);
  }
  88% {
    -moz-transform: translate(50%, -50%) scale(0.6, 0.6);
  }
  100% {
    -moz-transform: translate(50%, -50%) scale(0.6, 0.6);
  }
}

@keyframes cssload-ball3 {
  12% {
    transform: none;
  }
  26% {
    transform: translateX(-25%) scale(1, 0.8);
  }
  40% {
    transform: translateX(-50%) scale(0.8, 0.8);
  }
  60% {
    transform: translateX(-50%) scale(0.8, 0.8);
  }
  74% {
    transform: translate(-50%, 25%) scale(0.6, 0.8);
  }
  88% {
    transform: translate(-50%, 50%) scale(0.6, 0.6);
  }
  100% {
    transform: translate(-50%, 50%) scale(0.6, 0.6);
  }
}

@-o-keyframes cssload-ball3 {
  12% {
    -o-transform: none;
  }
  26% {
    -o-transform: translateX(-25%) scale(1, 0.8);
  }
  40% {
    -o-transform: translateX(-50%) scale(0.8, 0.8);
  }
  60% {
    -o-transform: translateX(-50%) scale(0.8, 0.8);
  }
  74% {
    -o-transform: translate(-50%, 25%) scale(0.6, 0.8);
  }
  88% {
    -o-transform: translate(-50%, 50%) scale(0.6, 0.6);
  }
  100% {
    -o-transform: translate(-50%, 50%) scale(0.6, 0.6);
  }
}

@-ms-keyframes cssload-ball3 {
  12% {
    -ms-transform: none;
  }
  26% {
    -ms-transform: translateX(-25%) scale(1, 0.8);
  }
  40% {
    -ms-transform: translateX(-50%) scale(0.8, 0.8);
  }
  60% {
    -ms-transform: translateX(-50%) scale(0.8, 0.8);
  }
  74% {
    -ms-transform: translate(-50%, 25%) scale(0.6, 0.8);
  }
  88% {
    -ms-transform: translate(-50%, 50%) scale(0.6, 0.6);
  }
  100% {
    -ms-transform: translate(-50%, 50%) scale(0.6, 0.6);
  }
}

@-webkit-keyframes cssload-ball3 {
  12% {
    -webkit-transform: none;
  }
  26% {
    -webkit-transform: translateX(-25%) scale(1, 0.8);
  }
  40% {
    -webkit-transform: translateX(-50%) scale(0.8, 0.8);
  }
  60% {
    -webkit-transform: translateX(-50%) scale(0.8, 0.8);
  }
  74% {
    -webkit-transform: translate(-50%, 25%) scale(0.6, 0.8);
  }
  88% {
    -webkit-transform: translate(-50%, 50%) scale(0.6, 0.6);
  }
  100% {
    -webkit-transform: translate(-50%, 50%) scale(0.6, 0.6);
  }
}

@-moz-keyframes cssload-ball3 {
  12% {
    -moz-transform: none;
  }
  26% {
    -moz-transform: translateX(-25%) scale(1, 0.8);
  }
  40% {
    -moz-transform: translateX(-50%) scale(0.8, 0.8);
  }
  60% {
    -moz-transform: translateX(-50%) scale(0.8, 0.8);
  }
  74% {
    -moz-transform: translate(-50%, 25%) scale(0.6, 0.8);
  }
  88% {
    -moz-transform: translate(-50%, 50%) scale(0.6, 0.6);
  }
  100% {
    -moz-transform: translate(-50%, 50%) scale(0.6, 0.6);
  }
}

@keyframes cssload-ball4 {
  12% {
    transform: none;
  }
  26% {
    transform: translateX(-25%) scale(1, 0.8);
  }
  40% {
    transform: translateX(-50%) scale(0.8, 0.8);
  }
  60% {
    transform: translateX(-50%) scale(0.8, 0.8);
  }
  74% {
    transform: translate(-50%, -25%) scale(0.6, 0.8);
  }
  88% {
    transform: translate(-50%, -50%) scale(0.6, 0.6);
  }
  100% {
    transform: translate(-50%, -50%) scale(0.6, 0.6);
  }
}

@-o-keyframes cssload-ball4 {
  12% {
    -o-transform: none;
  }
  26% {
    -o-transform: translateX(-25%) scale(1, 0.8);
  }
  40% {
    -o-transform: translateX(-50%) scale(0.8, 0.8);
  }
  60% {
    -o-transform: translateX(-50%) scale(0.8, 0.8);
  }
  74% {
    -o-transform: translate(-50%, -25%) scale(0.6, 0.8);
  }
  88% {
    -o-transform: translate(-50%, -50%) scale(0.6, 0.6);
  }
  100% {
    -o-transform: translate(-50%, -50%) scale(0.6, 0.6);
  }
}

@-ms-keyframes cssload-ball4 {
  12% {
    -ms-transform: none;
  }
  26% {
    -ms-transform: translateX(-25%) scale(1, 0.8);
  }
  40% {
    -ms-transform: translateX(-50%) scale(0.8, 0.8);
  }
  60% {
    -ms-transform: translateX(-50%) scale(0.8, 0.8);
  }
  74% {
    -ms-transform: translate(-50%, -25%) scale(0.6, 0.8);
  }
  88% {
    -ms-transform: translate(-50%, -50%) scale(0.6, 0.6);
  }
  100% {
    -ms-transform: translate(-50%, -50%) scale(0.6, 0.6);
  }
}

@-webkit-keyframes cssload-ball4 {
  12% {
    -webkit-transform: none;
  }
  26% {
    -webkit-transform: translateX(-25%) scale(1, 0.8);
  }
  40% {
    -webkit-transform: translateX(-50%) scale(0.8, 0.8);
  }
  60% {
    -webkit-transform: translateX(-50%) scale(0.8, 0.8);
  }
  74% {
    -webkit-transform: translate(-50%, -25%) scale(0.6, 0.8);
  }
  88% {
    -webkit-transform: translate(-50%, -50%) scale(0.6, 0.6);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) scale(0.6, 0.6);
  }
}

@-moz-keyframes cssload-ball4 {
  12% {
    -moz-transform: none;
  }
  26% {
    -moz-transform: translateX(-25%) scale(1, 0.8);
  }
  40% {
    -moz-transform: translateX(-50%) scale(0.8, 0.8);
  }
  60% {
    -moz-transform: translateX(-50%) scale(0.8, 0.8);
  }
  74% {
    -moz-transform: translate(-50%, -25%) scale(0.6, 0.8);
  }
  88% {
    -moz-transform: translate(-50%, -50%) scale(0.6, 0.6);
  }
  100% {
    -moz-transform: translate(-50%, -50%) scale(0.6, 0.6);
  }
}
</style>
