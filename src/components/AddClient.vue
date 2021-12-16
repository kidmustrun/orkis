<template>
  <div class="form-signin">
    <form>
      <h1 class="h3 mb-3 fw-normal">Добавить клиента</h1>

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
     <div class="form-floating">
        <input
          class="form-control"
          type="date"
          name="date"
          id="date"
          v-model="date"
        />
        <label class="form-check-label" for="date"> Дата рождения </label>
      </div><br>

        <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="city"
          v-model="city"
          placeholder="Город"
        />
        <label for="city">Город</label>
      </div>

      <div class="form-floating">
        <input
          type="tel"
          class="form-control"
          id="phone"
          v-model="phone"
          pattern="[0-9]{11}"
          required
        />
        <label for="phone">Номер телефона</label>
      </div>

      <div v-show="showError" class="mt-2 alert alert-danger" >
        {{ this.errorMessage }}
      </div>
    </form>
    <button class="w-100 btn btn-submit btn-lg btn-primary" @click="sendUser()">
      Добавить клиента
    </button>
    <router-link to="/main">На главную</router-link>
    <div v-if="loading" class="cssload-spinner">
      <div class="cssload-ball cssload-ball-1"></div>
      <div class="cssload-ball cssload-ball-2"></div>
      <div class="cssload-ball cssload-ball-3"></div>
      <div class="cssload-ball cssload-ball-4"></div>
    </div>
  </div>
</template>

<script>
import { postSomething } from "../api/post.js";
export default {
  name: "AddClient",
  data() {
    return {
      name: "",
      surname: "",
      lastname: "",
      gender: "",
      date: "",
      city: "",
      phone: "",
      showError: false,
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    sendUser() {
      this.loading = true;
      this.showError = false;
      postSomething('api/v1/clients/create',{
        first_name: this.name,
        second_name: this.surname,
        last_name: this.lastname,
        gender: this.gender,
        birth_date: this.date,
        city: this.city,
        phone: this.phone,
        status: "normal"
      })
        .then((resp) => {
          this.loading = false;
          this.$router.push(`/clients/${resp.data.data.id}`);
        })
        .catch((error) => {
          this.loading = false;
          this.errorMessage = error.response.data.error.errors;
          this.showError = true;
          console.log(error);
          
          
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
