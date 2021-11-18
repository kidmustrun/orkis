<template>
  <div class="container">
    <h1>Клиенты</h1>
    <router-link to="/main">На главную</router-link>
    <hr />
     <div v-if="loading" class="cssload-spinner">
      <div class="cssload-ball cssload-ball-1"></div>
      <div class="cssload-ball cssload-ball-2"></div>
      <div class="cssload-ball cssload-ball-3"></div>
      <div class="cssload-ball cssload-ball-4"></div>
    </div>
    
    <ul class="list-group" v-for="client in clients" :key="client.id">
      <li class="list-group-item">Клиент {{ client.first_name }} {{ client.last_name }}</li>
      <keep-alive>
      <router-link :to="clientOpen(client.id)">Редактировать</router-link>
      </keep-alive>
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
      loading: false
    };
  },
  created() {
    this.loading = true;
    getSomething('clients').then((resp) => {
      this.clients = resp.data;
      this.loading = false;
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
