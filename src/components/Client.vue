<template>
  <div class="container">
    <h1>Клиент с id {{ $route.params.id }}</h1>
    <router-link to="/clients">Назад</router-link>
    <hr />
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
         {{ client.second_name }} {{ client.first_name }} {{ client.last_name }}, {{ client.birth_date }}
      </li>
      <li class="list-group-item">
        Телефон: {{ client.phone }}
      </li>
      <li class="list-group-item">
        Город: {{ client.city }}
      </li>
      <li class="list-group-item">
        Статус: {{ client.status }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getSomething } from "../api/get";
export default {
  name: "Client",
  data() {
    return {
      client: {},
    };
  },
  created() {
    getSomething(`clients/${this.$route.params.id}`).then(
      (resp) => (this.client = resp.data[0])
    );
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
