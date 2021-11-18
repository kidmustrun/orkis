<template>
  <div class="container">
    <h1>Клиенты</h1>
    <ul class="list-group" v-for="client in clients" :key="client.id">
      <li class="list-group-item">Клиент {{ client.name }}</li>
      <router-link :to="clientOpen(client.id)">Редактировать</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Clients",
  data: function () {
    return {
      clients: [
        {
          id: 1,
          name: "Alexey",
        },
        {
          id: 2,
          name: "Oleg",
        },
        {
          id: 3,
          name: "Alexander",
        },
      ],
    };
  },
  methods: {
    clientOpen: function (id) {
      return `/clients/${id}`;
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
