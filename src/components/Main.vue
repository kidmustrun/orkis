<template>
  <div class="container">
    <header>
<div class="menu">
<router-link to="/cities" >Города</router-link>
<router-link to="/countries" >Страны</router-link>
<router-link to="/hotels">Отели</router-link>
<router-link to="/preagreements">Предв.соглашения</router-link>
<router-link to="/agreements">Договоры</router-link>
<a href="#rep">Ваучеры</a>
</div>
</header>
    <div class="cont1">
    <h2>Здравствуйте, {{user.first_name}}</h2>
    <ul class="list-group list-group-flush" style="margin:2%">
  <li class="list-group-item"><router-link style="font-size:21px" class="link-dark" to="/clients">Клиенты</router-link></li>
  <li class="list-group-item"><router-link style="font-size:21px" class="link-dark" to="/users">Сотрудники</router-link></li>
</ul>
    <button @click="logoutClick()" class="btn btn-success">Выйти</button>
  </div>
  
  <div v-if="canAdd" style="background:white; margin-top:2%; padding:2%">
      <h4>Напоминания</h4>
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

    <div v-if="accountant" style="background:white; margin-top:2%; padding:2%">
      <h4>Напоминания</h4>
    <ul class="list-group" v-for="agreement in agreements" :key="agreement.id">
      <li class="list-group-item">
        Договор №{{ agreement.id }}
        <p style="background:#a33333; color:white" v-if="agreement.payment == 0" class="list-group-item">
        Не оплачен
      </p>
      </li>
      <router-link style="color:green" :to="agrOpen(agreement.id)">Просмотр</router-link>
    </ul>
    
    </div>

  </div>
  
  
</template>

<script>
import { logoutUser } from "../api/auth.js";
import { getSomething }from "../api/get.js";
export default {
  name: "Main",
  data(){
    return{
      user: {},
      preagreements:[],
      agreements: []
    }
  },
 created() {
    getSomething("api/v1/user").then((response) => {
      this.user = response.data[0];
    }).catch(()=> this.$router.push("/signin"));
    getSomething('api/v1/preagreements/reminder').then((resp) => {
      this.preagreements = resp.data;
      this.loading = false;
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
    accountant: function () {
      if ((this.user.role === "accountant")) return true;
      else return false;
    },
  },
  methods: {
    logoutClick() {
      logoutUser();
      location.reload();
      this.$router.push("/signin");
    },
    preagrOpen: function(id) {
          return `preagreements/${id}`;
    },
    agrOpen: function(id) {
          return `agreements/${id}`;
    }
  },
};
</script>


<style>
  .cont1{
    background-color: white;
    padding: 2%;
  }
  .menu{
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
}
.menu a{
    text-decoration: none;
    color:white;
    font-size: 20px;
    padding-left: 5px;
    padding-right: 5px;
    font-family: 'Jost', sans-serif;
font-style: normal;
text-align: center;
}
</style>
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
