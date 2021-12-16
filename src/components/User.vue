<template>
  <div class="container">
    <h1>Сотрудник с id {{ $route.params.id }}</h1>
    <router-link to="/users">Назад</router-link>
    <hr />
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        {{ user.second_name }} {{ user.first_name }} {{ user.last_name }}
      </li>
      <li class="list-group-item">
        Телефон: {{ user.phone }}, email: {{ user.email }}
      </li>
      <li class="list-group-item">Роль: {{ user.role }}</li>
      <li class="list-group-item">
        Организация: {{ org.name }}, {{ org.address }}, {{ org.email }},
        {{ org.phone }}
      </li>
      <li v-if="admin" class="list-group-item">
        <button @click="clickEdit">Редактировать пользователя</button>
        <form v-if="clicked">
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
            <select class="form-select" id="orgs" v-model="org_edit">
              <option v-for="org in orgs" :value="org.id" :key="org.id">
                {{ org.name }}, {{ org.address }}
              </option>
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
              <option selected value="agent">Агент</option>
              <option value="manager">Менеджер</option>
              <option value="accountant">Бухгалтер</option>
              <option value="admin">Администратор</option>
            </select>
            <label for="roles">Выберите роль</label>
          </div>
          <button @click="sendEditUser">Отправить</button>
          <div v-show="showError" class="mt-2 alert alert-danger">
            {{ this.errorMessage }}
          </div>
        </form>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSomething } from "../api/get";
import { putSomething } from "../api/put";
export default {
  name: "User",
  inject:['reload'],
  data() {
    return {
      user: {},
      owner: {},
      org: {},
      orgs: {},
      clicked: false,
      email: "",
      login: "",
      name: "",
      surname: "",
      lastname: "",
      org_edit: "",
      gender: "",
      role: "",
      showError: false,
      loading: false,
      errorMessage: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.email = this.user.email;
      this.login = this.user.username;
      this.name = this.user.first_name;
      this.surname = this.user.second_name;
      this.lastname = this.user.last_name;
      this.gender = this.user.gender;
    }, 500);
  },
  created() {
    getSomething(`api/v1/users/${this.$route.params.id}`).then((resp) => {
      this.user = resp.data[0];
      this.org = resp.data[1];
    });
    getSomething("api/v1/user").then((response) => {
      this.owner = response.data[0];
    });
    getSomething("organisations").then((response) => {
      this.orgs = response.data;
    });
  },
  computed: {
    admin: function () {
      if (this.owner.role === "admin") return true;
      else return false;
    },
  },
  methods: {
    clickEdit() {
      this.clicked = !this.clicked;
    },
    sendEditUser() {
      putSomething(`api/v1/users/${this.$route.params.id}/update`, {
        email: this.email,
        username: this.login,
        first_name: this.name,
        second_name: this.surname,
        last_name: this.lastname,
        organisation: +this.org_edit,
        gender: this.gender,
        role: this.role,
      });
      this.reload();
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
