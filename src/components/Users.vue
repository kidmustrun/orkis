<template>
<div class="container">
    <h1>Сотрудники</h1>
    <router-link to="/main">На главную</router-link><br>
    <router-link v-if="admin"  to="/add_user">Создать пользователя</router-link>
    <hr>
    <div v-if="loading" class="cssload-spinner">
      <div class="cssload-ball cssload-ball-1"></div>
      <div class="cssload-ball cssload-ball-2"></div>
      <div class="cssload-ball cssload-ball-3"></div>
      <div class="cssload-ball cssload-ball-4"></div>
    </div>
    <ul class="list-group" v-for="user in users" :key="user.id">
  <li class="list-group-item"><router-link :to="userOpen(user.id)">Сотрудник {{ user.second_name }} {{ user.first_name }} {{ user.last_name }}  </router-link></li>
 
</ul>
</div>
</template>

<script>
import { getSomething } from "../api/get"
export default {
  name: 'Users',
   data: function () {
    return {
      users: [],
      user: {},
      loading: false
    }
  },
  created(){
    console.log('created')
    this.loading = true;
    getSomething('api/v1/users').then((resp) => {
      this.users = resp.data;
      this.loading = false;
    });
    getSomething("api/v1/user").then((response) => {
      this.user = response.data[0];
    });
  },
    computed: {
    admin: function () {
      if (this.user.role === "admin") return true;
      else return false;
    },
  },
  methods: {
      userOpen: function(id) {
          return `/users/${id}`;
      }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/downloading.scss";
</style>
