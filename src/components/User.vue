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
        Телефон: {{ user.phone }}, email:  {{ user.email }}
      </li>
      <li class="list-group-item">
        Роль: {{ user.role }}
      </li>
      <li class="list-group-item">
        Организация: {{ user.organisation }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getSomething } from '../api/get';
export default {
  name: "User",
  data() {
    return {
      user: {}
    };
  },
  created() {
    getSomething(`users/${this.$route.params.id}`).then((resp) => this.user = resp.data.data);
    
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
