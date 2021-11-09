<template>
<div class="container">
    <h1>Сотрудники</h1>
    <ul class="list-group" v-for="user in users" :key="user.id">
  <li class="list-group-item">Сотрудник {{ user.name }}</li>
  <router-link :to="userOpen(user.id)">Редактировать</router-link>
</ul>
</div>
</template>

<script>
export default {
  name: 'Users',
   data: function () {
    return {
      users: [
          {
              id: 1,
              name: 'Ivan'
          },
          {
              id: 2,
              name: 'Sergey'
          },
          {
              id: 3,
              name: 'Tom'
          },
      ]
    }
  },
  methods: {
      userOpen: function(id) {
          return `/users/${id}`;
      }
  }
}
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
