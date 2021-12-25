<template>
  <div class="form-signin">
    <form>
      <h1 class="h3 mb-3 fw-normal">Оформить предварительное соглашение</h1>

      <div class="form-floating">
        <input
          type="number"
          class="form-control"
          id="count"
          v-model="count"
        />
        <label for="count">Кол-во туристов</label>
      </div>
      <div class="form-floating">
        <input
          type="date"
          class="form-control"
          id="start"
          v-model="start"
        />
        <label for="start">Начало поездки</label>
      </div>
      <div class="form-floating">
        <input
          type="date"
          class="form-control"
          id="end"
          v-model="end"
        />
        <label for="end">Конец поездки</label>
      </div>
       <div class="form-floating">
        <select class="form-select" id="clients" v-model="client">
          <option v-for="client in clients" :value='client.id' :key="client.id">
            {{ client.id }}.{{ client.first_name }} {{ client.last_name }}
          </option>
        </select>
        <label for="clients">Выберите клиента</label>
      </div>
      <div class="form-floating">
        <select name="cities[]" multiple="multiple" class="form-select" id="cities" v-model="pr_cities">
          <option v-for="city in cities" :value='city.id' :key="city.id">
            {{ city.id }}.{{ city.city }}
          </option>
        </select>
        <label for="cities">Выберите города</label>
      </div>

      
    </form>
    <button class="w-100 btn btn-submit btn-lg btn-primary" style="margin-top:10px" @click="sendPreagr()">
     Добавить предв.соглашение
    </button>
    <router-link style="color:#87748c; margin-top:1%" to="/main">На главную</router-link>
    <div v-if="loading" class="cssload-spinner">
      <div class="cssload-ball cssload-ball-1"></div>
      <div class="cssload-ball cssload-ball-2"></div>
      <div class="cssload-ball cssload-ball-3"></div>
      <div class="cssload-ball cssload-ball-4"></div>
    </div>
  </div>
</template>

<script>
import { getSomething } from "../api/get";
import { postSomething } from "../api/post.js";
export default {
  name: "AddPreagreement",
  data() {
    return {
      clients:{},
      countries:{},
      cities:{},

      count: "",
      start: "",
      end: "",
      client: "",
      pr_cities: [],
     
      showError: false,
      loading: false,
      errorMessage: "",
      orgs: {},
    };
  },
  created() {
    getSomething("api/v1/clients").then((response) => {
      this.clients = response.data;
    });
    getSomething("api/v1/cities").then((response) => {
      this.cities = response.data;
    });
    getSomething("api/v1/countries").then((response) => {
      this.countries = response.data;
    });
  },
  methods: {
    sendPreagr() {
      this.loading = true;
      this.showError = false;
      postSomething('api/v1/preagreements/create',{
        TouristsCount: this.count,
        start: this.start,
        end: this.end,
        clientId: this.client,
        cities: this.pr_cities,
      })
      
        .then((resp) => {
          this.loading = false;
          this.$router.push(`/preagreements/${resp.data.data.id}`);
        })
        .catch((error) => {
          this.loading = false;
          this.errorMessage = error.response.data.error.errors;
          this.showError = true;
          console.log(error);
          
          
        });
        this.$router.push(`/preagreements`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/downloading.scss";
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
</style>
