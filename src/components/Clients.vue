<template>
  <div class="container">
    <h1>Клиенты</h1>
    <router-link to="/main">На главную</router-link><br />
    <router-link to="/add_client">Создать клиента</router-link>
    <hr />
    <div v-if="loading" class="cssload-spinner">
      <div class="cssload-ball cssload-ball-1"></div>
      <div class="cssload-ball cssload-ball-2"></div>
      <div class="cssload-ball cssload-ball-3"></div>
      <div class="cssload-ball cssload-ball-4"></div>
    </div>

    <ul class="list-group" v-for="client in clients" :key="client.id">
      <li class="list-group-item">
        <keep-alive>
          <router-link :to="clientOpen(client.id)">Клиент {{ client.second_name }} {{ client.first_name }}
        {{ client.last_name
        }} </router-link>
        </keep-alive>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSomething } from "../api/get.js";
export default {
  name: "Clients",
  data: function () {
    return {
      clients: [],
      loading: false,
      user: {},
    };
  },
  computed: {
    admin: function () {
      if (this.user.role === "admin") return true;
      else return false;
    },
  },
  created() {
    this.loading = true;
    getSomething("api/v1/clients").then((resp) => {
      this.clients = resp.data;
      this.loading = false;
    });
    getSomething("api/v1/user").then((response) => {
      this.user = response.data[0];
    });
  },
  methods: {
    clientOpen: function (id) {
      return `/clients/${id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/downloading.scss";
</style>
