<template>
  <div class="container">
    <h1 style="font-size:30px">Договоры</h1>
    <router-link style="text-decoration: none;color:white;font-size: 20px;padding-left: 5px;padding-right: 5px;font-family: 'Jost', sans-serif;font-style: normal;text-align: center; margin-bottom:1%" class="back" to="/main">Назад</router-link><br>

    <div style="background:white; margin-top:2%; padding:2%">
      <h4>Неоплаченные соглашения</h4>
    <ul class="list-group" v-for="agreement in agreements" :key="agreement.id">
      <li v-if="agreement.payment == 0" class="list-group-item">
        Договор №{{ agreement.id }}
      </li>
      <p style="background:#a33333; color:white" v-if="agreement.payment == 0" class="list-group-item">
        Не оплачен
      </p>
      <router-link v-if="agreement.payment == 0" style="color:green" :to="agrOpen(agreement.id)">Просмотр</router-link>
    </ul>
    </div>

    <div v-if="admin || accountant" style="background:white; margin-top:2%; padding:2%">
      <h4>Все соглашения</h4>
    <ul class="list-group" v-for="agreement in agreements" :key="agreement.id">
      <li class="list-group-item">
        Договор №{{agreement.id }}
      </li>
      <p style="background:#a33333; color:white" v-if="agreement.payment == 0" class="list-group-item">
        Не оплачен
      </p>
      <p style="background:#2e470b; color:white" v-if="agreement.payment == 1" class="list-group-item">
        Оплачен
      </p>
      <router-link style="color:green" :to="agrOpen(agreement.id)">Просмотр</router-link>
    </ul>
    
    </div>
  </div>
</template>

<script>
import { getSomething } from "../api/get";

export default {
  name: "Agreement",
  inject: ["reload"],
  data() {
    return {
      agreements: [],
      user: [],
      
      showError: false,
      loading: false,
      errorMessage: "",
    };
  },
  created() {
    getSomething('api/v1/user').then((response) => {
      this.user = response.data[0];
    });
    getSomething('api/v1/agreements').then((resp) => {
      this.agreements = resp.data;
      this.loading = false;
    });
  },
  computed: {
    canAdd: function () {
      if ((this.user.role === "accountant")) return false;
      else return true;
    },
    admin: function () {
      if ((this.user.role === "admin")) return true;
      else return false;
    },
    accountant: function () {
      if ((this.user.role === "accountant")) return true;
      else return false;
    },
  },
  methods: {
      agrOpen: function(id) {
          return `agreements/${id}`;
      }
  }
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
