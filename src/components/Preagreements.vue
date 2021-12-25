<template>
  <div class="container">
    <h1 style="font-size:30px">Предварительные соглашения</h1>
    <router-link style="text-decoration: none;color:white;font-size: 20px;padding-left: 5px;padding-right: 5px;font-family: 'Jost', sans-serif;font-style: normal;text-align: center; margin-bottom:1%" class="back" to="/main">Назад</router-link><br>
    <router-link  style="text-decoration: none;color:white;font-size: 20px;padding-left: 5px;padding-right: 5px;font-family: 'Jost', sans-serif;font-style: normal;text-align: center; margin-bottom:1%" v-if="canAdd"  to="/addpreagr">Оформить предварительное соглашение</router-link>

    <div style="background:white; margin-top:2%; padding:2%">
      <h4>Незакрытые предв.соглашения</h4>
    <ul class="list-group" v-for="preagreement in preagreements" :key="preagreement.id">
      <li v-if="preagreement.agreement === 0" class="list-group-item">
        Предварительное соглашение №{{ preagreement.id }}
      </li>
      <p style="background:#a33333; color:white" v-if="preagreement.agreement === 0" class="list-group-item">
        Не имеет договора
      </p>
      <router-link v-if="preagreement.agreement === 0" style="color:green" :to="preagrOpen(preagreement.id)">Просмотр</router-link>
    </ul>
    </div>

    <div style="background:white; margin-top:2%; padding:2%">
      <h4>Все предв.соглашения</h4>
    <ul class="list-group" v-for="preagreement in preagreements" :key="preagreement.id">
      <li class="list-group-item">
        Предварительное соглашение №{{ preagreement.id }}
      </li>
      <p style="background:#a33333; color:white" v-if="preagreement.agreement === 0" class="list-group-item">
        Не имеет договора
      </p>
      <p style="background:#2e470b; color:white" v-if="preagreement.agreement === 1" class="list-group-item">
        С договором
      </p>
      <router-link style="color:green" :to="preagrOpen(preagreement.id)">Просмотр</router-link>
    </ul>
    
    </div>
  </div>
</template>

<script>
import { getSomething } from "../api/get";

export default {
  name: "Preagreement",
  inject: ["reload"],
  data() {
    return {
      preagreements: [],
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
    getSomething('api/v1/preagreements').then((resp) => {
      this.preagreements = resp.data;
      this.loading = false;
    });
  },
  computed: {
    canAdd: function () {
      if ((this.user.role === "accountant")) return false;
      else return true;
    },
  },
  methods: {
      preagrOpen: function(id) {
          return `preagreements/${id}`;
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
